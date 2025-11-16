import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import OrderListPage from "~/pages/HotelBackend/OrderList/OrderListPage"
import OrderListService from "~/pages/HotelBackend/OrderList/services/orderList.service"
import type { OrderListResponse } from "~/pages/HotelBackend/OrderList/types/orderList.types"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const roomType = url.searchParams.get("roomType") || undefined
  const startDate = url.searchParams.get("startDate") || undefined
  const endDate = url.searchParams.get("endDate") || undefined
  const paymentStatus = url.searchParams.get("paymentStatus") as any || undefined
  const checkInStatus = url.searchParams.get("checkInStatus") as any || undefined
  const refundStatus = url.searchParams.get("refundStatus") as any || undefined
  const page = Number(url.searchParams.get("page")) || 1
  const pageSize = Number(url.searchParams.get("pageSize")) || 10

  try {
    const result = await OrderListService.getOrderList({
      roomType,
      startDate,
      endDate,
      paymentStatus,
      checkInStatus,
      refundStatus,
      page,
      pageSize
    })
    return json({ result, error: null })
  } catch (error) {
    return json(
      { result: null, error: "加载订单列表失败" },
      { status: 500 }
    )
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")

  try {
    if (intent === "delete") {
      const id = formData.get("id") as string
      const success = await OrderListService.deleteOrder(id)
      return json({ success })
    }

    return json({ success: false, error: "无效的操作" }, { status: 400 })
  } catch (error) {
    return json({ success: false, error: "操作失败" }, { status: 500 })
  }
}

export default function OrderListRoute() {
  const { result, error } = useLoaderData<typeof loader>()
  return <OrderListPage result={(result as OrderListResponse) || null} error={error} />
}
