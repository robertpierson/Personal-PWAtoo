import Link from "next/link";
import { CareTag } from "@/components/CareTag";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { ApprovalCard } from "@/components/app/ApprovalCard";
import { EmptySlot } from "@/components/app/EmptySlot";
import { getOpenApprovals, getWorkspace } from "@/lib/data";
import { brand } from "@/brand.config";

const SPEND = [
  {
    href: "/dashboard/designs",
    label: "Request a design",
    desc: "Social graphic, event flyer, or a full campaign kit.",
    cost: "1–10 credits",
    icon: "✦",
  },
  {
    href: "/dashboard/website",
    label: "Request a website change",
    desc: "A new page, a section, or a refresh — we build it.",
    cost: "5+ credits",
    icon: "◐",
  },
];

/** The signature surface: everything planned, nothing ships unseen. */
export default async function ApprovalsPage() {
  const [approvals, { org }] = await Promise.all([
    getOpenApprovals(),
    getWorkspace(),
  ]);

  return (
    <div className="mx-auto max-w-3xl">
      <CareTag>Approvals</CareTag>
      <h1 className="subhead mt-2">Your queue.</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ash-300">
        {brand.promise} Approve it, or send it back with a note — either
        way it takes seconds.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {approvals.length === 0 && (
          <EmptySlot title="Queue's clear">
            New drafts land here before they ship. You&apos;ll get an email
            the moment one needs you.
          </EmptySlot>
        )}
        {approvals.map(({ approval, item }) => (
          <ApprovalCard key={approval.id} approval={approval} item={item} />
        ))}
      </div>

      {/* Credit nudge — while you're here, put the balance to work */}
      <GlassPanel radius="lg" depth="mid" light className="mt-10" contentClassName="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CareTag>Build credits</CareTag>
            <p className="mt-1.5 text-lg font-semibold text-white">
              You&apos;ve got{" "}
              <span className="tnum" style={{ color: "var(--gold)" }}>
                {org.credits}
              </span>{" "}
              credits to spend.
            </p>
          </div>
          <span
            className="tnum flex items-center gap-2 rounded-[var(--r-pill)] px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
            style={{
              color: "var(--gold)",
              background: "color-mix(in srgb, var(--gold) 14%, transparent)",
              boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--gold) 45%, transparent)",
            }}
          >
            ✦ {org.credits} available
          </span>
        </div>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ash-300">
          They refresh monthly and don&apos;t roll over — while you&apos;re
          approving this week&apos;s posts, think about what else you want built.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {SPEND.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-start gap-3 rounded-[var(--r-md)] p-4 transition hover:bg-white/4"
              style={{ boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--white) 10%, transparent)" }}
            >
              <span className="text-lg" style={{ color: "var(--gold)" }} aria-hidden>
                {s.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-white">{s.label}</span>
                  <span className="text-ash-300 transition group-hover:text-rust-400">→</span>
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-ash-300">{s.desc}</span>
                <span className="care-tag mt-2 block" style={{ color: "var(--gold)" }}>{s.cost}</span>
              </span>
            </Link>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
