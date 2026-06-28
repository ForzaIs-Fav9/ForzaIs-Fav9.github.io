"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export function EulerOverlay({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 12000);
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
      className="fixed inset-0 z-[150] flex cursor-pointer flex-col items-center justify-center bg-background/95 px-6"
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Euler's identity"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <p className="font-serif text-5xl text-accent sm:text-7xl">
          e<sup>iπ</sup> + 1 = 0
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-12 max-w-md text-center"
      >
        <p className="text-sm leading-relaxed text-text-secondary">
          Five constants — nothing, unity, growth, cycles, imagination —
          connected in a single equation. Mathematics at its most elegant
          is indistinguishable from poetry.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="mt-14 grid grid-cols-5 gap-6 text-center"
      >
        {[
          { symbol: "0", name: "Nothing" },
          { symbol: "1", name: "Unity" },
          { symbol: "e", name: "Growth" },
          { symbol: "π", name: "Cycles" },
          { symbol: "i", name: "Imagination" },
        ].map((item, idx) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 + idx * 0.2 }}
          >
            <p className="font-serif text-xl text-accent/80 sm:text-2xl">{item.symbol}</p>
            <p className="mt-1 text-[10px] text-text-tertiary">{item.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
