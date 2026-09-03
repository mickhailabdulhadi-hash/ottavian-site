import type React from "react";

// Ottavian brand tokens — single source of truth.
// Import this in every page instead of redefining colors/fonts locally.
// If a Figma Make session for a new page generated its own copy of these
// values, delete that copy and import from here instead — that's the #1
// cause of pages drifting slightly out of sync with each other.

export const C = {
  base: "#131110",
  raised: "#1C1815",
  clay: "#C56A44",
  parchment: "#D8C9B0",
  muted: "#7A6C58",
  line: "#2B2521",
};

export const mono: React.CSSProperties = { fontFamily: "JetBrains Mono, monospace" };
export const serif: React.CSSProperties = { fontFamily: "Fraunces, serif" };
export const sans: React.CSSProperties = { fontFamily: "Inter, sans-serif" };
