import { motion } from "framer-motion";
import { MessageSquare, ArrowRight, History, Plus, Trophy } from "lucide-react";
import { useState } from "react";

export default function SportsCareerGuidance() {
    const [discipline, setDiscipline] = useState("");
    const [isStarted, setIsStarted] = useState(false);

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">
            <div className="mb-2">
                <button onClick={() => setIsStarted(false)} className="text-emerald-400 text-sm hover:underline mb-2 flex items-center gap-1">
                    <ArrowRight size={14} className="rotate-180" /> Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Trophy className="text-emerald-500" /> Athlete Career Map
                </h1>
                <p className="text-gray-400">Select your discipline and plan your path to pro.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0 mt-6">

                {/* Left: Input / Roadmap */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-black/40 border border-white/10 rounded-2xl p-8 flex flex-col justify-center"
                >
                    {!isStarted ? (
                        <>
                            <h2 className="text-2xl font-bold text-white mb-4">Select Your Discipline</h2>
                            <p className="text-gray-400 mb-8">Enter your sport to initialize your personalized athlete roadmap.</p>

                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    value={discipline}
                                    onChange={(e) => setDiscipline(e.target.value)}
                                    placeholder="e.g. Volleyball, Archery, MMA..."
                                    className="w-full bg-black/60 border border-emerald-500/30 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                                <button
                                    onClick={() => setIsStarted(true)}
                                    className="absolute right-2 top-2 bottom-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-6 rounded-lg transition-colors"
                                >
                                    Start
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <span className="text-gray-500 text-sm uppercase font-bold self-center mr-2">Popular:</span>
                                {["Soccer", "Basketball", "Tennis", "Cricket"].map(sport => (
                                    <button key={sport} onClick={() => setDiscipline(sport)} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full hover:bg-emerald-500/20 transition-colors">
                                        {sport}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">{discipline || "Athlete"} Roadmap</h2>
                                <button onClick={() => setIsStarted(false)} className="text-xs text-emerald-400 hover:underline">Change Sport</button>
                            </div>

                            <div className="space-y-8 pl-4 border-l-2 border-white/10 ml-2">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                    <h3 className="text-xl font-bold text-white mb-1">Amateur</h3>
                                    <ul className="text-gray-400 text-sm list-disc pl-4 space-y-1">
                                        <li>Focus: Basics</li>
                                    </ul>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 border-emerald-500 bg-black" />
                                    <h3 className="text-xl font-bold text-white mb-1">Regional</h3>
                                    <ul className="text-gray-400 text-sm list-disc pl-4 space-y-1">
                                        <li>Focus: Competitions</li>
                                    </ul>
                                    <span className="inline-block mt-2 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded border border-emerald-500/30">In Progress</span>
                                </div>

                                <div className="relative opacity-50">
                                    <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 border-gray-600 bg-black" />
                                    <h3 className="text-xl font-bold text-white mb-1">Elite</h3>
                                    <ul className="text-gray-400 text-sm list-disc pl-4 space-y-1">
                                        <li>Focus: Championships</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Right: AI Agent */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black/40 border border-white/10 rounded-2xl flex flex-col overflow-hidden"
                >
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg">
                                <MessageSquare className="text-emerald-400" size={20} />
                            </div>
                            <span className="font-bold text-white">Sports Agent AI</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><History size={18} className="text-gray-400" /></button>
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Plus size={18} className="text-gray-400" /></button>
                        </div>
                    </div>
                    <div className="flex-1 bg-black/20 p-4 flex items-center justify-center text-gray-500">
                        <p>Start a conversation to plan your career...</p>
                    </div>

                    <div className="p-4 border-t border-white/10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ask your Sports Agent..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 rounded-lg text-white hover:bg-emerald-500 transition-colors">
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
