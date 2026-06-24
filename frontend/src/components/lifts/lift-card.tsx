"use client";

import { motion } from "framer-motion";
import { Users, Clock, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Lift } from "@/types";
import { StatusBadge } from "./status-badge";
import { QueueChip } from "./queue-chip";
import { AnimatedElevator } from "./animated-elevator";
import { cn } from "@/lib/utils";

const DIRECTION_ICON = { UP: ArrowUp, DOWN: ArrowDown, IDLE: Minus };

export function LiftCard({
  lift,
  onClick,
}: {
  lift: Lift;
  onClick?: () => void;
}) {
  const DirIcon = DIRECTION_ICON[lift.direction];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      className={cn(
        "relative w-full rounded-2xl border bg-card/40 p-5 text-left backdrop-blur transition-all duration-500",

        lift.status === "MOVING" &&
          "border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.45)]",

        lift.status === "MAINTENANCE" &&
          "border-yellow-500 shadow-[0_0_25px_rgba(234,179,8,0.35)]",

        lift.status === "EMERGENCY" &&
          "border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.45)]",

        lift.status === "IDLE" && "border-border hover:border-primary/30"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Lift</p>
          <p
            className={cn(
              "text-lg font-semibold text-white",

              lift.status === "MOVING" && "animate-pulse text-green-400",

              lift.status === "MAINTENANCE" && "text-yellow-400",

              lift.status === "EMERGENCY" && "text-red-400"
            )}
          >
            #{lift.liftNumber}
          </p>
        </div>
        <StatusBadge status={lift.status} />
        {lift.status === "MOVING" && (
          <div className="flex items-center gap-1 text-xs text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
            LIVE
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-4">
        
        <AnimatedElevator
          currentFloor={lift.currentFloor}
          totalFloors={lift.servingFloors.length}
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
            <span className="font-medium text-white">
              {lift.eta != null ? `${lift.eta}s` : "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-3.5 w-3.5" /> Occupancy
            </span>
            <span className="font-medium text-white">{lift.occupancy}</span>
          </div>
        </div>
      </div>

      {lift.requestQueue.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">Queue</span>
          {lift.requestQueue.map((item) => (
            <QueueChip
              key={`${item.requestId}-${item.type}-${item.floor}`}
              item={item}
            />
          ))}
        </div>
      )}

      {lift.status === "MAINTENANCE" && (
        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-warning" />
      )}
    </motion.button>
  );
}
