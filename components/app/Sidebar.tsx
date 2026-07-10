"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import type { Organization, UserProfile } from "@/lib/db/types";

const NAV = [
  { href: "/dashboard", label: "This week" },
  { href: "/dashboard/approvals", label: "Approvals" },
  { href: "/dashboard/calendar", label: "Calendar" },
  { href: "/dashboard/designs", label: "Designs" },
  { href: "/dashboard/insights", label: "Insights" },
  { href: "/dashboard/invoices", label: "Invoices" },
  { href: "/dashboard/settings", label: "Settings" },
];

function NavLinks({ vertical }: { vertical: boolean }) {
  const pathname = usePathname();
  return (
    <>
      {NAV.map((n) => {
        const active =
          n.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-[var(--r-sm)] text-sm transition ${
              vertical ? "px-4 py-2.5" : "shrink-0 px-4 py-2"
            } ${
              active
                ? "bg-denim-600/40 font-medium text-white shadow-[inset_0_0_0_1px_var(--denim-500)]"
                : "text-ash-300 hover:bg-white/5 hover:text-paper"
            }`}
          >
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

          <div className="mt-auto">
            {demo && (
              <p className="care-tag rounded-[var(--r-sm)] bg-white/4 px-3 py-2.5">
                Demo workspace — sample data
              </p>
            )}
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
          </div>
        </div>
      </div>
    </>
  );
}
