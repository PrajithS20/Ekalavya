import { motion } from "framer-motion";
import { Video, UserPlus, Users, MessageSquare, Mic, Camera, PhoneOff, Send } from "lucide-react";

export default function Boardroom() {
    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <span className="text-orange-500">◎</span> Boardroom
                    </h1>
                    <p className="text-gray-400">Strategic command center for team meetings and discussions.</p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <UserPlus size={18} /> Invite Member
                </button>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">

                {/* Main Video Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-3 bg-black/40 border border-white/10 rounded-2xl relative overflow-hidden flex flex-col"
                >
                    <div className="flex-1 flex flex-col items-center justify-center relative">
                        {/* Placeholder for Video Stream */}
                        <div className="w-24 h-24 rounded-full bg-orange-500/20 flex items-center justify-center mb-4 animate-pulse">
                            <Video size={40} className="text-orange-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Weekly Sync</h2>
                        <p className="text-gray-400 mb-6">Scheduled for 10:00 AM - 11:00 AM</p>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-green-900/30 transition-all hover:scale-105">
                            Join Meeting
                        </button>
                    </div>

                    {/* Controls Bar */}
                    <div className="h-20 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-center gap-4">
                        <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"><Mic size={20} /></button>
                        <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"><Camera size={20} /></button>
                        <button className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors shadow-lg shadow-red-900/20"><PhoneOff size={20} /></button>
                    </div>
                </motion.div>

                {/* Sidebar: Members & Chat */}
                <div className="flex flex-col gap-6 h-full">
                    {/* Members */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-4 flex-1"
                    >
                        <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-medium uppercase tracking-wider">
                            <Users size={16} /> Team Members (3)
                        </div>
                        <div className="space-y-3">
                            {[
                                { name: "Sarah", role: "In Meeting", color: "bg-blue-500" },
                                { name: "Mike", role: "In Meeting", color: "bg-purple-500" },
                                { name: "Jessica", role: "Offline", color: "bg-gray-500" }
                            ].map((member) => (
                                <div key={member.name} className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-sm`}>
                                        {member.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm">{member.name}</p>
                                        <p className={`text-xs ${member.role === 'Offline' ? 'text-gray-500' : 'text-green-400'}`}>{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Chat */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-4 flex-[1.5] flex flex-col"
                    >
                        <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-medium uppercase tracking-wider">
                            <MessageSquare size={16} /> Meeting Chat
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 custom-scrollbar">
                            <div className="mb-2">
                                <p className="text-blue-400 text-xs font-bold mb-1">Sarah (CEO) <span className="text-gray-500 font-normal ml-1">10:00 AM</span></p>
                                <div className="bg-white/10 p-2 rounded-lg rounded-tl-none text-sm text-gray-200">
                                    Let's review the Q1 roadmap.
                                </div>
                            </div>
                            <div className="mb-2">
                                <p className="text-purple-400 text-xs font-bold mb-1">Mike (CTO) <span className="text-gray-500 font-normal ml-1">10:02 AM</span></p>
                                <div className="bg-white/10 p-2 rounded-lg rounded-tl-none text-sm text-gray-200">
                                    I've updated the tech stack options.
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full bg-black/30 border border-white/10 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-400">
                                <Send size={16} />
                            </button>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
