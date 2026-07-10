import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { getInvoices } from "@/lib/data";
import { invoiceStatus } from "@/lib/status";

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
    <div className="mx-auto max-w-3xl">
      <CareTag>Invoices</CareTag>
      <h1 className="subhead mt-2">Billing, no surprises.</h1>

      <GlassPanel radius="lg" depth="near" className="mt-8" contentClassName="p-6">
        <p className="care-tag">Outstanding balance</p>
        <p className="tnum mt-2 text-5xl font-bold text-white">
          {money(outstanding)}
        </p>
        {outstanding > 0 && (
          <p className="mt-2 text-sm text-ash-300">
            One open invoice — due{" "}
            {day(
              invoices.find((i) => i.status === "outstanding")!.due_at ??
                invoices[0].issued_at,
            )}
            .
          </p>
        )}
      </GlassPanel>

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
