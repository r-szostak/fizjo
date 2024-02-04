import { ExtendedUser } from "@/next-auth"
import { pl } from "date-fns/locale"
import { format } from "date-fns"
import { Calendar, Plus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { signOut } from "@/auth"
import { UserOptions } from "./user-options"
import { UserActions } from "./user-actions"

interface NavbarProps {
  user?: ExtendedUser
}

export const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav className="flex justify-between items-center h-full p-10 max-w-screen-2xl mx-auto">
      <p className=" font-semibold text-3xl basis-3/5">
        Cześć<span className="text-[#46a4a2] ml-3">{user?.name}!</span>
      </p>
      <div className="flex gap-x-2 items-center">
        <Calendar className="w-5 h-5 text-[#2c413e]" />
        <p className="text-neutral-600 text-sm">
          Dzisiaj,
          <span className="font-bold text-[#2c413e]">
            {format(new Date(), " d MMMM", { locale: pl })}
          </span>
        </p>
      </div>
      <div className=" flex gap-x-8 items-center">
        <UserActions>
          <Plus className="w-10 h-10 text-neutral-600 border rounded-sm p-2" />
        </UserActions>
        <UserOptions user={user} />
      </div>
    </nav>
  )
}
