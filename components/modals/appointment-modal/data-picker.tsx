import { Separator } from "@/components/ui/separator"
import {
  add,
  eachDayOfInterval,
  format,
  setHours,
  getDay,
  sub,
  isEqual,
} from "date-fns"
import { pl } from "date-fns/locale"
import { ChevronLeftSquare, ChevronRightSquare } from "lucide-react"
import React from "react"
import { ISelectedDateTime } from "./multi-step-form"
import { cn } from "@/lib/utils"

import { Appointment, WorkingHours } from "@prisma/client"

import { generateEnumDayOfWeek } from "./utils"

interface DataPickerProps {
  selectedDateTime: ISelectedDateTime
  setSelectedDateTime: (selectedDate: Date, hour: number) => void
  workingHours: WorkingHours[] | undefined
  currentAppointments: Appointment[] | undefined
  dateRange: {
    startDay: Date
    endDay: Date
  }
  setDateRange: React.Dispatch<
    React.SetStateAction<{
      startDay: Date
      endDay: Date
    }>
  >
}

export const DataPicker = ({
  selectedDateTime,
  setSelectedDateTime,
  workingHours,
  currentAppointments,
  dateRange,
  setDateRange,
}: DataPickerProps) => {
  const handleButtonClick = (date: Date, hourIndex: number) => {
    const selectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )

    setSelectedDateTime(selectedDate, hourIndex)
  }
  console.log(currentAppointments)
  return (
    <div className="max-w-xl w-full max-h-80 overflow-y-auto rounded-md border">
      <div className="flex justify-between items-center py-4 px-2 text-sm ">
        <ChevronLeftSquare
          className="h-6 w-6 "
          onClick={() =>
            setDateRange((prev) => ({
              startDay: sub(prev.startDay, { days: 7 }),
              endDay: sub(prev.endDay, { days: 7 }),
            }))
          }
        />
        <p>{`${format(dateRange.startDay, "d", { locale: pl })} - ${format(
          dateRange.endDay,
          "dd MMM y ",
          { locale: pl }
        )}`}</p>
        <ChevronRightSquare
          className="h-6 w-6"
          onClick={() =>
            setDateRange((prev) => ({
              startDay: add(prev.startDay, { days: 7 }),
              endDay: add(prev.endDay, { days: 7 }),
            }))
          }
        />
      </div>
      <Separator />

      <div className="flex w-full justify-between px-[6px] gap-1  text-xs ">
        {eachDayOfInterval({
          start: dateRange.startDay,
          end: dateRange.endDay,
        }).map((day, index) => (
          <div key={index} className="flex flex-col gap-2 gap-x-4 text-center">
            <p className="uppercase text-[#46a4a2] pt-1">
              {format(day, "EEEEEE", { locale: pl })}
            </p>
            <p className="text-slate-600">
              {format(day, "dd.MM", { locale: pl })}
            </p>
            {/* Render each full hour for the day */}
            {Array.from({ length: 24 }).map((_, hourIndex) => {
              const dayOfWeekIndex = getDay(day)

              // Map day of week index to enum DayOfWeek
              const dayOfWeek = generateEnumDayOfWeek(dayOfWeekIndex)

              const isWorkingHours = workingHours?.find(
                (wh) =>
                  parseInt(wh.startHour) <= hourIndex &&
                  parseInt(wh.endHour) >= hourIndex &&
                  wh.dayOfWeek === dayOfWeek
              )
              const isHourBooked = currentAppointments?.find(
                (appointment) =>
                  parseInt(appointment.startHour) === hourIndex &&
                  isEqual(appointment.date, day)
              )
              if (isWorkingHours && !isHourBooked) {
                return (
                  <button
                    type="button"
                    key={hourIndex}
                    onClick={() => handleButtonClick(day, hourIndex)}
                    className={cn(
                      "py-2 px-3 rounded-md bg-slate-100 font-semibold text-[#272848]",
                      selectedDateTime.hour === hourIndex &&
                        selectedDateTime.date.getTime() === day.getTime() &&
                        "bg-[#46a4a2]"
                    )}
                  >
                    {format(setHours(day, hourIndex), "HH:mm")}
                  </button>
                )
              }
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
