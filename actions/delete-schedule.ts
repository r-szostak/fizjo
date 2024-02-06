"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { getUserById } from "@/lib/user"

import { revalidatePath } from "next/cache"

export const deleteSchedule = async (id: string) => {
  const user = await currentUser()

  if (!user) {
    return { error: "Musisz być zalogowany!" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: "Brak użytkownika w bazie!" }
  }

  let schedule
  try {
    schedule = await db.workingHours.delete({
      where: {
        userId: user.id,
        id,
      },
    })
    revalidatePath("/schedule")
    return { schedule }
  } catch (error) {
    return { error: "Nie udało się usunąć grafiku!" }
  }
}
