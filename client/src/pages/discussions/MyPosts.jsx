import { useState, useEffect } from "react";
import axios from "axios";
import CreatePostCard from "../../components/CreatePostCard";
import PostCard from "../../components/PostCard";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const realName = storedUser?.name || "Anonymous Student";

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts");
      const userPosts = res.data.filter(p => p.author === realName);
      setPosts(userPosts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [realName]);

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
          border: "1px solid rgba(255, 255, 255, 0.15)"
        }}
      >
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: "700", marginBottom: "6px", color: "#F7F5EE" }}>
          📝 My Posts
        </h1>
        <p style={{ color: "#D1DFE8", fontSize: "14px", fontWeight: "400", margin: 0 }}>
          Manage all the discussions and notes you've shared.
        </p>
      </div>

      <CreatePostCard onPostCreated={handlePostCreated} />

      {/* Feed */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--textSoft)" }}>Loading discussions...</div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--textSoft)" }}>You haven't posted any discussions yet!</div>
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
