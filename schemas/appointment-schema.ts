import { z } from "zod"

export const AppointmentSchema = z.object({
  patientId: z.string().min(1),
  hour: z.string(),
  date: z.date(),
})
