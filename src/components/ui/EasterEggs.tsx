"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EasterEggsProps {
  onKonamiActivated: () => void;
}

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

export function EasterEggs({ onKonamiActivated }: EasterEggsProps) {
  const [message, setMessage] = useState<string | null>(null);
  const sequenceRef = useRef<string[]>([]);

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      sequenceRef.current.push(e.code);
      if (sequenceRef.current.length > KONAMI_CODE.length) {
        sequenceRef.current.shift();
      }

      if (
        sequenceRef.current.length === KONAMI_CODE.length &&
        sequenceRef.current.every((key, i) => key === KONAMI_CODE[i])
      ) {
        onKonamiActivated();
        showMessage("Curiosity unlocked.");
        sequenceRef.current = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKonamiActivated, showMessage]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 rounded-lg border border-accent/30 bg-surface px-6 py-3 text-sm text-accent shadow-lg backdrop-blur-md"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
