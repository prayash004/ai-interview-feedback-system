export default function About() {
  return (
    <section id="about" className="about">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-image">
          <img src="/images/prayash.png" alt="Prayash Sharma" />
        </div>

        <div className="about-text">
          <p>
            Hi! I'm <strong>Prayash Sharma</strong>, a passionate and curious Computer Science student
            at <strong>Jain University</strong>. I’m deeply interested in building interactive,
            user-friendly, and visually appealing web applications that make a real impact.
          </p>

          <p>
            My technical journey started with learning <strong>HTML, CSS, and JavaScript</strong>,
            and over time I’ve grown comfortable with modern frameworks like <strong>React.js</strong>.
            I enjoy bringing ideas to life through clean, responsive design and smooth animations.
          </p>

          <p>
            Alongside development, I’m exploring the world of <strong>cybersecurity and blockchain</strong> —
            especially how decentralized systems like <strong>Blockchain-based Voting</strong> can
            enhance transparency and trust in real-world applications.
          </p>

          <p>
            I believe in continuous learning and love taking on new challenges that push me
            beyond my comfort zone. When I’m not coding, you’ll find me exploring new technologies,
            going to the gym , or brainstorming creative ideas for my next project.
          </p>

          <p className="highlight">
            My goal is to grow as a full-stack developer and contribute to projects that
            combine innovation, security, and design.
          </p>
          {/* ✅ Resume Button */}
          <div className="resume-btn">
            <a href="/Prayash_Sharma_Resume.pdf" download>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
