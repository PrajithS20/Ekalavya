import { motion } from "framer-motion";
import { Dumbbell, Calendar, PlayCircle, CheckCircle, Circle } from "lucide-react";

export default function TrainingLog() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-1">Elite Performance</h1>
                    <p className="text-gray-400">Your regimen is live. Check in daily to maintain your streak.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-black/40 border border-white/10 px-4 py-2 rounded-xl text-center">
                        <div className="text-xl font-bold text-white flex items-center gap-1">450 <span className="text-orange-500">🔥</span></div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Streak Score</div>
                    </div>
                    <div className="bg-black/40 border border-white/10 px-4 py-2 rounded-xl text-center">
                        <div className="text-xl font-bold text-white">33%</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Completion</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Workout Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 relative h-96 rounded-3xl overflow-hidden group cursor-pointer"
                >
                    <div className="absolute inset-0 bg-emerald-900/80 group-hover:bg-emerald-900/90 transition-colors z-0" />
                    {/* Gym Image Overlay Placeholder */}
                    <div className="absolute inset-0 bg-[url('/gym_bg.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay" />

                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded uppercase">High Intensity</span>
                            <span className="px-3 py-1 bg-black/50 text-white text-xs font-bold rounded uppercase">50 Min</span>
                        </div>
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Lower Body Strength</h2>
                        <p className="text-emerald-100 max-w-lg mb-8">Focus on box jumps, squats, and lunges. Equipment needed: Barbell, Plyo Box.</p>

                        <button className="w-fit bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-3 rounded-full flex items-center gap-2 transition-colors">
                            <PlayCircle size={20} /> START SESSION
                        </button>
                    </div>
                </motion.div>

                {/* Weekly Plan */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black/40 border border-white/10 rounded-3xl p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Calendar className="text-emerald-500" size={24} />
                        <h3 className="text-xl font-bold text-white">Weekly Plan</h3>
                    </div>

                    <div className="space-y-3">
                        <PlanItem day="Mon" title="Upper Body Power" duration="45m" intensity="High" status="completed" />
                        <PlanItem day="Tue" title="Cardio + Core" duration="30m" intensity="Med" status="completed" />
                        <PlanItem day="Wed" title="Rest & Recovery" duration="-" intensity="-" status="pending" />
                        <PlanItem day="Thu" title="Lower Body Strength" duration="50m" intensity="High" status="pending" active={true} />
                        <PlanItem day="Fri" title="HIIT Intervals" duration="25m" intensity="High" status="pending" />
                        <PlanItem day="Sat" title="Team Drills" duration="90m" intensity="High" status="pending" />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

function PlanItem({ day, title, duration, intensity, status, active }) {
    return (
        <div className={`p-4 rounded-xl flex items-center justify-between ${active ? 'bg-white/10 border border-white/20' : 'bg-black/20 border border-white/5'}`}>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-emerald-500 w-8">{day}</span>
                    <span className="text-sm font-bold text-white">{title}</span>
                </div>
                {duration !== '-' && (
                    <div className="flex items-center gap-2 pl-11">
                        <span className="text-xs text-gray-400">{duration}</span>
                        {intensity === 'High' && <span className="text-[10px] text-orange-500">🔥 High</span>}
                    </div>
                )}
            </div>

            {status === 'completed' ? (
                <CheckCircle size={18} className="text-emerald-500" />
            ) : (
                <Circle size={18} className="text-gray-600" />
            )}
        </div>
    )
}
