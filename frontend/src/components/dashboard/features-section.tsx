"use client";

import { motion } from "framer-motion";
import {
  Activity, MapPin, AlertTriangle, BarChart3, Wrench, Zap, ShieldCheck, ArrowUpDown, LucideIcon,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  Activity, MapPin, AlertTriangle, BarChart3, Wrench, Zap, ShieldCheck, ArrowUpDown,
};

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Built for every building</h2>
          <p className="mt-4 text-muted-foreground">
            Everything an operations team needs to monitor, dispatch, and maintain a fleet of lifts.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-colors hover:border-primary/40 hover:bg-card/60"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary transition-shadow group-hover:shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}