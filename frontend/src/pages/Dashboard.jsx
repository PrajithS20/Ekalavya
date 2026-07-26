import { useEffect } from "react";
import TopBar from "../components/TopBar";
import AIChatGuide from "../components/AIChatGuide";
import ServicesList from "../components/ServicesList";
import LiveFeeds from "../components/LiveFeeds";
export default function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">


      {/* Top Bar */}
      <div className="relative z-10 w-full">
        <TopBar />
      </div>

      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        {/* Enable pointer events for children */}
        <div className="pointer-events-auto w-full h-full flex flex-col">


          <div className="flex flex-1 gap-6 p-6 overflow-hidden">
            {/* CENTER - AI Chat Guide & Services */}
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar pb-10">
              <div className="flex flex-col gap-12">
                <AIChatGuide />
                
                <div className="w-full max-w-5xl mx-auto">
                  <div className="flex items-center gap-4 mb-8 opacity-80">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-blue-500/10"></div>
                    <span className="text-xs font-semibold text-blue-500/70 uppercase tracking-[0.2em]">Platform Modules</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-blue-500/30 to-blue-500/10"></div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-200 mb-6 text-left pl-2">System Capabilities</h2>
                  <ServicesList />
                </div>
              </div>
            </div>


            {/* RIGHT */}
            <div className="w-80">
              <LiveFeeds />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
