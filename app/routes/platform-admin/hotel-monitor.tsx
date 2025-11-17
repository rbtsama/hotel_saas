/**
 * 平台酒店监管页面 - 路由
 */

import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import HotelMonitorPage from "~/pages/PlatformManagement/HotelMonitorPage"

export async function loader() {
  // 模拟数据：获取所有酒店列表
  const hotels = [
    { id: 'HOTEL001', name: '锦江之星(杭州西湖店)' },
    { id: 'HOTEL002', name: '如家快捷(上海虹桥店)' }
  ]

  return json({ hotels })
}

export default function HotelMonitorRoute() {
  const { hotels } = useLoaderData<typeof loader>()
  return <HotelMonitorPage hotels={hotels} />
}
