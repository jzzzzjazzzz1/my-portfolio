import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal.jsx";
import { CERTS, CertCard, useCredlyScript } from "./Certificates.jsx";

export default function CertificatesPage() {
  useCredlyScript([CERTS.length]);

  return (
    <section className="section" id="all-certificates">
      <div className="container">

        <Link
          to="/"
          className="btn btn-ghost"
          style={{ marginBottom: 24, display: "inline-flex" }}
        >
          Back to Home
        </Link>

        <ScrollReveal>
          <div className="kicker">ACHIEVEMENTS</div>
          <h2>All Certificates</h2>
        </ScrollReveal>

        <div className="cert-hacker-grid">
          {CERTS.map((cert) => (
            <ScrollReveal key={cert.id}>
              <CertCard cert={cert} />
            </ScrollReveal>
          ))}
        </div>

        <div style={{ height: 60 }} />
      </div>
    </section>
  );
}