"use client";

import { AlertTriangle, Wrench, Info } from "lucide-react";
import { Notification, NotificationType } from "@/types";
import { cn } from "@/lib/utils";

const ICONS: Record<NotificationType, typeof AlertTriangle> = {
  danger: AlertTriangle,
  warning: Wrench,
  info: Info,
};

const TONES: Record<NotificationType, string> = {
  danger: "text-danger bg-danger/15",
  warning: "text-warning bg-warning/15",
  info: "text-secondary bg-secondary/15",
};

export function NotificationCard({ notification }: { notification: Notification }) {
  const Icon = ICONS[notification.type];

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-4">
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", TONES[notification.type])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{notification.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
      </div>
    </div>
  );
}