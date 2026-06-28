"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function QuantumOverlay({ onDismiss }: { onDismiss: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) * 0.25;

      ctx.strokeStyle = "rgba(129, 140, 248, 0.3)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.ellipse(cx, cy, radius, radius * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 0.3, radius, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, radius, radius, 0, 0, Math.PI * 2);
      ctx.stroke();

      const theta = time;
      const phi = time * 0.7;
      const sx = cx + radius * Math.sin(theta) * Math.cos(phi);
      const sy = cy - radius * Math.cos(theta);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sx, sy);
      ctx.strokeStyle = "rgba(129, 140, 248, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sx, sy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(129, 140, 248, 1)";
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

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
      className="fixed inset-0 z-[150] cursor-pointer"
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Quantum state visualization"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-md px-6 text-center"
        >
          <p className="text-sm text-text-secondary">
            A qubit exists in superposition until measured.
            I think the best ideas work the same way — they stay open,
            entangled with other possibilities, until you commit to building one.
          </p>
          <p className="mt-4 text-xs text-text-tertiary">
            This is a Bloch sphere — the state space of a single qubit.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
