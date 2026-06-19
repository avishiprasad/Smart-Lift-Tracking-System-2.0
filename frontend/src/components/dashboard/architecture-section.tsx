"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Database, ArrowDown } from "lucide-react";

const LAYERS = [
  { icon: Monitor, label: "Next.js Frontend", detail: "Dashboard · Admin Panel · Analytics" },
  { icon: Server, label: "Node.js + Express Backend", detail: "Socket.IO · JWT · Scheduler · Logging" },
  { icon: Database, label: "MongoDB Atlas", detail: "Lifts · Requests · Logs · Analytics" },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">System Architecture</h2>
        <p className="mt-4 text-muted-foreground">
          A real-time, event-driven pipeline from lift state change to connected client.
        </p>

        <div className="mt-14 flex flex-col items-center gap-3">
          {LAYERS.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div key={layer.label} className="w-full max-w-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl border border-border bg-card/50 p-5 text-left backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{layer.label}</p>
                      <p className="text-xs text-muted-foreground">{layer.detail}</p>
                    </div>
                  </div>
                </motion.div>
                {i < LAYERS.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}