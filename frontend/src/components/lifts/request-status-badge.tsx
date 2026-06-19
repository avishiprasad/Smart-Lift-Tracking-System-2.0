import { cn } from "@/lib/utils";
import { RequestStatus } from "@/types";

const STYLES: Record<RequestStatus, string> = {
  pending: "text-warning border-warning/30 bg-warning/10",
  assigned: "text-secondary border-secondary/30 bg-secondary/10",
  in_progress: "text-primary border-primary/30 bg-primary/10",
  completed: "text-success border-success/30 bg-success/10",
  cancelled: "text-muted-foreground border-border bg-card/40",
};

const LABELS: Record<RequestStatus, string> = {
  pending: "Pending",
  assigned: "Assigned",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function RequestStatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", STYLES[status])}>
      {LABELS[status]}
    </span>
  );
}