import { motion } from "framer-motion";
import { Lightbulb, Rocket, MessageSquare, History, Plus } from "lucide-react";

export default function StartupIncubator() {
    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Startup Incubator</h1>
                <p className="text-gray-400">Validate your idea and build your startup with AI assistance.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">

                {/* Left: Startup Launchpad */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                            <Lightbulb className="text-orange-400" size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Startup Launchpad</h2>
                    </div>

                    <p className="text-gray-400 text-sm mb-6">
                        Describe your business idea, product vision, or problem statement. Our AI Consultant
                        will help you validate the market, define a roadmap, and build your MVP.
                    </p>

                    <textarea
                        className="w-full h-48 bg-black/30 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 resize-none transition-colors"
                        placeholder="e.g. A marketplace for local artisans to sell handmade goods with same-day delivery..."
                    />
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500 mb-6">
                        <span>Or upload a pitch deck (PDF)</span>
                        <span>0 chars</span>
                    </div>

                    <div className="mt-auto">
                        <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold text-white shadow-lg hover:shadow-orange-500/20 transition-all">
                            <span className="flex items-center justify-center gap-2">
                                <Rocket size={18} /> Launch Startup Assistant
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Right: AI Consultant Chat Area */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl flex flex-col overflow-hidden"
                >
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                <MessageSquare className="text-yellow-400" size={20} />
                            </div>
                            <span className="font-bold text-white">Startup Consultant AI</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><History size={18} className="text-gray-400" /></button>
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Plus size={18} className="text-gray-400" /></button>
                        </div>
                    </div>

                    <div className="flex-1 bg-black/30 p-4 flex items-center justify-center text-gray-500">
                        {/* Chat History Placeholder */}
                        <p>Start a conversation to see AI insights...</p>
                    </div>

                    <div className="p-4 bg-black/20 border-t border-white/10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ask your Startup Consultant..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-colors">
                                <Rocket size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
