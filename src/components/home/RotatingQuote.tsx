"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quotes } from "@/lib/content";

export function RotatingQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const seed = Math.floor(Date.now() / 1000 / 30);
    setIndex(seed % quotes.length);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const quote = quotes[index];

  return (
    <div className="border-t border-border py-16">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mx-auto max-w-2xl font-serif text-lg italic text-text-secondary">
            &ldquo;{quote?.text}&rdquo;
          </p>
          <footer className="mt-4 text-sm text-text-tertiary">
            — {quote?.author}
          </footer>
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
}
