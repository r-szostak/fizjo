import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { generateColumnsData } from "./columns-data"

export const SchedulerWrapper = () => {
  const data = generateColumnsData()
  return (
    <Card className="max-w-screen-xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl ">Grafik</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <DataTable columns={columns} data={data} />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
