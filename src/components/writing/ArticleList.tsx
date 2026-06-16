"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { type SubstackPost, fetchSubstackPosts } from "@/lib/substack";

export function ArticleList() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubstackPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-border bg-surface p-6"
          >
            <div className="h-3 w-24 rounded bg-border" />
            <div className="mt-3 h-5 w-3/4 rounded bg-border" />
            <div className="mt-3 h-4 w-full rounded bg-border" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="text-sm text-text-tertiary">
          Unable to load articles right now.
        </p>
        <a
          href="https://harshithvankela.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-accent hover:text-accent-hover"
        >
          Visit Substack directly &rarr;
        </a>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="text-sm text-text-tertiary">
          No articles published yet. Stay tuned.
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
      {posts.map((post, idx) => (
        <motion.article
          key={post.url}
          variants={fadeInUp}
          className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/20 hover:bg-surface-hover"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <time className="text-xs text-text-tertiary">
                  {post.date
                    ? new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </time>
                {idx === 0 && (
                  <span className="rounded-full bg-accent-muted/50 px-2 py-0.5 text-xs text-accent">
                    Latest
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-serif text-heading-3 font-medium text-text-primary">
                {post.title}
              </h3>
              {post.description && (
                <p className="mt-2 text-sm text-text-secondary">
                  {post.description}
                </p>
              )}
              {post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-background px-2 py-0.5 text-xs text-text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <ExternalLink href={post.url}>Read</ExternalLink>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
