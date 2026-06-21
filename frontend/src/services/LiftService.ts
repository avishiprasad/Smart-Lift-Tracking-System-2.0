import * as liftsApi from "@/api/lifts";
import { Lift } from "@/types";

export const LiftService = {
  getAll: (): Promise<Lift[]> => liftsApi.getLifts(),
  create: (payload: { liftNumber: number; servingFloors: number[] }): Promise<Lift> => liftsApi.createLift(payload),
  update: (id: string, payload: Partial<Lift>): Promise<Lift> => liftsApi.updateLift(id, payload),
  remove: (id: string): Promise<void> => liftsApi.deleteLift(id),
};