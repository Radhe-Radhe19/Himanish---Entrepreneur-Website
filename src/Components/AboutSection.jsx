"use client";

import React from "react";
import { Link } from "react-router-dom";

const HeroSnippet = () => {
  return (
    <section
      id="about-section"
      style={{
        width: "100%",
        background: "#000",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/gilroy-free');
        .about-name-gilroy {
          font-family: 'Gilroy', 'Montserrat', sans-serif !important;
          font-weight: 900;
          letter-spacing: -0.01em;
        }
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&display=swap');

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
          max-height: 700px;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            max-height: none;
          }
        }

        .about-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px;
        }
        @media (max-width: 768px) {
          .about-text-col { padding: 60px 24px; }
        }

        .about-headline {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 900;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          line-height: 1.05;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .about-eyebrow {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          color: #404040;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .about-image-col {
          position: relative;
          overflow: hidden;
          background: #0a0a0a;
        }
        @media (max-width: 768px) {
          .about-image-col { height: 50vw; min-height: 260px; max-height: 420px; }
        }

        .about-image-col img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: contrast(1.04) brightness(0.92);
          display: block;
        }

        .about-image-col::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, black 0%, rgba(0,0,0,0.3) 40%, transparent 70%);
          z-index: 1;
        }
        .about-image-col::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, black 0%, transparent 15%, transparent 85%, black 100%);
          z-index: 2;
        }

        .about-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a3e635;
          text-decoration: none;
          border-bottom: 1.5px solid #a3e635;
          padding-bottom: 2px;
          transition: gap 0.2s ease, opacity 0.2s ease;
          width: fit-content;
        }
        .about-cta-link:hover {
          gap: 14px;
          opacity: 0.8;
        }
      `}</style>

      <div className="about-grid">
        {/* LEFT: TEXT */}
        <div className="about-text-col">
          <p className="about-eyebrow">About</p>

          <h2 className="about-headline">
            <span className="about-name-gilroy" style={{ color: "#fff" }}>Himanish Bhattacharya —{" "}</span>
            <span style={{ color: "#a3e635" }}>Entrepreneur, Speaker, Mentor and Creator</span>
            <span style={{ color: "#fff" }}> redefining Indian content.</span>
          </h2>

          <p style={{
            fontFamily: "Proxima Nova, sans-serif",
            fontSize: "0.9rem",
            color: "#6b7280",
            lineHeight: 1.8,
            marginBottom: "32px",
            maxWidth: "460px",
          }}>
            A voice at the intersection of culture, entrepreneurship, and human expression —
            building a body of work that speaks to audiences hungry for authentic perspectives.
          </p>

          <Link to="/story" className="about-cta-link">
            Full Story
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>

        {/* RIGHT: PHOTO */}
        <div className="about-image-col">
          <img
            src="/image2.jpg"
            alt="Himanish Bhattacharya — professional portrait"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSnippet;
