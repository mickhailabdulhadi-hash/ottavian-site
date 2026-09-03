import { useState, createContext, useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  IconLayout, IconRocket, IconSettings, IconCoin, IconHistory, IconUser,
  IconLogOut, IconX, OttavianMark,
} from "@/lib/icons";
import { LEDGER } from "@/lib/productData";

// Converted from the Figma Make "content" generation's internal
// page-state Sidebar + CreditHistoryDrawer into a real router layout.
// Dashboard / Deploy / DeployConfigure / Settings all render inside this
// via <Outlet />, so the sidebar and drawer stay mounted once instead of
// being redrawn per page.

type DrawerContextValue = { openDrawer: () => void };
const DrawerContext = createContext<DrawerContextValue | null>(null);

// Used by SettingsPage's "View history →" link — same drawer the sidebar opens.
export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used within ProductLayout");
  return ctx;
}

export default function ProductLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <DrawerContext.Provider value={{ openDrawer: () => setDrawerOpen(true) }}>
      <div className="flex h-full w-full" style={{ background: "#131110", fontFamily: "var(--font-inter)", minHeight: "100vh" }}>
        <Sidebar onOpenDrawer={() => setDrawerOpen(true)} />
        <main className="flex-1 overflow-auto" style={{ background: "#131110", padding: "32px" }}>
          <Outlet />
        </main>
        <CreditHistoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    </DrawerContext.Provider>
  );
}

function Sidebar({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  const nav: { href: string; label: string; icon: React.ReactNode; matchPrefix: string }[] = [
    { href: "/dashboard", label: "Dashboard", icon: <IconLayout />, matchPrefix: "/dashboard" },
    { href: "/deploy", label: "Deploy", icon: <IconRocket />, matchPrefix: "/deploy" },
    { href: "/settings", label: "Settings", icon: <IconSettings />, matchPrefix: "/settings" },
  ];

  return (
    <aside className="flex flex-col h-full shrink-0" style={{ width: "240px", background: "#131110", borderRight: "1px solid #2B2521" }}>
      <Link to="/dashboard" className="flex items-center gap-2.5 px-5 py-5" style={{ textDecoration: "none" }}>
        <OttavianMark />
        <span style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "18px", color: "#D8C9B0" }}>Ottavian</span>
      </Link>
      <nav className="flex flex-col gap-1 px-3 mt-1 flex-1">
        {nav.map(({ href, label, icon, matchPrefix }) => {
          const active = location.pathname.startsWith(matchPrefix);
          return (
            <Link
              key={href}
              to={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left w-full relative transition-colors"
              style={{ background: active ? "#1C1815" : "transparent", color: active ? "#D8C9B0" : "#7A6C58", fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "14px", textDecoration: "none" }}
            >
              {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r" style={{ background: "#C56A44" }} />}
              <span className="pl-1">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom cluster */}
      <div className="px-3 pb-5">
        <div style={{ borderTop: "1px solid #2B2521", paddingTop: "20px" }} className="mb-1">
          <div className="flex items-start gap-2.5 p-3 rounded-lg mb-1" style={{ background: "#1C1815" }}>
            <span style={{ color: "#C56A44", marginTop: "2px" }}><IconCoin /></span>
            <div className="flex flex-col gap-0.5">
              <span style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "16px", color: "#D8C9B0" }}>500 credits</span>
              <Link to="/settings" style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "12px", color: "#C56A44", textDecoration: "none" }}>Top up →</Link>
            </div>
          </div>
          <button onClick={onOpenDrawer} className="flex items-center gap-2 w-full px-1 py-1.5 cursor-pointer hover:opacity-80 transition-opacity" style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#7A6C58", background: "none", border: "none", textAlign: "left" }}>
            <IconHistory />Credit history
          </button>
          <button className="flex items-center gap-2 w-full px-1 py-1.5 cursor-pointer hover:opacity-80 transition-opacity" style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#7A6C58", background: "none", border: "none", textAlign: "left" }}>
            <IconUser />Account
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-2 w-full px-1 py-1.5 cursor-pointer hover:opacity-80 transition-opacity" style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#7A6C58", background: "none", border: "none", textAlign: "left" }}>
            <IconLogOut />Sign out
          </button>
        </div>
        <p className="px-1 truncate" style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "12px", color: "#7A6C58" }}>user@example.com</p>
      </div>
    </aside>
  );
}

function CreditHistoryDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
          transition: "opacity 200ms ease", zIndex: 40,
        }}
      />
      {/* Panel */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: "420px",
          background: "#131110", borderLeft: "1px solid #2B2521",
          boxShadow: "-12px 0 40px rgba(0,0,0,0.5)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 240ms cubic-bezier(0.32,0,0.2,1)",
          zIndex: 50, display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5">
          <span style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "20px", color: "#D8C9B0" }}>Credit History</span>
          <button onClick={onClose} className="cursor-pointer flex items-center justify-center w-7 h-7 rounded-md transition-colors"
            style={{ color: "#7A6C58", background: "none", border: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#D8C9B0")}
            onMouseLeave={e => (e.currentTarget.style.color = "#7A6C58")}>
            <IconX size={15} />
          </button>
        </div>

        {/* Summary strip */}
        <div className="mx-6 mb-5 rounded-[10px] p-4 flex items-center" style={{ background: "#1C1815" }}>
          <div className="flex-1 flex flex-col gap-0.5">
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "#7A6C58", letterSpacing: "0.08em" }}>THIS MONTH</span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: "16px", color: "#C56A44" }}>+500 credits</span>
          </div>
          <div style={{ width: "1px", background: "#2B2521", alignSelf: "stretch", margin: "0 16px" }} />
          <div className="flex-1 flex flex-col gap-0.5">
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "#7A6C58", letterSpacing: "0.08em" }}>SPENT</span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: "16px", color: "#7A6C58" }}>–0 credits</span>
          </div>
        </div>

        {/* Ledger */}
        <div className="flex-1 overflow-auto px-6">
          {LEDGER.map((entry, i) => (
            <div key={i} className="flex items-start justify-between py-3.5"
              style={{ borderBottom: i < LEDGER.length - 1 ? "1px solid #2B2521" : "none" }}>
              <div className="flex flex-col gap-0.5">
                <span style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "14px", color: "#D8C9B0" }}>{entry.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "#7A6C58" }}>{entry.date}</span>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: "14px", color: entry.credit ? "#C56A44" : "#7A6C58" }}>
                  {entry.amount}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "#7A6C58" }}>Balance: {entry.balance}</span>
              </div>
            </div>
          ))}

          <div className="flex justify-center pt-5 pb-6">
            <button className="cursor-pointer" style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "13px", color: "#C56A44", background: "none", border: "none" }}>
              Load more
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
