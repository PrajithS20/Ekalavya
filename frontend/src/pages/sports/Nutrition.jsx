import { motion } from "framer-motion";
import { Droplets, Utensils, Flame } from "lucide-react";

export default function Nutrition() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                    NUTRITIONAL <span className="text-emerald-500">ARCHITECTURE</span>
                </h1>
                <p className="text-gray-400">Optimize your intake for peak output. Today's target: High Carb Loading.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Column: Macros & Hydration */}
                <div className="space-y-6">
                    {/* Macros */}
                    <div className="grid grid-cols-3 gap-4">
                        <MacroCard label="PROTEIN" value="145g" target="/ 180g" color="bg-blue-500" />
                        <MacroCard label="CARBS" value="210g" target="/ 300g" color="bg-emerald-500" />
                        <MacroCard label="FATS" value="55g" target="/ 70g" color="bg-orange-500" />
                    </div>

                    {/* Hydration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-blue-900/20 border border-blue-500/20 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden h-80"
                    >
                        <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-sm" />
                        <div className="relative z-10 flex flex-col items-center">
                            <Droplets size={48} className="text-blue-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Hydration Level</h3>
                            <div className="text-5xl font-black text-white mb-2">1,250<span className="text-2xl text-blue-400 font-normal">ml</span></div>

                            {/* Progress Bar */}
                            <div className="w-64 h-3 bg-black/40 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-blue-500 w-1/2 rounded-full" />
                            </div>
                            <p className="text-sm text-gray-400 mb-6">Target: 2,500ml</p>

                            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2 rounded-full transition-colors flex items-center gap-2">
                                + Add Water
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Today's Menu */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-black/40 border border-white/10 rounded-3xl p-6"
                >
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                        <Utensils className="text-emerald-500" size={24} />
                        <h3 className="text-xl font-bold text-white">Today's Menu</h3>
                    </div>

                    <div className="space-y-4">
                        <MealItem time="08:00 AM" name="Power Oats & Berries" tags={["High Fiber", "Pre-Workout"]} cal="450" active={true} />
                        <MealItem time="12:30 PM" name="Grilled Chicken & Quinoa" tags={["High Protein", "Lean"]} cal="620" active={true} />
                        <MealItem time="04:00 PM" name="Greek Yogurt & Honey" tags={["Recovery", "Snack"]} cal="250" />
                        <MealItem time="08:00 PM" name="Salmon & Asparagus" tags={["Omega-3", "Light"]} cal="550" />
                    </div>

                </motion.div>

            </div>
        </div>
    );
}

function MacroCard({ label, value, target, color }) {
    return (
        <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col relative overflow-hidden">
            <div className={`absolute bottom-0 left-0 h-1 ${color} w-3/4`} />
            <span className="text-xs text-gray-400 font-bold tracking-wider mb-2">{label}</span>
            <div className="flex items-baseline gap-1 relative z-10">
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-[10px] text-gray-600">{target}</span>
            </div>
        </div>
    )
}

function MealItem({ time, name, tags, cal, active }) {
    return (
        <div className={`p-4 rounded-xl flex items-center justify-between ${active ? 'bg-white/10 border border-white/20' : 'bg-black/20 border border-white/5 opacity-60'}`}>
            <div className="flex gap-4 items-center">
                <span className="text-xs text-gray-400 font-mono w-16">{time}</span>
                <div>
                    <div className="font-bold text-white text-sm mb-1">{name}</div>
                    <div className="flex gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
                <Flame size={12} /> {cal}
            </div>
        </div>
    )
}
