import { useState } from "react";
import CommentSection from "./CommentSection";

export default function PostCard({ post }) {
  const [localPost, setLocalPost] = useState(post);
  const [showComments, setShowComments] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserName = storedUser?.name || "Anonymous Student";

  // Check if current user has upvoted
  const hasUpvoted = localPost.upvotes?.includes(currentUserName);

  const handleVote = async () => {
    setLocalPost((prev) => {
      const upvotes = prev.upvotes || [];
      const newUpvotes = upvotes.includes(currentUserName) 
        ? upvotes.filter(u => u !== currentUserName)
        : [...upvotes, currentUserName];
      return { ...prev, upvotes: newUpvotes };
    });
  };

  const handleCommentAdded = (newComment) => {
    setLocalPost((prev) => ({
      ...prev,
      comments: [...(prev.comments || []), newComment]
    }));
  };

  const handleShare = () => {
    const url = `${window.location.origin}/discussions?post=${localPost._id}`;
    navigator.clipboard.writeText(url);
    alert("Post link copied to clipboard!");
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

  // Truncate long content
  const contentPreviewLength = 200;
  const isLongContent = localPost.content && localPost.content.length > contentPreviewLength;
  const displayContent = !isExpanded && isLongContent
    ? localPost.content.substring(0, contentPreviewLength) + "..."
    : localPost.content;

  return (
    <div 
      style={{
        background: "#E8F0F5",
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
          background: "rgba(255,255,255,0.4)", 
          padding: "16px 8px", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          justifyContent: "flex-start",
          borderRight: "1px solid var(--border)"
        }}
      >
        <button 
          onClick={handleVote}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            color: hasUpvoted ? "#132B40" : "var(--textSoft)",
            transform: hasUpvoted ? "scale(1.1)" : "scale(1)",
            transition: "all 0.2s"
          }}
          title="Upvote"
        >
          ▲
        </button>
        <span style={{ fontWeight: "700", fontSize: "14px", color: hasUpvoted ? "#132B40" : "#5C6B73", margin: "4px 0" }}>
          {localPost.upvotes?.length || 0}
        </span>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "18px 22px" }}>
        {/* Header Metadata */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={localPost.profilePic || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
              alt="author profile"
              style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: "700", color: "#132B40", fontSize: "14px" }}>
                  {localPost.author}
                </span>
                <span style={{ fontSize: "11px", background: "rgba(255,255,255,0.6)", color: "#132B40", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: "10px", fontWeight: "600" }}>
                  VJTI Student
                </span>
              </div>
              <span style={{ fontSize: "12px", color: "#5C6B73" }}>
                {timeAgo(localPost.createdAt)}
              </span>
            </div>
          </div>
          
          {/* Tag Badge */}
          {localPost.tag && (
            <span style={{ 
              fontSize: "10px", 
              textTransform: "uppercase", 
              background: "#FFFFFF", 
              color: "#132B40", 
              border: "1px solid #D1DFE8", 
              padding: "4px 10px", 
              borderRadius: "12px", 
              fontWeight: "700",
              letterSpacing: "0.05em"
            }}>
              {localPost.tag}
            </span>
          )}
        </div>

        {/* Post Title & Content */}
        {localPost.title && (
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "#132B40", margin: "14px 0 6px 0" }}>
            {localPost.title}
          </h2>
        )}
        
        <div style={{ fontSize: "14px", lineHeight: "1.6", color: "#132B40", margin: localPost.title ? "0 0 12px 0" : "12px 0" }}>
          {displayContent}
          {isLongContent && (
            <span 
              onClick={() => setIsExpanded(!isExpanded)} 
              style={{ color: "#132B40", fontWeight: "600", cursor: "pointer", marginLeft: "6px", textDecoration: "underline" }}
            >
              {isExpanded ? "Show less" : "Read more"}
            </span>
          )}
        </div>

        {/* Optional Attached Link */}
        {localPost.linkUrl && (
          <a 
            href={localPost.linkUrl.startsWith('http') ? localPost.linkUrl : `https://${localPost.linkUrl}`}
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "6px", 
              background: "rgba(255,255,255,0.5)", 
              padding: "8px 12px", 
              borderRadius: "8px", 
              fontSize: "13px", 
              color: "#132B40", 
              textDecoration: "none",
              border: "1px solid #D1DFE8",
              marginBottom: "12px"
            }}
          >
            🔗 <span>{localPost.linkUrl}</span>
          </a>
        )}

        {/* Action Bar Footer */}
        <div style={{ display: "flex", gap: "20px", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid #D1DFE8", fontSize: "13px", color: "#5C6B73", fontWeight: "600" }}>
          <span 
            onClick={() => setShowComments(!showComments)}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: showComments ? "#132B40" : "#5C6B73" }}
          >
            💬 {localPost.comments?.length || 0} Comments
          </span>
          <span onClick={handleShare} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            🔗 Share
          </span>
        </div>

        {/* Comments Section */}
        {showComments && (
          <CommentSection 
            postId={localPost._id} 
            comments={localPost.comments} 
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    </div>
  );
}
