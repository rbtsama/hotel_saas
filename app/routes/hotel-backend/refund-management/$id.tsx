import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import RefundDetailPage from '~/pages/HotelBackend/RefundManagement/RefundDetailPage'
import RefundManagementService from '~/pages/HotelBackend/RefundManagement/services/refundManagement.service'

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id

  if (!id) {
    throw new Response('退款ID缺失', { status: 400 })
  }

  try {
    const refund = await RefundManagementService.getRefundById(id)

    if (!refund) {
      throw new Response('退款申请不存在', { status: 404 })
    }

    return json({ refund })
  } catch (error) {
    console.error('加载退款详情失败:', error)
    throw new Response('加载失败', { status: 500 })
  }
}

export default function RefundDetailRoute() {
  const { refund } = useLoaderData<typeof loader>()
  return <RefundDetailPage refund={refund} />
}
