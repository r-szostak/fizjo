"use client"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

interface SidebarItemProps {
  icon: JSX.Element
  label: string
  href: string
}

export const SidebarItem = ({ icon, label, href }: SidebarItemProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(`${href}/`)

  const onClick = () => {
    router.push(href)
  }
  return (
    <Hint sideOffset={-60} side="right" description={label}>
      <div
        role="button"
        onClick={onClick}
        className={cn(
          "rounded-none w-full py-7 text-gray-500 hover:text-[#25c0b7] hover:bg-accent inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          isActive &&
            "border-r-[#25c0b7] border-r-4 text-[#25c0b7]  hover:text-[#25c0b7]"
        )}
      >
        {icon}
      </div>
    </Hint>
  )
}
