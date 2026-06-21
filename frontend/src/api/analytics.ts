import { axiosInstance } from "@/lib/axios";
import { ApiResponse, AnalyticsSummary } from "@/types";

export async function getAnalytics(): Promise<AnalyticsSummary> {
  const res = await axiosInstance.get<ApiResponse<AnalyticsSummary>>("/analytics");
  return res.data.data;
}