import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Upload, FileText, CheckCircle, ArrowLeft, X, Briefcase,
    MessageCircle, Send, Bot, Sparkles, Plus, History, Copy, Edit, Trash2
} from "lucide-react";
import axios from "axios";
import { useProgressStore } from "../store/useProgressStore";
import { useMCP } from "../context/MCPProvider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function CareerGuidance() {
    const navigate = useNavigate();
    const { client, isConnected } = useMCP();
    // Safe access to store
    const store = useProgressStore();
    const setProfile = store.setProfile || (() => { });
    const setProjects = store.setProjects || (() => { });
    const profile = store.currentProfile;
    const generatedProjects = store.generatedProjects;

    // --- Resume Upload State ---
    const [file, setFile] = useState(null);
    const [targetRole, setTargetRole] = useState("Software Engineer");
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    // --- Chatbot State ---
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your career assistant. I can help you analyze your resume gaps, suggest projects, or refine your roadmap. Ask me anything!",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [chatInput, setChatInput] = useState("");
    const [isTyping, setIsTyping] = useState(false); // Define isTyping state
    const messagesEndRef = useRef(null);

    // --- Persistence & History State ---
    const [sessionId, setSessionId] = useState(sessionStorage.getItem("active_chat_session") || null);
    const [chatHistoryList, setChatHistoryList] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        if (client && isConnected) {
            if (sessionId) {
                loadChatHistory(sessionId);
            } else {
                createNewSession();
            }
            loadAllSessions();
        }
    }, [sessionId, client, isConnected]);

    const createNewSession = async () => {
        if (!client) return;
        try {
            const res = await client.callTool({
                name: "market_create_chat_session",
                arguments: { userId: 1 }
            });
            const data = JSON.parse(res.content[0].text);
            const newId = data.session_id;
            setSessionId(newId);
            sessionStorage.setItem("active_chat_session", newId);
            setMessages([
                {
                    id: 'intro',
                    text: "Hello! I'm your career assistant. I can help you analyze your resume gaps, suggest projects, or refine your roadmap. Ask me anything!",
                    sender: "bot",
                    timestamp: new Date()
                }
            ]);
            loadAllSessions();
        } catch (e) {
            console.error("Failed to create session", e);
        }
    };

    // Helper to remove JSON blocks from chat display
    const cleanMessageText = (text) => {
        if (!text) return "";
        let cleaned = text.replace(/```(?:json)?\s*[\s\S]*?\s*```/g, "").trim();
        const rawJsonStart = cleaned.lastIndexOf('{ "projects":');
        if (rawJsonStart > -1) {
            cleaned = cleaned.substring(0, rawJsonStart).trim();
        }
        return cleaned;
    };

    const loadChatHistory = async (sessId) => {
        if (!client) return;
        try {
            const res = await client.callTool({
                name: "market_get_chat_history",
                arguments: { sessionId: sessId }
            });
            const data = JSON.parse(res.content[0].text);
            // Transform to UI format
            const hist = (data.messages || []).map((m, i) => ({
                id: i,
                text: cleanMessageText(m.content), // Apply cleaning to history
                sender: m.role === 'assistant' ? 'bot' : m.role,
                timestamp: new Date()
            }));

            if (hist.length === 0) {
                setMessages([
                    {
                        id: 'intro',
                        text: "Hello! I'm your career assistant. I can help you analyze your resume gaps, suggest projects, or refine your roadmap. Ask me anything!",
                        sender: "bot",
                        timestamp: new Date()
                    }
                ]);
            } else {
                setMessages(hist);
            }
        } catch (e) {
            console.error("Failed to load history", e);
        }
    };

    const loadAllSessions = async () => {
        if (!client) return;
        try {
            const res = await client.callTool({
                name: "market_get_chat_sessions",
                arguments: { userId: 1 }
            });
            const data = JSON.parse(res.content[0].text);
            setChatHistoryList(data);
        } catch (e) { console.error(e); }
    }

    const deleteSession = async (sessId) => {
        if (!confirm("Are you sure you want to delete this chat?")) return;
        if (!client) return;
        try {
            await client.callTool({
                name: "market_delete_chat_session",
                arguments: { sessionId: sessId }
            });
            // If deleting active session, switch to new one or clear
            if (sessionId === sessId) {
                setSessionId(null);
                setMessages([]);
                sessionStorage.removeItem("active_chat_session");
                createNewSession();
            }
            loadAllSessions();
        } catch (e) { console.error("Delete failed", e); }
    };

    const switchSession = (id) => {
        setSessionId(id);
        sessionStorage.setItem("active_chat_session", id);
        setShowHistory(false);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) setFile(selectedFile);
    };

    const removeFile = () => {
        setFile(null);
        setUploaded(false);
    };


    const handleUpload = async () => {
        if (!file || !targetRole) return;
        if (!isConnected || !client) {
            alert("MCP not connected");
            return;
        }

        setUploading(true);

        try {
            // Read file as Base64 for MCP
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const base64Data = e.target.result.split(',')[1] || e.target.result;
                    
                    const response = await client.callTool({
                        name: "resume_analyze",
                        arguments: {
                            userId: 1, // dummy user
                            file_content: base64Data,
                            file_name: file.name,
                            file_type: file.type || "application/pdf",
                            targetRole: targetRole
                        }
                    });

                    const result = JSON.parse(response.content[0].text);
                    console.log("Analysis Data:", result);
                    
                    if (result.profile) setProfile(result.profile);
                    if (result.recommendedProjects) setProjects(result.recommendedProjects);

                    setUploading(false);
                    setUploaded(true);

                    setMessages(prev => [...prev, {
                        id: Date.now(),
                        text: `✅ I've analyzed your resume! Based on your gaps for "${targetRole}", I have generated new projects in the Project Lab.`,
                        sender: "bot",
                        timestamp: new Date()
                    }]);
                } catch (error) {
                    console.error("Upload error:", error);
                    alert("Analysis failed.");
                    setUploading(false);
                }
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Analysis failed.");
            setUploading(false);
        }
    };

    const handleSendChat = async () => {
        if (!chatInput.trim()) return;
        const userMsg = { id: Date.now(), text: chatInput, sender: "user", timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setChatInput("");
        setIsTyping(true);

        try {
            if (!isConnected || !client) {
                throw new Error("MCP not connected");
            }
            
            const res = await client.callTool({
                name: "market_career_mentor",
                arguments: { 
                    message: userMsg.text, 
                    context: {
                        profile: profile,
                        generatedProjects: generatedProjects,
                        history: messages.slice(-5).map(m => ({ role: m.sender === 'bot' ? 'system' : 'user', content: m.text }))
                    } 
                }
            });
            const data = JSON.parse(res.content[0].text);
            let responseText = data.response || data.reply;

            // Check for JSON block (Project Generation or Actions)
            let jsonContent = null;
            const markdownMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            const embeddedMatch = responseText.match(/(\{[\s\S]*"actions"[\s\S]*\})/);
            
            try {
                if (markdownMatch) {
                    jsonContent = JSON.parse(markdownMatch[1]);
                } else if (embeddedMatch) {
                    jsonContent = JSON.parse(embeddedMatch[1]);
                } else if (responseText.trim().startsWith('{')) {
                    jsonContent = JSON.parse(responseText);
                }
            } catch (e) {
                // Not valid JSON, ignore
            }

            if (jsonContent) {
                try {
                    // Check for direct projects array or actions array
                    let generatedProjects = [];
                    if (jsonContent.projects && Array.isArray(jsonContent.projects)) {
                        generatedProjects = jsonContent.projects;
                    } else if (jsonContent.actions && Array.isArray(jsonContent.actions)) {
                        const replaceAction = jsonContent.actions.find(a => a.type === 'REPLACE_PROJECTS');
                        if (replaceAction && replaceAction.projects) {
                            generatedProjects = replaceAction.projects;
                        }
                        if (jsonContent.reply) {
                            responseText = jsonContent.reply;
                        }
                    }

                    if (generatedProjects.length > 0) {
                        // Sanitize and Normalize new projects
                        const newProjects = generatedProjects.map((p, idx) => ({
                            ...p,
                            id: p.id || `gen-${Date.now()}-${idx}`,
                            difficulty: p.difficulty || "Medium", // Default to Medium if missing
                            icon: p.icon || "code",
                            color: p.color || "from-[#fbc05c] to-[#fbc05c]"
                        }));

                        const currentProjects = store.generatedProjects || [];

                        // 1. Identify which levels are being updated
                        const updatedLevels = new Set();
                        newProjects.forEach(p => {
                            const diff = (p.difficulty || "").toLowerCase();
                            if (diff.includes("easy") || diff.includes("beginner")) updatedLevels.add("easy");
                            if (diff.includes("medium") || diff.includes("intermediate")) updatedLevels.add("medium");
                            if (diff.includes("hard") || diff.includes("tough") || diff.includes("advanced")) updatedLevels.add("hard");
                        });

                        // 2. Filter out OLD projects that match the updated levels
                        const keptProjects = currentProjects.filter(p => {
                            const diff = (p.difficulty || "").toLowerCase();
                            let isTargeted = false;

                            if (updatedLevels.has("easy") && (diff.includes("easy") || diff.includes("beginner"))) isTargeted = true;
                            if (updatedLevels.has("medium") && (diff.includes("medium") || diff.includes("intermediate"))) isTargeted = true;
                            if (updatedLevels.has("hard") && (diff.includes("hard") || diff.includes("tough") || diff.includes("advanced"))) isTargeted = true;

                            return !isTargeted; // Keep if NOT targeted
                        });

                        // 3. Merge
                        const merged = [...keptProjects, ...newProjects];
                        setProjects(merged);

                        // 4. Persist to Backend (Save for Refresh)
                        // This endpoint is not fully implemented in MCP, but we swallow the error for prototype.
                        if (client) {
                            client.callTool({
                                name: "market_update_generated_projects",
                                arguments: { projects: merged }
                            }).catch(err => console.error("Failed to save projects persistence:", err));
                        }

                        // Remove JSON from display text
                        // FIX: Aggressive regex to catch ```json ... ``` AND raw JSON blocks if leaked
                        responseText = responseText.replace(/```(?:json)?\s*[\s\S]*?\s*```/g, "").trim();

                        // Also remove pure raw JSON if it exists at the end (sometimes LLM forgets code blocks)
                        const rawJsonStart = responseText.lastIndexOf('{ "projects":');
                        if (rawJsonStart > -1) {
                            responseText = responseText.substring(0, rawJsonStart).trim();
                        }

                        responseText += "\n\n✅ **Project Lab updated!** (Refreshed specific levels)";
                    }
                } catch (e) {
                    console.error("Failed to parse project JSON", e);
                }
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: responseText,
                sender: "bot",
                timestamp: new Date()
            }]);
        } catch (err) {
            console.error("Chat error:", err);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Sorry, I'm offline right now.",
                sender: "bot",
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-transparent p-6 text-gray-200">
            <Link to="/" className="flex items-center gap-2 text-[#fbc05c] hover:text-[#fbc05c]/80 mb-6 w-fit">
                <ArrowLeft size={20} /> Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold text-[#fbc05c] mb-2 flex items-center gap-2">
                <Sparkles className="text-[#fbc05c]" /> Career Guidance Center
            </h1>
            <p className="text-gray-400 mb-8">Upload your resume for analysis or chat with our AI to refine your path.</p>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full flex-1">

                {/* LEFT WRAPPER */}
                <div className="flex flex-col gap-6">

                    {/* LEFT: Resume */}
                    <div className="bg-[#0a0a0a]/50 border border-gray-800 rounded-2xl p-6 h-fit">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <Upload className="text-green-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Resume Analysis</h2>
                        </div>

                        {!uploaded ? (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Target Role</label>
                                    <input
                                        type="text"
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                        className="w-full bg-[#111111] border-gray-700 rounded-lg p-3 text-white focus:border-neon outline-none"
                                    />
                                </div>

                                {!file ? (
                                    <label className="border-2 border-dashed border-gray-700 hover:border-neon rounded-xl p-8 flex flex-col items-center cursor-pointer transition-colors">
                                        <FileText size={40} className="text-gray-500 mb-2" />
                                        <span className="text-gray-400">Click to upload PDF/TXT</span>
                                        <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.txt" />
                                    </label>
                                ) : (
                                    <div className="bg-[#111111] p-4 rounded-xl flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-[#fbc05c]" />
                                            <span className="text-white truncate max-w-[200px]">{file.name}</span>
                                        </div>
                                        <button onClick={removeFile}><X className="text-gray-400 hover:text-red-400" /></button>
                                    </div>
                                )}

                                <button
                                    onClick={handleUpload}
                                    disabled={!file || uploading}
                                    className="w-full btn-primary py-3 flex justify-center items-center gap-2 disabled:opacity-50"
                                >
                                    {uploading ? <span className="animate-pulse">Analyzing...</span> : "Analyze & Generate Projects"}
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-2">Analysis Complete!</h3>
                                <p className="text-gray-400 mb-6">Your customized projects are ready in the Project Lab.</p>
                                <div className="flex flex-col gap-3">
                                    <button onClick={() => setUploaded(false)} className="text-sm text-gray-500 hover:text-white">Upload New Resume</button>
                                    <Link to="/project-lab" className="btn-secondary">Go to Project Lab</Link>
                                </div>
                            </div>
                        )}
                    </div>


                </div>


                {/* RIGHT: Chat */}
                <div className="bg-[#0a0a0a]/50 border border-gray-800 rounded-2xl p-6 flex flex-col h-[600px]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#fbc05c]/20 rounded-lg flex items-center justify-center">
                                <MessageCircle className="text-[#fbc05c]" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Career Mentor AI</h2>
                        </div>

                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin scrollbar-thumb-gray-700">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`group flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                {msg.sender === "bot" && <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center"><Bot size={16} className="text-[#fbc05c]" /></div>}

                                <div className={`relative max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === "user"
                                    ? "bg-[#fbc05c] text-white rounded-tr-none"
                                    : "bg-[#111111] text-gray-200 border border-gray-700 rounded-tl-none"
                                    }`}>
                                    {msg.sender === "user" ? (
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                    ) : (
                                        <div className="prose prose-invert max-w-none text-sm prose-p:leading-relaxed prose-pre:bg-[#0a111e] prose-pre:border prose-pre:border-gray-800">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                    {/* Copy / Edit Actions */}
                                    <div className={`absolute -bottom-6 ${msg.sender === 'user' ? 'right-0' : 'left-0'} flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(msg.text)}
                                            className="text-gray-500 hover:text-white p-1" title="Copy"
                                        >
                                            <Copy size={12} />
                                        </button>
                                        {msg.sender === 'user' && (
                                            <button
                                                onClick={() => setChatInput(msg.text)}
                                                className="text-gray-500 hover:text-white p-1" title="Edit"
                                            >
                                                <Edit size={12} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && <div className="text-xs text-gray-500 ml-12">AI is typing...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                            placeholder="Ask about your resume..."
                            className="flex-1 bg-[#111111] border-gray-700 rounded-xl px-4 text-white focus:border-neon outline-none"
                        />
                        <button onClick={handleSendChat} className="p-3 bg-neon text-black rounded-xl hover:bg-neon/80 flex items-center justify-center transition-colors">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
                {/* End Right Chat */}

            </div>
            {/* End Grid */}

        </div>
    );
}
