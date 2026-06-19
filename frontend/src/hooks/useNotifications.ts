"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { mockNotifications } from "@/lib/mockData";
import { USE_MOCK_DATA } from "@/lib/constants";
import { Notification } from "@/types";

export function useNotifications() {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => (USE_MOCK_DATA ? Promise.resolve(mockNotifications) : api.notifications.getAll()),
  });
}