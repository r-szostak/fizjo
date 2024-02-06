"use client"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { ElementRef, useRef, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { ScheduleSchema } from "@/schemas/schedule-schema"
import { toast } from "sonner"

import { DayOfWeek } from "@prisma/client"
import { updateSchedule } from "@/actions/update-schedule"
import { deleteSchedule } from "@/actions/delete-schedule"

interface EditScheduleProps {
  startHour: number
  endHour: number
  id: string
  children: React.ReactNode
  currentDay: DayOfWeek
}

export const EditSchedulePopover = ({
  startHour,
  endHour,
  id,
  children,
  currentDay,
}: EditScheduleProps) => {
  const [isPending, startTransition] = useTransition()

  const closeRef = useRef<ElementRef<"button">>(null)

  const form = useForm<z.infer<typeof ScheduleSchema>>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      startHour: startHour.toString(),
      endHour: endHour.toString(),
    },
  })

  const onUpdate = (values: z.infer<typeof ScheduleSchema>) => {
    startTransition(() => {
      updateSchedule(values, id, currentDay).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        } else {
          closeRef.current?.click()
          toast.success(`Zaktualizowano godziny pracy!`)
        }
      })
    })
  }

  const onDelete = (id: string) => {
    startTransition(() => {
      deleteSchedule(id).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        } else {
          closeRef.current?.click()
          toast.success(`Usunięto godziny pracy!`)
        }
      })
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80  px-0 pt-0 ">
        <h2 className="w-full bg-[#00a7a2] rounded-t-md p-4 text-white font-semibold text-base leading-4">
          Edytuj godziny pracy
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-6">
            <div className="flex gap-4 w-full px-4 py-8">
              <FormField
                control={form.control}
                name="startHour"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center justify-center gap-2">
                    <FormLabel className="font-bold text-sm mt-2">
                      Od:
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled={isPending}>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">00:00</SelectItem>
                        <SelectItem value="1">01:00</SelectItem>
                        <SelectItem value="2">02:00</SelectItem>
                        <SelectItem value="3">03:00</SelectItem>
                        <SelectItem value="4">04:00</SelectItem>
                        <SelectItem value="5">05:00</SelectItem>
                        <SelectItem value="6">06:00</SelectItem>
                        <SelectItem value="7">07:00</SelectItem>
                        <SelectItem value="8">08:00</SelectItem>
                        <SelectItem value="9">09:00</SelectItem>
                        <SelectItem value="10">10:00</SelectItem>
                        <SelectItem value="11">11:00</SelectItem>
                        <SelectItem value="12">12:00</SelectItem>
                        <SelectItem value="13">13:00</SelectItem>
                        <SelectItem value="14">14:00</SelectItem>
                        <SelectItem value="15">15:00</SelectItem>
                        <SelectItem value="16">16:00</SelectItem>
                        <SelectItem value="17">17:00</SelectItem>
                        <SelectItem value="18">18:00</SelectItem>
                        <SelectItem value="19">19:00</SelectItem>
                        <SelectItem value="20">20:00</SelectItem>
                        <SelectItem value="21">21:00</SelectItem>
                        <SelectItem value="22">22:00</SelectItem>
                        <SelectItem value="23">23:00</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endHour"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center justify-center gap-2">
                    <FormLabel className="font-bold text-sm mt-2">
                      Do:
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled={isPending}>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">01:00</SelectItem>
                        <SelectItem value="2">02:00</SelectItem>
                        <SelectItem value="3">03:00</SelectItem>
                        <SelectItem value="4">04:00</SelectItem>
                        <SelectItem value="5">05:00</SelectItem>
                        <SelectItem value="6">06:00</SelectItem>
                        <SelectItem value="7">07:00</SelectItem>
                        <SelectItem value="8">08:00</SelectItem>
                        <SelectItem value="9">09:00</SelectItem>
                        <SelectItem value="10">10:00</SelectItem>
                        <SelectItem value="11">11:00</SelectItem>
                        <SelectItem value="12">12:00</SelectItem>
                        <SelectItem value="13">13:00</SelectItem>
                        <SelectItem value="14">14:00</SelectItem>
                        <SelectItem value="15">15:00</SelectItem>
                        <SelectItem value="16">16:00</SelectItem>
                        <SelectItem value="17">17:00</SelectItem>
                        <SelectItem value="18">18:00</SelectItem>
                        <SelectItem value="19">19:00</SelectItem>
                        <SelectItem value="20">20:00</SelectItem>
                        <SelectItem value="21">21:00</SelectItem>
                        <SelectItem value="22">22:00</SelectItem>
                        <SelectItem value="23">23:00</SelectItem>
                        <SelectItem value="24">24:00</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="px-4 flex justify-between gap-2">
              <Button
                disabled={isPending}
                variant="destructive"
                onClick={() => onDelete(id)}
              >
                Usuń
              </Button>
              <PopoverClose asChild ref={closeRef}>
                <Button variant="secondary">Anuluj</Button>
              </PopoverClose>
              <Button
                type="submit"
                className="bg-[#058678]"
                disabled={isPending}
              >
                Zapisz
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
