import { z } from "zod";

export const createRequestSchema = z
  .object({
    requestedFloor: z.coerce
      .number()
      .int()
      .min(0, "Required"),

    destinationFloor: z.coerce
      .number()
      .int()
      .min(0, "Required"),
  })
  .refine(
    (data) =>
      data.requestedFloor !==
      data.destinationFloor,
    {
      message:
        "Destination must differ from pickup floor",
      path: ["destinationFloor"],
    }
  );

export type CreateRequestFormValues =
  z.input<typeof createRequestSchema>;