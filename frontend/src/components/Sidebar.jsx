import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useProgressStore } from "../store/useProgressStore";
import {
  Home, // Changed from LayoutDashboard
  FlaskConical,
  Map,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  User,
  BookOpen,
  LogOut,
  Code,
  GraduationCap,
  Users,
  Sparkles,
  MessageSquare,
  Rocket, // New for Project Lab
  Monitor, // New for My Lab
} from "lucide-react";
import Galaxy from "./Galaxy";
import { VelIcon } from "./VelIcon";

const navGroups = [
  {
    title: "PLATFORM",
    items: [
      { label: "Home", icon: Home, path: "/" },
      { label: "Career Guidance", icon: FlaskConical, path: "/career-guidance" }
    ]
  },
  {
    title: "WORKSPACE",
    items: [
      { label: "Project Lab", icon: Rocket, path: "/project-lab" },
      { label: "My Lab", icon: Monitor, path: "/my-lab" },
      { label: "Job Hub", icon: Briefcase, path: "/job-hub" }
    ]
  },
  {
    title: "COMMUNITY",
    items: [
      { label: "Community", icon: MessageSquare, path: "/community" },
      { label: "Collaborate", icon: Users, path: "/collaborate" }
    ]
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Offline Atlas", icon: Map, path: "/offline-atlas" }
    ]
  },
  {
    title: "RESEARCH",
    items: [
      { label: "Research", icon: BookOpen, path: "/research" }
    ]
  }
];

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useProgressStore();

  return (
    <>
      {/* Collapsed Sidebar Toggle */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed left-0 top-20 z-50"
          >
            <button
              onClick={toggleSidebar}
              className="bg-gradient-to-r from-[#111111]/95 to-[#0a0a0a]/95 backdrop-blur-xl border-r border-slate-700/50 p-3 rounded-r-lg shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
            >
              <ChevronRight
                size={20}
                className="text-gray-400 group-hover:text-[#fbc05c] transition-colors"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full flex flex-col p-6 border-r border-white/5 shadow-2xl relative bg-black/20 backdrop-blur-xl overflow-hidden"
          >
            {/* Local Galaxy Background REMOVED for consistency */}
            {/* <div className="absolute inset-0 z-0"><Galaxy ... /></div> */}

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => navigate("/")}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#fbc05c] to-[#f9dc75] flex items-center justify-center shadow-lg shadow-[#fbc05c]/20">
                    <VelIcon size={20} className="text-[#0a0a0a]" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <h1 className="text-white text-xl font-bold tracking-widest group-hover:text-[#fbc05c] transition-colors">
                      EKALAVYA
                    </h1>
                  </motion.div>
                </motion.div>
                <button
                  onClick={toggleSidebar}
                  className="text-gray-400 hover:text-white transition-colors bg-white/5 p-1.5 rounded-lg hover:bg-white/10"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>

              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2"
              >
                {navGroups.map((group, groupIndex) => (
                  <div key={group.title}>
                    <h3 className="text-xs font-bold text-gray-500 tracking-widest mb-2 px-2">
                      {group.title}
                    </h3>
                    <div className="space-y-1">
                      {group.items.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * (groupIndex + index) }}
                          className={`nav-item cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 relative overflow-hidden group ${location.pathname === item.path
                            ? "bg-[#fbc05c]/10 text-[#fbc05c]"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                          onClick={() => navigate(item.path)}
                        >
                          {location.pathname === item.path && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 rounded-r-full bg-[#fbc05c]"></div>
                          )}
                          <item.icon
                            size={16}
                            className={`transition-transform duration-300 ${location.pathname === item.path ? "scale-110" : "group-hover:scale-110"}`}
                          />
                          <span className="font-medium text-sm tracking-wide">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 pt-4 border-t border-white/10"
              >
                <div
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-[#0a0a0a] flex items-center justify-center border border-white/10 group-hover:border-[#fbc05c]/50 transition-colors">
                    <User size={20} className="text-gray-300 group-hover:text-[#fbc05c]" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm group-hover:text-[#fbc05c] transition-colors">
                      {sessionStorage.getItem("userName") || "Cadet"}
                    </p>
                    {/* Level removed as requested */}
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 group font-medium"
                >
                  <LogOut
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                  <span>Logout</span>
                </button>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
