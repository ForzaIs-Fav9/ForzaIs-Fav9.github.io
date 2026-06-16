"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { articles } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function ArticleList() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="space-y-4"
    >
      {articles.map((article) => (
        <motion.article
          key={article.id}
          variants={fadeInUp}
          className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/20 hover:bg-surface-hover"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <time className="text-xs text-text-tertiary">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="text-xs text-text-tertiary">
                  · {article.readingTime} min read
                </span>
                {article.featured && (
                  <Badge variant="default">Featured</Badge>
                )}
              </div>
              <h3 className="mt-2 font-serif text-heading-3 font-medium text-text-primary">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                {article.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-background px-2 py-0.5 text-xs text-text-tertiary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ExternalLink href={article.url}>Read</ExternalLink>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
