import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import invertedLogo from "../assets/invertedlogo.png";

// Inject keyframes once
const KEYFRAMES_ID = 'sidebar-anim-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(KEYFRAMES_ID)) {
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes sidebarItemIn {
      0% {
        opacity: 0;
        transform: translateX(-18px) scale(0.96);
      }
      60% {
        opacity: 1;
        transform: translateX(4px) scale(1.01);
      }
      100% {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }
    @keyframes sidebarItemOut {
      0% {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateX(-14px) scale(0.97);
      }
    }
    @keyframes sidebarDividerIn {
      0% { opacity: 0; transform: scaleX(0); }
      100% { opacity: 1; transform: scaleX(1); }
    }
    @keyframes sidebarFooterIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

export default function LeftSidebar({ onSelectCategory, activeCategory, isOpen = true, onToggle }) {
  const [isDark, setIsDark] = useState(document.body.classList.contains("dark"));
  const [animState, setAnimState] = useState('in'); // 'in' | 'out'
  const prevOpen = useRef(isOpen);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Track open/close transitions
  useEffect(() => {
    if (isOpen && !prevOpen.current) {
      setAnimState('in');
    } else if (!isOpen && prevOpen.current) {
      setAnimState('out');
    }
    prevOpen.current = isOpen;
  }, [isOpen]);

  const primaryNav = [
    { id: 'all', label: 'All Discussions', icon: '🔥', route: '/discussions' },
    { id: 'myposts', label: 'My Posts', icon: '📝', route: '/my-posts' },
    { id: 'notes', label: 'Branch Notes', icon: '📚', route: '/stats' },
    { id: 'internship', label: 'Internship Prep', icon: '💼', url: 'https://docs.google.com/document/d/13GAHXEc_JFMsh4weVrSA-WRCGm8dCO0RMPDC6mHurpc/edit?tab=t.0' },
    { id: 'exams', label: 'Exams & Tests', icon: '📝', url: 'https://vjti.ac.in/degree-exam-section/' },
    { id: 'campus', label: 'Student Organisations', icon: '🏛️', url: 'https://vjti.ac.in/students/' },
  ];

  const secondaryNav = [
    { label: 'VJTI Main Portal', icon: '🌐', url: 'https://vjti.ac.in' },
    { label: 'TPO Office', icon: '🎯', url: 'https://vjti.ac.in/training-and-placement-office/' },
    { label: 'Profile', icon: '👤', route: '/profile' },
  ];

  const handlePrimaryClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (onSelectCategory) onSelectCategory(item.id);
    if (item.route && location.pathname !== item.route) {
      navigate(item.route);
    }
  };

  const handleSecondaryClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.route) {
      navigate(item.route);
    }
  };

  const getItemAnim = (index) => {
    if (animState === 'in') {
      return {
        animation: `sidebarItemIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.06}s both`,
      };
    }
    if (animState === 'out') {
      return {
        animation: `sidebarItemOut 0.2s ease-in ${index * 0.03}s both`,
      };
    }
    return {};
  };

  const totalPrimary = primaryNav.length;

  return (
    <aside style={styles.sidebar}>
      {/* Close button */}
      {onToggle && (
        <button
          onClick={onToggle}
          aria-label="Close Sidebar"
          style={{
            alignSelf: 'flex-end',
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginBottom: '12px',
            transition: 'background 0.15s ease, transform 0.15s ease',
            flexShrink: 0,
            color: 'var(--textSoft)',
            fontSize: '16px',
            fontWeight: 700,
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--card)';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ✕
        </button>
      )}

      {/* Primary navigation */}
      <nav style={styles.navSection}>
        {primaryNav.map((item, index) => {
          const isActive = activeCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handlePrimaryClick(item)}
              style={{
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
                ...getItemAnim(index),
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--card)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={{
                ...styles.navLabel,
                ...(isActive ? styles.navLabelActive : {}),
              }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{
        ...styles.divider,
        transformOrigin: 'left',
        ...(animState === 'in'
          ? { animation: `sidebarDividerIn 0.35s ease ${totalPrimary * 0.06 + 0.1}s both` }
          : animState === 'out'
          ? { animation: `sidebarItemOut 0.15s ease-in 0s both` }
          : {}),
      }} />

      {/* Secondary navigation */}
      <nav style={styles.navSection}>
        {secondaryNav.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSecondaryClick(item)}
            style={{
              ...styles.navItem,
              ...getItemAnim(totalPrimary + 1 + idx),
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--card)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            <span style={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Spacer pushes footer down */}
      <div style={{ flex: 1 }} />

      {/* Footer */}
      <div style={{
        ...styles.footer,
        ...(animState === 'in'
          ? { animation: `sidebarFooterIn 0.45s ease ${(totalPrimary + secondaryNav.length) * 0.06 + 0.15}s both` }
          : animState === 'out'
          ? { animation: `sidebarItemOut 0.15s ease-in 0s both` }
          : {}),
      }}>
        <div style={styles.footerDivider} />
        <p style={styles.footerBrand}>VJTI PrepPortal</p>
        <p style={styles.footerSub}>Peer Knowledge Network</p>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--cardSoft)',
    backdropFilter: 'var(--glass-blur)',
    WebkitBackdropFilter: 'var(--glass-blur)',
    borderRight: '1px solid var(--border)',
    boxShadow: 'var(--glass-shadow)',
    padding: '20px 12px 16px',
    overflowY: 'auto',
    overflowX: 'hidden',
    fontFamily: "'Inter', system-ui, sans-serif",
    transition: 'background 0.4s ease, border 0.4s ease',
  },

  /* Nav */
  navSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 14px',
    borderRadius: '10px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'background 0.15s ease, transform 0.15s ease',
    textAlign: 'left',
    width: '100%',
  },
  navItemActive: {
    background: 'var(--card)',
    boxShadow: 'var(--glass-shadow)',
    border: '1px solid var(--border)',
  },
  navIcon: {
    fontSize: '16px',
    width: '22px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  navLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--textSoft)',
    letterSpacing: '0.005em',
  },
  navLabelActive: {
    color: 'var(--text)',
    fontWeight: 600,
  },

  /* Divider */
  divider: {
    height: '1px',
    background: 'var(--border)',
    margin: '12px 14px',
  },

  /* Footer */
  footer: {
    padding: '0 14px 4px',
  },
  footerDivider: {
    height: '1px',
    background: 'var(--border)',
    marginBottom: '14px',
  },
  footerBrand: {
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--textSoft)',
    margin: 0,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  footerSub: {
    fontSize: '10px',
    color: 'var(--textSoft)',
    opacity: 0.6,
    margin: '3px 0 0',
  },
};
