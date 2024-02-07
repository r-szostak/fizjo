"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { getUserById } from "@/lib/user"
import { ScheduleSchema } from "@/schemas/schedule-schema"
import { DayOfWeek } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const updateSchedule = async (
  values: z.infer<typeof ScheduleSchema>,
  id: string,
  dayOfWeek: DayOfWeek
) => {
  const user = await currentUser()

  if (!user) {
    return { error: "Musisz być zalogowany!" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: "Brak użytkownika w bazie!" }
  }

  const validatedFields = ScheduleSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Nieprawidłowe dane!" }
  }

  const { endHour, startHour } = validatedFields.data

  if (parseInt(endHour) <= parseInt(startHour)) {
    return {
      error:
        "Godzina zakończenia nie może być mniejsza lub równa godzinie rozpoczęcia!",
    }
  }

  let updatedSchedule
  try {
    const schedules = await db.workingHours.findMany({
      where: {
        userId: user.id,
        dayOfWeek,
      },
    })

    const filteredSchedules = schedules.filter((schedule) => schedule.id !== id)

    if (
      filteredSchedules.some(
        ({ startHour: s, endHour: e }) =>
          (parseInt(startHour) >= parseInt(s) &&
            parseInt(startHour) < parseInt(e)) ||
          (parseInt(endHour) > parseInt(s) &&
            parseInt(endHour) <= parseInt(e)) ||
          (parseInt(startHour) <= parseInt(s) &&
            parseInt(endHour) >= parseInt(e))
      )
    ) {
      return { error: "Godziny nie mogą się na siebie nakładać!" }
    }

    updatedSchedule = await db.workingHours.update({
      where: {
        userId: user.id,
        id,
      },
      data: {
        endHour,
        startHour,
      },
    })
    revalidatePath("/schedule")
    return { updatedSchedule }
  } catch (error) {
    return { error: "Nie udało się edytować grafiku!" }
  }
}
