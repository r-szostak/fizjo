import { create } from "zustand"
type AppointmentModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAppointmentModal = create<AppointmentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
