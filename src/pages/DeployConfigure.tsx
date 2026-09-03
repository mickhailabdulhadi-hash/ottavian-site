import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconRefresh, IconChevronDown, IconHelp, IconTerminal, IconArrowLeft, IconCoin } from "@/lib/icons";
import { App, APPS, STACKS, slugify, RAM_OPTIONS, CPU_OPTIONS, STORAGE_STEPS } from "@/lib/productData";

// Converted from the Figma Make "content" generation's DeployConfigPage.
// `app` is now looked up from the :appId route param instead of being
// passed in from a parent page-switcher; onBack -> navigate("/deploy");
// the "Deploy →" button -> navigate("/dashboard") to close the loop.

function ResourcePill({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer transition-all shrink-0"
      style={{
        fontFamily: "var(--font-inter)", fontWeight: selected ? 500 : 400, fontSize: "13px",
        padding: "5px 14px", borderRadius: "999px",
        background: selected ? "rgba(197,106,68,0.10)" : "#131110",
        color: selected ? "#C56A44" : "#7A6C58",
        border: selected ? "1.5px solid #C56A44" : "1px solid #2B2521",
      }}
    >
      {label}
    </button>
  );
}

function StorageSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const pct = (value / (STORAGE_STEPS.length - 1)) * 100;
  return (
    <div className="w-full">
      {/* Label above handle */}
      <div className="relative mb-2" style={{ height: "20px" }}>
        <div
          className="absolute -translate-x-1/2 flex items-center justify-center"
          style={{ left: `${pct}%` }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: "11px", color: "#C56A44", background: "rgba(197,106,68,0.12)", border: "1px solid rgba(197,106,68,0.25)", borderRadius: "4px", padding: "1px 6px" }}>
            {STORAGE_STEPS[value]}
          </span>
        </div>
      </div>

      {/* Track + input */}
      <div className="relative flex items-center" style={{ height: "20px" }}>
        {/* Track background */}
        <div className="absolute w-full rounded-full" style={{ height: "3px", background: "#2B2521" }} />
        {/* Filled portion */}
        <div className="absolute rounded-full" style={{ height: "3px", width: `${pct}%`, background: "#C56A44" }} />
        <input
          type="range" min={0} max={STORAGE_STEPS.length - 1} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full cursor-pointer"
          style={{ opacity: 0, height: "20px", margin: 0 }}
        />
        {/* Visual handle */}
        <div
          className="absolute -translate-x-1/2 rounded-full pointer-events-none"
          style={{ left: `${pct}%`, width: "14px", height: "14px", background: "#C56A44", border: "2px solid #131110", boxShadow: "0 0 0 1.5px #C56A44" }}
        />
      </div>

      {/* Tick labels */}
      <div className="flex justify-between mt-2">
        {STORAGE_STEPS.map((s) => (
          <span key={s} style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "10px", color: "#7A6C58" }}>{s}</span>
        ))}
      </div>

      <button className="mt-1 cursor-pointer" style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "12px", color: "#C56A44", background: "none", border: "none", padding: 0 }}>
        + Custom
      </button>
    </div>
  );
}

type ConfigTab = "configure" | "domains" | "advanced";

