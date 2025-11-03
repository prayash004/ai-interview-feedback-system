import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Contact Me</h2>
      <p>
        I’d love to connect! Whether you want to collaborate on a project, discuss opportunities,
        or just say hi — feel free to reach out.
      </p>

      <div className="contact-info">
        <p><FaEnvelope /> <a href="mailto:prayashsharma684@gmail.com">prayashsharma684@gmail.com</a></p>
        <p><FaPhoneAlt /> +91 8116454804</p>
      </div>

      <div className="social-links">
        <a href="https://github.com/prayash004" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/prayashsharma04" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com/its._.putu.x" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
    </section>
  );
}
