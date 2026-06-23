import { axiosInstance } from "@/lib/axios";
import { ApiResponse, Lift } from "@/types";

export async function getLifts(): Promise<Lift[]> {
  const res = await axiosInstance.get<ApiResponse<Lift[]>>("/lifts");
  // Handle both {success, data: [...]} and direct array responses
  const payload = res.data.data ?? (res.data as unknown as Lift[]);
  return Array.isArray(payload) ? payload : [];
}

export async function createLift(payload: {
  liftNumber: number;
  servingFloors: number[];
}): Promise<Lift> {
  const res = await axiosInstance.post<ApiResponse<Lift>>("/lifts", payload);
  return res.data.data;
}

export async function updateLift(id: string, payload: Partial<Lift>): Promise<Lift> {
  const res = await axiosInstance.put<ApiResponse<Lift>>(`/lifts/${id}`, payload);
  return res.data.data;
}

export async function deleteLift(id: string): Promise<void> {
  await axiosInstance.delete<ApiResponse<null>>(`/lifts/${id}`);
}