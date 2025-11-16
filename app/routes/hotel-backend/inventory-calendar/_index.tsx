import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import InventoryCalendarPage from "~/pages/HotelBackend/InventoryCalendar/InventoryCalendarPage"
import InventoryCalendarService from "~/pages/HotelBackend/InventoryCalendar/services/inventoryCalendar.service"
import type { RoomTypeInventory } from "~/pages/HotelBackend/InventoryCalendar/types/inventoryCalendar.types"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const startDate = url.searchParams.get("startDate") || undefined
  const roomType = url.searchParams.get("roomType") || undefined

  try {
    const inventoryCalendar = await InventoryCalendarService.getInventoryCalendar({
      startDate,
      roomType
    })
    return json({ inventoryCalendar, error: null })
  } catch (error) {
    return json({ inventoryCalendar: [], error: "加载库存日历失败" }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")

  try {
    if (intent === "updateInventory") {
      const roomTypeId = formData.get("roomTypeId") as string
      const date = formData.get("date") as string
      const availableRooms = Number(formData.get("availableRooms"))

      const success = await InventoryCalendarService.updateInventory(roomTypeId, date, availableRooms)
      return json({ success })
    }

    return json({ success: false, error: "无效的操作" }, { status: 400 })
  } catch (error) {
    return json({ success: false, error: "操作失败" }, { status: 500 })
  }
}

export default function InventoryCalendarRoute() {
  const { inventoryCalendar, error } = useLoaderData<typeof loader>()
  return <InventoryCalendarPage inventoryCalendar={(inventoryCalendar as RoomTypeInventory[]) || []} error={error} />
}
