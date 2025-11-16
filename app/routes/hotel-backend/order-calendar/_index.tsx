import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import OrderCalendarPage from "~/pages/HotelBackend/OrderCalendar/OrderCalendarPage"
import OrderCalendarService from "~/pages/HotelBackend/OrderCalendar/services/orderCalendar.service"
import type { RoomTypeOrders } from "~/pages/HotelBackend/OrderCalendar/types/orderCalendar.types"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const startDate = url.searchParams.get("startDate") || undefined
  const roomType = url.searchParams.get("roomType") || undefined

  try {
    const orderCalendar = await OrderCalendarService.getOrderCalendar({
      startDate,
      roomType
    })
    return json({ orderCalendar, error: null })
  } catch (error) {
    return json({ orderCalendar: [], error: "加载订单日历失败" }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")

  try {
    if (intent === "deleteOrder") {
      const orderId = formData.get("orderId") as string
      const success = await OrderCalendarService.deleteOrder(orderId)
      return json({ success })
    }

    return json({ success: false, error: "无效的操作" }, { status: 400 })
  } catch (error) {
    return json({ success: false, error: "操作失败" }, { status: 500 })
  }
}

export default function OrderCalendarRoute() {
  const { orderCalendar, error } = useLoaderData<typeof loader>()
  return <OrderCalendarPage orderCalendar={(orderCalendar as RoomTypeOrders[]) || []} error={error} />
}
