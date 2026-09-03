import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ottavianLogo from "@/imports/Ottavian_Brand_Logo.png";
import { IconGitHub } from "@/lib/icons";

// Converted from the Figma Make "content" generation's AuthPage.
// Only change: onSignIn now navigate("/dashboard") to close the
// homepage -> signin -> dashboard loop.

function AuthPage({ onSignIn }: { onSignIn: () => void }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const isSignIn = mode === "signin";

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#131110", border: "1px solid #2B2521", borderRadius: "8px",
    padding: "12px", fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px",
    color: "#D8C9B0", outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#7A6C58",
    display: "block", marginBottom: "6px",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full" style={{ background: "#131110", padding: "40px 24px" }}>

      {/* Logo above card */}
      <div className="flex flex-col items-center mb-8">
        <div className="rounded-full overflow-hidden mb-3" style={{ width: "40px", height: "40px" }}>
          <img src={ottavianLogo} alt="Ottavian" style={{ width: "118%", height: "118%", marginTop: "-9%", marginLeft: "-9%", display: "block" }} />
        </div>
        <span style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "18px", color: "#D8C9B0" }}>Ottavian</span>
      </div>

      {/* Auth card */}
      <div style={{ width: "100%", maxWidth: "420px", background: "#1C1815", border: "1px solid #2B2521", borderRadius: "16px", padding: "32px" }}>

        {/* Segmented toggle */}
        <div className="flex p-1 rounded-lg mb-6" style={{ background: "#131110" }}>
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 cursor-pointer transition-all rounded-md"
              style={{
                fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "14px",
                padding: "8px 0",
                background: mode === m ? "#C56A44" : "transparent",
                color: mode === m ? "#131110" : "#7A6C58",
                border: "none",
              }}
            >
              {m === "signin" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        {/* Heading */}
        <div className="mb-5">
          <h1 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "24px", color: "#D8C9B0", marginBottom: "6px" }}>
            {isSignIn ? "Welcome back." : "Claim your ground."}
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "14px", color: "#7A6C58" }}>
            {isSignIn ? "Sign in to manage your deployments." : "Start with 500 free credits. No card required."}
          </p>
        </div>

        {/* Form fields */}
        <div className="flex flex-col" style={{ gap: "16px" }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email" placeholder="you@domain.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#C56A44"; e.currentTarget.style.borderWidth = "1.5px"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#2B2521"; e.currentTarget.style.borderWidth = "1px"; }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
              {isSignIn && (
                <button style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "12px", color: "#C56A44", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                  Forgot password?
                </button>
              )}
            </div>
            <input
              type="password" placeholder="••••••••" value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#C56A44"; e.currentTarget.style.borderWidth = "1.5px"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#2B2521"; e.currentTarget.style.borderWidth = "1px"; }}
            />
          </div>

          {!isSignIn && (
            <div>
              <label style={labelStyle}>Confirm password</label>
              <input
                type="password" placeholder="••••••••" value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#C56A44"; e.currentTarget.style.borderWidth = "1.5px"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#2B2521"; e.currentTarget.style.borderWidth = "1px"; }}
              />
            </div>
          )}
        </div>

        {/* Primary button */}
        <button
          onClick={onSignIn}
          className="w-full cursor-pointer hover:opacity-90 transition-opacity mt-6"
          style={{ background: "#C56A44", color: "#131110", fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "14px", padding: "12px", borderRadius: "8px", border: "none" }}
        >
          {isSignIn ? "Sign in →" : "Create account →"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mt-5">
          <div className="flex-1" style={{ height: "1px", background: "#2B2521" }} />
          <span style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "12px", color: "#7A6C58", background: "#1C1815", padding: "0 8px" }}>or</span>
          <div className="flex-1" style={{ height: "1px", background: "#2B2521" }} />
        </div>

        {/* GitHub button */}
        <button
          className="w-full flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity mt-4"
          style={{ background: "transparent", border: "1px solid #2B2521", color: "#D8C9B0", fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: "14px", padding: "11px", borderRadius: "8px" }}
        >
          <IconGitHub />
          Continue with GitHub
        </button>

        {/* Bottom toggle prompt */}
        <p className="text-center mt-5" style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: "13px", color: "#7A6C58" }}>
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setMode(isSignIn ? "signup" : "signin")}
            style={{ fontFamily: "var(--font-inter)", fontWeight: 500, color: "#C56A44", background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>

      {/* Principle line */}
      <p className="mt-8 text-center" style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "12px", color: "#7A6C58", letterSpacing: "0.1em" }}>
        RESTRAINT ISN'T SLOWNESS. IT'S READINESS HELD IN RESERVE.
      </p>
    </div>
  );
}

export default function SignIn() {
  const navigate = useNavigate();
  return <AuthPage onSignIn={() => navigate("/dashboard")} />;
}
