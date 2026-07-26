import { motion } from "framer-motion";
import { Flame, Rocket, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useMCP } from "../context/MCPProvider";

export default function LiveFeeds() {
  const [data, setData] = useState({ 
    tech_news: [
      "OpenAI announces GPT-5 release window", 
      "React 19 RC: Compiler & New Hooks", 
      "Vercel acquires Edge computing startup", 
      "Apple WWDC: Native AI in iOS 18", 
      "TSMC begins 1nm chip production",
      "Anthropic releases Claude 3.5 Sonnet"
    ], 
    dev_updates: [
      "Tailwind CSS v4.0 Alpha Released", 
      "Next.js 15: Turbopack by default", 
      "TypeScript 5.5 brings inferred type predicates", 
      "Node.js 22 adds require() for ESM", 
      "Figma introduces AI design generation",
      "GitHub Copilot Workspace goes live"
    ] 
  });

  const { client, isConnected } = useMCP();

  useEffect(() => {
    if (isConnected && client) {
      client.callTool({
        name: "market_get_live_feeds",
        arguments: { role: "Software Engineer", skills: ["React", "Node.js"] } // Default mock args
      })
      .then((res) => {
        const result = JSON.parse(res.content[0].text);
        if (result.feeds && result.feeds.length > 0) {
            setData(prev => ({
              ...prev,
              tech_news: result.feeds.slice(0, 6).map(f => f.title)
            }));
        }
      })
      .catch((err) => console.error("Failed to fetch live feeds, using fallback:", err));
    }
  }, [isConnected, client]);

  const { tech_news, dev_updates } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col p-6 bg-black border border-yellow-400/20 shadow-xl shadow-yellow-400/10 rounded-2xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-yellow-400" size={20} />
        <h3 className="text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text font-semibold uppercase tracking-widest text-sm">Weekly TLDR</h3>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Flame className="text-yellow-400 animate-pulse" size={16} />
            <h4 className="text-sm font-semibold text-gray-200">AI & Tech News</h4>
          </div>
          <ul className="space-y-2">
            {tech_news.map((news, index) => (
              <a key={news} href="#" className="block">
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-xs text-gray-300 bg-yellow-400/5 rounded-lg p-3 hover:bg-yellow-400/10 border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300 cursor-pointer line-clamp-1 hover:text-yellow-300"
                >
                  {news}
                </motion.li>
              </a>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="text-yellow-400" size={16} />
            <h4 className="text-sm font-semibold text-gray-200">Developer Updates</h4>
          </div>
          <ul className="space-y-2">
            {dev_updates.map((update, index) => (
              <a key={update} href="#" className="block">
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + 4) * 0.1 }}
                  className="text-xs text-gray-300 bg-yellow-400/5 rounded-lg p-3 hover:bg-yellow-400/10 border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300 cursor-pointer line-clamp-1 hover:text-yellow-300"
                >
                  {update}
                </motion.li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
