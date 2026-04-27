"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

/* ── Intersection observer fade-in ─────────────────────────────── */
function FadeIn({ children, delay = 0, y = 28, threshold = 0.15 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ── Counter Component ─────────────────────────────────────────── */
function StatCounter({ value, suffix, label }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        const numeric = parseInt(value.replace(/\D/g, ""));
        const duration = 1800;
        const steps = 60;
        const increment = numeric / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= numeric) { setCount(numeric); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started, value]);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <p style={{
        fontFamily: "Proxima Nova, sans-serif", fontWeight: 900,
        fontSize: "clamp(2.5rem, 5vw, 3.8rem)", color: "#a3e635",
        lineHeight: 1, marginBottom: 6,
      }}>{count}{suffix}</p>
      <p style={{
        fontFamily: "Proxima Nova, sans-serif", fontWeight: 700,
        fontSize: "0.68rem", color: "#374151", textTransform: "uppercase",
        letterSpacing: "0.2em",
      }}>{label}</p>
    </div>
  );
}

/* ── Image placeholder ─────────────────────────────────────────── */
function ImgPlaceholder({ height = 300, label = "ADD IMAGE" }) {
  return (
    <div style={{
      width: "100%", height, background: "#0a0a0a",
      border: "1px dashed #1f1f1f", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 10,
    }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#252525" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span style={{ color: "#252525", fontSize: "0.55rem", fontFamily: 'Proxima Nova, sans-serif',
        letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   DATA — Seminars, Media Coverage, Projects, Achievements
   ═══════════════════════════════════════════════════════════════════ */

const SEMINARS = [
  {
    title: "Entrepreneurship Summit 2024",
    venue: "IIT Bombay",
    date: "March 2024",
    audience: "3,000+",
    topic: "Building a Personal Brand in the Digital Age",
    type: "Keynote",
  },
  {
    title: "TEDx Speak Series",
    venue: "TEDx Kolkata",
    date: "January 2024",
    audience: "1,500+",
    topic: "The Power of Authentic Storytelling",
    type: "Speaker",
  },
  {
    title: "National Youth Congress",
    venue: "Delhi Convention Centre",
    date: "November 2023",
    audience: "5,000+",
    topic: "Resilience — Failing Forward",
    type: "Keynote",
  },
  {
    title: "Startup India Conclave",
    venue: "Bengaluru Tech Park",
    date: "August 2023",
    audience: "2,200+",
    topic: "From Zero to One — The Founder's Journey",
    type: "Panel Lead",
  }
];

const MEDIA_COVERAGE = [
  { outlet: "The Times of India", type: "Newspaper", description: "Feature on emerging young entrepreneurs redefining Indian content creation", year: "2024" },
  { outlet: "NDTV", type: "Television", description: "Panel discussion on the future of digital entrepreneurship in India", year: "2024" },
  { outlet: "Hindustan Times", type: "Newspaper", description: "Profile piece — 'The 25-year-old building a media empire from scratch'", year: "2023" },
  { outlet: "Republic TV", type: "Television", description: "Guest speaker on youth leadership and self-made success stories", year: "2023" },
 ];

const PROJECTS = [
  {
    name: "Corpift",
    role: "Founder & Creative Director",
    description: "A corporate gifting company that helps businesses build meaningful connections with their employees and clients through thoughtful, personalized gifts.",
    status: "Active",
    year: "2022 — Present",
  }
];

const ACHIEVEMENTS = [
  { title: "200+ Stages Across India", description: "Delivered keynotes and talks at over 200 stages spanning corporate events, college fests, national summits, and cultural celebrations.", icon: "🎤" },
  { title: "50,000+ Lives Impacted", description: "Directly reached and inspired over 50,000 people through live events, workshops, and mentoring sessions across 12+ states.", icon: "🌟" },
  { title: "National Media Recognition", description: "Featured in Times of India, NDTV, India Today, and other leading publications as a rising voice in Indian entrepreneurship.", icon: "📰" },
  { title: "TEDx Speaker", description: "Invited speaker at TEDx events, sharing ideas on authentic storytelling and the entrepreneurial mindset with global audiences.", icon: "🔴" },
  { title: "10+ Years of Impact", description: "Over a decade of consistent work in entrepreneurship, media, and content creation — building, failing, learning, and growing.", icon: "⏳" },
  { title: "BNI Leader & Networker", description: "Active leader in Business Network International, helping entrepreneurs build meaningful connections and grow through referral-based marketing.", icon: "🤝" },
  { title: "Multiple Ventures Built", description: "Founded and scaled multiple creative ventures across media, education, and digital content — each rooted in purpose over profit.", icon: "🚀" },
  { title: "Pan-India College Tours", description: "Toured 12+ colleges annually, inspiring thousands of students to pursue entrepreneurship, personal branding, and self-leadership.", icon: "🎓" },
];


/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function MediaPage() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const S = {
    eyebrow: {
      fontFamily: "Proxima Nova, sans-serif", fontWeight: 700,
      fontSize: "0.68rem", letterSpacing: "0.25em", color: "#2d2d2d",
      textTransform: "uppercase", marginBottom: 14,
    },
    h2: {
      fontFamily: "Proxima Nova, sans-serif", fontWeight: 900,
      textTransform: "uppercase", lineHeight: 0.95,
      letterSpacing: "-0.01em", margin: 0,
    },
    body: { fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.8, fontFamily: 'Proxima Nova, sans-serif' },
    lime: { color: "#a3e635" },
    divider: { width: "100%", height: 1, background: "#111", margin: "0" },
  };

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #a3e635; color: #000; }

        /* Seminar card hover */
        .seminar-card {
          background: #050505;
          border: 1px solid #111;
          padding: 32px 28px;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .seminar-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 0;
          background: #a3e635;
          transition: height 0.4s ease;
        }
        .seminar-card:hover {
          border-color: rgba(163,230,53,0.2);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(163,230,53,0.06);
        }
        .seminar-card:hover::before { height: 100%; }

        /* Media coverage card */
        .media-card {
          background: #000;
          padding: 24px 28px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          border-bottom: 1px solid #0f0f0f;
          transition: background 0.3s ease, padding-left 0.3s ease;
        }
        .media-card:hover {
          background: #050505;
          padding-left: 36px;
        }
        .media-card:last-child { border-bottom: none; }

        /* Project card */
        .project-card {
          background: #050505;
          border: 1px solid #0f0f0f;
          padding: 36px 32px;
          position: relative;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .project-card:hover {
          border-color: rgba(163,230,53,0.15);
          transform: translateY(-3px);
        }

        /* Achievement card */
        .achievement-card {
          background: #000;
          padding: 28px 24px;
          border: 1px solid #0a0a0a;
          transition: border-color 0.3s ease, background 0.3s ease;
          text-align: center;
        }
        .achievement-card:hover {
          border-color: #151515;
          background: #040404;
        }

        /* Gallery grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .gallery-item {
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .gallery-item::after {
          content: '';
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gallery-item:hover::after { opacity: 1; }

        /* Media type badge */
        .media-badge {
          display: inline-block;
          padding: 3px 10px;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: 1px solid;
        }
        .media-badge--newspaper { color: #a3e635; border-color: rgba(163,230,53,0.3); }
        .media-badge--television { color: #60a5fa; border-color: rgba(96,165,250,0.3); }
        .media-badge--magazine { color: #f472b6; border-color: rgba(244,114,182,0.3); }

        /* Status badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: rgba(163,230,53,0.08);
          color: #a3e635;
          border: 1px solid rgba(163,230,53,0.15);
        }
        .status-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #a3e635;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Seminar type badge */
        .type-badge {
          display: inline-block;
          padding: 3px 10px;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a3e635;
          background: rgba(163,230,53,0.06);
          border: 1px solid rgba(163,230,53,0.12);
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: isMobile ? "100px 20px 60px" : "0 8vw",
        position: "relative", overflow: "hidden",
      }}>
        {/* Large decorative background character */}
        <div style={{
          position: "absolute", right: isMobile ? -20 : "5vw", top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "Proxima Nova, sans-serif", fontWeight: 900,
          fontSize: isMobile ? "30vw" : "22vw",
          color: "#080808", lineHeight: 1, userSelect: "none", pointerEvents: "none",
          zIndex: 0,
        }}>
          ◆
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <FadeIn delay={0}>
            <p style={S.eyebrow}>Media & Press</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{
              ...S.h2,
              fontSize: isMobile ? "clamp(2.8rem, 13vw, 4.5rem)" : "clamp(4rem, 7vw, 7rem)",
              marginBottom: 32,
            }}>
              In The<br />
              <span style={S.lime}>Spotlight.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ ...S.body, maxWidth: 560, fontSize: "1.05rem" }}>
              From keynote stages to national press coverage, from building impactful
              projects to earning recognition across industries — this is where the work
              speaks for itself.
            </p>
          </FadeIn>
        </div>
      </section>

      <div style={S.divider} />

      {/* ═══════════════════════════════════════════════════════════════
          2. STATS BAR
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "60px 20px" : "80px 8vw", background: "#030303" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: isMobile ? "40px 24px" : 0,
            }}>
              {[
                { value: "200", suffix: "+", label: "Events & Seminars" },
                { value: "50", suffix: "K+", label: "People Reached" },
                { value: "15", suffix: "+", label: "Media Features" },
                { value: "5", suffix: "+", label: "Active Projects" },
              ].map((stat, i) => (
                <div key={i} style={{
                  borderLeft: i > 0 && !isMobile ? "1px solid #111" : "none",
                  padding: isMobile ? 0 : "0 40px",
                }}>
                  <StatCounter {...stat} />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div style={S.divider} />

      {/* ═══════════════════════════════════════════════════════════════
          3. SEMINARS & EVENTS
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "72px 20px" : "100px 8vw" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <p style={S.eyebrow}>Seminars & Events</p>
            <h2 style={{
              ...S.h2,
              fontSize: isMobile ? "clamp(2.4rem, 10vw, 3.5rem)" : "clamp(2.5rem, 4vw, 4rem)",
              marginBottom: 20,
            }}>
              Stages that<br />
              <span style={S.lime}>changed rooms.</span>
            </h2>
            <p style={{ ...S.body, maxWidth: 560, marginBottom: 60 }}>
              Every stage is a conversation with a room full of people who came looking
              for direction. These are some of the events where that conversation happened.
            </p>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: 16,
          }}>
            {SEMINARS.map((seminar, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="seminar-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                    <span className="type-badge">{seminar.type}</span>
                    <span style={{
                      fontFamily: "Proxima Nova, sans-serif", fontWeight: 700,
                      fontSize: "0.62rem", color: "#333", letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}>{seminar.date}</span>
                  </div>
                  <h3 style={{
                    fontFamily: "Proxima Nova, sans-serif", fontWeight: 900,
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "#fff",
                    textTransform: "uppercase", letterSpacing: "0.02em",
                    marginBottom: 8, lineHeight: 1.15,
                  }}>{seminar.title}</h3>
                  <p style={{
                    fontFamily: "Proxima Nova, sans-serif", fontWeight: 700,
                    fontSize: "0.7rem", color: "#a3e635", textTransform: "uppercase",
                    letterSpacing: "0.18em", marginBottom: 14,
                  }}>{seminar.venue}</p>
                  <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.6, fontFamily: 'Proxima Nova, sans-serif', marginBottom: 16 }}>
                    {seminar.topic}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span style={{
                      fontFamily: "Proxima Nova, sans-serif", fontWeight: 700,
                      fontSize: "0.65rem", color: "#333", letterSpacing: "0.1em",
                    }}>{seminar.audience} AUDIENCE</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div style={S.divider} />

      {/* ═══════════════════════════════════════════════════════════════
          4. MEDIA COVERAGE — Newspapers, TV, Magazines
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "72px 20px" : "100px 8vw", background: "#030303" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <p style={S.eyebrow}>Press & Coverage</p>
            <h2 style={{
              ...S.h2,
              fontSize: isMobile ? "clamp(2.4rem, 10vw, 3.5rem)" : "clamp(2.5rem, 4vw, 4rem)",
              marginBottom: 20,
            }}>
              Making<br />
              <span style={S.lime}>headlines.</span>
            </h2>
            <p style={{ ...S.body, maxWidth: 560, marginBottom: 60 }}>
              When the work is authentic, the press takes notice. Featured in leading
              newspapers, television channels, and magazines across India.
            </p>
          </FadeIn>

          <div style={{ border: "1px solid #0f0f0f", overflow: "hidden" }}>
            {MEDIA_COVERAGE.map((media, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="media-card">
                  <div style={{ flexShrink: 0, paddingTop: 2 }}>
                    <span className={`media-badge media-badge--${media.type.toLowerCase()}`}>
                      {media.type}
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                      <h3 style={{
                        fontFamily: "Proxima Nova, sans-serif", fontWeight: 900,
                        fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: "#fff",
                        textTransform: "uppercase", letterSpacing: "0.03em",
                      }}>{media.outlet}</h3>
                      <span style={{
                        fontFamily: "Proxima Nova, sans-serif", fontWeight: 700,
                        fontSize: "0.6rem", color: "#2a2a2a", letterSpacing: "0.15em",
                      }}>{media.year}</span>
                    </div>
                    <p style={{
                      fontSize: "0.85rem", color: "#555", lineHeight: 1.6,
                      fontFamily: 'Proxima Nova, sans-serif',
                    }}>{media.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div style={S.divider} />

      {/* ═══════════════════════════════════════════════════════════════
          5. PROJECTS & VENTURES
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "72px 20px" : "100px 8vw" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <p style={S.eyebrow}>Projects & Ventures</p>
            <h2 style={{
              ...S.h2,
              fontSize: isMobile ? "clamp(2.4rem, 10vw, 3.5rem)" : "clamp(2.5rem, 4vw, 4rem)",
              marginBottom: 20,
            }}>
              Built with<br />
              <span style={S.lime}>intention.</span>
            </h2>
            <p style={{ ...S.body, maxWidth: 560, marginBottom: 60 }}>
              Every project is a reflection of the belief that real impact comes from
              building things that serve others — not just yourself.
            </p>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: 16,
          }}>
            {PROJECTS.map((project, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="project-card">
                  {/* Top row — status and year */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
                    <span className="status-badge">
                      <span className="status-dot" />
                      {project.status}
                    </span>
                    <span style={{
                      fontFamily: "Proxima Nova, sans-serif", fontWeight: 700,
                      fontSize: "0.6rem", color: "#2a2a2a", letterSpacing: "0.12em",
                    }}>{project.year}</span>
                  </div>

                  <h3 style={{
                    fontFamily: "Proxima Nova, sans-serif", fontWeight: 900,
                    fontSize: "clamp(1.3rem, 2.5vw, 1.65rem)", color: "#fff",
                    textTransform: "uppercase", letterSpacing: "0.02em",
                    marginBottom: 6, lineHeight: 1.1,
                  }}>{project.name}</h3>
                  <p style={{
                    fontFamily: "Proxima Nova, sans-serif", fontWeight: 700,
                    fontSize: "0.68rem", color: "#a3e635", textTransform: "uppercase",
                    letterSpacing: "0.2em", marginBottom: 16,
                  }}>{project.role}</p>

                  <div style={{ width: 28, height: 2, background: "#a3e635", marginBottom: 16 }} />

                  <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.75, fontFamily: 'Proxima Nova, sans-serif' }}>
                    {project.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div style={S.divider} />

      {/* ═══════════════════════════════════════════════════════════════
          7. GALLERY
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "72px 20px" : "100px 8vw" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <p style={S.eyebrow}>Gallery</p>
            <h2 style={{
              ...S.h2,
              fontSize: isMobile ? "clamp(2.4rem, 10vw, 3.5rem)" : "clamp(2.5rem, 4vw, 4rem)",
              marginBottom: 60,
            }}>
              Moments<br />
              <span style={S.lime}>captured.</span>
            </h2>
          </FadeIn>

          <div className="gallery-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="gallery-item">
                  <ImgPlaceholder height={isMobile ? 180 : 280} label={`Event Photo ${i + 1}`} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div style={S.divider} />

      {/* ═══════════════════════════════════════════════════════════════
          8. PULL QUOTE
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "80px 20px" : "120px 8vw", background: "#030303" }}>
        <FadeIn threshold={0.2}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <p style={{
              fontFamily: "Proxima Nova, sans-serif", fontWeight: 900,
              fontSize: isMobile ? "clamp(1.8rem, 8vw, 2.8rem)" : "clamp(2.5rem, 4vw, 4rem)",
              textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-0.01em",
              color: "#fff",
            }}>
              "The stage doesn't make<br />
              the speaker.<br />
              <span style={S.lime}>The truth does."</span>
            </p>
            <p style={{
              fontFamily: "Proxima Nova, sans-serif", fontWeight: 700,
              fontSize: "0.7rem", color: "#374151", letterSpacing: "0.2em",
              textTransform: "uppercase", marginTop: 24,
            }}>
              — Himanish Bhattacharya
            </p>
          </div>
        </FadeIn>
      </section>

      <div style={S.divider} />

      {/* ═══════════════════════════════════════════════════════════════
          9. CTA — BOOKING & COLLABORATION
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "80px 20px" : "120px 8vw" }}>
        <FadeIn>
          <div style={{
            maxWidth: 1080, margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 48 : 80,
            alignItems: "center",
          }}>
            <div>
              <p style={S.eyebrow}>Collaborate</p>
              <h2 style={{
                ...S.h2,
                fontSize: isMobile ? "clamp(2.4rem, 10vw, 3.5rem)" : "clamp(2.5rem, 4vw, 4rem)",
                marginBottom: 20,
              }}>
                Want this<br />
                <span style={S.lime}>energy on<br />your stage?</span>
              </h2>
              <p style={{ ...S.body, marginBottom: 36 }}>
                Whether it's a keynote that transforms a room, media collaboration
                that amplifies your mission, or a partnership built on authenticity
                — let's make it happen.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href="mailto:himanishbhattacharya@email.com"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    background: "#a3e635", color: "#000",
                    fontFamily: "Proxima Nova, sans-serif",
                    fontWeight: 900, fontSize: "0.85rem",
                    textTransform: "uppercase", letterSpacing: "0.12em",
                    padding: "14px 28px", textDecoration: "none",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#bef264"}
                  onMouseLeave={e => e.currentTarget.style.background = "#a3e635"}
                >
                  Book Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
                <Link
                  to="/story"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    background: "transparent", color: "#6b7280",
                    fontFamily: "Proxima Nova, sans-serif",
                    fontWeight: 900, fontSize: "0.85rem",
                    textTransform: "uppercase", letterSpacing: "0.12em",
                    padding: "14px 28px", textDecoration: "none",
                    border: "1px solid #1a1a1a",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#333"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.borderColor = "#1a1a1a"; }}
                >
                  Read Full Story
                </Link>
              </div>
            </div>

            {/* What's available */}
            <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "#111" }}>
              {[
                { label: "Keynote Speaking", desc: "Corporate events, colleges, summits & conferences" },
                { label: "Media Appearances", desc: "Television, podcasts, interviews & panel discussions" },
                { label: "Event Hosting", desc: "Award nights, product launches, national celebrations" },
                { label: "Brand Partnerships", desc: "Authentic collaborations aligned with impact and purpose" },
              ].map((offer, i) => (
                <div key={i} style={{
                  background: "#000", padding: "20px 24px",
                  display: "flex", alignItems: "center", gap: 20,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#a3e635", flexShrink: 0,
                  }} />
                  <div>
                    <p style={{
                      fontFamily: "Proxima Nova, sans-serif", fontWeight: 900,
                      fontSize: "0.9rem", color: "#fff", textTransform: "uppercase",
                      letterSpacing: "0.05em", marginBottom: 3,
                    }}>{offer.label}</p>
                    <p style={{
                      fontSize: "0.78rem", color: "#4b5563",
                      fontFamily: 'Proxima Nova, sans-serif',
                    }}>{offer.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
