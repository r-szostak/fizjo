import { cn } from "@/lib/utils"

interface WorkingHoursProps {
  startHour: number
  endHour: number
  actualHour: number
}

export const WorkingHours = ({
  actualHour,
  endHour,
  startHour,
}: WorkingHoursProps) => {
  const height = `${(endHour - startHour) * 64 + (endHour - startHour) - 8}px`

  return (
    <div className="relative">
      {startHour === actualHour ? (
        <div
          role="button"
          className={cn(
            `absolute top-1 left-2 rounded-md    w-[90%]  bg-blue-800  z-10`
          )}
          style={{ height }}
          onClick={() => console.log("klikam absolut")}
        />
      ) : null}
      <div
        role="button"
        className="w-full h-16 active:border flex items-center justify-center border-l "
        onClick={() => console.log("klikam tło")}
      ></div>
    </div>
  )
}
