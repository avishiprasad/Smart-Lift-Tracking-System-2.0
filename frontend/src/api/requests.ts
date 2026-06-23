import { axiosInstance } from "@/lib/axios";
import { ApiResponse, LiftRequest } from "@/types";

export async function getRequests(): Promise<LiftRequest[]> {
  const res = await axiosInstance.get<ApiResponse<LiftRequest[]>>("/requests");
  const payload = res.data.data ?? (res.data as unknown as LiftRequest[]);
  return Array.isArray(payload) ? payload : [];
}

export async function createRequest(payload: {
  requestedFloor: number;
  destinationFloor: number;
}): Promise<LiftRequest> {
  const res = await axiosInstance.post<ApiResponse<LiftRequest>>("/requests", payload);
  return res.data.data;
}