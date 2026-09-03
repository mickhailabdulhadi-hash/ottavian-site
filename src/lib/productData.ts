// Shared product data + types, extracted verbatim from the Figma Make
// "content" generation. One source of truth so Deploy, DeployConfigure,
// Dashboard, and Settings all reference the same app catalog / tokens /
// ledger data instead of drifting.

// ─── Data ─────────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "All", "Analytics", "Collaboration", "CMS", "Database", "Dev Tools",
  "Finance", "Media", "Monitoring", "Networking", "Productivity",
  "Security", "Storage",
];

export type App = {
  name: string;
  tagline: string;
  category: string;
  cost: string;
  popular?: boolean;
};

export const APPS: App[] = [
  { name: "Vaultwarden", tagline: "Lightweight Bitwarden-compatible server for self-hosted password management.", category: "Security", cost: "from 8 cr/mo", popular: true },
  { name: "Gitea", tagline: "Self-hosted Git service with a clean UI, CI runners, and low resource footprint.", category: "Dev Tools", cost: "from 12 cr/mo", popular: true },
  { name: "n8n", tagline: "Workflow automation that connects your apps without writing a line of code.", category: "Productivity", cost: "from 20 cr/mo", popular: true },
  { name: "Actual Budget", tagline: "Local-first budgeting app. Track spending, plan budgets, and sync across your own devices.", category: "Finance", cost: "from 6 cr/mo" },
  { name: "Plausible", tagline: "Privacy-friendly web analytics with a simple dashboard and no cookie banner required.", category: "Analytics", cost: "from 10 cr/mo", popular: true },
  { name: "Nextcloud", tagline: "File sync, calendar, contacts, and collaboration under one self-hosted roof.", category: "Collaboration", cost: "from 18 cr/mo" },
  { name: "Grafana", tagline: "Visualize metrics from any source with flexible dashboards and alerting.", category: "Monitoring", cost: "from 14 cr/mo" },
  { name: "Miniflux", tagline: "Minimalist RSS reader that's fast, opinionated, and stays out of your way.", category: "Productivity", cost: "from 5 cr/mo" },
  { name: "Umami", tagline: "Simple, self-hosted analytics with real-time visitor data and no tracking bloat.", category: "Analytics", cost: "from 8 cr/mo" },
  { name: "Ghost", tagline: "Professional publishing platform for newsletters, memberships, and long-form content.", category: "CMS", cost: "from 16 cr/mo", popular: true },
  { name: "Pocketbase", tagline: "Open-source backend in a single file — database, auth, and file storage included.", category: "Database", cost: "from 7 cr/mo" },
  { name: "Uptime Kuma", tagline: "Fancy self-hosted monitoring tool for websites and services with status pages.", category: "Monitoring", cost: "from 5 cr/mo" },
  { name: "Minio", tagline: "S3-compatible object storage you run yourself, ready for any workload.", category: "Storage", cost: "from 10 cr/mo" },
  { name: "Jellyfin", tagline: "Free media server for streaming your music, movies, and TV with no subscription.", category: "Media", cost: "from 14 cr/mo" },
  { name: "Headscale", tagline: "Self-hosted control server for Tailscale-compatible mesh networking.", category: "Networking", cost: "from 6 cr/mo" },
  { name: "Linkding", tagline: "Minimal bookmark manager with tags, full-text search, and browser extension.", category: "Productivity", cost: "from 4 cr/mo" },
];

export const STACKS: App[] = [
  { name: "Dev Workspace", tagline: "Gitea + Drone CI + Minio. A full self-hosted development pipeline, pre-wired.", category: "Dev Tools", cost: "from 38 cr/mo", popular: true },
  { name: "Analytics Suite", tagline: "Plausible + Umami + Grafana. Track web traffic and infrastructure metrics together.", category: "Analytics", cost: "from 30 cr/mo" },
  { name: "Media Server", tagline: "Jellyfin + Navidrome + Minio. Stream music, movies, and store your media library.", category: "Media", cost: "from 28 cr/mo" },
  { name: "Productivity Bundle", tagline: "Nextcloud + Actual Budget + Miniflux. Files, finance, and reading in one stack.", category: "Productivity", cost: "from 26 cr/mo" },
  { name: "Secure Vault", tagline: "Vaultwarden + Headscale + Uptime Kuma. Passwords, private network, and uptime monitoring.", category: "Security", cost: "from 22 cr/mo", popular: true },
  { name: "Publishing Stack", tagline: "Ghost + Plausible + Minio. Write, publish, measure, and host assets yourself.", category: "CMS", cost: "from 32 cr/mo" },
];


// ─── Dashboard page ───────────────────────────────────────────────────────────

export const dashboardInstances = [
  { id: 1, name: "Vaultwarden", subdomain: "vault-keep.ottavian.app", status: "running" as const, resources: "512 MB RAM · 0.5 CPU" },
  { id: 2, name: "Gitea", subdomain: "quiet-forge.ottavian.app", status: "stopped" as const, resources: "1 GB RAM · 1 CPU" },
  { id: 3, name: "n8n", subdomain: "still-harbor.ottavian.app", status: "deploying" as const, resources: "1 GB RAM · 0.5 CPU" },
];

export const RAM_OPTIONS = ["256 MB", "512 MB", "1 GB", "2 GB", "4 GB", "8 GB"];
export const CPU_OPTIONS = ["0.25", "0.5", "1", "2", "4"];
export const STORAGE_STEPS = ["1 GB", "5 GB", "10 GB", "20 GB", "50 GB"];

export const PURCHASE_TIERS = [
  { price: "$5", credits: "500 credits" },
  { price: "$10", credits: "1,000 credits" },
  { price: "$25", credits: "2,500 credits" },
  { price: "$50", credits: "5,000 credits" },
];

export type TokenRow = { name: string; masked: string; created: string; lastUsed: string; expiry: string };

export const TOKENS: TokenRow[] = [
  { name: "my-integration", masked: "sk_live_••••••••3f2a", created: "Created Aug 12, 2026", lastUsed: "Last used 2 days ago", expiry: "Expires: Never" },
  { name: "deploy-hook", masked: "sk_live_••••••••91bc", created: "Created Aug 28, 2026", lastUsed: "Last used 5 hours ago", expiry: "Expires: 30 days" },
  { name: "backup-sync", masked: "sk_live_••••••••e047", created: "Created Jul 3, 2026", lastUsed: "Last used: never", expiry: "Expires: Never" },
];

export type LedgerEntry = { label: string; date: string; amount: string; balance: string; credit: boolean };

export const LEDGER: LedgerEntry[] = [
  { label: "Credit purchase", date: "Sep 1, 2:14 PM", amount: "+1000", balance: "1980", credit: true },
  { label: "Gitea — monthly usage", date: "Aug 31, 12:00 AM", amount: "–12", balance: "980", credit: false },
  { label: "Vaultwarden — monthly usage", date: "Aug 31, 12:00 AM", amount: "–8", balance: "992", credit: false },
  { label: "Signup bonus", date: "Aug 20, 12:52 PM", amount: "+500", balance: "500", credit: true },
];

// Turns an app/stack name into a URL-safe slug for /deploy/:appId routes.
export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
