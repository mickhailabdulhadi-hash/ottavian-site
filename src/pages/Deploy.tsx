import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppBadge, IconCoin, IconRocket, IconStack, IconSearch, IconX } from "@/lib/icons";
import { App, CATEGORIES, APPS, STACKS, slugify } from "@/lib/productData";

// Converted from the Figma Make "content" generation's DeployPage.
// Only change: onDeploy now navigates("/deploy/:slug") instead of lifting
// state up to a parent page-switcher.

function AppCard({ app, onDeploy }: { app: App; onDeploy?: (app: App) => void }) {
  return (
    <div
      className="flex flex-col rounded-xl"
      style={{ background: "#1C1815", border: "1px solid #2B2521", padding: "20px" }}
    >
      <div className="flex items-start gap-3 mb-3">
        <AppBadge name={app.name} size={40} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "15px", color: "#D8C9B0", lineHeight: 1.3 }}>{app.name}</span>
            {app.popular && (
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "10px", color: "#C56A44", background: "rgba(197,106,68,0.12)", border: "1px solid rgba(197,106,68,0.22)", borderRadius: "4px", padding: "1px 6px", letterSpacing: "0.06em" }}>
                POPULAR
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 mt-1" style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "#7A6C58" }}>
            <IconCoin size={11} />
            {app.cost}
          </span>
        </div>
      </div>
      <p
        className="flex-1 mb-4"
        style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#7A6C58", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {app.tagline}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDeploy?.(app)}
          className="cursor-pointer transition-opacity hover:opacity-90 flex-1"
          style={{ background: "#C56A44", color: "#131110", fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "13px", padding: "8px 0", borderRadius: "7px", border: "none", textAlign: "center" }}
        >
          Deploy →
        </button>
        <button
          className="cursor-pointer transition-opacity hover:opacity-70 shrink-0"
          style={{ background: "transparent", border: "1px solid #2B2521", color: "#D8C9B0", fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "13px", padding: "8px 14px", borderRadius: "7px" }}
        >
          + Stack
        </button>
      </div>
    </div>
  );
}

// ─── Deploy page ──────────────────────────────────────────────────────────────

function DeployPage({ onDeploy }: { onDeploy: (app: App) => void }) {
  const [mode, setMode] = useState<"apps" | "stacks">("apps");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const pillRowRef = useRef<HTMLDivElement>(null);

  const catalog = mode === "apps" ? APPS : STACKS;

  const filtered = catalog.filter((a) => {
    const matchCat = category === "All" || a.category === category;
    const q = search.toLowerCase();
    const matchSearch = !q || a.name.toLowerCase().includes(q) || a.tagline.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const totalCount = mode === "apps" ? "60+" : "24";

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "32px", color: "#D8C9B0", lineHeight: 1.15 }}>Deploy</h1>
        <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#7A6C58", marginTop: "4px" }}>
          Browse {totalCount} self-hostable apps and curated stacks.
        </p>
      </div>

      {/* Segmented toggle — above search */}
      <div className="flex items-center gap-1 p-1 rounded-[10px] w-fit mb-5" style={{ background: "#1C1815", border: "1px solid #2B2521" }}>
        {[
          { key: "apps", label: "Single Apps", icon: <IconRocket />, iconMargin: "5px" },
          { key: "stacks", label: "Ready-Made Stacks", icon: <IconStack />, iconMargin: undefined },
        ].map(({ key, label, icon, iconMargin }) => (
          <button
            key={key}
            onClick={() => { setMode(key as "apps" | "stacks"); setCategory("All"); setSearch(""); }}
            className="flex items-center gap-2 cursor-pointer transition-all rounded-lg"
            style={{
              fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "13px",
              padding: "7px 14px",
              background: mode === key ? "#C56A44" : "transparent",
              color: mode === key ? "#131110" : "#7A6C58",
              border: "none",
            }}
          >
            <span style={{ opacity: mode === key ? 1 : 0.7, margin: iconMargin }}>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#7A6C58", pointerEvents: "none" }}>
          <IconSearch />
        </span>
        <input
          type="text"
          placeholder={`Search ${totalCount} apps…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
          style={{
            background: "#1C1815", border: "1px solid #2B2521", borderRadius: "8px",
            padding: "10px 14px 10px 38px",
            fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px",
            color: "#D8C9B0", outline: "none",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#C56A44"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#2B2521"; }}
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: "#7A6C58", background: "none", border: "none", display: "flex" }}>
            <IconX size={13} />
          </button>
        )}
      </div>

      {/* Category pills — single scrollable row */}
      <div
        ref={pillRowRef}
        className="flex gap-2 mb-6 pb-0.5"
        style={{ overflowX: "auto", scrollbarWidth: "none" }}
      >
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="shrink-0 cursor-pointer transition-all"
              style={{
                fontFamily: "var(--font-inter)", fontWeight: active ? 500 : 400, fontSize: "13px",
                padding: "5px 13px", borderRadius: "999px",
                background: active ? "#C56A44" : "transparent",
                color: active ? "#131110" : "#7A6C58",
                border: active ? "1px solid #C56A44" : "1px solid #2B2521",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="mb-5" style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "12px", color: "#7A6C58", letterSpacing: "0.06em" }}>
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
        {category !== "All" && ` in ${category}`}
        {search && ` for "${search}"`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {filtered.map((app) => <AppCard key={app.name} app={app} onDeploy={onDeploy} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: "300px", gap: "12px" }}>
          <span style={{ color: "#7A6C58" }}><IconSearch /></span>
          <p style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "18px", color: "#D8C9B0" }}>No apps found.</p>
          <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#7A6C58" }}>Try a different search or category.</p>
          <button onClick={() => { setSearch(""); setCategory("All"); }} className="cursor-pointer"
            style={{ background: "transparent", border: "1px solid #2B2521", color: "#D8C9B0", fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "13px", padding: "8px 16px", borderRadius: "8px", marginTop: "4px" }}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function Deploy() {
  const navigate = useNavigate();
  return <DeployPage onDeploy={(app) => navigate(`/deploy/${slugify(app.name)}`)} />;
}
