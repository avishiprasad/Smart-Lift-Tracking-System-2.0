"use client";

import { useQuery } from "@tanstack/react-query";
import { ActivityService } from "@/services/ActivityService";
import { ActivityLog } from "@/types";

export function useActivityLogs() {
  return useQuery<ActivityLog[]>({
    queryKey: ["activity-logs"],
    queryFn: ActivityService.getAll,
    retry: 1,
    throwOnError: false,
  });
}