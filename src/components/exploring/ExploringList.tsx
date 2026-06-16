"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { exploringTopics } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function ExploringList() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="space-y-6"
    >
      {exploringTopics.map((topic) => (
        <motion.div
          key={topic.id}
          variants={fadeInUp}
          className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/20"
        >
          <div className="flex items-center gap-3">
            <Badge
              variant={topic.status === "active" ? "academic" : "default"}
            >
              {topic.status}
            </Badge>
            <span className="text-xs text-text-tertiary">
              Since{" "}
              {new Date(topic.startedDate + "-01").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </div>

          <h3 className="mt-3 font-serif text-heading-3 font-semibold text-text-primary">
            {topic.topic}
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            {topic.description}
          </p>

          {topic.resources.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
                Resources
              </p>
              <ul className="mt-2 space-y-1">
                {topic.resources.map((resource, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-xs text-text-tertiary">
                      [{resource.type}]
                    </span>
                    <ExternalLink href={resource.url} className="text-sm">
                      {resource.title}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
