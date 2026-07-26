// ServicesList.jsx
import { useNavigate } from "react-router-dom";
import {
  Upload,
  MessageCircle,
  BookOpen,
  Users,
  TrendingUp,
  Briefcase,
  Map,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { ParticleCard } from "./MagicBento";

const services = [
  {
    title: "Resume Upload & Analysis",
    description: "Upload your resume for analysis",
    icon: Upload,
    path: "/upload-resume",
    headerLabel: "ANALYSIS"
  },
  {
    title: "Learning Resources",
    description: "Access guides and tutorials",
    icon: BookOpen,
    path: "/resources",
    headerLabel: "EDUCATION"
  },
  {
    title: "Project Lab",
    description: "Explore hands-on projects",
    icon: TrendingUp,
    path: "/project-lab",
    headerLabel: "PROJECTS"
  },
  {
    title: "My Lab",
    description: "Manage your active projects",
    icon: TrendingUp, // Should import Monitor or similar if available, or keep generic for now
    path: "/my-lab",
    headerLabel: "WORKSPACE"
  },
  {
    title: "Job Hub",
    description: "Find job opportunities",
    icon: Briefcase,
    path: "/job-hub",
    headerLabel: "JOBS"
  },
  {
    title: "Offline Atlas",
    description: "Navigate your career path offline",
    icon: Map,
    path: "/offline-atlas",
    headerLabel: "OFFLINE"
  },
  {
    title: "Community Network",
    description: "Join the community chat",
    icon: MessageCircle, // Changed to MessageCircle or similar
    path: "/community",
    headerLabel: "COMMUNITY"
  },
  {
    title: "Collaborate",
    description: "Work with others in real-time",
    icon: Users,
    path: "/collaborate",
    headerLabel: "COLLABORATION"
  }
];

export default function ServicesList() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="h-full"
        >
          <ParticleCard
            onClick={() => navigate(service.path)}
            className="group relative bg-[#050a12] border border-white/10 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden cursor-pointer flex flex-col items-start h-full"
            glowColor="59, 130, 246"
          >
            {/* Icon */}
            <div className="p-2 bg-white/5 rounded-lg mb-4 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all duration-300 relative z-10">
              <service.icon size={18} className="text-gray-400 group-hover:text-blue-500" />
            </div>

            {/* Header Label */}
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 relative z-10">
              {service.headerLabel}
            </div>

            {/* Title & Description */}
            <div className="flex-1 w-full relative z-10">
              <h3 className="text-sm font-semibold text-gray-200 mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">
                {service.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                {service.description}
              </p>
            </div>

            {/* Hover Arrow */}
            <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-10">
              <ArrowRight size={16} className="text-blue-500" />
            </div>
          </ParticleCard>
        </motion.div>
      ))}
    </div>
  );
}