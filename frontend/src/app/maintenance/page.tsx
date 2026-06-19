"use client";

import { toast } from "sonner";
import { Wrench } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { MaintenanceCard } from "@/components/maintenance/maintenance-card";
import { MaintenanceTimeline } from "@/components/maintenance/maintenance-timeline";
import { ChartCard } from "@/components/dashboard/chart-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useMaintenanceRecords } from "@/hooks/useAnalytics";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const calendarPlaceholder = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  intensity: Math.random() > 0.8 ? Math.ceil(Math.random() * 3) : 0,
}));

export default function MaintenancePage() {
  const { data: records, isLoading } = useMaintenanceRecords();

  function handleSchedule(id: string) {
    toast(`Maintenance scheduled for ${id}`);
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Maintenance Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Predictive risk scoring and service history.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-56 w-full rounded-2xl bg-card/40" />)}
          </div>
        ) : !records?.length ? (
          <EmptyState icon={Wrench} title="No maintenance records" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((r) => (
              <MaintenanceCard key={r.id} record={r} onSchedule={handleSchedule} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard title="Risk Score by Lift" subtitle="Higher is worse">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={records ?? []}>
                <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
                <XAxis dataKey="liftNumber" stroke="#9CA3AF" fontSize={11} tickFormatter={(v) => `L${v}`} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 8 }} />
                <Bar dataKey="riskScore" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Maintenance Calendar" subtitle="Last 30 days">
            <div className="grid grid-cols-10 gap-1.5">
              {calendarPlaceholder.map((d) => (
                <div
                  key={d.day}
                  title={`Day ${d.day}`}
                  className="aspect-square rounded-sm"
                  style={{
                    backgroundColor:
                      d.intensity === 0 ? "#1F2937" :
                      d.intensity === 1 ? "rgba(245,158,11,0.35)" :
                      d.intensity === 2 ? "rgba(245,158,11,0.65)" : "#F59E0B",
                  }}
                />
              ))}
            </div>
          </ChartCard>
        </div>

        {records && records.length > 0 && (
          <ChartCard title="Service Timeline">
            <MaintenanceTimeline records={records} />
          </ChartCard>
        )}
      </div>
    </DashboardShell>
  );
}