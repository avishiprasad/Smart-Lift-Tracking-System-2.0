"use client";

import { useQuery } from "@tanstack/react-query";
import { AnalyticsService } from "@/services/AnalyticsService";
import { getMaintenanceRecords } from "@/api/maintenance";
import { AnalyticsSummary } from "@/types";
import { MaintenanceRecord } from "@/lib/mockData";

export function useAnalyticsSummary() {
  return useQuery<AnalyticsSummary>({
    queryKey: ["analytics-summary"],
    queryFn: AnalyticsService.getSummary,
  });
}

export function useMaintenanceRecords() {
  return useQuery<MaintenanceRecord[]>({
    queryKey: ["maintenance-records"],
    queryFn: getMaintenanceRecords,
  });
}