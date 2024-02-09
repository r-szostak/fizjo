import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const user = await currentUser()

    if (!user) {
      return { error: "Musisz być zalogowany!" }
    }

    const patients = await db.workingHours.findMany({
      where: {
        userId: user.id,
      },
    })

    return NextResponse.json(patients)
  } catch (error) {
    return new NextResponse("Błąd", { status: 500 })
  }
}
