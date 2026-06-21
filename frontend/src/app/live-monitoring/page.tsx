"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { LiftCard } from "@/components/lifts/lift-card";
import { LiftDetailModal } from "@/components/lifts/lift-detail-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { useLifts } from "@/hooks/useLifts";
import { Lift } from "@/types";

export default function LiveMonitoringPage() {
  const { data: lifts, isLoading } = useLifts();
  const [selected, setSelected] = useState<Lift | null>(null);

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Live Monitoring</h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time status across every lift in the building.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl bg-card/40" />
            ))}
          </div>
        ) : !lifts?.length ? (
          <div className="rounded-2xl border border-border bg-card/40 p-10 text-center text-muted-foreground">
            No lifts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lifts.map((lift) => (
              <LiftCard key={lift._id} lift={lift} onClick={() => setSelected(lift)} />
            ))}
          </div>
        )}
      </div>

      <LiftDetailModal lift={selected} open={!!selected} onOpenChange={(open) => !open && setSelected(null)} />
    </DashboardShell>
  );
}