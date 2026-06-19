import { axiosInstance } from "./axios";
import { Lift, LiftRequest, Notification, ActivityLog, MaintenanceRecord, AnalyticsSummary } from "@/types";

export const api = {
  lifts: {
    getAll: () => axiosInstance.get<Lift[]>("/lifts").then((r) => r.data),
    getById: (id: string) => axiosInstance.get<Lift>(`/lifts/${id}`).then((r) => r.data),
    update: (id: string, data: Partial<Lift>) => axiosInstance.put<Lift>(`/lifts/${id}`, data).then((r) => r.data),
  },
  requests: {
    getAll: () => axiosInstance.get<LiftRequest[]>("/lifts/request").then((r) => r.data),
    create: (data: Partial<LiftRequest>) => axiosInstance.post<LiftRequest>("/lifts/request", data).then((r) => r.data),
  },
  notifications: {
    getAll: () => axiosInstance.get<Notification[]>("/notifications").then((r) => r.data),
    markRead: (id: string) => axiosInstance.patch(`/notifications/${id}/read`).then((r) => r.data),
  },
  logs: {
    getAll: () => axiosInstance.get<ActivityLog[]>("/logs").then((r) => r.data),
  },
  maintenance: {
    getAll: () => axiosInstance.get<MaintenanceRecord[]>("/maintenance").then((r) => r.data),
  },
  analytics: {
    getSummary: () => axiosInstance.get<AnalyticsSummary>("/analytics/occupancy").then((r) => r.data),
  },
};