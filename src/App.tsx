import React from "react";
import sealLogo from "@/imports/Ottavian_Brand_Logo.png";
import wordmarkLogo from "@/imports/Ottavian_Brand_Logo_WordMark_.png";

const C = {
  base: "#131110",
  raised: "#1C1815",
  clay: "#C56A44",
  parchment: "#D8C9B0",
  muted: "#7A6C58",
  line: "#2B2521",
};

const mono: React.CSSProperties = { fontFamily: "JetBrains Mono, monospace" };
const serif: React.CSSProperties = { fontFamily: "Fraunces, serif" };
const sans: React.CSSProperties = { fontFamily: "Inter, sans-serif" };

function Wrap({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        maxWidth: "1160px",
        margin: "0 auto",
        padding: "0 clamp(32px, 5.5vw, 80px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        ...mono,
        fontSize: "10px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: C.clay,
        marginBottom: "20px",
      }}
    >
      {children}
    </p>
  );
}

// ─── Medallion SVG ────────────────────────────────────────────────────────────

function Medallion({ size = 20, color = C.clay }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="2" />
      <circle cx="50" cy="50" r="36" stroke={color} strokeWidth="1" />
      <circle cx="50" cy="50" r="24" stroke={color} strokeWidth="0.8" />
      <path
        d="M50 14 L55 32 L74 32 L59 44 L65 62 L50 50 L35 62 L41 44 L26 32 L45 32 Z"
        fill={color}
      />
      <circle cx="50" cy="50" r="5" fill={color} opacity="0.4" />
    </svg>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav
      style={{
        borderBottom: `1px solid ${C.line}`,
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: C.base,
      }}
    >
      <Wrap
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={sealLogo} alt="Ottavian" style={{ width: "36px", height: "36px", objectFit: "contain", display: "block" }} />
          <span style={{ ...mono, fontSize: "11px", letterSpacing: "0.2em", color: C.parchment, fontWeight: 500 }}>
            OTTAVIAN
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {["Apps", "Docs", "Sign In"].map((label) => (
            <NavLink key={label}>{label}</NavLink>
          ))}
        </div>
      </Wrap>
    </nav>
  );
}

