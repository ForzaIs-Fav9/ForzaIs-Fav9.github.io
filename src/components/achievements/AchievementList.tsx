"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { achievements } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "@/components/ui/ExternalLink";

const categoryVariant: Record<string, "academic" | "technical" | "research" | "startup" | "default"> = {
  academic: "academic",
  competition: "technical",
  recognition: "default",
  leadership: "startup",
  technical: "technical",
  research: "research",
};

export function AchievementList() {
  const realAchievements = achievements.filter((a) => !a.title.startsWith("TODO"));

  if (realAchievements.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="text-text-secondary">
          Achievements will be listed here as they are documented.
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
      {realAchievements.map((achievement) => (
        <motion.div
          key={achievement.id}
          variants={fadeInUp}
          className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/20 hover:bg-surface-hover"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Badge variant={categoryVariant[achievement.category] || "default"}>
                  {achievement.category}
                </Badge>
                <span className="text-xs text-text-tertiary">
                  {achievement.date}
                </span>
              </div>
              <h3 className="mt-3 font-serif text-heading-3 font-medium text-text-primary">
                {achievement.title}
              </h3>
              <p className="mt-1 text-sm text-text-tertiary">
                {achievement.organization}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                {achievement.description}
              </p>
            </div>
            {achievement.link && (
              <ExternalLink href={achievement.link}>View</ExternalLink>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
