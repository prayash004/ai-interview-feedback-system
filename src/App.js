import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/skills";
import Contact from "./sections/Contact";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Home />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <footer className="footer">© {new Date().getFullYear()} Prayash Sharma</footer>
    </div>
  );
}

export default App;
