import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import invertedLogo from "../assets/invertedlogo.png";

const LeftSidebar = () => {
  const [isDark, setIsDark] = useState(document.body.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="leftWrapper">
      {}
      <div className="logoHeader">
        {}
        <img src={isDark ? invertedLogo : logo} alt="VJTI Logo" />
        <h3>VJTI PrepPortal</h3>
      </div>

      {}
      <div className="leftSidebar">
        <div className="impLinks">
          <h4>Important Links</h4>
          <ul>
            <li>
              <a href="https://vjti.ac.in" target="_blank" rel="noopener noreferrer">
                VJTI Official Website
              </a>
            </li>
            <li>
              <a href="https://vjti.ac.in/training-and-placement-office/" target="_blank" rel="noopener noreferrer">
                Training & Placement Office
              </a>
            </li>
            <li>
              <a href="https://share.google/9kwSHgl8UkO6X6M4X" target="_blank" rel="noopener noreferrer">
                Student Organizations
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebarFooter">
          <p>VJTI PrepPortal</p>
          <span>Placement Community</span>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;



