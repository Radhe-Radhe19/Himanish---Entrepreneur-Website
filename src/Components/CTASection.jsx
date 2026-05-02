"use client";

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const rect = bgRef.current.parentElement.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      bgRef.current.style.transform = `translateY(${progress * 60}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="cta"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        minHeight: "520px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        .cta-bg {
          position: absolute;
          inset: -15%;
          width: 100%;
          height: 130%;
          object-fit: cover;
          object-position: center 30%;
          filter: brightness(0.2) saturate(0.5);
          will-change: transform;
        }
        .cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.82) 60%, rgba(0,0,0,0.9) 100%);
        }
        .cta-inner {
          position: relative;
          z-index: 10;
          max-width: 860px;
          margin: 0 auto;
          padding: 100px 48px;
          text-align: center;
          width: 100%;
        }
        @media (max-width: 768px) {
          .cta-inner { padding: 80px 24px; }
        }
        .cta-label {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #a3e635;
          margin-bottom: 20px;
          display: block;
        }
        .cta-divider {
          width: 40px;
          height: 2px;
          background: #a3e635;
          margin: 0 auto 24px;
        }
        .cta-quote {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 900;
          font-size: clamp(1.8rem, 4vw, 3.2rem);
          line-height: 1.15;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin-bottom: 10px;
        }
        .cta-quote span { color: #a3e635; }
        .cta-attr {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.78rem;
          color: #444;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 48px;
          display: block;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #a3e635;
          color: #000;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 16px 36px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cta-btn:hover {
          background: #bef264;
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(163,230,53,0.25);
        }
        .cta-sub {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.75rem;
          color: #444;
          margin-top: 16px;
          display: block;
        }
      `}</style>

      <img
        ref={bgRef}
        src="/image4.jpg"
        alt=""
        className="cta-bg"
        aria-hidden="true"
      />
      <div className="cta-overlay" />

      <div className="cta-inner">
        <span className="cta-label" data-aos="fade-up">Ready for Change?</span>
        <div className="cta-divider" data-aos="fade-up" data-aos-delay="50" />
        <h2 className="cta-quote" data-aos="fade-up" data-aos-delay="100">
          "The people who change India{" "}
          <span>won't wait for the right moment."</span>
        </h2>
        <span className="cta-attr" data-aos="fade-up" data-aos-delay="140">
          — Himanish Bhattacharya
        </span>
        <div data-aos="fade-up" data-aos-delay="180">
          <Link
            to="/contact"
            className="cta-btn"
            id="cta-consultation-btn"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book a Consultation
          </Link>
          <span className="cta-sub">Free 30-min call · No obligations</span>
        </div>
      </div>
    </section>
  );
}
