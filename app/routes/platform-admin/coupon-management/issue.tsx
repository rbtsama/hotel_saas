/**
 * 优惠券发放路由 - 统一手动发放、场景配置、操作记录
 */

import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CouponIssuePage from '~/pages/PlatformAdmin/CouponManagement/CouponIssuePage'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'

/**
 * Loader: 加载启用的优惠券、VIP等级、场景配置和操作记录
 */
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const [enabledCoupons, vipLevels, scenes, recordsResult] = await Promise.all([
      CouponService.getEnabledCoupons(),
      CouponService.getVipLevels(),
      CouponService.getSceneDistributions(),
      CouponService.getCouponRecords({ page: 1, pageSize: 30 }),
    ])

    return json({
      enabledCoupons,
      vipLevels,
      scenes,
      records: recordsResult.data,
      error: null,
    })
  } catch (error) {
    return json(
      {
        enabledCoupons: [],
        vipLevels: [],
        scenes: [],
        records: [],
        error: error instanceof Error ? error.message : '加载数据失败',
      },
      { status: 500 }
    )
  }
}

/**
 * Action: 处理手动发放和场景配置编辑
 */
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get('_action')

  try {
    // 手动发放优惠券
    if (action === 'distribute') {
      const type = formData.get('type') as 'phone' | 'vip'
      const couponId = formData.get('couponId') as string
      const smsNotify = formData.get('smsNotify') === 'true'

      if (type === 'phone') {
        const phonesJson = formData.get('phones') as string
        const phones = JSON.parse(phonesJson) as string[]
        await CouponService.distributeByPhones({ couponId, phones, smsNotify })
      } else {
        const vipLevelIdsJson = formData.get('vipLevelIds') as string
        const vipLevelIds = JSON.parse(vipLevelIdsJson) as string[]
        await CouponService.distributeByVipLevels({ couponId, vipLevelIds, smsNotify })
      }

      return json({ success: true, message: '优惠券发放成功' })
    }

    // 更新场景配置
    if (action === 'update-scene') {
      const sceneId = formData.get('sceneId') as string
      const couponId = formData.get('couponId') as string
      const smsNotify = formData.get('smsNotify') === 'true'

      await CouponService.updateSceneDistribution(sceneId, { couponId, smsNotify })
      return json({ success: true, message: '场景配置更新成功' })
    }

    // 切换场景启用/停用
    if (action === 'toggle') {
      const sceneId = formData.get('sceneId') as string
      await CouponService.toggleSceneDistribution(sceneId)
      return json({ success: true })
    }

    return json({ success: false, message: '未知操作' }, { status: 400 })
  } catch (error) {
    return json(
      { success: false, message: error instanceof Error ? error.message : '操作失败' },
      { status: 500 }
    )
  }
}

export default function CouponIssueRoute() {
  const { enabledCoupons, vipLevels, scenes, records, error } = useLoaderData<typeof loader>()
  return (
    <CouponIssuePage
      enabledCoupons={enabledCoupons}
      vipLevels={vipLevels}
      scenes={scenes}
      records={records}
      error={error}
    />
  )
}
