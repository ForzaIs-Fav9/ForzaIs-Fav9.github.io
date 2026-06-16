"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Interest } from "@/lib/content";

const iconMap: Record<string, string> = {
  atom: "⚛",
  brain: "🧠",
  rocket: "🚀",
  mind: "🔮",
  galaxy: "🌌",
  fitness: "💪",
};

interface InterestsProps {
  interests: Interest[];
}

export function Interests({ interests }: InterestsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {interests.map((interest) => (
        <motion.div
          key={interest.label}
          variants={fadeInUp}
          className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/30"
        >
          <span className="text-2xl" role="img" aria-label={interest.label}>
            {iconMap[interest.icon] || "✦"}
          </span>
          <h3 className="mt-3 text-sm font-semibold text-text-primary">
            {interest.label}
          </h3>
          <p className="mt-1 text-xs text-text-tertiary">
            {interest.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
