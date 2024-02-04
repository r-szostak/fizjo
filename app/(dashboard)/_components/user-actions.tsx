"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePatientModal } from "@/hooks/use-patient-modal"

export const UserActions = ({ children }: { children: React.ReactNode }) => {
  const patientModal = usePatientModal()
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="center"
        className="px-0 pt-3 pb-3 w-60"
      >
        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant={"ghost"}
          type="submit"
          onClick={patientModal.onOpen}
        >
          Dodaj pacjenta
        </Button>
        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant={"ghost"}
          type="submit"
        >
          Rozpocznij nową wizytę
        </Button>
        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant={"ghost"}
          type="submit"
        >
          Zaplanuj wizytę
        </Button>
      </PopoverContent>
    </Popover>
  )
}
