"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { nowPage } from "@/lib/content";

export function NowContent() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="space-y-10"
    >
      {nowPage.sections.map((section) => (
        <motion.div key={section.title} variants={fadeInUp}>
          <h2 className="font-serif text-heading-3 font-semibold text-text-primary">
            {section.title}
          </h2>
          <ul className="mt-4 space-y-2">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-text-secondary"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
}
