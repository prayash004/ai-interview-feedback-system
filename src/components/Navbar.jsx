import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">
      <h1 className="logo">PS</h1>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}
