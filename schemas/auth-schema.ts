import { z } from "zod"

export const LoginSchema = z.object({
  login: z.string(),
  password: z.string().min(3, { message: "Za krótkie hasło." }),
})

export const RegisterSchema = z.object({
  login: z.string().min(1, { message: "Login jest wymagany" }),
  password: z.string().min(6, { message: "Za krótkie hasło" }),
  name: z.string().min(1, { message: "Imię jest wymagane" }),
})
