"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { projects, articles, researchProjects } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "@/components/ui/ExternalLink";
import Link from "next/link";

function hasRealContent(text: string): boolean {
  return !text.startsWith("TODO");
}

export function FeaturedWork() {
  const featuredProjects = projects
    .filter((p) => p.featured && hasRealContent(p.title))
    .slice(0, 3);

  const featuredResearch = researchProjects.slice(0, 1);

  const featuredArticles = articles.filter((a) => a.featured).slice(0, 2);

  if (
    featuredProjects.length === 0 &&
    featuredResearch.length === 0 &&
    featuredArticles.length === 0
  ) {
    return (
      <section className="border-t border-border py-24">
        <h2 className="font-serif text-heading-2 font-semibold text-text-primary">
          Work
        </h2>
        <p className="mt-4 text-body text-text-secondary">
          Projects, research, and writing are in progress. Check back soon, or
          visit my{" "}
          <Link
            href="/projects"
            className="text-accent hover:text-accent-hover"
          >
            projects
          </Link>
          ,{" "}
          <Link
            href="/research"
            className="text-accent hover:text-accent-hover"
          >
            research
          </Link>
          , and{" "}
          <Link
            href="/writing"
            className="text-accent hover:text-accent-hover"
          >
            writing
          </Link>{" "}
          pages.
        </p>
      </section>
    );
  }

  return (
    <section className="border-t border-border py-24">
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-heading-2 font-semibold text-text-primary">
              Featured Projects
            </h2>

            <Link
              href="/projects"
              className="text-sm text-text-tertiary transition-colors hover:text-accent"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card key={project.id}>
                <Badge
                  variant={
                    project.category === "ai"
                      ? "technical"
                      : project.category === "physics"
                      ? "research"
                      : project.category === "startup"
                      ? "startup"
                      : "default"
                  }
                >
                  {project.category}
                </Badge>

                <h3 className="mt-3 font-serif text-heading-3 font-semibold text-text-primary">
                  {project.title}
                </h3>

                <p className="mt-2 text-sm text-text-secondary">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-background px-2 py-0.5 text-xs text-text-tertiary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Featured Research */}
      {featuredResearch.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className={featuredProjects.length > 0 ? "mt-20" : ""}
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-heading-2 font-semibold text-text-primary">
              Featured Research
            </h2>

            <Link
              href="/research"
              className="text-sm text-text-tertiary transition-colors hover:text-accent"
            >
              View research &rarr;
            </Link>
          </div>

          <div className="mt-8">
            {featuredResearch.map((research) => (
              <Link
                key={research.id}
                href={`/research/${research.id}`}
                className="block"
              >
                <Card className="transition-colors hover:border-accent/40">
                  <Badge variant="research">research</Badge>

                  <h3 className="mt-3 font-serif text-heading-3 font-semibold text-text-primary">
                    {research.title}
                  </h3>

                  <p className="mt-2 text-sm text-text-secondary">
                    {research.summary}
                  </p>

                  <p className="mt-3 text-xs text-text-tertiary">
                    {research.field}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-tertiary">
                    <span>
                      {research.logEntries.length} research log entries
                    </span>

                    <span>
                      {research.researchNotes.length} research note
                      {research.researchNotes.length === 1 ? "" : "s"}
                    </span>

                    <span className="text-accent">
                      Explore investigation &rarr;
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Writing */}
      {featuredArticles.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className={
            featuredProjects.length > 0 || featuredResearch.length > 0
              ? "mt-20"
              : ""
          }
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-heading-2 font-semibold text-text-primary">
              Recent Writing
            </h2>

            <Link
              href="/writing"
              className="text-sm text-text-tertiary transition-colors hover:text-accent"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            {featuredArticles.map((article) => (
              <Card
                key={article.id}
                className="flex items-start justify-between gap-4"
              >
                <div>
                  <h3 className="font-serif text-heading-3 font-medium text-text-primary">
                    {article.title}
                  </h3>

                  <p className="mt-1 text-sm text-text-secondary">
                    {article.description}
                  </p>

                  <p className="mt-2 text-xs text-text-tertiary">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <ExternalLink href={article.url}>Read</ExternalLink>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}