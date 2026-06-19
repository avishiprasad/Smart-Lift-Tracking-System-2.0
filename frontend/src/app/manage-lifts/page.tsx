"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ManageLiftCard } from "@/components/lifts/manage-lift-card";
import { AddLiftDialog } from "@/components/lifts/add-lift-dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useLifts } from "@/hooks/useLifts";
import { toast } from "sonner";
import { Building2 } from "lucide-react";
import { Lift } from "@/types";

export default function ManageLiftsPage() {
  const { data: lifts, isLoading } = useLifts();
  const queryClient = useQueryClient();

  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  function patchCache(updater: (lifts: Lift[]) => Lift[]) {
    queryClient.setQueryData<Lift[]>(["lifts"], (old) => (old ? updater(old) : old));
  }

  function handleUpdate(id: string, data: Partial<Lift>) {
    patchCache((lifts) => lifts.map((l) => (l.id === id ? { ...l, ...data } : l)));
    toast("Lift updated");
  }

  function handleDelete(id: string) {
    patchCache((lifts) => lifts.filter((l) => l.id !== id));
    toast("Lift removed");
  }

  function handleReset(id: string) {
    patchCache((lifts) =>
      lifts.map((l) =>
        l.id === id ? { ...l, currentFloor: 1, targetFloor: null, status: "idle", emergency: false, maintenance: false, requestQueue: [] } : l
      )
    );
    toast("Lift reset to idle");
  }

  function handleAdd(liftNumber: number, capacity: number) {
    patchCache((lifts) => [
      ...lifts,
      {
        id: `lift-${Date.now()}`,
        liftNumber,
        currentFloor: 1,
        targetFloor: null,
        direction: "idle",
        status: "idle",
        occupancy: 0,
        capacity,
        speed: 1.2,
        eta: null,
        emergency: false,
        maintenance: false,
        requestQueue: [],
      },
    ]);
    toast(`Lift #${liftNumber} added`);
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Manage Lifts</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add, edit, and configure lifts in the building.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-72 w-full rounded-2xl bg-card/40" />)}
          </div>
        ) : !lifts?.length ? (
          <EmptyState icon={Building2} title="No lifts configured" description="Add your first lift to get started." />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lifts.map((lift) => (
              <ManageLiftCard
                key={lift.id}
                lift={lift}
                onUpdate={handleUpdate}
                onDelete={(id) => setPendingDelete(id)}
                onReset={handleReset}
              />
            ))}
          </div>
        )}
      </div>

      <AddLiftDialog onAdd={handleAdd} />

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete this lift?"
        description="This action cannot be undone. The lift will be removed from monitoring."
        destructive
        onConfirm={() => pendingDelete && handleDelete(pendingDelete)}
      />
    </DashboardShell>
  );
}