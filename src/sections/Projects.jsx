import React from "react";
import { FaGithub, } from "react-icons/fa";


const projects = [
  {
    title: "Online Voting System",
    desc: "A blockchain-based secure voting platform ensuring transparency and privacy.",
    tech: "React, Node.js, Solidity, Ethereum",
    img: "/images/voting.png",
    codeLink: "https://github.com/prayash004/voting-app-blockchain",
  },
  {
    title: "tourism Website",
    desc: "Tourism webside that shows the various local spots and places to explore.",
    tech: "React, CSS, Framer Motion",
    img: "/images/travel.png",
   
    codeLink: "https://github.com/prayash004/fullstack.git",
  },
  {
    title: "Fitness Guide",
    desc: "Interactive fitness anatomy guide with exercise library and AI injury support.",
    tech: "React, Express.js, Python API",
    img: "/images/fitness.png",

    codeLink: "https://github.com/prayash004/fitnessguide",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((p, i) => (
          <div key={i} className="project-card">
            <img src={p.img} alt={p.title} className="project-img" />
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <span className="tech">{p.tech}</span>
            <div className="project-links">
              <a href={p.codeLink} target="_blank" rel="noopener noreferrer">
                <FaGithub /> Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}