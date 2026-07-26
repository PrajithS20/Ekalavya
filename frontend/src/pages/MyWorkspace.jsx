import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Lock,
  Code,
  Lightbulb,
  Upload,
  MessageSquare,
  FolderPlus,
  FilePlus,
  Download,
} from "lucide-react";
import TopBar from "../components/TopBar";
import { useMCP } from "../context/MCPProvider";

export default function MyWorkspace() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPhase = parseInt(searchParams.get("phase")) || 1;
  const [currentPhase, setCurrentPhase] = useState(initialPhase);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [showHints, setShowHints] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { client, isConnected } = useMCP();

  // Load Project Data
  useEffect(() => {
    if (projectId && isConnected && client) {
      client.callTool({
        name: "foundry_get_project",
        arguments: { projectId }
      })
        .then(res => {
          if (res.content[0].text) {
            const data = JSON.parse(res.content[0].text);
            if (!data.error) {
              setProject(data);
              const completed = [];
              if (data.phases) {
                data.phases.forEach(p => {
                  if (p.id < data.current_phase) completed.push(p.id);
                });
              }
              setCompletedPhases(completed);
              setCurrentPhase(data.current_phase);
            }
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load project", err);
          setLoading(false);
        });
    }
  }, [projectId, isConnected, client]);

  const phase = project?.phases?.find((p) => p.id === currentPhase);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (phase && !code) {
      // Use a generic template if backend doesn't provide one, or use description
      setCode(`// Phase ${phase.id}: ${phase.title}\n// ${phase.description}\n\nfunction solution() {\n  // Write your code here\n}`);
    }
  }, [phase, code]);

  const handlePhaseComplete = async () => {
    if (!client) return;
    try {
      await client.callTool({
        name: "foundry_unlock_phase",
        arguments: { projectId, phaseId: currentPhase }
      });

      setCompletedPhases([...completedPhases, currentPhase]);
      // Update local state to next phase
      const nextPhase = currentPhase + 1;
      setCurrentPhase(nextPhase);

      // Refresh project data to ensure sync
      const res = await client.callTool({
        name: "foundry_get_project",
        arguments: { projectId }
      });
      const data = JSON.parse(res.content[0].text);
      if (!data.error) {
        setProject(data);
      }

    } catch (err) {
      console.error("Failed to unlock phase", err);
      alert("Error updating progress. Check backend console.");
    }
  };

  const handleCodeUpload = () => {
    // In a real app, you might send the code to backend here too
    handlePhaseComplete();
  };

  const getAIHint = () => {
    // Backend doesn't store hints per phase in the main model yet, 
    // but we can simulate or fetch from a new endpoint if we had one.
    // For now, using generic hints or descriptions.
    const hints = [
      "Focus on the main function logic.",
      "Remember to handle edge cases.",
      "Check the documentation for this specific technology."
    ];
    if (phase?.description) hints.push(`Review the goal: ${phase.description}`);

    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    setAiMessage(`💡 Hint: ${randomHint}`);
    setTimeout(() => setAiMessage(""), 8000);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-transparent">
        <TopBar />
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Loading Workspace...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen bg-transparent">
        <TopBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">Project not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <TopBar />

      <div className="flex-1 flex">
        {/* Left Sidebar - Project Phases */}
        <div className="w-80 bg-[#111111]/50 border-r border-slate-700/50 flex flex-col">
          <div className="p-6 border-b border-slate-700/50">
            <button
              onClick={() => navigate("/project-lab")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Back to Project Lab
            </button>
            <h1 className="text-xl font-bold text-white">{project.title}</h1>
            <p className="text-sm text-gray-400 mt-1">
              Phase {currentPhase} of {project.total_phases || project.phases.length}
            </p>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {project.phases && project.phases.map((phaseItem) => (
              <motion.div
                key={phaseItem.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${currentPhase === phaseItem.id
                  ? "bg-[#fbc05c]/20 border-[#fbc05c]/50 text-[#fbc05c]"
                  : completedPhases.includes(phaseItem.id) || phaseItem.id < currentPhase
                    ? "bg-green-500/20 border-green-500/50 text-green-400"
                    : "bg-[#111111]/50 border-slate-700/50 text-gray-500 cursor-not-allowed"
                  }`}
                onClick={() => {
                  // Allow clicking if it's the current phase or a completed one (to review)
                  // or the immediate next one if just completed
                  if (phaseItem.id <= Math.max(0, ...completedPhases) + 1) {
                    setCurrentPhase(phaseItem.id);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  {completedPhases.includes(phaseItem.id) || phaseItem.id < project.current_phase ? (
                    <CheckCircle size={20} className="text-green-400" />
                  ) : phaseItem.id > project.current_phase ? (
                    <Lock size={20} className="text-gray-500" />
                  ) : (
                    <Play size={20} />
                  )}
                  <div>
                    <h3 className="font-semibold text-sm">{phaseItem.title}</h3>
                    <p className="text-xs opacity-75 mt-1 line-clamp-2">
                      {phaseItem.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Phase Header */}
          <div className="bg-[#111111]/30 border-b border-slate-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {phase?.title}
                </h2>
                <p className="text-gray-400 mt-1">{phase?.description}</p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowHints(!showHints)}
                  className="bg-[#fbc05c]/20 border border-[#fbc05c]/50 text-[#fbc05c] px-4 py-2 rounded-lg hover:bg-[#fbc05c]/30 transition-colors flex items-center gap-2"
                >
                  <Lightbulb size={16} />
                  AI Guide
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCodeUpload}
                  className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2"
                >
                  <Upload size={16} />
                  Submit Phase
                </motion.button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* AI Guide Panel */}
            <AnimatePresence>
              {showHints && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 320, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="bg-[#111111]/30 border-r border-slate-700/50 flex flex-col"
                >
                  <div className="p-4 border-b border-slate-700/50">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <MessageSquare size={20} className="text-[#fbc05c]" />
                      AI Guide
                    </h3>
                  </div>
                  <div className="flex-1 p-4 space-y-4">
                    <div className="space-y-2">
                      {/* Backend doesn't provide explicit hints list, so we omit listing them unless we mock or update backend */}
                      <p className="text-sm text-gray-400">AI can generate hints based on the current phase objective.</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={getAIHint}
                      className="w-full bg-[#fbc05c]/20 border border-[#fbc05c]/50 text-[#fbc05c] py-2 px-4 rounded-lg hover:bg-[#fbc05c]/30 transition-colors"
                    >
                      Get AI Hint
                    </motion.button>
                    {aiMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#fbc05c]/10 border border-[#fbc05c]/30 text-[#fbc05c] p-3 rounded-lg text-sm"
                      >
                        {aiMessage}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Code Editor */}
            <div className="flex-1 flex flex-col">
              <div className="bg-[#0a0a0a]/50 border-b border-slate-700/50 p-4">
                <div className="flex items-center gap-2">
                  <Code size={20} className="text-[#fbc05c]" />
                  <span className="text-gray-300">Code Editor</span>
                  <span className="text-xs text-gray-500 ml-auto mr-4">
                    {project.tech_stack || "JavaScript/React"}
                  </span>
                  
                  {/* File Facilities */}
                  <div className="flex items-center gap-2 border-l border-slate-700/50 pl-4">
                    <button className="p-1.5 text-gray-400 hover:text-[#fbc05c] hover:bg-[#fbc05c]/10 rounded transition-colors" title="New File">
                      <FilePlus size={18} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-[#fbc05c] hover:bg-[#fbc05c]/10 rounded transition-colors" title="New Folder">
                      <FolderPlus size={18} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-[#fbc05c] hover:bg-[#fbc05c]/10 rounded transition-colors" title="Download">
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 h-full">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-[#0a0a0a]/50 border border-slate-700/50 rounded-lg p-4 text-gray-300 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  placeholder="Write your code here..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
