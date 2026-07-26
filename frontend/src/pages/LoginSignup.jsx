import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Galaxy from "../components/Galaxy";
import { VelIcon } from "../components/VelIcon";
import { useMCP } from "../context/MCPProvider";

export default function LoginSignup({ onLogin, asModal = false, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const { client, isConnected } = useMCP();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConnected || !client) {
      console.warn("MCP Server not connected. Using mock login for UI testing.");
      sessionStorage.setItem("authToken", "mock-token-123");
      sessionStorage.setItem("userName", formData.name || "Test User");
      sessionStorage.setItem("userEmail", formData.email || "test@example.com");
      if (onLogin) onLogin();
      navigate("/");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      if (isLogin) {
        const response = await client.callTool({
          name: "auth_auth_login",
          arguments: { email: formData.email, password: formData.password }
        });

        const data = JSON.parse(response.content[0].text);

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.token) {
          sessionStorage.setItem("authToken", data.token);
          sessionStorage.setItem("userName", data.name);
          sessionStorage.setItem("userEmail", data.email);

          if (onLogin) onLogin();
          navigate("/");
        }
      } else {
        const response = await client.callTool({
          name: "auth_auth_signup",
          arguments: {
            name: formData.name,
            email: formData.email,
            password: formData.password
          }
        });

        const data = JSON.parse(response.content[0].text);

        if (data.error) {
          throw new Error(data.error);
        }

        alert("Account created successfully! Please sign in.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Auth error:", error);
      if (error.message.includes("Tool not found") || error.message.includes("-32603")) {
        console.warn("Auth tool missing on server. Falling back to mock login for UI testing.");
        sessionStorage.setItem("authToken", "mock-token-123");
        sessionStorage.setItem("userName", formData.name || "Test User");
        sessionStorage.setItem("userEmail", formData.email || "test@example.com");
        if (onLogin) onLogin();
        navigate("/");
        return;
      }
      alert(error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const content = (
    <div className={`relative z-10 flex items-center justify-center ${asModal ? 'p-4' : 'min-h-screen p-4'}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative"
      >
        {asModal && (
          <button 
            onClick={onClose} 
            className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white z-50 rounded-full hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
        {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#fbc05c] to-[#fbc05c] rounded-lg flex items-center justify-center shadow-lg">
                <VelIcon size={32} className="text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#fbc05c] via-[#fbc05c] to-[#fbc05c] bg-clip-text text-transparent mb-2">
              EKALAVYA
            </h1>
            <p className="text-gray-600 text-sm">Grow your career with nature's wisdom</p>
          </motion.div>

          {/* Form Container with Animated Gradient Border */}
          <div className="relative group rounded-2xl p-[1px] overflow-hidden">
            {/* Animated Moving Border - Premium Effect */}
            <div className="absolute inset-[-1px] rounded-2xl overflow-hidden z-0">
              <div className="absolute inset-[-200%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#fbc05c_50%,#00000000)] opacity-50 blur-sm" />
              <div className="absolute inset-[-200%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#f9dc75_50%,#00000000)] opacity-30 mix-blend-overlay" style={{ animationDelay: '-2s' }} />
            </div>

            {/* Inner Card Background with Border Mask */}
            <div className="absolute inset-[1px] rounded-2xl bg-black/40 z-0" />

            <motion.div
              layout
              className="relative bg-black/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
            >
              {/* Tab Switcher */}
              <div className="flex bg-white/5 p-1 m-2 rounded-xl">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-6 text-sm font-medium rounded-lg transition-all duration-300 ${isLogin
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-6 text-sm font-medium rounded-lg transition-all duration-300 ${!isLogin
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  Sign Up
                </motion.button>
              </div>

              <div className="p-8 pt-4">
                {/* Social Login */}
                <button
                  onClick={() => alert("Google Login is coming soon! Please use Email/Password for now.")}
                  type="button"
                  className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 mb-6"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-gray-500 bg-[#000]">Or continue with email</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {isLogin ? (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                          </label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#fbc05c] transition-colors" size={20} />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                              placeholder="Enter your email"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                          </label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#fbc05c] transition-colors" size={20} />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                              placeholder="Enter your password"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="signup"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name
                          </label>
                          <div className="relative group">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#fbc05c] transition-colors" size={20} />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                          </label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#fbc05c] transition-colors" size={20} />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                              placeholder="Enter your email"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                          </label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#fbc05c] transition-colors" size={20} />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                              placeholder="Create a password"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Confirm Password
                          </label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#fbc05c] transition-colors" size={20} />
                            <input
                              type="password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                              placeholder="Confirm your password"
                              required
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-[#fbc05c] text-white py-3 px-6 rounded-lg font-medium hover:from-[#fbc05c] hover:to-orange-700 transition-all duration-300 shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 group"
                  >
                    <span>{isLogin ? "Sign In with Email" : "Create Account"}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  {/* Additional Links */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-gray-500 hover:text-[#fbc05c] transition-colors"
                    >
                      {isLogin ? "Forgot your password?" : "Already have an account?"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>


          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8 text-gray-500 text-sm"
          >
            <p>🌱 Nurture your career growth with Career AI</p>
          </motion.div>
        </motion.div>
      </div>
  );

  if (asModal) {
    return content;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <Galaxy
          starSpeed={0.5}
          density={1}
          hueShift={140}
          speed={1}
          glowIntensity={0.3}
          saturation={0}
          mouseRepulsion={true}
          repulsionStrength={2}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
        />
      </div>
      {content}
    </div>
  );
}