"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "919999999999"; // replace with real number
const EMAIL_ADDRESS   = "himanishbhattacharya@email.com";

export const ContactPage = () => {
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setCollapsed(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  });

  const waMessage = encodeURIComponent("Hi Himanish! I'd like to connect with you.");
  const waLink    = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", position: "relative", overflowX: "hidden" }}>

      <style>{`
        @keyframes lineGlow {
          0%,100% { opacity: 0.25; }
          50%      { opacity: 0.7;  }
        }
        @keyframes waPulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); }
          70%  { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }

        .cp-vline {
          position: fixed; left: 32px; top: 15%; bottom: 10%;
          width: 1.5px;
          background: linear-gradient(to bottom, transparent 0%, #a3e635 20%, #a3e635 80%, transparent 100%);
          animation: lineGlow 4s ease-in-out infinite;
          pointer-events: none; z-index: 0;
        }

        .cp-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Proxima Nova', sans-serif; font-weight: 700;
          font-size: 0.66rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); text-decoration: none;
          transition: color 0.2s;
        }
        .cp-back:hover { color: #a3e635; }

        .cp-rule {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.06);
          border: none; margin: 0;
        }

        /* Form */
        .cp-label {
          display: block;
          font-family: 'Proxima Nova', sans-serif; font-weight: 700;
          font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-bottom: 8px;
        }
        .cp-input {
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          font-family: 'Proxima Nova', sans-serif; font-size: 0.88rem;
          padding: 13px 15px; outline: none;
          transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
        }
        .cp-input::placeholder { color: rgba(255,255,255,0.16); }
        .cp-input:focus {
          border-color: rgba(163,230,53,0.4);
          background: rgba(163,230,53,0.02);
        }
        textarea.cp-input { resize: vertical; min-height: 120px; line-height: 1.7; }

        .cp-submit {
          width: 100%;
          background: #a3e635; color: #000;
          font-family: 'Proxima Nova', sans-serif; font-weight: 800;
          font-size: 0.76rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 15px 24px; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
        }
        .cp-submit:hover {
          background: #bef264;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(163,230,53,0.2);
        }

        /* Contact info row */
        .cp-detail {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cp-detail:last-of-type { border-bottom: none; }
        .cp-detail-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(163,230,53,0.06);
          border: 1px solid rgba(163,230,53,0.14);
          color: #a3e635;
        }
        .cp-detail-label {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.56rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.2); margin-bottom: 3px;
        }
        .cp-detail-val {
          font-family: 'Proxima Nova', sans-serif; font-weight: 700;
          font-size: 0.85rem; color: rgba(255,255,255,0.65);
          text-decoration: none; transition: color 0.2s;
        }
        .cp-detail-val:hover { color: #a3e635; }

        /* WhatsApp inline button */
        .wa-inline {
          width: 100%; box-sizing: border-box;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 13px 24px;
          background: rgba(37,211,102,0.05);
          border: 1px solid rgba(37,211,102,0.18);
          color: #25D366;
          font-family: 'Proxima Nova', sans-serif; font-weight: 800;
          font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .wa-inline:hover {
          background: rgba(37,211,102,0.1);
          border-color: rgba(37,211,102,0.38);
        }

        /* WhatsApp FAB */
        .wa-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 1000;
          display: flex; align-items: center; gap: 9px;
          background: #25D366; color: #fff;
          font-family: 'Proxima Nova', sans-serif; font-weight: 800;
          font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none;
          padding: 13px 20px 13px 16px;
          border-radius: 50px;
          box-shadow: 0 4px 24px rgba(37,211,102,0.3);
          animation: waPulse 2.5s ease infinite;
          transition: transform 0.2s, padding 0.3s, border-radius 0.3s;
          overflow: hidden;
        }
        .wa-fab:hover { transform: translateY(-3px); }
        .wa-fab.small {
          padding: 14px;
          border-radius: 50%;
        }
        .wa-fab.small .wa-fab-label { display: none; }

        /* Two-column layout */
        .cp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .cp-vline { display: none; }
          .cp-wrap { padding: 80px 20px 100px !important; }
          .cp-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .wa-fab { bottom: 20px; right: 20px; }
        }
        @media (max-width: 480px) {
          .cp-wrap { padding: 70px 16px 100px !important; }
        }
      `}</style>

      {/* Vertical accent line */}
      <div className="cp-vline" />

      {/* Page wrap */}
      <div className="cp-wrap" style={{
        position: "relative", zIndex: 2,
        maxWidth: "880px", margin: "0 auto",
        padding: "100px 40px 100px",
      }}>

        {/* Back */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: "44px" }}>
          <Link to="/" className="cp-back">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </Link>
        </motion.div>

        {/* Heading */}
        <motion.p {...fadeUp(0.06)} style={{
          fontFamily: "Proxima Nova, sans-serif", fontSize: "0.58rem",
          letterSpacing: "0.35em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)", marginBottom: "10px",
        }}>
          Get in Touch
        </motion.p>

        <motion.h1 {...fadeUp(0.12)} style={{
          fontFamily: "Proxima Nova, sans-serif", fontWeight: 900,
          fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
          color: "#fff", lineHeight: 1.0, letterSpacing: "-0.03em",
          marginBottom: "14px",
        }}>
          Let's <span style={{ color: "#a3e635" }}>Connect.</span>
        </motion.h1>

        <motion.p {...fadeUp(0.18)} style={{
          fontFamily: "Proxima Nova, sans-serif",
          fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
          color: "rgba(255,255,255,0.32)", lineHeight: 1.8,
          maxWidth: "440px", marginBottom: "40px",
        }}>
          Book a session, explore a collaboration, or just say hello.
          Fill the form or reach out directly below.
        </motion.p>

        <motion.hr {...fadeUp(0.22)} className="cp-rule" style={{ marginBottom: "44px" }} />

        {/* Two column grid */}
        <div className="cp-grid">

          {/* LEFT — Form */}
          <motion.div {...fadeUp(0.28)} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label className="cp-label">Name</label>
                <input
                  required className="cp-input" placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>

              <div>
                <label className="cp-label">Email</label>
                <input
                  required type="email" className="cp-input" placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>

              <div>
                <label className="cp-label">Message</label>
                <textarea
                  required className="cp-input"
                  placeholder="What would you like to discuss?"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>

              <button type="submit" className="cp-submit">
                Send Message
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>

            {/* WhatsApp inline */}
            <a href={waLink} target="_blank" rel="noreferrer" className="wa-inline">
              <WaIcon size={16} />
              Chat on WhatsApp
            </a>

          </motion.div>

          {/* RIGHT — Contact details */}
          <motion.div {...fadeUp(0.36)}>

            <p style={{
              fontFamily: "Proxima Nova, sans-serif", fontWeight: 800,
              fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: "#a3e635", marginBottom: "6px",
            }}>
              Contact Details
            </p>

            {/* Email */}
            <div className="cp-detail">
              <div className="cp-detail-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p className="cp-detail-label">Email</p>
                <a href={`mailto:${EMAIL_ADDRESS}`} className="cp-detail-val">{EMAIL_ADDRESS}</a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="cp-detail">
              <div className="cp-detail-icon">
                <WaIcon size={16} />
              </div>
              <div>
                <p className="cp-detail-label">WhatsApp</p>
                <a href={waLink} target="_blank" rel="noreferrer" className="cp-detail-val">
                  +91 99999 99999
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="cp-detail">
              <div className="cp-detail-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="cp-detail-label">Location</p>
                <span className="cp-detail-val" style={{ cursor: "default" }}>Mumbai, India</span>
              </div>
            </div>

            {/* Response time */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              marginTop: "24px", padding: "14px 16px",
              background: "rgba(163,230,53,0.03)",
              border: "1px solid rgba(163,230,53,0.1)",
            }}>
              <div style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "#a3e635", flexShrink: 0,
                boxShadow: "0 0 7px rgba(163,230,53,0.7)",
              }} />
              <p style={{
                fontFamily: "Proxima Nova, sans-serif", fontSize: "0.72rem",
                color: "rgba(255,255,255,0.3)", lineHeight: 1.5,
              }}>
                Responds within <strong style={{ color: "rgba(255,255,255,0.55)" }}>4–6 hours</strong> on weekdays
              </p>
            </div>

          </motion.div>
        </div>

      </div>

      {/* WhatsApp FAB */}
      <motion.a
        href={waLink} target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className={`wa-fab${collapsed ? " small" : ""}`}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
      >
        <WaIcon size={19} />
        <span className="wa-fab-label">WhatsApp</span>
      </motion.a>

    </div>
  );
};

function WaIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

export default ContactPage;