import { useState } from "react";

export default function CreatePostCard({ onPostCreated }) {
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General Feed");
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const addPost = async () => {
    if (!newPostContent.trim()) return;

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const authorName = storedUser?.name || "Anonymous Student";
    const email = storedUser?.email || "";
    const profilePic = storedUser?.profilePic || "";

    const newPost = {
      _id: Math.random().toString(36).substr(2, 9),
      title: newPostTitle,
      content: newPostContent,
      tag: selectedCategory,
      linkUrl: linkUrl,
      author: authorName,
      email: email,
      profilePic: profilePic,
      upvotes: [],
      comments: [],
      createdAt: new Date().toISOString()
    };

    setNewPostContent("");
    setNewPostTitle("");
    setLinkUrl("");
    setShowLinkInput(false);
    
    if (onPostCreated) {
      onPostCreated(newPost);
    }
  };

  return (
    <div 
      style={{ 
        background: "var(--card)", 
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        borderRadius: "16px", 
        border: "1px solid var(--border)", 
        padding: "20px 22px", 
        marginBottom: "24px",
        boxShadow: "var(--glass-shadow)"
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text)" }}>Tag Sub-Forum:</span>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ 
            padding: "6px 14px", 
            borderRadius: "10px", 
            border: "1px solid var(--border)", 
            background: "var(--cardSoft)", 
            color: "var(--text)",
            fontWeight: "600",
            fontSize: "13px",
            outline: "none"
          }}
        >
          <option value="General Feed">General Feed</option>
          <option value="Branch Notes">Branch Notes</option>
          <option value="Internship Prep">Internship Prep</option>
          <option value="Exams & Tests">Exams & Tests</option>
          <option value="Campus Life">Campus Life</option>
        </select>
      </div>

      <input
        placeholder="Post Title (Optional)"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: "12px",
          background: "var(--cardSoft)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          fontSize: "15px",
          fontWeight: "600",
          fontFamily: "var(--font-heading)",
          outline: "none",
          marginBottom: "12px"
        }}
      />

      <textarea
        placeholder="Draft a discussion post, share placement tips, or ask a question..."
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        style={{
          width: "100%",
          height: "90px",
          padding: "14px",
          borderRadius: "12px",
          background: "var(--cardSoft)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          resize: "none",
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          outline: "none"
        }}
      />

      {showLinkInput && (
        <input
          placeholder="https://..."
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "10px 14px",
            borderRadius: "12px",
            background: "var(--cardSoft)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            fontSize: "14px",
            outline: "none"
          }}
        />
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px" }}>
        <div style={{ display: "flex", gap: "14px", color: "var(--textSoft)", fontSize: "13px" }}>
          <span 
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
            onClick={() => setShowLinkInput(!showLinkInput)}
          >
            📎 {showLinkInput ? "Remove Link" : "Attach Link"}
          </span>
          <span style={{ cursor: "pointer" }}>📄 Add Document</span>
        </div>
        <button
          onClick={addPost}
          style={{
            padding: "9px 24px",
            background: "#132B40",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(19, 43, 64, 0.25)"
          }}
        >
          Post to Forum
        </button>
      </div>
    </div>
  );
}
