import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import DashboardPage from '~/pages/HotelBackend/DashboardPage'

export async function loader({ request }: LoaderFunctionArgs) {
  // 这里可以从数据库获取实际统计数据
  // 目前使用模拟数据
  const stats = {
    todayOrders: 12,
    monthRevenue: 45680,
    occupancyRate: 78,
    totalRooms: 15,
  }

  return json({ stats })
}

export default function HotelBackendDashboardRoute() {
  const { stats } = useLoaderData<typeof loader>()

  return <DashboardPage stats={stats} />
}
