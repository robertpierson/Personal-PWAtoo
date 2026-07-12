import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { ThemeToggle } from "@/components/app/ThemeToggle";
import { getWorkspace } from "@/lib/data";
import { isDemoMode } from "@/lib/demo";

const inputClass =
  "mt-2 w-full rounded-[var(--r-sm)] border border-white/12 bg-ink-800/70 px-4 py-3 text-sm text-paper outline-none transition focus:border-rust-400";

export default async function SettingsPage() {
  const { org, profile } = await getWorkspace();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <CareTag>Settings</CareTag>
        <h1 className="subhead mt-2">Your setup.</h1>
      </div>

      <GlassPanel radius="lg" depth="mid" contentClassName="p-7">
        <h2 className="text-base font-semibold text-white">Account</h2>
        <label htmlFor="s-name" className="care-tag mt-5 block">
          Name
        </label>
        <input id="s-name" className={inputClass} defaultValue={profile.full_name ?? ""} />
        <label htmlFor="s-email" className="care-tag mt-4 block">
          Email
        </label>
        <input id="s-email" className={inputClass} defaultValue={profile.email} disabled />
      </GlassPanel>

      <GlassPanel radius="lg" depth="mid" contentClassName="p-7">
        <h2 className="text-base font-semibold text-white">Organization</h2>
        <label htmlFor="s-org" className="care-tag mt-5 block">
          Name
        </label>
        <input id="s-org" className={inputClass} defaultValue={org.name} />
        <label htmlFor="s-type" className="care-tag mt-4 block">
          Type
        </label>
        <input id="s-type" className={inputClass} defaultValue={org.org_type ?? ""} />
      </GlassPanel>

      <GlassPanel radius="lg" depth="mid" contentClassName="p-7">
        <h2 className="text-base font-semibold text-white">
          Connected accounts
        </h2>
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-[var(--r-sm)] bg-white/4 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-white">Instagram</p>
              <p className="text-xs text-ash-300">@ridgelinerobotics</p>
            </div>
            <span className="status-chip status-done">Connected</span>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel radius="lg" depth="mid" contentClassName="p-7">
        <h2 className="text-base font-semibold text-white">Payments</h2>
        <div className="mt-5 rounded-[var(--r-sm)] bg-white/4 px-4 py-3">
          <p className="text-sm font-medium text-white">
            Direct bank transfer
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ash-300">
            Invoices arrive with transfer details each month. We don&apos;t
            store card numbers or payment processors on your account —
            there&apos;s nothing here to remove.
          </p>
        </div>
      </GlassPanel>

      <GlassPanel radius="lg" depth="mid" contentClassName="p-7">
        <h2 className="text-base font-semibold text-white">Team access</h2>
        <div className="mt-5 flex items-center justify-between rounded-[var(--r-sm)] bg-white/4 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-white">
              {profile.full_name ?? profile.email}
            </p>
            <p className="text-xs text-ash-300">
              Owner — full access, including invoices and settings
            </p>
          </div>
          <span className="status-chip status-done">Owner</span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ash-300">
          Team members you invite see the calendar and the numbers — never
          invoices or these settings.
        </p>
      </GlassPanel>

      <GlassPanel radius="lg" depth="mid" contentClassName="p-7">
        <h2 className="text-base font-semibold text-white">Appearance</h2>
        <p className="mt-2 text-xs leading-relaxed text-ash-300">
          Applies everywhere, saved on this device.
        </p>
        <div className="mt-4">
          <ThemeToggle />
        </div>
      </GlassPanel>

      <GlassPanel radius="lg" depth="mid" contentClassName="p-7">
        <h2 className="text-base font-semibold text-white">Notifications</h2>
        <div className="mt-5 flex flex-col gap-4">
          {[
            { label: "Email me when posts need approval", on: true },
            { label: "Email me the monthly report", on: true },
            { label: "Text me for same-day approvals", on: false },
          ].map((n) => (
            <label key={n.label} className="flex items-center justify-between gap-4 text-sm text-paper">
              {n.label}
              <input
                type="checkbox"
                defaultChecked={n.on}
                className="h-4 w-4 accent-[var(--rust-500)]"
              />
            </label>
          ))}
        </div>
      </GlassPanel>

      <div className="flex items-center justify-between gap-4">
        {isDemoMode ? (
          <p className="care-tag">Demo workspace — changes aren&apos;t saved</p>
        ) : (
          <span />
        )}
        <button className="btn btn-primary" disabled={isDemoMode}>
          Save changes
        </button>
      </div>
    </div>
  );
}
