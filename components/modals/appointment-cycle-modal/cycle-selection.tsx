import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CycleOfAppointments } from "@prisma/client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { CycleSchema } from "@/schemas/cycle-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTransition } from "react"
import { createCycle } from "@/actions/create-cycle"
import { toast } from "sonner"
import { updateCycle } from "@/actions/update-cycle"
import { useAppointmentCycleModal } from "@/hooks/use-appointment-cycle-modal"
import { useRouter } from "next/navigation"

interface CycleSelectionProps {
  patientCycles?: CycleOfAppointments[] | null
  appointmentId: string
  patientId: string
}

export const CycleSelection = ({
  patientCycles,
  appointmentId,
  patientId,
}: CycleSelectionProps) => {
  const [isPending, startTransition] = useTransition()
  const appointmentCycleModal = useAppointmentCycleModal()
  const router = useRouter()

  const form = useForm<z.infer<typeof CycleSchema>>({
    resolver: zodResolver(CycleSchema),
    defaultValues: {
      formAppointmentId: appointmentId,
      cycleId: "",
    },
  })

  const onCreateCycle = (values: z.infer<typeof CycleSchema>) => {
    startTransition(() => {
      if (values.cycleId === "") {
        createCycle(values, patientId).then((data) => {
          if (data?.error) {
            toast.error(data.error)
          } else {
            appointmentCycleModal.onClose()
            toast.success(
              `Wizyta została przypisana do utworzonego cyklu: ${data.cycle?.name}`
            )
            router.push(`/appointments/${data.cycle?.id}`)
          }
        })
      } else {
        updateCycle(values, patientId).then((data) => {
          if (data?.error) {
            toast.error(data.error)
          } else {
            appointmentCycleModal.onClose()
            toast.success(
              `Wizyta została przypisana do istniejącego cyklu: ${data.cycle?.cycleOfAppointment?.name}`
            )
            router.push(`/appointments/${data.cycle?.id}`)
          }
        })
      }
    })
  }
  console.log(form.getValues())
  console.log(appointmentId)
  return (
    <div className="flex flex-col items-center gap-4 overflow-y-scroll">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCreateCycle)} className="w-full">
          <div className="pb-6">
            <FormField
              control={form.control}
              name="cycleId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Przypisz do istniejącego cyklu</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {patientCycles
                        ? patientCycles.map((cycle) => (
                            <FormItem key={cycle.id}>
                              <FormControl>
                                <RadioGroupItem
                                  value={cycle.id}
                                  className="peer sr-only"
                                />
                              </FormControl>
                              <FormLabel className="font-normal peer flex items-center space-x-3 space-y-0 rounded-xl border bg-card text-card-foreground shadow w-full py-8 px-6 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white">
                                {cycle.name}
                              </FormLabel>
                            </FormItem>
                          ))
                        : null}

                      <FormItem>
                        <FormLabel>Stwórz nowy cykl</FormLabel>
                        <FormControl>
                          <RadioGroupItem value="" className="peer sr-only" />
                        </FormControl>
                        <FormLabel className="font-normal peer flex items-center space-x-3 space-y-0 rounded-xl border bg-card text-card-foreground shadow w-full py-8 px-6 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white">
                          {patientCycles && patientCycles?.length > 0
                            ? `Cykl ${patientCycles.length + 1}`
                            : "Cykl 1"}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              defaultValue={
                patientCycles && patientCycles?.length > 0
                  ? `Cykl ${patientCycles.length + 1}`
                  : "Cykl 1"
              }
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Input
                      {...field}
                      value={
                        patientCycles && patientCycles?.length > 0
                          ? `Cykl ${patientCycles.length + 1}`
                          : "Cykl 1"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            {form.watch("cycleId") === ""
              ? "Dodaj nowy cykl"
              : "Przypisz do cyklu"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
