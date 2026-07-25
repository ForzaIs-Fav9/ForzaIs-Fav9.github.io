"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { JournalEntry } from "@/lib/journal";

interface ProjectJournalProps {
  entries: JournalEntry[];
}

export function ProjectJournal({ entries }: ProjectJournalProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="text-text-secondary">
          Journal entries coming soon.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="space-y-4"
    >
      {entries.map((entry) => {
        const isOpen = expanded === entry.slug;

        return (
          <motion.div
            key={entry.slug}
            variants={fadeInUp}
            className="rounded-xl border border-border bg-surface transition-colors hover:border-border/80 hover:bg-surface-hover"
          >
            <button
              onClick={() => setExpanded(isOpen ? null : entry.slug)}
              className="flex w-full items-start justify-between p-6 text-left"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-heading-3 font-semibold text-text-primary">
                    {entry.title}
                  </h3>
                  {entry.version && (
                    <span className="rounded-full bg-accent-muted/50 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {entry.version}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-text-tertiary">{entry.date}</p>
                <p className="mt-2 text-sm text-text-secondary">
                  {entry.summary}
                </p>
              </div>
              <span className="ml-4 mt-1 flex-shrink-0 text-text-tertiary transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div
                    className="border-t border-border px-6 pb-6 pt-4 prose-journal"
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
