import { z } from "zod";

export const createMaintenanceSchema = z.object({
  lift: z.string().min(1, "Select a lift"),
  engineer: z.string().min(1, "Engineer name is required"),
  description: z.string().min(1, "Description is required").max(500),
  usageHours: z.coerce.number().int().min(0, "Must be 0 or more"),
  breakdowns: z.coerce.number().int().min(0, "Must be 0 or more"),
  lastServiceDate: z.string().min(1, "Last service date is required"),
  nextServiceDate: z.string().min(1, "Next service date is required"),
});

// Input type = what the form fields contain (strings from HTML inputs)
export type CreateMaintenanceFormInput = z.input<typeof createMaintenanceSchema>;

// Output type = what Zod produces after coercion (numbers)
export type CreateMaintenanceFormValues = z.output<typeof createMaintenanceSchema>;

export const updateMaintenanceStatusSchema = z.object({
  status: z.enum(["SCHEDULED", "IN_PROGRESS", "COMPLETED", "OVERDUE", "CANCELLED"]),
});

export type UpdateMaintenanceStatusFormValues = z.infer<typeof updateMaintenanceStatusSchema>;