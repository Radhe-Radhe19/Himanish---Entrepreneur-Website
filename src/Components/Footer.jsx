"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";



const SOCIAL = [
  {
    name: "Instagram",
    href: "#",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "YouTube",
    href: "#",
    path: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
  },
  {
    name: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "Twitter / X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer
      id="footer"
      style={{
        width: "100%",
        background: "#000",
        borderTop: "1px solid #111",
      }}
    >
      <style>{`
        .footer-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 48px 48px;
        }
        @media (max-width: 768px) {
          .footer-wrap { padding: 56px 24px 40px; }
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1.2fr 1.5fr;
          gap: 48px;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; gap: 36px; }
        }

        .footer-brand {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 900;
          font-size: 1.5rem;
          color: #fff;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 12px;
        }
        .footer-brand span { color: #a3e635; }

        .footer-tagline {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.82rem;
          color: #555;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .footer-social-row {
          display: flex;
          flex-direction: row;
          gap: 10px;
          flex-wrap: nowrap;
        }

        .footer-social-icon {
          width: 36px;
          height: 36px;
          border: 1px solid #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          text-decoration: none;
          flex-shrink: 0;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .footer-social-icon:hover {
          background: #a3e635;
          color: #000;
          border-color: #a3e635;
        }

        .footer-col-heading {
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 800;
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #a3e635;
          margin-bottom: 20px;
        }

        .footer-nav-link {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.85rem;
          color: #555;
          text-decoration: none;
          display: block;
          margin-bottom: 10px;
          transition: color 0.2s ease;
        }
        .footer-nav-link:hover { color: #fff; }

        .footer-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 14px;
        }
        .footer-contact-text {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.82rem;
          color: #555;
          line-height: 1.5;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-contact-text:hover { color: #a3e635; }

        .footer-newsletter-desc {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.82rem;
          color: #555;
          line-height: 1.65;
          margin-bottom: 16px;
        }

        .footer-input-row {
          display: flex;
          flex-direction: row;
        }

        .footer-email-input {
          flex: 1;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-right: none;
          color: #fff;
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.82rem;
          padding: 11px 14px;
          outline: none;
          min-width: 0;
          transition: border-color 0.2s ease;
        }
        .footer-email-input::placeholder { color: #333; }
        .footer-email-input:focus { border-color: #a3e635; }

        .footer-join-btn {
          background: #a3e635;
          color: #000;
          font-family: 'Proxima Nova', sans-serif;
          font-weight: 800;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 11px 16px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .footer-join-btn:hover { background: #bef264; }

        .footer-bottom-bar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 48px;
          border-top: 1px solid #0f0f0f;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          justify-content: space-between;
        }
        @media (max-width: 768px) {
          .footer-bottom-bar { padding: 20px 24px; }
        }

        .footer-bottom-text {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.72rem;
          color: #333;
        }
        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }
        .footer-bottom-links a {
          font-family: 'Proxima Nova', sans-serif;
          font-size: 0.72rem;
          color: #333;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-bottom-links a:hover { color: #a3e635; }
      `}</style>

      <div className="footer-wrap">
        <div className="footer-grid">
          {/* Brand col */}
          <div>
            <Link to="/" className="footer-brand">Himanish<span>.</span></Link>
            <p className="footer-tagline">
              Inspiring entrepreneurs, guiding startups, and empowering the next generation of leaders across India.
            </p>
            <div className="footer-social-row">
              {SOCIAL.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="footer-social-icon"
                  aria-label={s.name}
                  rel="noopener noreferrer"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>



          {/* Contact col */}
          <div>
            <p className="footer-col-heading">Contact</p>
            <div className="footer-contact-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:himanishbhattacharya@email.com" className="footer-contact-text">
                himanishbhattacharya@email.com
              </a>
            </div>
            <div className="footer-contact-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href="tel:+919876543210" className="footer-contact-text">+91 98765 43210</a>
            </div>
            <div className="footer-contact-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="footer-contact-text">India · Available Nationwide</span>
            </div>
          </div>

          {/* Newsletter col */}
          <div>
            <p className="footer-col-heading">Newsletter</p>
            <p className="footer-newsletter-desc">
              Insights on entrepreneurship, leadership &amp; growth — straight to your inbox.
            </p>
            {subscribed ? (
              <p style={{ fontFamily: "Proxima Nova, sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#a3e635" }}>
                ✓ You're subscribed!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-input-row">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="footer-email-input"
                  required
                  id="newsletter-input"
                />
                <button type="submit" className="footer-join-btn" id="newsletter-btn">Join</button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <p className="footer-bottom-text">
          © {new Date().getFullYear()} Himanish Bhattacharya. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
