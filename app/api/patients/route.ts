import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const user = await currentUser()

    if (!user) {
      return { error: "Musisz być zalogowany!" }
    }

    const patients = await db.patient.findMany({
      where: {
        userId: user.id,
      },
      select: {
        firstName: true,
        lastName: true,
        birthDate: true,
        id: true,
      },
    })

    return NextResponse.json(patients)
  } catch (error) {
    return new NextResponse("Błąd", { status: 500 })
  }
}
