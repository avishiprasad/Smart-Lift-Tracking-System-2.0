"use client";

import { useQuery } from "@tanstack/react-query";
import { NotificationService } from "@/services/NotificationService";
import { Notification } from "@/types";

export function useNotifications() {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: NotificationService.getAll,
    refetchInterval: 10_000,
  });
}