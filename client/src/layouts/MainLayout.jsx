import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import UserSearch from "../components/UserSearch";
import PillNav from "../components/PillNav";
import Dock from "../components/Dock";
import lightLogo from "../assets/lightlogo.png";
import darkLogo from "../assets/darklogo.png";
import { FiHome, FiBookOpen, FiUser, FiBriefcase, FiLogOut, FiEdit3 } from "react-icons/fi";

function MainLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    setIsDark(darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const dockItems = [
    {
      icon: <FiHome />,
      label: "Home Feed",
      onClick: () => navigate("/")
    },
    {
      icon: <FiBookOpen />,
      label: "Academic Notes",
      onClick: () => navigate("/stats")
    },
    {
      icon: <FiEdit3 />,
      label: "New Post",
      onClick: () => navigate("/my-posts")
    },
    {
      icon: <FiBriefcase />,
      label: "Internships & Prep",
      onClick: () => navigate("/")
    },
    {
      icon: <FiUser />,
      label: "Student Profile",
      onClick: () => navigate("/profile")
    },
    {
      icon: <FiLogOut />,
      label: "Sign Out",
      onClick: handleLogout
    }
  ];

  return (
    <div
      className="layoutWrapper"
      style={{
        paddingLeft: sidebarOpen ? '260px' : '0',
        transition: 'padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >

      {/* Full-page left sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: sidebarOpen ? '0' : '-260px',
        bottom: 0,
        width: '260px',
        zIndex: 50,
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <LeftSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Top Navbar: HAMBURGER (when closed) | LOGO | PREP-PORTAL | SEARCHBAR | DARKMODE | SIGNOUT */}
      <header className="topBar" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        padding: '0 24px',
        height: '64px',
      }}>

        {/* Hamburger — only visible when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open Sidebar"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
              padding: '8px',
              marginRight: '12px',
              borderRadius: '8px',
              transition: 'background 0.15s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ display:'block', width:'20px', height:'2px', background:'#FFFFFF', borderRadius:'2px' }} />
            <span style={{ display:'block', width:'20px', height:'2px', background:'#FFFFFF', borderRadius:'2px' }} />
            <span style={{ display:'block', width:'20px', height:'2px', background:'#FFFFFF', borderRadius:'2px' }} />
          </button>
        )}

        {/* VJTI Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: '16px',
          flexShrink: 0,
        }}>
          <img
            src={darkLogo}
            alt="VJTI Logo"
            style={{ height: '120px', width: 'auto' }}
          />
        </div>

        {/* PREP-PORTAL brand text */}
        <div className="brandText" style={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: '24px',
          flexShrink: 0,
          borderLeft: '1px solid rgba(255,255,255,0.15)',
          paddingLeft: '16px',
        }}>
          <strong style={{
            fontFamily: "var(--font-heading)",
            fontSize: '16px',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
          }}>
            PrepPortal
          </strong>
        </div>

        {/* Search Bar — fills remaining space */}
        <div className="searchContainer" style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          borderLeft: '1px solid rgba(255,255,255,0.15)',
          paddingLeft: '20px',
          paddingRight: '20px',
          minWidth: 0,
        }}>
          <div style={{ width: '100%' }}>
            <UserSearch />
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          borderLeft: '1px solid rgba(255,255,255,0.15)',
          paddingLeft: '16px',
          paddingRight: '12px',
          flexShrink: 0,
        }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: 'transparent',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '7px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Sign Out */}
        <div className="hide-on-mobile" style={{
          display: 'flex',
          alignItems: 'center',
          borderLeft: '1px solid rgba(255,255,255,0.15)',
          paddingLeft: '12px',
          flexShrink: 0,
        }}>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.35)',
              padding: '7px 16px',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '13px',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            Sign Out
          </button>
        </div>

      </header>

      {/* Main Grid Content */}
      <div className="mainLayout" style={{ gridTemplateColumns: '1fr 300px' }}>
        <main className="mainContent">
          <Outlet />
        </main>

        <RightSidebar />
      </div>

      {/* Persistent Bottom Floating Dock */}
      <Dock items={dockItems} />

    </div>
  );
}

export default MainLayout;
