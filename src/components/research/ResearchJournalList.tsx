"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { ResearchLogEntry } from "@/lib/content";

interface ResearchJournalListProps {
  projectId: string;
  entries: ResearchLogEntry[];
}

export function ResearchJournalList({ projectId, entries }: ResearchJournalListProps) {
  if (entries.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-border bg-surface p-8 text-center">
        <p className="text-text-secondary">
          Log entries coming soon.
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
      className="mt-8 space-y-4"
    >
      {entries.map((entry) => (
        <motion.div key={entry.slug} variants={fadeInUp}>
          <Link
            href={`/research/${projectId}/log/${entry.slug}`}
            className="block rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/20 hover:bg-surface-hover"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-serif text-heading-3 font-semibold text-text-primary">
                {entry.title}
              </h3>
              {entry.phase && (
                <span className="rounded-full bg-accent-muted/50 px-2.5 py-0.5 text-xs font-medium text-accent">
                  {entry.phase}
                </span>
              )}
            </div>
            {entry.date && (
              <p className="mt-1 text-sm text-text-tertiary">{entry.date}</p>
            )}
            {entry.summary && (
              <p className="mt-2 text-sm text-text-secondary">{entry.summary}</p>
            )}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
