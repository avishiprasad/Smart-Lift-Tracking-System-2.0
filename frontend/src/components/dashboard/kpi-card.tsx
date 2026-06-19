"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "./count-up";

interface KpiCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  tone?: "primary" | "secondary" | "success" | "warning" | "danger";
  trend?: { value: number; positive: boolean };
}

const TONE_MAP = {
  primary: "bg-primary/15 text-primary",
  secondary: "bg-secondary/15 text-secondary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
};

export function KpiCard({ label, value, prefix, suffix, icon: Icon, tone = "primary", trend }: KpiCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur transition-colors hover:border-primary/30"
    >
      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", TONE_MAP[tone])}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={cn("text-xs font-medium", trend.positive ? "text-success" : "text-danger")}>
            {trend.positive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold text-white">
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}