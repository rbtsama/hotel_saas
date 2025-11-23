/**
 * 平台后台 - 积分增值服务路由
 */

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ValueAddedServicesPage from '~/pages/PlatformAdmin/PointsManagement/ValueAddedServicesPage'
import { mockPointsRewards, mockPointsExchanges } from '~/pages/PlatformAdmin/PointsManagement/services/mocks/valueAddedService.mock'

export async function loader() {
  try {
    return json({
      rewards: mockPointsRewards,
      exchanges: mockPointsExchanges,
    })
  } catch (error) {
    return json({ rewards: [], exchanges: [] }, { status: 500 })
  }
}

export default function ValueAddedServicesRoute() {
  const { rewards, exchanges } = useLoaderData<typeof loader>()
  return <ValueAddedServicesPage rewards={rewards} exchanges={exchanges} />
}
