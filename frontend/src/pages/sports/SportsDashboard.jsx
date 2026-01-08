import { motion } from "framer-motion";
import { Heart, Activity, Timer, Zap, Trophy, Target } from "lucide-react";

export default function SportsDashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Centered Heart Rate Monitor */}
            <div className="flex items-center justify-center py-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-96 h-96 flex items-center justify-center"
                >
                    {/* Pulsing Circles */}
                    <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping-slow" />
                    <div className="absolute inset-8 rounded-full border border-emerald-500/30" />
                    <div className="absolute inset-16 rounded-full bg-gradient-to-b from-emerald-500/5 to-transparent backdrop-blur-sm" />

                    {/* Center Content */}
                    <div className="flex flex-col items-center z-10">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart size={80} className="text-emerald-400 fill-emerald-400/20 mb-4" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-emerald-400">Peak Condition</h2>
                        <p className="text-gray-400 mb-4">Readiness: <span className="text-white font-bold">78%</span></p>

                        {/* Progress Bar */}
                        <div className="w-48 h-3 bg-gray-700/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 w-[78%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Recent Training */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-black/40 border border-white/10 rounded-2xl p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="text-yellow-400" size={24} />
                        <h3 className="text-xl font-bold text-white">Recent Training</h3>
                    </div>

                    <div className="space-y-4">
                        <TrainingItem name="HIIT" duration="45 min" intensity="High" color="text-red-400" />
                        <TrainingItem name="Recovery" duration="30 min" intensity="Low" color="text-blue-400" />
                        <TrainingItem name="Strength" duration="60 min" intensity="High" color="text-red-400" />
                    </div>
                </motion.div>

                {/* Competitions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black/40 border border-white/10 rounded-2xl p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Trophy className="text-yellow-400" size={24} />
                        <h3 className="text-xl font-bold text-white">Competitions</h3>
                    </div>

                    <ul className="space-y-4">
                        <CompetitionItem title="Regional Marathon" time="2 Days" dotColor="text-emerald-400" />
                        <CompetitionItem title="Team Tryouts" time="5 Days" dotColor="text-emerald-400" />
                        <CompetitionItem title="Fitness Assessment" time="1 Week" dotColor="text-emerald-400" />
                    </ul>
                </motion.div>

            </div>
        </div>
    );
}

function TrainingItem({ name, duration, intensity, color }) {
    return (
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
            <span className="font-bold text-white">{name}</span>
            <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">{duration}</span>
                <span className={`text-xs px-2 py-1 rounded bg-white/10 ${color}`}>{intensity}</span>
            </div>
        </div>
    )
}

function CompetitionItem({ title, time, dotColor }) {
    return (
        <li className="flex items-center gap-3 text-gray-300">
            <span className={`text-[10px] ${dotColor}`}>●</span>
            <span className="flex-1">{title}</span>
            <span className="text-gray-500 text-sm">{time}</span>
        </li>
    )
}
