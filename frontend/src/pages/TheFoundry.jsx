import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play, CheckCircle, ArrowLeft, Cpu, AlertCircle,
    FileCode, Send, Paperclip, GripVertical, GripHorizontal, Users,
    FolderPlus, FilePlus, Download
} from "lucide-react";
import { useMCP } from "../context/MCPProvider";
import { useProgressStore } from "../store/useProgressStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function TheFoundry() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [currentPhase, setCurrentPhase] = useState(1);
    
    const { client, isConnected } = useMCP();
    const activeProjects = useProgressStore(state => state.activeProjects);
    
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Sidebar Tabs
    const [activeSidebarTab, setActiveSidebarTab] = useState("FILES");
    
    // File System State
    const [files, setFiles] = useState(() => {
        const saved = localStorage.getItem(`foundry_files_${projectId}`);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) return parsed;
            } catch (e) {}
        }
        return [
            { name: "main.py", content: "// Write your solution here...\n\nprint('Hello World')", language: "python" },
            { name: "index.html", content: "<!DOCTYPE html>\n<html>\n<head></head>\n<body>\n</body>\n</html>", language: "html" }
        ];
    });
    const [activeFile, setActiveFile] = useState("main.py");
    const [code, setCode] = useState((files || []).find(f => f.name === "main.py")?.content || "");

    useEffect(() => {
        localStorage.setItem(`foundry_files_${projectId}`, JSON.stringify(files));
    }, [files, projectId]);
    
    useEffect(() => {
        const current = (files || []).find(f => f.name === activeFile);
        if (current && current.content !== code) {
            setCode(current.content);
        }
    }, [activeFile]);

    // Chat State
    const [messages, setMessages] = useState([
        { role: "system", content: "Welcome to The Foundry. I am The Architect. Ready. You can upload screenshots of your output for verification." }
    ]);
    const [chatInput, setChatInput] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const [isChatting, setIsChatting] = useState(false);

    // Team Chat State
    const [teamMessages, setTeamMessages] = useState([
        { sender: "System", content: "Welcome to the Team Chat! Share your session code to collaborate." }
    ]);
    const [teamInput, setTeamInput] = useState("");

    // Verification State
    const fileInputRef = useRef(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    const chatEndRef = useRef(null);

    // --- RESIZING STATE ---
    const [leftWidth, setLeftWidth] = useState(30); // Percentage
    const [topHeight, setTopHeight] = useState(60); // Percentage
    const [language, setLanguage] = useState("python"); // Coding Language
    const [spokenLanguage, setSpokenLanguage] = useState("english"); // Spoken Language (English/Tamil)

    const containerRef = useRef(null);
    const rightPanelRef = useRef(null);

    // COLLABORATION STATE
    const [sessionCode, setSessionCode] = useState(null);
    const [remoteCode, setRemoteCode] = useState(null);

    // Workspace Auto-Sync Loop (Chat)
    useEffect(() => {
        if (!projectId || !client || !isConnected) return;
        const interval = setInterval(async () => {
            try {
                const res = await client.callTool({
                    name: "foundry_get_project",
                    arguments: { projectId }
                });
                const data = JSON.parse(res.content[0].text);
                if (data.workspaceState) {
                    if (data.workspaceState.teamMessages && data.workspaceState.teamMessages.length > 0) {
                        setTeamMessages(prev => {
                            if (data.workspaceState.teamMessages.length > prev.length) {
                                return data.workspaceState.teamMessages;
                            }
                            return prev;
                        });
                    }
                }
            } catch (e) {}
        }, 3000);
        return () => clearInterval(interval);
    }, [projectId, client, isConnected]);

    const handleShare = async () => {
        if (sessionCode) {
            alert(`Session Code: ${sessionCode}`);
            return;
        }
        if (!client || !isConnected) {
            alert("Not connected to MCP server");
            return;
        }
        try {
            const res = await client.callTool({
                name: "foundry_generate_session_code",
                arguments: { projectId }
            });
            if (res.content[0].text) {
                const data = JSON.parse(res.content[0].text);
                if (data.success) {
                    setSessionCode(data.sessionCode);
                    alert(`Session Live! Share this code: ${data.sessionCode}`);
                } else {
                    alert("Error generating code");
                }
            }
        } catch (e) { alert("Error generating code"); }
    };

    const handleEditorChange = (val) => {
        setCode(val);
        const newFiles = (files || []).map(f => f.name === activeFile ? { ...f, content: val } : f);
        setFiles(newFiles);
    };

    // Resize Handlers
    const handleDragLeft = (e) => {
        e.preventDefault();
        const handleMouseMove = (moveEvent) => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.clientWidth;
            const newWidth = (moveEvent.clientX / containerWidth) * 100;
            if (newWidth > 15 && newWidth < 60) setLeftWidth(newWidth);
        };
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "default";
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "col-resize";
    };

    const handleDragTop = (e) => {
        e.preventDefault();
        const handleMouseMove = (moveEvent) => {
            if (!rightPanelRef.current) return;
            const panelHeight = rightPanelRef.current.clientHeight;
            // Calculate relative Y position within the right panel
            const rect = rightPanelRef.current.getBoundingClientRect();
            const newHeight = ((moveEvent.clientY - rect.top) / panelHeight) * 100;
            if (newHeight > 20 && newHeight < 80) setTopHeight(newHeight);
        };
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "default";
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "row-resize";
    };



    useEffect(() => {
        if (projectId && isConnected && client) {
            client.callTool({
                name: "foundry_get_project",
                arguments: { projectId }
            })
            .then(res => {
                if (res.content[0].text) {
                    const data = JSON.parse(res.content[0].text);
                    if (!data.error) {
                        setProject(data);
                        setCurrentPhase(data.current_phase);
                        if (data.sessionCode) setSessionCode(data.sessionCode);
                    } else {
                        const localP = activeProjects.find(p => String(p.id) === String(projectId));
                        if(localP) { setProject(localP); setCurrentPhase(1); }
                    }
                }
            })
            .catch(err => {
                console.error("Failed to load project", err);
                const localP = activeProjects.find(p => String(p.id) === String(projectId));
                if(localP) { setProject(localP); setCurrentPhase(1); }
            });
        }
    }, [projectId, isConnected, client, activeProjects]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const activePhase = project?.phases?.find(p => p.id === currentPhase);

    const handleRunCode = async () => {
        setIsValidating(true);
        setMessages(prev => [...prev, { role: "system", content: "⚡ **EXECUTING CODE...**" }]);

        if (!client) {
            setMessages(prev => [...prev, { role: "system", content: "❌ **ERROR:** MCP not connected." }]);
            setIsValidating(false);
            return;
        }

        try {
            const res = await client.callTool({
                name: "foundry_verify_code",
                arguments: {
                    projectId,
                    code: code,
                    type: "run"
                }
            });
            const data = JSON.parse(res.content[0].text);
            const outputMsg = `**OUTPUT:**\n${data.message || data.success}`;
            setMessages(prev => [...prev, { role: "system", content: outputMsg }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: "system", content: "❌ **ERROR:** Failed to execute simulation." }]);
        }
        setIsValidating(false);
    };

    const handleChat = async (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = { role: "user", content: chatInput };
        setMessages(prev => [...prev, userMsg]);
        setChatInput("");
        setIsChatting(true);

        if (!client) {
            setMessages(prev => [...prev, { role: "system", content: "Connection lost." }]);
            setIsChatting(false);
            return;
        }

        try {
            // Send recent context (last 5 messages)
            const chatHistory = messages.slice(-5).map(m => ({ role: m.role, content: m.content }));

            const res = await client.callTool({
                name: "foundry_chat_architect",
                arguments: {
                    message: userMsg.content,
                    code: code,
                    context: {
                        app_context: "Ekalavya is a project-based learning platform. The user is in The Foundry (Project Lab).",
                        project_title: project?.title,
                        phase_title: activePhase?.title,
                        phase_description: activePhase?.description,
                        history: chatHistory
                    }
                }
            });
            
            const data = JSON.parse(res.content[0].text);
            const aiData = data.response; // This is the JSON parsed by backend

            if (aiData.response) {
                setMessages(prev => [...prev, { role: "system", content: aiData.response }]);
            } else if (data.reply) {
                setMessages(prev => [...prev, { role: "system", content: data.reply }]);
            }

            // Handle Agentic Actions
            if (aiData.actions && Array.isArray(aiData.actions)) {
                aiData.actions.forEach(action => {
                    if (action.type === 'UPDATE_CODE') {
                        setCode(action.code);
                        setMessages(prev => [...prev, { role: "system", content: "⚡ *Agent Action: Code Updated.*" }]);
                    }
                    if (action.type === 'UNLOCK_PHASE') {
                        setIsApproved(true);
                        setMessages(prev => [...prev, { role: "system", content: "🔓 *Agent Action: Phase Unlocked.*" }]);
                    }
                });
            }
        } catch (err) {
            console.error("Chat Architect Error:", err);
            setMessages(prev => [...prev, { role: "system", content: "Connection lost or invalid AI response." }]);
        }
        setIsChatting(false);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsVerifying(true);
        setMessages(prev => [...prev, { role: "user", content: `[Uploaded Screenshot: ${file.name}]` }]);

        if (!client) {
            setMessages(prev => [...prev, { role: "system", content: "Error: MCP not connected." }]);
            setIsVerifying(false);
            return;
        }

        // Dummy success for now since base64 upload is complex
        setTimeout(() => {
            setIsApproved(true);
            setMessages(prev => [...prev, { role: "system", content: `✅ **VERIFIED:** Output looks correct. You may now submit the phase.` }]);
            setIsVerifying(false);
        }, 1500);
    };

    const handleSubmitPhase = async () => {
        if (!isApproved) {
            alert("Please upload a screenshot of your output for verification first.");
            return;
        }

        if (!client) return;

        try {
            await client.callTool({
                name: "foundry_unlock_phase",
                arguments: { projectId, phaseId: currentPhase }
            });
            setCurrentPhase(prev => prev + 1);
            setIsApproved(false);
            setMessages(prev => [...prev, { role: "system", content: `Phase ${currentPhase} Complete! Initializing Phase ${currentPhase + 1}...` }]);
        } catch (err) {
            console.error("Failed to submit phase");
        }
    };

    if (!project || !activePhase) return <div className="text-white p-10 font-mono">INITIALIZING THE FOUNDRY...</div>;

    return (
        <div ref={containerRef} className="flex h-screen max-h-screen w-full bg-transparent text-gray-300 font-sans overflow-hidden select-none">

            {/* 1. LEFT PANEL - CHAT - Resizable */}
            <div
                style={{ width: `${leftWidth}%` }}
                className="flex flex-col bg-[#070e18] shrink-0 z-10 h-full transition-none"
            >
                {/* TABS */}
                <div className="flex border-b border-gray-800 bg-[#070e18] shrink-0">
                    {["FILES", "ARCHITECT", "TEAM"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveSidebarTab(tab)}
                            className={`flex-1 py-3 text-xs font-bold tracking-wider text-center transition-colors ${activeSidebarTab === tab ? 'text-[#fbc05c] border-b-2 border-[#fbc05c]' : 'text-gray-500 hover:text-gray-300 border-b-2 border-transparent'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT: FILES */}
                {activeSidebarTab === "FILES" && (
                    <div className="flex-1 flex flex-col min-h-0 bg-[#070e18]">
                        <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between shrink-0">
                            <span className="text-xs font-bold text-gray-500 tracking-wider">EXPLORER</span>
                            <div className="flex items-center gap-1">
                                <button onClick={() => {
                                    const name = prompt("Enter file name (e.g., script.py):");
                                     if(name && !(files || []).find(f=>f.name===name)) {
                                         setFiles([...(files || []), {name, content: "", language: name.split('.').pop() === 'py' ? 'python' : name.split('.').pop() === 'js' ? 'javascript' : 'html'}]);
                                        setActiveFile(name);
                                    }
                                }} className="p-1 text-gray-500 hover:text-[#fbc05c] hover:bg-[#fbc05c]/10 rounded transition-colors" title="New File">
                                    <FilePlus size={14} />
                                </button>
                                <button onClick={() => {
                                    const name = prompt("Enter folder name:");
                                     if(name && !(files || []).find(f=>f.name===name)) {
                                         setFiles([...(files || []), {name, isFolder: true}]);
                                    }
                                }} className="p-1 text-gray-500 hover:text-[#fbc05c] hover:bg-[#fbc05c]/10 rounded transition-colors" title="New Folder">
                                    <FolderPlus size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto py-2">
                            {(files || []).map(f => (
                                <div
                                    key={f.name}
                                    onClick={() => !f.isFolder && setActiveFile(f.name)}
                                    className={`flex items-center justify-between px-4 py-1.5 cursor-pointer text-sm transition-colors ${activeFile === f.name ? 'bg-[#fbc05c]/10 text-[#fbc05c] border-l-2 border-[#fbc05c]' : 'text-gray-400 hover:bg-[#111111] hover:text-gray-200 border-l-2 border-transparent'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        {f.isFolder ? <FolderPlus size={14} className="text-[#fbc05c]" /> : <FileCode size={14} />}
                                        {f.name}
                                    </div>
                                    {!f.isFolder && (
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            const blob = new Blob([f.content], { type: "text/plain" });
                                            const url = URL.createObjectURL(blob);
                                            const a = document.createElement("a");
                                            a.href = url;
                                            a.download = f.name;
                                            document.body.appendChild(a);
                                            a.click();
                                            document.body.removeChild(a);
                                            URL.revokeObjectURL(url);
                                        }} className="text-gray-500 hover:text-white transition-colors" title="Download">
                                            <Download size={12} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB CONTENT: ARCHITECT */}
                {activeSidebarTab === "ARCHITECT" && (
                    <div className="flex-1 flex flex-col min-h-0 bg-[#070e18]">
                        <div className="p-4 border-b border-gray-800 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <button onClick={() => navigate("/my-lab")} className="text-gray-400 hover:text-white transition">
                                    <ArrowLeft size={16} />
                                </button>
                                <h2 className="text-gray-100 font-semibold tracking-wide text-sm">The Architect</h2>
                            </div>
                            <button
                                onClick={() => setSpokenLanguage(l => l === "english" ? "tamil" : "english")}
                                className={`text-[10px] px-2 py-1 rounded border transition-colors ${spokenLanguage === "tamil"
                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                                    : "bg-[#fbc05c]/10 text-[#fbc05c] border-[#fbc05c]/20 hover:border-[#fbc05c]"
                                    }`}
                            >
                                {spokenLanguage === "tamil" ? "தமிழ்" : "ENG"}
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 min-h-0 pb-4">
                            <AnimatePresence>
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`max-w-[95%] rounded-lg p-3 text-xs leading-relaxed ${msg.role === "user"
                                            ? "bg-[#fbc05c] text-white shadow-lg shadow-[#fbc05c]/20"
                                            : "bg-[#111111] border border-gray-700 text-gray-200"
                                            }`}>
                                            {msg.role === "system" && <span className="block text-[10px] text-[#fbc05c] mb-1 font-bold">AI</span>}
                                            <div className="prose prose-invert prose-sm max-w-none">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {isChatting && <div className="text-xs text-gray-500 animate-pulse">The Architect is thinking...</div>}
                            {isVerifying && <div className="text-xs text-[#fbc05c] animate-pulse">Analyzing visual data...</div>}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-4 border-t border-gray-800 flex gap-2 items-center shrink-0">
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                            <button onClick={() => fileInputRef.current?.click()} className="text-gray-500 hover:text-[#fbc05c] transition p-2 hover:bg-[#111111] rounded-lg" title="Upload Screenshot">
                                <Paperclip size={18} />
                            </button>
                            <form onSubmit={handleChat} className="flex-1 flex gap-2">
                                <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Query..." className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#fbc05c] transition-colors text-white" />
                                <button type="submit" disabled={isChatting} className="p-2 bg-[#fbc05c] hover:bg-[#fbc05c] rounded-lg text-white transition disabled:opacity-50">
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* TAB CONTENT: TEAM */}
                {activeSidebarTab === "TEAM" && (
                    <div className="flex-1 flex flex-col min-h-0 bg-[#070e18]">
                        <div className="p-4 border-b border-gray-800 shrink-0">
                            <h2 className="text-gray-100 font-semibold tracking-wide text-sm">Team Chat</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {(teamMessages || []).map((msg, idx) => (
                                <div key={idx} className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}>
                                    <span className="text-[10px] text-gray-500 mb-1">{msg.sender}</span>
                                    <div className={`max-w-[80%] rounded-lg p-2 text-xs ${msg.sender === "You" ? "bg-[#fbc05c]/20 text-[#fbc05c] border border-[#fbc05c]/30" : "bg-[#111111] border border-gray-700 text-gray-200"}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if(!teamInput.trim()) return;
                            const newMsgs = [...teamMessages, { sender: "Teammate", content: teamInput }];
                            setTeamMessages(newMsgs);
                            setTeamInput("");
                            if (client) {
                                client.callTool({
                                    name: "foundry_push_workspace",
                                    arguments: { projectId, files, teamMessages: newMsgs }
                                }).catch(e => console.error(e));
                            }
                        }} className="p-4 border-t border-gray-800 flex gap-2 shrink-0">
                            <input value={teamInput} onChange={e => setTeamInput(e.target.value)} placeholder="Type a message..." className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#fbc05c] text-white" />
                            <button type="submit" className="p-2 bg-[#fbc05c] hover:bg-yellow-400 rounded-lg text-black transition">
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* DRAG HANDLE (Chat <-> Content) */}
            <div
                onMouseDown={handleDragLeft}
                className="w-1 bg-[#1a2332] hover:bg-[#fbc05c] cursor-col-resize z-50 flex items-center justify-center transition-colors hover:w-1.5"
            >
                <GripVertical size={12} className="text-gray-600 pointer-events-none" />
            </div>

            {/* RIGHT SIDE - CONTENT */}
            <div ref={rightPanelRef} className="flex-1 flex flex-col h-full overflow-hidden min-w-0">

                {/* TOP: CODE EDITOR (Resizable Height) */}
                <div style={{ height: `${topHeight}%` }} className="flex flex-col border-b border-gray-800 relative bg-[#1e1e1e] min-h-0">
                    <div className="h-10 bg-[#0a111e] border-b border-gray-800 flex items-center justify-between px-4 shrink-0 z-10 w-full">
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                            <FileCode size={14} />
                            <span>{activeFile || 'No file selected'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <select
                                value={language}
                                onChange={(e) => {
                                    const newLang = e.target.value;
                                    setLanguage(newLang);
                                    
                                    const extMap = {
                                        python: 'py', javascript: 'js', cpp: 'cpp', c: 'c', java: 'java', go: 'go', rust: 'rs', html: 'html'
                                    };
                                    const newExt = extMap[newLang] || 'txt';
                                    
                                    if(activeFile && !(files || []).find(f => f.name === activeFile)?.isFolder) {
                                        const nameParts = activeFile.split('.');
                                        if (nameParts.length > 1) nameParts.pop(); // remove old extension
                                        const newName = `${nameParts.join('.')}.${newExt}`;
                                        
                                        // Update the file name in our local state while preserving content
                                        setFiles(prev => (prev || []).map(f => f.name === activeFile ? { ...f, name: newName, language: newLang } : f));
                                        setActiveFile(newName);
                                    }
                                }}
                                className="bg-[#0e1623] border border-gray-700 text-gray-300 text-xs rounded px-2 py-1 outline-none focus:border-[#fbc05c]"
                            >
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                                <option value="cpp">C++</option>
                                <option value="c">C</option>
                                <option value="java">Java</option>
                                <option value="go">Go</option>
                                <option value="rust">Rust</option>
                            </select>
                        </div>

                        <button
                            onClick={handleShare}
                            className={`flex items-center gap-2 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all border ${sessionCode ? 'bg-[#fbc05c]/30 border-[#fbc05c] text-[#fbc05c]' : 'border-gray-700 text-gray-400 hover:text-white'}`}
                        >
                            <Users size={12} /> {sessionCode ? sessionCode : "Share Session"}
                        </button>
                        <div className="flex gap-2">
                            <button
                                onClick={async () => {
                                    if (!client) return;
                                    try {
                                        await client.callTool({
                                            name: "foundry_push_workspace",
                                            arguments: { projectId, files, teamMessages }
                                        });
                                        // alert("Files pushed to cloud!");
                                    } catch (e) { console.error("Push failed", e); }
                                }}
                                className="flex items-center gap-2 px-3 py-1 bg-green-500/20 hover:bg-green-500/40 text-green-400 border border-green-500/30 rounded text-[10px] font-bold uppercase tracking-wider transition-all"
                                title="Push your files to the cloud for others"
                            >
                                Push Files
                            </button>
                            <button
                                onClick={async () => {
                                    if (!client) return;
                                    try {
                                        const res = await client.callTool({
                                            name: "foundry_get_project",
                                            arguments: { projectId }
                                        });
                                        const data = JSON.parse(res.content[0].text);
                                        if (data.workspaceState && data.workspaceState.files) {
                                            setFiles(data.workspaceState.files);
                                            const act = data.workspaceState.files.find(f => f.name === activeFile);
                                            if (act) setCode(act.content);
                                        }
                                    } catch (e) { console.error("Pull failed"); }
                                }}
                                className="flex items-center gap-2 px-3 py-1 bg-[#fbc05c]/20 hover:bg-[#fbc05c]/40 text-[#fbc05c] border border-[#fbc05c]/30 rounded text-[10px] font-bold uppercase tracking-wider transition-all"
                                title="Pull latest files from cloud"
                            >
                                <ArrowLeft size={10} className="rotate-180" /> Pull Files
                            </button>
                        </div>
                        <button
                            onClick={handleRunCode}
                            disabled={isValidating}
                            className="flex items-center gap-2 bg-[#00ff9d] hover:bg-[#00cc7d] text-black px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wide transition-all shadow-[0_0_10px_rgba(0,255,157,0.2)] disabled:opacity-50"
                        >
                            {isValidating ? <Cpu className="animate-spin" size={14} /> : <Play size={14} fill="currentColor" />}
                            {isValidating ? "PROCESSING..." : "RUN & REVIEW"}
                        </button>
                    </div>

                    <div className="flex-1 relative w-full overflow-hidden">
                        <Editor
                            height="100%"
                            width="100%"
                            defaultLanguage="python"
                            language={language}
                            theme="vs-dark"
                            value={code}
                            onChange={handleEditorChange}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: "'Fira Code', monospace",
                                scrollBeyondLastLine: false,
                                padding: { top: 16 },
                                automaticLayout: true
                            }}
                        />
                    </div>
                </div>

                {/* DRAG HANDLE (Editor <-> Info) */}
                <div
                    onMouseDown={handleDragTop}
                    className="h-1 bg-[#1a2332] hover:bg-[#fbc05c] cursor-row-resize z-50 flex items-center justify-center transition-colors hover:h-1.5 shrink-0"
                >
                    <GripHorizontal size={12} className="text-gray-600 pointer-events-none" />
                </div>

                {/* BOTTOM: INFO PANEL */}
                <div className="flex-1 bg-transparent flex flex-col min-h-0 overflow-hidden">
                    <div className="p-4 border-b border-gray-800 flex items-start justify-between shrink-0 bg-transparent">
                        <div>
                            <h1 className="text-lg font-bold text-white mb-0.5 tracking-tight">{activePhase.title}</h1>
                            <p className="text-[10px] font-bold text-[#fbc05c] uppercase tracking-widest">PHASE {activePhase.id}</p>
                        </div>
                        {isApproved ? (
                            <button onClick={handleSubmitPhase} className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-black font-bold text-[10px] uppercase rounded flex items-center gap-2">
                                Next <CheckCircle size={12} />
                            </button>
                        ) : (
                            <div className="flex flex-col items-end gap-1">
                                <button disabled className="px-4 py-1.5 bg-[#111111] text-gray-500 font-bold text-[10px] uppercase rounded cursor-not-allowed border border-gray-700">
                                    Next &gt;
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Split Content Grid - Scrollable Content */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 p-6 min-h-0">
                        <div className="grid grid-cols-2 gap-8">
                            {/* COL 1: Objective & Instructions */}
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase flex items-center gap-2">
                                    <CheckCircle size={12} /> Objective
                                </h4>
                                <p className="text-xs text-gray-300 mb-4 leading-relaxed bg-[#0a111e] p-3 rounded border border-gray-800/50">
                                    {activePhase.description}
                                </p>

                                <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase">
                                    Instructions
                                </h4>
                                <ul className="space-y-2">
                                    {(activePhase.tasks || []).map((task, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                                            <span className="mt-1 w-1 h-1 rounded-full bg-[#fbc05c] shrink-0 shadow-[0_0_4px_cyan]" />
                                            <span className="leading-relaxed">{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* COL 2: Resources & Status */}
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase">
                                    Resources
                                </h4>
                                <ul className="space-y-2 mb-6">
                                    {activePhase.resources && activePhase.resources.length > 0 ? (
                                        activePhase.resources.map((res, idx) => (
                                            <li key={idx}>
                                                <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-green-500 hover:text-white transition group">
                                                    <span className="opacity-50 group-hover:opacity-100">🔗</span> {res.label}
                                                </a>
                                            </li>
                                        ))
                                    ) : (
                                        <li>
                                            <a href={`https://www.google.com/search?q=${encodeURIComponent(activePhase.title + " tutorial")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-green-500 hover:text-white transition group">
                                                <span className="opacity-50 group-hover:opacity-100">🔍</span> Search: {activePhase.title}
                                            </a>
                                        </li>
                                    )}
                                </ul>

                                <div className={`p-3 rounded border ${isApproved ? 'bg-green-900/10 border-green-500/30' : 'bg-[#0e1623] border-gray-800'}`}>
                                    <h4 className="text-[10px] font-bold text-gray-500 mb-1 uppercase">Verification</h4>
                                    {isApproved ? (
                                        <div className="text-green-400 text-xs font-bold flex items-center gap-2">
                                            <CheckCircle size={14} /> Verified
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-2 text-gray-500 text-[10px]">
                                            <AlertCircle size={12} className="mt-0.5 shrink-0" />
                                            <p>Upload a screenshot in chat to verify.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
