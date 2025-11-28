import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import OrderDetailPage from "~/pages/OrderManagement/OrderDetailPage"
import { mockOrders } from "~/pages/OrderManagement/services/mocks/order.mock"

export async function loader({ params }: LoaderFunctionArgs) {
  const { orderId } = params

  // 根据orderId查找订单
  const order = mockOrders.find(o => o.orderId === orderId)

  if (!order) {
    throw new Response("订单不存在", { status: 404 })
  }

  return json({ order })
}

export default function OrderDetailRoute() {
  const { order } = useLoaderData<typeof loader>()
  return <OrderDetailPage order={order} />
}
