import { axiosInstance } from "@/lib/axios";
import { ApiResponse, Notification } from "@/types";

export async function getNotifications(): Promise<Notification[]> {
  const res = await axiosInstance.get<ApiResponse<Notification[]>>("/notifications");
  const payload = res.data.data ?? (res.data as unknown as Notification[]);
  return Array.isArray(payload) ? payload : [];
}