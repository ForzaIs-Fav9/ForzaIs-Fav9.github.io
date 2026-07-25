"use client";

import Link from "next/link";
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
  const realProjects = projects.filter((p) => !p.title.startsWith("TODO"));

  if (realProjects.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="text-text-secondary">
          Projects are in development. Check back soon.
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
      className="grid gap-6 sm:grid-cols-2"
    >
      {realProjects.map((project) => {
        const card = (
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
              {project.hasPage && (
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1 text-accent transition-colors hover:text-accent-hover"
                >
                  Journal
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </motion.div>
        );

        return card;
      })}
    </motion.div>
  );
}
