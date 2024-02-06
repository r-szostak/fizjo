import { DayOfWeek, WorkingHours } from "@prisma/client"

export interface WorkingInterval {
  startHour: number
  endHour: number
  id: string
}

export interface ScheduleColumnsData {
  hour?: number
  monday: number
  tuesday: number
  wednesday: number
  thursday: number
  friday: number
  saturday: number
  sunday: number
  workingHours: {
    [key in DayOfWeek]: WorkingInterval[]
  }
}

export const generateColumnsData = (workingHours: WorkingHours[]) => {
  const data: ScheduleColumnsData[] = Array.from({ length: 24 }, (_, hour) => {
    const dayData: ScheduleColumnsData = {
      hour,
      monday: hour,
      tuesday: hour,
      wednesday: hour,
      thursday: hour,
      friday: hour,
      saturday: hour,
      sunday: hour,
      workingHours: {
        MONDAY: [],
        TUESDAY: [],
        WEDNESDAY: [],
        THURSDAY: [],
        FRIDAY: [],
        SATURDAY: [],
        SUNDAY: [],
      },
    }

    workingHours.forEach((wh) => {
      const dayOfWeekLower = wh.dayOfWeek

      dayData.workingHours[dayOfWeekLower].push({
        startHour: parseInt(wh.startHour),
        endHour: parseInt(wh.endHour),
        id: wh.id
      })
    })

    return dayData
  })

  return data
}
