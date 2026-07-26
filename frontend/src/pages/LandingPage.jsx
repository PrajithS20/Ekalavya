import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, BookOpen, BrainCircuit, Code, FolderGit2, 
  Terminal, User, CheckCircle2, MessageSquare, Briefcase, Zap, Shield, LineChart
} from 'lucide-react';
import { VelIcon } from '../components/VelIcon';
import LoginSignup from './LoginSignup';

export default function LandingPage({ onLogin }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-[#fbc05c]/30 overflow-x-hidden font-sans">
      {/* Removed Fireflies per request */}

      {/* Ambient Wall Glows */}
      <div className="fixed top-0 left-0 w-[400px] h-screen bg-[#fbc05c]/20 blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-[400px] h-screen bg-[#fbc05c]/20 blur-[150px] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="w-full px-8 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <VelIcon size={32} className="text-[#fbc05c]" />
            <span className="font-bold text-3xl tracking-tight">Ekalavya</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-[#fbc05c] text-black px-8 py-2.5 rounded-full text-base font-bold hover:bg-[#e5ae50] transition-colors shadow-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight"
        >
          The Ultimate Platform for <br/>
          <span className="text-[#fbc05c]">AI-Powered Learning</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Build enterprise-grade projects, master in-demand skills, and get personalized career guidance with your own AI mentor. Start your journey in seconds.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => setShowLoginModal(true)}
            className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors text-base md:text-lg"
          >
            Get started
          </button>
        </motion.div>
      </section>

      {/* Video / Showcase Box */}
      <section className="px-6 pb-32 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-white/10 bg-[#111] overflow-hidden shadow-2xl relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#fbc05c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="p-10 text-center border-b border-white/5">
             <h2 className="text-3xl font-bold mb-2">See what <span className="text-[#fbc05c]">projects</span> you will build</h2>
          </div>
          <div className="aspect-[16/9] w-full bg-[#0a0a0a] relative overflow-hidden">
             <img 
               src="/app_slide1.png" 
               alt="Platform Demo" 
               className="w-full h-full object-contain"
             />
          </div>
        </motion.div>
      </section>

      {/* Alternating Features */}
      <section id="product" className="py-24 bg-[#111]">
        <div className="max-w-6xl mx-auto px-6 space-y-32">
          
          {/* Feature 1: Image Left */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbc05c]/20 to-transparent blur-3xl rounded-full" />
              <img src="/app_slide2.png" alt="Resume Analysis" className="rounded-xl border border-white/10 relative z-10 w-full object-contain shadow-2xl" />
            </div>
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#fbc05c] text-sm font-semibold tracking-wide">
                <BrainCircuit size={18} />
                <span>INTELLIGENT ANALYSIS</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold">Deep Resume Insights</h3>
              <p className="text-gray-400 text-lg">
                Upload your resume and let our advanced AI analyze your skill gaps against your target role. We pinpoint exactly what you need to learn to get hired.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> Accurate gap identification</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> Role-specific benchmarking</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> Actionable feedback</li>
              </ul>
            </div>
          </div>

          {/* Feature 2: Image Right */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-l from-[#fbc05c]/20 to-transparent blur-3xl rounded-full" />
              <img src="/app_slide3.png" alt="Project Lab" className="rounded-xl border border-white/10 relative z-10 w-full object-contain shadow-2xl" />
            </div>
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#fbc05c] text-sm font-semibold tracking-wide">
                <Code size={18} />
                <span>HANDS-ON BUILDING</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold">Dynamic Project Lab</h3>
              <p className="text-gray-400 text-lg">
                Automatically generate 9 custom projects (Easy, Medium, Hard) tailored directly to the skills you're missing. Build real, impressive portfolio pieces.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> 9 progressive projects</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> Tailored to your gaps</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> Step-by-step phases</li>
              </ul>
            </div>
          </div>

          {/* Feature 3: Image Left */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbc05c]/20 to-transparent blur-3xl rounded-full" />
              <img src="/app_slide4.png" alt="Career Mentor" className="rounded-xl border border-white/10 relative z-10 w-full object-contain shadow-2xl" />
            </div>
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#fbc05c] text-sm font-semibold tracking-wide">
                <MessageSquare size={18} />
                <span>EXPERT GUIDANCE</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold">AI Career Mentor</h3>
              <p className="text-gray-400 text-lg">
                Chat with an AI mentor that knows your background, your goals, and your current projects. Ask for advice, get unstuck, or even request entirely new projects on the fly.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> Context-aware assistance</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> Project regeneration</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> 24/7 availability</li>
              </ul>
            </div>
          </div>

          {/* Feature 4: Image Right */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-l from-[#fbc05c]/20 to-transparent blur-3xl rounded-full" />
              <img src="/app_slide5.png" alt="The Foundry" className="rounded-xl border border-white/10 relative z-10 w-full object-contain shadow-2xl" />
            </div>
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#fbc05c] text-sm font-semibold tracking-wide">
                <Terminal size={18} />
                <span>PRODUCTION READY</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold">The Foundry Workspace</h3>
              <p className="text-gray-400 text-lg">
                Execute your projects in a dedicated, distraction-free environment. Write code, test functionality, and watch your ideas come to life in a simulated workspace.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> Immersive coding environment</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> Phase-by-phase tracking</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#fbc05c]" /> Build a robust portfolio</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Grid Features */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto text-center">
        <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6 inline-block">Features</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need for Career Growth</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
          A complete, integrated platform from skills analysis to project execution. Built for developer speed and career reliability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {[
            { icon: <BrainCircuit size={24}/>, title: "AI-Powered", desc: "Advanced AI models that understand your career goals." },
            { icon: <Shield size={24}/>, title: "Secure & Private", desc: "Your resume and career data remain completely secure." },
            { icon: <Zap size={24}/>, title: "Instant Generation", desc: "Generate custom project roadmaps in seconds, not days." },
            { icon: <BookOpen size={24}/>, title: "Curated Learning", desc: "Resources hand-picked for the exact skills you need." },
            { icon: <LineChart size={24}/>, title: "Progress Tracking", desc: "Watch your skill gaps close as you complete projects." },
            { icon: <Terminal size={24}/>, title: "Built-in IDE", desc: "Write, test, and deploy directly from your browser." },
            { icon: <MessageSquare size={24}/>, title: "Community Hub", desc: "Connect with peers and mentors in dedicated channels." },
            { icon: <FolderGit2 size={24}/>, title: "Portfolio Ready", desc: "Export your finished projects directly to your portfolio." },
            { icon: <CheckCircle2 size={24}/>, title: "Industry Standard", desc: "Projects designed to meet current industry expectations." },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-amber-500/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[#fbc05c]/10 flex items-center justify-center text-[#fbc05c] mb-6">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Get in and level up your career today.</h2>
          <p className="text-xl text-gray-400 mb-10">Stop guessing what you need to learn. Start building.</p>
          <button 
            onClick={() => setShowLoginModal(true)}
            className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Start Building Now
          </button>
        </div>
      </section>
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[800px] bg-gradient-to-t from-[#fbc05c]/10 via-[#fbc05c]/5 to-transparent pointer-events-none z-0" />

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050505] pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <VelIcon size={32} className="text-[#fbc05c]" />
              <span className="font-bold text-3xl tracking-tight">Ekalavya</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The ultimate platform for AI-powered learning and career development. Build your future today.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4 text-white">Product</h5>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">Project Lab</a></li>
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">Career Mentor</a></li>
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4 text-white">Resources</h5>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4 text-white">Company</h5>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#fbc05c] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
          <p>© 2026 Ekalavya. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>

      {/* Modal Overlay for LoginSignup */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
          >
            {/* The LoginSignup component will handle its own inner animation and layout */}
            <LoginSignup 
              onLogin={onLogin} 
              asModal={true} 
              onClose={() => setShowLoginModal(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
