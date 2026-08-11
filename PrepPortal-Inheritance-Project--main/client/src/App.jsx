import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Homenew";
import Stats from "./pages/stats/Stats";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Login from "./pages/auth/StudentLogin";
import Signup from "./pages/auth/Signup";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route
          path="/login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        {}
        <Route element={loggedInUser ? <MainLayout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          {}
          <Route
            path="/profile"
            element={<Profile user={loggedInUser} />}
          />
          {}
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

