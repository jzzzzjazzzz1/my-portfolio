import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="brand" to="/#home" aria-label="Home">
          <svg className="brand-logo" width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#22c55e" />
                <stop offset="1" stopColor="#0f7a3d" />
              </linearGradient>
            </defs>
            <path
              d="M20 2 L35 8 V19 C35 28 29 34.5 20 38 C11 34.5 5 28 5 19 V8 Z"
              fill="url(#logoGrad)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            <path d="M16 14 L11 20 L16 26" stroke="#06120a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M24 14 L29 20 L24 26" stroke="#06120a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M21.5 12.5 L18.5 27.5" stroke="#06120a" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="brand-text">SHUBHAM.SEC</span>
        </Link>

        <nav className={`nav-links ${open ? "nav-links-open" : ""}`}>
          <Link to="/#home" onClick={() => setOpen(false)}>HOME</Link>
          <Link to="/#about" onClick={() => setOpen(false)}>ABOUT</Link>
          <Link to="/#skills" onClick={() => setOpen(false)}>SKILLS</Link>
          <Link to="/#experience" onClick={() => setOpen(false)}>EXPERIENCE</Link>
          <Link to="/#certificates" onClick={() => setOpen(false)}>CERTIFICATES</Link>
          <Link to="/#contact" onClick={() => setOpen(false)}>CONTACT</Link>
          <a href="/cv.pdf" download className="nav-cv-mobile" onClick={() => setOpen(false)}>
            DOWNLOAD CV
          </a>
        </nav>

       <a className="btn btn-cv" href="/cv.pdf" download>
  [ DOWNLOAD_CV ]
</a>
        <button className="nav-burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}