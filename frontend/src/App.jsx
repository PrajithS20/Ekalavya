import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import LoginSignup from "./pages/LoginSignup";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ProjectLab from "./pages/ProjectLab";
import UploadResume from "./pages/UploadResume";
import OfflineAtlas from "./pages/OfflineAtlas";
import JobHub from "./pages/JobHub";
import MyWorkspace from "./pages/MyWorkspace";
import MyWorkspaceOverview from "./pages/MyWorkspaceOverview";
import GroupSession from "./pages/GroupSession";
import CareerGuidance from "./pages/CareerGuidance";
import MyLearning from "./pages/MyLearning";
import ProjectPhases from "./pages/ProjectPhases";
import TheFoundry from "./pages/TheFoundry";
import ResumeBuilder from "./pages/ResumeBuilder";
import Profile from "./pages/Profile";
import CommunityChat from "./pages/CommunityChat";
import ResearchPage from "./pages/ResearchPage";
import Galaxy from "./components/Galaxy";
import ErrorBoundary from "./components/ErrorBoundary";
import { useMCP } from "./context/MCPProvider";



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("authToken") !== null;
  });

  // Activity Tracking Logic
  const activityTimerRef = useRef(0);

  const { client, isConnected } = useMCP();

  useEffect(() => {
    if (!isAuthenticated || !isConnected || !client) return;

    const interval = setInterval(() => {
      activityTimerRef.current += 1;

      if (activityTimerRef.current >= 10) {
        const today = new Date().toISOString().split('T')[0];

        client.callTool({
          name: "market_update_activity",
          arguments: {
            date: today,
            hours: 0.17,
            level: 2
          }
        }).catch(err => console.error("Tracking error:", err));

        activityTimerRef.current = 0;
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated, isConnected, client]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <div className="flex h-screen overflow-hidden bg-transparent text-gray-200 relative">

          {/* Global Background Layer */}
          <div className="fixed inset-0 z-0 bg-[#0a0a0a]">
            {/* Ambient Yellow Glow */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#fbc05c]/10 blur-[150px] pointer-events-none rounded-full" />
          </div>

          <div className="relative z-10 flex h-full w-full">
            <Routes>

              {/* Main App Routes - With Sidebar */}
              <Route path="*" element={
                <div className="flex h-full w-full">
                  <Sidebar onLogout={handleLogout} />
                  <div className="flex-1 overflow-y-auto relative">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/project-lab" element={<ProjectLab />} />
                      <Route path="/community" element={<CommunityChat />} />
                      <Route path="/my-lab" element={<MyWorkspaceOverview />} />
                      <Route path="/collaborate" element={<GroupSession />} />
                      <Route path="/career-guidance" element={<CareerGuidance />} />
                      <Route path="/research" element={<ResearchPage />} />
                      <Route path="/upload-resume" element={<UploadResume />} />
                      <Route path="/resume-builder" element={<ResumeBuilder />} />
                      <Route path="/resume-builder" element={<ResumeBuilder />} />

                      <Route path="/offline-atlas" element={<OfflineAtlas />} />
                      <Route path="/job-hub" element={<JobHub />} />
                      <Route path="/project/:projectId" element={<ProjectPhases />} />
                      <Route path="/project/:projectId/foundry" element={<ErrorBoundary><TheFoundry /></ErrorBoundary>} />
                      <Route path="/workspace/:projectId" element={<MyWorkspace />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}
