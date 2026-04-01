import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
//  STATIC DATA
// ─────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "Doctors", "Analyser", "About"];

const STATS = [
  { value: "2.4M+", label: "Analyses Done" },
  { value: "97.2%", label: "Accuracy Rate" },
  { value: "< 3s",  label: "Result Time"   },
];

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Rachel Kim",
    specialty: "General Physician",
    degree: "MBBS, MD",
    rating: 4.9,
    reviews: 318,
    distance: "2.1 km",
    available: true,
    availLabel: "Today",
    img: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=740",
  },
  {
    id: 2,
    name: "Dr. Samuel Adeyemi",
    specialty: "Neurologist",
    degree: "MBBS, DM",
    rating: 4.8,
    reviews: 214,
    distance: "3.5 km",
    available: false,
    availLabel: "Tomorrow",
    img: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg?w=740",
  },
  {
    id: 3,
    name: "Dr. Priya Lakshmanan",
    specialty: "Internal Medicine",
    degree: "MBBS, MD",
    rating: 4.7,
    reviews: 189,
    distance: "1.8 km",
    available: true,
    availLabel: "Today",
    img: "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827760.jpg?w=740",
  },
  {
    id: 4,
    name: "Dr. Marcus Vance",
    specialty: "Infectious Disease",
    degree: "MBBS, MD",
    rating: 4.9,
    reviews: 402,
    distance: "4.2 km",
    available: false,
    availLabel: "Thursday",
    img: "https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg?w=740",
  },
];

const SYMPTOM_TAGS = [
  { id: "headache",    emoji: "🤕", label: "Headache"    },
  { id: "fever",       emoji: "🌡", label: "Fever"       },
  { id: "fatigue",     emoji: "😴", label: "Fatigue"     },
  { id: "cough",       emoji: "🤧", label: "Cough"       },
  { id: "nausea",      emoji: "🤢", label: "Nausea"      },
  { id: "chest-pain",  emoji: "💔", label: "Chest pain"  },
  { id: "dizziness",   emoji: "💫", label: "Dizziness"   },
  { id: "sore-throat", emoji: "😮", label: "Sore throat" },
];

const QUICK_ADDS = [
  "Body aches",
  "Runny nose",
  "Night sweats",
  "Loss of appetite",
  "Shortness of breath",
];

const AI_RESULTS = [
  {
    name: "Tension Headache",
    match: 87,
    severity: "Low",
    severityColor: "#22c55e",
    pillBg: "#dcfce7",
    pillText: "#15803d",
    desc: "Commonly caused by stress, poor posture, or screen fatigue. Resolves with rest, hydration, and OTC pain relief.",
    barColor: "linear-gradient(90deg,#3b82f6,#22d3ee)",
  },
  {
    name: "Viral Upper Respiratory Infection",
    match: 64,
    severity: "Moderate",
    severityColor: "#f59e0b",
    pillBg: "#fef9c3",
    pillText: "#92400e",
    desc: "A common viral illness affecting the nose, throat, and sinuses. Resolves within 7–10 days with rest and fluids.",
    barColor: "linear-gradient(90deg,#06b6d4,#14b8a6)",
  },
  {
    name: "Dehydration",
    match: 41,
    severity: "Low",
    severityColor: "#22c55e",
    pillBg: "#f1f5f9",
    pillText: "#475569",
    desc: "Insufficient fluid intake triggers headaches, fatigue, and dizziness. Increasing water intake resolves this quickly.",
    barColor: "linear-gradient(90deg,#64748b,#94a3b8)",
  },
];

const FEATURES = [
  { icon: "🔬", bgColor: "#dbeafe", title: "AI Symptom Detection",    desc: "Trained on millions of clinical records. Understands nuanced symptom patterns with medical-grade accuracy." },
  { icon: "🩺", bgColor: "#cffafe", title: "Smart Doctor Matching",    desc: "Connects you with the right specialist. Real-time availability and proximity-based ranking." },
  { icon: "⚡", bgColor: "#dcfce7", title: "Instant Medical Insights", desc: "Get results in under 3 seconds. Clear, evidence-based information exactly when you need it." },
  { icon: "🔒", bgColor: "#ede9fe", title: "Secure & Private",         desc: "End-to-end encryption on all health data. HIPAA-compliant infrastructure. Your data stays yours." },
];

