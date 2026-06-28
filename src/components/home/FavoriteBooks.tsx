"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { favoriteBooks } from "@/lib/content";

export function FavoriteBooks() {
  const realBooks = favoriteBooks.filter((b) => !b.title.startsWith("TODO"));

  if (realBooks.length === 0) return null;

  return (
    <section className="border-t border-border py-16">
      <h2 className="font-serif text-heading-2 font-semibold text-text-primary">
        Favorite Books
      </h2>
      <p className="mt-2 text-sm text-text-tertiary">
        Books that shaped how I think.
      </p>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-8 grid gap-4 sm:grid-cols-2"
      >
        {realBooks.map((book) => (
          <motion.a
            key={book.id}
            variants={fadeInUp}
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent/20 hover:bg-surface-hover"
          >
            <p className="text-sm font-medium text-text-primary group-hover:text-accent">
              {book.title}
            </p>
            <p className="mt-0.5 text-xs text-text-tertiary">{book.author}</p>
            <p className="mt-2 text-xs text-text-secondary">{book.note}</p>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
