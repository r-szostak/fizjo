"use client"

import { PatientModal } from "@/components/modals/patient-modal/patient-modal"
import { AppointmentModal } from "@/components/modals/appointment-modal/appointment-modal"
import { useEffect, useState } from "react"
import { AppointmentCycleModal } from "@/components/modals/appointment-cycle-modal/appointment-cycle-modal"

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <PatientModal />
      <AppointmentModal />
      <AppointmentCycleModal />
    </>
  )
}
