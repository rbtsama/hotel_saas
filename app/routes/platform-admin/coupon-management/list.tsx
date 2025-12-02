/**
 * 平台后台 - 优惠券列表路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CouponListPage from '~/pages/PlatformAdmin/CouponManagement/CouponListPage'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'
import type { Coupon } from '~/pages/PlatformAdmin/CouponManagement/types/coupon.types'

export async function loader() {
  try {
    const coupons = await CouponService.getCoupons()
    return json({ coupons, error: null })
  } catch (error) {
    console.error('Failed to load coupons:', error)
    return json({ coupons: [], error: 'Failed to load coupons data' }, { status: 500 })
  }
}

export default function CouponListRoute() {
  const { coupons, error } = useLoaderData<typeof loader>()
  return <CouponListPage coupons={coupons as Coupon[]} error={error} />
}
