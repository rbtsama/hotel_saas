/**
 * 商户端 - 邀请会员路由
 */

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import InviteMemberPage from '~/pages/MerchantBackend/OldCustomer/InviteMemberPage'
import { mockInviteRecords } from '~/pages/MerchantBackend/OldCustomer/services/mocks/inviteMember.mock'

export async function loader() {
  try {
    return json({ records: mockInviteRecords })
  } catch (error) {
    throw new Response('加载邀请记录失败', { status: 500 })
  }
}

export default function InviteMemberRoute() {
  const { records } = useLoaderData<typeof loader>()
  return <InviteMemberPage records={records} />
}
