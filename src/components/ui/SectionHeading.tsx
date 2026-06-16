"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      className="mb-12"
    >
      <h1 className="font-serif text-heading-1 font-semibold text-text-primary">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-body text-text-secondary">{subtitle}</p>
      )}
    </motion.div>
  );
}
