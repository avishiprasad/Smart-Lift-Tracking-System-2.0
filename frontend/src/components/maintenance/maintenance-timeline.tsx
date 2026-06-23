import { Wrench } from "lucide-react";
import { MaintenanceRecord } from "@/types";

export function MaintenanceTimeline({ records }: { records: MaintenanceRecord[] }) {
  const sorted = [...records].sort(
    (a, b) => new Date(b.lastServiceDate).getTime() - new Date(a.lastServiceDate).getTime()
  );

  return (
    <ol className="relative space-y-5 border-l border-border pl-6">
      {sorted.map((r) => (
        <li key={r._id} className="relative">
          <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-warning">
            <Wrench className="h-3 w-3" />
          </span>
          <div className="flex items-center justify-between rounded-xl border border-border bg-card/40 p-3 text-sm">
            <div>
              <span className="text-white">Lift {r.lift.liftNumber}</span>
              <span className="ml-2 text-xs text-muted-foreground">— {r.description}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(r.lastServiceDate).toLocaleDateString()}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}