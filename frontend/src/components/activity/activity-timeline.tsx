"use client";

import { Activity as ActivityIcon } from "lucide-react";
import { ActivityLog } from "@/types";

export function ActivityTimeline({ logs }: { logs: ActivityLog[] }) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6">
      {logs.map((log) => (
        <li key={log._id} className="relative">
          <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-primary">
            <ActivityIcon className="h-3 w-3" />
          </span>
          <div className="rounded-xl border border-border bg-card/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">{log.action.replace(/_/g, " ")}</span>
              <span className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</span>
            </div>
            <p className="mt-2 text-sm text-white">{log.description}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              By {log.performedBy}{log.lift ? ` · Lift ${log.lift.liftNumber}` : ""}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}