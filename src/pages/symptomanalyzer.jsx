import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosClient from "../utils/axiosclient";
import { 
  Activity, 
  Stethoscope, 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Loader2,
  Heart,
  Shield,
  Clock,
  Star,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  LogOut,
  UserCircle,
  Brain,
  Zap,
  Award,
  PhoneCall
} from "lucide-react";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const slideInLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const slideInRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

// Navigation Component
const Navbar = ({ user, onLoginClick, onProfileClick, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Activity className="w-7 h-7 text-white" />
          </motion.div>
          <span className={`text-2xl font-bold transition-colors ${
            scrolled ? "text-slate-900" : "text-white"
          }`}>
            MediCare <span className="text-rose-500">AI</span>
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Analyzer', 'How It Works', 'Doctors'].map((item, idx) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -2 }}
              className={`font-medium transition-colors hover:text-rose-500 ${
                scrolled ? "text-slate-700" : "text-white/90"
              }`}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <AnimatePresence mode="wait">
            {user ? (
              <motion.div 
                key="user"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <motion.button 
                  onClick={onProfileClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all"
                >
                  <UserCircle className={`w-5 h-5 ${scrolled ? "text-slate-700" : "text-white"}`} />
                  <span className={scrolled ? "text-slate-700" : "text-white"}>{user.name}</span>
                </motion.button>
                <motion.button 
                  onClick={onLogout}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-rose-50 text-rose-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.button 
                key="login"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={onLoginClick}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(244, 63, 94, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full transition-all"
              >
                Get Started
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? 
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className={`w-6 h-6 ${scrolled ? "text-slate-900" : "text-white"}`} />
              </motion.div> : 
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu className={`w-6 h-6 ${scrolled ? "text-slate-900" : "text-white"}`} />
              </motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-4 shadow-xl overflow-hidden"
          >
            {['Home', 'Analyzer', 'How It Works', 'Doctors'].map((item, idx) => (
              <motion.a 
                key={item} 
                href="#"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="block text-slate-700 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
            <hr className="border-slate-100" />
            {user ? (
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={onLogout} 
                className="w-full py-3 text-rose-500 font-semibold"
              >
                Logout
              </motion.button>
            ) : (
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={onLoginClick} 
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl"
              >
                Get Started
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Login Modal
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({ name: email.split('@')[0], email });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            <UserCircle className="w-10 h-10 text-rose-500" />
          </motion.div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Sign in to access your health dashboard</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
              placeholder="doctor@example.com"
              required
            />
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
              placeholder="••••••••"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={isLoading}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-rose-500/30 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-5 h-5" />
              </motion.div>
            ) : null}
            {isLoading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <motion.button 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className="w-full mt-4 py-3 text-slate-400 hover:text-slate-600 font-medium transition-colors"
        >
          Cancel
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// Profile Modal
const ProfileModal = ({ isOpen, onClose, user, onLogout }) => {
  if (!isOpen || !user) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <span className="text-4xl font-bold text-rose-500">{user.name[0].toUpperCase()}</span>
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
          <p className="text-slate-500">{user.email}</p>
        </motion.div>

        <div className="space-y-3 mb-8">
          {[
            { label: "Member Since", value: "2024", color: "text-slate-900" },
            { label: "Total Consultations", value: "12", color: "text-rose-600" },
            { label: "Health Score", value: "94/100", color: "text-emerald-600" },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ x: 5, backgroundColor: "#f1f5f9" }}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer transition-colors"
            >
              <span className="text-slate-600 font-medium">{stat.label}</span>
              <span className={`font-bold ${stat.color}`}>{stat.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          <motion.button 
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-colors"
          >
            Close
          </motion.button>
          <motion.button 
            onClick={() => { onLogout(); onClose(); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// How It Works Section
const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Describe Symptoms",
      desc: "Enter your symptoms in natural language. Our AI understands medical terminology and context.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      desc: "Our neural network analyzes your symptoms against millions of medical records in seconds.",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Stethoscope,
      title: "Get Matched",
      desc: "Receive personalized doctor recommendations based on your condition and location.",
      color: "from-rose-500 to-pink-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/50 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-rose-200 to-pink-200 rounded-[2rem] blur-2xl opacity-30"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.img 
              src="https://img.freepik.com/premium-photo/woman-with-stethoscope-her-neck-stands-front-wall_1256621-4112.jpg?w=2000"
              alt="How it works"
              className="relative rounded-[2rem] shadow-2xl w-full h-[600px] object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Floating Card */}
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              animate={{ y: [0, -10, 0] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div 
                  className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </motion.div>
                <div>
                  <p className="font-bold text-slate-900">Trusted by 10k+</p>
                  <p className="text-sm text-slate-500">Patients worldwide</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="text-rose-500 font-semibold tracking-wider uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.p>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Three Simple Steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Better Health</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-slate-600 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our AI-powered platform makes healthcare accessible and efficient. 
              Get started in seconds and receive professional guidance instantly.
            </motion.p>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex gap-5 group"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.15 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <motion.span 
                        className="text-sm font-bold text-rose-500"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                      >
                        Step {idx + 1}
                      </motion.span>
                      <motion.div 
                        className="h-px w-12 bg-rose-200"
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Main Component
const SymptomsAnalyzer = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // EXACT SAME LOGIC - NO CHANGES
  const analyzeSymptoms = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.post("symptom/report", {
        symptoms: symptoms
      });
      console.log("API RESPONSE:", res.data);
      setResult(res.data);
    } catch (error) {
      console.log("Error:", error);
    }
    setLoading(false);
  };

  const getRiskColor = (riskLevel) => {
    if (!riskLevel) return { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200", icon: AlertCircle };
    const level = riskLevel.toLowerCase();
    if (level.includes("high")) return { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200", icon: AlertCircle };
    if (level.includes("moderate")) return { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200", icon: Clock };
    return { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200", icon: CheckCircle2 };
  };

  const quickSymptoms = ['Fever', 'Headache', 'Cough', 'Chest Pain', 'Fatigue', 'Nausea'];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar 
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onProfileClick={() => setShowProfile(true)}
        onLogout={() => setUser(null)}
      />

      <AnimatePresence>
        {showLogin && (
          <LoginModal 
            isOpen={showLogin} 
            onClose={() => setShowLogin(false)}
            onLogin={setUser}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showProfile && (
          <ProfileModal 
            isOpen={showProfile} 
            onClose={() => setShowProfile(false)}
            user={user}
            onLogout={() => setUser(null)}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img 
            src="https://img.freepik.com/premium-photo/beautiful-woman-hospital-hallway_1410957-95764.jpg?w=1480"
            alt="Healthcare"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />
        </motion.div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-rose-400/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-rose-300 text-sm font-semibold mb-8"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              AI-Powered Healthcare Platform
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Your Health, <br />
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Powered by AI
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Describe your symptoms and get instant AI analysis. Connect with verified doctors 
              and receive personalized healthcare recommendations in seconds.
            </motion.p>

            {/* Search Box in Hero */}
            <motion.div 
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-2 max-w-2xl"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Describe your symptoms..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && analyzeSymptoms()}
                    className="w-full pl-14 pr-5 py-5 bg-white/90 backdrop-blur-sm rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-lg"
                  />
                </div>
                <motion.button
                  onClick={analyzeSymptoms}
                  disabled={loading || !symptoms.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="analyze"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Activity className="w-5 h-5" />
                        Analyze
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Tags */}
            <motion.div 
              className="flex flex-wrap gap-3 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-slate-400 text-sm py-2">Popular:</span>
              {quickSymptoms.map((tag, idx) => (
                <motion.button
                  key={tag}
                  onClick={() => setSymptoms(prev => prev ? `${prev}, ${tag.toLowerCase()}` : tag.toLowerCase())}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.9 }}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/80 hover:text-white transition-all"
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { value: "99.8%", label: "Accuracy Rate", icon: Award },
                { value: "< 3s", label: "Analysis Time", icon: Zap },
                { value: "50k+", label: "Doctors", icon: Stethoscope },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <stat.icon className="w-6 h-6 text-rose-400" />
                  </motion.div>
                  <div>
                    <motion.p 
                      className="text-2xl font-bold text-white"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + idx * 0.1 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.section 
            id="analyzer" 
            className="py-24 bg-slate-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-7xl mx-auto px-6">
              {/* Analysis Header */}
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Analysis Complete
                </motion.div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Your Health Report</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Based on your symptoms, our AI has generated the following insights</p>
              </motion.div>

              {/* Main Results Grid */}
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {/* Disease Card */}
                <motion.div 
                  className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="flex items-start gap-5 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Stethoscope className="w-8 h-8 text-rose-600" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Detected Condition</p>
                      <h3 className="text-3xl font-bold text-slate-900">{result.symptoms?.disease}</h3>
                    </div>
                  </motion.div>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">{result.symptoms?.explanation}</p>
                  </div>

                  <AnimatePresence>
                    {result.symptoms?.advice && (
                      <motion.div 
                        className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex items-start gap-4">
                          <motion.div 
                            className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Heart className="w-5 h-5 text-rose-600" />
                          </motion.div>
                          <div>
                            <h4 className="font-bold text-rose-900 mb-2">Medical Advice</h4>
                            <p className="text-rose-700 leading-relaxed">{result.symptoms?.advice}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Risk & Info Card */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Risk Level */}
                  <motion.div 
                    className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
                    whileHover={{ y: -5 }}
                  >
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Risk Assessment</p>
                    {(() => {
                      const risk = getRiskColor(result.riskLevel?.riskLevel);
                      const Icon = risk.icon;
                      return (
                        <motion.div 
                          className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl border-2 ${risk.bg} ${risk.text} ${risk.border}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.div
                            animate={result.riskLevel?.riskLevel?.toLowerCase().includes("high") ? { shake: [0, -5, 5, -5, 5, 0] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="w-6 h-6" />
                          </motion.div>
                          <span className="text-xl font-bold">{result.riskLevel?.riskLevel || 'Unknown'}</span>
                        </motion.div>
                      );
                    })()}
                    
                    <div className="mt-6 space-y-4">
                      <motion.div 
                        className="flex items-center justify-between py-3 border-b border-slate-100"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-slate-500">Specialty Needed</span>
                        <span className="font-semibold text-slate-900">{result.symptoms?.specialty}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center justify-between py-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="text-slate-500">Confidence</span>
                        <span className="font-semibold text-emerald-600">High</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div 
                    className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-8 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-bold text-xl mb-3">Need Immediate Help?</h4>
                    <p className="text-rose-100 mb-6">Connect with a doctor right now for urgent consultation</p>
                    <motion.button 
                      className="w-full py-4 bg-white text-rose-600 font-bold rounded-2xl flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PhoneCall className="w-5 h-5" />
                      Emergency Contact
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Doctors Section */}
              <div className="space-y-12">
                {/* DB Doctors */}
                <AnimatePresence>
                  {result?.doctors?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                    >
                      <motion.div 
                        className="flex items-center justify-between mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Star className="w-6 h-6 text-emerald-600" />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900">Available Doctors</h3>
                            <p className="text-slate-500">Verified specialists ready for consultation</p>
                          </div>
                        </div>
                        <motion.button 
                          className="text-rose-600 font-semibold flex items-center gap-2"
                          whileHover={{ x: 5, gap: "12px" }}
                        >
                          View All <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </motion.div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {result.doctors.map((doc, index) => (
                          <motion.div 
                            key={index} 
                            className="group bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                          >
                            <div className="flex items-start gap-5">
                              <motion.div 
                                className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0"
                                whileHover={{ scale: 1.1 }}
                              >
                                <User className="w-10 h-10 text-emerald-600" />
                              </motion.div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="text-xl font-bold text-slate-900">{doc.name}</h4>
                                    <p className="text-emerald-600 font-medium">{doc.specialty}</p>
                                  </div>
                                  <motion.div 
                                    className="flex items-center gap-1 px-3 py-1 bg-emerald-50 rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                  >
                                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                                    <span className="text-sm font-bold text-emerald-700">4.9</span>
                                  </motion.div>
                                </div>
                                
                                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-5">
                                  <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" />
                                    {doc.city}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Phone className="w-4 h-4" />
                                    {doc.contact}
                                  </span>
                                </div>

                                <div className="flex gap-3">
                                  <motion.button 
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 text-white font-semibold rounded-xl"
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Calendar className="w-4 h-4" />
                                    Book Appointment
                                  </motion.button>
                                  <motion.button 
                                    className="px-5 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl"
                                    whileHover={{ borderColor: "#10b981", color: "#10b981", scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Contact
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI Recommended Doctors */}
                <AnimatePresence>
                  {result?.remainingdocter?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                    >
                      <motion.div 
                        className="flex items-center gap-4 mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Brain className="w-6 h-6 text-violet-600" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">AI Recommended Specialists</h3>
                          <p className="text-slate-500">Additional doctors matched by our AI</p>
                        </div>
                      </motion.div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {result.remainingdocter.map((doc, index) => (
                          <motion.div 
                            key={index} 
                            className="group bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-violet-200 transition-all"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                          >
                            <div className="flex items-start gap-5">
                              <motion.div 
                                className="w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0"
                                whileHover={{ scale: 1.1 }}
                              >
                                <User className="w-10 h-10 text-violet-600" />
                              </motion.div>
                              <div className="flex-1">
                                <h4 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h4>
                                <p className="text-violet-600 font-medium mb-4">{doc.specialization}</p>
                                
                                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-5">
                                  <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" />
                                    {doc.location}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Phone className="w-4 h-4" />
                                    {doc.contact}
                                  </span>
                                </div>

                                <motion.button 
                                  className="w-full flex items-center justify-center gap-2 px-5 py-3 border-2 border-violet-200 text-violet-700 font-semibold rounded-xl"
                                  whileHover={{ backgroundColor: "#f5f3ff", borderColor: "#8b5cf6", scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Phone className="w-4 h-4" />
                                  Contact Doctor
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* No Results */}
                <AnimatePresence>
                  {(!result?.doctors?.length && !result?.remainingdocter?.length) && (
                    <motion.div 
                      className="text-center py-16 bg-white rounded-3xl border border-slate-200"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <motion.div 
                        className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Search className="w-10 h-10 text-slate-400" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
                      <p className="text-slate-500">Try adjusting your symptoms or location preferences</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* How It Works Section */}
      <HowItWorks />

      {/* CTA Section with Background Image - Just Above Footer */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <img 
            src="https://img.freepik.com/premium-photo/portrait-beautiful-blond-nurse-smiling-with-stethoscope_1410957-56912.jpg?w=2000"
            alt="Healthcare Professional"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/70" />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-rose-400/40 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-rose-300 text-sm font-semibold mb-6"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Join 50,000+ Happy Patients
          </motion.div>
          
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Ready to Take Control of <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Your Health?
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Join thousands of patients who trust our AI for instant health insights and 
            personalized doctor recommendations. Your well-being is our priority.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Activity className="w-5 h-5" />
              Start Free Analysis
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
            <motion.button 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-2xl"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.2)", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            {[
              { icon: Shield, text: "HIPAA Compliant" },
              { icon: Clock, text: "24/7 Available" },
              { icon: Award, text: "Award Winning" }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-center gap-2 text-white/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                whileHover={{ y: -5, color: "#fff" }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="w-5 h-5 text-rose-400" />
                </motion.div>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-4 gap-12 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="md:col-span-2">
              <motion.div 
                className="flex items-center gap-3 mb-6"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Activity className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-xl font-bold text-white">
                  MediCare <span className="text-rose-500">AI</span>
                </span>
              </motion.div>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                Revolutionizing healthcare with artificial intelligence. Get instant symptom analysis 
                and connect with verified doctors worldwide.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Facebook'].map((social, idx) => (
                  <motion.button 
                    key={social} 
                    className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="text-xs font-bold">{social[0]}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            {[
              { title: "Product", items: ['Symptom Checker', 'Find Doctors', 'Health Insights', 'API'] },
              { title: "Company", items: ['About Us', 'Blog', 'Careers', 'Contact'] }
            ].map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                <h4 className="text-white font-bold mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.items.map((item, itemIdx) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + itemIdx * 0.05 }}
                    >
                      <motion.a 
                        href="#" 
                        className="text-slate-400 hover:text-rose-400 transition-colors inline-block"
                        whileHover={{ x: 5 }}
                      >
                        {item}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-500 text-sm">© 2024 MediCare AI. All rights reserved.</p>
            <div className="flex gap-8 text-sm text-slate-500">
              {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance'].map((item, idx) => (
                <motion.a 
                  key={item}
                  href="#" 
                  className="hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default SymptomsAnalyzer;