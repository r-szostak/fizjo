import { cn } from "@/lib/utils"
import { CreateSchedulePopover } from "./create-schedule-popover"
import { DayOfWeek } from "@prisma/client"
import { Clock7 } from "lucide-react"
import { WorkingInterval } from "./columns-data"
import { EditSchedulePopover } from "./edit-schedule-popover"

interface WorkingHoursProps {
  workingHours: {
    [key in DayOfWeek]: WorkingInterval[]
  }
  currentHour: number
  currentDay: DayOfWeek
}

export const WorkingHours = ({
  currentHour,
  workingHours,
  currentDay,
}: WorkingHoursProps) => {
  const dayWorkingHours = workingHours[currentDay] || []

  return (
    <div className="relative">
      {dayWorkingHours.map((interval, index) => {
        const height = `${
          (interval.endHour - interval.startHour) * 44 +
          (interval.endHour - interval.startHour) -
          8
        }px`
        if (interval.startHour === currentHour) {
          return (
            <EditSchedulePopover
              key={index}
              startHour={interval.startHour}
              endHour={interval.endHour}
              currentDay={currentDay}
              id={interval.id}
            >
              <div
                role="button"
                className={cn(
                  `absolute top-1 left-2 rounded-md  w-[90%]  bg-[#f0f8f8] border-2 border-[#01a72b]  z-10`
                )}
                style={{ height }}
              >
                <div className="text-center px-4 pt-2 flex justify-between items-center text-[#37807F]">
                  <Clock7 className="w-4 h-4" />
                  <p className="text-xs font-semibold text-slate-900">{`${interval.startHour}:00 - ${interval.endHour}:00`}</p>
                </div>
              </div>
            </EditSchedulePopover>
          )
        }
      })}

      <CreateSchedulePopover currentHour={currentHour} currentDay={currentDay}>
        <div className="w-full h-11  flex items-center justify-center border-l  " />
      </CreateSchedulePopover>
    </div>
  )
}
