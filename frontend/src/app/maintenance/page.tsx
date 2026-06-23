"use client";

import { Wrench } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { MaintenanceCard } from "@/components/maintenance/maintenance-card";
import { MaintenanceTimeline } from "@/components/maintenance/maintenance-timeline";
import { ChartCard } from "@/components/dashboard/chart-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useMaintenanceRecords, useDeleteMaintenance } from "@/hooks/useAnalytics";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

export default function MaintenancePage() {
  const { data: records, isLoading } = useMaintenanceRecords();
  const { mutate: deleteMaintenance } = useDeleteMaintenance();
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  function handleDelete(id: string) {
    deleteMaintenance(id, {
      onSuccess: () => toast.success("Maintenance record deleted"),
    });
  }

  const riskChartData = records?.map((r) => ({
    lift: `L${r.lift.liftNumber}`,
    riskScore: r.riskScore,
  })) ?? [];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Maintenance Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Predictive risk scoring and service history.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-2xl bg-card/40" />
            ))}
          </div>
        ) : !records?.length ? (
          <EmptyState
            icon={Wrench}
            title="No maintenance records"
            description="Schedule maintenance on a lift to get started."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((r) => (
              <MaintenanceCard
                key={r._id}
                record={r}
                onDelete={(id) => setPendingDelete(id)}
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard title="Risk Score by Lift" subtitle="Higher is worse">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={riskChartData}>
                <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
                <XAxis dataKey="lift" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #1F2937",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="riskScore" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Service Timeline">
            {records && records.length > 0 ? (
              <MaintenanceTimeline records={records} />
            ) : (
              <p className="text-sm text-muted-foreground">No records yet.</p>
            )}
          </ChartCard>
        </div>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete maintenance record?"
        description="This action cannot be undone."
        destructive
        onConfirm={() => pendingDelete && handleDelete(pendingDelete)}
      />
    </DashboardShell>
  );
}