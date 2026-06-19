"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { mockLifts } from "@/lib/mockData";
import { USE_MOCK_DATA } from "@/lib/constants";
import { Lift } from "@/types";

export function useLifts() {
  return useQuery<Lift[]>({
    queryKey: ["lifts"],
    queryFn: () => (USE_MOCK_DATA ? Promise.resolve(mockLifts) : api.lifts.getAll()),
    refetchInterval: USE_MOCK_DATA ? false : 5000,
  });
}