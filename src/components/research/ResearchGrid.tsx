"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { researchProjects } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";

export function ResearchGrid() {
  if (researchProjects.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="text-text-secondary">
          Research projects coming soon.
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
      className="grid gap-6"
    >
      {researchProjects.map((project) => (
        <motion.div
          key={project.id}
          variants={fadeInUp}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <Link
            href={`/research/${project.id}`}
            className="block rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/20 hover:bg-surface-hover"
          >
            <div className="flex items-center gap-3">
              <Badge variant="research">{project.status}</Badge>
              <span className="text-xs text-text-tertiary">
                Started {project.started}
              </span>
            </div>

            <h3 className="mt-4 font-serif text-heading-3 font-semibold text-text-primary">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              {project.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.field.split("•").map((f) => (
                <span
                  key={f.trim()}
                  className="rounded bg-background px-2 py-0.5 text-xs text-text-tertiary"
                >
                  {f.trim()}
                </span>
              ))}
            </div>

            <div className="mt-4 inline-flex items-center gap-1 text-accent">
              <span className="text-sm">View project</span>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
