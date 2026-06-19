"use client";

import { motion } from "framer-motion";
import { Users, Clock, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Lift } from "@/types";
import { StatusBadge } from "./status-badge";
import { QueueChip } from "./queue-chip";
import { AnimatedElevator } from "./animated-elevator";
import { cn } from "@/lib/utils";

const DIRECTION_ICON = { up: ArrowUp, down: ArrowDown, idle: Minus };

export function LiftCard({ lift, onClick }: { lift: Lift; onClick?: () => void }) {
  const DirIcon = DIRECTION_ICON[lift.direction];
  const occupancyPct = Math.round((lift.occupancy / lift.capacity) * 100);

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      className={cn(
        "relative w-full rounded-2xl border bg-card/40 p-5 text-left backdrop-blur transition-colors",
        lift.emergency ? "border-danger/50" : "border-border hover:border-primary/30"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Lift</p>
          <p className="text-lg font-semibold text-white">#{lift.liftNumber}</p>
        </div>
        <StatusBadge status={lift.status} />
      </div>

      <div className="mt-4 flex gap-4">
        <AnimatedElevator
          currentFloor={lift.currentFloor}
          totalFloors={12}
          status={lift.status}
          direction={lift.direction}
        />

        <div className="flex-1 space-y-2.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Floor</span>
            <span className="font-medium text-white">{lift.currentFloor}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Target</span>
            <span className="flex items-center gap-1 font-medium text-white">
              <DirIcon className="h-3.5 w-3.5 text-muted-foreground" />
              {lift.targetFloor ?? "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> ETA
            </span>
            <span className="font-medium text-white">{lift.eta ? `${lift.eta}s` : "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-3.5 w-3.5" /> Occupancy
            </span>
            <span className={cn("font-medium", occupancyPct > 90 ? "text-warning" : "text-white")}>
              {lift.occupancy}/{lift.capacity}
            </span>
          </div>
        </div>
      </div>

      {lift.requestQueue.length > 0 && (
        <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">Queue</span>
          {lift.requestQueue.map((f, i) => (
            <QueueChip key={i} floor={f} />
          ))}
        </div>
      )}

      {lift.maintenance && (
        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-warning" />
      )}
    </motion.button>
  );
}