"use client";

import { motion } from "framer-motion";
import { LiftStatus, Direction } from "@/types";
import { cn } from "@/lib/utils";

interface AnimatedElevatorProps {
  currentFloor: number;
  totalFloors: number;
  status: LiftStatus;
  direction: Direction;
}

const STATUS_DOT: Record<LiftStatus, string> = {
  IDLE: "bg-secondary shadow-glow-cyan",
  MOVING: "bg-success",
  MAINTENANCE: "bg-warning",
  EMERGENCY: "bg-danger animate-pulse-emergency",
};

export function AnimatedElevator({ currentFloor, totalFloors, status, direction }: AnimatedElevatorProps) {
  const positionPct = 100 - (currentFloor / totalFloors) * 100;

  return (
    <div className="relative h-40 w-10 overflow-hidden rounded-lg border border-border bg-background/60">
      {Array.from({ length: totalFloors }).map((_, i) => (
        <div key={i} className="absolute inset-x-0 border-t border-border/40" style={{ top: `${(i / totalFloors) * 100}%` }} />
      ))}

      <motion.div
        animate={{ top: `${positionPct}%` }}
        transition={{ type: "spring", stiffness: 60, damping: 14 }}
        className="absolute left-1/2 h-5 w-7 -translate-x-1/2 rounded-md border border-white/10"
        style={{ marginTop: `-${100 / totalFloors / 2}%` }}
      >
        <div className={cn("flex h-full w-full items-center justify-center rounded-md", STATUS_DOT[status])}>
          {direction !== "IDLE" && (
            <span className="text-[8px] font-bold text-background">{direction === "UP" ? "▲" : "▼"}</span>
          )}
        </div>
      </motion.div>
    </div>
  );
}