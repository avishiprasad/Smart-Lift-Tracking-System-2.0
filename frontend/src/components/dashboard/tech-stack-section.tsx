"use client";

import { motion } from "framer-motion";
import { TECH_STACK } from "@/lib/constants";

export function TechStackSection() {
  return (
    <section id="stack" className="px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Technology Stack</h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {TECH_STACK.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="rounded-full border border-border bg-card/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-white"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}