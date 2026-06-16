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
      const radius = Math.min(cx, cy) * 0.3;

      // Bloch sphere wireframe
      ctx.strokeStyle = "rgba(129, 140, 248, 0.3)";
      ctx.lineWidth = 1;

      // Equator
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius, radius * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Vertical circle
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 0.3, radius, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Meridian
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius, radius, 0, 0, Math.PI * 2);
      ctx.stroke();

      // State vector
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

      // Point
      ctx.beginPath();
      ctx.arc(sx, sy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(129, 140, 248, 1)";
      ctx.fill();

      // Wavefunction probability clouds
      for (let i = 0; i < 5; i++) {
        const wx = cx + Math.cos(time + i * 1.2) * radius * 1.5;
        const wy = cy + Math.sin(time * 0.8 + i * 1.5) * radius;
        const wSize = 20 + Math.sin(time + i) * 10;
        ctx.beginPath();
        ctx.arc(wx, wy, wSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${0.05 + Math.sin(time + i) * 0.03})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(onDismiss, 6000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-[150]"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm text-accent/80"
      >
        Observation changes the system.
      </motion.p>
    </motion.div>
  );
}
