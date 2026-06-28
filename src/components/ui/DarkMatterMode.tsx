"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const ANNOTATIONS = [
  { text: "Every project starts as a question I can't stop thinking about.", position: "top-32 left-6 sm:left-12" },
  { text: "I build to understand. The artifact is secondary to the insight.", position: "top-[35%] right-6 sm:right-12" },
  { text: "The gap between learning and building is where understanding lives.", position: "top-[50%] left-6 sm:left-12" },
  { text: "I write because unclear writing means unclear thinking.", position: "top-[65%] right-6 sm:right-12" },
  { text: "Compounding curiosity: each question opens three more.", position: "bottom-32 left-6 sm:left-12" },
];

export function DarkMatterMode({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 14000);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] cursor-pointer overflow-hidden"
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Hidden annotations about how I think"
    >
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />

      {ANNOTATIONS.map((annotation, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + idx * 0.6, duration: 0.8 }}
          className={`absolute ${annotation.position} max-w-[220px] sm:max-w-xs`}
        >
          <p className="border-l-2 border-accent/40 pl-3 font-serif text-xs italic leading-relaxed text-accent/80 sm:text-sm">
            {annotation.text}
          </p>
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute inset-x-0 bottom-12 text-center font-mono text-[11px] text-text-tertiary"
      >
        The invisible forces that shape everything visible.
      </motion.p>
    </motion.div>
  );
}
