import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal.jsx";

export const CERTS = [
  { id: 1, title: "APIsec Certified Practitioner", issuer: "APIsec University", date: "6/29/2026", badgeId: "e2af8114-e261-4a52-8e1a-3a68ba113145" },
  { id: 2, title: "Introduction to Cybersecurity", issuer: "Cisco", date: "6/29/2026", badgeId: "7570a07c-1631-43eb-a36a-165dcdd13e3c" },
  { id: 3, title: "AWS Cloud Security Foundations", issuer: "Amazon Web Services", date: "3/26/2025", badgeId: "e9a999d3-9263-4a35-b2ad-b898b1021cd7" },
  { id: 4, title: "API Security Fundamentals '25", issuer: "APIsec University", date: "4/30/2026", badgeId: "e42f6ca5-4f95-4672-a2f4-34004aab5e6a" },
  { id: 5, title: "OWASP API Security Top 10", issuer: "APIsec University", date: "5/22/2026", badgeId: "0994800b-3243-425c-a749-8c5221fd7496" },
  { id: 6, title: "Securing API Servers", issuer: "APIsec University", date: "6/29/2026", badgeId: "141ecd34-4ed0-463f-a0fc-b5415a2f1e2b" },
  { id: 7, title: "AWS Cloud Architecting", issuer: "Amazon Web Services", date: "3/30/2025", badgeId: "7d1eb6fa-3215-444d-840f-0e165ec7d2b3" },
  { id: 8, title: "AWS Cloud Foundations", issuer: "Amazon Web Services", date: "3/24/2025", badgeId: "5244a28a-fc08-4cd4-a422-7f1039111a67" },
  { id: 9, title: "AWS Cloud Operations", issuer: "Amazon Web Services", date: "3/31/2025", badgeId: "34202a59-54cb-4aa2-8ad0-24358fc70e7f" },
  { id: 10, title: "API Documentation Best Practices", issuer: "APIsec University", date: "6/29/2026", badgeId: "117a717e-2075-4c08-91b6-fbcdfc429656" },
  { id: 11, title: "API Authentication", issuer: "APIsec University", date: "6/8/2026", badgeId: "9a5b8c4f-ccff-4185-ad7e-473e9ccb4a38" },
];

function credlyUrl(badgeId) {
  return "https://www.credly.com/badges/" + badgeId;
}

function certIcon(issuer) {
  if (issuer.includes("Cisco")) return "🌐";
  if (issuer.includes("Amazon") || issuer.includes("AWS")) return "☁️";
  if (issuer.includes("APIsec")) return "🔐";
  return "🏅";
}

export function useCredlyScript(deps = []) {
  useEffect(() => {
    const old = document.getElementById("credly-embed-script");
    if (old) old.remove();
    const script = document.createElement("script");
    script.id = "credly-embed-script";
    script.src = "//cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      const s = document.getElementById("credly-embed-script");
      if (s) s.remove();
    };
  }, deps);
}

export function CredlyBadge({ badgeId }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
      <div
        data-iframe-width="150"
        data-iframe-height="270"
        data-share-badge-id={badgeId}
        data-share-badge-host="https://www.credly.com"
      />
    </div>
  );
}

export default function Certificates() {
  const preview = CERTS.slice(0, 3);
  useCredlyScript([preview.length]);

  return (
    <section className="section" id="certificates">
      <div className="container">
        <ScrollReveal>
          <div className="kicker">ACHIEVEMENTS</div>
          <h2>Certificates</h2>
        </ScrollReveal>

        <div className="cert-hacker-grid">
          {preview.map((cert) => (
            <ScrollReveal key={cert.id}>
              <CertCard cert={cert} />
            </ScrollReveal>
          ))}
        </div>

        {CERTS.length > 3 && (
          <ScrollReveal>
 <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
  <Link to="/certificates" className="btn-hacker">
    View All {CERTS.length} Certificates
  </Link>
</div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

export function CertCard({ cert }) {
  return (
    <div className="cert-hacker-card">

      {/* TOP ROW — title + chevron */}
      <div className="cert-hacker-top">
        
        <div style={{ flex: 1 }}>
          <div className="cert-hacker-name">{cert.title}</div>
          <div className="cert-hacker-issuer">{cert.issuer}</div>
          <div className="cert-hacker-date">{cert.date}</div>
        </div>
        <svg className="cert-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>

      {/* DROPDOWN — shows on hover */}
      <div className="cert-hacker-drop">
        <CredlyBadge badgeId={cert.badgeId} />
        <div className="cert-hacker-footer">
          <span className="cert-verify-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            Verified
          </span>
          <a href={credlyUrl(cert.badgeId)} target="_blank" rel="noopener noreferrer" className="cert-hacker-arrow">
            View on Credly
          </a>
        </div>
      </div>

    </div>
  );
}