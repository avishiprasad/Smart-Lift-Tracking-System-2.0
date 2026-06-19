"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Activity, Building2, ListChecks, Wrench,
  BarChart3, History, Bell, Settings, ChevronLeft, ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/app-context";
import { NAV_ITEMS } from "@/lib/constants";

const ICONS: Record<string, typeof LayoutDashboard> = {
  "/dashboard": LayoutDashboard,
  "/live-monitoring": Activity,
  "/manage-lifts": Building2,
  "/requests": ListChecks,
  "/maintenance": Wrench,
  "/analytics": BarChart3,
  "/activity-logs": History,
  "/notifications": Bell,
  "/settings": Settings,
};

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useAppContext();
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 80 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="relative h-screen shrink-0 border-r border-border bg-card/60 backdrop-blur-xl"
    >
      <div className="flex h-16 items-center gap-2 px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-glow">
          <ArrowUpDown className="h-5 w-5 text-white" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="whitespace-nowrap text-sm font-semibold text-white"
            >
              Smart Lift
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex flex-col gap-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.href];
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/15 text-white shadow-glow"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 h-6 w-1 rounded-r-full bg-primary"
                />
              )}
              <Icon className="h-[18px] w-[18px] shrink-0" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-white"
      >
        <ChevronLeft className={cn("h-3.5 w-3.5 transition-transform", sidebarCollapsed && "rotate-180")} />
      </button>
    </motion.aside>
  );
}