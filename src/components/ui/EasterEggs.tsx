"use client";

import { useEffect, useRef, useCallback } from "react";

interface EasterEggsProps {
  onEulerActivated: () => void;
}

export function EasterEggs({ onEulerActivated }: EasterEggsProps) {
  const typedRef = useRef("");

  const checkSequence = useCallback((typed: string) => {
    if (typed.endsWith("e^ipi+1=0") || typed.endsWith("eipi+1=0")) {
      onEulerActivated();
      typedRef.current = "";
    }
  }, [onEulerActivated]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key.length === 1) {
        typedRef.current += e.key.toLowerCase();
        if (typedRef.current.length > 20) {
          typedRef.current = typedRef.current.slice(-15);
        }
        checkSequence(typedRef.current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [checkSequence]);

  return null;
}
