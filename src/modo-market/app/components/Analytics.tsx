import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "@/components/ui/chart"

const data = [
  { name: "Jan", commissions: 4 },
  { name: "Feb", commissions: 3 },
  { name: "Mar", commissions: 2 },
  { name: "Apr", commissions: 5 },
  { name: "May", commissions: 7 },
  { name: "Jun", commissions: 6 },
]

export default function Analytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seller Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="commissions" fill="#8884d8" />
        </BarChart>
      </CardContent>
    </Card>
  )
}