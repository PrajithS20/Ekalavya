import { motion } from "framer-motion";
import { Globe, TrendingUp, TrendingDown, FileText, BarChart2, BookOpen } from "lucide-react";

export default function GlobalMarkets() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Globe className="text-orange-500" /> Global Markets
                </h1>
                <p className="text-gray-400">Explore global trends and market opportunities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Trends */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group cursor-pointer"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-yellow-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <Globe size={24} className="text-yellow-400" />
                        </div>
                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">Report</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Global Tech Trends</h3>
                    <p className="text-gray-400 text-sm">Real-time AI analysis of current market dynamics.</p>
                </motion.div>

                {/* Card 2: Emerging Markets */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group cursor-pointer"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-yellow-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <Globe size={24} className="text-yellow-400" />
                        </div>
                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">Data</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Emerging Markets 2026</h3>
                    <p className="text-gray-400 text-sm">Real-time AI analysis of current market dynamics.</p>
                </motion.div>

                {/* Card 3: Legal Frameworks */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group cursor-pointer"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-yellow-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <FileText size={24} className="text-yellow-400" />
                        </div>
                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">Guide</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Legal Frameworks for Founders</h3>
                    <p className="text-gray-400 text-sm">Essential legal structures for new ventures.</p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-yellow-500/20 rounded-xl">
                        <TrendingUp size={24} className="text-yellow-400" />
                    </div>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">Course</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Growth Hacking Strategies</h3>
                <p className="text-gray-400 text-sm">Scale your user base with zero budget.</p>
            </motion.div>
        </div>
    );
}
