"use client";

import React from "react";

const BRANDS = [
  { name: "TechVentures", abbr: "TV", color: "#3b82f6" },
  { name: "InnovateCo", abbr: "IC", color: "#8b5cf6" },
  { name: "StartupHub", abbr: "SH", color: "#ef4444" },
  { name: "FounderCircle", abbr: "FC", color: "#f59e0b" },
  { name: "MediaPlus", abbr: "MP", color: "#10b981" },
  { name: "EduFirst", abbr: "EF", color: "#06b6d4" },
  { name: "GrowthLab", abbr: "GL", color: "#a3e635" },
  { name: "RiseNetwork", abbr: "RN", color: "#f97316" },
];

export default function BrandsSection() {
  return (
    <section
      id="brands"
      style={{ width: "100%", background: "#000", padding: "80px 0" }}
    >
      <style>{`
        .brands-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }
        @media (max-width: 768px) {
          .brands-wrap { padding: 0 24px; }
        }

        .brands-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .brands-eyebrow {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          color: #333;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .brands-title {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 900;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          color: #fff;
          line-height: 1.1;
        }
        .brands-title span { color: #a3e635; }

        .brands-subtitle {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.875rem;
          color: #555;
          margin-top: 12px;
          line-height: 1.7;
        }

        .brands-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #111;
        }
        @media (max-width: 640px) {
          .brands-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .brand-item {
          background: #050505;
          padding: 32px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          cursor: default;
          transition: background 0.25s ease;
        }
        .brand-item:hover {
          background: #080808;
        }
        .brand-item:hover .brand-logo {
          transform: scale(1.08);
          opacity: 1;
        }

        .brand-logo {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
          opacity: 0.75;
        }

        .brand-abbr-text {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 900;
          font-size: 1.1rem;
          letter-spacing: 0.03em;
        }

        .brand-name-text {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.68rem;
          color: #444;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
          text-align: center;
        }

        .brands-footnote {
          text-align: center;
          margin-top: 28px;
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.65rem;
          color: #2a2a2a;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="brands-wrap">
        <div className="brands-header" data-aos="fade-up">
          <p className="brands-eyebrow">Associations</p>
          <h2 className="brands-title">
            Trusted by <span>Leading Brands</span>
          </h2>
          <p className="brands-subtitle">
            Partnering with organizations that value impact and authentic leadership.
          </p>
        </div>

        <div className="brands-grid" data-aos="fade-up" data-aos-delay="80">
          {BRANDS.map((brand, i) => (
            <div
              key={i}
              className="brand-item"
              role="img"
              aria-label={brand.name}
            >
              <div
                className="brand-logo"
                style={{
                  background: `${brand.color}14`,
                  border: `1px solid ${brand.color}28`,
                }}
              >
                <span
                  className="brand-abbr-text"
                  style={{ color: brand.color }}
                >
                  {brand.abbr}
                </span>
              </div>
              <span className="brand-name-text">{brand.name}</span>
            </div>
          ))}
        </div>

        <p className="brands-footnote" data-aos="fade-up">+ Many More Across Industries</p>
      </div>
    </section>
  );
}
