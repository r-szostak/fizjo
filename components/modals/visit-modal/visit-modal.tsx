"use client"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

import { useVisitModal } from "@/hooks/use-visit-modal"
import { useState } from "react"
import { Header } from "./header"
import { PatientForm } from "./patient-form"

export const VisitModal = () => {
  const [step, setStep] = useState(0)
  const visitModal = useVisitModal()
  return (
    <Dialog open={visitModal.isOpen} onOpenChange={visitModal.onClose}>
      <DialogContent className="h-full">
        <DialogHeader>
          <Header currentStep={step} />
        </DialogHeader>
        <PatientForm step={step} setStep={setStep} />
      </DialogContent>
    </Dialog>
  )
}
