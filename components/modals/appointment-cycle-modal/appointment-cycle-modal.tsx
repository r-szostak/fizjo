"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"
import { useAppointmentCycleModal } from "@/hooks/use-appointment-cycle-modal"
import { CycleSelection } from "./cycle-selection"

export const AppointmentCycleModal = () => {
  const { cycleOfAppointments, patientId, appointmentId, isOpen, onClose } =
    useAppointmentCycleModal((state) => state)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[60%] max-w-3xl flex-col flex gap-y-10">
        <DialogHeader className="flex-col justify-center items-center gap-4">
          <Logo height={60} width={60} />
          <DialogTitle className="uppercase text-2xl font-semibold text-[#2c413e]">
            Wybierz cykl
          </DialogTitle>
          <Separator />
        </DialogHeader>

        <CycleSelection
          patientCycles={cycleOfAppointments}
          appointmentId={appointmentId}
          patientId={patientId}
        />
      </DialogContent>
    </Dialog>
  )
}
