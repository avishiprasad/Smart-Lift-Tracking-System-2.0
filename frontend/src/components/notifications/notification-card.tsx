"use client";

import { AlertTriangle, Wrench, Info, AlertCircle, Check } from "lucide-react";
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

export function NotificationCard({ notification, onMarkRead }: { notification: Notification; onMarkRead: (id: string) => void }) {
  const Icon = ICONS[notification.type];

  return (
    <div className={cn("flex items-start gap-4 rounded-2xl border bg-card/40 p-4", notification.read ? "border-border" : "border-primary/30")}>
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", TONES[notification.type])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-white">{notification.title}</p>
          {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{new Date(notification.createdAt).toLocaleString()}</span>
          {!notification.read && (
            <button
              onClick={() => onMarkRead(notification.id)}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Check className="h-3 w-3" /> Mark read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}