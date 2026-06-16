"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border/80 hover:bg-surface-hover ${className}`}
    >
      {children}
    </motion.div>
  );
}
