/**
 * 平台后台 - 用户会员等级管理路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import UserMemberManagementPage from '~/pages/PlatformAdmin/MemberManagement/UserMemberManagementPage'
import MemberManagementService from '~/pages/PlatformAdmin/MemberManagement/services/member.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const { list, total } = await MemberManagementService.getUserInfos()
    return json({ users: list, total })
  } catch (error) {
    throw new Response('加载用户列表失败', { status: 500 })
  }
}

export default function UsersRoute() {
  const { users, total } = useLoaderData<typeof loader>()
  return <UserMemberManagementPage users={users} total={total} />
}
