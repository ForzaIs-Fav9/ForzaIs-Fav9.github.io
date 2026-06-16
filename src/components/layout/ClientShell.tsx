"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Starfield } from "@/components/ui/Starfield";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { EasterEggs } from "@/components/ui/EasterEggs";
import { QuantumOverlay } from "@/components/ui/QuantumOverlay";
import { CuriosityMode } from "@/components/ui/CuriosityMode";
import { SecretHint } from "@/components/ui/SecretHint";

export function ClientShell() {
  const [starIntensity, setStarIntensity] = useState(1);
  const [quantumMode, setQuantumMode] = useState(false);
  const [curiosityMode, setCuriosityMode] = useState(false);

  const handleKonami = useCallback(() => {
    setCuriosityMode(true);
    setStarIntensity(2.5);
  }, []);

  const handleCuriosityDismiss = useCallback(() => {
    setCuriosityMode(false);
    setStarIntensity(1.5);
    setTimeout(() => setStarIntensity(1), 5000);
  }, []);

  const handleQuantumMode = useCallback(() => {
    setQuantumMode(true);
  }, []);

  const handleQuantumDismiss = useCallback(() => {
    setQuantumMode(false);
  }, []);

  return (
    <>
      <Starfield intensity={starIntensity} />
      <CommandPalette onQuantumMode={handleQuantumMode} />
      <EasterEggs onKonamiActivated={handleKonami} />
      <SecretHint />
      <AnimatePresence>
        {quantumMode && <QuantumOverlay onDismiss={handleQuantumDismiss} />}
      </AnimatePresence>
      <AnimatePresence>
        {curiosityMode && <CuriosityMode onDismiss={handleCuriosityDismiss} />}
      </AnimatePresence>
    </>
  );
}
