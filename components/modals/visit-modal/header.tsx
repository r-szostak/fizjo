import { Logo } from "@/components/logo"
import { DialogClose } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Check, CheckCircle, CheckCircle2, Circle } from "lucide-react"
import React from "react"
const steps = ["Wybór pacjenta", "Wybór terminu", "Podsumowanie"]
export const Header = ({ currentStep }: { currentStep: number }) => {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <Logo height={60} width={60} />
        <DialogTitle className="uppercase text-5xl font-bold text-[#2c413e]">
          Dodaj Wizytę
        </DialogTitle>
        <div />
      </div>
      <Separator className="my-4" />
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-0 md:space-y-0">
          {steps.map((step, index) => (
            <li key={index} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex items-center  justify-center space-x-4 w-full border-l-4 border-[#46a4a2] py-2 pl-4 transition-colors md:border-l-0 md:border-b-2 md:pb-4 md:pl-0 md:pt-4">
                  <CheckCircle2 className="w-5 h-5 text-[#46a4a2]" />
                  <span className="text-sm font-bold">{step}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full items-center justify-center  space-x-4 border-l-4 border-[#46a4a2] py-2 pl-4 md:border-l-0 md:border-b-2 md:pb-4 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <Circle className="w-5 h-5 text-[#46a4a2]" />
                  <span className="text-sm font-bold">{step}</span>
                </div>
              ) : (
                <div className="group flex  items-center justify-center  space-x-4  border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-b-2 md:pb-4 md:pl-0 md:pt-4">
                  <Circle className="w-5 h-5 text-gray-500/50 transition-colors" />
                  <span className="text-sm font-bold text-gray-500/50 transition-colors">
                    {step}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
