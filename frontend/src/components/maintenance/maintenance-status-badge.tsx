import { cn } from "@/lib/utils";
import { MaintenanceStatus } from "@/types";

const STYLES: Record<MaintenanceStatus, string> = {
  SCHEDULED: "text-secondary border-secondary/30 bg-secondary/10",
  IN_PROGRESS: "text-primary border-primary/30 bg-primary/10",
  COMPLETED: "text-success border-success/30 bg-success/10",
  OVERDUE: "text-danger border-danger/30 bg-danger/10",
  CANCELLED: "text-muted-foreground border-border bg-card/40",
};

const LABELS: Record<MaintenanceStatus, string> = {
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  OVERDUE: "Overdue",
  CANCELLED: "Cancelled",
};

export function MaintenanceStatusBadge({ status }: { status: MaintenanceStatus }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", STYLES[status])}>
      {LABELS[status]}
    </span>
  );
}