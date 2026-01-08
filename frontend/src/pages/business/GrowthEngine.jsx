import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Zap, FileText, Target, Crosshair } from "lucide-react";

export default function GrowthEngine() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <TrendingUp className="text-orange-500" /> Growth Engine
                </h1>
                <p className="text-gray-400">Scale your venture with AI tools and connect with investors.</p>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-yellow-500 mb-2 text-sm font-medium"><BarChart2Icon /> Investment Readiness</div>
                    <div className="text-4xl font-bold text-white mb-1">78/100</div>
                    <div className="text-green-400 text-xs">+5 pts this week</div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-yellow-500 mb-2 text-sm font-medium"><Users size={16} /> Network Reach</div>
                    <div className="text-4xl font-bold text-white mb-1">1.2k</div>
                    <div className="text-gray-400 text-xs">Founders & Investors</div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-yellow-500 mb-2 text-sm font-medium"><DollarSign size={16} /> Market Share Potential</div>
                    <div className="text-4xl font-bold text-white mb-1">$4.5M</div>
                    <div className="text-gray-400 text-xs">TAM Estimation</div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Optimization Toolkit */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-white">Optimization Toolkit</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ToolCard icon={Zap} color="text-orange-500" bg="bg-orange-500/20" title="AI Business Audit" desc="Analyze your business model for gaps." />
                        <ToolCard icon={FileText} color="text-blue-500" bg="bg-blue-500/20" title="Pitch Deck Refiner" desc="Optimize your deck for VCs." />
                        <ToolCard icon={Target} color="text-pink-500" bg="bg-pink-500/20" title="Competitor Intel" desc="Real-time tracking of rivals." />
                        <motion.div className="bg-white/5 border border-white/10 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-white/10 cursor-pointer transition-colors">
                            <RocketIcon />
                            <span className="text-sm mt-2">Add Custom Module</span>
                        </motion.div>
                    </div>
                </div>

                {/* Capital Connect */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Capital Connect</h2>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
                        <InvestorCard initial="H" name="Horizon Ventures" match="95%" type="Seed Fund • IoT, AI" />
                        <InvestorCard initial="G" name="Global Founders Capital" match="88%" type="Series A • SaaS" />
                        <InvestorCard initial="T" name="TechStars Accelerator" match="85%" type="Accelerator • Early Stage" />

                        <button className="w-full py-3 bg-yellow-600/20 text-yellow-500 border border-yellow-600/50 rounded-xl font-bold hover:bg-yellow-600/30 transition-colors mt-4">
                            View All Investors
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ToolCard({ icon: Icon, color, bg, title, desc }) {
    return (
        <motion.div whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer">
            <div className={`p-3 w-fit rounded-xl ${bg} mb-4`}>
                <Icon size={24} className={color} />
            </div>
            <h3 className="font-bold text-white mb-1">{title}</h3>
            <p className="text-xs text-gray-400">{desc}</p>
        </motion.div>
    )
}

function InvestorCard({ initial, name, match, type }) {
    return (
        <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-900/50 text-yellow-500 flex items-center justify-center font-bold border border-yellow-500/20">
                    {initial}
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm">{name}</h4>
                    <p className="text-[10px] text-gray-400">{type}</p>
                </div>
            </div>
            <div className="text-right">
                <div className="text-green-500 font-bold text-sm">{match}</div>
                <div className="text-[10px] text-gray-500">Match</div>
            </div>
        </div>
    )
}

function BarChart2Icon() { return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> }
function RocketIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg> }
