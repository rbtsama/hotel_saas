import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import dayjs from "dayjs"
import RoomStatusPage from "~/pages/PlatformAdmin/Hotel/RoomStatusPage"
import HotelService from "~/pages/PlatformAdmin/Hotel/services/hotel.service"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const startDateParam = url.searchParams.get("startDate")

  // 默认从今天开始
  const startDate = startDateParam || dayjs().format('YYYY-MM-DD')

  try {
    const [roomTypes, roomStatusData] = await Promise.all([
      HotelService.getRoomTypes(),
      HotelService.getRoomStatusData(startDate, 7),
    ])

    return json({
      roomTypes,
      roomStatusData,
      startDate,
      error: null,
    })
  } catch (error) {
    console.error('Failed to load room status:', error)
    return json(
      {
        roomTypes: [],
        roomStatusData: [],
        startDate,
        error: '加载房态数据失败',
      },
      { status: 500 }
    )
  }
}

export default function RoomStatusRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <RoomStatusPage
      roomTypes={data.roomTypes as any}
      roomStatusData={data.roomStatusData as any}
      startDate={data.startDate}
      error={data.error}
    />
  )
}
