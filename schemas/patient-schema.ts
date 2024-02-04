import { z } from "zod"

export const PatientSchema = z.object({
  firstName: z.string().min(1, { message: "Wpisz imię!" }),
  lastName: z.string().min(1, { message: "Wpisz Nazwisko!" }),
  birthDate: z.date({ required_error: "Data urodzenia jest wymagana!" }),
  sex: z.enum(["male", "female"], {
    required_error: "Musisz wybrać płeć.",
  }),
  email: z
    .string()
    .email({ message: "Nieprawidłowy format adresu email." })
    .optional(),
  phone: z.string().optional(),
})
