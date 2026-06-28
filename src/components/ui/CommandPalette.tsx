"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/content";

const allPages = [
  ...navLinks,
  { label: "Achievements", href: "/achievements" },
  { label: "Exploring", href: "/exploring" },
];

export function CommandPalette({ onQuantumMode, onDarkMatter }: { onQuantumMode: () => void; onDarkMatter: () => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = allPages.filter((page) =>
    page.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") setOpen(false);
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const q = query.toLowerCase().trim();
    if (q === "quantum") {
      onQuantumMode();
      setOpen(false);
      setQuery("");
    } else if (q === "dark matter" || q === "darkmatter") {
      onDarkMatter();
      setOpen(false);
      setQuery("");
    }
  }, [query, onQuantumMode, onDarkMatter]);

  const navigate = (href: string) => {
    router.push(href);
    setOpen(false);
    setQuery("");
  };

  const handlePaletteKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      navigate(filtered[selectedIndex].href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-[101] w-full max-w-md -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
          >
            <div className="flex items-center border-b border-border px-4">
              <svg className="h-4 w-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handlePaletteKey}
                placeholder="Navigate to..."
                className="w-full bg-transparent px-3 py-4 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 text-xs text-text-tertiary">
                esc
              </kbd>
            </div>
            <ul className="max-h-64 overflow-y-auto p-2" role="listbox" aria-label="Pages">
              {filtered.map((page, i) => (
                <li key={page.href}>
                  <button
                    onClick={() => navigate(page.href)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === selectedIndex
                        ? "bg-accent-muted/50 text-text-primary"
                        : "text-text-secondary hover:bg-surface-hover"
                    }`}
                  >
                    {page.label}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-3 py-4 text-center text-sm text-text-tertiary">
                  No pages found
                </li>
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
