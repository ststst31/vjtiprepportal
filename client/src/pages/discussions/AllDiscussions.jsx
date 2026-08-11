import { useState, useEffect } from "react";
import axios from "axios";
import darkLogo from "../../assets/darklogo.png";
import CreatePostCard from "../../components/CreatePostCard";
import PostCard from "../../components/PostCard";

export default function AllDiscussions() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
