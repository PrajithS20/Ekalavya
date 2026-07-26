import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hash,
  MessageSquare,
  Send,
  Paperclip,
  Image as ImageIcon,
  Code as CodeIcon,
  MoreVertical,
  Search,
  Users,
  FileText,
  Smile,
  Trash2
} from "lucide-react";
import TopBar from "../components/TopBar";
import { useMCP } from "../context/MCPProvider";

export default function CommunityChat() {
  const [activeChannel, setActiveChannel] = useState(null);
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const currentUser = sessionStorage.getItem("userName"); // Get logged in user name
  const { client, isConnected } = useMCP();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch Channels on Mount
  useEffect(() => {
    if (!client || !isConnected) return;
    const fetchChannels = async () => {
      try {
        const res = await client.callTool({
            name: "market_get_community_channels",
            arguments: {}
        });
        const data = JSON.parse(res.content[0].text);
        setChannels(data);
        if (data.length > 0) setActiveChannel(data[0]);
      } catch (err) {
        console.error("Failed to fetch channels", err);
      }
    };
    fetchChannels();
  }, [client, isConnected]);

  // Poll Messages
  useEffect(() => {
    if (!activeChannel || !client || !isConnected) return;

    const fetchMessages = async () => {
      try {
        const res = await client.callTool({
            name: "market_get_community_messages",
            arguments: { channel: activeChannel.name }
        });
        const data = JSON.parse(res.content[0].text);
        setMessages(data);
      } catch (err) { }
    };

    fetchMessages(); // Initial fetch
    const interval = setInterval(fetchMessages, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, [activeChannel, client, isConnected]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChannel || !client) return;

    const tempMsg = {
      id: Date.now(),
      user: "You",
      avatar: "",
      role: "Member",
      content: newMessage,
      time: new Date().toLocaleTimeString(),
      type: "text",
      channel: activeChannel.name
    };
    setMessages(prev => [...prev, tempMsg]);
    const msgToSend = newMessage;
    setNewMessage("");

    try {
      await client.callTool({
          name: "market_send_community_message",
          arguments: {
              channel: activeChannel.name,
              content: msgToSend
          }
      });
    } catch (err) {
      console.error("Failed to send", err);
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!confirm("Delete this message?")) return;
    // Assume MCP has a delete or we just filter locally for prototype
    setMessages(prev => prev.filter(m => m.id !== msgId));
  };

  return (
    <div className="flex flex-col h-screen bg-transparent text-gray-200">
      <TopBar />

      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full p-4 gap-4">
        {/* Sidebar - Channel List */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-[#0a0a0a]/50 backdrop-blur-md border border-white/5 rounded-2xl flex flex-col hidden md:flex"
        >
          <div className="p-4 border-b border-white/5">
            <h2 className="font-bold text-lg text-white mb-4">Community</h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Find channels..."
                className="w-full bg-[#0B1221] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-gray-300 focus:outline-none focus:border-[#fbc05c]/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-6">
            {/* Categories */}
            {[...new Set(channels.map(c => c.category))].map(category => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">{category}</h3>
                <div className="space-y-1">
                  {channels.filter(c => c.category === category).map(channel => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${activeChannel?.id === channel.id
                        ? "bg-[#fbc05c]/10 text-[#fbc05c]"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                        }`}
                    >
                      <Hash size={16} />
                      {channel.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#fbc05c] to-[#fbc05c] flex items-center justify-center">
                <span className="font-bold text-white text-xs">Y</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">You</p>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Chat Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 bg-[#0a0a0a]/50 backdrop-blur-md border border-white/5 rounded-2xl flex flex-col overflow-hidden relative"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#fbc05c]/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Chat Header */}
          <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0a]/50 backdrop-blur-sm z-10">
            <div className="flex items-center gap-2">
              <Hash size={24} className="text-[#fbc05c]" />
              <div>
                <h2 className="font-bold text-white">{activeChannel?.name || "Select a Channel"}</h2>
                <p className="text-xs text-gray-400">Topic: General discussion for {activeChannel?.name || "..."}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B1221] bg-gray-700" />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-[#0B1221] bg-[#111111] flex items-center justify-center text-xs font-bold text-gray-400">+24</div>
              </div>
              <MoreVertical size={20} className="cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {!activeChannel ? (
              <div className="flex items-center justify-center h-full text-gray-500">Select a channel to start chatting</div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 group ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}>
                  <img src={msg.avatar || `https://ui-avatars.com/api/?name=${msg.user}&background=random`} alt={msg.user} className="w-10 h-10 rounded-full bg-gray-700 object-cover" />
                  <div className={`max-w-[70%] ${msg.user === 'You' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-gray-200">{msg.user}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>

                    {msg.type === 'text' && (
                      <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.user === 'You'
                        ? 'bg-[#fbc05c]/20 text-cyan-50 border border-[#fbc05c]/30 rounded-tr-none'
                        : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none group-hover:bg-white/10 transition-colors'
                        }`}>
                        {msg.content}
                      </div>
                    )}

                    {msg.type === 'code' && (
                      <div className="bg-[#0D1117] border border-gray-700 rounded-xl overflow-hidden w-full min-w-[300px]">
                        <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/5">
                          <span className="text-xs text-[#fbc05c] font-mono">{msg.language}</span>
                          <CodeIcon size={12} className="text-gray-500" />
                        </div>
                        <pre className="p-3 text-sm font-mono text-gray-300 overflow-x-auto">
                          <code>{msg.content}</code>
                        </pre>
                      </div>
                    )}

                    {msg.type === 'file' && (
                      <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-[#fbc05c]/30 cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-[#fbc05c]/10 rounded-lg flex items-center justify-center">
                          <FileText size={20} className="text-[#fbc05c]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{msg.content}</p>
                          <p className="text-xs text-gray-500">{msg.size}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Delete Button (Only for own messages) */}
                  {(msg.user === 'You' || msg.user === currentUser) && (
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity self-center p-2"
                      title="Delete Message"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              )))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#0a0a0a]/50 border-t border-white/5">
            <form onSubmit={handleSendMessage} className="relative flex items-end gap-2 bg-[#0B1221] border border-white/10 rounded-xl p-2 focus-within:border-[#fbc05c]/50 transition-colors">
              <button type="button" className="p-2 text-gray-400 hover:text-[#fbc05c] transition-colors">
                <Paperclip size={20} />
              </button>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder={`Message #${activeChannel?.name || "..."}`}
                disabled={!activeChannel}
                className="w-full bg-transparent border-none focus:ring-0 text-gray-200 placeholder-gray-500 resize-none max-h-32 py-2 text-sm disabled:opacity-50"
                rows={1}
              />
              <div className="flex items-center gap-1">
                <button type="button" className="p-2 text-gray-400 hover:text-gray-200 transition-colors" title="Insert Code Block">
                  <CodeIcon size={20} />
                </button>
                <button type="button" className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
                  <ImageIcon size={20} />
                </button>
                <button type="submit" className="p-2 bg-[#fbc05c] hover:bg-[#fbc05c] text-black rounded-lg transition-colors ml-1">
                  <Send size={18} />
                </button>
              </div>
            </form>
            <div className="text-center mt-2">
              <p className="text-[10px] text-gray-600">
                **Tip**: You can drag and drop code files directly into the chat to share snippets.
              </p>
            </div>
          </div>

        </motion.div >
      </div >
    </div >
  );
}
