"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ActivityLog } from "@/types";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

export function RecentActivity({ logs, isLoading }: { logs?: ActivityLog[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-xl bg-card/60" />
        ))}
      </div>
    );
  }

  if (!logs?.length) {
    return <p className="text-sm text-muted-foreground">No recent activity.</p>;
  }

  return (
    <ul className="space-y-3">
      {logs.slice(0, 5).map((log) => (
        <li key={log.id} className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-3">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <div className="min-w-0">
            <p className="truncate text-sm text-white">{log.description}</p>
            <p className="text-xs text-muted-foreground">{log.performedBy} · {timeAgo(log.timestamp)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}