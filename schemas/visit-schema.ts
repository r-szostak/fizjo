import { z } from "zod"

export const VisitSchema = z.object({
  patientId: z.string(),
})
