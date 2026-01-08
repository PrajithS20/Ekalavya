import { useState, useRef, useEffect } from "react";
import { Send, Hash, Bell, Settings, Users } from "lucide-react";

export default function TeamChat() {
    const [messages, setMessages] = useState([
        { id: 1, user: "Coach Carter", time: "10:30 AM", content: "Remember to hydrate properly before today's session. It's going to be intense!", role: "Coach", color: "text-emerald-400" }
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);
    const currentUser = "User";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            user: currentUser,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: inputText,
            role: "Athlete",
            color: "text-blue-400"
        };

        setMessages([...messages, newMessage]);
        setInputText("");
    };

    return (
        <div className="flex h-[calc(100vh-60px)] -m-6 bg-black text-white">
            {/* Sidebar - Channels */}
            <div className="w-64 bg-black/40 border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5 flex items-center gap-2">
                    <MessageSquareIcon />
                    <span className="font-bold text-lg text-emerald-400">Team Chat</span>
                </div>

                <div className="flex-1 p-4 space-y-6 overflow-y-auto">
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 mb-3 px-2 tracking-wider">CHANNELS</h3>
                        <div className="space-y-1">
                            <ChannelItem name="Locker Room" active={true} />
                            <ChannelItem name="Training Tips" />
                            <ChannelItem name="Nutrition Advice" />
                            <ChannelItem name="Injury & Rehab" />
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-black/20 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">U</div>
                        <div>
                            <div className="font-bold text-sm">User</div>
                            <div className="text-xs text-green-400">Online</div>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-white"><Settings size={18} /></button>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-transparent relative">
                {/* Header */}
                <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/20 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xl font-light">#</span>
                        <h2 className="font-bold text-lg">Locker Room</h2>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                        <Bell size={20} className="hover:text-white cursor-pointer" />
                        <Users size={20} className="hover:text-white cursor-pointer" />
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative">
                    {/* Welcome Message */}
                    <div className="flex flex-col items-center justify-center py-10 opacity-50">
                        <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-4">
                            <span className="text-4xl text-emerald-500 font-light">#</span>
                        </div>
                        <h1 className="text-2xl font-bold mb-1">Welcome to #Locker Room!</h1>
                        <p className="text-gray-400">This is the start of the locker-room channel.</p>
                    </div>

                    {messages.map((msg) => (
                        <div key={msg.id} className="group flex gap-4 hover:bg-white/5 p-2 rounded-xl transition-colors -mx-2">
                            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white ${msg.user === 'Coach Carter' ? 'bg-gray-600' : 'bg-emerald-600'}`}>
                                {msg.user[0]}
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className={`font-bold text-sm ${msg.color}`}>{msg.user}</span>
                                    <span className="text-[10px] text-gray-500">{msg.time}</span>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 bg-black/20">
                    <form onSubmit={handleSendMessage} className="relative">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Message #locker-room"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 text-white focus:outline-none focus:border-emerald-500/50 transition-colors placeholder-gray-600"
                        />
                        <button
                            type="submit"
                            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${inputText.trim() ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'text-gray-600 cursor-default'}`}
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function ChannelItem({ name, active }) {
    return (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <span className="opacity-50 text-lg">#</span>
            <span className="font-medium text-sm">{name}</span>
        </div>
    )
}

function MessageSquareIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> }
