import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import UserSearch from "../components/UserSearch";

function MainLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="layoutWrapper">

      {}
      <header className="topBar">

        {}
        <div className="topSection brandSection">
          <strong className="brandTitle">
            VJTI PrepPortal
          </strong>
        </div>

        {}
        <div className="topSection searchSection">
          <div className="userSearchWrapper">
            <UserSearch />
          </div>
        </div>

        {}
        <div className="topSection navSection">
          <nav className="topNav">
            <Link to="/">Home</Link>
            <Link to="/stats">Previous Stats</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        </div>

        {}
        <div className="topSection settingsSection">
          <div className="settingsContainer">
            <button onClick={() => setShowSettings(!showSettings)}>⚙</button>

            {showSettings && (
              <div className="settingsMenu">
                <button onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>

                <button className="logoutBtn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

      </header>

      {}
      <div className="mainLayout">
        <LeftSidebar />

        <main className="mainContent">
          <Outlet />
        </main>

        <RightSidebar />
      </div>

    </div>
  );
}

export default MainLayout;




