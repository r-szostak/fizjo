"use client"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

import { useAppointmentModal } from "@/hooks/use-appointment-modal"
import { useState } from "react"
import { Header } from "./header"
import { PatientForm } from "./multi-step-form"

export const AppointmentModal = () => {
  const [step, setStep] = useState(0)
  const appointmentModal = useAppointmentModal()
  return (
    <Dialog
      open={appointmentModal.isOpen}
      onOpenChange={() => {
        appointmentModal.onClose()
        setStep(0)
      }}
    >
      <DialogContent className="h-full flex-col flex gap-y-10">
        <DialogHeader>
          <Header currentStep={step} />
        </DialogHeader>
        <PatientForm step={step} setStep={setStep} />
        <div />
        <div />
      </DialogContent>
    </Dialog>
  )
}
