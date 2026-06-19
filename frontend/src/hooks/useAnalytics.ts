"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { mockAnalyticsSummary, mockMaintenanceRecords } from "@/lib/mockData";
import { USE_MOCK_DATA } from "@/lib/constants";
import { AnalyticsSummary, MaintenanceRecord } from "@/types";

export function useAnalyticsSummary() {
  return useQuery<AnalyticsSummary>({
    queryKey: ["analytics-summary"],
    queryFn: () => (USE_MOCK_DATA ? Promise.resolve(mockAnalyticsSummary) : api.analytics.getSummary()),
  });
}

export function useMaintenanceRecords() {
  return useQuery<MaintenanceRecord[]>({
    queryKey: ["maintenance-records"],
    queryFn: () => (USE_MOCK_DATA ? Promise.resolve(mockMaintenanceRecords) : api.maintenance.getAll()),
  });
}