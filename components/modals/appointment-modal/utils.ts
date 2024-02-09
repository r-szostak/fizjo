import { DayOfWeek } from "@prisma/client"

export const generateEnumDayOfWeek = (dayName: number) => {
  switch (dayName) {
    case 0:
      return DayOfWeek.SUNDAY

    case 1:
      return DayOfWeek.MONDAY

    case 2:
      return DayOfWeek.TUESDAY

    case 3:
      return DayOfWeek.WEDNESDAY

    case 4:
      return DayOfWeek.THURSDAY

    case 5:
      return DayOfWeek.FRIDAY

    case 6:
      return DayOfWeek.SATURDAY

    default:
      throw new Error("Invalid day of week index")
  }
}
