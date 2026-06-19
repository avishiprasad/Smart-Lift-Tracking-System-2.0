"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  mockAnalyticsSummary, mockMaintenanceRecords, mockOccupancyHistory,
  mockLiftUsage, mockEmergencyEvents, mockMaintenanceFrequency,
} from "@/lib/mockData";
import { USE_MOCK_DATA } from "@/lib/constants";
import {
  AnalyticsSummary, MaintenanceRecord, OccupancyPoint,
  LiftUsagePoint, EmergencyEventPoint, MaintenanceFrequencyPoint,
} from "@/types";

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

export function useOccupancyHistory() {
  return useQuery<OccupancyPoint[]>({
    queryKey: ["occupancy-history"],
    queryFn: () => Promise.resolve(mockOccupancyHistory),
  });
}

export function useLiftUsage() {
  return useQuery<LiftUsagePoint[]>({
    queryKey: ["lift-usage"],
    queryFn: () => Promise.resolve(mockLiftUsage),
  });
}

export function useEmergencyEvents() {
  return useQuery<EmergencyEventPoint[]>({
    queryKey: ["emergency-events"],
    queryFn: () => Promise.resolve(mockEmergencyEvents),
  });
}

export function useMaintenanceFrequency() {
  return useQuery<MaintenanceFrequencyPoint[]>({
    queryKey: ["maintenance-frequency"],
    queryFn: () => Promise.resolve(mockMaintenanceFrequency),
  });
}