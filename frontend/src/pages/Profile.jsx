import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Calendar, Award, BookOpen, Star, Shield, Edit, Camera, Check } from "lucide-react";
import TopBar from "../components/TopBar";
import ActivityHeatmap from "../components/ActivityHeatmap";
import { useMCP } from "../context/MCPProvider";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const { client, isConnected } = useMCP();

  // Real activity data for heatmap
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    if (client && isConnected) {
      fetchProfile();
    }
  }, [client, isConnected]);

  const fetchProfile = async () => {
    if (!client) {
      setLoading(false);
      return;
    }
    try {
      const res = await client.callTool({
        name: "market_get_profile",
        arguments: { userId: 1 } // Hardcoded for now, same as backend
      });
      const data = JSON.parse(res.content[0].text);
      if (data.error) {
        setLoading(false);
        return;
      }

      setProfileData(data);
      setGoals(data.goals || []);
      setActivityData(data.activity || []);

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch profile", err);
      setLoading(false);
    }
  };

  const toggleGoal = async (goal) => {
    // Optimistic UI
    const updatedGoals = goals.map(g => g.id === goal.id ? { ...g, is_done: !g.isDone } : g);
    setGoals(updatedGoals);

    if (!client) return;

    try {
      await client.callTool({
        name: "market_update_goal",
        arguments: { goalId: goal.id, is_done: !goal.isDone }
      });
    } catch (e) {
      console.error("Failed to update goal");
      // Revert
      fetchProfile();
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const updates = {
      userId: 1, // hardcoded for prototype
      full_name: formData.get("full_name"),
      bio: formData.get("bio"),
      location: formData.get("location"),
      avatar: profileData?.avatar // Preserve existing avatar
    };

    if (!client) return;

    try {
      await client.callTool({
        name: "market_update_profile",
        arguments: updates
      });
      setIsEditing(false);
      fetchProfile(); // Refresh
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      setProfileData(prev => ({ ...prev, avatar: base64String }));

      if (!client) return;

      try {
        const updates = {
          userId: 1,
          full_name: profileData.fullName || "",
          bio: profileData.bio || "",
          location: profileData.location || "",
          avatar: base64String
        };
        await client.callTool({
          name: "market_update_profile",
          arguments: updates
        });
      } catch (err) {
        console.error("Failed to upload avatar");
        fetchProfile();
      }
    };
    reader.readAsDataURL(file);
  };

  // derived user object
  const user = profileData ? {
    name: profileData.full_name || "Cadet X",
    role: profileData.role || "Level 1 Scout",
    email: profileData.email || "cadet.x@careerai.com",
    location: profileData.location || "New York, USA",
    joinDate: "January 2025",
    avatar: profileData.avatar,
    bio: profileData.bio || "Software Engineer"
  } : {
    name: "Cadet X",
    role: "Level 1 Scout",
    email: "cadet.x@careerai.com",
    location: "New York, USA",
    joinDate: "January 2025",
    bio: "Software Engineer"
  };

  // Calculate stats dynamically based on real data where available
  const getSkillCount = () => {
    if (!profileData?.analysis?.current_skills) return "0";
    if (typeof profileData.analysis.current_skills === 'string') {
      return profileData.analysis.current_skills.split(',').length;
    }
    if (Array.isArray(profileData.analysis.current_skills)) {
      return profileData.analysis.current_skills.length;
    }
    return "0";
  };

  const stats = [
    { label: "Projects Active", value: profileData?.active_projects_count ?? profileData?.projects?.length ?? "0", icon: Star, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "Trees Grown", value: profileData?.trees_planted ?? "0", icon: Shield, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Growth Stage", value: profileData?.growth_stage || "Seed", icon: BookOpen, color: "text-[#fbc05c]", bg: "bg-[#fbc05c]/10" },
    { label: "Goals Completed", value: goals.filter(g => g.is_done).length, icon: Award, color: "text-[#fbc05c]", bg: "bg-[#fbc05c]/10" }
  ];

  if (loading) return <div className="p-10 text-white">Loading Profile...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <TopBar />

      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-[#0a0a0a]/50 border border-white/10 p-8 backdrop-blur-xl"
          >
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#fbc05c]/20 via-[#fbc05c]/20 to-[#fbc05c]/20 blur-3xl" />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-[#0a0a0a] flex items-center justify-center border-4 border-slate-800 shadow-xl relative z-10 overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={64} className="text-gray-400" />
                  )}
                </div>
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 p-2 bg-[#fbc05c] rounded-full text-white shadow-lg z-20 hover:bg-[#fbc05c] transition-colors cursor-pointer"
                >
                  <Camera size={16} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
                    <p className="text-[#fbc05c] font-medium">{user.role}</p>
                    <p className="text-gray-400 text-sm mt-1">{user.bio}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit Profile
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <Mail size={14} className="text-gray-500" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <MapPin size={14} className="text-gray-500" />
                    {user.location}
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <Calendar size={14} className="text-gray-500" />
                    Joined {user.joinDate}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="bg-[#0a0a0a]/50 border border-white/10 p-6 rounded-2xl backdrop-blur-sm"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 bg-[#0a0a0a]/50 border border-white/10 rounded-3xl p-6 min-h-[280px] flex flex-col backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Time Spent Learning</h3>
                <div className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-xs text-gray-400">
                  Last Year
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center overflow-x-auto">
                <ActivityHeatmap data={activityData} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0a0a0a]/50 border border-white/10 rounded-3xl p-6 h-full min-h-[280px] backdrop-blur-sm flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Current Goals</h3>
                {/* Could add 'Add Goal' button here later */}
              </div>

              <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {goals.length === 0 && <div className="text-gray-500 text-sm">No goals set yet.</div>}
                {goals.map((goal, i) => (
                  <div
                    key={goal.id || i}
                    onClick={() => toggleGoal(goal)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-white/10 transition-colors cursor-pointer select-none"
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${goal.is_done ? 'border-[#fbc05c] bg-[#fbc05c]' : 'border-gray-600 group-hover:border-[#fbc05c]/50'}`}>
                      {goal.is_done && <Check size={12} className="text-black font-bold" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${goal.is_done ? 'text-gray-500 line-through' : 'text-gray-200'} transition-colors`}>{goal.text}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-md font-medium ${goal.color || "text-gray-400 bg-[#111111]"}`}>{goal.tag}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Edit Profile</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Full Name</label>
                <input name="full_name" defaultValue={user?.name || ""} className="w-full bg-[#111111] border border-gray-700 rounded p-2 text-white text-sm focus:border-[#fbc05c] outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Bio</label>
                <input name="bio" defaultValue={user?.bio || ""} className="w-full bg-[#111111] border border-gray-700 rounded p-2 text-white text-sm focus:border-[#fbc05c] outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Email</label>
                <input name="email" defaultValue={user?.email || ""} className="w-full bg-[#111111] border border-gray-700 rounded p-2 text-white text-sm focus:border-[#fbc05c] outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Location</label>
                <input name="location" defaultValue={user?.location || ""} className="w-full bg-[#111111] border border-gray-700 rounded p-2 text-white text-sm focus:border-[#fbc05c] outline-none" />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#fbc05c] hover:bg-[#fbc05c] text-white rounded text-sm font-bold transition-colors">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
