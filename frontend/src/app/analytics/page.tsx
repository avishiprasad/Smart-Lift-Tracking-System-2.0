"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ChartCard } from "@/components/dashboard/chart-card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalyticsSummary } from "@/hooks/useAnalytics";
import { useRequests } from "@/hooks/useRequests";
import { useLifts } from "@/hooks/useLifts";
import { Gauge, Clock, CheckCircle2, Hourglass } from "lucide-react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

const REQUEST_STATUS_COLORS: Record<string, string> = {
  PENDING: "#F59E0B", ASSIGNED: "#06B6D4", IN_PROGRESS: "#8B5CF6", COMPLETED: "#10B981", CANCELLED: "#6B7280",
};

export default function AnalyticsPage() {
  const { data: summary, isLoading: summaryLoading } = useAnalyticsSummary();
  const { data: requests } = useRequests();
  const { data: lifts } = useLifts();

  const requestStatusBreakdown = requests
    ? Object.entries(
        requests.reduce<Record<string, number>>((acc, r) => {
          acc[r.status] = (acc[r.status] ?? 0) + 1;
          return acc;
        }, {})
      ).map(([status, count]) => ({ status, count }))
    : [];

  const occupancyByLift = lifts?.map((l) => ({ lift: `L${l.liftNumber}`, occupancy: l.occupancy })) ?? [];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Operational telemetry across the lift fleet.</p>
        </div>

        {summaryLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-2xl bg-card/40" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <KpiCard label="Completed Requests" value={summary?.completedRequests ?? 0} icon={CheckCircle2} tone="success" />
            <KpiCard label="Pending Requests" value={summary?.pendingRequests ?? 0} icon={Hourglass} tone="warning" />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard title="Request Status Breakdown" subtitle="All requests">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={requestStatusBreakdown} dataKey="count" nameKey="status" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {requestStatusBreakdown.map((entry, i) => (
                    <Cell key={i} fill={REQUEST_STATUS_COLORS[entry.status]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#9CA3AF" }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          
        </div>
      </div>
    </DashboardShell>
  );
}