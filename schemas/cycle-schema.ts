import { z } from "zod"

export const CycleSchema = z.object({
  formAppointmentId: z
    .string({ required_error: "testapp" })
    .min(1, { message: "test" }),
  cycleId: z.string({ required_error: "testncyc" }).optional(),
  name: z.string({ required_error: "testname" }),
})
