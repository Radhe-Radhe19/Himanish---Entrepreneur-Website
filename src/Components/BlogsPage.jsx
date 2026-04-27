"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────────
   BLOG DATA
───────────────────────────────────────────────────────────────── */
const BLOGS = [
  {
    id: "startup-zero-to-one",
    tag: "Startup Ecosystem",
    tagColor: "#a3e635",
    date: "March 12, 2025",
    readTime: "8 min read",
    title: "Zero to One: Why Most Indian Startups Die Before They Scale",
    excerpt:
      "The graveyard of Indian startups is filled with brilliant ideas that never found their second gear. After mentoring 200+ founders, I've identified the exact inflection point where ambition meets execution — and where most teams fall apart.",
    stats: [
      { num: "90%", label: "Fail Rate" },
      { num: "200+", label: "Founders" },
      { num: "3",    label: "Key Shifts" },
    ],
    accentLine: "The idea is never the problem. The architecture of execution is.",
    number: "01",
  },
  {
    id: "wealth-generation-india",
    tag: "Wealth Generation",
    tagColor: "#a3e635",
    date: "February 3, 2025",
    readTime: "11 min read",
    title: "The New Wealth Playbook: Building Generational Assets in a Distracted Economy",
    excerpt:
      "We live in an attention economy that rewards consumption, not creation. The ultra-wealthy aren't smarter — they've simply mastered a different set of rules. Here's the framework I use with high-net-worth clients to architect wealth that outlives them.",
    stats: [
      { num: "4X",   label: "Avg Return" },
      { num: "₹10Cr+", label: "Managed" },
      { num: "5",    label: "Pillars" },
    ],
    accentLine: "Wealth isn't built in bull markets. It's built in boring ones.",
    number: "02",
  },
  {
    id: "entrepreneurship-mindset",
    tag: "Entrepreneurship",
    tagColor: "#a3e635",
    date: "January 18, 2025",
    readTime: "6 min read",
    title: "Stop Romanticising the Hustle: What Real Entrepreneurship Looks Like at 2AM",
    excerpt:
      "Every motivational reel shows the yacht. Nobody shows the spreadsheet at 2AM, the cancelled investor call, or the co-founder conflict that nearly broke everything. This is that story — and the mental models that turned chaos into clarity.",
    stats: [
      { num: "7",    label: "Years In" },
      { num: "3",    label: "Pivots" },
      { num: "∞",    label: "Lessons" },
    ],
    accentLine: "Clarity doesn't come from hustle. It comes from brutal honesty.",
    number: "03",
  },
];

