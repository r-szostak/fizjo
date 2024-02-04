"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { getUserById } from "@/lib/user"
import { PatientSchema } from "@/schemas/patient-schema"
import { z } from "zod"

export const createPatient = async (values: z.infer<typeof PatientSchema>) => {
  console.log(values)
  const user = await currentUser()

  if (!user) {
    return { error: "Musisz być zalogowany!" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: "Brak użytkownika w bazie!" }
  }

  const validatedFields = PatientSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Nieprawidłowe dane!" }
  }

  const { birthDate, firstName, lastName, sex, email, phone } =
    validatedFields.data

  let patient
  try {
    patient = await db.patient.create({
      data: {
        userId: user.id,
        birthDate,
        firstName,
        lastName,
        sex,
        email,
        phone,
      },
    })

    return { patient }
  } catch (error) {
    return { error: "Nie udało się utworzyć pacjenta!" }
  }
}
