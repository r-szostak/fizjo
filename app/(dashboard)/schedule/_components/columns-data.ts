export interface ScheduleColumnsData {
  hour?: number
  monday: number
  tuesday: number
  wednesday: number
  thursday: number
  friday: number
  saturday: number
  sunday: number
  startHour: { [key: string]: number }
  endHour: { [key: string]: number }
}

export const generateColumnsData = () => {
  const startHours = 8 // Replace with the desired start hour for each day
  const endHours = 18 // Replace with the desired end hour for each day
  const data: ScheduleColumnsData[] = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    monday: hour,
    tuesday: hour,
    wednesday: hour,
    thursday: hour,
    friday: hour,
    saturday: hour,
    sunday: hour,
    startHour: {
      monday: startHours,
      tuesday: startHours,
      wednesday: startHours,
      thursday: 0,
      friday: startHours,
      saturday: startHours,
      sunday: startHours,
    },
    endHour: {
      monday: endHours,
      tuesday: endHours,
      wednesday: endHours,
      thursday: 24,
      friday: endHours,
      saturday: endHours,
      sunday: endHours,
    },
  }))

  return data
}
