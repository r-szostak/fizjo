"use client"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePatientModal } from "@/hooks/use-patient-modal"
import { useAppointmentModal } from "@/hooks/use-appointment-modal"

export const UserActions = ({ children }: { children: React.ReactNode }) => {
  const patientModal = usePatientModal()
  const appointmentModal = useAppointmentModal()
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="center"
        className="px-0 pt-3 pb-3 w-60"
      >
        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant={"ghost"}
          type="submit"
          onClick={patientModal.onOpen}
        >
          Dodaj pacjenta
        </Button>
        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant={"ghost"}
          type="submit"
          onClick={appointmentModal.onOpen}
        >
          Zaplanuj wizytę
        </Button>
      </PopoverContent>
    </Popover>
  )
}
