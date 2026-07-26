import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb, Code, Database, Globe, Smartphone, Cpu, Trash2 } from "lucide-react";
import axios from "axios";
import { useProgressStore } from "../store/useProgressStore";
import { ParticleCard } from "../components/MagicBento";
import { useMCP } from "../context/MCPProvider";

const iconMap = {
  lightbulb: Lightbulb,
  code: Code,
  database: Database,
  globe: Globe,
  smartphone: Smartphone,
  cpu: Cpu,
};

export default function ProjectLab() {
  const { generatedProjects, setProjects, addActiveProject, deleteGeneratedProject } = useProgressStore();
  const navigate = useNavigate();

  const { client, isConnected } = useMCP();

  useEffect(() => {
    if (generatedProjects.length === 0 && isConnected && client) {
      const token = sessionStorage.getItem("authToken"); // using as dummy or decoding it
      client.callTool({
        name: "market_get_recommended_projects",
        arguments: { userId: 1 } // Hardcoded for local testing, can be extracted from token
      })
      .then((res) => {
        const data = JSON.parse(res.content[0].text);
        if (data.projects) setProjects(data.projects);
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
    }
  }, [generatedProjects.length, setProjects, isConnected, client]);

  const handleStartProject = async (project) => {
    try {
      if (!isConnected || !client) {
        alert("Waiting for connection...");
        return;
      }
      
      const response = await client.callTool({
        name: "foundry_start_project",
        arguments: {
          userId: 1, // Hardcoded for local dev
          title: project.title,
          techStack: project.tech ? project.tech.join(", ") : "React, Node.js",
          description: project.description
        }
      });
      
      const data = JSON.parse(response.content[0].text);
      if (data.success && data.project) {
        // start_project returns projectData and projectId. 
        // We need to shape it with an id for the frontend state.
        const newProject = { ...data.project, id: data.projectId };
        addActiveProject(newProject);
        navigate(`/project/${newProject.id}`);
      }
    } catch (err) {
      console.error("Failed to start project:", err);
      console.warn("Falling back to mock project start.");
      const mockProject = { 
        ...project, 
        id: Date.now().toString(),
        current_phase: 1,
        phases: [
          { id: 1, title: "Environment Setup", description: "Set up the basic development environment and dependencies.", tasks: ["Initialize repository", "Install libraries", "Hello World"] },
          { id: 2, title: "Core Logic", description: "Implement the main logic for the application.", tasks: ["Design architecture", "Write core algorithms", "Basic tests"] },
          { id: 3, title: "Database Integration", description: "Connect to the database and set up schemas.", tasks: ["Setup schemas", "Write CRUD operations", "Migrate data"] },
          { id: 4, title: "API Development", description: "Build RESTful endpoints.", tasks: ["Create routes", "Add middleware", "Test endpoints"] },
          { id: 5, title: "Frontend Integration", description: "Connect the backend to the UI.", tasks: ["Fetch data", "Display data", "Handle errors"] },
          { id: 6, title: "Deployment", description: "Deploy the full application.", tasks: ["Setup server", "Configure domain", "Go live"] }
        ]
      };
      addActiveProject(mockProject);
      navigate(`/project/${mockProject.id}`);
    }
  };

  const ProjectCard = ({ project }) => {
    const IconComponent = iconMap[project.icon] || Lightbulb;
    return (
      <ParticleCard
        className="bg-[#111111]/50 border border-gray-700/50 p-5 rounded-xl hover:border-[#fbc05c]/50 cursor-pointer transition-all min-h-[200px] flex flex-col justify-between"
        onClick={() => handleStartProject(project)}
        glowColor="6, 182, 212"
      >
        <div className="flex justify-between items-start">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${project.color || 'from-gray-500 to-gray-600'} flex items-center justify-center mb-4 relative z-[101]`}>
            <IconComponent size={20} className="text-white" />
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Remove this project?")) {
                deleteGeneratedProject(project.id);
              }
            }}
            className="text-gray-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors z-[102] relative"
            title="Delete Project"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div>
          <h3 className="font-bold text-lg text-white mb-2 line-clamp-1 relative z-[101]">{project.title}</h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2 relative z-[101]">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 relative z-[101]">
          {project.tech?.slice(0, 3).map(t => (
            <span key={t} className="text-xs bg-[#0a0a0a] px-2 py-1 rounded text-gray-300 border border-gray-700">{t}</span>
          ))}
        </div>
      </ParticleCard>
    );
  };

  // Filter valid projects only
  const validProjects = generatedProjects.filter(p => p && p.title && p.id);

  // Filter projects by difficulty
  const easyProjects = validProjects.filter(p => !p.difficulty || p.difficulty.toLowerCase().includes("easy") || p.difficulty.toLowerCase().includes("beginner"));
  const mediumProjects = validProjects.filter(p => p.difficulty && (p.difficulty.toLowerCase().includes("medium") || p.difficulty.toLowerCase().includes("intermediate")));
  const hardProjects = validProjects.filter(p => p.difficulty && (p.difficulty.toLowerCase().includes("hard") || p.difficulty.toLowerCase().includes("tough") || p.difficulty.toLowerCase().includes("advanced")));

  return (
    <div className="min-h-screen bg-transparent p-6 text-gray-200">
      <Link to="/" className="flex items-center gap-2 text-[#fbc05c] hover:text-[#fbc05c]/80 mb-8 w-fit">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#fbc05c] mb-2">Project Lab</h1>
          <p className="text-gray-400">Curated projects tailored to your skill gaps.</p>
        </div>
        <Link to="/career-guidance" className="text-sm text-[#fbc05c] hover:underline">
          Need different projects? Visit Career Guidance &rarr;
        </Link>
      </div>

      {generatedProjects.length === 0 ? (
        <div className="text-center py-20 bg-[#0a0a0a]/30 rounded-2xl border border-gray-800 border-dashed">
          <Lightbulb size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400">No Projects Yet</h3>
          <p className="text-gray-500 mb-6">Upload your resume in Career Guidance to generate personalized projects.</p>
          <Link to="/career-guidance" className="btn-primary">Go to Career Guidance</Link>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Easy Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-8 bg-green-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Easy Start</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {easyProjects.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          </section>

          {/* Medium Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-8 bg-yellow-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Skill Builder (Medium)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediumProjects.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          </section>

          {/* Hard Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-8 bg-red-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Tough Challenge</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hardProjects.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}