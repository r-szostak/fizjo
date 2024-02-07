import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { generateColumnsData } from "./columns-data"
import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export const SchedulerWrapper = async () => {
  const user = await currentUser()

  if (!user) {
    redirect("/auth/login")
  }

  const workingHours = await db.workingHours.findMany({
    where: {
      userId: user.id,
    },
  })

  const data = generateColumnsData(workingHours)

  return (
    <Card className="max-w-screen-xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl ">Grafik</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  )
}
