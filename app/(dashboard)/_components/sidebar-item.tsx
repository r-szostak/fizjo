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
    <Hint sideOffset={-80} side="right" description={label}>
      <Button
        variant="ghost"
        onClick={onClick}
        className={cn(
          "rounded-none w-full py-10 text-gray-500 hover:text-[#25c0b7]",
          isActive && "border-r-[#25c0b7] border-r-4 text-[#25c0b7]"
        )}
      >
        {icon}
      </Button>
    </Hint>
  )
}
