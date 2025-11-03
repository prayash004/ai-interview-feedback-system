import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section id="home" className="home">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Hi, I'm <span className="highlight">Prayash Sharma</span> 👋
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Web Developer | React Enthusiast | Cybersecurity Learner
      </motion.p>
      <a href="#projects" className="btn">View My Work</a>
    </section>
  );
}
