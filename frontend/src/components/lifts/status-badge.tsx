import { cn } from "@/lib/utils";
import { STATUS_COLORS } from "@/lib/constants";
import { LiftStatus } from "@/types";

const LABELS: Record<LiftStatus, string> = {
  IDLE: "Idle",
  MOVING: "Moving",
  MAINTENANCE: "Maintenance",
  EMERGENCY: "Emergency",
};

export function StatusBadge({ status }: { status: LiftStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        STATUS_COLORS[status],
        status === "EMERGENCY" && "animate-pulse-emergency"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[status]}
    </span>
  );
}