"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { projects } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "@/components/ui/ExternalLink";

const categoryVariant: Record<string, "academic" | "technical" | "research" | "startup" | "default"> = {
  ai: "technical",
  physics: "research",
  web: "default",
  research: "research",
  startup: "startup",
};

export function ProjectGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid gap-6 sm:grid-cols-2"
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={fadeInUp}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/20 hover:bg-surface-hover"
        >
          <div className="flex items-center justify-between">
            <Badge variant={categoryVariant[project.category] || "default"}>
              {project.category}
            </Badge>
            <span
              className={`text-xs ${
                project.status === "completed"
                  ? "text-category-academic"
                  : "text-category-technical"
              }`}
            >
              {project.status}
            </span>
          </div>

          <h3 className="mt-4 font-serif text-heading-3 font-semibold text-text-primary">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            {project.longDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded bg-background px-2 py-0.5 text-xs text-text-tertiary"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-4">
            {project.links.github && (
              <ExternalLink href={project.links.github}>Code</ExternalLink>
            )}
            {project.links.live && (
              <ExternalLink href={project.links.live}>Live</ExternalLink>
            )}
            {project.links.paper && (
              <ExternalLink href={project.links.paper}>Paper</ExternalLink>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
