import { motion } from "framer-motion";
import { Zap, Activity, Trophy } from "lucide-react";

export default function MyStats() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-emerald-400 mb-1">My Stats</h1>
                    <p className="text-gray-400">Track your performance, recovery, and achievements.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors">
                    <Activity size={16} /> Sync Wearable
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={Zap}
                    color="text-emerald-400"
                    title="Energy Output"
                    value="2,450"
                    unit="kcal"
                />
                <StatCard
                    icon={Activity}
                    color="text-emerald-400"
                    title="Recovery Score"
                    value="88"
                    unit="/ 100"
                />
                <StatCard
                    icon={Trophy}
                    color="text-emerald-400"
                    title="Season Goals"
                    value="4"
                    unit="Pending"
                />
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, color, title, value, unit }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-6"
        >
            <div className={`flex items-center gap-2 mb-4 font-bold ${color}`}>
                <Icon size={20} /> {title}
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">{value}</span>
                <span className="text-gray-500 font-medium">{unit}</span>
            </div>
        </motion.div>
    )
}
