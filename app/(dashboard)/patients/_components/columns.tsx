"use client"
import { Button } from "@/components/ui/button"
import { Patient } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import Link from "next/link"
import { redirect } from "next/navigation"

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "lastName",
    header: "Imię i Nazwisko",
    cell: ({ row }) => {
      const firstName = row.original.firstName
      const lastName = row.getValue("lastName")

      return <p>{`${firstName} ${lastName}`}</p>
    },
  },

  {
    accessorKey: "birthDate",
    header: "Data Urodzenia",
    cell: ({ row }) => {
      const date = new Date(row.getValue("birthDate"))

      return <p>{format(date, "do MMMM yyyy", { locale: pl })}</p>
    },
  },
  {
    accessorKey: "phone",
    header: "Telefon",
  },
  {
    accessorKey: "id",
    header: "przejdź do",
    cell: ({ row }) => {
      const id = row.getValue("id")
      return (
        <Link href={`/patients/${id}`}>
          <Button className="bg-[#46a4a2]/80">Karta pacjenta</Button>
        </Link>
      )
    },
  },
]
