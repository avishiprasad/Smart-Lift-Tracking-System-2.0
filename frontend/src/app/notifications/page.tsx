"use client";

import { Bell } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { NotificationCard } from "@/components/notifications/notification-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useNotifications();

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">Emergency, maintenance, and system alerts.</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full rounded-2xl bg-card/40" />)}
          </div>
        ) : !notifications?.length ? (
          <EmptyState icon={Bell} title="You're all caught up" description="New notifications will appear here." />
        ) : (
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <NotificationCard key={i} notification={n} />
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}