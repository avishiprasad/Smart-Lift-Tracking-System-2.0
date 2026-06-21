import * as analyticsApi from "@/api/analytics";
import { AnalyticsSummary } from "@/types";

export const AnalyticsService = {
  getSummary: (): Promise<AnalyticsSummary> => analyticsApi.getAnalytics(),
};