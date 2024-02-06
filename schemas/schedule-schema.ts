import { z } from "zod"

export const ScheduleSchema = z.object({
  startHour: z.string(),
  endHour: z.string(),
})