const TRUST_ITEMS = [
  { icon: "🛡", title: "HIPAA Compliant",       desc: "All health data stored and transmitted with HIPAA-grade security protocols and certified infrastructure." },
  { icon: "🔐", title: "End-to-End Encrypted",  desc: "Medical queries and results are fully encrypted at rest and in transit. We never sell your data." },
  { icon: "✅", title: "Clinically Reviewed",    desc: "AI models validated by board-certified physicians and leading medical research institutions." },
];

const FOOTER_COLS = {
  Product: ["Symptom Analyser", "Find Doctors", "Health Insights", "API"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal:   ["Privacy Policy", "Terms", "HIPAA Notice", "Cookies"],
};

// ─────────────────────────────────────────────────────────────
//  THEME TOKENS  (dark-grey + blue)
// ─────────────────────────────────────────────────────────────
const T = {
  pageBg:      "#111827",   // dark grey page background
  surfaceDark: "#1f2937",   // card / section bg
  surfaceMid:  "#374151",   // secondary surfaces
  border:      "#374151",   // subtle borders
  borderLight: "#4b5563",
  textPrimary: "#f9fafb",
  textMuted:   "#9ca3af",
  textFaint:   "#6b7280",
  blue:        "#2563eb",
  blueGrad:    "linear-gradient(135deg,#2563eb,#0891b2)",
  white:       "#ffffff",
};

// ─────────────────────────────────────────────────────────────
//  SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ fontSize: 12, color: s <= Math.round(rating) ? "#fbbf24" : "#4b5563" }}>★</span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  NAVBAR
// ─────────────────────────────────────────────────────────────

import { useNavigate } from "react-router";

function Navbar(){

const navigate = useNavigate()

return(

<nav style={{
position:"fixed",
top:0,
left:0,
right:0,
zIndex:100,
height:64,
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 2.5rem",
background:"rgba(17,24,39,0.90)",
backdropFilter:"blur(20px)",
borderBottom:"1px solid #374151"
}}>

{/* LOGO */}

<div
onClick={()=>navigate("/")}
style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}
>

<div style={{
width:32,
height:32,
borderRadius:10,
background:"linear-gradient(135deg,#3b82f6,#6366f1)",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>

+</div>

<span style={{color:"white",fontWeight:700}}>
CARELENS AI
</span>

</div>


{/* BUTTONS */}

<div style={{display:"flex",gap:10}}>

<button
onClick={()=>navigate("/login")}
style={{
background:"transparent",
color:"white",
border:"1px solid gray",
padding:"6px 14px",
borderRadius:8,
cursor:"pointer"
}}
>
Sign In
</button>

<button
onClick={()=>navigate("/userregister")}
style={{
background:"linear-gradient(135deg,#6366f1,#3b82f6)",
color:"white",
border:"none",
padding:"6px 14px",
borderRadius:8,
cursor:"pointer"
}}
>
Register
</button>

<button
onClick={()=>navigate("/registerdoctor")}
style={{
background:"#16a34a",
color:"white",
border:"none",
padding:"6px 14px",
borderRadius:8,
cursor:"pointer"
}}
>
Register as Doctor
</button>

</div>

</nav>

)

}



// ─────────────────────────────────────────────────────────────
//  HERO BANNER
// ─────────────────────────────────────────────────────────────



import { motion } from "framer-motion";



function HeroBanner() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <img
        src="https://img.freepik.com/free-photo/doctor-nurses-special-equipment_23-2148980721.jpg?t=st=1773481029~exp=1773484629~hmac=ef0d91c764370b5e5ca711395b733c9371afdc82f4987ee422cd4417695a955e&w=1480"
        alt="Medical team"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />

      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(110deg,rgba(10,20,35,0.95) 0%,rgba(10,20,35,0.82) 48%,rgba(10,20,35,0.45) 100%)",
        }}
      />

      {/* GRID BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(37,99,235,0.18)",
              border: "1px solid rgba(99,162,255,0.32)",
              color: "#93c5fd",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: 50,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#60a5fa",
                animation: "pulse 2s ease infinite",
              }}
            />
            AI-Powered Health Analysis
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.6rem,5vw,4.6rem)",
              fontWeight: 800,
              lineHeight: 1.07,
              letterSpacing: "-2px",
              color: "#fff",
              marginBottom: 20,
              maxWidth: 620,
            }}
          >
            AI-Powered <br />

            <span
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(90deg,#60a5fa,#22d3ee,#6ee7b7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Symptoms
            </span>

            <br />
            Analyzer
          </h1>

          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              maxWidth: 440,
              marginBottom: 32,
              fontWeight: 300,
            }}
          >
            Describe your symptoms and get intelligent health insights
            instantly powered by AI and clinical data.
          </p>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.img
            src="https://img.freepik.com/free-photo/female-doctor-holding-her-chin-looking-camera-high-quality-photo_114579-60424.jpg?t=st=1773504603~exp=1773508203~hmac=f9e0bdd5762054514d115ff3ab2554435472132aa5506a7378f0bb5a021a70b1&w=2000"
            alt="Doctor"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              width: 360,
              borderRadius: 22,
              boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
            }}
          />

          {/* TEXT INSIDE PHOTO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
              background: "rgba(15,23,42,0.85)",
              backdropFilter: "blur(10px)",
              padding: 18,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h4 style={{ color: "#fff", marginBottom: 6, fontSize: 16 }}>
              CareLens AI
            </h4>

            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
              }}
            >
              AI-powered symptom analyzer that helps you understand
              possible conditions before visiting a doctor.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* BOTTOM FADE */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          zIndex: 3,
          background: "linear-gradient(to bottom,transparent,#0f172a)",
        }}
      />

      <style>
        {`
        @keyframes pulse{
          0%{opacity:0.4;transform:scale(1)}
          50%{opacity:1;transform:scale(1.4)}
          100%{opacity:0.4;transform:scale(1)}
        }
        `}
      </style>
    </section>
  );
}







