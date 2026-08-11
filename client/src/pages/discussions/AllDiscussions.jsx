import { useState, useEffect } from "react";
import darkLogo from "../../assets/darklogo.png";
import CreatePostCard from "../../components/CreatePostCard";
import PostCard from "../../components/PostCard";

export default function AllDiscussions() {
  const [posts, setPosts] = useState([
    {
        _id: "mock1",
        title: "Morgan Stanley IT Interview Experience (Selected)",
        content: "Hey everyone! Just wanted to share my experience interviewing for the Summer Analyst role at Morgan Stanley. The process consisted of 1 coding round and 3 technical interviews. Focus heavily on OOPs concepts and Data Structures (especially DP and graphs). I've attached my preparation notes below. Let me know if anyone has questions!",
        tag: "Internship Prep",
        author: "Aarav Sharma",
        upvotes: ["u1", "u2", "u3"],
        comments: [
            { author: "Priya Patel", content: "This is super helpful, thanks!", createdAt: new Date().toISOString() }
        ],
        createdAt: new Date().toISOString()
    },
    {
        _id: "mock2",
        title: "DBMS Notes for Endsems - B.Tech CS",
        content: "I've compiled all the crucial topics for our upcoming DBMS endsems, including SQL queries, Normalization (1NF to BCNF), and transaction concurrency control. Attached the Google Drive link. Hope it helps!",
        tag: "Branch Notes",
        author: "Neha Desai",
        upvotes: ["u1", "u2", "u3", "u4", "u5"],
        comments: [],
        createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    // No-op for local mock
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div style={{ width: "100%", maxWidth: "840px", margin: "0 auto", padding: "20px" }}>
      {/* Header Banner */}
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

      <CreatePostCard onPostCreated={handlePostCreated} />

      {/* Feed */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--textSoft)" }}>Loading discussions...</div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--textSoft)" }}>No discussions yet. Be the first to post!</div>
      ) : (
        <div>
          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
