"use server"

import { LoginSchema } from "@/schemas/auth-schema"
import { z } from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Nieprawidłowe dane!" }
  }

  return { success: "Zalogowano" }
}
