"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lift } from "@/types";
import { StatusBadge } from "./status-badge";
import { AnimatedElevator } from "./animated-elevator";
import { AlertTriangle, Wrench, RotateCcw } from "lucide-react";

export function LiftDetailModal({ lift, open, onOpenChange }: { lift: Lift | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  if (!lift) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Lift #{lift.liftNumber}
            <StatusBadge status={lift.status} />
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-5">
          <AnimatedElevator currentFloor={lift.currentFloor} totalFloors={12} status={lift.status} direction={lift.direction} />

          <div className="flex-1 space-y-3 text-sm">
            <Row label="Current Floor" value={lift.currentFloor} />
            <Row label="Target Floor" value={lift.targetFloor ?? "—"} />
            <Row label="ETA" value={lift.eta ? `${lift.eta}s` : "—"} />
            <Row label="Occupancy" value={`${lift.occupancy}/${lift.capacity}`} />
            <Row label="Queue" value={lift.requestQueue.join(", ") || "Empty"} />
          </div>
        </div>

        <div className="mt-2 flex gap-2 border-t border-border pt-4">
          <Button variant="outline" className="flex-1 gap-2 border-danger/40 text-danger hover:bg-danger/10">
            <AlertTriangle className="h-4 w-4" /> Emergency Stop
          </Button>
          <Button variant="outline" className="flex-1 gap-2 border-warning/40 text-warning hover:bg-warning/10">
            <Wrench className="h-4 w-4" /> Schedule Maintenance
          </Button>
          <Button variant="outline" className="flex-1 gap-2 border-border text-white hover:bg-white/5">
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}