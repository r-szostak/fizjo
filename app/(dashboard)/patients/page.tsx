import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import React from "react"
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const PatientsPage = async () => {
  const user = await currentUser()

  if (!user) {
    redirect("/auth/login")
  }

  const patients = await db.patient.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <Card className="max-w-screen-xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl ">Pacjenci</CardTitle>
        <Button size="big">Dodaj pacjenta</Button>
      </CardHeader>
      <CardContent className="px-0">
        <DataTable columns={columns} data={patients} />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export default PatientsPage
