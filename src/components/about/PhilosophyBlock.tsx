"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/lib/content";

export function PhilosophyBlock() {
  const [clickCount, setClickCount] = useState(0);
  const [showFeynman, setShowFeynman] = useState(false);

  const handleClick = useCallback(() => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3 && !showFeynman) {
      setShowFeynman(true);
      window.dispatchEvent(new CustomEvent("egg-found", { detail: { id: "feynman" } }));
    }
  }, [clickCount, showFeynman]);

  return (
    <div className="mt-16">
      <h2 className="font-serif text-heading-2 font-semibold text-text-primary">
        Philosophy
      </h2>
      <blockquote
        onClick={handleClick}
        className="mt-4 cursor-default border-l-2 border-accent pl-6 text-lg italic text-text-secondary transition-colors hover:text-text-primary/80"
      >
        {personal.philosophy}
      </blockquote>

      <AnimatePresence>
        {showFeynman && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden rounded-lg border border-accent/20 bg-accent-muted/10 p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-accent/70">
              Feynman&apos;s Last Blackboard
            </p>
            <blockquote className="mt-3 font-serif text-base italic text-text-secondary">
              &ldquo;What I cannot create, I do not understand.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-text-tertiary">
              Richard Feynman left this on his blackboard when he died in 1988.
              It captures the deepest form of understanding — not passive
              knowledge, but the ability to reconstruct from first principles.
              This is why I build things: not for the product, but for the
              understanding that building demands.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
