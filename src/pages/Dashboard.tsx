import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBadge, StatusDot, IconBell, IconX, IconCoin, IconDots } from "@/lib/icons";
import { dashboardInstances } from "@/lib/productData";

// Converted from the Figma Make "content" generation's DashboardPage.
// Only change from the original: the "Deploy →" and "Browse apps →"
// buttons now navigate("/deploy") instead of doing nothing.

function InstanceCard({ instance }: { instance: (typeof dashboardInstances)[0] }) {
  const textColor = { running: "#4ade80", stopped: "#7A6C58", deploying: "#C56A44" };
  return (
    <div className="flex items-center gap-3 px-4 py-4 rounded-[10px]" style={{ background: "#1C1815", border: "1px solid #2B2521" }}>
      <AppBadge name={instance.name} size={32} />
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "15px", color: "#D8C9B0" }}>{instance.name}</span>
        <span className="truncate" style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "12px", color: "#7A6C58" }}>{instance.subdomain}</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <StatusDot status={instance.status} />
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "12px", color: textColor[instance.status] }}>{instance.status}</span>
      </div>
      <span className="shrink-0 ml-4" style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#7A6C58" }}>{instance.resources}</span>
      <button className="shrink-0 ml-2 cursor-pointer" style={{ color: "#7A6C58", background: "none", border: "none" }}>
        <IconDots />
      </button>
    </div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"instances" | "stacks">("instances");
  const [populated, setPopulated] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "32px", color: "#D8C9B0", lineHeight: 1.15 }}>Dashboard</h1>
          <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#7A6C58", marginTop: "4px" }}>Your infrastructure, at a glance.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {!dismissed && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "#1C1815", border: "1px solid #2B2521" }}>
              <span style={{ color: "#D8C9B0" }}><IconBell /></span>
              <span style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "13px", color: "#D8C9B0" }}>What's new</span>
              <button onClick={() => setDismissed(true)} className="ml-1 cursor-pointer" style={{ color: "#7A6C58", background: "none", border: "none", padding: 0, display: "flex" }}>
                <IconX />
              </button>
            </div>
          )}
          <button onClick={() => navigate("/deploy")} className="cursor-pointer" style={{ background: "#C56A44", color: "#131110", fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "14px", padding: "10px 20px", borderRadius: "8px", border: "none" }}>
            Deploy →
          </button>
        </div>
      </div>

      {/* Stat bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { eyebrow: "RUNNING", value: "0", dot: true },
          { eyebrow: "TOTAL DEPLOYMENTS", value: "0" },
          { eyebrow: "CREDIT BALANCE", value: "500", coin: true },
        ].map(({ eyebrow, value, dot, coin }) => (
          <div key={eyebrow} className="rounded-xl px-5 py-5" style={{ background: "#1C1815", border: "1px solid #2B2521" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "12px", color: "#7A6C58", letterSpacing: "0.1em", marginBottom: "10px" }}>{eyebrow}</p>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "28px", color: "#D8C9B0", lineHeight: 1 }}>{value}</span>
              {dot && <span className="w-2 h-2 rounded-full" style={{ background: "#4ade80" }} />}
              {coin && <span style={{ color: "#C56A44" }}><IconCoin /></span>}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-6" style={{ borderBottom: "1px solid #2B2521" }}>
        {[{ key: "instances", label: "Instances (0)" }, { key: "stacks", label: "Stacks (0)" }].map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab(key as "instances" | "stacks")} className="cursor-pointer"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "14px", color: activeTab === key ? "#D8C9B0" : "#7A6C58", background: "none", border: "none", borderBottom: activeTab === key ? "2px solid #C56A44" : "2px solid transparent", marginBottom: "-1px", padding: "0 0 12px 0" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        <div className="flex justify-end mb-4">
          <button onClick={() => setPopulated(!populated)} className="cursor-pointer"
            style={{ background: "transparent", border: "1px solid #2B2521", color: "#7A6C58", fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "12px", padding: "4px 12px", borderRadius: "6px" }}>
            {populated ? "Show empty state" : "Show populated state"}
          </button>
        </div>
        {!populated ? (
          <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: "380px", gap: "16px" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#1C1815" }}>
              <span style={{ color: "#7A6C58" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="5" rx="1" /><rect x="2" y="10" width="20" height="5" rx="1" /><rect x="2" y="17" width="20" height="5" rx="1" />
                </svg>
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "20px", color: "#D8C9B0" }}>Nothing deployed yet.</h2>
              <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#7A6C58", maxWidth: "340px" }}>Pick an app from the catalog and Ottavian handles the rest.</p>
            </div>
            <button onClick={() => navigate("/deploy")} className="cursor-pointer hover:opacity-80 transition-opacity" style={{ background: "transparent", border: "1px solid #2B2521", color: "#D8C9B0", fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "14px", padding: "10px 20px", borderRadius: "8px", marginTop: "4px" }}>
              Browse apps →
            </button>
          </div>
        ) : (
          <div className="flex flex-col" style={{ gap: "12px" }}>
            {dashboardInstances.map((i) => <InstanceCard key={i.id} instance={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardPage />;
}
