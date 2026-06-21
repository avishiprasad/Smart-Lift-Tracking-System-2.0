import { axiosInstance } from "@/lib/axios";
import { ApiResponse, ActivityLog } from "@/types";

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const res = await axiosInstance.get<ApiResponse<ActivityLog[]>>("/activity-logs");
  return res.data.data;
}