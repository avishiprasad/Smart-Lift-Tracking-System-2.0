import { axiosInstance } from "@/lib/axios";
import { ApiResponse, ActivityLog } from "@/types";

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const res = await axiosInstance.get<ApiResponse<ActivityLog[]>>("/activity-logs");
  const payload = res.data.data ?? (res.data as unknown as ActivityLog[]);
  return Array.isArray(payload) ? payload : [];
}