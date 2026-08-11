import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Profile({ user }) {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setProfile(null);

    if (id) {
      axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.log(err));
      return;
    }

    if (user) {
      setProfile(user);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setProfile(storedUser);
      }
    }
  }, [user, id]);

  if (!profile) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--navy-primary)" }}>No profile loaded</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Please try logging in again.</p>
        <Link 
          to="/login"
          style={{
            background: "var(--navy-primary)",
            color: "#FFFFFF",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600"
          }}
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto" }}>
      {/* LinkedIn-Style Hero Card */}
      <div 
        style={{
          background: "var(--card)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          borderRadius: "20px",
          border: "1px solid var(--border)",
          overflow: "hidden",
          marginBottom: "24px",
          boxShadow: "var(--glass-shadow)"
        }}
      >
        {/* Cover Banner Overlay */}
        <div 
          style={{ 
            height: "140px", 
            background: "linear-gradient(135deg, #132B40 0%, #1A3E5C 100%)",
            position: "relative"
          }} 
        />

        <div style={{ padding: "0 28px 28px", position: "relative", marginTop: "-60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
            <img
              src={profile.profilePic || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"}
              alt="Profile Avatar"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid var(--card)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                background: "var(--card)"
              }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              {loggedInUser?.email === profile.email ? (
                <Link to="/profile/edit" style={styles.solidBtn}>
                  ✏️ Edit Profile
                </Link>
              ) : (
                <button style={styles.solidBtn}>
                  🤝 Connect
                </button>
              )}

              {profile.resume && (
                <a
                  href={profile.resume}
                  download="My_Resume.pdf"
                  style={styles.outlineBtn}
                >
                  📄 Download Resume
                </a>
              )}
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "26px", color: "var(--text)", fontWeight: "700", marginBottom: "4px" }}>
              {profile.name}
            </h1>
            <p style={{ fontSize: "15px", color: "var(--text)", fontWeight: "600", marginBottom: "4px" }}>
              Computer Engineering Student • VJTI Mumbai
            </p>
            <p style={{ fontSize: "13px", color: "var(--textSoft)", marginBottom: "16px" }}>
              Mumbai, Maharashtra, India • Class of 2026
            </p>

            {/* Quick Metrics Bar */}
            <div 
              style={{ 
                display: "flex", 
                gap: "24px", 
                background: "var(--cardSoft)", 
                backdropFilter: "var(--glass-blur)",
                padding: "12px 20px", 
                borderRadius: "12px",
                border: "1px solid var(--border)",
                maxWidth: "400px"
              }}
            >
              <div>
                <strong style={{ fontSize: "16px", color: "var(--text)", display: "block" }}>124</strong>
                <span style={{ fontSize: "12px", color: "var(--textSoft)" }}>Connections</span>
              </div>
              <div>
                <strong style={{ fontSize: "16px", color: "var(--text)", display: "block" }}>18</strong>
                <span style={{ fontSize: "12px", color: "var(--textSoft)" }}>Forum Posts</span>
              </div>
              <div>
                <strong style={{ fontSize: "16px", color: "var(--text)", display: "block" }}>45</strong>
                <span style={{ fontSize: "12px", color: "var(--textSoft)" }}>Upvotes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section Card */}
      <div style={styles.card}>
        <h2 style={styles.sectionHeader}>About</h2>
        <p style={{ color: "var(--text)", lineHeight: "1.6", fontSize: "14px", margin: 0 }}>
          {profile.bio || "Passionate VJTI student sharing interview preparation notes, core engineering concepts, and campus placement resources."}
        </p>
      </div>

      {/* Activity Tabs Section */}
      <div style={styles.card}>
        <h2 style={styles.sectionHeader}>Activity & Portfolio</h2>
        <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--border)", paddingBottom: "10px", marginBottom: "16px" }}>
          {["posts", "resources", "upvoted"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                border: "1px solid var(--border)",
                background: activeTab === tab ? "var(--navy-primary)" : "var(--cardSoft)",
                color: activeTab === tab ? "#FFFFFF" : "var(--text)",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
                textTransform: "capitalize"
              }}
            >
              {tab === "posts" ? "Posts Created" : tab === "resources" ? "Resources Shared" : "Upvoted Discussions"}
            </button>
          ))}
        </div>
        <p style={{ color: "var(--textSoft)", fontSize: "13px", margin: 0 }}>
          Showing recent {activeTab} activity from {profile.name}.
        </p>
      </div>

      {/* Placement Roadmap Section */}
      <div style={styles.card}>
        <h2 style={styles.sectionHeader}>Placement & Interview Roadmap</h2>
        {profile.roadmap && profile.roadmap.length > 0 ? (
          profile.roadmap.map((step, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderRadius: "12px",
                background: "var(--cardSoft)",
                marginBottom: "10px",
                border: "1px solid var(--border)"
              }}
            >
              <span
                style={{
                  background:
                    step.status === "Placed"
                      ? "rgba(16, 185, 129, 0.2)"
                      : step.status === "Interview"
                      ? "rgba(245, 158, 11, 0.2)"
                      : "rgba(59, 130, 246, 0.2)",
                  color:
                    step.status === "Placed"
                      ? "#10B981"
                      : step.status === "Interview"
                      ? "#F59E0B"
                      : "#3B82F6",
                  border: "1px solid currentColor",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                  marginRight: "15px",
                  minWidth: "110px",
                  textAlign: "center",
                }}
              >
                {step.status}
              </span>

              <span style={{ color: "var(--text)", fontWeight: "500", fontSize: "14px" }}>
                {step.title}
              </span>
            </div>
          ))
        ) : (
          <p style={{ color: "var(--textSoft)", fontSize: "14px", margin: 0 }}>
            No roadmap steps added yet. Click "Edit Profile" to add placement application status.
          </p>
        )}
      </div>

      {/* Technical Skills Chips */}
      <div style={styles.card}>
        <h2 style={styles.sectionHeader}>Academic & Technical Skills</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Data Structures & Algorithms", "C++", "React.js", "Node.js", "DBMS", "Operating Systems", "Computer Networks"].map((skill, idx) => (
            <span 
              key={idx} 
              style={{ 
                background: "var(--cardSoft)", 
                color: "var(--text)", 
                border: "1px solid var(--border)",
                padding: "6px 14px", 
                borderRadius: "16px", 
                fontSize: "13px", 
                fontWeight: "600" 
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--card)",
    backdropFilter: "var(--glass-blur)",
    WebkitBackdropFilter: "var(--glass-blur)",
    borderRadius: "16px",
    border: "1px solid var(--border)",
    padding: "22px 26px",
    marginBottom: "20px",
    boxShadow: "var(--glass-shadow)"
  },
  sectionHeader: {
    fontFamily: "var(--font-heading)",
    fontSize: "18px",
    color: "var(--text)",
    fontWeight: "700",
    marginBottom: "14px"
  },
  solidBtn: {
    textDecoration: "none",
    background: "var(--navy-primary)",
    color: "#FFFFFF",
    padding: "8px 18px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer"
  },
  outlineBtn: {
    textDecoration: "none",
    background: "var(--cardSoft)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    padding: "8px 18px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600"
  }
};

export default Profile;