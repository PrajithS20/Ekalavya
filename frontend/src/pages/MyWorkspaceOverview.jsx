import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Code, Globe, Database, Smartphone, Cpu, Play, CheckCircle, Clock, Trash2 } from "lucide-react";
import TopBar from "../components/TopBar";
import { useMCP } from "../context/MCPProvider";

export default function MyWorkspaceOverview() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const { client, isConnected } = useMCP();

  useEffect(() => {
    if (isConnected && client) {
      client.callTool({
        name: "foundry_get_projects",
        arguments: { userId: 1 }
      })
      .then(res => {
        const data = JSON.parse(res.content[0].text);
        setWorkspaces(data.projects || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch active projects:", err);
        setLoading(false);
      });
    }
  }, [isConnected, client]);

  const getStatusIcon = (phase, total) => {
    // Determine status based on phases
    if (phase > total) return <CheckCircle className="text-green-400" size={20} />;
    if (phase > 1) return <Play className="text-[#fbc05c]" size={20} />;
    return <Clock className="text-gray-400" size={20} />;
  };

  const getStatusColor = (phase, total) => {
    if (phase > total) return "text-green-400";
    if (phase > 1) return "text-[#fbc05c]";
    return "text-gray-400";
  };

  const DefaultIcon = Code;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen bg-transparent"
    >
      <TopBar />

      <div className="p-6">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="flex items-center gap-2 text-[#fbc05c] hover:text-[#fbc05c]/80 transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#fbc05c] mb-2">My Lab</h1>
          <p className="text-gray-400 text-lg">Track your project progress and continue where you left off</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-20">Loading Mission Control...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((workspace, index) => {
              // Calculate progress safely. 
              // Assumption: current_phase starts at 1. If completed, current_phase > total_phases.
              const totalPhases = workspace.total_phases || workspace.phases?.length || 5;
              const currentPhase = workspace.current_phase || 1;

              const progressRaw = ((currentPhase - 1) / totalPhases) * 100;
              const progress = Math.min(100, Math.max(0, Math.round(progressRaw)));

              const isCompleted = currentPhase > totalPhases;
              const status = isCompleted ? "completed" : "in-progress";

              return (
                <motion.div
                  key={workspace.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-800/50 to-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-[#fbc05c]/50 transition-all duration-300 group relative"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (confirm("Delete this project?")) {
                        client.callTool({
                          name: "foundry_delete_project",
                          arguments: { projectId: workspace.id }
                        }).then(() => setWorkspaces(prev => prev.filter(p => p.id !== workspace.id)))
                          .catch(err => console.error("Failed to delete", err));
                      }
                    }}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10"
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>

                  <Link to={`/project/${workspace.id}`} className="block">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${workspace.color || 'from-[#fbc05c] to-[#fbc05c]'} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <DefaultIcon size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 pr-8">
                          <h3 className="text-xl font-bold text-white group-hover:text-[#fbc05c] transition-colors line-clamp-1">
                            {workspace.title}
                          </h3>
                          {getStatusIcon(currentPhase, totalPhases)}
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{workspace.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${getStatusColor(currentPhase, totalPhases)}`}>
                          {status === "completed" ? "Completed" : "In Progress"}
                        </span>
                        <span className="text-xs text-gray-500">Phase {Math.min(currentPhase, totalPhases)}/{totalPhases}</span>
                      </div>

                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${status === "completed" ? "bg-green-500" : "bg-[#fbc05c]"
                            }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{progress}% Complete</span>
                        {/* <span>Last updated: just now</span> */}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {(() => {
                          let ts = workspace.tech || workspace.tech_stack || [];
                          if (typeof ts === 'string') ts = ts.split(',');
                          if (!Array.isArray(ts)) ts = [];
                          return ts.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-slate-600/50 rounded text-xs text-gray-300"
                            >
                              {String(tech).trim()}
                            </span>
                          ));
                        })()}
                      </div>

                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}


        {
          !loading && workspaces.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Code size={64} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No workspaces yet</h3>
              <p className="text-gray-500 mb-6">Start your first project from the Project Lab</p>
              <Link
                to="/project-lab"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#fbc05c] to-[#fbc05c] rounded-lg text-white font-medium hover:from-[#fbc05c] hover:to-[#fbc05c] transition-all duration-300"
              >
                <Globe size={20} />
                Explore Projects
              </Link>
            </motion.div>
          )
        }
      </div >
    </motion.div >
  );
}