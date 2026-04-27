"use client";

import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const SERVICES = [
  {
    icon: <MicIcon fontSize="inherit" style={{ color: "#fff" }} />,
    title: "Motivational Speaking",
    desc: "High-energy keynotes that rewire mindsets — not just inspire. Tailored for corporate events, colleges, and startup summits.",
    tag: "Keynotes · Live Events",
    number: "01",
  },
  {
    icon: <RocketLaunchIcon fontSize="inherit" style={{ color: "#fff" }} />,
    title: "Startup Mentorship",
    desc: "Hands-on guidance for founders at every stage — from ideation to scale. Real talk on building in the Indian ecosystem.",
    tag: "1:1 Sessions · Cohorts",
    number: "02",
  },
  {
    icon: <TrackChangesIcon fontSize="inherit" style={{ color: "#fff" }} />,
    title: "Entrepreneurship Coaching",
    desc: "Structured programs that take aspiring entrepreneurs from mindset to business model, building sustainable success.",
    tag: "Programs · Frameworks",
    number: "03",
  },
  {
    icon: <AccountBalanceIcon fontSize="inherit" style={{ color: "#fff" }} />,
    title: "Workshops & Seminars",
    desc: "Interactive sessions for teams, institutions, and communities on leadership, personal branding, and creating impact.",
    tag: "Teams · Institutions",
    number: "04",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        width: "100%",
        background: "#050505",
        padding: "100px 0",
      }}
    >
      <style>{`
        .svc-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }
        @media (max-width: 768px) {
          .svc-container { padding: 0 24px; }
        }

        .svc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: #111;
          margin-top: 64px;
        }
        @media (max-width: 640px) {
          .svc-grid { grid-template-columns: 1fr; }
        }

        .svc-card {
          background: #050505;
          padding: 48px 40px;
          position: relative;
          transition: background 0.3s ease;
          cursor: default;
        }
        @media (max-width: 768px) {
          .svc-card { padding: 36px 24px; }
        }
        .svc-card:hover {
          background: #080808;
        }
        .svc-card:hover .svc-number {
          color: #111;
        }
        .svc-card:hover .svc-accent {
          width: 56px;
        }
        .svc-card:hover .svc-icon-wrap {
          border-color: rgba(163,230,53,0.3);
          background: rgba(163,230,53,0.05);
        }

        .svc-number {
          position: absolute;
          top: 24px;
          right: 28px;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 900;
          font-size: 2.5rem;
          color: #0d0d0d;
          line-height: 1;
          transition: color 0.3s ease;
          user-select: none;
        }

        .svc-icon-wrap {
          width: 52px;
          height: 52px;
          border: 1px solid #1a1a1a;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 20px;
          transition: border-color 0.3s ease, background 0.3s ease;
        }

        .svc-accent {
          width: 32px;
          height: 2px;
          background: #a3e635;
          margin-bottom: 16px;
          transition: width 0.3s ease;
        }

        .svc-title {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 800;
          font-size: 1.05rem;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .svc-desc {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.875rem;
          color: #6b7280;
          line-height: 1.75;
          margin-bottom: 20px;
        }

        .svc-tag {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a3e635;
        }

        .svc-heading {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 4vw, 3rem);
          color: #fff;
          line-height: 1.1;
        }
        .svc-eyebrow {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          color: #404040;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .svc-sub {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.75;
          max-width: 500px;
          margin-top: 16px;
        }

        .svc-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #a3e635;
          color: #000;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 14px 32px;
          text-decoration: none;
          margin-top: 48px;
          transition: background 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }
        .svc-cta-btn:hover {
          background: #bef264;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="svc-container">
        {/* Header */}
        <div data-aos="fade-up">
          <p className="svc-eyebrow">What I Offer</p>
          <h2 className="svc-heading">
            Services &amp; <span style={{ color: "#a3e635" }}>Offerings</span>
          </h2>
          <p className="svc-sub">
            Every offering is built around transformative outcomes — not just motivation.
          </p>
        </div>

        {/* Cards */}
        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="svc-card"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <span className="svc-number">{s.number}</span>
              <div className="svc-icon-wrap">{s.icon}</div>
              <div className="svc-accent" />
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <p className="svc-tag">{s.tag}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }} data-aos="fade-up">
          <a
            href="mailto:himanishbhattacharya@email.com"
            className="svc-cta-btn"
            id="services-cta-btn"
          >
            Enquire About a Service →
          </a>
        </div>
      </div>
    </section>
  );
}
