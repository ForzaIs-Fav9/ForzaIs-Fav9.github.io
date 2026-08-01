"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function SecretHint() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, close]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((s) => !s)}
        onFocus={() => setOpen(true)}
        className="group flex h-6 w-6 items-center justify-center rounded-full border border-border/50 text-text-tertiary/40 transition-all hover:border-accent/30 hover:text-accent/60"
        aria-label="Hints"
        aria-expanded={open}
      >
        <span className="text-[10px]">?</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-8 right-0 w-48 rounded-lg border border-border bg-surface p-3 text-xs text-text-tertiary shadow-lg"
            onFocus={() => setOpen(true)}
          >
            <p className="font-medium text-text-secondary">This site has secrets.</p>
            <p className="mt-1">Try keyboard shortcuts, familiar codes, or look where others don&apos;t.</p>
            <Link
              href="/secrets"
              className="mt-2 inline-block text-accent transition-colors hover:text-accent-hover"
              onBlur={(e) => {
                if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
                  close();
                }
              }}
            >
              View the guide &rarr;
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