function ConfigureTab({
  subdomain, setSubdomain, ram, setRam, cpu, setCpu, storage, setStorage,
}: {
  subdomain: string; setSubdomain: (v: string) => void;
  ram: string; setRam: (v: string) => void;
  cpu: string; setCpu: (v: string) => void;
  storage: number; setStorage: (v: number) => void;
}) {
  const labelStyle = { fontFamily: "var(--font-inter)" as const, fontWeight: 400, fontSize: "13px", color: "#7A6C58" };
  const valueStyle = { fontFamily: "var(--font-inter)" as const, fontWeight: 500, fontSize: "14px", color: "#D8C9B0" };
  const dividerStyle = { borderTop: "1px solid #2B2521", margin: "24px 0" };
  const sectionLabel = { fontFamily: "var(--font-fraunces)" as const, fontWeight: 600, fontSize: "15px", color: "#D8C9B0", marginBottom: "16px" };
  const rowLabel = { fontFamily: "var(--font-inter)" as const, fontWeight: 400, fontSize: "13px", color: "#7A6C58", minWidth: "100px", paddingTop: "6px" };

  return (
    <div className="rounded-xl" style={{ background: "#1C1815", border: "1px solid #2B2521", padding: "32px" }}>
      {/* Section: App */}
      <p style={sectionLabel}>App</p>

      <div className="flex items-baseline justify-between mb-3">
        <span style={labelStyle}>App</span>
        <span style={valueStyle}>Vaultwarden</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <span style={rowLabel}>Subdomain</span>
        <div className="flex-1 flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <input
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              style={{
                fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "14px", color: "#D8C9B0",
                background: "#131110", border: "1px solid #2B2521", borderRadius: "6px",
                padding: "6px 10px", outline: "none", width: "160px",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#C56A44"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#2B2521"; }}
            />
            <button className="cursor-pointer" style={{ color: "#C56A44", background: "none", border: "none", display: "flex", padding: 0 }}>
              <IconRefresh />
            </button>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "#7A6C58" }}>
            {subdomain}.ottavian.app
          </span>
        </div>
      </div>

      <div style={dividerStyle} />

      {/* Section: Resources */}
      <p style={sectionLabel}>Resources</p>

      <div className="flex items-start gap-6 mb-5">
        <span style={{ ...rowLabel, paddingTop: "6px" }}>RAM</span>
        <div className="flex flex-wrap gap-2">
          {RAM_OPTIONS.map((o) => <ResourcePill key={o} label={o} selected={ram === o} onClick={() => setRam(o)} />)}
          <ResourcePill label="+ Custom" selected={false} onClick={() => {}} />
        </div>
      </div>

      <div className="flex items-start gap-6 mb-5">
        <span style={{ ...rowLabel, paddingTop: "6px" }}>CPU</span>
        <div className="flex flex-wrap gap-2">
          {CPU_OPTIONS.map((o) => <ResourcePill key={o} label={o} selected={cpu === o} onClick={() => setCpu(o)} />)}
          <ResourcePill label="+ Custom cores" selected={false} onClick={() => {}} />
        </div>
      </div>

      <div className="flex items-start gap-6">
        <span style={{ ...rowLabel, paddingTop: "0px" }}>Storage</span>
        <div className="flex-1">
          <StorageSlider value={storage} onChange={setStorage} />
        </div>
      </div>

      <div style={dividerStyle} />

      {/* Section: Backup & Region */}
      <p style={sectionLabel}>Backup & Region</p>

      <div className="flex items-center justify-between mb-4">
        <span style={labelStyle}>Backup tier</span>
        <div className="relative flex items-center">
          <select
            defaultValue="basic"
            style={{ appearance: "none" as const, fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#D8C9B0", background: "#131110", border: "1px solid #2B2521", borderRadius: "8px", padding: "7px 32px 7px 12px", outline: "none", cursor: "pointer" }}
          >
            <option value="basic">Basic — No backup</option>
            <option value="daily">Daily snapshots</option>
            <option value="hourly">Hourly snapshots</option>
          </select>
          <span className="absolute right-2.5 pointer-events-none" style={{ color: "#7A6C58" }}><IconChevronDown /></span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span style={labelStyle}>Region</span>
        <div className="relative flex items-center">
          <select
            defaultValue=""
            style={{ appearance: "none" as const, fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#7A6C58", background: "#131110", border: "1px solid #2B2521", borderRadius: "8px", padding: "7px 32px 7px 12px", outline: "none", cursor: "pointer" }}
          >
            <option value="" disabled>Select a region</option>
            <option value="us-east">US East</option>
            <option value="eu-west">EU West</option>
            <option value="ap-south">AP South</option>
          </select>
          <span className="absolute right-2.5 pointer-events-none" style={{ color: "#7A6C58" }}><IconChevronDown /></span>
        </div>
      </div>
    </div>
  );
}

function DomainsTab() {
  const [domain, setDomain] = useState("");
  return (
    <div>
      <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#7A6C58", lineHeight: 1.6, maxWidth: "560px", marginBottom: "20px" }}>
        Every deployment gets a subdomain and free HTTPS automatically. Add your own domain and Ottavian issues and renews the certificate for you — no extra steps.
      </p>
      <div className="rounded-xl" style={{ background: "#1C1815", border: "1px solid #2B2521", padding: "24px" }}>
        <div className="flex items-center gap-2 mb-1">
          <span style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "14px", color: "#D8C9B0" }}>Custom Domains</span>
          <span style={{ color: "#7A6C58" }}><IconHelp /></span>
        </div>
        <p className="mb-5" style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#7A6C58" }}>
          No custom domains yet. Your app is live at vault-keep.ottavian.app
        </p>
        <div className="flex items-center gap-3 mb-3">
          <input
            type="text" placeholder="yourdomain.com" value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#D8C9B0", background: "#131110", border: "1px solid #2B2521", borderRadius: "8px", padding: "9px 12px", outline: "none" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#C56A44"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#2B2521"; }}
          />
          <button
            className="cursor-pointer shrink-0"
            style={{ background: "#C56A44", color: "#131110", fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "14px", padding: "9px 20px", borderRadius: "8px", border: "none" }}
          >
            Add
          </button>
        </div>
        <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "12px", color: "#7A6C58" }}>
          DNS changes can take up to 24 hours to propagate.
        </p>
      </div>
    </div>
  );
}