// ─────────────────────────────────────────────────────────────
//  DOCTOR CARD
// ─────────────────────────────────────────────────────────────


function DoctorCard({ doctor }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.1 }}
      viewport={{ once: false }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.surfaceDark,
        border: `1px solid ${hovered ? "#3b82f6" : T.border}`,
        borderRadius: 18,
        overflow: "hidden",
        transition: "all .35s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 25px 70px rgba(0,0,0,0.55)"
          : "0 6px 18px rgba(0,0,0,0.35)",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          position: "relative",
          height: 210,
          overflow: "hidden",
          background: T.surfaceMid,
        }}
      >
        <motion.img
          src={doctor.img}
          alt={doctor.name}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))",
          }}
        />

        {/* Specialty badge */}
        <div style={{ position: "absolute", bottom: 14, left: 14 }}>
          <span
            style={{
              background: "rgba(15,23,42,0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              padding: "5px 12px",
              borderRadius: 50,
            }}
          >
            {doctor.specialty}
          </span>
        </div>

        {/* Availability badge */}
        <div style={{ position: "absolute", top: 14, right: 14 }}>
          <span
            style={{
              background: doctor.available
                ? "rgba(34,197,94,0.2)"
                : "rgba(245,158,11,0.2)",
              border: `1px solid ${
                doctor.available
                  ? "rgba(34,197,94,0.4)"
                  : "rgba(245,158,11,0.4)"
              }`,
              color: doctor.available ? "#86efac" : "#fcd34d",
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: doctor.available ? "#22c55e" : "#f59e0b",
              }}
            />
            {doctor.availLabel}
          </span>
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: "18px 18px 22px" }}>
        <p
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 700,
            fontSize: 16,
            color: T.textPrimary,
            margin: "0 0 3px",
          }}
        >
          {doctor.name}
        </p>

        <p
          style={{
            fontSize: 12,
            color: "#60a5fa",
            fontWeight: 600,
            margin: "0 0 14px",
          }}
        >
          {doctor.specialty} · {doctor.degree}
        </p>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            background: T.surfaceMid,
            borderRadius: 12,
            marginBottom: 12,
            overflow: "hidden",
          }}
        >
          {[
            { val: doctor.rating, lbl: "Rating" },
            { val: doctor.reviews, lbl: "Reviews" },
            { val: doctor.distance, lbl: "Away" },
          ].map((s, i) => (
            <div
              key={s.lbl}
              style={{
                textAlign: "center",
                padding: "9px 4px",
                borderRight: i < 2 ? `1px solid ${T.border}` : "none",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: T.textPrimary,
                }}
              >
                {s.val}
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: T.textFaint,
                  marginTop: 1,
                }}
              >
                {s.lbl}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <StarRating rating={doctor.rating} />
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          <button
            style={{
              background: T.blueGrad,
              color: "#fff",
              border: "none",
              fontSize: 13,
              fontWeight: 600,
              padding: "10px 0",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Book Appointment
          </button>

          <button
            style={{
              background: "transparent",
              color: T.textMuted,
              border: `1px solid ${T.borderLight}`,
              fontSize: 13,
              fontWeight: 500,
              padding: "10px 0",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </motion.div>
  );
}



// ─────────────────────────────────────────────────────────────
//  DOCTORS SECTION
// ─────────────────────────────────────────────────────────────

function DoctorsSection() {
  return (
    <section id="doctors" style={{ background: T.pageBg, padding: "72px 0 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#60a5fa", marginBottom: 6 }}>Recommended</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: T.textPrimary, margin: 0, letterSpacing: "-0.5px" }}>
              Top Doctors Near You
            </h2>
            <p style={{ fontSize: 13, color: T.textFaint, marginTop: 4, fontWeight: 300 }}>Board-certified specialists · Matched to your location</p>
          </div>
          <button style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", background: "none", border: "none", cursor: "pointer" }}>
            View all →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
          {DOCTORS.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  SYMPTOM ANALYSER
// ─────────────────────────────────────────────────────────────

function SymptomAnalyser({ onResultsReady }) {

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [activeTags, setActiveTags] = useState(["headache"]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm MediAI. Select symptoms above or describe how you feel — I'll give you intelligent health insights instantly.",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();

  }, []);

  function toggleTag(id) {
    setActiveTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function pushMessage(role, text) {
    setMessages((prev) => [...prev, { role, text }]);
  }

  function runProgressBar(onComplete) {
    setAnalysing(true);

    let v = 0;

    const iv = setInterval(() => {
      v += Math.random() * 15 + 4;

      if (v >= 100) {
        v = 100;
        setProgress(100);
        clearInterval(iv);

        setTimeout(() => {
          setAnalysing(false);
          setProgress(0);
          onComplete();
        }, 400);
      } else {
        setProgress(Math.round(v));
      }
    }, 140);
  }

  function handleAnalyse() {

    const tagLabels = SYMPTOM_TAGS
      .filter((t) => activeTags.includes(t.id))
      .map((t) => t.label);

    const typed = inputValue.trim();

    const all = [...tagLabels, ...(typed ? [typed] : [])];

    if (!all.length) {
      pushMessage("ai", "Please select at least one symptom.");
      return;
    }

    pushMessage("user", "My symptoms: " + all.join(", "));

    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {

      setIsTyping(false);

      pushMessage(
        "ai",
        "Running your symptoms through our AI engine..."
      );

      runProgressBar(() => {

        pushMessage(
          "ai",
          "Analysis complete! Scroll down to see results."
        );

        onResultsReady();
      });

    }, 950);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleAnalyse();
  }

  return (
    <section
      ref={sectionRef}
      id="analyser"
      style={{
        background: "#f3f4f6",
        padding: "90px 0",
        transition: "all 1s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(80px)",
      }}
    >

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 2.5rem",
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: 60,
            alignItems: "start",
          }}
        >

          {/* LEFT CONTENT */}

          <div
            style={{
              transition: "all 1.2s ease",
              transform: visible
                ? "translateX(0)"
                : "translateX(-80px)",
              opacity: visible ? 1 : 0,
            }}
          >

            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#3b82f6",
                marginBottom: 8,
              }}
            >
              Symptom Analyser
            </p>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.3rem",
                fontWeight: 800,
                marginBottom: 16,
                color: "#111827",
              }}
            >
              Tell Us <br />
              How You Feel
            </h2>

            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: "#6b7280",
                marginBottom: 40,
              }}
            >
              Our AI understands natural language. Select symptoms or
              type freely and receive results instantly.
            </p>
          </div>

          {/* RIGHT CARD */}

          <div
            style={{
              background: "#ffffff",
              borderRadius: 20,
              border: "1px solid #e5e7eb",
              boxShadow: "0 25px 60px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "all 1.2s ease",
              transform: visible
                ? "translateX(0)"
                : "translateX(80px)",
              opacity: visible ? 1 : 0,
            }}
          >

            <div
              style={{
                padding: 20,
                borderBottom: "1px solid #e5e7eb",
                background: "#f9fafb",
              }}
            >

              <span
                style={{
                  fontWeight: 600,
                  fontSize: 24,
                  color:"blue",
                  fontFamily:"cursive"
                }}
              >
                Active Symptoms
              </span>

            </div>

            <div style={{ padding: 20 }}>

              <div
                style={{
                  display: "flex",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) =>
                    setInputValue(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Describe symptoms..."
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    padding: "12px",
                    fontSize: 14,
                    color : "black"
                  }}
                />

                <button
                  onClick={handleAnalyse}
                  style={{
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    border: "none",
                    padding: "0 18px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Analyze
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  AI RESULTS DASHBOARD
// ─────────────────────────────────────────────────────────────

function ResultsDashboard({ visible }) {
  if (!visible) return null;
  return (
    <section id="results" style={{ background: T.pageBg, padding: "72px 0 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2.5rem" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#60a5fa", marginBottom: 6 }}>AI Results</p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, color: T.textPrimary, letterSpacing: "-1px", marginBottom: 8 }}>
          Possible Conditions
        </h2>
        <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 32, fontWeight: 300 }}>
          Ranked by match confidence. Always consult a licensed physician for a formal diagnosis.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {AI_RESULTS.map((r, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div key={i}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{
                  background: T.surfaceDark, border: `1px solid ${hov ? "#2563eb" : T.border}`,
                  borderRadius: 18, padding: 24,
                  transition: "all .25s",
                  transform: hov ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.5)" : "0 2px 10px rgba(0,0,0,0.3)",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: T.textPrimary, margin: 0, lineHeight: 1.3 }}>{r.name}</h3>
                  <span style={{ background: r.pillBg, color: r.pillText, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 50, whiteSpace: "nowrap", marginLeft: 8, flexShrink: 0 }}>
                    {r.match}%
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: r.severityColor }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: r.severityColor }}>{r.severity} severity</span>
                </div>
                <p style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.6, marginBottom: 16, fontWeight: 300 }}>{r.desc}</p>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 5 }}>
                    <span style={{ color: T.textFaint }}>Confidence</span>
                    <span style={{ fontWeight: 700, color: T.textPrimary }}>{r.match}%</span>
                  </div>
                  <div style={{ height: 4, background: T.surfaceMid, borderRadius: 50, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${r.match}%`, background: r.barColor, borderRadius: 50 }} />
                  </div>
                </div>
                <button style={{ fontSize: 12, fontWeight: 600, color: "#60a5fa", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Learn more →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  FEATURES SECTION
// ─────────────────────────────────────────────────────────────



function FeaturesSection() {
  return (
    <section
      style={{
        background: T.surfaceDark,
        borderTop: `1px solid ${T.border}`,
        padding: "80px 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>

        {/* IMAGE CONTAINER */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            position: "relative",
            height: 520,
            borderRadius: 22,
            overflow: "hidden",
            marginBottom: 60,
          }}
        >

          {/* IMAGE */}

          <img
            src="https://img.freepik.com/free-photo/young-female-doctor-sitting-office_23-2148396638.jpg?t=st=1773498911~exp=1773502511~hmac=16b046eb6a5680ff06b677f53ea148ff72af67dde29fcefed722aef3e9ee55c8&w=2000"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 70%",
              filter: "brightness(75%)",
            }}
          />

          {/* CARELENS TITLE */}

          <motion.div
            initial={{ opacity: 0, y: -60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            style={{
              position: "absolute",
              top: 30,
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              color: "white",
            }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem,4vw,3.5rem)",
                fontWeight: 900,
                letterSpacing: "4px",
                margin: 0,
                textShadow: "0 10px 30px rgba(0,0,0,0.6)",
              }}
            >
              CARELENS
            </h1>

            <p
              style={{
                marginTop: 6,
                fontSize: 14,
                letterSpacing: 2,
                opacity: 0.9,
              }}
            >
              AI Powered Healthcare Assistant
            </p>
          </motion.div>

          {/* LEFT TEXT */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            style={{
              position: "absolute",
              left: 60,
              top: "50%",
              transform: "translateY(-50%)",
              maxWidth: 320,
              color: "white",
            }}
          >
            <p
              style={{
                fontSize: 12,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: "#93c5fd",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              AI Diagnosis
            </p>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem,3vw,2.3rem)",
                fontWeight: 800,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Smart Health <br />
              Insights
            </h2>

            <p
              style={{
                marginTop: 14,
                fontSize: 14,
                color: "#e5e7eb",
                lineHeight: 1.7,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Our AI analyzes symptoms and suggests possible conditions
              using verified medical datasets.
            </p>
          </motion.div>

          {/* RIGHT TEXT */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            style={{
              position: "absolute",
              right: 60,
              top: "50%",
              transform: "translateY(-50%)",
              maxWidth: 320,
              color: "white",
              textAlign: "right",
            }}
          >
            <p
              style={{
                fontSize: 12,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: "#93c5fd",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              About CareLens
            </p>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem,3vw,2.3rem)",
                fontWeight: 800,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Why Thousands <br />
              Trust Us Daily
            </h2>

            <p
              style={{
                marginTop: 14,
                fontSize: 14,
                color: "#e5e7eb",
                lineHeight: 1.7,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Built with medical expertise and AI technology to help
              users make faster and smarter healthcare decisions.
            </p>
          </motion.div>
        </motion.div>

        {/* FEATURE CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 18,
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: false }}
              whileHover={{ y: -6 }}
              style={{
                background: T.pageBg,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: f.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: T.textPrimary,
                  margin: "0 0 8px",
                }}
              >
                {f.title}
              </h3>

              <p
                style={{
                  fontSize: 13,
                  color: T.textMuted,
                  lineHeight: 1.65,
                  margin: 0,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}



// ─────────────────────────────────────────────────────────────
//  TRUST SECTION
// ─────────────────────────────────────────────────────────────



function TrustSection() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg,#0d1520,#0b1320)",
        padding: "110px 2.5rem",
        borderTop: `1px solid ${T.border}`,
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: "#60a5fa",
              marginBottom: 8,
            }}
          >
            Safety & Privacy
          </p>

          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,3vw,2.6rem)",
              fontWeight: 800,
              color: "#e2e8f0",
              letterSpacing: "-1px",
              marginBottom: 8,
            }}
          >
            Your Privacy is Non-Negotiable
          </h2>

          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.55)",
              fontWeight: 300,
              marginBottom: 48,
              maxWidth: 420,
            }}
          >
            Enterprise-grade encryption and strict data protection on every
            interaction with CareLens AI.
          </p>
        </motion.div>

        {/* CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 24,
            marginBottom: 36,
          }}
        >
          {TRUST_ITEMS.map((item, i) => (
           <motion.div
  key={i}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{ y: -8, scale: 1.03 }}
  viewport={{ once: true }}
  transition={{ duration: 0.45 }}
  style={{
    background: "#e5e7eb",   // grey background
    border: "1px solid #d1d5db",
    borderRadius: 20,
    padding: 28,
    position: "relative",
  }}
>
  <span
    style={{
      fontSize: 28,
      display: "block",
      marginBottom: 14,
    }}
  >
    {item.icon}
  </span>

  <h3
    style={{
      fontSize: 15,
      fontWeight: 600,
      color: "#111827",   // black title
      margin: "0 0 10px",
    }}
  >
    {item.title}
  </h3>

  <p
    style={{
      fontSize: 13,
      color: "#374151",   // dark grey description
      lineHeight: 1.65,
      fontWeight: 300,
      margin: 0,
    }}
  >
    {item.desc}
  </p>
</motion.div>
          ))}
        </div>

        {/* DISCLAIMER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.3)",
            borderRadius: 14,
            padding: "18px 24px",
            fontSize: 13,
            color: "rgba(253,230,138,0.9)",
            lineHeight: 1.7,
            backdropFilter: "blur(10px)",
          }}
        >
          ⚠️ <strong>Medical Disclaimer:</strong> CareLens AI provides
          informational insights only and does not replace professional
          medical diagnosis, treatment, or consultation. Always seek advice
          from a qualified healthcare professional.
        </motion.div>
      </div>
    </section>
  );
}



// ─────────────────────────────────────────────────────────────
//  FOOTER
// ─────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: T.surfaceDark, borderTop: `1px solid ${T.border}`, padding: "48px 2.5rem 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 36 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: T.blueGrad, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                  <rect x="6.5" y="1" width="3" height="14" rx="1.5" fill="white" />
                  <rect x="1" y="6.5" width="14" height="3" rx="1.5" fill="white" />
                </svg>
              </div>
              <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: T.textPrimary }}>MediAI</span>
            </div>
            <p style={{ fontSize: 13, color: T.textFaint, lineHeight: 1.7, fontWeight: 300, maxWidth: 200, margin: 0 }}>
              Next-generation AI health analysis. Understand your body, find the right care.
            </p>
          </div>
          {Object.entries(FOOTER_COLS).map(([section, links]) => (
            <div key={section}>
              <h5 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: T.textFaint, marginBottom: 14 }}>{section}</h5>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                {links.map((link) => (
                  <li key={link}><a href="#" style={{ fontSize: 13, color: T.textMuted, textDecoration: "none", fontWeight: 300 }}>{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 12, color: T.textFaint, margin: 0 }}>© 2025 MediAI Technologies. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "#4b5563", margin: 0 }}>Not a substitute for professional medical advice.</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────

function LandingPage() {
  const [showResults, setShowResults] = useState(false);

  function handleResultsReady() {
    setShowResults(true);
    setTimeout(() => { document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }); }, 300);
  }

  return (
    <div style={{ minHeight: "100vh", background: T.pageBg, fontFamily: "'Outfit',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#111827}
        @keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(96,165,250,.5)}50%{opacity:.6;box-shadow:0 0 0 6px rgba(96,165,250,0)}}
        @keyframes bounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#374151;border-radius:4px}
      `}</style>
      <Navbar />
      <HeroBanner />
      <DoctorsSection />
      <SymptomAnalyser onResultsReady={handleResultsReady} />
      <ResultsDashboard visible={showResults} />
      <FeaturesSection />
      <TrustSection />
      <Footer />
    </div>
  );
}

export default LandingPage;