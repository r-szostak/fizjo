import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas/auth-schema"
import { getUserByLogin } from "./lib/user"
import bcrypt from "bcryptjs"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { login, password } = validatedFields.data

          const user = await getUserByLogin(login)
          if (!user) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
