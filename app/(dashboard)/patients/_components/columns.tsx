"use client"
import { Button } from "@/components/ui/button"
import { Patient } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Imię i nazwisko
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const firstName = row.original.firstName
      const lastName = row.getValue("lastName")

      return <p className="font-bold">{`${firstName} ${lastName}`}</p>
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
    header: "",
    cell: ({ row }) => {
      const id = row.getValue("id")
      return (
        <div className="text-right">
          <Link href={`/patients/${id}`}>
            <Button className="bg-[#a6ccca]/15 shadow-none px-10 py-7  font-semibold text-[#058678] hover:text-white">
              Karta pacjenta
            </Button>
          </Link>
        </div>
      )
    },
  },
]
