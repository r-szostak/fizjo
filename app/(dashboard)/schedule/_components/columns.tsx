"use client"

import { ColumnDef } from "@tanstack/react-table"
import { WorkingHours } from "./working-hours"
import { ScheduleColumnsData } from "./columns-data"

export const columns: ColumnDef<ScheduleColumnsData>[] = [
  {
    accessorKey: "hour",
    header: "",
    cell: ({ row }) => {
      const hour = row.original.hour
      return (
        <p className="w-full h-16 relative -bottom-8 -left-2 flex items-center justify-center border-l">
          {(hour !== 23 && hour) || hour === 0 ? `${hour + 1}:00` : null}
        </p>
      )
    },
  },
  {
    header: "Poniedziałek",
    accessorKey: "monday",
    cell: ({ row }) => {
      const startHour = row.original.startHour.monday
      const endHour = row.original.endHour.monday
      const actualHour = row.original.monday
      return (
        <WorkingHours
          startHour={startHour}
          endHour={endHour}
          actualHour={actualHour}
        />
      )
    },
  },

  {
    accessorKey: "tuesday",
    header: "Wtorek",
    cell: ({ row }) => {
      const startHour = row.original.startHour.tuesday
      const endHour = row.original.endHour.tuesday
      const actualHour = row.original.tuesday
      return (
        <WorkingHours
          startHour={startHour}
          endHour={endHour}
          actualHour={actualHour}
        />
      )
    },
  },
  {
    accessorKey: "wednesday",
    header: "Środa",
    cell: ({ row }) => {
      const startHour = row.original.startHour.wednesday
      const endHour = row.original.endHour.wednesday
      const actualHour = row.original.wednesday
      return (
        <WorkingHours
          startHour={startHour}
          endHour={endHour}
          actualHour={actualHour}
        />
      )
    },
  },
  {
    accessorKey: "thursday",
    header: "Czwartek",
    cell: ({ row }) => {
      const startHour = row.original.startHour.thursday
      const endHour = row.original.endHour.thursday
      const actualHour = row.original.thursday
      return (
        <WorkingHours
          startHour={startHour}
          endHour={endHour}
          actualHour={actualHour}
        />
      )
    },
  },
  {
    accessorKey: "friday",
    header: "Piątek",
    cell: ({ row }) => {
      const startHour = row.original.startHour.friday
      const endHour = row.original.endHour.friday
      const actualHour = row.original.friday
      return (
        <WorkingHours
          startHour={startHour}
          endHour={endHour}
          actualHour={actualHour}
        />
      )
    },
  },
  {
    accessorKey: "saturday",
    header: "Sobota",
    cell: ({ row }) => {
      const startHour = row.original.startHour.saturday
      const endHour = row.original.endHour.saturday
      const actualHour = row.original.saturday
      return (
        <WorkingHours
          startHour={startHour}
          endHour={endHour}
          actualHour={actualHour}
        />
      )
    },
  },
  {
    accessorKey: "sunday",
    header: "Niedziela",
    cell: ({ row }) => {
      const startHour = row.original.startHour.sunday
      const endHour = row.original.endHour.sunday
      const actualHour = row.original.sunday
      return (
        <WorkingHours
          startHour={startHour}
          endHour={endHour}
          actualHour={actualHour}
        />
      )
    },
  },
]
