"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { Starfield } from "@/components/ui/Starfield";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { EasterEggs } from "@/components/ui/EasterEggs";

const QuantumOverlay = dynamic(
  () => import("@/components/ui/QuantumOverlay").then((m) => ({ default: m.QuantumOverlay })),
  { ssr: false }
);
const EulerOverlay = dynamic(
  () => import("@/components/ui/EulerOverlay").then((m) => ({ default: m.EulerOverlay })),
  { ssr: false }
);
const DarkMatterMode = dynamic(
  () => import("@/components/ui/DarkMatterMode").then((m) => ({ default: m.DarkMatterMode })),
  { ssr: false }
);

type ActiveOverlay = "quantum" | "euler" | "dark-matter" | null;

export function ClientShell() {
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>(null);

  const dismiss = useCallback(() => setActiveOverlay(null), []);

  const handleQuantumMode = useCallback(() => setActiveOverlay("quantum"), []);
  const handleDarkMatter = useCallback(() => setActiveOverlay("dark-matter"), []);
  const handleEuler = useCallback(() => setActiveOverlay("euler"), []);

  return (
    <>
      <Starfield intensity={1} />
      <CommandPalette
        onQuantumMode={handleQuantumMode}
        onDarkMatter={handleDarkMatter}
      />
      <EasterEggs onEulerActivated={handleEuler} />
      <AnimatePresence>
        {activeOverlay === "quantum" && <QuantumOverlay onDismiss={dismiss} />}
        {activeOverlay === "euler" && <EulerOverlay onDismiss={dismiss} />}
        {activeOverlay === "dark-matter" && <DarkMatterMode onDismiss={dismiss} />}
      </AnimatePresence>
    </>
  );
}
