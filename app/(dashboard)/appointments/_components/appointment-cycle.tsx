import { Button } from "@/components/ui/button"
import { useAppointmentCycleModal } from "@/hooks/use-appointment-cycle-modal"
import { cn } from "@/lib/utils"
import { CycleOfAppointments } from "@prisma/client"
import { add, isBefore, sub } from "date-fns"
import { AppointmentWithPatientandCycles } from "./columns"

interface AppointmentCycleProps {
  appointmentData?: AppointmentWithPatientandCycles
  date: Date
}

export const AppointmentCycle = ({
  appointmentData,
  date,
}: AppointmentCycleProps) => {
  const appointmentCycleModal = useAppointmentCycleModal()

  if (!appointmentData?.cycleOfAppointmentId) {
    return (
      <Button
        onClick={() =>
          appointmentCycleModal.onOpen(
            appointmentData!.patient.cycleOfAppointments,
            appointmentData!.id,
            appointmentData!.patientId
          )
        }
        className={cn(
          "py-4",
          isBefore(date, sub(new Date(), { days: 1 })) && "bg-red-700"
        )}
      >
        Rozpocznij wizytę
      </Button>
    )
  }
  return (
    <Button
      onClick={() =>
        appointmentCycleModal.onOpen(
          appointmentData.patient.cycleOfAppointments,
          appointmentData!.id,
          appointmentData!.patientId
        )
      }
    >
      Otwórz
    </Button>
  )
}
