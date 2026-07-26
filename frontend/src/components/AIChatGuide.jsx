import { useState, useEffect, useRef } from "react";
import { Send, Terminal } from "lucide-react";
import { useProgressStore } from "../store/useProgressStore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMCP } from "../context/MCPProvider";

export default function AIChatGuide() {
    const greetingText = "Welcome to The Architect. Describe your vision, and I will construct the blueprints for your next great project.";
    const [typedText, setTypedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const { addActiveProject, setProjects, generatedProjects } = useProgressStore();
    const navigate = useNavigate();
    const { client } = useMCP();
    const chatEndRef = useRef(null);

    // Typewriter effect (Looping)
    useEffect(() => {
        let timeout;
        let currentIndex = 0;
        let isDeleting = false;
        let currentText = "";
        let isActive = true; // To prevent setting state on unmounted component

        const type = () => {
            if (!isActive) return;

            if (!isDeleting) {
                // Typing forward
                if (currentIndex < greetingText.length) {
                    currentText = greetingText.slice(0, currentIndex + 1);
                    setTypedText(currentText);
                    currentIndex++;
                    timeout = setTimeout(type, 50); // Typing speed
                } else {
                    // Finished typing, wait before deleting
                    isDeleting = true;
                    timeout = setTimeout(type, 3000); // 3 seconds pause
                }
            } else {
                // Deleting backward
                if (currentIndex > 0) {
                    currentText = greetingText.slice(0, currentIndex - 1);
                    setTypedText(currentText);
                    currentIndex--;
                    timeout = setTimeout(type, 25); // Erasing speed (faster)
                } else {
                    // Finished deleting, wait before re-typing
                    isDeleting = false;
                    timeout = setTimeout(type, 1000); // 1 second pause
                }
            }
        };

        // Start typing
        timeout = setTimeout(type, 500);

        return () => {
            isActive = false;
            clearTimeout(timeout);
        };
    }, []);

    // Auto-scroll chat
    useEffect(() => {
        const container = document.getElementById('architect-chat-container');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    const handleChat = async (e) => {
        e.preventDefault();
        if (!chatInput.trim() || isProcessing) return;

        const userMsg = { role: "user", content: chatInput };
        setMessages(prev => [...prev, userMsg]);
        setChatInput("");
        setIsProcessing(true);

        try {
            if (!client) {
                throw new Error("MCP Client not ready");
            }
            
            const mcpResponse = await client.callTool({
                name: "market_architect_chat",
                arguments: { message: userMsg.content, context: {} }
            });

            const parsedResult = JSON.parse(mcpResponse.content[0].text);

            if (parsedResult.isJson && parsedResult.data?.action === "CREATE_PROJECT") {
                const newProject = {
                    ...parsedResult.data.project,
                    id: Date.now().toString()
                };
                
                // Add to generated projects (Project Lab)
                setProjects([...generatedProjects, newProject]);
                
                setMessages(prev => [
                    ...prev, 
                    { 
                        role: "system", 
                        content: parsedResult.data.reply || `I have successfully built a blueprint for your project! I've added it to your Project Lab.`,
                        action: { label: "Go to Project Lab", path: "/project-lab" }
                    }
                ]);
            } else {
                setMessages(prev => [
                    ...prev, 
                    { 
                        role: "system", 
                        content: parsedResult.data?.reply || "I didn't quite catch that. Can you explain your idea again?"
                    }
                ]);
            }
        } catch (err) {
            console.error(err);
            setMessages(prev => [
                ...prev, 
                { role: "system", content: "Error connecting to Architect AI. Is the MCP server running?" }
            ]);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto h-[280px]">
            {/* Title Outside the Box */}
            <h1 className="text-xl md:text-2xl font-bold text-[#fbc05c] mb-3 tracking-widest text-left uppercase">
                The Architect
            </h1>

            <div className="flex flex-col flex-1 bg-[#050a12] border border-blue-500/20 rounded-xl shadow-2xl shadow-blue-500/5 overflow-hidden font-mono">
                {/* CLI Header */}
                <div className="bg-[#02050a] border-b border-blue-500/20 px-4 py-2 flex items-center gap-3">
                    <Terminal size={16} className="text-blue-500" />
                    <span className="text-blue-500 font-semibold text-xs tracking-widest uppercase">root@ekalavya</span>
                </div>

                {/* CLI Screen */}
                <div id="architect-chat-container" className="flex-1 p-6 overflow-y-auto space-y-6">
                    
                    {/* Looping Typewriter Greeting */}
                    {messages.length === 0 && (
                        <div className="text-gray-300 text-sm">
                            <span className="text-blue-500 mr-2">root@ekalavya:~$</span>
                            {typedText}
                            <span className={`inline-block w-2.5 h-5 ml-1 bg-blue-500 animate-pulse`}></span>
                        </div>
                    )}

                    {/* Chat History */}
                <AnimatePresence>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                        >
                            <div className="text-blue-500/60 text-xs mb-1 uppercase tracking-wider">
                                {msg.role === "user" ? "You" : "The Architect"}
                            </div>
                            <div className={`max-w-[80%] p-4 rounded-lg border ${
                                msg.role === "user" 
                                ? "bg-blue-500/10 border-blue-500/30 text-blue-400" 
                                : "bg-[#0a111a] border-gray-800 text-gray-300"
                            }`}>
                                {msg.content}
                                {msg.action && (
                                    <button 
                                        onClick={() => navigate(msg.action.path)}
                                        className="mt-4 block w-full px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded hover:bg-blue-500 transition"
                                    >
                                        {msg.action.label}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    
                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-start"
                        >
                            <div className="bg-[#0a111a] border border-gray-800 text-gray-400 p-4 rounded-lg flex items-center gap-2">
                                <Terminal size={14} className="animate-pulse text-blue-500" />
                                Building your project...
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CLI Input */}
            <form onSubmit={handleChat} className="bg-[#02050a] border-t border-blue-500/20 p-4 flex gap-3 items-center">
                <span className="text-blue-500 font-bold">❯</span>
                <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={isProcessing}
                    placeholder={"Describe your idea..."}
                    className="flex-1 bg-transparent text-gray-200 outline-none placeholder-gray-600 disabled:opacity-50 text-sm"
                />
                <button 
                    type="submit" 
                    disabled={!chatInput.trim() || isProcessing}
                    className="p-3 bg-blue-500/20 hover:bg-blue-500/40 text-blue-500 rounded-lg transition-colors disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
        </div>
    );
}
