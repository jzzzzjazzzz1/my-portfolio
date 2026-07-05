import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_i5hhndh";   // ← paste yours
const TEMPLATE_ID = "template_eyjuwtd"; // ← paste yours
const PUBLIC_KEY  = "ORiaT2NnKw-DshuhN";  // ← paste yours

export default function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

 return (
  <div style={{ display: "grid", gap: 0 }}>
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <div className="input-hacker-wrap">
        <span className="input-hacker-label">name://</span>
        <input
          className="input"
          name="from_name"
          placeholder="your_name"
          required
        />
      </div>
      <div className="input-hacker-wrap">
        <span className="input-hacker-label">email://</span>
        <input
          className="input"
          name="from_email"
          type="email"
          placeholder="your@email.com"
          required
        />
      </div>
      <div className="input-hacker-wrap">
        <span className="input-hacker-label">message://</span>
        <textarea
          className="input"
          name="message"
          rows="5"
          placeholder="your_message_here..."
          required
        />
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={status === "sending"}
        style={{ opacity: status === "sending" ? 0.7 : 1 }}
      >
        {status === "sending" ? "[ SENDING... ]" : "[ SEND_MESSAGE.exe ]"}
      </button>

      {status === "success" && (
        <div style={{
          color: "rgba(34,197,94,0.95)",
          fontSize: 13,
          textAlign: "center",
          fontFamily: "ui-monospace, monospace",
          padding: "10px",
          border: "1px solid rgba(34,197,94,0.25)",
          borderRadius: 10,
          background: "rgba(34,197,94,0.06)"
        }}>
          ✓ MESSAGE_SENT — I&apos;ll get back to you soon.
        </div>
      )}
      {status === "error" && (
        <div style={{
          color: "rgba(239,68,68,0.95)",
          fontSize: 13,
          textAlign: "center",
          fontFamily: "ui-monospace, monospace",
          padding: "10px",
          border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: 10,
          background: "rgba(239,68,68,0.06)"
        }}>
          ERROR — please email me directly.
        </div>
      )}
    </form>
  </div>
);
}