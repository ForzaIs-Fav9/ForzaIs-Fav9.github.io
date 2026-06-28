"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { labPage } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";

const statusColors: Record<string, string> = {
  exploring: "text-category-technical",
  idea: "text-category-research",
  researching: "text-category-academic",
  wondering: "text-accent",
  queued: "text-text-tertiary",
};

export function LabContent() {
  const hasRealContent = labPage.sections.some((s) =>
    s.items.some((item) => !item.title.startsWith("TODO"))
  );

  if (!hasRealContent) {
    return (
      <div>
        <p className="mb-10 text-sm text-text-secondary italic">
          {labPage.intro}
        </p>
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <p className="text-text-secondary">
            Experiments and ideas are being documented. Check back soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-10 text-sm text-text-secondary italic">
        {labPage.intro}
      </p>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="space-y-12"
      >
        {labPage.sections.map((section) => (
          <motion.div key={section.title} variants={fadeInUp}>
            <h2 className="font-serif text-heading-3 font-semibold text-text-primary">
              {section.title}
            </h2>
            <div className="mt-4 space-y-3">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent/20"
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-text-primary">
                      {item.title}
                    </h3>
                    <Badge variant="default">
                      <span className={statusColors[item.status] || ""}>
                        {item.status}
                      </span>
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-text-tertiary">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
