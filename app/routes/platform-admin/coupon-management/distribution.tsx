/**
 * 优惠券发放路由 - 统一手动发放和自动发放
 */

import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CouponDistributionPage from '~/pages/PlatformAdmin/CouponManagement/CouponDistributionPage'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'

/**
 * Loader: 加载启用的优惠券、VIP等级和场景配置
 */
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const [enabledCoupons, vipLevels, scenes] = await Promise.all([
      CouponService.getEnabledCoupons(),
      CouponService.getVipLevels(),
      CouponService.getSceneDistributions(),
    ])

    return json({
      enabledCoupons,
      vipLevels,
      scenes,
      error: null,
    })
  } catch (error) {
    return json(
      {
        enabledCoupons: [],
        vipLevels: [],
        scenes: [],
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
        const phonesStr = formData.get('phones') as string
        const phones = JSON.parse(phonesStr) as string[]

        await CouponService.distributeByPhones({
          phones,
          couponId,
          smsNotify,
        })

        return json({
          success: true,
          message: `成功向 ${phones.length} 个手机号发放优惠券`,
        })
      } else if (type === 'vip') {
        const vipLevelIdsStr = formData.get('vipLevelIds') as string
        const vipLevelIds = JSON.parse(vipLevelIdsStr) as string[]

        await CouponService.distributeByVipLevels({
          vipLevelIds,
          couponId,
          smsNotify,
        })

        return json({
          success: true,
          message: `成功向 ${vipLevelIds.join(', ')} 等级用户发放优惠券`,
        })
      }
    }

    // 更新场景配置
    if (action === 'update') {
      const sceneId = formData.get('sceneId') as string
      const couponId = formData.get('couponId') as string
      const smsNotify = formData.get('smsNotify') === 'true'

      await CouponService.updateSceneDistribution(sceneId, {
        couponId,
        smsNotify,
      })

      return json({
        success: true,
        message: '场景配置更新成功',
      })
    }

    // 启用/停用场景
    if (action === 'toggle') {
      const sceneId = formData.get('sceneId') as string
      await CouponService.toggleSceneDistributionStatus(sceneId)

      return json({
        success: true,
        message: '场景状态更新成功',
      })
    }

    return json({ success: false, message: '未知操作' }, { status: 400 })
  } catch (error) {
    return json(
      {
        success: false,
        message: error instanceof Error ? error.message : '操作失败',
      },
      { status: 500 }
    )
  }
}

/**
 * 组件：渲染优惠券发放页面
 */
export default function CouponDistributionRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <CouponDistributionPage
      enabledCoupons={(data.enabledCoupons || []) as any}
      vipLevels={(data.vipLevels || []) as any}
      scenes={(data.scenes || []) as any}
      error={data.error}
    />
  )
}
