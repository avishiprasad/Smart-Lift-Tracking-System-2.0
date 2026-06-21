"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ManageLiftCard } from "@/components/lifts/manage-lift-card";
import { AddLiftDialog } from "@/components/lifts/add-lift-dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useLifts, useUpdateLift, useDeleteLift, useCreateLift } from "@/hooks/useLifts";
import { Building2 } from "lucide-react";
import { Lift } from "@/types";

export default function ManageLiftsPage() {
  const { data: lifts, isLoading } = useLifts();
  const { mutate: updateLift } = useUpdateLift();
  const { mutate: deleteLift } = useDeleteLift();
  const { mutate: createLift } = useCreateLift();
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  function handleUpdate(id: string, data: Partial<Lift>) {
    updateLift({ id, payload: data }, { onSuccess: () => toast.success("Lift updated") });
  }

  function handleDelete(id: string) {
    deleteLift(id, { onSuccess: () => toast.success("Lift removed") });
  }

  function handleReset(id: string) {
    updateLift(
      { id, payload: { currentFloor: 1, targetFloor: null, status: "IDLE" } },
      { onSuccess: () => toast.success("Lift reset to idle") }
    );
  }

  function handleAdd(liftNumber: number, servingFloors: number[]) {
    createLift({ liftNumber, servingFloors }, { onSuccess: () => toast.success(`Lift #${liftNumber} added`) });
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
                key={lift._id}
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