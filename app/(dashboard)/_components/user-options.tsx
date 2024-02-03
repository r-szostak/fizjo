import { signOut } from "@/auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ExtendedUser } from "@/next-auth"

interface UserOptionsProps {
  user?: ExtendedUser
}

export const UserOptions = ({ user }: UserOptionsProps) => {
  const onSignOut = async () => {
    "use server"
    await signOut()
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarFallback className="bg-[#46a4a2] text-white">
            {user?.name![0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="center"
        className="px-0 pt-3 pb-3 w-44"
      >
        <form action={onSignOut}>
          <Button
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant={"ghost"}
            onClick={onSignOut}
            type="submit"
          >
            Wyloguj
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
