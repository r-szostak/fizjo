"use server"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas/auth-schema"
import { AuthError } from "next-auth"
import { z } from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Nieprawidłowe dane!" }
  }

  const { login, password } = validatedFields.data

  try {
    await signIn("credentials", {
      login,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Nieprawidłowe dane!" }
        default:
          return { error: "Coś poszło nie tak!" }
      }
    }
    throw error
  }
}
