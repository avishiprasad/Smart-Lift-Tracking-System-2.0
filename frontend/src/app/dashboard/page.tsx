"use client";

import { Building2, Activity, Wrench, AlertTriangle, Users, Clock, HeartPulse } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { NotificationPreview } from "@/components/notifications/notification-preview";
import { StatusBadge } from "@/components/lifts/status-badge";
import { useLifts } from "@/hooks/useLifts";
import { useAnalyticsSummary } from "@/hooks/useAnalytics";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { useNotifications } from "@/hooks/useNotifications";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import { useOccupancyHistory, useLiftUsage } from "@/hooks/useAnalytics";
// const occupancyTrend = [
//   { time: "06:00", occupancy: 12 }, { time: "08:00", occupancy: 68 },
//   { time: "10:00", occupancy: 45 }, { time: "12:00", occupancy: 80 },
//   { time: "14:00", occupancy: 55 }, { time: "16:00", occupancy: 40 },
//   { time: "18:00", occupancy: 75 }, { time: "20:00", occupancy: 30 },
// ];

// const usageByLift = [
//   { lift: "L1", trips: 142 }, { lift: "L2", trips: 98 }, { lift: "L3", trips: 176 },
//   { lift: "L4", trips: 64 }, { lift: "L5", trips: 121 }, { lift: "L6", trips: 89 },
// ];

export default function DashboardPage() {
  const { data: lifts, isLoading: liftsLoading } = useLifts();
  const { data: summary, isLoading: summaryLoading } = useAnalyticsSummary();
  const { data: logs, isLoading: logsLoading } = useActivityLogs();
  const { data: notifications, isLoading: notifLoading } = useNotifications();
  const { data: occupancyTrend } = useOccupancyHistory();
  const { data: usageByLift } = useLiftUsage();
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
          <KpiCard label="Passengers Today" value={summary?.passengersToday ?? 0} icon={Users} tone="secondary" />
          <KpiCard label="Avg Wait Time" value={summary?.averageWaitTime ?? 0} suffix="s" icon={Clock} tone="primary" />
          <KpiCard label="System Health" value={summary?.systemHealth ?? 0} suffix="%" icon={HeartPulse} tone="success" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard title="Occupancy Trend" subtitle="Today, by hour">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={occupancyTrend ?? []}>
                <defs>
                  <linearGradient id="occGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 8 }} />
                <Area type="monotone" dataKey="occupancy" stroke="#8B5CF6" fill="url(#occGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Lift Usage" subtitle="Trips today, per lift">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={usageByLift ?? []}>
                <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
                <XAxis dataKey="lift" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 8 }} />
                <Bar dataKey="trips" fill="#06B6D4" radius={[6, 6, 0, 0]} />
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
                  <li key={l.id} className="flex items-center justify-between text-sm">
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