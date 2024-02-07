import { fetcher } from "@/lib/fetcher"
import { Patient } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import React, { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { VisitSchema } from "@/schemas/visit-schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { CheckIcon, Divide } from "lucide-react"

enum STEPS {
  PATIENT = 0,
  DATE = 1,
  OVERVIEW = 2,
}

interface PatientFormProps {
  step: number
  setStep: Dispatch<SetStateAction<number>>
}

export const PatientForm = ({ step, setStep }: PatientFormProps) => {
  const { data: patients } = useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: () => fetcher("/api/patients"),
  })

  const form = useForm<z.infer<typeof VisitSchema>>({
    resolver: zodResolver(VisitSchema),
    defaultValues: {
      patientId: "",
    },
  })

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  let formContent

  if (step === STEPS.PATIENT) {
    formContent = (
      <>
        <FormField
          control={form.control}
          name="patientId"
          render={({ field }) => (
            <FormItem className=" flex flex-col items-center w-full gap-2">
              <FormLabel className="font-bold text-sm mt-2">
                Wybierz pacjenta z listy:
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full max-w-md justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? patients?.find(
                            (patient) => patient.id === field.value
                          )?.firstName +
                          " " +
                          patients?.find(
                            (patient) => patient.id === field.value
                          )?.lastName
                        : "Wybierz pacjenta"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-md p-0">
                  <Command>
                    <CommandInput
                      placeholder="Wyszukaj pacjenta..."
                      className="h-9"
                    />
                    <CommandEmpty>Nie znaleziono pacjentów.</CommandEmpty>
                    <CommandGroup>
                      {patients?.map((patient) => (
                        <CommandItem
                          value={patient.id}
                          key={patient.id}
                          onSelect={() => {
                            form.setValue("patientId", patient.id)
                          }}
                        >
                          {`${patient.firstName} ${patient.lastName}`}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              patient.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex mt-10 gap-8">
          <Button className="w-full" variant="secondary">
            Wstecz
          </Button>
          <Button onClick={onNext} className="w-full">
            Dalej
          </Button>
        </div>
      </>
    )
  }

  if (step === STEPS.DATE) {
    formContent = (
      <div>
        <Button onClick={onBack} className="w-full">
          Powrót
        </Button>
        <Button onClick={onNext} className="w-full">
          Dalej
        </Button>
      </div>
    )
  }

  const onSubmit = () => {
    if (step !== STEPS.OVERVIEW) {
      return onNext()
    }
  }

  return (
    <div className="max-w-6xl w-full mx-auto ">
      <h1 className="text-xl font-semibold text-center">1. Wybierz pacjenta</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 w-full px-4 py-4">
            {formContent}
          </div>
          <div className="px-4 flex justify-between gap-2"></div>
          {step === STEPS.OVERVIEW && (
            <Button type="submit" className="w-full">
              Dodaj wizytę
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}
