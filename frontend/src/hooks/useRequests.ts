"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { mockRequests } from "@/lib/mockData";
import { USE_MOCK_DATA } from "@/lib/constants";
import { LiftRequest } from "@/types";

export function useRequests() {
  return useQuery<LiftRequest[]>({
    queryKey: ["requests"],
    queryFn: () => (USE_MOCK_DATA ? Promise.resolve(mockRequests) : api.requests.getAll()),
  });
}