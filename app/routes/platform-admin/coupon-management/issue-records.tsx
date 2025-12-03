/**
 * 优惠券发放记录路由 - 手动发放和自动发放的历史记录
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CouponIssueRecordsPage from '~/pages/PlatformAdmin/CouponManagement/CouponIssueRecordsPage'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const pageSize = 20

  try {
    const result = await CouponService.getCouponRecords({ page, pageSize })

    return json({
      records: result.data,
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      error: null,
    })
  } catch (error) {
    return json(
      {
        records: [],
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

export default function CouponIssueRecordsRoute() {
  const { records, total, page, pageSize, totalPages, error } = useLoaderData<typeof loader>()
  return (
    <CouponIssueRecordsPage
      records={records}
      total={total}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      error={error}
    />
  )
}
