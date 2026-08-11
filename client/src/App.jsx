import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Stats from "./pages/stats/Stats";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Login from "./pages/auth/StudentLogin";
import Signup from "./pages/auth/Signup";
import AllDiscussions from "./pages/discussions/AllDiscussions";
import MyPosts from "./pages/discussions/MyPosts";

function App() {
  const defaultUser = {
    _id: "demo-vjti-user",
    name: "Aaryan VJTI Student",
    email: "aaryan@vjti.ac.in",
    profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    bio: "Computer Engineering Student • VJTI Mumbai Class of 2026",
    roadmap: [
      { title: "JP Morgan Quantitative Research Intern", status: "Placed" },
      { title: "Google STEP Software Engineer", status: "Interview" }
    ]
  };

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        {/* Main Application Layout (Bypassed Login Guard) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<AllDiscussions />} />
          <Route path="/discussions" element={<AllDiscussions />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/stats" element={<Stats />} />
          <Route
            path="/profile"
            element={<Profile user={loggedInUser} />}
          />
          <Route
            path="/profile/:id"
            element={<Profile />}
          />
          <Route
            path="/profile/edit"
            element={
              <EditProfile
                user={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

