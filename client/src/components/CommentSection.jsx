import { useState } from "react";

export default function CommentSection({ postId, comments, onCommentAdded }) {
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserName = storedUser?.name || "Anonymous Student";

  const handleAddComment = async () => {
    if (!newComment.trim() || submitting) return;
    setSubmitting(true);

    const commentObj = {
      author: currentUserName,
      content: newComment,
      createdAt: new Date().toISOString()
    };
    
    setNewComment("");
    if (onCommentAdded) {
      onCommentAdded(commentObj);
    }
    setSubmitting(false);
  };

  return (
    <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
      {/* Comment Input */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          style={{
            flex: 1,
            padding: "8px 14px",
            borderRadius: "20px",
            border: "1px solid var(--border)",
            background: "var(--cardSoft)",
            fontSize: "13px",
            outline: "none"
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddComment();
          }}
        />
        <button
          onClick={handleAddComment}
          disabled={submitting || !newComment.trim()}
          style={{
            padding: "8px 16px",
            background: "var(--navy-primary)",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: submitting || !newComment.trim() ? "not-allowed" : "pointer",
            opacity: submitting || !newComment.trim() ? 0.6 : 1
          }}
        >
          Reply
        </button>
      </div>

      {/* Comments List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {comments && comments.length > 0 ? (
          comments.map((comment, idx) => (
            <div key={idx} style={{ display: "flex", gap: "10px" }}>
              <div 
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#D1DFE8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#132B40",
                  flexShrink: 0
                }}
              >
                {comment.author ? comment.author.charAt(0).toUpperCase() : "?"}
              </div>
              <div style={{ background: "rgba(255,255,255,0.5)", padding: "10px 14px", borderRadius: "0 12px 12px 12px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                  <span style={{ fontWeight: "600", fontSize: "13px", color: "#132B40" }}>
                    {comment.author}
                  </span>
                  <span style={{ fontSize: "11px", color: "#5C6B73" }}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ fontSize: "13px", color: "#132B40", lineHeight: "1.4" }}>
                  {comment.content}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ fontSize: "13px", color: "#5C6B73", textAlign: "center", padding: "10px 0" }}>
            No comments yet. Be the first to reply!
          </div>
        )}
      </div>
    </div>
  );
}
