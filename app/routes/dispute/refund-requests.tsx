/**
 * 退款申请管理路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import RefundRequestsPage from '~/pages/DisputeManagement/RefundRequestsPage'
import { mockRefundRequests } from '~/pages/DisputeManagement/services/mocks'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // 模拟异步加载
    await new Promise((resolve) => setTimeout(resolve, 300))

    return json({
      requests: mockRefundRequests,
      error: null,
    })
  } catch (error) {
    return json({
      requests: [],
      error: '加载失败',
    }, { status: 500 })
  }
}

export default function RefundRequestsRoute() {
  const data = useLoaderData<typeof loader>()

  if (data.error) {
    return (
      <div className="p-6">
        <div className="text-red-600">错误: {data.error}</div>
      </div>
    )
  }

  return <RefundRequestsPage requests={data.requests as any} />
}
