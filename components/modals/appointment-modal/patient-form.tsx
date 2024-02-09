import { fetcher } from "@/lib/fetcher"
import { Appointment, Patient, WorkingHours } from "@prisma/client"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ReactSelect from "react-select"
import React, { Dispatch, SetStateAction, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { AppointmentSchema } from "@/schemas/appointment-schema"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarIcon } from "lucide-react"
import { useAppointmentModal } from "@/hooks/use-appointment-modal"
import { DataPicker } from "./data-picker"
import { generateEnumDayOfWeek } from "./utils"
import { add, format, getDay, getYear, isEqual } from "date-fns"
import { pl } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createAppointment } from "@/actions/create-appointment"

enum STEPS {
  PATIENT = 0,
  DATE = 1,
  OVERVIEW = 2,
}

interface IOptions {
  value: string
  label: string
}

export interface ISelectedDateTime {
  date: Date
  hour: number | null
}

interface PatientFormProps {
  step: number
  setStep: Dispatch<SetStateAction<number>>
}

export const PatientForm = ({ step, setStep }: PatientFormProps) => {
  const [isPending, startTransition] = useTransition()

  const [dateRange, setDateRange] = useState({
    startDay: new Date(),
    endDay: add(new Date(), { days: 7 }),
  })
  const [selectedDateTime, setSelectedDateTime] = useState<ISelectedDateTime>({
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    hour: null,
  })
  const dayOfWeek = generateEnumDayOfWeek(getDay(selectedDateTime.date))

  const appointmentModal = useAppointmentModal()
  const router = useRouter()

  const { data: patients } = useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: () => fetcher("/api/patients"),
  })

  const { data: workingHours } = useQuery<WorkingHours[]>({
    queryKey: ["working-hours"],
    queryFn: () => fetcher("/api/working-hours"),
  })

  const { data: currentAppointments } = useQuery<Appointment[]>({
    queryKey: ["current-appointments"],
    queryFn: () => fetcher("/api/appointments"),
  })

  const options = patients?.map((patient) => ({
    value: patient.id,
    label: `${patient.firstName} ${patient.lastName}`,
  }))

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      patientId: "",
      date: new Date(),
    },
  })

  const onDateSelect = (selectedDate: Date, hour: number) => {
    setSelectedDateTime({ date: selectedDate, hour })
    form.setValue("date", selectedDate)
    form.setValue("hour", hour.toString())
  }

  const onBack = () => setStep((value) => value - 1)

  const onNext = () => setStep((value) => value + 1)

  const onSubmit = (values: z.infer<typeof AppointmentSchema>) => {
    startTransition(() => {
      createAppointment(values).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        } else {
          appointmentModal.onClose()
          setStep(0)
          toast.success(`Wizyta ${data.appointment?.startHour} została dodana`)
          router.push(`/appointments/`)
        }
      })
    })
  }

  const renderPatientStep = () => (
    <>
      <h2 className="text-xl font-semibold text-center">1. Wybierz pacjenta</h2>
      <Controller
        control={form.control}
        name="patientId"
        render={({ field: { value, onChange, ref } }) => (
          <FormItem className=" flex flex-col items-center w-full gap-2">
            <FormLabel className="font-bold text-sm mt-2">
              Wybierz pacjenta z listy:
            </FormLabel>
            <ReactSelect
              placeholder="Wybierz pacjenta"
              noOptionsMessage={() => <p>Brak pacjentów</p>}
              ref={ref}
              required
              isSearchable
              hideSelectedOptions
              value={options?.find((option) => option.value === value)}
              onChange={(selectedOption: IOptions | null) =>
                onChange(selectedOption!.value)
              }
              classNames={{
                control: (e) =>
                  cn(
                    `rounded-md border w-[300px]`,
                    `border-input px-3 py-1 text-sm`,
                    e.isFocused ? "ring-1 ring-ring" : ""
                  ),
                indicatorSeparator: () => "bg-gray-100 mx-2",
                dropdownIndicator: () => "text-gray-400",
                menu: () =>
                  cn(
                    "absolute top-0 mt-1 text-sm z-10 w-full",
                    "rounded-md border bg-popover shadow-md overflow-x-hidden"
                  ),
                option: () =>
                  cn(
                    "cursor-default",
                    "rounded-sm py-1.5 m-1 px-2 text-sm outline-none",
                    "focus:bg-gray-200 hover:bg-gray-200 w-auto"
                  ),
                noOptionsMessage: () => "p-5",
                input: () => "text-sm overflow-x-hidden",
              }}
              options={options}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex mt-10 gap-8">
        <Button
          className="w-full"
          variant="secondary"
          onClick={() => appointmentModal.onClose()}
          size="big"
        >
          Wstecz
        </Button>
        <Button
          className="w-full"
          onClick={onNext}
          disabled={!form.formState.dirtyFields.patientId}
          size="big"
        >
          Dalej
        </Button>
      </div>
    </>
  )

  const renderDateStep = () => (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold text-center">
            2. Wybierz termin wizyty
          </h2>
          <div className="flex gap-8 pt-10">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-bold text-sm mt-2">
                    Dzień wizyty:
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: pl })
                          ) : (
                            <span>Wybierz datę</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(value: Date | undefined) => {
                          field.onChange(value)
                          setSelectedDateTime((prev) => ({
                            ...prev,
                            date: value!,
                          }))
                          setDateRange({
                            startDay: value!,
                            endDay: add(value!, { days: 7 }),
                          })
                        }}
                        disabled={(date: Date) => date < new Date()}
                        locale={pl}
                        captionLayout="dropdown-buttons"
                        fromYear={1900}
                        toYear={getYear(new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hour"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-center justify-center">
                  <FormLabel className="font-bold text-sm mt-2">
                    Godzina wizyty:
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedDateTime((prev) => ({
                        ...prev,
                        hour: parseInt(value),
                      }))
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workingHours?.some(
                        (wh) => wh.dayOfWeek === dayOfWeek
                      ) ? (
                        Array.from({ length: 24 }).map((_, hourIndex) => {
                          const isWorkingHours = workingHours?.find(
                            (wh) =>
                              parseInt(wh.startHour) <= hourIndex &&
                              parseInt(wh.endHour) >= hourIndex &&
                              wh.dayOfWeek === dayOfWeek
                          )

                          const isHourBooked = currentAppointments?.find(
                            (appointment) =>
                              parseInt(appointment.startHour) === hourIndex &&
                              isEqual(appointment.date, selectedDateTime.date)
                          )
                          if (isWorkingHours && !isHourBooked) {
                            return (
                              <SelectItem
                                key={hourIndex}
                                value={hourIndex.toString()}
                              >
                                {`${hourIndex}:00`}
                              </SelectItem>
                            )
                          }
                        })
                      ) : (
                        <p>Brak wolnych terminów w wybranym dniu</p>
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DataPicker
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={onDateSelect}
          workingHours={workingHours}
          currentAppointments={currentAppointments}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />{" "}
      </div>
      <div className="flex gap-10">
        <Button
          onClick={onBack}
          className="w-full"
          size="big"
          variant="secondary"
        >
          Powrót
        </Button>
        <Button
          onClick={onNext}
          className="w-full"
          size="big"
          disabled={!selectedDateTime.hour}
        >
          Dalej
        </Button>
      </div>
    </div>
  )

  const renderOverviewStep = () => (
    <div className="flex flex-col items-center gap-4">
      <Card className="max-w-3xl w-full">
        <CardContent className="p-4 flex justify-between">
          <p className="text-sm font-semibold ">
            <span className="font-semibold text-sm text-[#46a4a2]">1.</span>{" "}
            Pacjent
          </p>

          <p className="text-sm font-bold ">
            {
              options?.find(
                (option) => option.value === form.getValues("patientId")
              )?.label
            }
          </p>
        </CardContent>
      </Card>
      <Card className="max-w-3xl w-full">
        <CardContent className="p-4 flex justify-between">
          <p className="text-sm font-semibold ">
            <span className="font-semibold text-sm text-[#46a4a2]">2.</span>{" "}
            Termin
          </p>

          <p className="text-sm font-bold ">
            {`${format(selectedDateTime.date, "dd.MM", {
              locale: pl,
            })}, godz: ${selectedDateTime.hour}:00`}
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (step) {
      case STEPS.PATIENT:
        return renderPatientStep()
      case STEPS.DATE:
        return renderDateStep()
      case STEPS.OVERVIEW:
        return renderOverviewStep()
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl w-full mx-auto flex-grow">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 w-full px-4 py-4">
            {renderContent()}
          </div>
          <div className="px-4 flex justify-between gap-2"></div>
          {step === STEPS.OVERVIEW && (
            <div className="flex gap-8 pt-6">
              <Button
                onClick={onBack}
                className="w-full"
                size="big"
                variant="secondary"
                disabled={isPending}
              >
                Powrót
              </Button>
              <Button
                type="submit"
                className="w-full"
                size="big"
                disabled={isPending}
              >
                Dodaj wizytę
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
