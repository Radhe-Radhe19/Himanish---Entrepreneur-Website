"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EVENTS = [
  {
    id: 1,
    title: "JECRC Entrepreneurship Session",
    location: "Mumbai, India",
    audience: "2,000+",
    topic: "The Entrepreneurial Mindset",
    image: "/Audience.png",
    tag: "Keynote",
  },
  {
    id: 2,
    title: "Startup India — Annual Awards Ceremony",
    location: "Bengaluru, India",
    audience: "800+",
    topic: "Building Ventures That Last",
    image: "/image4.jpg",
    tag: "Panel",
  },
];

export default function KeynoteSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="keynote"
      style={{ width: "100%", background: "#000", padding: "100px 0" }}
    >
      <style>{`
        .kn-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }
        @media (max-width: 768px) {
          .kn-wrap { padding: 0 24px; }
        }

        .kn-heading {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 4vw, 3rem);
          color: #fff;
          margin-bottom: 12px;
        }
        .kn-heading span { color: #a3e635; }

        .kn-eyebrow {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          color: #404040;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .kn-subtitle {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.9rem;
          color: #555;
          line-height: 1.75;
          max-width: 520px;
          margin-bottom: 40px;
        }

        .kn-tabs {
          display: flex;
          border-bottom: 1px solid #111;
          margin-bottom: 32px;
          overflow-x: auto;
          gap: 0;
        }
        .kn-tab {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #444;
          padding: 10px 22px;
          border: none;
          border-bottom: 2px solid transparent;
          background: transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .kn-tab.active {
          color: #a3e635;
          border-bottom-color: #a3e635;
        }
        .kn-tab:hover:not(.active) { color: #888; }

        .kn-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #080808;
          border: 1px solid #111;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .kn-content { grid-template-columns: 1fr; }
        }

        .kn-image-col {
          position: relative;
          height: 380px;
          overflow: hidden;
          background: #0a0a0a;
        }
        @media (max-width: 768px) {
          .kn-image-col { height: 240px; }
        }

        .kn-image-col img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          display: block;
          filter: brightness(0.85);
          transition: transform 0.5s ease;
        }
        .kn-image-col:hover img {
          transform: scale(1.04);
        }

        .kn-image-col::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 60%);
        }

        .kn-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 2;
          background: #a3e635;
          color: #000;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 800;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 5px 12px;
        }

        .kn-details-col {
          padding: 40px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .kn-details-col { padding: 28px 24px; }
        }

        .kn-loc {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.62rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #444;
          margin-bottom: 10px;
        }

        .kn-title {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 900;
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          color: #fff;
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .kn-topic {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.85rem;
          color: #555;
          font-style: italic;
          margin-bottom: 28px;
        }

        .kn-stats {
          display: flex;
          gap: 32px;
          margin-bottom: 32px;
        }

        .kn-stat-num {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 900;
          font-size: 1.5rem;
          color: #a3e635;
          line-height: 1;
          margin-bottom: 4px;
        }
        .kn-stat-label {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #444;
        }

        .kn-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a3e635;
          text-decoration: none;
          border-bottom: 1.5px solid #a3e635;
          padding-bottom: 2px;
          width: fit-content;
          transition: gap 0.2s ease, opacity 0.2s ease;
        }
        .kn-cta:hover { gap: 14px; opacity: 0.75; }

        .kn-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 24px;
        }
        .kn-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #1a1a1a;
          cursor: pointer;
          border: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .kn-dot.active {
          background: #a3e635;
          transform: scale(1.25);
        }
      `}</style>

      <div className="kn-wrap">
        {/* Header */}
        <div data-aos="fade-up">
          <p className="kn-eyebrow">On Stage</p>
          <h2 className="kn-heading">
            Keynote &amp; <span>Speaking</span>
          </h2>
          <p className="kn-subtitle">
            From national summits to college auditoriums — every stage is an opportunity to spark transformation.
          </p>
        </div>

        {/* Tabs */}
        <div className="kn-tabs" data-aos="fade-up" data-aos-delay="60">
          {EVENTS.map((ev, i) => (
            <button
              key={i}
              className={`kn-tab ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              {ev.tag === "Keynote" ? "Visionary Keynotes" : "Industry Insights Panels"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div data-aos="fade-up" data-aos-delay="100">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="kn-content"
            >
              {/* Image */}
              <div className="kn-image-col">
                <img
                  src={EVENTS[active].image}
                  alt={`${EVENTS[active].title} — Himanish Bhattacharya speaking`}
                />
                <span className="kn-badge">{EVENTS[active].tag}</span>
              </div>

              {/* Details */}
              <div className="kn-details-col">
                <p className="kn-loc">{EVENTS[active].location}</p>
                <h3 className="kn-title">{EVENTS[active].title}</h3>
                <p className="kn-topic">Topic: "{EVENTS[active].topic}"</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="kn-dots">
          {EVENTS.map((_, i) => (
            <button
              key={i}
              className={`kn-dot ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Event ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
