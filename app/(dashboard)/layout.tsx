import { currentUser } from "@/lib/auth"
import { Navbar } from "./_components/navbar"
import { Sidebar } from "./_components/sidebar"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()
  return (
    <div className="h-full">
      <div className="h-[116px] md:pl-56 fixed inset-y-0 z-50 w-full bg-[#f1f5f7]">
        <Navbar user={user} />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[116px] h-full w-full bg-[#f1f5f7]">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
