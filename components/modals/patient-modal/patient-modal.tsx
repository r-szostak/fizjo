"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { usePatientModal } from "@/hooks/use-patient-modal"
import { CreatePatientForm } from "./create-patient-form"
import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"

export const PatientModal = () => {
  const patientModal = usePatientModal()
  return (
    <Dialog open={patientModal.isOpen} onOpenChange={patientModal.onClose}>
      <DialogContent className="h-[80%] max-w-5xl">
        <DialogHeader className="flex-col justify-center items-center gap-4">
          <Logo height={60} width={60} />
          <DialogTitle className="uppercase text-2xl font-semibold text-[#2c413e]">
            Dodaj pacjenta
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <CreatePatientForm />
      </DialogContent>
    </Dialog>
  )
}
