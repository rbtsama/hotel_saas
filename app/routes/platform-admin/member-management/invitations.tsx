/**
 * 平台后台 - 会员邀请路由
 */

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import MemberInvitationPage from '~/pages/PlatformAdmin/MemberManagement/MemberInvitationPage'
import { mockMemberInvitations } from '~/pages/PlatformAdmin/MemberManagement/services/mocks/memberInvitation.mock'

export async function loader() {
  try {
    // 按VIP获得时间倒序排列
    const sortedInvitations = [...mockMemberInvitations].sort((a, b) =>
      new Date(b.vipAcquiredAt).getTime() - new Date(a.vipAcquiredAt).getTime()
    )
    return json({ invitations: sortedInvitations })
  } catch (error) {
    throw new Response('加载邀请记录失败', { status: 500 })
  }
}

export default function MemberInvitationRoute() {
  const { invitations } = useLoaderData<typeof loader>()
  return <MemberInvitationPage invitations={invitations} />
}
