import { create } from "zustand"
type VisitModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useVisitModal = create<VisitModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
