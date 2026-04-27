"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Rohan Mehta",
    role: "Founder, TechVentures India",
    rating: 5,
    quote: "Himanish didn't just deliver a keynote — he delivered a wake-up call. Our entire leadership team left with renewed purpose. The energy, authenticity, and depth of insight was absolutely world-class.",
    avatar: "RM",
    color: "#3b82f6",
  },
  {
    name: "Priya Sharma",
    role: "CEO, InnovateCo",
    rating: 5,
    quote: "We hired Himanish for our annual summit and the response was overwhelming. Employees were still talking about his session weeks later. He has an incredible ability to connect with any audience.",
    avatar: "PS",
    color: "#8b5cf6",
  },
  {
    name: "Ankit Sharma",
    role: "Director, StartupHub India",
    rating: 5,
    quote: "The mentorship program with Himanish fundamentally changed how I approach building my startup. His frameworks are battle-tested, his feedback is brutally honest, and his passion for seeing others succeed is genuine.",
    avatar: "AS",
    color: "#ef4444",
  },
  {
    name: "Neha Gupta",
    role: "Co-Founder, FounderCircle",
    rating: 5,
    quote: "We've had many speakers at our events but Himanish stands in a category of his own. From the moment he takes the mic to the standing ovation at the end — every minute is intentional.",
    avatar: "NG",
    color: "#f59e0b",
  },
  {
    name: "Vikram Singh",
    role: "Head of Learning, EduFirst",
    rating: 5,
    quote: "Our students rated Himanish's workshop the best experience of their academic year. He didn't talk at them — he talked with them. Real stories, real lessons, real impact.",
    avatar: "VS",
    color: "#10b981",
  },
];

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "#a3e635" : "none"}
          stroke={i < rating ? "#a3e635" : "#2a2a2a"}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef(null);

  const go = (idx) => {
    clearInterval(timer.current);
    setDir(idx > active ? 1 : -1);
    setActive(idx);
    timer.current = setInterval(() => {
      setDir(1);
      setActive(p => (p + 1) % TESTIMONIALS.length);
    }, 5500);
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      setDir(1);
      setActive(p => (p + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer.current);
  }, []);

  const variants = {
    enter: d => ({ opacity: 0, x: d > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: d => ({ opacity: 0, x: d > 0 ? -50 : 50 }),
  };

  return (
    <section
      id="testimonials"
      style={{ width: "100%", background: "#030303", padding: "100px 0" }}
    >
      <style>{`
        .tmn-wrap {
          max-width: 880px;
          margin: 0 auto;
          padding: 0 48px;
        }
        @media (max-width: 768px) {
          .tmn-wrap { padding: 0 24px; }
        }

        .tmn-heading {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 4vw, 2.8rem);
          color: #fff;
          margin-bottom: 48px;
        }
        .tmn-heading span { color: #a3e635; }

        .tmn-eyebrow {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          color: #404040;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .tmn-card {
          background: #080808;
          border: 1px solid #141414;
          padding: 48px 48px 40px;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 560px) {
          .tmn-card { padding: 32px 24px; }
        }

        .tmn-quote-mark {
          position: absolute;
          top: 12px;
          right: 24px;
          font-family: 'Proxima Nova', sans-serif;
          font-size: 7rem;
          line-height: 1;
          color: #0f0f0f;
          user-select: none;
          pointer-events: none;
        }

        .tmn-text {
          font-family: 'Proxima Nova', sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          color: #9ca3af;
          line-height: 1.8;
          font-style: italic;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }

        .tmn-author-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .tmn-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 800;
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .tmn-name {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 800;
          font-size: 0.9rem;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }

        .tmn-role {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.75rem;
          color: #555;
        }

        /* Controls row - HORIZONTAL layout */
        .tmn-controls {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
        }

        .tmn-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #1a1a1a;
          background: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .tmn-nav-btn:hover {
          background: #a3e635;
          color: #000;
          border-color: #a3e635;
        }

        .tmn-dots {
          display: flex;
          flex-direction: row;
          gap: 6px;
          flex: 1;
        }

        .tmn-dot {
          height: 2px;
          border-radius: 1px;
          background: #1a1a1a;
          cursor: pointer;
          flex: 1;
          transition: background 0.3s ease, flex 0.3s ease;
        }
        .tmn-dot.active {
          background: #a3e635;
          flex: 2;
        }

        .tmn-count {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: #333;
          flex-shrink: 0;
        }
      `}</style>

      <div className="tmn-wrap">
        <p className="tmn-eyebrow">Testimonials</p>
        <h2 className="tmn-heading">
          What <span>Leaders Say</span>
        </h2>

        {/* Carousel */}
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={active}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="tmn-card"
          >
            <div className="tmn-quote-mark">"</div>
            <Stars rating={TESTIMONIALS[active].rating} />
            <p className="tmn-text">"{TESTIMONIALS[active].quote}"</p>
            <div className="tmn-author-row">
              <div
                className="tmn-avatar"
                style={{
                  background: `${TESTIMONIALS[active].color}18`,
                  border: `1.5px solid ${TESTIMONIALS[active].color}33`,
                  color: TESTIMONIALS[active].color,
                }}
              >
                {TESTIMONIALS[active].avatar}
              </div>
              <div>
                <p className="tmn-name">{TESTIMONIALS[active].name}</p>
                <p className="tmn-role">{TESTIMONIALS[active].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls — all on one horizontal row */}
        <div className="tmn-controls">
          <button
            className="tmn-nav-btn"
            onClick={() => go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="tmn-dots">
            {TESTIMONIALS.map((_, i) => (
              <div
                key={i}
                className={`tmn-dot ${i === active ? "active" : ""}`}
                onClick={() => go(i)}
                role="button"
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <span className="tmn-count">{active + 1} / {TESTIMONIALS.length}</span>

          <button
            className="tmn-nav-btn"
            onClick={() => go((active + 1) % TESTIMONIALS.length)}
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
