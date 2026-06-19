"use client";

import { AlertTriangle, Wrench, Info, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Notification, NotificationType } from "@/types";
import { cn } from "@/lib/utils";

const ICONS: Record<NotificationType, typeof AlertTriangle> = {
  emergency: AlertTriangle,
  maintenance: Wrench,
  warning: AlertCircle,
  info: Info,
};

const TONES: Record<NotificationType, string> = {
  emergency: "text-danger bg-danger/15",
  maintenance: "text-warning bg-warning/15",
  warning: "text-warning bg-warning/15",
  info: "text-secondary bg-secondary/15",
};

export function NotificationPreview({ notifications, isLoading }: { notifications?: Notification[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-14 w-full rounded-xl bg-card/60" />
        ))}
      </div>
    );
  }

  if (!notifications?.length) {
    return <p className="text-sm text-muted-foreground">No notifications.</p>;
  }

  return (
    <ul className="space-y-3">
      {notifications.slice(0, 4).map((n) => {
        const Icon = ICONS[n.type];
        return (
          <li key={n.id} className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-3">
            <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", TONES[n.type])}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{n.title}</p>
              <p className="truncate text-xs text-muted-foreground">{n.message}</p>
            </div>
            {!n.read && <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
          </li>
        );
      })}
    </ul>
  );
}