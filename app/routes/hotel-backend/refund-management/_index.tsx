import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import RefundManagementPage from "~/pages/HotelBackend/RefundManagement/RefundManagementPage"
import RefundManagementService from "~/pages/HotelBackend/RefundManagement/services/refundManagement.service"
import type { RefundListResponse } from "~/pages/HotelBackend/RefundManagement/types/refundManagement.types"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const orderNumber = url.searchParams.get("orderNumber") || undefined
  const guestPhone = url.searchParams.get("guestPhone") || undefined
  const startDate = url.searchParams.get("startDate") || undefined
  const endDate = url.searchParams.get("endDate") || undefined
  const page = Number(url.searchParams.get("page")) || 1
  const pageSize = Number(url.searchParams.get("pageSize")) || 10

  try {
    const result = await RefundManagementService.getRefundList({
      orderNumber,
      guestPhone,
      startDate,
      endDate,
      page,
      pageSize
    })
    return json({ result, error: null })
  } catch (error) {
    return json(
      { result: null, error: "加载退款列表失败" },
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
      const success = await RefundManagementService.deleteRefund(id)
      return json({ success })
    }

    return json({ success: false, error: "无效的操作" }, { status: 400 })
  } catch (error) {
    return json({ success: false, error: "操作失败" }, { status: 500 })
  }
}

export default function RefundManagementRoute() {
  const { result, error } = useLoaderData<typeof loader>()
  return <RefundManagementPage result={(result as RefundListResponse) || null} error={error} />
}
