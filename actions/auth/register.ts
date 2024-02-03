"use server"

import { RegisterSchema } from "@/schemas/auth-schema"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByLogin } from "@/lib/user"
import { redirect } from "next/navigation"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Nieprawidłowe dane!" }
  }
  const { login, name, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByLogin(login)

  if (existingUser) {
    return { error: "Login zajęty , spróbuj inny." }
  }

  await db.user.create({
    data: {
      name,
      login,
      password: hashedPassword,
    },
  })

  return { success: "Zarejstrowano" }
}
