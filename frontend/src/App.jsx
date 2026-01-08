import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import LoginSignup from "./pages/LoginSignup";
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
import Galaxy from "./components/Galaxy";

import RoleSelection from "./pages/RoleSelection";
import BusinessLayout from "./layouts/BusinessLayout";
import BusinessDashboard from "./pages/business/BusinessDashboard";
import StartupIncubator from "./pages/business/StartupIncubator";
import Boardroom from "./pages/business/Boardroom";
import GlobalMarkets from "./pages/business/GlobalMarkets";
import GrowthEngine from "./pages/business/GrowthEngine";
import BusinessNetwork from "./pages/business/BusinessNetwork";

import SportsLayout from "./layouts/SportsLayout";
import SportsDashboard from "./pages/sports/SportsDashboard";
import SportsCareerGuidance from "./pages/sports/SportsCareerGuidance";
import TrainingLog from "./pages/sports/TrainingLog";
import TeamChat from "./pages/sports/TeamChat";
import MyStats from "./pages/sports/MyStats";
import Nutrition from "./pages/sports/Nutrition";
import Venues from "./pages/sports/Venues";
import Scouting from "./pages/sports/Scouting";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("authToken") !== null;
  });

  // Activity Tracking Logic
  const activityTimerRef = useRef(0);

  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      activityTimerRef.current += 1;

      // Every 10 minutes (10 * 60 = 600s? No, logic is tick every 1 min)
      // User said "10 mins".
      if (activityTimerRef.current >= 10) {
        // Send update
        const token = sessionStorage.getItem("authToken");
        const today = new Date().toISOString().split('T')[0];

        fetch("http://localhost:8000/profile/activity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            date: today,
            hours: 0.17, // roughly 10 mins
            level: 2 // Assuming normal active level
          })
        }).catch(err => console.error("Tracking error:", err));

        // Reset
        activityTimerRef.current = 0;
      }
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [isAuthenticated]);

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
        <LoginSignup onLogin={handleLogin} />
      ) : (
        <div className="flex h-screen overflow-hidden bg-transparent text-gray-200 relative">

          {/* Global Background Layer */}
          <div className="fixed inset-0 z-0">
            {/* The Image */}
            <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat" />
            {/* The Dimming Overlay */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 flex h-full w-full">
            <Routes>
              {/* Onboarding Route - No Sidebar */}
              <Route path="/onboarding" element={<RoleSelection />} />

              {/* Business Path Routes */}
              <Route path="/business" element={<BusinessLayout />}>
                <Route index element={<BusinessDashboard />} />
                <Route path="incubator" element={<StartupIncubator />} />
                <Route path="network" element={<BusinessNetwork />} />
                <Route path="boardroom" element={<Boardroom />} />
                <Route path="markets" element={<GlobalMarkets />} />
                <Route path="growth" element={<GrowthEngine />} />
              </Route>

              {/* Sports Path Routes */}
              <Route path="/sports" element={<SportsLayout />}>
                <Route index element={<SportsDashboard />} />
                <Route path="guidance" element={<SportsCareerGuidance />} />
                <Route path="training" element={<TrainingLog />} />
                <Route path="chat" element={<TeamChat />} />
                <Route path="stats" element={<MyStats />} />
                <Route path="nutrition" element={<Nutrition />} />
                <Route path="venues" element={<Venues />} />
                <Route path="scouting" element={<Scouting />} />
              </Route>

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
                      <Route path="/upload-resume" element={<UploadResume />} />
                      <Route path="/resume-builder" element={<ResumeBuilder />} />
                      <Route path="/resume-builder" element={<ResumeBuilder />} />

                      <Route path="/offline-atlas" element={<OfflineAtlas />} />
                      <Route path="/job-hub" element={<JobHub />} />
                      <Route path="/project/:projectId" element={<ProjectPhases />} />
                      <Route path="/project/:projectId/foundry" element={<TheFoundry />} />
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
