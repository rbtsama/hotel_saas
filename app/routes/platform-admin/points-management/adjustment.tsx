/**
 * 平台后台 - 积分调整路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PointsAdjustmentPage from '~/pages/PlatformAdmin/PointsManagement/PointsAdjustmentPage'
import { mockUserPointsInfo, mockPointsDetails } from '~/pages/PlatformAdmin/PointsManagement/services/mocks/pointsAdjustment.mock'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const userId = url.searchParams.get('userId')

  try {
    if (userId && mockUserPointsInfo[userId]) {
      const userInfo = mockUserPointsInfo[userId]
      const details = mockPointsDetails[userId] || []
      return json({ userInfo, details })
    }

    return json({ userInfo: null, details: [] })
  } catch (error) {
    return json({ userInfo: null, details: [] }, { status: 500 })
  }
}

export default function PointsAdjustmentRoute() {
  const { userInfo, details } = useLoaderData<typeof loader>()
  return <PointsAdjustmentPage userInfo={userInfo} details={details} />
}
