"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { getUserById } from "@/lib/user"
import { CycleSchema } from "@/schemas/cycle-schema"

import { revalidatePath } from "next/cache"
import { z } from "zod"

export const updateCycle = async (
  values: z.infer<typeof CycleSchema>,
  patientId: string
) => {
  const user = await currentUser()

  if (!user) {
    return { error: "Musisz być zalogowany!" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: "Brak użytkownika w bazie!" }
  }

  const validatedFields = CycleSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Nieprawidłowe dane!" }
  }

  const { formAppointmentId, name, cycleId } = validatedFields.data

  try {
    const currentAppointmentWithCycle = await db.appointment.findUnique({
      where: {
        id: formAppointmentId,
      },
      include: {
        cycleOfAppointment: true,
      },
    })

    if (currentAppointmentWithCycle?.cycleOfAppointment) {
      return { error: "Ta wizyta ma już przypisany cykl!" }
    }

    const cycle = await db.appointment.update({
      where: { id: formAppointmentId },
      data: {
        cycleOfAppointmentId: cycleId,
      },
      include: {
        cycleOfAppointment: true,
      },
    })
    revalidatePath("/appointments")
    return { cycle }
  } catch (error) {
    return { error: "Nie udało się przypisać do cyklu!" }
  }
}
