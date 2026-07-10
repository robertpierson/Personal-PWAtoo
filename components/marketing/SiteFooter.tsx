import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CareTag } from "@/components/CareTag";
import { brand } from "@/brand.config";

/** Care-label footer: mono-stamped, stitched top seam. */
export function SiteFooter() {
  return (
    <footer className="border-t border-dashed border-white/15">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo size={24} />
            <p className="care-tag mt-5 leading-relaxed">
              100% organic strategy · machine-built, hand-finished · wash
              cold · do not bleach the brand
            </p>
          </div>

          <nav className="flex gap-14" aria-label="Footer">
            <div className="flex flex-col gap-3">
              <CareTag>Studio</CareTag>
              <Link href="/#how" className="text-sm text-ash-300 hover:text-paper">
                How it works
              </Link>
              <Link href="/work" className="text-sm text-ash-300 hover:text-paper">
                Work
              </Link>
              <Link href="/pricing" className="text-sm text-ash-300 hover:text-paper">
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <CareTag>Crew</CareTag>
              <Link href="/contact" className="text-sm text-ash-300 hover:text-paper">
                Contact
              </Link>
              <Link href="/login" className="text-sm text-ash-300 hover:text-paper">
                Client login
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="care-tag">{brand.promise}</p>
          <p className="care-tag">{brand.name} © 2026</p>
        </div>
      </div>
    </footer>
  );
}
