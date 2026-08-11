import { useState, useEffect } from "react";
import axios from "axios";
import darkLogo from "../../assets/darklogo.png";

function Home() {
  const [posts, setPosts] = useState([]);
  const [votes, setVotes] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleVote = (id, direction) => {
    setVotes(prev => {
      const current = prev[id] || 0;
      if (direction === "up") {
        return { ...prev, [id]: current === 1 ? 0 : 1 };
      } else {
        return { ...prev, [id]: current === -1 ? 0 : -1 };
      }
    });
  };

  const timeAgo = (date) => {
    if (!date) return "Just now";
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = { year: 31536000, month: 2592000, day: 86400, hour: 3600, minute: 60 };
    for (let key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval >= 1) return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  return (
    <div style={{ width: "100%", maxWidth: "840px", margin: "0 auto" }}>
      {/* Forum Header Banner */}
      <div 
        style={{ 
          background: "var(--navy-primary)", 
          color: "#FFFFFF", 
          padding: "24px 28px", 
          borderRadius: "16px", 
          marginBottom: "24px",
          backdropFilter: "blur(16px)",
          boxShadow: "var(--glass-shadow)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <img 
          src={darkLogo} 
          alt="VJTI Logo Background" 
          style={{ 
            height: "300px", 
            width: "auto", 
            position: "absolute", 
            right: "-20px", 
            top: "50%", 
            transform: "translateY(-50%)", 
            opacity: 0.15,
            pointerEvents: "none"
          }} 
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: "700", marginBottom: "6px", color: "#F7F5EE" }}>
            VJTI Campus Discussion Forum
          </h1>
          <p style={{ color: "#D1DFE8", fontSize: "14px", fontWeight: "400", margin: 0 }}>
            Connect, share placement experiences, and discuss academic prep with your VJTI peers.
          </p>
        </div>
      </div>

      {/* Liquid Glass Post Creation Box */}

      {/* Forum Feed */}
      <div>
        {posts.map((p) => {
          const voteVal = votes[p._id] || 0;
          const displayScore = (p.votes || 1) + voteVal;

          return (
            <div 
              key={p._id} 
              style={{
                background: "var(--card)",
                backdropFilter: "var(--glass-blur)",
                WebkitBackdropFilter: "var(--glass-blur)",
                borderRadius: "16px",
                border: "1px solid var(--border)",
                marginBottom: "18px",
                display: "flex",
                overflow: "hidden",
                boxShadow: "var(--glass-shadow)"
              }}
            >
              {/* Left Voting Counter */}
              <div 
                style={{ 
                  width: "54px", 
                  background: "var(--cardSoft)", 
                  padding: "16px 8px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center",
                  justifyContent: "flex-start",
                  borderRight: "1px solid var(--border)"
                }}
              >
                <button 
                  onClick={() => handleVote(p._id, "up")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: voteVal === 1 ? "#3B82F6" : "var(--textSoft)"
                  }}
                >
                  ▲
                </button>
                <span style={{ fontWeight: "700", fontSize: "14px", color: "var(--text)", margin: "4px 0" }}>
                  {displayScore}
                </span>
                <button 
                  onClick={() => handleVote(p._id, "down")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: voteVal === -1 ? "#EF4444" : "var(--textSoft)"
                  }}
                >
                  ▼
                </button>
              </div>

              {/* Main Content Area */}
              <div style={{ flex: 1, padding: "18px 22px" }}>
                {/* Header Metadata */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <img
                    src={p.profilePic || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                    alt="author profile"
                    style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }}
                  />

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: "700", color: "var(--text)", fontSize: "14px" }}>
                        {p.author}
                      </span>
                      <span style={{ fontSize: "11px", background: "var(--cardSoft)", color: "var(--text)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: "10px", fontWeight: "600" }}>
                        VJTI Student
                      </span>
                    </div>
                    <span style={{ fontSize: "12px", color: "var(--textSoft)" }}>
                      {timeAgo(p.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--text)", margin: "12px 0" }}>
                  {p.content}
                </div>

                {/* Action Bar Footer */}
                <div style={{ display: "flex", gap: "20px", marginTop: "14px", pt: "10px", borderTop: "1px solid var(--border)", fontSize: "13px", color: "var(--textSoft)", fontWeight: "500" }}>
                  <span style={{ cursor: "pointer" }}>💬 0 Comments</span>
                  <span style={{ cursor: "pointer" }}>🔗 Share</span>
                  <span style={{ cursor: "pointer" }}>🔖 Bookmark</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;


