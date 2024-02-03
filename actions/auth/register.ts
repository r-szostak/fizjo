"use server"

import { RegisterSchema } from "@/schemas/auth-schema"
import { z } from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Nieprawidłowe dane!" }
  }

  return { success: "Zarejstrowano" }
}
