import { axiosInstance } from "@/lib/axios";
import { ApiResponse, Notification } from "@/types";

export async function getNotifications(): Promise<Notification[]> {
  const res = await axiosInstance.get<ApiResponse<Notification[]>>("/notifications");
  return res.data.data;
}