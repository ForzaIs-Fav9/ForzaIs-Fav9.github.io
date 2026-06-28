"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ideas } from "@/lib/content";

export function SelectedIdeas() {
  const realIdeas = ideas.filter((i) => !i.title.startsWith("TODO"));

  if (realIdeas.length === 0) return null;

  return (
    <section className="border-t border-border py-16">
      <h2 className="font-serif text-heading-2 font-semibold text-text-primary">
        Selected Ideas
      </h2>
      <p className="mt-2 text-sm text-text-tertiary">
        Fragments of thinking — ideas I keep returning to.
      </p>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-8 space-y-4"
      >
        {realIdeas.map((idea) => (
          <motion.div
            key={idea.id}
            variants={fadeInUp}
            className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/20"
          >
            <h3 className="font-serif text-heading-3 font-medium text-text-primary">
              {idea.title}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">{idea.summary}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {idea.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-background px-2 py-0.5 text-xs text-text-tertiary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
