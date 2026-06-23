"use client";

import { useMemo, useState } from "react";
import { History } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ActivityTimeline } from "@/components/activity/activity-timeline";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useActivityLogs } from "@/hooks/useActivityLogs";

export default function ActivityLogsPage() {
  const { data: logs, isLoading } = useActivityLogs();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      logs?.filter(
        (l) =>
          l.description.toLowerCase().includes(search.toLowerCase()) ||
          l.performedBy.toLowerCase().includes(search.toLowerCase())
      ),
    [logs, search]
  );

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Activity Logs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Full audit trail of operational events.
          </p>
        </div>

        <Input
          placeholder="Search by description or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm border-border bg-card/60 text-white placeholder:text-muted-foreground"
        />

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl bg-card/40" />
            ))}
          </div>
        ) : !filtered?.length ? (
          <EmptyState
            icon={History}
            title="No activity found"
            description="Logged events will appear here as they happen."
          />
        ) : (
          <ActivityTimeline logs={filtered} />
        )}
      </div>
    </DashboardShell>
  );
}