"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"

// Mock data for different time frames
const weeklyData = [
  { day: "Mon", sales: 1200, commissions: 3, avgOrderValue: 400 },
  { day: "Tue", sales: 1400, commissions: 4, avgOrderValue: 350 },
  { day: "Wed", sales: 1100, commissions: 3, avgOrderValue: 367 },
  { day: "Thu", sales: 1600, commissions: 5, avgOrderValue: 320 },
  { day: "Fri", sales: 1800, commissions: 6, avgOrderValue: 300 },
  { day: "Sat", sales: 2200, commissions: 7, avgOrderValue: 314 },
  { day: "Sun", sales: 1900, commissions: 5, avgOrderValue: 380 },
]

const monthlyData = [
  { month: "Jan", sales: 4000, commissions: 15, avgOrderValue: 267 },
  { month: "Feb", sales: 3000, commissions: 12, avgOrderValue: 250 },
  { month: "Mar", sales: 5000, commissions: 18, avgOrderValue: 278 },
  { month: "Apr", sales: 2780, commissions: 10, avgOrderValue: 278 },
  { month: "May", sales: 1890, commissions: 7, avgOrderValue: 270 },
  { month: "Jun", sales: 2390, commissions: 9, avgOrderValue: 266 },
  { month: "Jul", sales: 3490, commissions: 13, avgOrderValue: 268 },
  { month: "Aug", sales: 4200, commissions: 16, avgOrderValue: 263 },
  { month: "Sep", sales: 3800, commissions: 14, avgOrderValue: 271 },
  { month: "Oct", sales: 4100, commissions: 15, avgOrderValue: 273 },
  { month: "Nov", sales: 4500, commissions: 17, avgOrderValue: 265 },
  { month: "Dec", sales: 5200, commissions: 20, avgOrderValue: 260 },
]

const yearlyData = [
  { year: "2018", sales: 35000, commissions: 120, avgOrderValue: 292 },
  { year: "2019", sales: 42000, commissions: 150, avgOrderValue: 280 },
  { year: "2020", sales: 38000, commissions: 130, avgOrderValue: 292 },
  { year: "2021", sales: 51000, commissions: 180, avgOrderValue: 283 },
  { year: "2022", sales: 61000, commissions: 210, avgOrderValue: 290 },
]

const productData = [
  { name: "Digital Portraits", sales: 12000, commissions: 45, avgPrice: 267 },
  { name: "Character Design", sales: 9800, commissions: 35, avgPrice: 280 },
  { name: "Landscape Art", sales: 6700, commissions: 22, avgPrice: 305 },
  { name: "Logo Design", sales: 5400, commissions: 18, avgPrice: 300 },
  { name: "Illustrations", sales: 4200, commissions: 15, avgPrice: 280 },
  { name: "Concept Art", sales: 7500, commissions: 25, avgPrice: 300 },
  { name: "UI/UX Design", sales: 8200, commissions: 28, avgPrice: 293 },
  { name: "3D Modeling", sales: 11000, commissions: 32, avgPrice: 344 },
]

export default function SellerAnalytics() {
  const [timeFrame, setTimeFrame] = useState("monthly")

  const getDataForTimeFrame = () => {
    switch (timeFrame) {
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      case "yearly":
        return yearlyData
      default:
        return monthlyData
    }
  }

  const data = getDataForTimeFrame()
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0)
  const totalCommissions = data.reduce((sum, item) => sum + item.commissions, 0)
  const avgOrderValue = totalSales / totalCommissions

  const getXAxisKey = () => {
    switch (timeFrame) {
      case "weekly":
        return "day"
      case "monthly":
        return "month"
      case "yearly":
        return "year"
      default:
        return "month"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Sales Overview</h2>
        <Select onValueChange={(value) => setTimeFrame(value)} defaultValue={timeFrame}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">${totalSales.toLocaleString()}</p>
            <p className="text-sm text-gray-500">+12% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Commissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalCommissions}</p>
            <p className="text-sm text-gray-500">+8% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">${avgOrderValue.toFixed(2)}</p>
            <p className="text-sm text-gray-500">+3% from last period</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales and Commissions Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScrollArea className="h-[400px]">
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  {timeFrame === "yearly" ? (
                    <AreaChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={getXAxisKey()} />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="sales"
                        name="Sales ($)"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                      <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="commissions"
                        name="Commissions"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                    </AreaChart>
                  ) : (
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={getXAxisKey()} />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="sales"
                        name="Sales ($)"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line yAxisId="right" type="monotone" dataKey="commissions" name="Commissions" stroke="#82ca9d" />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </ScrollArea>
            <div>
              <h4 className="text-lg font-semibold mb-2">Analysis</h4>
              <p className="mb-4">
                {timeFrame === "weekly" &&
                  "This week shows a steady increase in sales, with a peak on Saturday. Consider running promotions early in the week to boost slower days."}
                {timeFrame === "monthly" &&
                  "There's a noticeable peak in March and December, indicating possible seasonal trends. The summer months show lower sales, suggesting an opportunity for targeted marketing campaigns."}
                {timeFrame === "yearly" &&
                  "The yearly trend shows consistent growth, with a significant jump in 2021 and 2022. This could be due to expanded services or increased market presence."}
              </p>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {timeFrame === "weekly" ? "Day" : timeFrame === "monthly" ? "Month" : "Year"}
                      </TableHead>
                      <TableHead>Sales ($)</TableHead>
                      <TableHead>Commissions</TableHead>
                      <TableHead>Avg. Order Value ($)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item[getXAxisKey()]}>
                        <TableCell>{item[getXAxisKey()]}</TableCell>
                        <TableCell>{item.sales.toLocaleString()}</TableCell>
                        <TableCell>{item.commissions}</TableCell>
                        <TableCell>{item.avgOrderValue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScrollArea className="h-[400px]">
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" name="Sales ($)" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="commissions" name="Commissions" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ScrollArea>
            <div>
              <h4 className="text-lg font-semibold mb-2">Analysis</h4>
              <p className="mb-4">
                Digital Portraits remain your best-selling product, followed closely by 3D Modeling. However, 3D
                Modeling has the highest average price per commission. Consider promoting your 3D Modeling services more
                to increase overall revenue. UI/UX Design and Concept Art show promising sales figures and could be
                areas for expansion.
              </p>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Sales ($)</TableHead>
                      <TableHead>Commissions</TableHead>
                      <TableHead>Avg. Price ($)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productData.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.sales.toLocaleString()}</TableCell>
                        <TableCell>{item.commissions}</TableCell>
                        <TableCell>{item.avgPrice.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}