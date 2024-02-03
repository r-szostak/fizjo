import { auth, signOut } from "@/auth"

export default async function Home() {
  const session = await auth()

  const onSignOut = async () => {
    "use server"
    console.log("sign out")
    await signOut()
  }
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[#f1f5f7]">
      <div className="space-y-6 text-center bg-white text-[#0b2f2c]">
        <h1 className="text-6xl font-semibold  drop-shadow-md">Fizjo</h1>
        <p className=" text-lg">{JSON.stringify(session)}</p>
        <form action={onSignOut}>
          <button type="submit">Sign Out</button>
        </form>
      </div>
    </main>
  )
}
