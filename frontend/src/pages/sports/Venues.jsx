import { motion } from "framer-motion";
import { MapPin, Filter, Trophy, Navigation } from "lucide-react";

export default function Venues() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <MapPin className="text-emerald-500" /> Null Venues
                    </h1>
                    <p className="text-gray-400">Finding the best courts, fields, and gyms for null near you.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white/10 rounded-lg text-sm text-white border border-white/20">All</button>
                    <button className="px-3 py-1 bg-black/40 rounded-lg text-sm text-gray-400 border border-white/5">Training</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VenueCard
                    title="Iron Gym Elite"
                    status="OPEN 24/7"
                    icon={Trophy} // Replacing Dumbbell with generic icon if needed, or keeping it
                    bg="bg-emerald-900/20"
                />
                <VenueCard
                    title="City Stadium"
                    status="EVENT TODAY"
                    type="stadium"
                    bg="bg-orange-900/20"
                    iconColor="text-orange-500"
                />
                <VenueCard
                    title="Community Center"
                    status="OPEN"
                    bg="bg-blue-900/20"
                    iconColor="text-emerald-500"
                />
            </div>
        </div>
    );
}

function VenueCard({ title, status, bg, iconColor = "text-emerald-500" }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`h-48 rounded-2xl p-6 relative overflow-hidden bg-black/40 border border-white/10 group cursor-pointer`}
        >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <Navigation size={64} className="text-white" />
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center border border-white/5`}>
                    <MapPin size={24} className={iconColor} />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                    <p className="text-xs font-bold text-gray-500 tracking-wider uppercase">{status}</p>
                </div>
            </div>
        </motion.div>
    )
}
