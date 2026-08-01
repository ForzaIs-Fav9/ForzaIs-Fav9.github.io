"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { easterEggs } from "@/lib/content";

export function EasterEggGuide() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="space-y-4"
    >
      {easterEggs.map((egg) => (
        <motion.div
          key={egg.id}
          variants={fadeInUp}
          className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/20"
        >
          <h3 className="font-serif text-heading-3 font-semibold text-text-primary">
            {egg.name}
          </h3>
          <div className="mt-3 space-y-2">
            <p className="text-sm text-text-secondary">
              <span className="font-medium text-text-primary">Trigger:</span>{" "}
              {egg.trigger}
            </p>
            <p className="text-sm text-text-secondary">
              <span className="font-medium text-text-primary">Reward:</span>{" "}
              {egg.reward}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
