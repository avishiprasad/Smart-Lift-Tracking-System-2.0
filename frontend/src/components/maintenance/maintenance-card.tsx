"use client";

import { Clock, Activity, AlertOctagon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaintenanceRecord } from "@/types";
import { RiskIndicator } from "./risk-indicator";
import { MaintenanceStatusBadge } from "./maintenance-status-badge";
import { ScheduleMaintenanceDialog } from "./schedule-maintenance-dialog";

function daysSince(iso: string) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

function daysUntil(iso: string) {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
}

interface Props {
  record: MaintenanceRecord;
  onDelete: (id: string) => void;
}

export function MaintenanceCard({ record, onDelete }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Lift</p>
          <p className="text-lg font-semibold text-white">#{record.lift.liftNumber}</p>
        </div>
        <MaintenanceStatusBadge status={record.status} />
      </div>

      <div className="mt-4">
        <RiskIndicator score={record.riskScore} />
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Engineer</span>
          <span className="text-white">{record.engineer}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Description</span>
          <span className="max-w-[160px] truncate text-right text-white">{record.description}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> Last Service
          </span>
          <span className="text-white">{daysSince(record.lastServiceDate)}d ago</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> Next Service
          </span>
          <span className={daysUntil(record.nextServiceDate) < 7 ? "text-warning" : "text-white"}>
            {daysUntil(record.nextServiceDate) >= 0
              ? `in ${daysUntil(record.nextServiceDate)}d`
              : `${Math.abs(daysUntil(record.nextServiceDate))}d overdue`}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Activity className="h-3.5 w-3.5" /> Usage Hours
          </span>
          <span className="text-white">{record.usageHours.toLocaleString()}h</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <AlertOctagon className="h-3.5 w-3.5" /> Breakdowns
          </span>
          <span className="text-white">{record.breakdowns}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <div className="flex-1">
          <ScheduleMaintenanceDialog
            liftId={record.lift._id}
            liftNumber={record.lift.liftNumber}
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 border-danger/40 text-danger hover:bg-danger/10"
          onClick={() => onDelete(record._id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}