import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import React from "react"
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const PatientsPage = async () => {
  const user = await currentUser()

  if (!user) {
    redirect("/auth/login")
  }

  const patients = await db.patient.findMany({
    where: {
      userId: user.id,
    },
  })

  console.log(patients)
  return (
    <Card className="max-w-screen-2xl mx-auto">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={patients} />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export default PatientsPage
