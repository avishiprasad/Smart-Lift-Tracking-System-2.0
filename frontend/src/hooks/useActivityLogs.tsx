"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { mockActivityLogs } from "@/lib/mockData";
import { USE_MOCK_DATA } from "@/lib/constants";
import { ActivityLog } from "@/types";

export function useActivityLogs() {
  return useQuery<ActivityLog[]>({
    queryKey: ["activity-logs"],
    queryFn: () => (USE_MOCK_DATA ? Promise.resolve(mockActivityLogs) : api.logs.getAll()),
  });
}