function NavLink({ children }: { children: React.ReactNode }) {
  const [hov, setHov] = React.useState(false);
  return (
    <a
      href="#"
      style={{ ...sans, fontSize: "13px", color: hov ? C.parchment : C.muted, textDecoration: "none", transition: "color 0.15s" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </a>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [hovPrimary, setHovPrimary] = React.useState(false);
  const [hovSecondary, setHovSecondary] = React.useState(false);

  return (
    <section style={{ borderBottom: `1px solid ${C.line}`, position: "relative", overflow: "hidden" }}>
      {/* Watermark seal — hero only */}
      <div
        style={{
          position: "absolute",
          right: "clamp(-80px, 0vw, 60px)",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.13,
          pointerEvents: "none",
          userSelect: "none",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <img src={sealLogo} alt="" style={{ width: "115%", height: "115%", objectFit: "cover", display: "block", marginLeft: "-7.5%", marginTop: "-7.5%" }} />
      </div>

      <Wrap style={{ paddingTop: "clamp(64px, 10vh, 120px)", paddingBottom: "clamp(72px, 11vh, 128px)" }}>
        <div style={{ maxWidth: "640px", position: "relative" }}>
          <h1
            style={{
              ...serif,
              fontWeight: 600,
              fontSize: "clamp(44px, 6vw, 76px)",
              lineHeight: 1.04,
              color: C.parchment,
              letterSpacing: "-0.02em",
              marginBottom: "28px",
            }}
          >
            Run it yourself.
            <br />
            <span style={{ fontStyle: "italic" }}>Answer to no one.</span>
          </h1>

          <p
            style={{
              ...sans,
              fontSize: "16px",
              lineHeight: 1.75,
              color: C.muted,
              maxWidth: "520px",
              marginBottom: "44px",
            }}
          >
            Self-hosting has always meant real technical work — reverse proxies,
            certificates, Docker configs you have to babysit. Ottavian handles
            the infrastructure so you only decide what to run.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap", marginBottom: "22px" }}>
            <a
              href="#"
              style={{
                ...sans,
                fontWeight: 600,
                fontSize: "14px",
                backgroundColor: hovPrimary ? "#d47a54" : C.clay,
                color: C.base,
                padding: "12px 24px",
                textDecoration: "none",
                transition: "background-color 0.15s",
                letterSpacing: "0.01em",
                display: "inline-block",
              }}
              onMouseEnter={() => setHovPrimary(true)}
              onMouseLeave={() => setHovPrimary(false)}
            >
              Claim Your Ground →
            </a>
            <a
              href="#"
              style={{
                ...sans,
                fontSize: "14px",
                color: hovSecondary ? C.parchment : C.muted,
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={() => setHovSecondary(true)}
              onMouseLeave={() => setHovSecondary(false)}
            >
              See how it works
            </a>
          </div>

          <p style={{ ...mono, fontSize: "11px", color: C.muted, letterSpacing: "0.04em" }}>
            an open catalog, ready when you are.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

// ─── Stack diagram ─────────────────────────────────────────────────────────────

function StackDiagram() {
  return (
    <div
      style={{
        backgroundColor: C.raised,
        border: `1px solid ${C.line}`,
        padding: "clamp(48px, 6vw, 72px) clamp(40px, 6vw, 72px)",
        marginTop: "48px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          ...serif,
          fontWeight: 600,
          fontSize: "clamp(26px, 3.2vw, 40px)",
          lineHeight: 1.2,
          color: C.parchment,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        Vaultwarden
        <span style={{ color: C.clay, fontSize: "0.7em", margin: "0 0.35em", fontStyle: "normal" }}>+</span>
        Postgres
        <span style={{ color: C.clay, fontSize: "0.7em", margin: "0 0.35em", fontStyle: "normal" }}>+</span>
        Proxy
      </p>
      <p
        style={{
          ...mono,
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: C.muted,
          marginTop: "20px",
          textTransform: "lowercase",
        }}
      >
        one stack · one deploy
      </p>
    </div>
  );
}

function SectionStack() {
  return (
    <section style={{ borderBottom: `1px solid ${C.line}` }}>
      <Wrap style={{ paddingTop: "clamp(64px, 9vh, 96px)", paddingBottom: "clamp(64px, 9vh, 96px)" }}>
        <SectionLabel>§ I — The Bundle</SectionLabel>
        <div style={{ maxWidth: "640px" }}>
          <h2
            style={{
              ...serif,
              fontWeight: 600,
              fontSize: "clamp(28px, 3.8vw, 44px)",
              lineHeight: 1.12,
              color: C.parchment,
              letterSpacing: "-0.015em",
              marginBottom: "20px",
            }}
          >
            Bundle it once.{" "}
            <span style={{ fontStyle: "italic" }}>Never rewire it again.</span>
          </h2>
          <p style={{ ...sans, fontSize: "15px", lineHeight: 1.72, color: C.muted }}>
            Most self-hosting means gluing services together by hand — networking,
            shared volumes, the parts nobody explains. A stack in Ottavian ships
            pre-wired, as one unit.
          </p>
        </div>
        <StackDiagram />
      </Wrap>
    </section>
  );
}

// ─── Ledger ───────────────────────────────────────────────────────────────────

const apps = [
  { name: "Vaultwarden", category: "SECURITY",    initial: "V", description: "Lightweight, self-hosted Bitwarden-compatible password manager." },
  { name: "Jellyfin",    category: "MEDIA",        initial: "J", description: "Stream your personal media library to any device, no subscription required." },
  { name: "n8n",         category: "AUTOMATION",   initial: "n", description: "Workflow automation with code when you need it, a visual editor when you don't." },
  { name: "Gitea",       category: "DEVELOPMENT",  initial: "G", description: "A painless, self-hosted Git service with issue tracking and CI built in." },
];

function AppCard({ app }: { app: typeof apps[number] }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: hov ? C.raised : C.base,
        border: `1px solid ${hov ? C.clay : C.line}`,
        padding: "28px 28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "background-color 0.2s, border-color 0.2s",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div
          style={{
            width: "38px",
            height: "38px",
            border: `1px solid ${hov ? C.clay : C.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "border-color 0.2s",
          }}
        >
          <span style={{ ...serif, fontWeight: 600, fontSize: "17px", color: hov ? C.clay : C.muted, transition: "color 0.2s", lineHeight: 1 }}>
            {app.initial}
          </span>
        </div>
        <span style={{ ...mono, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: hov ? C.clay : C.muted, transition: "color 0.2s", paddingTop: "2px" }}>
          {app.category}
        </span>
      </div>
      <div>
        <h3 style={{ ...sans, fontWeight: 600, fontSize: "16px", color: C.parchment, marginBottom: "8px", letterSpacing: "-0.01em" }}>
          {app.name}
        </h3>
        <p style={{ ...sans, fontSize: "13px", lineHeight: 1.62, color: C.muted }}>
          {app.description}
        </p>
      </div>
      <div style={{ marginTop: "auto", paddingTop: "8px" }}>
        <a
          href="#"
          style={{ ...mono, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: hov ? C.clay : C.line, textDecoration: "none", transition: "color 0.2s" }}
        >
          Deploy →
        </a>
      </div>
    </div>
  );
}

function SectionLedger() {
  const [hovLink, setHovLink] = React.useState(false);
  return (
    <section style={{ borderBottom: `1px solid ${C.line}` }}>
      <Wrap style={{ paddingTop: "clamp(64px, 9vh, 96px)", paddingBottom: "clamp(64px, 9vh, 96px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "40px" }}>
          <SectionLabel>§ II — The Ledger</SectionLabel>
          <a
            href="#"
            style={{ ...sans, fontSize: "13px", color: hovLink ? C.parchment : C.muted, textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={() => setHovLink(true)}
            onMouseLeave={() => setHovLink(false)}
          >
            View the full ledger →
          </a>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            backgroundColor: C.line,
          }}
        >
          {apps.map((app) => <AppCard key={app.name} app={app} />)}
        </div>
      </Wrap>
    </section>
  );
}

// ─── Ownership ────────────────────────────────────────────────────────────────

function SectionOwnership() {
  return (
    <section style={{ backgroundColor: C.raised, borderBottom: `1px solid ${C.line}` }}>
      <Wrap style={{ paddingTop: "clamp(64px, 9vh, 96px)", paddingBottom: "clamp(64px, 9vh, 96px)" }}>
        <div style={{ maxWidth: "600px" }}>
          <h2
            style={{
              ...serif,
              fontWeight: 600,
              fontStyle: "italic",
              fontSize: "clamp(34px, 5vw, 58px)",
              lineHeight: 1.08,
              color: C.parchment,
              letterSpacing: "-0.02em",
              marginBottom: "22px",
            }}
          >
            Nothing here is on loan.
          </h2>
          <p style={{ ...sans, fontSize: "15px", lineHeight: 1.72, color: C.muted, marginBottom: "32px" }}>
            Export any stack as a standard docker-compose file, any time you like.
            Move it to bare metal, another provider, or a machine under your desk —
            Ottavian doesn't hold it hostage to keep you.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {["Full compose export", "No proprietary format", "No migration fee"].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "4px", height: "4px", backgroundColor: C.clay, flexShrink: 0, display: "inline-block" }} />
                <span style={{ ...mono, fontSize: "11px", letterSpacing: "0.08em", color: C.muted }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
    </section>
  );
}

// ─── Principle quote ──────────────────────────────────────────────────────────

function SectionPrinciple() {
  return (
    <section style={{ borderBottom: `1px solid ${C.line}` }}>
      <Wrap
        style={{
          paddingTop: "clamp(80px, 12vh, 128px)",
          paddingBottom: "clamp(80px, 12vh, 128px)",
          textAlign: "center",
        }}
      >
        <blockquote
          style={{
            ...serif,
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: "clamp(22px, 3.2vw, 40px)",
            lineHeight: 1.35,
            color: C.parchment,
            maxWidth: "760px",
            margin: "0 auto 22px",
            letterSpacing: "-0.01em",
          }}
        >
          "Restraint isn't slowness. It's readiness held in reserve."
        </blockquote>
        <p style={{ ...mono, fontSize: "10px", letterSpacing: "0.14em", color: C.clay, textTransform: "uppercase" }}>
          — OTTAVIAN PRINCIPLE
        </p>
      </Wrap>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}` }}>
      <Wrap
        style={{
          paddingTop: "28px",
          paddingBottom: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src={wordmarkLogo}
          alt="Ottavian"
          style={{ height: "32px", objectFit: "contain", display: "block", opacity: 0.55 }}
        />
        <div style={{ textAlign: "right" }}>
          <p style={{ ...mono, fontSize: "10px", letterSpacing: "0.1em", textTransform: "lowercase", color: C.muted, marginBottom: "4px" }}>
            usage-based · no idle fees
          </p>
          <p style={{ ...sans, fontSize: "12px", color: C.muted }}>
            Run what you own.
          </p>
        </div>
      </Wrap>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ backgroundColor: C.base, color: C.parchment, fontFamily: "Inter, sans-serif" }} className="min-h-full">
      <Nav />
      <Hero />
      <SectionStack />
      <SectionLedger />
      <SectionOwnership />
      <SectionPrinciple />
      <Footer />
    </div>
  );
}
