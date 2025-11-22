/**
 * 平台后台 - 积分统计路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PointsStatisticsPage from '~/pages/PlatformAdmin/PointsManagement/PointsStatisticsPage'
import PointsManagementService from '~/pages/PlatformAdmin/PointsManagement/services/points.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const statistics = await PointsManagementService.getStatistics()
    return json({ statistics })
  } catch (error) {
    throw new Response('加载统计数据失败', { status: 500 })
  }
}

export default function StatisticsRoute() {
  const { statistics } = useLoaderData<typeof loader>()
  return <PointsStatisticsPage statistics={statistics} />
}
