"use client"

import { PatientModal } from "@/components/modals/patient-modal/patient-modal"
import { VisitModal } from "@/components/modals/visit-modal/visit-modal"
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
      <VisitModal />
    </>
  )
}
