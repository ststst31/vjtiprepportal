import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile({ user, setLoggedInUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [resume, setResume] = useState("");

  const [stepText, setStepText] = useState("");
  const [stepStatus, setStepStatus] = useState("Applied");
  const [roadmap, setRoadmap] = useState([]);
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const currentUser = user || storedUser;

    if (currentUser) {
      setName(currentUser.name || "");
      setBio(currentUser.bio || "");
      setPhoto(currentUser.profilePic || "");
      setResume(currentUser.resume || "");
      setRoadmap(currentUser.roadmap || []);
    }
  }, [user]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => setResume(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("PDF format only please!");
    }
  };

  const addStep = () => {
    if (!stepText.trim()) return;

    setRoadmap([
      ...roadmap,
      { title: stepText, status: stepStatus }
    ]);

    setStepText("");
    setStepStatus("Applied");
  };

  const saveProfile = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser ? storedUser._id : null;

      if (!userId) {
        alert("CRITICAL ERROR: No User ID found. Please Logout and Login again.");
        return;
      }

      const res = await axios.put(
        `http://localhost:5000/users/${userId}`,
        {
          name,
          bio,
          profilePic: photo,
          resume,
          roadmap
        }
      );

      setLoggedInUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Profile Saved Successfully!");
      navigate("/profile");

    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert("Failed to save. Check Console for details.");
    }
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <div 
        style={{
          background: "#FFFFFF",
          borderRadius: "14px",
          border: "1px solid var(--border-subtle)",
          padding: "28px",
          boxShadow: "0 2px 8px rgba(19, 43, 64, 0.04)"
        }}
      >
        <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--navy-primary)", fontSize: "24px", marginBottom: "20px" }}>
          Edit Student Profile
        </h1>

        {/* Profile Image & Upload */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "600", color: "var(--navy-primary)", display: "block", marginBottom: "8px" }}>Profile Picture</label>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {photo && (
              <img
                src={photo}
                alt="Profile Preview"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid var(--border-subtle)"
                }}
              />
            )}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ fontSize: "13px" }} />
          </div>
        </div>

        {/* Resume PDF Upload */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "600", color: "var(--navy-primary)", display: "block", marginBottom: "4px" }}>Resume PDF: </label>
          {resume ? (
            <span style={{ color: "#059669", fontWeight: "600", fontSize: "13px" }}>✓ PDF Attached</span>
          ) : (
            <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>No PDF Uploaded</span>
          )}
          <br />
          <input
            type="file"
            accept="application/pdf"
            onChange={handleResumeUpload}
            style={{ fontSize: "13px", marginTop: "6px" }}
          />
        </div>

        {/* Name */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: "600", color: "var(--navy-primary)", fontSize: "14px" }}>Full Name</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Bio */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "600", color: "var(--navy-primary)", fontSize: "14px" }}>Headline & Bio</label>
          <textarea
            style={{ ...styles.input, height: "80px", resize: "none" }}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Placement Roadmap Editor */}
        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border-subtle)" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--navy-primary)", fontSize: "18px", marginBottom: "12px" }}>
            Placement Roadmap Steps
          </h3>

          <div style={{ display: "flex", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
            <input
              style={{ ...styles.input, margin: 0, flex: 1, minWidth: "150px" }}
              placeholder="e.g. Google SWE Intern"
              value={stepText}
              onChange={(e) => setStepText(e.target.value)}
            />

            <select
              value={stepStatus}
              onChange={(e) => setStepStatus(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid var(--border-subtle)",
                background: "var(--card-powder-blue)",
                color: "var(--navy-primary)",
                fontWeight: "600"
              }}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview Process</option>
              <option value="Placed">Placed</option>
            </select>

            <button onClick={addStep} style={{...styles.addBtn, minWidth: "100px"}}>
              + Add Step
            </button>
          </div>

          <ul style={{ paddingLeft: "20px", color: "var(--navy-primary)", fontSize: "14px" }}>
            {roadmap.map((s, i) => (
              <li key={i} style={{ marginBottom: "6px" }}>
                <strong>[{s.status}]</strong> {s.title}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: "28px", display: "flex", gap: "12px" }}>
          <button onClick={saveProfile} style={styles.saveBtn}>
            Save Profile Changes
          </button>
          <button onClick={() => navigate("/profile")} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "10px 14px",
    margin: "6px 0 0",
    display: "block",
    borderRadius: "8px",
    border: "1px solid var(--border-subtle)",
    background: "var(--card-powder-blue)",
    color: "var(--navy-primary)",
    fontSize: "14px",
    fontFamily: "var(--font-body)",
    outline: "none"
  },
  addBtn: {
    padding: "10px 16px",
    background: "var(--card-powder-blue)",
    color: "var(--navy-primary)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  },
  saveBtn: {
    padding: "10px 24px",
    background: "var(--navy-primary)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px"
  },
  cancelBtn: {
    padding: "10px 20px",
    background: "transparent",
    color: "var(--text-muted)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px"
  }
};

export default EditProfile;
