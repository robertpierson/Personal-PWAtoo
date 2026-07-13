"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import type { Organization, UserProfile } from "@/lib/db/types";

const NAV = [
  { href: "/dashboard", label: "This week", icon: "home" },
  { href: "/dashboard/approvals", label: "Approvals", icon: "check" },
  { href: "/dashboard/calendar", label: "Calendar", icon: "cal" },
  { href: "/dashboard/designs", label: "Designs", icon: "spark" },
  { href: "/dashboard/insights", label: "Insights", icon: "chart" },
  { href: "/dashboard/website", label: "Website", icon: "globe" },
];

// Account group — billing + config. Gold-tinted, parked at the bottom,
// deliberately set apart from the day-to-day workspace links.
const ACCOUNT = [
  { href: "/dashboard/invoices", label: "Invoices", icon: "receipt" },
  { href: "/dashboard/settings", label: "Settings", icon: "gear" },
];

const ICONS: Record<string, React.ReactNode> = {
  home: <path d="M4 11 12 4l8 7M6 10v9h12v-9" />,
  check: <path d="M5 12.5 10 17l9-10" />,
  cal: <path d="M4 8h16M4 8v11h16V8M4 8V6h16v2M8 4v3M16 4v3" />,
  spark: <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" />,
  chart: <path d="M4 20V5M4 20h16M8 20v-6M12 20v-9M16 20v-4" />,
  globe: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c-3 3-3 15 0 18m0-18c3 3 3 15 0 18M3.5 9h17M3.5 15h17" />,
  receipt: <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3ZM9 8h6M9 12h6" />,
  gear: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 12a8 8 0 0 1 .2-1.8l-2-1.5 2-3.4 2.3 1a8 8 0 0 1 3-1.7l.3-2.5h4l.3 2.5a8 8 0 0 1 3 1.7l2.3-1 2 3.4-2 1.5a8 8 0 0 1 0 3.6l2 1.5-2 3.4-2.3-1a8 8 0 0 1-3 1.7l-.3 2.5h-4l-.3-2.5a8 8 0 0 1-3-1.7l-2.3 1-2-3.4 2-1.5A8 8 0 0 1 4 12Z" />,
};

function NavIcon({ name }: { name: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      {ICONS[name]}
    </svg>
  );
}

function useActive() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
}

function NavLinks({ vertical }: { vertical: boolean }) {
  const isActive = useActive();
  return (
    <>
      {NAV.map((n) => {
        const active = isActive(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2.5 rounded-[var(--r-sm)] text-sm transition ${
              vertical ? "px-3.5 py-2.5" : "shrink-0 px-3.5 py-2"
            } ${
              active
                ? "bg-brick/40 font-medium text-white shadow-[inset_0_0_0_1px_var(--rust-500)]"
                : "text-ash-300 hover:bg-white/5 hover:text-paper"
            }`}
          >
            <NavIcon name={n.icon} />
            {n.label}
          </Link>
        );
      })}
    </>
  );
}

function AccountLinks({ vertical }: { vertical: boolean }) {
  const isActive = useActive();
  return (
    <>
      {ACCOUNT.map((n) => {
        const active = isActive(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2.5 rounded-[var(--r-sm)] text-sm transition ${
              vertical ? "px-3.5 py-2.5" : "shrink-0 px-3.5 py-2"
            } ${
              active
                ? "font-medium text-white shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--gold)_65%,transparent)]"
                : "text-ash-300 hover:text-paper"
            }`}
            style={{
              background: active
                ? "color-mix(in srgb, var(--gold) 16%, transparent)"
                : "color-mix(in srgb, var(--gold) 6%, transparent)",
            }}
          >
            <span style={{ color: "var(--gold)" }}>
              <NavIcon name={n.icon} />
            </span>
            {n.label}
          </Link>
        );
      })}
    </>
  );
}

/** Glass sidebar (desktop) / horizontal glass rail (mobile). */
export function Sidebar({
  org,
  profile,
  demo,
}: {
  org: Organization;
  profile: UserProfile;
  demo: boolean;
}) {
  return (
    <>
      {/* Desktop */}
      <aside className="glass sticky top-4 hidden h-[calc(100dvh-2rem)] w-64 shrink-0 flex-col lg:flex" data-depth="mid" style={{ "--glass-r": "var(--r-lg)" } as React.CSSProperties}>
        <div className="glass-base" aria-hidden />
        <div className="glass-rim" aria-hidden />
        <div className="glass-light" aria-hidden />
        <div className="glass-content flex h-full flex-col p-5">
          <Link href="/" aria-label="Bandana home">
            <Logo size={22} />
          </Link>

          <div className="mt-6 rounded-[var(--r-md)] bg-white/4 p-4">
            <p className="truncate text-sm font-semibold text-white">
              {org.name}
            </p>
            <p className="mt-0.5 truncate text-xs text-ash-300">
              {profile.full_name ?? profile.email} ·{" "}
              {profile.role === "owner" ? "Owner" : "Team"}
            </p>
          </div>

          <nav className="mt-6 flex flex-col gap-1" aria-label="Workspace">
            <NavLinks vertical />
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            {demo && (
              <p className="care-tag rounded-[var(--r-sm)] bg-white/4 px-3 py-2.5">
                Demo workspace — sample data
              </p>
            )}
            <div className="border-t border-white/8 pt-3">
              <p className="care-tag mb-1.5 px-1">Account</p>
              <nav className="flex flex-col gap-1" aria-label="Account">
                <AccountLinks vertical />
              </nav>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile rail */}
      <div className="sticky top-0 z-40 -mx-4 px-4 pb-2 pt-3 lg:hidden">
        <div className="glass" data-depth="mid" style={{ "--glass-r": "var(--r-md)" } as React.CSSProperties}>
          <div className="glass-base" aria-hidden />
          <div className="glass-rim" aria-hidden />
          <div className="glass-content flex items-center gap-1 overflow-x-auto p-2">
            <NavLinks vertical={false} />
            <span className="mx-1 h-6 w-px shrink-0 bg-white/10" aria-hidden />
            <AccountLinks vertical={false} />
          </div>
        </div>
      </div>
    </>
  );
}
