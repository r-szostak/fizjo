"use client"

import { ColumnDef } from "@tanstack/react-table"
import { WorkingHours } from "./working-hours"
import { ScheduleColumnsData } from "./columns-data"
import { DayOfWeek } from "@prisma/client"

export const columns: ColumnDef<ScheduleColumnsData>[] = [
  {
    accessorKey: "hour",
    header: "",
    cell: ({ row }) => {
      const hour = row.original.hour
      return (
        <p className="w-full h-11 relative -bottom-[1.6rem] -left-0 flex items-center justify-center border-l text-xs font-medium text-neutral-500">
          {(hour !== 23 && hour) || hour === 0 ? `${hour + 1}:00` : null}
        </p>
      )
    },
  },
  {
    header: "Poniedziałek",
    accessorKey: "monday",
    cell: ({ row }) => {
      const workingHours = row.original.workingHours
      const currentHour = row.original.monday
      const currentDay = DayOfWeek.MONDAY
      return (
        <WorkingHours
          workingHours={workingHours}
          currentHour={currentHour}
          currentDay={currentDay}
        />
      )
    },
  },

  {
    accessorKey: "tuesday",
    header: "Wtorek",
    cell: ({ row }) => {
      const workingHours = row.original.workingHours
      const currentHour = row.original.tuesday
      const currentDay = DayOfWeek.TUESDAY
      return (
        <WorkingHours
          workingHours={workingHours}
          currentHour={currentHour}
          currentDay={currentDay}
        />
      )
    },
  },
  {
    accessorKey: "wednesday",
    header: "Środa",
    cell: ({ row }) => {
      const workingHours = row.original.workingHours
      const currentHour = row.original.wednesday
      const currentDay = DayOfWeek.WEDNESDAY
      return (
        <WorkingHours
          workingHours={workingHours}
          currentHour={currentHour}
          currentDay={currentDay}
        />
      )
    },
  },
  {
    accessorKey: "thursday",
    header: "Czwartek",
    cell: ({ row }) => {
      const workingHours = row.original.workingHours
      const currentHour = row.original.thursday
      const currentDay = DayOfWeek.THURSDAY
      return (
        <WorkingHours
          workingHours={workingHours}
          currentHour={currentHour}
          currentDay={currentDay}
        />
      )
    },
  },
  {
    accessorKey: "friday",
    header: "Piątek",
    cell: ({ row }) => {
      const workingHours = row.original.workingHours
      const currentHour = row.original.friday
      const currentDay = DayOfWeek.FRIDAY
      return (
        <WorkingHours
          workingHours={workingHours}
          currentHour={currentHour}
          currentDay={currentDay}
        />
      )
    },
  },
  {
    accessorKey: "saturday",
    header: "Sobota",
    cell: ({ row }) => {
      const workingHours = row.original.workingHours
      const currentHour = row.original.saturday
      const currentDay = DayOfWeek.SATURDAY
      return (
        <WorkingHours
          workingHours={workingHours}
          currentHour={currentHour}
          currentDay={currentDay}
        />
      )
    },
  },
  {
    accessorKey: "sunday",
    header: "Niedziela",
    cell: ({ row }) => {
      const workingHours = row.original.workingHours
      const currentHour = row.original.sunday
      const currentDay = DayOfWeek.SUNDAY
      return (
        <WorkingHours
          workingHours={workingHours}
          currentHour={currentHour}
          currentDay={currentDay}
        />
      )
    },
  },
]
