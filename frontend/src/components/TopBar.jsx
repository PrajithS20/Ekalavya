import { motion } from "framer-motion";
import { Newspaper, Zap, Radio } from "lucide-react";
import { useState } from "react";

export default function TopBar() {
  const [items] = useState([
    { icon: Zap, text: "BREAKING: Anthropic announces new Opus model with 2M context window", color: "text-blue-400" },
    { icon: Radio, text: "NVIDIA overtakes Apple as most valuable company amid AI boom", color: "text-blue-400" },
    { icon: Newspaper, text: "React 19 officially released with new use() hook and compiler", color: "text-blue-400" },
    { icon: Zap, text: "Vercel introduces new serverless database offering", color: "text-blue-400" },
    { icon: Radio, text: "EU passes comprehensive AI Act regulating high-risk models", color: "text-blue-400" }
  ]);

  return (
    <div className="glass-effect px-6 py-4 overflow-hidden relative border-b border-blue-500/10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent animate-pulse-slow"></div>
      <motion.div
        className="flex gap-16 text-sm font-semibold text-gray-300 whitespace-nowrap relative z-10"
        animate={{ x: [0, -2000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40, 
            ease: "linear",
          },
        }}
      >
        {/* Duplicate list for infinite scroll effect */}
        {[...items, ...items, ...items].map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <item.icon size={16} className={`${item.color} animate-pulse`} />
            <span className="hover:text-blue-400 transition-colors tracking-wide">{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
