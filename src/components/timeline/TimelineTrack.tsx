"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { milestones, futureMilestones } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";

const categoryVariant: Record<string, "academic" | "technical" | "research" | "startup" | "default"> = {
  education: "academic",
  project: "technical",
  achievement: "research",
  personal: "default",
  aspiration: "startup",
};

export function TimelineTrack() {
  const [showFuture, setShowFuture] = useState(false);

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="relative"
    >
      {/* Vertical line */}
      <div className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2" />

      <div className="space-y-12">
        {/* Future milestones — revealed on hover */}
        <div
          onMouseEnter={() => setShowFuture(true)}
          onMouseLeave={() => setShowFuture(false)}
          className="relative cursor-default"
        >
          <div className="absolute left-4 top-2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-accent/40 bg-background sm:left-1/2" />
          <div className="ml-10 sm:ml-0 sm:pl-[calc(50%+3rem)]">
            <p className="text-xs font-medium text-text-tertiary italic">
              {showFuture ? "Where I'm headed..." : "Hover to see what's next →"}
            </p>
            {showFuture && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 space-y-3 overflow-hidden"
              >
                {futureMilestones.map((fm) => (
                  <div
                    key={fm.id}
                    className="rounded-lg border border-dashed border-accent/20 bg-accent-muted/10 p-3"
                  >
                    <p className="text-sm font-medium text-accent/80">
                      {fm.title}
                    </p>
                    <p className="mt-1 text-xs text-text-tertiary">
                      {fm.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Past milestones */}
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            variants={fadeInUp}
            className={`relative flex items-start gap-8 ${
              index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
          >
            <div className="absolute left-4 top-2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent sm:left-1/2" />

            <div
              className={`ml-10 flex-1 sm:ml-0 ${
                index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
              }`}
            >
              <time className="text-xs font-medium text-text-tertiary">
                {milestone.date !== "TODO" ? formatDate(milestone.date) : "TODO"}
              </time>
              <h3 className="mt-1 font-serif text-heading-3 font-medium text-text-primary">
                {milestone.title}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {milestone.description}
              </p>
              <div className={`mt-2 ${index % 2 === 0 ? "sm:flex sm:justify-end" : ""}`}>
                <Badge variant={categoryVariant[milestone.category] || "default"}>
                  {milestone.category}
                </Badge>
              </div>
            </div>

            <div className="hidden flex-1 sm:block" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function formatDate(dateStr: string) {
  const parts = dateStr.split("-");
  if (parts.length < 2) return dateStr;
  const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}
