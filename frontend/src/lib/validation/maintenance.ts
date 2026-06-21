import { z } from "zod";

export const scheduleMaintenanceSchema = z.object({
  liftId: z.string().min(1),
  scheduledDate: z.string().min(1, "Pick a date"),
  notes: z.string().max(280).optional(),
});

export type ScheduleMaintenanceFormValues = z.infer<typeof scheduleMaintenanceSchema>;