import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Activity, Globe, DollarSign } from "lucide-react";

export default function BusinessDashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400">Overview of your venture's performance.</p>
                </div>
                <div className="flex gap-4">
                    {/* Future: Add quick actions */}
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Centerpiece: Visionary Level */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden h-96"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.3)] mb-6 animate-pulse-slow">
                            <Trophy size={64} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-orange-400 mb-2">Visionary Level 1</h2>
                        <p className="text-gray-400 mb-6">Market Influence: <span className="text-white font-bold">65%</span></p>

                        {/* Progress Bar */}
                        <div className="w-full max-w-sm h-3 bg-gray-700/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Market Pulse */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Activity className="text-orange-400" size={20} />
                            <h3 className="font-bold text-lg">Market Pulse</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-gray-300 font-medium">NSDQ</span>
                                <span className="text-green-400 text-sm font-bold flex items-center gap-1">
                                    +1.2% <TrendingUp size={14} />
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-gray-300 font-medium">S&P</span>
                                <span className="text-green-400 text-sm font-bold flex items-center gap-1">
                                    +0.8% <TrendingUp size={14} />
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-gray-300 font-medium">FX</span>
                                <span className="text-red-400 text-sm font-bold flex items-center gap-1">
                                    -0.3% <TrendingDown size={14} />
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="text-purple-400" size={20} />
                            <h3 className="font-bold text-lg">Industry News</h3>
                        </div>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex gap-2">
                                <span className="text-orange-500">↗</span>
                                New AI Regulations Impacting SaaS
                            </li>
                            <li className="flex gap-2">
                                <span className="text-orange-500">↗</span>
                                Sustainable Supply Chains Rising
                            </li>
                            <li className="flex gap-2">
                                <span className="text-orange-500">↗</span>
                                Remote Work Trends 2026
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Bottom: Quick Stats/Services */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Placeholders for services overview if needed */}
            </div>
        </div>
    );
}
