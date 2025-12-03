/**
 * 优惠券操作记录路由 - 优惠券本身的CRUD操作记录
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CouponOperationLogsPage from '~/pages/PlatformAdmin/CouponManagement/CouponOperationLogsPage'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const pageSize = 20

  try {
    const result = await CouponService.getOperationLogs({ page, pageSize })

    return json({
      logs: result.data,
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      error: null,
    })
  } catch (error) {
    return json(
      {
        logs: [],
        total: 0,
        page: 1,
        pageSize: 20,
        totalPages: 0,
        error: error instanceof Error ? error.message : '加载数据失败',
      },
      { status: 500 }
    )
  }
}

export default function CouponOperationLogsRoute() {
  const { logs, total, page, pageSize, totalPages, error } = useLoaderData<typeof loader>()
  return (
    <CouponOperationLogsPage
      logs={logs}
      total={total}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      error={error}
    />
  )
}
