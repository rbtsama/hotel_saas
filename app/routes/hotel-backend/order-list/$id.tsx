import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import OrderDetailPage from "~/pages/HotelBackend/OrderList/OrderDetailPage"
import OrderListService from "~/pages/HotelBackend/OrderList/services/orderList.service"

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params

  if (!id) {
    return json({ order: null, error: "订单ID不能为空" }, { status: 400 })
  }

  try {
    const order = await OrderListService.getOrderById(id)

    if (!order) {
      return json({ order: null, error: "订单不存在" }, { status: 404 })
    }

    return json({ order, error: null })
  } catch (error) {
    console.error('Failed to load order:', error)
    return json({ order: null, error: "加载订单失败" }, { status: 500 })
  }
}

export default function OrderDetailRoute() {
  const { order, error } = useLoaderData<typeof loader>()

  if (error || !order) {
    return <OrderDetailPage order={order!} error={error} />
  }

  return <OrderDetailPage order={order} error={error} />
}
