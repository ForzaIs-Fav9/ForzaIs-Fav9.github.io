"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { personal } from "@/lib/content";

const links = [
  {
    label: "Email",
    href: `mailto:${personal.socials.email}`,
    description: "For direct inquiries and collaborations",
    icon: "✉",
  },
  {
    label: "GitHub",
    href: personal.socials.github,
    description: "Open source work and project code",
    icon: "⌨",
  },
  {
    label: "Substack",
    href: personal.socials.substack,
    description: "Essays and long-form writing",
    icon: "✍",
  },
  {
    label: "LinkedIn",
    href: personal.socials.linkedin,
    description: "Professional network and background",
    icon: "🔗",
  },
  {
    label: "Twitter / X",
    href: personal.socials.twitter,
    description: "Thoughts, threads, and conversations",
    icon: "💬",
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
      {links.map((link) => (
        <motion.a
          key={link.label}
          variants={fadeInUp}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          href={link.href}
          target={link.href.startsWith("mailto") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-surface-hover"
        >
          <span className="text-xl">{link.icon}</span>
          <div>
            <p className="font-medium text-text-primary">{link.label}</p>
            <p className="mt-0.5 text-sm text-text-tertiary">
              {link.description}
            </p>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
