import * as requestsApi from "@/api/requests";
import { LiftRequest } from "@/types";

export const RequestService = {
  getAll: (): Promise<LiftRequest[]> => requestsApi.getRequests(),
  create: (payload: { requestedFloor: number; destinationFloor: number }): Promise<LiftRequest> =>
    requestsApi.createRequest(payload),
};