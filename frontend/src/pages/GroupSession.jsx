import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Globe, Plus } from 'lucide-react';
import { useMCP } from '../context/MCPProvider';

export default function GroupSession() {
    const navigate = useNavigate();
    const { client, isConnected } = useMCP();
    const [joinCode, setJoinCode] = useState("");
    const [isJoining, setIsJoining] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);

    const handleJoin = async () => {
        if (!joinCode || joinCode.length !== 6) {
            setError("Please enter a valid 6-digit code.");
            return;
        }
        if (!client || !isConnected) {
            setError("Not connected to MCP server.");
            return;
        }
        
        setIsJoining(true);
        setError(null);
        try {
            const res = await client.callTool({
                name: "foundry_join_session",
                arguments: { sessionCode: joinCode }
            });
            if (res.content[0].text) {
                const data = JSON.parse(res.content[0].text);
                if (data.error) {
                    setError(data.error);
                } else if (data.success) {
                    navigate(`/project/${data.project_id}/foundry`);
                }
            }
        } catch (err) {
            setError("Invalid Code or Session Expired.");
        }
        setIsJoining(false);
    };

    const handleCreate = async () => {
        if (!client || !isConnected) {
            setError("Not connected to MCP server.");
            return;
        }
        setIsCreating(true);
        setError(null);
        try {
            const res = await client.callTool({
                name: "foundry_start_empty_project",
                arguments: { userId: 1 } // Hardcoded user ID for demo
            });
            if (res.content[0].text) {
                const data = JSON.parse(res.content[0].text);
                if (data.success) {
                    navigate(`/project/${data.project_id}/foundry`);
                }
            }
        } catch (err) {
            setError("Failed to create workspace.");
        }
        setIsCreating(false);
    };

    return (
        <div className="p-8 h-full bg-transparent min-h-screen text-gray-200 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                    <Users className="text-[#fbc05c]" size={32} /> Sync & Collaborate
                </h1>
                <p className="text-gray-400 mb-12 text-lg">Work together in real-time. Join a squad or lead one.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* JOIN CARD */}
                    <div className="bg-[#0a111e] border border-gray-800 p-8 rounded-2xl relative hover:border-[#fbc05c]/50 transition-all group w-full">
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#fbc05c]/20 rounded-full flex items-center justify-center border border-[#fbc05c]/30">
                            <Globe size={20} className="text-[#fbc05c]" />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-4">Join a Session</h2>
                        <p className="text-gray-400 mb-6 text-sm">Enter the 6-digit access code provided by your team lead.</p>

                        <div className="space-y-4">
                            <input
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value)}
                                placeholder="e.g. 592812"
                                maxLength={6}
                                className="w-full bg-black border border-gray-700 p-4 text-center text-2xl tracking-[0.5em] font-mono rounded-lg focus:outline-none focus:border-[#fbc05c] transition-colors text-white uppercase placeholder-gray-800"
                            />
                            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                            <button
                                onClick={handleJoin}
                                disabled={isJoining}
                                className="w-full py-4 bg-gradient-to-r from-[#fbc05c] to-[#fbc05c] hover:from-[#fbc05c] hover:to-[#fbc05c] text-white font-bold rounded-lg transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isJoining ? "CONNECTING..." : "ENTER WORKSPACE"}
                            </button>
                        </div>
                    </div>

                    {/* CREATE CARD */}
                    <div className="bg-[#0a111e] border border-gray-800 p-8 rounded-2xl relative hover:border-[#fbc05c]/50 transition-all group w-full flex flex-col justify-between">
                        <div>
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#fbc05c]/20 rounded-full flex items-center justify-center border border-[#fbc05c]/30">
                                <Plus size={20} className="text-[#fbc05c]" />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-4">Create a Workspace</h2>
                            <p className="text-gray-400 mb-6 text-sm">Start a fresh collaborative environment with no predefined objective. Share the session code with others to collaborate.</p>
                        </div>

                        <button
                            onClick={handleCreate}
                            disabled={isCreating}
                            className="w-full py-4 bg-transparent border-2 border-[#fbc05c] text-[#fbc05c] hover:bg-[#fbc05c] hover:text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                        >
                            {isCreating ? "CREATING..." : "START NEW WORKSPACE"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
