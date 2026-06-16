"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SecretHint() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip((s) => !s)}
        className="group flex h-6 w-6 items-center justify-center rounded-full border border-border/50 text-text-tertiary/40 transition-all hover:border-accent/30 hover:text-accent/60"
        aria-label="Hints"
      >
        <span className="text-[10px]">?</span>
      </button>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-8 right-0 w-48 rounded-lg border border-border bg-surface p-3 text-xs text-text-tertiary shadow-lg"
          >
            <p className="font-medium text-text-secondary">This site has secrets.</p>
            <p className="mt-1">Try keyboard shortcuts, familiar codes, or look where others don&apos;t.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
