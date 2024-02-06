"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { PatientSchema } from "@/schemas/patient-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, getYear } from "date-fns"
import { pl } from "date-fns/locale"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import "react-day-picker/dist/style.css"
import { createPatient } from "@/actions/create-patient"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { usePatientModal } from "@/hooks/use-patient-modal"

export const CreatePatientForm = () => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const patientModal = usePatientModal()

  const form = useForm<z.infer<typeof PatientSchema>>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: new Date(),
    },
  })

  const onSubmit = (values: z.infer<typeof PatientSchema>) => {
    startTransition(() => {
      createPatient(values).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        } else {
          patientModal.onClose()
          toast.success(
            `Pacjent ${data.patient?.firstName} ${data.patient?.lastName} został pomyślnie dodany!`
          )
          router.push(`/patients/`)
        }
      })
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imię</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Jan" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwisko</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Kowalski"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data urodzenia</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
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
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
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
            name="sex"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Wybierz płeć</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-0"
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="male" className="peer sr-only" />
                      </FormControl>
                      <FormLabel className="flex  flex-col items-center justify-between border-2 rounded-l-md border-muted  p-4 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white ">
                        Mężczyzna
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem
                          value="female"
                          className="peer sr-only"
                        />
                      </FormControl>
                      <FormLabel className="flex flex-col items-center justify-between border-2 rounded-r-md border-muted  p-4 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white">
                        Kobieta
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Telefon <span className="text-stone-500">(opcjonalnie)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="690255255"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Adres email{" "}
                  <span className="text-stone-500">(opcjonalnie)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="kowalski@amorki.pl"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Dodaj pacjenta
        </Button>
      </form>
    </Form>
  )
}
