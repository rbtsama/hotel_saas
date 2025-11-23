/**
 * 平台后台 - 积分换购服务路由
 */

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PointsExchangePage from '~/pages/PlatformAdmin/PointsManagement/PointsExchangePage'
import { mockPointsExchanges } from '~/pages/PlatformAdmin/PointsManagement/services/mocks/valueAddedService.mock'

export async function loader() {
  try {
    return json({ exchanges: mockPointsExchanges })
  } catch (error) {
    return json({ exchanges: [] }, { status: 500 })
  }
}

export default function PointsExchangeRoute() {
  const { exchanges } = useLoaderData<typeof loader>()
  return <PointsExchangePage exchanges={exchanges} />
}
