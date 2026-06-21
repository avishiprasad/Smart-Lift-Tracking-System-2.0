"use client";

import { useState } from "react";
import { Pencil, Trash2, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lift, LiftStatus } from "@/types";
import { StatusBadge } from "./status-badge";
import { cn } from "@/lib/utils";

interface ManageLiftCardProps {
  lift: Lift;
  onUpdate: (id: string, data: Partial<Lift>) => void;
  onDelete: (id: string) => void;
  onReset: (id: string) => void;
}

export function ManageLiftCard({ lift, onUpdate, onDelete, onReset }: ManageLiftCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    currentFloor: lift.currentFloor,
    targetFloor: lift.targetFloor ?? 0,
  });

  function save() {
    onUpdate(lift._id, { currentFloor: draft.currentFloor, targetFloor: draft.targetFloor });
    setEditing(false);
  }

  function setStatus(status: LiftStatus) {
    onUpdate(lift._id, { status: lift.status === status ? "IDLE" : status });
  }

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Lift</p>
          <p className="text-lg font-semibold text-white">#{lift.liftNumber}</p>
        </div>
        <StatusBadge status={lift.status} />
      </div>

      {editing ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Current Floor</Label>
            <Input
              type="number"
              value={draft.currentFloor}
              onChange={(e) => setDraft((d) => ({ ...d, currentFloor: Number(e.target.value) }))}
              className="border-border bg-background/60 text-white"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Target Floor</Label>
            <Input
              type="number"
              value={draft.targetFloor}
              onChange={(e) => setDraft((d) => ({ ...d, targetFloor: Number(e.target.value) }))}
              className="border-border bg-background/60 text-white"
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Current Floor</p>
            <p className="font-medium text-white">{lift.currentFloor}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Target Floor</p>
            <p className="font-medium text-white">{lift.targetFloor ?? "—"}</p>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 text-xs">
        <Toggle label="Emergency" active={lift.status === "EMERGENCY"} tone="danger" onClick={() => setStatus("EMERGENCY")} />
        <Toggle label="Maintenance" active={lift.status === "MAINTENANCE"} tone="warning" onClick={() => setStatus("MAINTENANCE")} />
      </div>

      <div className="mt-5 flex gap-2 border-t border-border pt-4">
        {editing ? (
          <Button size="sm" className="flex-1 gap-1.5 bg-success text-white hover:bg-success/90" onClick={save}>
            <Save className="h-3.5 w-3.5" /> Save
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="flex-1 gap-1.5 border-border text-white hover:bg-white/5" onClick={() => setEditing(true)}>
            <Pencil className="h-3.5 w-3.5" /> Update
          </Button>
        )}
        <Button size="sm" variant="outline" className="flex-1 gap-1.5 border-border text-white hover:bg-white/5" onClick={() => onReset(lift._id)}>
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5 border-danger/40 text-danger hover:bg-danger/10" onClick={() => onDelete(lift._id)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

function Toggle({ label, active, tone, onClick }: { label: string; active: boolean; tone: "danger" | "warning"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-2.5 py-1 transition-colors",
        active
          ? tone === "danger"
            ? "border-danger/50 bg-danger/15 text-danger"
            : "border-warning/50 bg-warning/15 text-warning"
          : "border-border text-muted-foreground hover:bg-white/5"
      )}
    >
      {label}
    </button>
  );
}