/* ─────────────────────────────────────────────────────────────────
   BLOG CARD
───────────────────────────────────────────────────────────────── */
function BlogCard({ blog, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.018)",
        border: `1px solid ${hovered ? "rgba(163,230,53,0.25)" : "rgba(255,255,255,0.07)"}`,
        transition: "background 0.3s, border-color 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* Large background number */}
      <div style={{
        position: "absolute",
        top: "-10px",
        right: "24px",
        fontFamily: "Proxima Nova, sans-serif",
        fontWeight: 900,
        fontSize: "clamp(5rem, 10vw, 8rem)",
        color: "rgba(163,230,53,0.04)",
        lineHeight: 1,
        letterSpacing: "-0.04em",
        pointerEvents: "none",
        userSelect: "none",
        transition: "color 0.3s",
        ...(hovered ? { color: "rgba(163,230,53,0.07)" } : {}),
      }}>
        {blog.number}
      </div>

      {/* Top accent line — grows on hover */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        height: "2px",
        width: hovered ? "100%" : "40px",
        background: "linear-gradient(to right, #a3e635, transparent)",
        transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }} />

      <div style={{ padding: "36px 36px 32px" }}>

        {/* Meta row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "22px",
          flexWrap: "wrap",
        }}>
          <span style={{
            fontFamily: "Proxima Nova, sans-serif",
            fontWeight: 800,
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a3e635",
            background: "rgba(163,230,53,0.08)",
            border: "1px solid rgba(163,230,53,0.18)",
            padding: "4px 10px",
          }}>
            {blog.tag}
          </span>
          <span style={{
            fontFamily: "Proxima Nova, sans-serif",
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.08em",
          }}>
            {blog.date}
          </span>
          <span style={{
            fontFamily: "Proxima Nova, sans-serif",
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.08em",
          }}>
            · {blog.readTime}
          </span>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "Proxima Nova, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.25rem, 2.4vw, 1.65rem)",
          color: hovered ? "#fff" : "rgba(255,255,255,0.88)",
          lineHeight: 1.22,
          letterSpacing: "-0.02em",
          marginBottom: "16px",
          transition: "color 0.25s",
          maxWidth: "680px",
        }}>
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p style={{
          fontFamily: "Proxima Nova, sans-serif",
          fontSize: "clamp(0.84rem, 1.1vw, 0.94rem)",
          color: "rgba(255,255,255,0.38)",
          lineHeight: 1.85,
          marginBottom: "28px",
          maxWidth: "640px",
        }}>
          {blog.excerpt}
        </p>

        {/* Pull quote */}
        <div style={{
          borderLeft: "2px solid #a3e635",
          paddingLeft: "16px",
          marginBottom: "32px",
        }}>
          <p style={{
            fontFamily: "Proxima Nova, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(0.82rem, 1vw, 0.9rem)",
            color: "rgba(255,255,255,0.55)",
            fontStyle: "italic",
            letterSpacing: "0.01em",
            lineHeight: 1.6,
          }}>
            "{blog.accentLine}"
          </p>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          marginBottom: "28px",
          alignSelf: "flex-start",
          width: "fit-content",
        }}>
          {blog.stats.map((s, i) => (
            <div key={i} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 22px",
              borderRight: i < blog.stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <span style={{
                fontFamily: "Proxima Nova, sans-serif",
                fontWeight: 900,
                fontSize: "1.1rem",
                color: "#a3e635",
                lineHeight: 1,
                marginBottom: "3px",
              }}>{s.num}</span>
              <span style={{
                fontFamily: "Proxima Nova, sans-serif",
                fontSize: "0.52rem",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            to={`/blog/${blog.id}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: hovered ? "#a3e635" : "transparent",
              color: hovered ? "#000" : "rgba(255,255,255,0.6)",
              fontFamily: "Proxima Nova, sans-serif",
              fontWeight: 800,
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "12px 24px",
              textDecoration: "none",
              border: `1px solid ${hovered ? "#a3e635" : "rgba(255,255,255,0.15)"}`,
              transition: "all 0.25s",
            }}
          >
            Read Article
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          {/* Share hint */}
          <span style={{
            fontFamily: "Proxima Nova, sans-serif",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>
            Share ↗
          </span>
        </div>

      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────────
   BLOGS PAGE
───────────────────────────────────────────────────────────────── */
export const BlogsPage = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      background: "#0a0a0a",
      overflowX: "hidden",
    }}>

      {/* ── Shared keyframes ────────────────────────────────────── */}
      <style>{`
        @keyframes lineGlow {
          0%,100% { opacity: 0.35; }
          50%      { opacity: 0.9;  }
        }
        @keyframes blogGridFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Vertical lime accent — matches hero */
        .blog-v-line {
          position: fixed;
          left: 32px; top: 15%; bottom: 10%;
          width: 1.5px;
          background: linear-gradient(to bottom,
            transparent 0%, #a3e635 18%, #a3e635 82%, transparent 100%
          );
          opacity: 0.18;
          animation: lineGlow 4s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        /* Subtle noise grain overlay */
        .blog-grain {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
          opacity: 0.4;
        }

        /* Radial ambient glow top-right */
        .blog-ambient {
          position: fixed;
          top: -200px; right: -200px;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(163,230,53,0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Nav back link */
        .blog-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Proxima Nova', sans-serif; font-weight: 700;
          font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); text-decoration: none;
          transition: color 0.2s;
        }
        .blog-back:hover { color: #a3e635; }

        /* Horizontal rule */
        .blog-rule {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.06);
          border: none; margin: 0;
        }

        /* Filter pill */
        .filter-pill {
          font-family: 'Proxima Nova', sans-serif; font-weight: 700;
          font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 7px 16px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-pill:hover,
        .filter-pill.active {
          border-color: #a3e635;
          color: #a3e635;
          background: rgba(163,230,53,0.06);
        }

        /* Newsletter input */
        .nl-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.82rem;
          padding: 14px 18px;
          outline: none;
          transition: border-color 0.2s;
        }
        .nl-input::placeholder { color: rgba(255,255,255,0.2); }
        .nl-input:focus { border-color: rgba(163,230,53,0.4); }

        .nl-btn {
          background: #a3e635; color: #000;
          font-family: 'Proxima Nova', sans-serif; font-weight: 800;
          font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 14px 28px; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .nl-btn:hover { background: #bef264; transform: translateY(-1px); }

        @media (max-width: 768px) {
          .blog-v-line { display: none; }
          .blogs-page-inner { padding: 80px 20px 64px !important; }
          .blog-header-grid { grid-template-columns: 1fr !important; }
          .blog-eyebrow-num { display: none !important; }
          .nl-wrap { flex-direction: column !important; }
          .nl-btn { width: 100% !important; }
        }
      `}</style>

      {/* ── Ambient background elements ─────────────────────────── */}
      <div className="blog-v-line" />
      <div className="blog-grain" />
      <div className="blog-ambient" />

      {/* ── Page inner ──────────────────────────────────────────── */}
      <div
        className="blogs-page-inner"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "100px 40px 80px",
        }}
      >

        {/* ── Back nav ──────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: "48px" }}>
          <Link to="/" className="blog-back">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="blog-header-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "flex-end",
          gap: "24px",
          marginBottom: "16px",
        }}>
          <div>
            <motion.p {...fadeUp(0.08)} style={{
              fontFamily: "Proxima Nova, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              marginBottom: "12px",
            }}>
              Perspectives · Ideas · Frameworks
            </motion.p>

            <motion.h1 {...fadeUp(0.15)} style={{
              fontFamily: "Proxima Nova, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              color: "#fff",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              margin: 0,
            }}>
              The <span style={{ color: "#a3e635" }}>Blog.</span>
            </motion.h1>
          </div>

          {/* Large decorative number */}
          <motion.div
            className="blog-eyebrow-num"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{
              fontFamily: "Proxima Nova, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(4rem, 8vw, 7rem)",
              color: "rgba(163,230,53,0.07)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              userSelect: "none",
            }}
          >
            {String(BLOGS.length).padStart(2, "0")}
          </motion.div>
        </div>

        {/* ── Tagline ───────────────────────────────────────────── */}
        <motion.p {...fadeUp(0.22)} style={{
          fontFamily: "Proxima Nova, sans-serif",
          fontSize: "clamp(0.88rem, 1.2vw, 1rem)",
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1.8,
          maxWidth: "520px",
          marginBottom: "36px",
        }}>
          Raw thoughts on building companies, generating wealth, and staying
          sane while doing both. No fluff. No sponsored content. Just frameworks
          that actually work.
        </motion.p>

        {/* ── Filter pills ──────────────────────────────────────── */}
        <motion.div {...fadeUp(0.28)} style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}>
          {["All", "Startup Ecosystem", "Wealth Generation", "Entrepreneurship"].map((f, i) => (
            <button key={f} className={`filter-pill${i === 0 ? " active" : ""}`}>{f}</button>
          ))}
        </motion.div>

        <motion.hr
          {...fadeUp(0.3)}
          className="blog-rule"
          style={{ marginBottom: "48px" }}
        />

        {/* ── Blog cards ────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {BLOGS.map((blog, i) => (
            <BlogCard key={blog.id} blog={blog} index={i} />
          ))}
        </div>

        {/* ── Divider ───────────────────────────────────────────── */}
        <hr className="blog-rule" style={{ margin: "64px 0 56px" }} />

        {/* ── Newsletter block ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "rgba(163,230,53,0.03)",
            border: "1px solid rgba(163,230,53,0.12)",
            padding: "40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner accent */}
          <div style={{
            position: "absolute",
            top: 0, right: 0,
            width: "120px", height: "120px",
            background: "radial-gradient(circle at top right, rgba(163,230,53,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <p style={{
            fontFamily: "Proxima Nova, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#a3e635",
            marginBottom: "10px",
          }}>
            Newsletter
          </p>
          <h3 style={{
            fontFamily: "Proxima Nova, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
            color: "#fff",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: "10px",
          }}>
            Think clearer. Build faster.
            <br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>
              One idea every two weeks.
            </span>
          </h3>
          <p style={{
            fontFamily: "Proxima Nova, sans-serif",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.28)",
            lineHeight: 1.7,
            marginBottom: "28px",
            maxWidth: "420px",
          }}>
            Join 12,000+ founders and builders who get my frameworks before
            they hit the blog.
          </p>

          <div className="nl-wrap" style={{ display: "flex", gap: "0", maxWidth: "480px" }}>
            <input
              type="email"
              placeholder="your@email.com"
              className="nl-input"
            />
            <button className="nl-btn">Subscribe</button>
          </div>
        </motion.div>

        {/* ── Footer note ───────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: "Proxima Nova, sans-serif",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.14)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textAlign: "center",
            marginTop: "48px",
          }}
        >
          © 2025 Himanish Bhattacharya · All rights reserved
        </motion.p>

      </div>
    </div>
  );
};

export default BlogsPage;