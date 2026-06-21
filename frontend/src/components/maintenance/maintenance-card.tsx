"use client";

import { Clock, Activity, AlertOctagon } from "lucide-react";
import { MaintenanceRecord } from "@/lib/mockData";
import { RiskIndicator } from "./risk-indicator";
import { ScheduleMaintenanceDialog } from "./schedule-maintenance-dialog";

function daysSince(iso: string) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

export function MaintenanceCard({ record }: { record: MaintenanceRecord }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Lift</p>
          <p className="text-lg font-semibold text-white">#{record.liftNumber}</p>
        </div>
        <AlertOctagon className={record.riskScore >= 75 ? "h-5 w-5 text-danger" : "h-5 w-5 text-muted-foreground"} />
      </div>

      <div className="mt-4">
        <RiskIndicator score={record.riskScore} />
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Last Service</span>
          <span className="text-white">{daysSince(record.lastService)}d ago</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground"><Activity className="h-3.5 w-3.5" /> Usage Hours</span>
          <span className="text-white">{record.usageHours.toLocaleString()}h</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground"><AlertOctagon className="h-3.5 w-3.5" /> Breakdowns</span>
          <span className="text-white">{record.breakdowns}</span>
        </div>
      </div>

      <div className="mt-4">
        <ScheduleMaintenanceDialog liftId={record.liftId} liftNumber={record.liftNumber} />
      </div>
    </div>
  );
}