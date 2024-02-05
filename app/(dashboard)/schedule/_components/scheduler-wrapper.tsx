import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const SchedulerWrapper = () => {
  return (
    <Card className="max-w-screen-xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl ">Grafik</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <DataTable columns={columns} data={patients} />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
