/**
 * 平台后台 - 会员等级积分汇率配置路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import MemberLevelRatesPage from '~/pages/PlatformAdmin/PointsManagement/MemberLevelRatesPage'
import PointsManagementService from '~/pages/PlatformAdmin/PointsManagement/services/points.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const rates = await PointsManagementService.getMemberLevelRates()
    return json({ rates, error: null })
  } catch (error) {
    return json(
      { rates: [], error: '加载汇率配置失败' },
      { status: 500 }
    )
  }
}

export default function LevelRatesRoute() {
  const { rates } = useLoaderData<typeof loader>()
  return <MemberLevelRatesPage rates={rates} />
}
