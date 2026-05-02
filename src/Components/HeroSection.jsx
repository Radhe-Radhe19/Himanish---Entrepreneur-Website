"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

/* ── Typewriter hook ───────────────────────────────────────────── */
function useTypewriter(phrases, typeMs = 65, delMs = 40, pauseMs = 2000) {
  const [text, setText] = useState("");
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = phrases[pi];
    const tick = deleting
      ? ci > 0
        ? setTimeout(() => { setText(cur.slice(0, ci - 1)); setCi(c => c - 1); }, delMs)
        : setTimeout(() => { setDeleting(false); setPi(i => (i + 1) % phrases.length); }, 300)
      : ci < cur.length
        ? setTimeout(() => { setText(cur.slice(0, ci + 1)); setCi(c => c + 1); }, typeMs)
        : setTimeout(() => setDeleting(true), pauseMs);
    return () => clearTimeout(tick);
  }, [ci, deleting, pi, phrases, typeMs, delMs, pauseMs]);

  return text;
}

export const HeroSection = () => {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);

  const typeText = useTypewriter([
    "Inspiring Entrepreneurs",
    "Guiding Startups",
    "Empowering Leaders",
    "Redefining Indian Content",
  ]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  /* Desktop scroll transforms only */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/gilroy-free');
        .hero-name {
          font-family: 'Gilroy', 'Montserrat', sans-serif !important;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        @keyframes lineGlow {
          0%,100% { opacity: 0.35; }
          50%      { opacity: 0.9;  }
        }
        @keyframes heroZoom {
          0%   { transform: scale(1.12); }
          100% { transform: scale(1.0);  }
        }
        @keyframes cursorBlink {
          0%,49% { opacity: 1; } 50%,100% { opacity: 0; }
        }
        @keyframes hintFloat {
          0%,100% { transform: translateX(-50%) translateY(0);   }
          50%     { transform: translateX(-50%) translateY(-6px); }
        }
        .hbp {
          display: inline-flex; align-items: center; gap: 8px;
          background: #a3e635; color: #000;
          font-family: 'Proxima Nova', sans-serif; font-weight: 800; font-size: 0.78rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 14px 28px; text-decoration: none; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
        }
        .hbp:hover { background: #bef264; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(163,230,53,0.22); }
        .hbs {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(255,255,255,0.6);
          font-family: 'Proxima Nova', sans-serif; font-weight: 700; font-size: 0.78rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 14px 28px; text-decoration: none;
          border: 1px solid rgba(255,255,255,0.15); cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.18s;
        }
        .hbs:hover { border-color: rgba(255,255,255,0.38); color: #fff; transform: translateY(-2px); }
        .sp {
          display: flex; flex-direction: column; align-items: center;
          padding: 12px 22px; border-right: 1px solid rgba(255,255,255,0.06);
        }
        .sp:last-child { border-right: none; }
        .sp-n { font-family: 'Proxima Nova', sans-serif; font-weight: 900; font-size: 1.25rem; color: #a3e635; line-height: 1; margin-bottom: 3px; }
        .sp-l { font-family: 'Proxima Nova', sans-serif; font-size: 0.58rem; color: rgba(255,255,255,0.28); letter-spacing: 0.15em; text-transform: uppercase; }
        .sh {
          position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
          z-index: 20; display: flex; flex-direction: column; align-items: center; gap: 5px;
          color: rgba(255,255,255,0.2); font-family: 'Proxima Nova', sans-serif; font-size: 0.52rem;
          letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none;
          animation: hintFloat 3s ease-in-out infinite;
        }
        .tw-cur {
          display: inline-block; width: 2px; height: 0.85em;
          background: #a3e635; margin-left: 3px; vertical-align: middle;
          animation: cursorBlink 0.75s step-end infinite;
        }
        .rt {
          font-family: 'Proxima Nova', sans-serif; font-weight: 900;
          font-size: clamp(2.8rem, 5vw, 4.6rem); line-height: 1.0; letter-spacing: -0.02em;
        }

        /* ════════════════════════════════════════════════════════
           MOBILE — sticky portrait, scrolling text overlay
           ════════════════════════════════════════════════════════

           Structure:
             .mob-hero              — tall scroll container (250vh)
               .mob-portrait-sticky — position:sticky top:0  (THE IMAGE)
               .mob-text-overlay    — normal flow, z-index above, scrolls up
               .mob-spacer          — empty height so portrait holds after text gone

           The portrait is sticky and never moves until the section ends.
           The text sits on top and scrolls away naturally — pure CSS, no JS.
        ════════════════════════════════════════════════════════ */
        @media (max-width: 768px) {

          .mob-hero {
            position: relative;
            width: 100%;
            background: #0a0a0a;
          }

          /* ── Portrait: sticky, full viewport, stays put ───────── */
          .mob-portrait-sticky {
            position: sticky;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: 2;
            overflow: hidden;
            background: #0a0a0a;
          }

          /* Subtle audience bg inside portrait layer */
          .mob-audience {
            position: absolute; inset: 0; z-index: 1;
          }
          .mob-audience img {
            width: 100%; height: 100%;
            object-fit: cover; object-position: center 25%;
            opacity: 0.15; filter: grayscale(30%);
          }

          /* Warm backlight glow */
          .mob-portrait-glow {
            position: absolute; inset: 0; z-index: 2;
            background: radial-gradient(
              ellipse 80% 70% at 50% 25%,
              rgba(255,195,80,0.11) 0%,
              rgba(255,140,30,0.04) 55%,
              transparent 80%
            );
          }

          /* The portrait image itself */
          .mob-portrait-img {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 92%;
            width: auto;
            max-width: 100%;
            object-fit: contain;
            object-position: bottom center;
            z-index: 3;
            filter: contrast(1.06) brightness(1.03)
              drop-shadow(0 28px 56px rgba(0,0,0,0.7))
              drop-shadow(0 0 80px rgba(255,170,50,0.09));
            opacity: 0;
            transition: opacity 1.2s ease 2.5s;
          }
          .mob-portrait-img.rdy { opacity: 1; }

          /* Bottom vignette */
          .mob-portrait-vignette {
            position: absolute; bottom: 0; left: 0; right: 0; height: 100px;
            background: linear-gradient(to top, #0a0a0a 0%, transparent 100%);
            z-index: 4;
          }

          /* ── Text overlay: pulled up to overlap with portrait ──── */
          .mob-text-overlay {
            position: relative;
            /* Pull up so it covers the portrait from the start */
            margin-top: -100vh;
            width: 100%;
            min-height: 100vh;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 90px 24px 80px;
            /* Gradient: opaque at top (covers portrait), fades to transparent at bottom
               so as it scrolls away the portrait becomes visible underneath */
            background: linear-gradient(
              to bottom,
              rgba(10,10,10,0.94) 0%,
              rgba(10,10,10,0.88) 55%,
              rgba(10,10,10,0.0)  100%
            );
          }

          /* ── Spacer: portrait holds for this extra distance ─────── */
          .mob-spacer {
            position: relative;
            z-index: 1;
            height: 10vh;
            /* Blend to dark so next section joins cleanly */
            background: linear-gradient(to bottom, transparent 0%, #0a0a0a 100%);
          }

          /* Typography adjustments */
          .rt { font-size: clamp(2.2rem, 10vw, 3rem) !important; text-align: center; }
          .mob-text-overlay p,
          .mob-text-overlay div { text-align: center; }
          .hbp, .hbs { padding: 12px 22px !important; font-size: 0.72rem !important; }
          .sp { padding: 10px 18px; }
          .sp-n { font-size: 1.1rem; }
          .sp-l { font-size: 0.58rem; }
        }

        @media (max-width: 480px) {
          .mob-text-overlay { padding: 80px 18px 80px; }
          .rt { font-size: clamp(1.9rem, 9vw, 2.5rem) !important; }
          .hbp, .hbs { padding: 11px 18px !important; font-size: 0.68rem !important; }
          .sp { padding: 8px 14px; }
          .sp-n { font-size: 1rem; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          MOBILE LAYOUT
      ══════════════════════════════════════════════════════════ */}
      {isMobile && (
        <div className="mob-hero" id="hero">

          {/* 1 ── PORTRAIT — sticky, never moves ─────────────────── */}
          <div className="mob-portrait-sticky">
            <div className="mob-audience">
              <img src="/Audience.png" alt="" aria-hidden="true" />
            </div>
            <div className="mob-portrait-glow" />
            <img
              src="/image(4).png"
              alt="Himanish Bhattacharya — Entrepreneur and Speaker"
              className={`mob-portrait-img${ready ? " rdy" : ""}`}
            />
            <div className="mob-portrait-vignette" />
          </div>

          {/* 2 ── TEXT — scrolls up naturally over the portrait ───── */}
          <div className="mob-text-overlay">

            <motion.p
              initial={{ opacity: 0, y: 28 }} animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{ fontFamily: "Proxima Nova, sans-serif", fontSize: "0.6rem",
                letterSpacing: "0.35em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)", marginBottom: "20px" }}
            >
              Entrepreneur · Speaker · Creator
            </motion.p>

            <div style={{ marginBottom: "28px" }}>
              {["Himanish", "Bhattacharya"].map((name, i) => (
                <motion.p
                  key={name}
                  initial={{ opacity: 0, y: 28 }} animate={ready ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.16 + i * 0.1 }}
                  className="rt hero-name"
                  style={{ color: i === 1 ? "#a3e635" : "#fff" }}
                >
                  {name}
                </motion.p>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 28 }} animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
              style={{ fontFamily: "Proxima Nova, sans-serif", fontSize: "0.88rem",
                color: "rgba(255,255,255,0.44)", lineHeight: 1.8,
                maxWidth: "340px", marginBottom: "18px" }}
            >
              I build impactful communities, deliver transformative talks,
              mentor innovative startups, and create content that reaches millions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 28 }} animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.52 }}
              style={{ fontFamily: "Proxima Nova, sans-serif", fontWeight: 700,
                fontSize: "0.9rem", color: "#a3e635", minHeight: "1.5em",
                marginBottom: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {typeText}<span className="tw-cur" aria-hidden="true" />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.62 }}
              style={{ display: "flex", gap: "10px", flexWrap: "wrap",
                marginBottom: "48px", justifyContent: "center" }}
            >
              <Link to="/contact" className="hbp">
                Book a Session
              </Link>
              <Link to="/story" className="hbs">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Explore Story
              </Link>
            </motion.div>



          </div>

          {/* 3 ── SPACER — portrait holds during this scroll distance ─ */}
          <div className="mob-spacer" />

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          DESKTOP LAYOUT — completely unchanged
      ══════════════════════════════════════════════════════════ */}
      {!isMobile && (
        <section
          id="hero"
          ref={heroRef}
          style={{
            position: "relative", width: "100%", minHeight: "100vh",
            background: "#0a0a0a", overflow: "hidden", display: "flex", alignItems: "stretch",
          }}
        >
          {/* Background */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src="/Audience.png" alt="" aria-hidden="true"
              style={{ width: "100%", height: "100%", objectFit: "cover",
                objectPosition: "center 25%", opacity: 0.3, filter: "grayscale(30%)" }} />
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.25) 100%)" }} />
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 45%)" }} />
          </div>

          {/* Text column */}
          <motion.div style={{
            position: "relative", zIndex: 10, width: "54%", minHeight: "100vh",
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "100px 0 64px 56px",
          }}>
            <motion.p {...fadeUp(0.1)} style={{ fontFamily: "Proxima Nova, sans-serif",
              fontSize: "0.64rem", letterSpacing: "0.35em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)", marginBottom: "20px" }}>
              Entrepreneur · Speaker · Creator
            </motion.p>
            <div style={{ marginBottom: "28px" }}>
              {["Himanish", "Bhattacharya"].map((name, i) => (
                <motion.p key={name} {...fadeUp(0.16 + i * 0.1)} className="rt hero-name"
                  style={{ color: i === 1 ? "#a3e635" : "#fff" }}>{name}</motion.p>
              ))}
            </div>
            <motion.p {...fadeUp(0.42)} style={{ fontFamily: "Proxima Nova, sans-serif",
              fontSize: "clamp(0.88rem, 1.3vw, 1rem)", color: "rgba(255,255,255,0.44)",
              lineHeight: 1.8, maxWidth: "460px", marginBottom: "18px" }}>
              I build impactful communities, deliver transformative talks,
              mentor innovative startups, and create content that reaches millions.
            </motion.p>
            <motion.p {...fadeUp(0.52)} style={{ fontFamily: "Proxima Nova, sans-serif",
              fontWeight: 700, fontSize: "0.9rem", color: "#a3e635", minHeight: "1.5em",
              marginBottom: "36px", display: "flex", alignItems: "center" }}>
              {typeText}<span className="tw-cur" aria-hidden="true" />
            </motion.p>
            <motion.div {...fadeUp(0.62)} style={{ display: "flex", gap: "12px",
              flexWrap: "wrap", marginBottom: "48px" }}>
              <Link to="/contact" className="hbp" id="hero-book-btn">
                Book a Session
              </Link>
              <Link to="/story" className="hbs" id="hero-story-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Explore Story
              </Link>
            </motion.div>

          </motion.div>

          {/* Portrait — premium cinematic treatment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            style={{ position: "absolute", top: 0, right: 0, width: "55%", height: "100%",
              zIndex: 8, overflow: "hidden", pointerEvents: "none" }}
          >
            {/* Full-cover image with slow zoom animation */}
            <img src="/image(4).png" alt="Himanish Bhattacharya — Entrepreneur and Speaker"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "top center",
                animation: "heroZoom 8s ease-out forwards",
                filter: "contrast(1.08) brightness(0.95) saturate(1.05)" }} />
            {/* Warm cinematic glow overlay */}
            <div style={{ position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 70% 60% at 55% 30%, rgba(255,195,80,0.12) 0%, transparent 70%)", zIndex: 2 }} />
            {/* Left gradient — seamless blend to text */}
            {/* <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "55%",
              background: "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.9) 25%, rgba(10,10,10,0.5) 55%, transparent 100%)", zIndex: 3 }} /> */}
            {/* Bottom gradient */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
              background: "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.6) 40%, transparent 100%)", zIndex: 3 }} />
            {/* Top gradient */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "120px",
              background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)", zIndex: 3 }} />
            {/* Subtle dark vignette for cinematic feel */}
            <div style={{ position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)", zIndex: 4 }} />
          </motion.div>

          {/* Scroll hint */}
          <a href="#about-section" className="sh" aria-label="Scroll down">
            <span>Scroll</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        </section>
      )}
    </>
  );
};