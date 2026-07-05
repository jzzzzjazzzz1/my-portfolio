import MatrixBackground from "./components/MatrixBackground.jsx";
import GlitchText from "./components/GlitchText.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrambleText from "./components/ScrambleText.jsx";
import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollReveal from "./components/ScrollReveal.jsx";
import Certificates from "./components/Certificates.jsx";
import CertificatesPage from "./components/CertificatesPage.jsx";
import ContactForm from "./components/ContactForm.jsx";
import useScrollToHash from "./hooks/useScrollToHash.js";

export default function App() {
  useScrollToHash();
  const skillsRef = useRef(null);
  const [skillsActive, setSkillsActive] = useState(false);

  useEffect(() => {
    const el = skillsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSkillsActive(true); },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <MatrixBackground intensity="subtle" />
      <div className="bg-overlay" />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage skillsRef={skillsRef} skillsActive={skillsActive} />} />
          <Route path="/certificates" element={<CertificatesPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function HomePage({ skillsRef, skillsActive }) {
  return (
    <>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-left">
            <div className="pill">STATUS: OPEN TO WORK 🟢</div>
            <h1 className="h1">
              Hello, I&apos;m <br />
              <GlitchText>Shubham</GlitchText>
              <br />
              Lamichhane
            </h1>
            <div className="sub">
              <div className="sub-kicker">
                <ScrambleText
                  text="CYBERSECURITY ENTHUSIAST & RESEARCHER"
                  duration={1400}
                  revealDelay={200}
                  startOnHover={false}
                  retriggerOnView={true}
                  viewThreshold={0.7}
                />
              </div>
              Fresh graduate from <span className="green">Islington College</span> with
              a BSc (Hons) in Computing, Networking & IT Security. Passionate about
              cybersecurity, vulnerability research, and building safer digital systems.
              Successfully completed a vulnerability scanner as my final year project and
              actively seeking opportunities in the cybersecurity field.
            </div>
          <div className="hero-actions">
  <a className="btn btn-primary" href="#experience">[ VIEW_MY_WORK ]</a>
  <a className="btn btn-ghost" href="#contact">[ GET_IN_TOUCH ]</a>
</div>
          </div>

          <div className="hero-right">
            <div className="avatar-card float-slow">
              <div
                className="avatar-halftone"
                style={{ backgroundImage: "url(/Avatar1.png)" }}
                aria-label="Shubham photo"
              />
            </div>
            <div className="card soft terminal-card float">
              <div className="terminal-head">
                <span>terminal@windows</span>
                <span style={{ opacity: 0.7 }}>ACTIVE</span>
              </div>
              <pre className="terminal-pre">
                <span className="ok">&gt; </span>[PROJECT] Portfolio - ACTIVE{"\n"}
                <span className="ok">&gt; </span>[LEARN] OWASP Top 10 loaded successfully{"\n"}
                <span className="ok">&gt; </span>Final year project: 100% COMPLETE{"\n"}
                <span className="ok">&gt; </span>Analyzing network packet flows...{"\n"}
                <span className="ok">&gt; </span>Port scan complete: 65535 ports analyzed{"\n"}
                <span className="ok">&gt; </span>shubham@windows:~$ <span className="cursor">▮</span>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="about-hacker-grid">
            <div className="about-hacker-card">
              <div className="about-card-label">Education</div>
              <div className="about-card-title">Islington College</div>
              <div className="about-card-sub">
                BSc (Hons) Computing, Networking & IT Security<br />
                Graduated 2026 ✓
              </div>
            </div>
            <div className="about-hacker-card">
              <div className="about-card-label">Internship</div>
              <div className="about-card-title">inRed Labs</div>
              <div className="about-card-sub">
                Offensive Security Intern<br />
                Completed ✓
              </div>
            </div>
            <div className="about-hacker-card">
              <div className="about-card-label">Final Year Project</div>
              <div className="about-card-title">PCVP</div>
              <div className="about-card-sub">
                Privilege-Contextual Vulnerability Prioritizer<br />
                Completed ✓
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="skills" ref={skillsRef}>
        <div className="container">
          <ScrollReveal>
            <div className="kicker">ARSENAL</div>
            <h2>My Cybersecurity Skills</h2>
          </ScrollReveal>
          <div className="skill-hacker-grid">
            {[
              { title: "Vulnerability Assessment", desc: "Identifying and evaluating security weaknesses in systems and networks.", tags: ["Nmap", "Nessus", "CVE"] },
              { title: "OWASP Top 10", desc: "Understanding and testing for the most critical web application security risks.", tags: ["SQLi", "XSS", "CSRF"] },
              { title: "API Testing", desc: "Testing REST APIs for authentication flaws, broken access control, and injections.", tags: ["Burp Suite", "Postman", "REST"] },
              { title: "Web Application Testing", desc: "Manual and automated testing of web apps for misconfigurations and flaws.", tags: ["Burp Suite", "OWASP ZAP"] },
              { title: "Cisco Networking", desc: "Designing and managing network infrastructure using Cisco tools and protocols.", tags: ["Cisco", "TCP/IP", "Routing"] },
              { title: "Penetration Testing", desc: "Simulating real-world attacks to identify and exploit vulnerabilities ethically.", tags: ["Kali Linux", "Metasploit"] },
              { title: "Secure Development", desc: "Writing code with security-first practices and principles baked in from the start.", tags: ["Python", "FastAPI", "SAST"] },
              { title: "Security Fundamentals", desc: "Core concepts: CIA triad, cryptography, authentication, and access control.", tags: ["Cryptography", "BAC", "Auth"] },
            ].map((s) => (
              <ScrollReveal key={s.title}>
                <div className="skill-hacker-card">
                  <div className="skill-hacker-name">{s.title}</div>
                  <div className="skill-hacker-desc">{s.desc}</div>
                  <div className="skill-hacker-tags">
                    {s.tags.map(t => <span key={t} className="skill-hacker-tag">{t}</span>)}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="container">
          <ScrollReveal>
            <div className="kicker">EXPERIENCE &amp; PROJECTS</div>
            <h2>My Journey</h2>
          </ScrollReveal>
          <div className="exp-hacker-grid">

            <div className="exp-hacker-card">
              <div className="exp-card-header">
                <div className="exp-card-title">
                  Privilege-Contextual Vulnerability Prioritizer (PCVP)
                </div>
                <span className="badge badge-green">COMPLETED</span>
              </div>
              <div className="exp-card-sub">Final Year Project</div>
              <div className="exp-card-desc">
                Built a full-stack cybersecurity platform that performs automated network
                and web scanning, maps services to known CVEs, detects weak credentials,
                visualizes attack paths, and prioritizes vulnerabilities using
                context-aware and privilege-aware risk scoring — with AI-generated
                remediation guidance and downloadable security reports.
              </div>
              <div className="exp-card-tags">
                <span className="exp-card-tag">Python</span>
                <span className="exp-card-tag">FastAPI</span>
                <span className="exp-card-tag">CVE Mapping</span>
                <span className="exp-card-tag">Network Scanning</span>
                <span className="exp-card-tag">AI Remediation</span>
                <span className="exp-card-tag">Risk Scoring</span>
              </div>
              <div className="exp-private-note">
                Source code private — available upon request
              </div>
            </div>

            <div className="exp-hacker-card">
              <div className="exp-card-header">
  <div className="exp-card-title">Offensive Security Intern</div>
  <span className="badge badge-green">COMPLETED</span>
</div>
<a href="https://inredlabs.net/" target="_blank" rel="noopener noreferrer" className="exp-card-company-link" style={{ color: "rgba(34,197,94,0.85)" }}>
  inRed Labs
</a>
              <div className="exp-card-desc">
                Hands-on offensive security testing, vulnerability assessment, reporting,
                and teamwork with professionals in a real-world security environment.
              </div>
              <div className="exp-card-tags">
                <span className="exp-card-tag">Security Testing</span>
                <span className="exp-card-tag">Reporting</span>
                <span className="exp-card-tag">Team Collaboration</span>
                <span className="exp-card-tag">Offensive Security</span>
              </div>
              <a href="/intern-certificate.pdf" target="_blank" rel="noopener noreferrer" className="exp-cert-link">
                View Certificate
              </a>
            </div>

          </div>
        </div>
      </section>

      <Certificates />

      <section className="section" id="contact">
        <div className="container">
          <ScrollReveal>
            <div className="kicker">CONTACT</div>
            <h2>Get In Touch</h2>
          </ScrollReveal>
         <div className="grid-2">
  <div className="contact-hacker-card">
    <div className="contact-hacker-header">
      <span className="contact-hacker-tag">// contact.init()</span>
      <h3 className="contact-hacker-title">Send a Message</h3>
      <p className="contact-hacker-sub">
        Drop me a message and I&apos;ll get back to you as soon as possible.
      </p>
    </div>
    <ContactForm />
  </div>

  <div className="contact-hacker-right">
    <div className="contact-hacker-card">
      <span className="contact-hacker-tag">// connect.establish()</span>
      <h3 className="contact-hacker-title">Connect With Me</h3>
      <p className="contact-hacker-sub">
        Feel free to reach out — always open to new opportunities and collaborations.
      </p>

      <div className="social-icon-grid">
        <a href="https://github.com/jzzzzjazzzz1" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          <span>GitHub</span>
        </a>
        <a href="https://linkedin.com/in/shubham-lamichhane-373129281/" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span>LinkedIn</span>
        </a>
        <a href="mailto:shubhamlamichhane00@gmail.com" className="social-icon-btn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          <span>Email</span>
        </a>
      </div>

      <div className="social-hacker-note">
        <span className="social-hacker-dot" />
        Available for full-time roles & freelance projects
      </div>
    </div>
  </div>
</div>
        </div>
      </section>
    </>
  );
}