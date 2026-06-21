import * as activityLogsApi from "@/api/activityLogs";
import { ActivityLog } from "@/types";

export const ActivityService = {
  getAll: (): Promise<ActivityLog[]> => activityLogsApi.getActivityLogs(),
};