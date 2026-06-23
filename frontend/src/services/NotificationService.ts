import * as notificationsApi from "@/api/notifications";
import { Notification } from "@/types";

export const NotificationService = {
  getAll: (): Promise<Notification[]> => notificationsApi.getNotifications(),
};