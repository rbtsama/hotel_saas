/**
 * 平台后台 - 用户积分明细路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import UserPointsDetailPage from '~/pages/PlatformAdmin/PointsManagement/UserPointsDetailPage'
import MemberManagementService from '~/pages/PlatformAdmin/MemberManagement/services/member.service'
import PointsManagementService from '~/pages/PlatformAdmin/PointsManagement/services/points.service'

export async function loader({ params }: LoaderFunctionArgs) {
  const { userId } = params

  if (!userId) {
    throw new Response('用户ID缺失', { status: 400 })
  }

  try {
    const { userInfo, nightRecords } = await MemberManagementService.getUserDetail(userId)
    const pointsRecords = await PointsManagementService.getUserPointsRecords(userId)

    if (!userInfo) {
      throw new Response('用户不存在', { status: 404 })
    }

    return json({ userInfo, nightRecords, pointsRecords })
  } catch (error) {
    throw new Response('加载用户详情失败', { status: 500 })
  }
}

export default function UserPointsDetailRoute() {
  const { userInfo, nightRecords, pointsRecords } = useLoaderData<typeof loader>()
  return <UserPointsDetailPage userInfo={userInfo} nightRecords={nightRecords} pointsRecords={pointsRecords} />
}
