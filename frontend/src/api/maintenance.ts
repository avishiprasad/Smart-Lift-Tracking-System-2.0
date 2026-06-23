import { axiosInstance } from "@/lib/axios";
import {
  ApiResponse,
  MaintenanceRecord,
  CreateMaintenancePayload,
  UpdateMaintenancePayload,
} from "@/types";

export async function getMaintenanceRecords(): Promise<MaintenanceRecord[]> {
  const res = await axiosInstance.get<ApiResponse<MaintenanceRecord[]>>("/maintenance");
  const payload = res.data.data ?? (res.data as unknown as MaintenanceRecord[]);
  return Array.isArray(payload) ? payload : [];
}

export async function createMaintenanceRecord(
  payload: CreateMaintenancePayload
): Promise<MaintenanceRecord> {
  const res = await axiosInstance.post<ApiResponse<MaintenanceRecord>>("/maintenance", payload);
  return res.data.data;
}

export async function updateMaintenanceRecord(
  id: string,
  payload: UpdateMaintenancePayload
): Promise<MaintenanceRecord> {
  const res = await axiosInstance.put<ApiResponse<MaintenanceRecord>>(
    `/maintenance/${id}`,
    payload
  );
  return res.data.data;
}

export async function deleteMaintenanceRecord(id: string): Promise<void> {
  await axiosInstance.delete<ApiResponse<null>>(`/maintenance/${id}`);
}