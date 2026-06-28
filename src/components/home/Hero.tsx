"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { personal } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20"
    >
      <motion.p
        variants={fadeInUp}
        className="text-sm font-medium tracking-wide text-accent"
      >
        Hello, I&apos;m
      </motion.p>

      <motion.h1
        variants={fadeInUp}
        className="mt-4 font-serif text-heading-1 font-bold text-text-primary sm:text-display"
      >
        {personal.name}
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="mt-6 max-w-2xl text-xl leading-relaxed text-text-secondary"
      >
        {personal.tagline}
      </motion.p>

      <motion.p
        variants={fadeInUp}
        className="mt-4 max-w-xl text-body text-text-tertiary"
      >
        {personal.shortBio}
      </motion.p>

      <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
        <Button href="/projects">View Projects</Button>
        <Button href="/about" variant="secondary">
          About Me
        </Button>
        <Button href="/writing" variant="ghost">
          Read My Writing &rarr;
        </Button>
      </motion.div>
    </motion.section>
  );
}
