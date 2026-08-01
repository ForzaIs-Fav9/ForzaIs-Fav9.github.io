"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/content";
import { commandPalette } from "@/lib/command-palette";

function useModifierKey() {
  const [isMac, setIsMac] = useState(true);
  useEffect(() => {
    const platform =
      (navigator as unknown as { userAgentData?: { platform: string } }).userAgentData?.platform
      ?? navigator.platform;
    setIsMac(/Mac|iPhone|iPad/i.test(platform));
  }, []);
  return isMac ? "⌘" : "Ctrl ";
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const modifier = useModifierKey();

  return (
    <header className="fixed top-0 z-50 w-full glass">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg font-semibold text-text-primary transition-colors hover:text-accent"
        >
          HV
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-1 -bottom-px h-px bg-accent"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            onClick={commandPalette.open}
            className="ml-3 flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-text-tertiary transition-colors hover:border-accent/30 hover:text-text-secondary"
            aria-label={`Open command palette (${modifier}K)`}
          >
            <kbd className="font-mono">{modifier}K</kbd>
          </button>
        </div>

        {/* Mobile: Search + Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={commandPalette.open}
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition-colors hover:text-text-primary"
            aria-label="Search"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`block h-px w-5 bg-text-primary transition-transform ${
                mobileMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-text-primary transition-opacity ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-text-primary transition-transform ${
                mobileMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <ul className="mx-auto max-w-4xl space-y-1 px-6 py-4">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-surface text-text-primary"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
