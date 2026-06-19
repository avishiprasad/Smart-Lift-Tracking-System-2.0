"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";
import { CountUp } from "./count-up";
interface Stat {
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
  }
  
export function StatsSection() {
  return (
    <section className="border-y border-border bg-card/20 px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="text-center"
          >
            <p className="text-4xl font-semibold text-white md:text-5xl">
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}