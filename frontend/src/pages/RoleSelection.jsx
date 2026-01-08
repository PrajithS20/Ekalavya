import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Code, TrendingUp, Trophy, Palette, ArrowRight } from "lucide-react";
import Galaxy from "../components/Galaxy";

const ROLES = [
    {
        id: "software",
        title: "Software & Technology",
        desc: "Build the future with code and innovative technology.",
        icon: Code,
        color: "from-cyan-500 to-blue-600",
        path: "/"
    },
    {
        id: "business",
        title: "Business & Startup",
        desc: "Lead organizations and drive strategic growth.",
        icon: TrendingUp,
        color: "from-orange-500 to-red-600",
        path: "/business"
    },
    {
        id: "sports",
        title: "Sports & Athletics",
        desc: "Achieve peak performance and master your discipline.",
        icon: Trophy,
        color: "from-green-500 to-emerald-600",
        path: "/sports"
    }
];

export default function RoleSelection() {
    const navigate = useNavigate();

    const handleSelect = (role) => {
        if (role.path) {
            navigate(role.path);
        } else {
            alert("This path is coming soon! Please choose Software & Technology for now.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black text-white flex flex-col items-center justify-center p-4">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Galaxy starSpeed={0.2} />
            </div>

            <div className="relative z-10 max-w-6xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
                        Choose Your Path
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Select your professional domain to customize your workspace and tools.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ROLES.map((role, index) => (
                        <motion.button
                            key={role.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleSelect(role)}
                            className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-left hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2"
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />

                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-glow transition-all duration-300`}>
                                <role.icon size={32} className="text-white" />
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                                {role.title}
                            </h3>

                            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                                {role.desc}
                            </p>

                            <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                                <span>Select Pathway</span>
                                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}
