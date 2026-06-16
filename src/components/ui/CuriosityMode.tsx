"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EQUATIONS = [
  "E = mc²",
  "∇ × B = μ₀J + μ₀ε₀ ∂E/∂t",
  "iℏ ∂ψ/∂t = Ĥψ",
  "S = k_B ln Ω",
  "∫₋∞^∞ e^{-x²} dx = √π",
  "Rμν − ½gμνR = 8πG Tμν",
  "∂²φ/∂t² = c² ∇²φ",
  "F = G(m₁m₂)/r²",
  "ΔxΔp ≥ ℏ/2",
  "e^{iπ} + 1 = 0",
  "dS/dt ≥ 0",
  "∮ E·dl = −dΦ_B/dt",
];

const THOUGHTS = [
  "The universe is under no obligation to make sense to you.",
  "We are a way for the cosmos to know itself.",
  "The only true wisdom is in knowing you know nothing.",
  "Nature uses only the longest threads to weave her patterns.",
  "Somewhere, something incredible is waiting to be known.",
  "The important thing is not to stop questioning.",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  connected: number[];
}

export function CuriosityMode({ onDismiss }: { onDismiss: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [visibleEquations, setVisibleEquations] = useState<
    { text: string; x: number; y: number; id: number }[]
  >([]);
  const [thought, setThought] = useState("");
  const [phase, setPhase] = useState<"enter" | "active" | "exit">("enter");
  const equationCounter = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const count = Math.min(80, Math.floor((width * height) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        connected: [],
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        particlesRef.current = initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let animId: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      const particles = particlesRef.current;
      const connectionDist = 120;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        const pulse = Math.sin(time * 2 + i * 0.5) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${p.opacity * pulse})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Central glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.4
      );
      gradient.addColorStop(0, `rgba(129, 140, 248, ${0.03 + Math.sin(time) * 0.01})`);
      gradient.addColorStop(1, "rgba(129, 140, 248, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles]);

  // Spawn floating equations
  useEffect(() => {
    if (phase !== "active") return;

    const interval = setInterval(() => {
      const id = equationCounter.current++;
      const eq = EQUATIONS[id % EQUATIONS.length];
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 70;
      setVisibleEquations((prev) => [...prev.slice(-5), { text: eq, x, y, id }]);
    }, 2200);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase transitions
  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("active"), 800);
    return () => clearTimeout(enterTimer);
  }, []);

  useEffect(() => {
    if (phase !== "active") return;
    const thoughtIdx = Math.floor(Math.random() * THOUGHTS.length);
    const timer = setTimeout(() => setThought(THOUGHTS[thoughtIdx]), 1500);
    return () => clearTimeout(timer);
  }, [phase]);

  // Auto-dismiss after 15s or on click/escape
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onDismiss, 800);
    }, 15000);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        setPhase("exit");
        setTimeout(onDismiss, 800);
      }
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
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[200] cursor-pointer overflow-hidden bg-background/95"
      onClick={() => {
        setPhase("exit");
        setTimeout(onDismiss, 800);
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Floating equations */}
      <AnimatePresence>
        {visibleEquations.map((eq) => (
          <motion.span
            key={eq.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 1.5 }}
            className="pointer-events-none absolute font-mono text-sm text-accent/60 md:text-base"
            style={{ left: `${eq.x}%`, top: `${eq.y}%` }}
          >
            {eq.text}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Central content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: phase === "active" ? 1 : 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-light tracking-wide text-text-primary md:text-5xl">
            Curiosity Mode
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            className="mx-auto mt-3 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          />
        </motion.div>

        <AnimatePresence>
          {thought && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-8 max-w-lg px-6 text-center font-serif text-lg italic text-text-secondary/80 md:text-xl"
            >
              &ldquo;{thought}&rdquo;
            </motion.p>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "active" ? 0.5 : 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12 text-xs text-text-tertiary"
        >
          press escape or click anywhere to return
        </motion.p>
      </div>
    </motion.div>
  );
}
