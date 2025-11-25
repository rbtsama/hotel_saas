import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import ReservationsPage from "~/pages/PlatformAdmin/Hotel/ReservationsPage"
import HotelService from "~/pages/PlatformAdmin/Hotel/services/hotel.service"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)

  // 读取筛选参数
  const status = url.searchParams.get("status") || undefined
  const search = url.searchParams.get("search") || undefined
  const startDate = url.searchParams.get("startDate") || undefined
  const endDate = url.searchParams.get("endDate") || undefined
  const page = parseInt(url.searchParams.get("page") || "1")
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10")

  try {
    const paginatedData = await HotelService.getReservations({
      status: status as any,
      search,
      startDate,
      endDate,
      page,
      pageSize,
    })

    return json({ paginatedData, error: null })
  } catch (error) {
    console.error("Failed to load reservations:", error)
    return json(
      {
        paginatedData: {
          data: [],
          total: 0,
          page: 1,
          pageSize: 10,
          totalPages: 0,
        },
        error: "加载预订列表失败",
      },
      { status: 500 }
    )
  }
}

export default function ReservationsRoute() {
  const { paginatedData, error } = useLoaderData<typeof loader>()
  return <ReservationsPage paginatedData={paginatedData as any} error={error} />
}
