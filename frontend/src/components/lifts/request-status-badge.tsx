import { cn } from "@/lib/utils";
import { RequestStatus } from "@/types";

const STYLES: Record<RequestStatus, string> = {
  PENDING: "text-warning border-warning/30 bg-warning/10",
  ASSIGNED: "text-secondary border-secondary/30 bg-secondary/10",
  IN_PROGRESS: "text-primary border-primary/30 bg-primary/10",
  COMPLETED: "text-success border-success/30 bg-success/10",
  CANCELLED: "text-muted-foreground border-border bg-card/40",
};

const LABELS: Record<RequestStatus, string> = {
  PENDING: "Pending",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function RequestStatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", STYLES[status])}>
      {LABELS[status]}
    </span>
  );
}