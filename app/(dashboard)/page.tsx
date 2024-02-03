import { auth, signOut } from "@/auth"

const DashboardPage = async () => {
  const session = await auth()

  const onSignOut = async () => {
    "use server"
    console.log("sign out")
    await signOut()
  }
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#f1f5f7] rounded-3xl">
      <div className="space-y-6 text-center bg-white text-[#0b2f2c]">
        <h1 className="text-6xl font-semibold  drop-shadow-md">Fizjo</h1>
        <p className=" text-lg">{JSON.stringify(session)}</p>
        <form action={onSignOut}>
          <button type="submit">Sign Out from dash</button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage
