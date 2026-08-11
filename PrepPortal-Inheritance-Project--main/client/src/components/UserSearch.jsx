import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://vjti-prepportal-backend.onrender.com/users/search?q=${value}`
      );
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ position: "relative", width: "260px" }}>
      
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--text)"
        }}
      />

      {}
      {results.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "38px",
            left: 0,
            right: 0,
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            maxHeight: "250px",
            overflowY: "auto",
            zIndex: 999
          }}
        >
          {results.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                navigate(`/profile/${user._id}`);
                setResults([]);
                setQuery("");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "12px",
                cursor: "pointer"
              }}
            >
              <img
                src={user.profilePic || "/default-avatar.png"}
                alt="user"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />

              <div>
                <div style={{ fontWeight: 600 }}>
                  {user.name}
                </div>
                <div style={{ fontSize: "12px", color: "var(--textSoft)" }}>
                  {user.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserSearch;
