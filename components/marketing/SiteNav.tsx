"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { Logo } from "@/components/Logo";

const LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
];

/** Sticky liquid-glass nav; condenses and intensifies past the hero. */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        el.toggleAttribute("data-scrolled", window.scrollY > 48);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div ref={navRef} className="site-nav group mx-auto max-w-5xl">
        <GlassPanel
          as="nav"
          radius="pill"
          depth="mid"
          refract={false}
          contentClassName="flex items-center justify-between px-6 py-3 transition-[padding] duration-200 group-data-[scrolled]:py-2"
        >
          <Link href="/" aria-label="Bandana home" onClick={() => setOpen(false)}>
            <Logo size={36} className="text-on-dark" />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-on-dark/65 transition-colors hover:text-on-dark"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="text-sm text-on-dark/65 transition-colors hover:text-on-dark"
            >
              Client login
            </Link>
            <Link href="/contact" className="btn btn-primary px-4 py-2 text-sm">
              Contact
            </Link>
          </div>

          <button
            className="care-tag md:hidden"
            style={{ color: "var(--on-dark)" }}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </GlassPanel>

        {open && (
          <GlassPanel
            radius="lg"
            depth="near"
            refract={false}
            className="mt-2 md:hidden"
            contentClassName="flex flex-col gap-1 p-4"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-[var(--r-sm)] px-4 py-3 text-paper transition hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-[var(--r-sm)] px-4 py-3 text-ash-300 transition hover:bg-white/5"
            >
              Client login
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2"
            >
              Contact
            </Link>
          </GlassPanel>
        )}
      </div>
    </div>
  );
}
