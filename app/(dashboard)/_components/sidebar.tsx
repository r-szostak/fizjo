import { Logo } from "@/components/logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm items-center justify-between">
      <div className="p-6">
        <Logo height={80} width={80} />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
      <div />
    </div>
  )
}
