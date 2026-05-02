"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* Close menu on route change */
  useEffect(() => { setOpen(false); }, [location]);

  /* Scroll detection */
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navItems = [
    { name: "Home",    to: "/" },
    { name: "Story",   to: "/story" },
    { name: "Media",   to: "/media" },
    { name: "Contact", to: "/contact" },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <style>{`
        /* ── Reset & base ── */
        .nb {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 1000;
          /* GPU compositing — prevents mobile scroll jerk */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          /* Background lives on ::before so geometry never repaints */
          border-bottom: 1px solid transparent;
          transition: border-color 0.35s ease;
        }

        /* Pseudo-element carries the background — only opacity animates */
        .nb::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(4, 4, 4, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: -1;
        }

        /* Transparent at top */
        .nb--top {
          border-color: transparent;
          box-shadow: none;
        }

        /* Glass after scroll — only opacity changes */
        .nb--scrolled {
          border-color: rgba(255,255,255,0.06);
          box-shadow: 0 4px 40px rgba(0,0,0,0.4);
        }
        .nb--scrolled::before {
          opacity: 1;
        }

        /* ── Inner row ── */
        .nb__inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        @media (max-width: 768px) {
          .nb__inner { padding: 0 20px; height: 64px; }
        }

        /* ── Logo ── */
        .nb__logo {
          flex-shrink: 0;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .nb__logo img {
          height: 72px;
          width: auto;
          display: block;
          object-fit: contain;
        }

        /* ── Desktop nav links (center) ── */
        .nb__links {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
          justify-content: flex-end;
        }
        @media (max-width: 768px) {
          .nb__links { display: none; }
        }

        .nb__link {
          position: relative;
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          padding: 6px 12px;
          transition: color 0.2s ease;
        }
        .nb__link::after {
          content: '';
          position: absolute;
          bottom: 1px;
          left: 12px;
          right: 12px;
          height: 1px;
          background: #a3e635;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nb__link:hover {
          color: #fff;
        }
        .nb__link:hover::after,
        .nb__link--active::after {
          transform: scaleX(1);
        }
        .nb__link--active {
          color: #fff;
        }

        /* ── Desktop CTA button ── */
        .nb__cta {
          flex-shrink: 0;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 800;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #000;
          background: #a3e635;
          text-decoration: none;
          padding: 10px 20px;
          border: 1.5px solid #a3e635;
          transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
        }
        .nb__cta:hover {
          background: transparent;
          color: #a3e635;
          box-shadow: 0 0 18px rgba(163,230,53,0.2);
        }
        @media (max-width: 768px) {
          .nb__cta { display: none; }
        }

        /* ── Hamburger ── */
        /* CRITICAL: position it as a flex sibling, NOT absolute.
           This prevents it from shifting on mobile scroll. */
        .nb__burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          gap: 5px;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-left: auto;
          position: relative;
          z-index: 1002;
        }
        @media (max-width: 768px) {
          .nb__burger { display: flex; }
        }

        .nb__burger-line {
          display: block;
          height: 1.5px;
          background: rgba(255,255,255,0.8);
          border-radius: 1px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity  0.3s ease,
                      width    0.3s ease;
          transform-origin: center;
        }
        .nb__burger-line--1 { width: 22px; }
        .nb__burger-line--2 { width: 16px; }
        .nb__burger-line--3 { width: 22px; }

        /* Open state — X shape */
        .nb__burger--open .nb__burger-line--1 {
          width: 22px;
          transform: translateY(6.5px) rotate(45deg);
        }
        .nb__burger--open .nb__burger-line--2 {
          opacity: 0;
          transform: scaleX(0);
        }
        .nb__burger--open .nb__burger-line--3 {
          width: 22px;
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* ── Mobile overlay menu ──
           KEY FIX: position:fixed so it doesn't affect document flow
           and never causes the navbar bar itself to shift */
        .nb__mobile-menu {
          position: fixed;
          top: 64px;      /* matches navbar height on mobile */
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(2, 2, 2, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 32px 24px 40px;
          overflow-y: auto;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .nb__mobile-link {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nb__mobile-link:last-of-type { border-bottom: none; }
        .nb__mobile-link:hover,
        .nb__mobile-link--active {
          color: #fff;
          padding-left: 8px;
        }
        .nb__mobile-link--active { color: #a3e635; }

        .nb__mobile-cta {
          margin-top: 32px;
          display: block;
          text-align: center;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #000;
          background: #a3e635;
          padding: 16px 24px;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .nb__mobile-cta:hover { background: #bef264; }

        .nb__mobile-footer {
          margin-top: auto;
          padding-top: 24px;
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
      `}</style>

      {/* ── Navbar bar ── */}
      <nav className={`nb ${scrolled || open ? "nb--scrolled" : "nb--top"}`}>
        <div className="nb__inner">

          {/* Logo */}
          <Link to="/" className="nb__logo" aria-label="Himanish Bhattacharya">
            <img src="/logo.png" alt="HB" />
          </Link>

          {/* Desktop center links */}
          <div className="nb__links">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nb__link${isActive(item.to) ? " nb__link--active" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="nb__cta"
            id="navbar-book-btn"
          >
            Book a Session
          </Link>

          {/* Hamburger — plain flex child, NEVER absolutely positioned */}
          <button
            className={`nb__burger${open ? " nb__burger--open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="nb__burger-line nb__burger-line--1" />
            <span className="nb__burger-line nb__burger-line--2" />
            <span className="nb__burger-line nb__burger-line--3" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Full-screen Menu ──
          position:fixed — lives OUTSIDE the nav bar in the DOM stacking
          so it NEVER shifts the navbar's layout */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nb__mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + i * 0.055, duration: 0.3 }}
              >
                <Link
                  to={item.to}
                  className={`nb__mobile-link${isActive(item.to) ? " nb__mobile-link--active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span style={{
                    fontFamily: "Proxima Nova, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    color: "#a3e635",
                    verticalAlign: "middle",
                  }}>
                    0{i + 1}
                  </span>
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
            >
              <Link
                to="/contact"
                className="nb__mobile-cta"
                onClick={() => setOpen(false)}
                id="mobile-book-btn"
              >
                Book a Session
              </Link>
            </motion.div>

            <p className="nb__mobile-footer">
              Himanish Bhattacharya · Entrepreneur · Speaker · Creator
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};