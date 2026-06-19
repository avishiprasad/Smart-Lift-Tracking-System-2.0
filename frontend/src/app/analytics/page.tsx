"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ChartCard } from "@/components/dashboard/chart-card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalyticsSummary, useOccupancyHistory, useLiftUsage, useEmergencyEvents, useMaintenanceFrequency } from "@/hooks/useAnalytics";
import { Users, Clock, Building2, AlertTriangle } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const PIE_COLORS = ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

export default function AnalyticsPage() {
  const { data: summary, isLoading: summaryLoading } = useAnalyticsSummary();
  const { data: occupancy } = useOccupancyHistory();
  const { data: usage } = useLiftUsage();
  const { data: emergencies } = useEmergencyEvents();
  const { data: maintenanceFreq } = useMaintenanceFrequency();

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
            <KpiCard label="Passengers Today" value={summary?.passengersToday ?? 0} icon={Users} tone="primary" />
            <KpiCard label="Avg Wait Time" value={summary?.averageWaitTime ?? 0} suffix="s" icon={Clock} tone="secondary" />
            <KpiCard label="Most Used Lift" value={3} prefix="Lift " icon={Building2} tone="success" />
            <KpiCard label="Emergencies (7d)" value={emergencies?.reduce((a, e) => a + e.count, 0) ?? 0} icon={AlertTriangle} tone="danger" />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard title="Occupancy Trend" subtitle="Today, by hour">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={occupancy ?? []}>
                <defs>
                  <linearGradient id="occGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 8 }} />
                <Area type="monotone" dataKey="occupancy" stroke="#8B5CF6" fill="url(#occGradient2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Lift Usage" subtitle="Trips, by lift">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={usage ?? []} dataKey="trips" nameKey="lift" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {(usage ?? []).map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#9CA3AF" }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Emergency Events" subtitle="Last 7 days">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={emergencies ?? []}>
                <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 8 }} />
                <Bar dataKey="count" fill="#EF4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Maintenance Frequency" subtitle="Last 6 months">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={maintenanceFreq ?? []}>
                <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 8 }} />
                <Line type="monotone" dataKey="count" stroke="#06B6D4" strokeWidth={2} dot={{ fill: "#06B6D4", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </DashboardShell>
  );
}