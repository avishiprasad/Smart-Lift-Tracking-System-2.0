"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AnalyticsService } from "@/services/AnalyticsService";
import { MaintenanceService } from "@/services/MaintenanceService";
import { handleApiError } from "@/lib/error";
import {
  AnalyticsSummary,
  MaintenanceRecord,
  CreateMaintenancePayload,
  UpdateMaintenancePayload,
} from "@/types";

export function useAnalyticsSummary() {
  return useQuery<AnalyticsSummary>({
    queryKey: ["analytics-summary"],
    queryFn: AnalyticsService.getSummary,
    retry: 1,
    throwOnError: false,
  });
}

export function useMaintenanceRecords() {
  return useQuery<MaintenanceRecord[]>({
    queryKey: ["maintenance-records"],
    queryFn: MaintenanceService.getAll,
    retry: 1,
    throwOnError: false,
  });
}

export function useCreateMaintenance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMaintenancePayload) => MaintenanceService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["maintenance-records"] }),
    onError: handleApiError,
  });
}

export function useUpdateMaintenance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateMaintenancePayload }) =>
      MaintenanceService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["maintenance-records"] }),
    onError: handleApiError,
  });
}

export function useDeleteMaintenance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => MaintenanceService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["maintenance-records"] }),
    onError: handleApiError,
  });
}