"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { personal } from "@/lib/content";

const links = [
  {
    label: "Email",
    href: `mailto:${personal.socials.email}`,
    description: "For direct inquiries and collaborations",
  },
  {
    label: "GitHub",
    href: personal.socials.github,
    description: "Open source work and project code",
  },
  {
    label: "Substack",
    href: personal.socials.substack,
    description: "Essays and long-form writing",
  },
  {
    label: "LinkedIn",
    href: personal.socials.linkedin,
    description: "Professional network and background",
  },
];

export function ContactLinks() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="mt-12 grid gap-4 sm:grid-cols-2"
    >
      {links.filter(link => link.href).map((link) => (
        <motion.a
          key={link.label}
          variants={fadeInUp}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          href={link.href}
          target={link.href.startsWith("mailto") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          className="flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-surface-hover"
        >
          <p className="font-medium text-text-primary">{link.label}</p>
          <p className="mt-1 text-sm text-text-tertiary">
            {link.description}
          </p>
        </motion.a>
      ))}
    </motion.div>
  );
}