function AdvancedTab() {
  return (
    <div className="rounded-xl" style={{ background: "#1C1815", border: "1px solid #2B2521", padding: "24px" }}>
      <p className="mb-1" style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "14px", color: "#D8C9B0" }}>Environment Variables</p>
      <p className="mb-6" style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#7A6C58" }}>
        Override any auto-configured variable. Leave blank to use Ottavian's default.
      </p>
      <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: "120px", gap: "12px" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#131110" }}>
          <span style={{ color: "#7A6C58" }}><IconTerminal /></span>
        </div>
        <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#7A6C58", maxWidth: "380px", lineHeight: 1.55 }}>
          This app has no environment variables to configure — it just works.
        </p>
      </div>
    </div>
  );
}

function DeployConfigPage({ app, onBack, onDeployComplete }: { app: App; onBack: () => void; onDeployComplete: () => void }) {
  const [tab, setTab] = useState<ConfigTab>("configure");
  const [subdomain, setSubdomain] = useState(slugify(app.name));
  const [ram, setRam] = useState("512 MB");
  const [cpu, setCpu] = useState("0.5");
  const [storage, setStorage] = useState(0);

  const tabs: { key: ConfigTab; label: string }[] = [
    { key: "configure", label: "Configure" },
    { key: "domains", label: "Domains" },
    { key: "advanced", label: "Advanced" },
  ];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* Persistent header */}
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 cursor-pointer mb-2 hover:opacity-70 transition-opacity"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#7A6C58", background: "none", border: "none", padding: 0 }}
          >
            <IconArrowLeft />
            ← Back
          </button>
          <h1 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "24px", color: "#D8C9B0", lineHeight: 1.2 }}>{app.name}</h1>
          <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#7A6C58", marginTop: "3px" }}>Configure your deployment</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {/* Subdomain + live cost pill */}
          <div className="flex flex-col items-end gap-1.5">
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "13px", color: "#7A6C58" }}>
              {subdomain}.ottavian.app
            </span>
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{ background: "#1C1815", border: "1px solid #C56A44" }}
            >
              <IconCoin size={12} />
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: "14px", color: "#C56A44" }}>
                12 credits/mo
              </span>
            </div>
          </div>
          <button
            onClick={onDeployComplete}
            className="cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: "#C56A44", color: "#131110", fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "14px", padding: "10px 20px", borderRadius: "8px", border: "none" }}
          >
            Deploy →
          </button>
        </div>
      </div>

      {/* Tab row */}
      <div className="flex gap-6 mb-6" style={{ borderBottom: "1px solid #2B2521" }}>
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="cursor-pointer"
            style={{
              fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "14px",
              color: tab === key ? "#D8C9B0" : "#7A6C58",
              background: "none", border: "none",
              borderBottom: tab === key ? "2px solid #C56A44" : "2px solid transparent",
              marginBottom: "-1px", padding: "0 0 12px 0",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "configure" && (
        <ConfigureTab
          subdomain={subdomain} setSubdomain={setSubdomain}
          ram={ram} setRam={setRam}
          cpu={cpu} setCpu={setCpu}
          storage={storage} setStorage={setStorage}
        />
      )}
      {tab === "domains" && <DomainsTab />}
      {tab === "advanced" && <AdvancedTab />}
    </div>
  );
}

export default function DeployConfigure() {
  const { appId } = useParams();
  const navigate = useNavigate();
  const app = [...APPS, ...STACKS].find((a) => slugify(a.name) === appId);

  if (!app) {
    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", paddingTop: "80px" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#7A6C58" }}>
          That app isn't in the catalog.{" "}
          <button onClick={() => navigate("/deploy")} style={{ color: "#C56A44", background: "none", border: "none", cursor: "pointer" }}>
            Back to Deploy →
          </button>
        </p>
      </div>
    );
  }

  return <DeployConfigPage app={app} onBack={() => navigate("/deploy")} onDeployComplete={() => navigate("/dashboard")} />;
}
