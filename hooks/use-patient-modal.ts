import { create } from "zustand"
type PatientModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const usePatientModal = create<PatientModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
