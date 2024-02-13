"use client"
import { Button } from "@/components/ui/button"
import { Appointment, CycleOfAppointments, Patient } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { AppointmentCycle } from "./appointment-cycle"

export type AppointmentWithPatientandCycles = Appointment & {
  patient: Patient & { cycleOfAppointments: CycleOfAppointments[] }
}

export const columns: ColumnDef<AppointmentWithPatientandCycles>[] = [
  {
    accessorKey: "startHour",
    header: "Godz",
    cell: ({ row }) => {
      const startHour = row.getValue("startHour")

      return <p className="font-bold">{`${startHour}:00`}</p>
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("date")

      return <p className="font-bold">{format(date, "d.MM.y")}</p>
    },
  },
  {
    accessorKey: "Patient.lastName",
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
      const firstName = row.original.patient.firstName
      const lastName = row.original.patient.lastName

      return <p className="font-bold">{`${firstName} ${lastName}`}</p>
    },
  },
  {
    accessorKey: "Patient.phone",
    header: "Telefon",
    cell: ({ row }) => {
      const phoneNumber = row.original.patient.phone

      return <p className="font-bold">{phoneNumber}</p>
    },
  },
  {
    accessorKey: "Action",
    header: "",
    cell: ({ row }) => {
      const date: Date = row.getValue("date")
      const appointmentData = row.original

      return <AppointmentCycle appointmentData={appointmentData} date={date} />
    },
  },
]
