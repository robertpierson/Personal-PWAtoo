import Link from "next/link";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { EmptySlot } from "@/components/app/EmptySlot";
import { getInvoices } from "@/lib/data";
import { invoiceStatus } from "@/lib/status";

const PLANS = [
  { name: "Starter", price: 19, credits: 5, line: "Exists, and looks like it." },
  { name: "Growth", price: 59, credits: 15, line: "The whole presence, run for you." },
  { name: "Studio", price: 179, credits: 40, line: "A full marketing team, on call." },
];

const money = (cents: number) =>
  `$${(cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const day = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));

export default async function InvoicesPage() {
  const invoices = await getInvoices();
  const outstanding = invoices
    .filter((i) => i.status === "outstanding")
    .reduce((sum, i) => sum + i.amount_cents, 0);

  return (
    <div className="mx-auto max-w-5xl">
      <CareTag>Invoices</CareTag>
      <h1 className="subhead mt-1.5">Billing, no surprises.</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <GlassPanel radius="lg" depth="near" light className="md:col-span-3" contentClassName="p-6">
          <p className="care-tag">Outstanding balance</p>
          <p className="tnum mt-2 text-5xl font-bold text-white">
            {money(outstanding)}
          </p>
          {outstanding > 0 ? (
            <p className="mt-2 text-sm text-ash-300">
              One open invoice — due{" "}
              {day(
                invoices.find((i) => i.status === "outstanding")!.due_at ??
                  invoices[0].issued_at,
              )}
              .
            </p>
          ) : (
            <p className="mt-2 text-sm" style={{ color: "var(--olive)" }}>
              All settled — nothing owing.
            </p>
          )}
        </GlassPanel>

        <GlassPanel radius="lg" depth="far" className="md:col-span-2" contentClassName="p-6">
          <p className="care-tag">How we bill</p>
          <ul className="mt-3 space-y-2.5 text-sm text-paper">
            <li className="flex gap-2"><span style={{ color: "var(--gold)" }}>✦</span> Direct bank transfer only</li>
            <li className="flex gap-2"><span style={{ color: "var(--gold)" }}>✦</span> Details arrive with each invoice</li>
            <li className="flex gap-2"><span style={{ color: "var(--gold)" }}>✦</span> No card on file, ever</li>
            <li className="flex gap-2"><span style={{ color: "var(--gold)" }}>✦</span> Cancel with one email</li>
          </ul>
        </GlassPanel>
      </div>

      {/* Zero balance — pick or change your plan right here */}
      {outstanding === 0 && (
        <section className="mt-8" aria-label="Choose a plan">
          <CareTag>Choose your plan</CareTag>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ash-300">
            Nothing owing. Pick the plan that fits and we&apos;ll set up
            billing — each plan grants monthly build credits.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {PLANS.map((p) => (
              <GlassPanel
                key={p.name}
                depth="far"
                radius="md"
                contentClassName="flex h-full flex-col p-5"
              >
                <CareTag>{p.name}</CareTag>
                <p className="tnum mt-2 text-3xl font-bold text-white">
                  ${p.price}
                  <span className="text-sm font-medium text-ash-300"> /mo</span>
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--gold)" }}>
                  ✦ {p.credits} build credits monthly
                </p>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-ash-300">
                  {p.line}
                </p>
                <Link href="/pricing" className="btn btn-ghost mt-4 text-xs">
                  See what&apos;s included
                </Link>
              </GlassPanel>
            ))}
          </div>
        </section>
      )}

      {invoices.length === 0 && (
        <EmptySlot title="Invoices" className="mt-8">
          Monthly invoices appear here with their status and payment
          details. Nothing yet — you haven&apos;t been billed.
        </EmptySlot>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {invoices.map((inv) => {
          const status = invoiceStatus[inv.status];
          return (
            <GlassPanel key={inv.id} depth="far" radius="md" contentClassName="flex items-center justify-between gap-4 px-6 py-4">
              <div>
                <p className="text-sm font-medium text-white">
                  Invoice {inv.number}
                </p>
                <p className="tnum mt-0.5 text-xs text-ash-300">
                  Issued {day(inv.issued_at)}
                  {inv.paid_at ? ` · paid ${day(inv.paid_at)}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="tnum text-lg font-semibold text-white">
                  {money(inv.amount_cents)}
                </span>
                <span className={`status-chip ${status.cls}`}>
                  {status.label}
                </span>
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </div>
  );
}
