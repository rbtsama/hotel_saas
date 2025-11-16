import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import RoomPriceCalendarPage from "~/pages/HotelBackend/RoomPriceCalendar/RoomPriceCalendarPage"
import RoomPriceCalendarService from "~/pages/HotelBackend/RoomPriceCalendar/services/roomPriceCalendar.service"
import type { RoomTypePricing } from "~/pages/HotelBackend/RoomPriceCalendar/types/roomPriceCalendar.types"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const startDate = url.searchParams.get("startDate") || undefined
  const roomType = url.searchParams.get("roomType") || undefined

  try {
    const priceCalendar = await RoomPriceCalendarService.getPriceCalendar({
      startDate,
      roomType
    })
    return json({ priceCalendar, error: null })
  } catch (error) {
    return json({ priceCalendar: [], error: "加载房价日历失败" }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")

  try {
    if (intent === "updatePrice") {
      const roomTypeId = formData.get("roomTypeId") as string
      const date = formData.get("date") as string
      const price = Number(formData.get("price"))

      const success = await RoomPriceCalendarService.updatePrice(roomTypeId, date, price)
      return json({ success })
    }

    return json({ success: false, error: "无效的操作" }, { status: 400 })
  } catch (error) {
    return json({ success: false, error: "操作失败" }, { status: 500 })
  }
}

export default function RoomPriceCalendarRoute() {
  const { priceCalendar, error } = useLoaderData<typeof loader>()
  return <RoomPriceCalendarPage priceCalendar={(priceCalendar as RoomTypePricing[]) || []} error={error} />
}
