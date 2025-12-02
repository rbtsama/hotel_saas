/**
 * 优惠券记录路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CouponRecordsPage from '~/pages/PlatformAdmin/CouponManagement/CouponRecordsPage'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // 获取分页参数
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10)

    // 获取分页记录列表
    const records = await CouponService.getCouponRecords({ page, pageSize })

    return json({ records, error: null })
  } catch (error) {
    console.error('Failed to load coupon records:', error)
    return json(
      {
        records: { data: [], total: 0, page: 1, pageSize: 10, totalPages: 0 },
        error: '加载优惠券记录失败',
      },
      { status: 500 }
    )
  }
}

export default function CouponRecordsRoute() {
  const data = useLoaderData<typeof loader>()
  return (
    <CouponRecordsPage
      records={data.records as any}
      error={data.error}
    />
  )
}
