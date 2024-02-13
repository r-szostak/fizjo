import { CycleOfAppointments } from "@prisma/client"
import { create } from "zustand"
type AppointmentCycleModalStore = {
  cycleOfAppointments?: CycleOfAppointments[] | null
  isOpen: boolean
  appointmentId: string
  patientId: string
  onOpen: (
    cycleOfAppointments: CycleOfAppointments[] | null,
    appointmentId: string,
    patientId: string
  ) => void
  onClose: () => void
}

export const useAppointmentCycleModal = create<AppointmentCycleModalStore>(
  (set) => ({
    cycleOfAppointments: null,
    isOpen: false,
    appointmentId: "",
    patientId: "",
    onOpen: (
      cycleOfAppointments: CycleOfAppointments[] | null,
      appointmentId: string,
      patientId: string
    ) => set({ isOpen: true, cycleOfAppointments, appointmentId, patientId }),
    onClose: () =>
      set({
        isOpen: false,
        cycleOfAppointments: null,
        appointmentId: "",
        patientId: "",
      }),
  })
)
