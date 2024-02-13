"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { getUserById } from "@/lib/user"
import { AppointmentSchema } from "@/schemas/appointment-schema"
import { isEqual } from "date-fns"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const createAppointment = async (
  values: z.infer<typeof AppointmentSchema>
) => {
  const user = await currentUser()

  if (!user) {
    return { error: "Musisz być zalogowany!" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: "Brak użytkownika w bazie!" }
  }

  const validatedFields = AppointmentSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Nieprawidłowe dane!" }
  }

  const { patientId, date, hour } = validatedFields.data

  let appointment
  try {
    const currentAppointments = await db.appointment.findMany({
      where: {
        patient: {
          userId: user.id,
        },
      },
    })

    const isHourBooked = currentAppointments.find(
      (appointment) =>
        appointment.startHour === hour && isEqual(appointment.date, date)
    )

    if (isHourBooked) {
      return { error: "Ten termin jest już zajęty!" }
    }

    appointment = await db.appointment.create({
      data: {
        patientId,
        date,
        startHour: hour,
      },
    })
    revalidatePath("/patients")
    return { appointment }
  } catch (error) {
    return { error: "Nie udało się utworzyć pacjenta!" }
  }
}
