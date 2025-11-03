import React from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";

const skills = [
  { name: "HTML", level: "90%", icon: <FaHtml5 color="#E44D26" /> },
  { name: "CSS", level: "85%", icon: <FaCss3Alt color="#264DE4" /> },
  { name: "JavaScript", level: "80%", icon: <FaJs color="#F0DB4F" /> },
  { name: "React.js", level: "75%", icon: <FaReact color="#61DBFB" /> },
  { name: "Node.js", level: "70%", icon: <FaNodeJs color="#3C873A" /> },
  { name: "Python", level: "65%", icon: <FaPython color="#3776AB" /> },
  { name: "Git & GitHub", level: "80%", icon: <FaGitAlt color="#F1502F" /> },
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((s, i) => (
          <div key={i} className="skill-card">
            <div className="skill-header">
              <span className="skill-icon">{s.icon}</span>
              <h3>{s.name}</h3>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: s.level }}></div>
            </div>
            <p className="level-text">{s.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
