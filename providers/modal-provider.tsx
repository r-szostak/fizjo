"use client"

import { PatientModal } from "@/components/modals/patient-modal/patient-modal"
import { AppointmentModal } from "@/components/modals/appointment-modal/appointment-modal"
import { useEffect, useState } from "react"

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
    </>
  )
}
