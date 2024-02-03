import {
  LayoutIcon,
  Users,
  CalendarDays,
  ClipboardList,
  Clock4,
} from "lucide-react"
import { SidebarItem } from "./sidebar-item"

const routes = [
  {
    icon: <LayoutIcon className="h-7 w-7  " />,
    label: "Pulpit",
    href: "/",
  },
  {
    icon: <Users className="h-7 w-7 " />,
    label: "Pacjenci",
    href: "/patients",
  },
  {
    icon: <CalendarDays className="h-7 w-7 " />,
    label: "Wizyty",
    href: "/appointments",
  },
  {
    icon: <ClipboardList className="h-7 w-7  " />,
    label: "Kalendarz",
    href: "/calendar",
  },
  {
    icon: <Clock4 className="h-7 w-7 " />,
    label: "Grafik",
    href: "/schedule",
  },
]

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
