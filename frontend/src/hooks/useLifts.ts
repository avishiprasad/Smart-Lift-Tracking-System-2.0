"use client";

import { useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { LiftService } from "@/services/LiftService";
import { handleApiError } from "@/lib/error";
import { Lift } from "@/types";
import { getSocket } from "@/lib/socket";

export function useLifts() {
  return useQuery<Lift[]>({
    queryKey: ["lifts"],
    queryFn: LiftService.getAll,
    staleTime: Infinity,
  });
}

export function useCreateLift() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      liftNumber: number;
      servingFloors: number[];
    }) =>
      LiftService.create(payload),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["lifts"],
      }),

    onError: handleApiError,
  });
}

export function useUpdateLift() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Lift>;
    }) =>
      LiftService.update(
        id,
        payload
      ),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["lifts"],
      }),

    onError: handleApiError,
  });
}

export function useDeleteLift() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      LiftService.remove(id),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["lifts"],
      }),

    onError: handleApiError,
  });
}