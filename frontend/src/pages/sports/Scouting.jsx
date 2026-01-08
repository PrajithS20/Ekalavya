import { motion } from "framer-motion";
import { Search, Flag, Trophy, Award } from "lucide-react";

export default function Scouting() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-emerald-500">Scouting Network</h1>
                    <p className="text-gray-400">Connect with top teams, attend tryouts, and get scouted.</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2 rounded-full shadow-lg shadow-emerald-500/20 transition-all">
                    Create Player Profile
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Search teams, leagues, or positions..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-emerald-500/50"
                />
            </div>

            <div className="space-y-4">
                <ScoutItem
                    icon={Flag}
                    title="Regional Tryouts"
                    sub="City United FC"
                    loc="Downtown Stadium"
                    tag="Pro Contract"
                    tagColor="text-emerald-400"
                    badges={["Striker", "Midfield"]}
                />
                <ScoutItem
                    icon={Trophy}
                    title="Talent Scout Review"
                    sub="Elite Agency"
                    loc="Virtual"
                    tag="Representation"
                    tagColor="text-emerald-400"
                    badges={["All Positions"]}
                />
                <ScoutItem
                    icon={Award}
                    title="Academy Entrance"
                    sub="Thunder Academy"
                    loc="Sports Complex"
                    tag="Scholarship"
                    tagColor="text-emerald-400"
                    badges={["U-18", "U-21"]}
                />
            </div>
        </div>
    );
}

function ScoutItem({ icon: Icon, title, sub, loc, tag, tagColor, badges }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group"
        >
            <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-900/20 border border-emerald-500/20 flex items-center justify-center">
                    <Icon size={24} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                    <div className="flex gap-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><span className="text-gray-500">By</span> {sub}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><span className="text-gray-500">At</span> {loc}</span>
                        <span className={`font-bold ml-2 ${tagColor}`}>{tag}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex gap-2">
                    {badges.map(b => (
                        <span key={b} className="px-3 py-1 bg-black/40 border border-white/10 rounded-lg text-xs text-gray-300 font-medium">
                            {b}
                        </span>
                    ))}
                </div>
                <button className="px-6 py-2 bg-emerald-500/10 text-emerald-400 font-bold rounded-lg border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all">
                    Apply Now
                </button>
            </div>
        </motion.div>
    )
}
