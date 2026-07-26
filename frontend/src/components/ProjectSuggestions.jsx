import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Code,
  Database,
  Globe,
  Smartphone,
  Cpu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useProgressStore } from "../store/useProgressStore";
import { useMCP } from "../context/MCPProvider";

const iconMap = {
  lightbulb: Lightbulb,
  code: Code,
  database: Database,
  globe: Globe,
  smartphone: Smartphone,
  cpu: Cpu,
};

export default function ProjectSuggestions() {
  const { generatedProjects, setProjects, addActiveProject } = useProgressStore();
  const navigate = useNavigate();

  const { client, isConnected } = useMCP();

  useEffect(() => {
    if (generatedProjects.length === 0 && isConnected && client) {
      client.callTool({
        name: "market_get_recommended_projects",
        arguments: { userId: 1 }
      })
      .then((res) => {
        const data = JSON.parse(res.content[0].text);
        if (data.projects) {
          setProjects(data.projects);
        }
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
    }
  }, [generatedProjects.length, setProjects, isConnected, client]);

  const handleStartProject = async (project) => {
    try {
      if (!isConnected || !client) return;
      
      const response = await client.callTool({
        name: "foundry_start_project",
        arguments: {
          userId: 1, // Hardcoded for dev
          title: project.title,
          techStack: project.tech ? project.tech.join(", ") : "React, Node.js",
          description: project.description
        }
      });

      const data = JSON.parse(response.content[0].text);
      if (data.success && data.project) {
        const newProject = { ...data.project, id: data.projectId };
        addActiveProject(newProject);
        navigate(`/project/${newProject.id}`);
      }
    } catch (err) {
      console.error("Failed to start project:", err);
      alert("Failed to initialize Mission Control.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-800/50 to-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 min-h-[400px]"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#fbc05c] to-[#fbc05c] flex items-center justify-center">
          <Lightbulb size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Project Suggestions</h3>
          <p className="text-sm text-gray-400">Based on your resume & skills</p>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {generatedProjects.length === 0 ? (
          <p className="text-gray-400 text-sm">No projects found. Upload a resume to get specific suggestions!</p>
        ) : (
          generatedProjects.map((project, index) => {
            const IconComponent = iconMap[project.icon] || Lightbulb;
            return (
              <div key={project.id || project.title} onClick={() => handleStartProject(project)}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-lg p-4 border border-gray-600/30 hover:border-[#fbc05c]/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-md bg-gradient-to-r ${project.color || 'from-gray-500 to-gray-600'} flex items-center justify-center flex-shrink-0 mt-1`}
                    >
                      <IconComponent size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-[#fbc05c] transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {(project.tech || []).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-gray-600/50 rounded text-xs text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${project.difficulty === "Beginner"
                            ? "bg-green-500/20 text-green-400"
                            : project.difficulty === "Intermediate"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                            }`}
                        >
                          {project.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
