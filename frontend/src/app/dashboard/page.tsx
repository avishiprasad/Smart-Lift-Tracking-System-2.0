"use client";

import { Building2, Activity, Wrench, AlertTriangle, Gauge, Clock, CheckCircle2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { NotificationPreview } from "@/components/notifications/notification-preview";
import { StatusBadge } from "@/components/lifts/status-badge";
import { useLifts } from "@/hooks/useLifts";
import { useRequests } from "@/hooks/useRequests";
import { useAnalyticsSummary } from "@/hooks/useAnalytics";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { useNotifications } from "@/hooks/useNotifications";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const STATUS_COLORS_CHART: Record<string, string> = {
  IDLE: "#06B6D4", MOVING: "#10B981", MAINTENANCE: "#F59E0B", EMERGENCY: "#EF4444",
};

export default function DashboardPage() {
  const { data: lifts, isLoading: liftsLoading } = useLifts();
  const { data: requests } = useRequests();
  const { data: summary, isLoading: summaryLoading } = useAnalyticsSummary();
  const { data: logs, isLoading: logsLoading } = useActivityLogs();
  const { data: notifications, isLoading: notifLoading } = useNotifications();

  const statusBreakdown = lifts
    ? Object.entries(
        lifts.reduce<Record<string, number>>((acc, l) => {
          acc[l.status] = (acc[l.status] ?? 0) + 1;
          return acc;
        }, {})
      ).map(([status, count]) => ({ status, count }))
    : [];

    const requestsByLift = lifts
    ? lifts.map((l) => ({
        lift: `L${l.liftNumber}`,
        requests:
          requests?.filter(
            (r) => r.assignedLift?._id === l._id
          ).length ?? 0,
      }))
    : [];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">System-wide overview, refreshed in real time.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          <KpiCard label="Total Lifts" value={summary?.totalLifts ?? 0} icon={Building2} tone="primary" />
          <KpiCard label="Active" value={summary?.activeLifts ?? 0} icon={Activity} tone="success" />
          <KpiCard label="Maintenance" value={summary?.maintenanceLifts ?? 0} icon={Wrench} tone="warning" />
          <KpiCard label="Emergency" value={summary?.emergencyLifts ?? 0} icon={AlertTriangle} tone="danger" />
          <KpiCard label="Avg Occupancy" value={Number(summary?.avgOccupancy ?? 0)} icon={Gauge} tone="secondary" />
          <KpiCard label="Avg ETA" value={Number(summary?.avgETA ?? 0)} suffix="s" icon={Clock} tone="primary" />
          <KpiCard label="Completed Requests" value={summary?.completedRequests ?? 0} icon={CheckCircle2} tone="success" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard title="Lift Status Breakdown" subtitle="Live, across all lifts">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusBreakdown} dataKey="count" nameKey="status" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {statusBreakdown.map((entry, i) => (
                    <Cell key={i} fill={STATUS_COLORS_CHART[entry.status]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#9CA3AF" }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Requests by Lift" subtitle="Assigned, currently">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={requestsByLift}>
                <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
                <XAxis dataKey="lift" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 8 }} />
                <Bar dataKey="requests" fill="#06B6D4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ChartCard title="Recent Activity">
            <RecentActivity logs={logs} isLoading={logsLoading} />
          </ChartCard>

          <ChartCard title="Live Lift Status">
            {liftsLoading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : (
              <ul className="space-y-2.5">
                {lifts?.map((l) => (
                  <li key={l._id} className="flex items-center justify-between text-sm">
                    <span className="text-white">Lift {l.liftNumber}</span>
                    <StatusBadge status={l.status} />
                  </li>
                ))}
              </ul>
            )}
          </ChartCard>

          <ChartCard title="Notifications">
            <NotificationPreview notifications={notifications} isLoading={notifLoading} />
          </ChartCard>
        </div>
      </div>
    </DashboardShell>
  );
}