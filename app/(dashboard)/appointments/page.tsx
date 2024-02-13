import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"

const AppointmentsPage = async () => {
  const user = await currentUser()

  if (!user) {
    redirect("/auth/login")
  }

  const appointments = await db.appointment.findMany({
    where: {
      patient: {
        userId: user.id,
      },
    },
    include: {
      patient: {
        include: {
          cycleOfAppointments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  console.log(appointments)
  return (
    <Card className="max-w-screen-xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl ">Pacjenci</CardTitle>
        <Button size="big">Dodaj pacjenta</Button>
      </CardHeader>
      <CardContent className="px-0">
        <DataTable columns={columns} data={appointments} />
      </CardContent>
    </Card>
  )
}

export default AppointmentsPage
