"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── Intersection observer hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
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
  return [ref, visible];
}

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

// ─── STAT COUNTER ─────────────────────────────────────────────────────────────
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
        fontFamily: "Proxima Nova, sans-serif",
        fontWeight: 900,
        fontSize: "clamp(3rem, 6vw, 4.5rem)",
        color: "#a3e635",
        lineHeight: 1,
        marginBottom: 6,
      }}>
        {count}{suffix}
      </p>
      <p style={{
        fontFamily: "Proxima Nova, sans-serif",
        fontWeight: 700,
        fontSize: "0.72rem",
        color: "#374151",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
      }}>
        {label}
      </p>
    </div>
  );
}

// ─── IMAGE PLACEHOLDER ────────────────────────────────────────────────────────
function ImgPlaceholder({ height = 400, label = "ADD IMAGE" }) {
  return (
    <div style={{
      width: "100%", height,
      background: "#0a0a0a",
      border: "1px dashed #1f1f1f",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 10,
    }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#252525" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span style={{ color: "#252525", fontSize: "0.58rem", fontFamily: 'Proxima Nova, sans-serif', letterSpacing: "0.15em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

// ─── TIMELINE DATA ────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: "2001", title: "BORN", location: "India",
    description: "Born into a world of endless possibilities in 2001.",
    images: ["/Born.jpeg"],
  },
  {
    year: "2018", title: "COMPETITIVE TENNIS PLAYER", location: "Sports",
    description: "Dedicated to the court as a competitive tennis player, building the foundational discipline, focus, and drive to win.",
    images: ["/Competitive_Tennis.jpeg"],
  },
  {
    year: "2020", title: "JOINED COLLEGE", location: "Academics",
    description: "Joined college for mechatronics engineering, beginning a deep dive into the intersection of mechanics, electronics, and computing.",
    images: ["/JoinedCollege (2).jpeg"],
  },
  {
    year: "2022 June", title: "TECHNICAL PROJECTS", location: "Mechatronics Domain",
    description: "Successfully built and completed multiple hands-on projects in the mechatronics domain, expanding technical expertise.",
    images: ["/Technical_Project.jpeg"],
  },
  {
    year: "2022 Aug", title: "KPIT SPARKLE AWARDEE", location: "Recognition",
    description: "Honored as a prestigious 'pat on the back' awardee at KPIT Sparkle for showcasing exceptional technical innovation.",
    images: ["/Kpit_Sparkle_Awardee.jpeg"],
  },
  {
    year: "2023", title: "STARTED CORPIFT", location: "Entrepreneurship",
    description: "Founded Corpift, taking the first major leap into the business world with a fresh, ambitious vision.",
    images: ["/Corpift.jpeg"],
  },
  {
    year: "2024 Jan", title: "INTERN AT BOSCH JaP", location: "Corporate Experience",
    description: "Worked as an Automation and Digitalization Intern at BOSCH JaP, bridging the gap between theoretical engineering and industry scale.",
    images: ["/Bosch Jap.jpeg"],
  },
  {
    year: "2024 July", title: "GRADUATED", location: "Manipal University",
    description: "Officially graduated from Manipal University as a Mechatronics Engineer with a core specialization in robotics.",
    images: ["/GraduatedM_U.jpeg"],
  },
  {
    year: "2025", title: "KEYNOTE SPEAKER & MENTOR", location: "Various Universities",
    description: "Key note speaker at universities like Manipal, JECRC and many more. Boosting the start-up ecosystem by mentoring new startups and motivating youngsters to start their own businesses.",
    images: ["KeynoteSpeaker.jpeg"],
  },
  {
    year: "2026", title: "CORPIFT SCALES", location: "Jaipur",
    description: "Corpift officially becomes the fastest growing corporate gifting company in Jaipur, marking a massive milestone in the entrepreneurial journey.",
    images: ["/CorpiftScales.jpeg"],
  },
];

// ─── TIMELINE COMPONENTS ──────────────────────────────────────────────────────
function TimelineImage({ src, label }) {
  if (src) {
    let objPos = "center";
    if (typeof src === "string") {
      if (src.includes("Born")) objPos = "center 25%";
      if (src.includes("Bosch")) objPos = "center 45%";
      if (src.includes("Corpift_Scales")) objPos = "center 25%";
      if (src.includes("KeynoteSpeaker")) objPos = "center 25%";
      if (src.includes("Kpit")) {
        return <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "right center", display: "block" }} />;
      }
      if (src.includes("Tennis")) {
        return <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }} />;
      }
    }
    return <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: objPos, display: "block" }} />;
  }
  return (
    <div style={{ width: "100%", height: "100%", background: "#0a0a0a", border: "1px dashed #1a1a1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
      </svg>
      <span style={{ color: "#222", fontSize: "0.55rem", fontFamily: 'Proxima Nova, sans-serif', letterSpacing: "0.12em", textTransform: "uppercase" }}>Add Image</span>
    </div>
  );
}

function DesktopRow({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const isEven = index % 2 === 0;
  const isTennis = item.title.includes("TENNIS");
  const isKpit = item.title.includes("KPIT");
  const isSpecial = isTennis || isKpit;
  const containerHeight = isSpecial ? 280 : 230;
  const containerStyle = { 
    display: "flex", 
    gap: 10, 
    height: containerHeight, 
    maxWidth: isSpecial ? "400px" : "100%",
    marginLeft: (isSpecial && isEven) ? "auto" : 0
  };
  
  const imageBlock = (
    <div style={containerStyle}>
      {item.images.slice(0, 2).map((src, i) => <div key={i} style={{ flex: 1, overflow: "hidden" }}><TimelineImage src={src} label={`${item.title} ${i + 1}`} /></div>)}
    </div>
  );
  const textBlock = (
    <div style={{ padding: isEven ? "0 0 0 52px" : "0 52px 0 0", textAlign: isEven ? "left" : "right" }}>
      <p style={{ fontFamily: "Proxima Nova, sans-serif", fontWeight: 900, fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)", color: "#fff", textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: 5, lineHeight: 1.1 }}>{item.title}</p>
      <p style={{ fontFamily: "Proxima Nova, sans-serif", fontWeight: 700, fontSize: "0.68rem", color: "#a3e635", textTransform: "uppercase", letterSpacing: "0.22em", marginBottom: 12 }}>{item.location}</p>
      <p style={{ fontSize: "0.875rem", color: "#555", lineHeight: 1.75, fontFamily: 'Proxima Nova, sans-serif', maxWidth: 320, marginLeft: isEven ? 0 : "auto" }}>{item.description}</p>
    </div>
  );
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 72px 1fr", alignItems: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${index * 0.07}s, transform 0.7s ease ${index * 0.07}s` }}>
      <div>{isEven ? imageBlock : textBlock}</div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", alignSelf: "stretch" }}>
        <div style={{ width: 1, flex: 1, background: "#161616" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0" }}>
          <span style={{ fontFamily: "Proxima Nova, sans-serif", fontWeight: 900, fontSize: "0.85rem", color: "#a3e635", letterSpacing: "0.15em", marginRight: "-0.15em", marginBottom: 7 }}>{item.year}</span>
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#a3e635", boxShadow: "0 0 0 5px rgba(163,230,53,0.1)" }} />
        </div>
        <div style={{ width: 1, flex: 1, background: "#161616" }} />
      </div>
      <div>{isEven ? textBlock : imageBlock}</div>
    </div>
  );
}

function MobileRow({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ display: "flex", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ease ${index * 0.06}s, transform 0.6s ease ${index * 0.06}s` }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
        <div style={{ width: 1, height: 8, background: "#161616" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#a3e635", flexShrink: 0, boxShadow: "0 0 0 4px rgba(163,230,53,0.1)" }} />
        <div style={{ width: 1, flex: 1, minHeight: 32, background: "#161616" }} />
      </div>
      <div style={{ flex: 1, paddingLeft: 18, paddingBottom: 52, minWidth: 0 }}>
        <p style={{ fontFamily: "Proxima Nova, sans-serif", fontWeight: 900, fontSize: "clamp(3.2rem, 14vw, 4.8rem)", color: "#141414", lineHeight: 1, marginBottom: 16, marginTop: -2 }}>{item.year}</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {item.images.slice(0, 2).map((src, i) => <div key={i} style={{ flex: 1, height: (item.title.includes("TENNIS") || item.title.includes("KPIT")) ? 200 : (item.images.length === 1 ? 200 : 150), overflow: "hidden" }}><TimelineImage src={src} label={`${item.title} ${i + 1}`} /></div>)}
        </div>
        <p style={{ fontFamily: "Proxima Nova, sans-serif", fontWeight: 900, fontSize: "clamp(1rem, 4.8vw, 1.2rem)", color: "#fff", textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: 5, lineHeight: 1.15 }}>{item.title}</p>
        <p style={{ fontFamily: "Proxima Nova, sans-serif", fontWeight: 700, fontSize: "0.65rem", color: "#a3e635", textTransform: "uppercase", letterSpacing: "0.22em", marginBottom: 10 }}>{item.location}</p>
        <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.75, fontFamily: 'Proxima Nova, sans-serif' }}>{item.description}</p>
      </div>
    </div>
  );
}

// ─── PILLARS DATA ─────────────────────────────────────────────────────────────
const PILLARS = [
  {
    number: "01",
    title: "Entrepreneurship",
    body: "Built from scratch. Not from inheritance, not from privilege — from relentless work and a refusal to accept the ordinary. Every business built is a lesson in patience, failure, and what it really means to lead.",
  },
  {
    number: "02",
    title: "Anchoring & Media",
    body: "From regional stages to national broadcasts — the microphone has always been a vehicle for connecting people to ideas bigger than themselves. Every show hosted is an opportunity to shape a narrative that matters.",
  },
  {
    number: "03",
    title: "Motivational Speaking",
    body: "Not the kind that leaves you feeling good for an hour. The kind that rewires how you see your potential. Real talk on ambition, identity, and what it takes to build a life you're proud of.",
  },
];

// ─── SPEAKING TOPICS ──────────────────────────────────────────────────────────
const TOPICS = [
  "The Entrepreneurial Mindset",
  "Building a Personal Brand in India",
  "Resilience — Failing Forward",
  "The Power of Your Story",
  "Leadership Without a Title",
  "Creating Impact Through Content",
  "Financial Independence for Young India",
  "Clarity, Courage & Consistency",
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const S = {
    eyebrow: {
      fontFamily: "Proxima Nova, sans-serif",
      fontWeight: 700,
      fontSize: "0.68rem",
      letterSpacing: "0.25em",
      color: "#2d2d2d",
      textTransform: "uppercase",
      marginBottom: 14,
    },
    h2: {
      fontFamily: "Proxima Nova, sans-serif",
      fontWeight: 900,
      textTransform: "uppercase",
      lineHeight: 0.95,
      letterSpacing: "-0.01em",
      margin: 0,
    },
    body: {
      fontSize: "0.95rem",
      color: "#6b7280",
      lineHeight: 1.8,
      fontFamily: 'Proxima Nova, sans-serif',
    },
    lime: { color: "#a3e635" },
    divider: { width: "100%", height: 1, background: "#111", margin: "0" },
  };

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #a3e635; color: #000; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════════
          1. HERO — SCROLL OPENER
      ══════════════════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: isMobile ? "100px 20px 60px" : "0 8vw",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative background number */}
        <div style={{
          position: "absolute", right: isMobile ? -20 : "5vw", top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "Proxima Nova, sans-serif", fontWeight: 900,
          fontSize: isMobile ? "30vw" : "22vw",
          color: "#080808", lineHeight: 1, userSelect: "none", pointerEvents: "none",
          zIndex: 0,
        }}>
          ✦
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <FadeIn delay={0}>
            <p style={S.eyebrow}>The Story</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{
              ...S.h2,
              fontSize: isMobile ? "clamp(3rem, 14vw, 5rem)" : "clamp(4rem, 7vw, 7rem)",
              marginBottom: 32,
            }}>
              Mentor.<br />
              <span style={S.lime}>Speaker.</span><br />
              Innovator.<br />
              Creator.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ ...S.body, maxWidth: 560, fontSize: "1.05rem" }}>
              Entrepreneur . Creator . Mentor . Three words that don't fully 
              capture the obsession behind them — but they're a start. This is the story 
              of someone who refused to wait for permission, and built something meaningful from nothing.
            </p>
          </FadeIn>
        </div>
      </section>

      <div style={S.divider} />

      {/* ═══════════════════════════════════════════════════════════════════════
          5. ENTREPRENEURSHIP DEEP DIVE
      ══════════════════════════════════════════════════════════════════════════ */}
      {/* <section style={{ padding: isMobile ? "72px 20px" : "100px 8vw", background: "#030303" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80 }}>
            <FadeIn delay={0.05}>
              <p style={S.eyebrow}>Entrepreneurship</p>
              <h2 style={{ ...S.h2, fontSize: isMobile ? "clamp(2.2rem, 9vw, 3rem)" : "clamp(2rem, 3.5vw, 3.2rem)", marginBottom: 28, color: "#fff" }}>
                Built to last.<br />
                <span style={S.lime}>Not just to launch.</span>
              </h2>
              <p style={{ ...S.body, marginBottom: 20 }}>
                Himanish has built and contributed to multiple creative ventures across media, 
                writing, and digital content, each one rooted in a genuine problem worth 
                solving. The approach has never been to chase trends — it's been to identify 
                where real value can be created and go there before the crowd.
              </p>
              <p style={{ ...S.body }}>
                With a focus on storytelling and content creation, he is actively invested 
                in building a creative ecosystem — not just content. Because the real measure of 
                creative success is not reach. It's the number of people whose perspective 
                you help shift along the way.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <ImgPlaceholder height={isMobile ? 260 : 420} label="Business / Venture Photo" />
            </FadeIn>
          </div>
        </div>
      </section>

      <div style={S.divider} /> */}

      

      {/* ═══════════════════════════════════════════════════════════════════════
          9. TIMELINE
      ══════════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#000", padding: isMobile ? "72px 0 100px" : "80px 0 120px", overflowX: "hidden" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "0 20px" : "0 28px" }}>
          <FadeIn>
            <p style={{ ...S.eyebrow, marginBottom: 14 }}>The Journey</p>
            <h2 style={{ ...S.h2, fontSize: isMobile ? "clamp(2.8rem, 13vw, 3.8rem)" : "clamp(3rem, 5.5vw, 5rem)", marginBottom: isMobile ? 48 : 72 }}>
              From Humble<br />
              <span style={S.lime}>Beginnings</span>
            </h2>
          </FadeIn>
          {isMobile
            ? TIMELINE.map((item, i) => <MobileRow key={i} item={item} index={i} />)
            : TIMELINE.map((item, i) => <DesktopRow key={i} item={item} index={i} />)
          }
        </div>
      </section>

      <div style={S.divider} />

      {/* ═══════════════════════════════════════════════════════════════════════
          10. CTA — BOOK / ENQUIRE
      ══════════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "80px 20px" : "120px 8vw", background: "#030303" }}>
        <FadeIn>
          <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, alignItems: "center" }}>
            <div>
              <p style={S.eyebrow}>Work Together</p>
              <h2 style={{ ...S.h2, fontSize: isMobile ? "clamp(2.4rem, 10vw, 3.5rem)" : "clamp(2.5rem, 4vw, 4rem)", marginBottom: 20 }}>
                Ready to bring<br />
                <span style={S.lime}>this energy<br />to your stage?</span>
              </h2>
              <p style={{ ...S.body, marginBottom: 36 }}>
                Whether you're looking for a keynote that moves a room, an anchor who 
                can hold any stage, or an entrepreneur who can speak from the front lines 
                of building something real — let's talk.
              </p>
              <a
                href="/contact"
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
                Send an Enquiry
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>

            {/* What's on offer */}
            <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "#111" }}>
              {[
                { label: "Keynote Speaking", desc: "Corporate events, colleges, summits & conferences" },
                { label: "Event Anchoring", desc: "Television, live events, award nights & launches" },
                { label: "Workshops", desc: "Entrepreneurship, personal branding & leadership" },
                { label: "Brand Collaborations", desc: "Partnerships aligned with impact and authenticity" },
              ].map((offer, i) => (
                <div key={i} style={{ background: "#000", padding: "20px 24px", display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#a3e635", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "Proxima Nova, sans-serif", fontWeight: 900, fontSize: "0.9rem", color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{offer.label}</p>
                    <p style={{ fontSize: "0.78rem", color: "#4b5563", fontFamily: 'Proxima Nova, sans-serif' }}>{offer.desc}</p>
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