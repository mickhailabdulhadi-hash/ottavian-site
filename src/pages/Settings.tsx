import { useState } from "react";
import { IconCoin, IconKey, IconChevronDown, IconCopy } from "@/lib/icons";
import { PURCHASE_TIERS, TOKENS, TokenRow as TokenRowType } from "@/lib/productData";
import { useDrawer } from "@/lib/ProductLayout";

// Converted from the Figma Make "content" generation's SettingsPage.
// Only change: onOpenDrawer comes from the shared drawer context
// (useDrawer) instead of a prop threaded down from a parent
// page-switcher — same Credit History drawer the sidebar opens.

function SettingsPage({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  const [selectedTier, setSelectedTier] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [showTokens] = useState(true);

  const cardStyle = { background: "#1C1815", border: "1px solid #2B2521", borderRadius: "12px", padding: "28px" };
  const subtext = { fontFamily: "var(--font-inter)" as const, fontWeight: 400, fontSize: "13px", color: "#7A6C58", lineHeight: 1.55 };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "28px", color: "#D8C9B0" }}>Settings</h1>
        <p style={{ ...subtext, fontSize: "14px", marginTop: "4px" }}>Manage billing and developer access.</p>
      </div>

      {/* Card 1: Billing */}
      <div style={{ ...cardStyle, marginBottom: "24px" }}>
        <div className="flex items-center gap-2 mb-1">
          <span style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "18px", color: "#D8C9B0" }}>Billing</span>
          <span style={{ color: "#C56A44" }}><IconCoin size={15} /></span>
        </div>
        <div className="flex items-center justify-between mb-5">
          <p style={subtext}>1 USD = 100 credits. Credits cover monthly instance usage.</p>
          <button onClick={onOpenDrawer} className="cursor-pointer shrink-0 ml-6" style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#C56A44", background: "none", border: "none", padding: 0 }}>
            View history →
          </button>
        </div>

        {/* Purchase tier cards */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          {PURCHASE_TIERS.map((tier, i) => {
            const sel = selectedTier === i;
            return (
              <button
                key={tier.price}
                onClick={() => setSelectedTier(i)}
                className="flex flex-col items-center cursor-pointer transition-all rounded-[10px]"
                style={{
                  padding: "20px 12px",
                  background: sel ? "rgba(197,106,68,0.08)" : "#131110",
                  border: sel ? "2px solid #C56A44" : "1.5px solid #2B2521",
                }}
              >
                <span style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "22px", color: sel ? "#C56A44" : "#D8C9B0", lineHeight: 1.2 }}>{tier.price}</span>
                <span style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#7A6C58", marginTop: "4px" }}>{tier.credits}</span>
              </button>
            );
          })}
        </div>

        <p style={{ ...subtext, marginBottom: "16px" }}>You'll have 1,000 credits after this purchase.</p>

        <button className="cursor-pointer hover:opacity-90 transition-opacity"
          style={{ background: "#C56A44", color: "#131110", fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "14px", padding: "10px 24px", borderRadius: "8px", border: "none" }}>
          Purchase →
        </button>
      </div>

      {/* Card 2: Developer */}
      <div style={cardStyle}>
        <div className="flex items-center gap-2 mb-1">
          <span style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "18px", color: "#D8C9B0" }}>Developer</span>
          <span style={{ color: "#C56A44" }}><IconKey /></span>
        </div>
        <p style={{ ...subtext, marginBottom: "20px" }}>
          Generate tokens to let third-party services call the Ottavian API on your behalf. Tokens are shown once — copy them immediately.
        </p>

        {/* Create token row */}
        <div className="flex items-center gap-2">
          <input
            type="text" placeholder="Token name (e.g. my-integration)" value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="flex-1"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#D8C9B0", background: "#131110", border: "1px solid #2B2521", borderRadius: "8px", padding: "9px 12px", outline: "none" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#C56A44"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#2B2521"; }}
          />
          <div className="relative shrink-0">
            <select defaultValue="never" style={{ appearance: "none" as const, fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#D8C9B0", background: "#131110", border: "1px solid #2B2521", borderRadius: "8px", padding: "9px 28px 9px 12px", outline: "none", cursor: "pointer" }}>
              <option value="never">Never</option>
              <option value="30d">30 days</option>
              <option value="90d">90 days</option>
              <option value="1y">1 year</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#7A6C58" }}><IconChevronDown /></span>
          </div>
          <button className="cursor-pointer shrink-0 hover:opacity-90 transition-opacity"
            style={{ background: "#C56A44", color: "#131110", fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "14px", padding: "9px 20px", borderRadius: "8px", border: "none" }}>
            Generate
          </button>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #2B2521", margin: "20px 0 16px" }} />

        {/* Sub-label */}
        <p style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "#7A6C58", letterSpacing: "0.08em", marginBottom: "12px" }}>ACTIVE TOKENS</p>

        {showTokens ? (
          <div className="flex flex-col gap-2">
            {TOKENS.map((token) => (
              <TokenRow key={token.name} token={token} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center text-center py-8 gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#131110" }}>
              <span style={{ color: "#7A6C58" }}><IconKey /></span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#7A6C58", maxWidth: "320px", lineHeight: 1.55 }}>
              No tokens yet. Generate one above to connect an integration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TokenRow({ token }: { token: TokenRowType }) {
  const [hoveringRevoke, setHoveringRevoke] = useState(false);
  return (
    <div className="flex items-center gap-4 rounded-lg px-4 py-3.5" style={{ background: "#131110", border: "1px solid #2B2521" }}>
      {/* Name + masked */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "14px", color: "#D8C9B0" }}>{token.name}</span>
        <div className="flex items-center gap-1.5">
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "12px", color: "#7A6C58" }}>{token.masked}</span>
          <button className="cursor-pointer" style={{ color: "#7A6C58", background: "none", border: "none", padding: 0, display: "flex" }}>
            <IconCopy />
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-0.5 shrink-0">
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "#7A6C58" }}>{token.created}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "#7A6C58" }}>{token.lastUsed}</span>
      </div>

      {/* Expiry pill */}
      <span className="shrink-0 px-2 py-0.5 rounded" style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "#7A6C58", background: "#1C1815" }}>
        {token.expiry}
      </span>

      {/* Revoke */}
      <button
        className="cursor-pointer shrink-0 transition-colors"
        onMouseEnter={() => setHoveringRevoke(true)}
        onMouseLeave={() => setHoveringRevoke(false)}
        style={{
          fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "13px",
          color: hoveringRevoke ? "#8C4A3A" : "#7A6C58",
          background: "transparent",
          border: `1px solid ${hoveringRevoke ? "#8C4A3A" : "#2B2521"}`,
          borderRadius: "6px", padding: "4px 10px",
        }}
      >
        Revoke
      </button>
    </div>
  );
}

export default function Settings() {
  const { openDrawer } = useDrawer();
  return <SettingsPage onOpenDrawer={openDrawer} />;
}
