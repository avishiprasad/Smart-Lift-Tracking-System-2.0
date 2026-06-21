import { z } from "zod";

export const createLiftSchema = z.object({
  liftNumber: z.coerce.number().int().positive("Lift number must be positive"),
  servingFloors: z
    .string()
    .min(1, "Enter at least one floor")
    .transform((val) =>
      val.split(",").map((f) => Number(f.trim())).filter((f) => !Number.isNaN(f))
    )
    .refine((floors) => floors.length > 0, "Enter at least one valid floor"),
});

export type CreateLiftFormValues = z.input<typeof createLiftSchema>;

export const editLiftSchema = z.object({
  currentFloor: z.coerce.number().int().min(0),
  targetFloor: z.coerce.number().int().min(0).nullable(),
});

export type EditLiftFormValues = z.input<typeof editLiftSchema>;