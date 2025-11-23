/**
 * 平台后台 - 积分奖励服务路由
 */

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PointsRewardPage from '~/pages/PlatformAdmin/PointsManagement/PointsRewardPage'
import { mockPointsRewards } from '~/pages/PlatformAdmin/PointsManagement/services/mocks/valueAddedService.mock'

export async function loader() {
  try {
    return json({ rewards: mockPointsRewards })
  } catch (error) {
    return json({ rewards: [] }, { status: 500 })
  }
}

export default function PointsRewardRoute() {
  const { rewards } = useLoaderData<typeof loader>()
  return <PointsRewardPage rewards={rewards} />
}
