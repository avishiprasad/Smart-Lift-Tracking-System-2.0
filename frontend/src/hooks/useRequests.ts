"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestService } from "@/services/RequestService";
import { handleApiError } from "@/lib/error";
import { LiftRequest } from "@/types";

export function useRequests() {
  return useQuery<LiftRequest[]>({
    queryKey: ["requests"],
    queryFn: RequestService.getAll,
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { requestedFloor: number; destinationFloor: number }) => RequestService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["requests"] }),
    onError: handleApiError,
  });
}