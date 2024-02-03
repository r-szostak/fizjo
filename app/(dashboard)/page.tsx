import { auth, signOut } from "@/auth"

const DashboardPage = async () => {
  const session = await auth()

  return (
    <div className="flex  items-center justify-center bg-[#f1f5f7] text-[#0b2f2c] h-full">
      <h1 className="text-6xl font-semibold  drop-shadow-md">Fizjo</h1>
      <p className=" text-lg">{JSON.stringify(session)}</p>
    </div>
  )
}

export default DashboardPage
