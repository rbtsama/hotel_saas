import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import InvitationRecordsPage from '~/pages/MemberInvitation/InvitationRecordsPage'
import InvitationService from '~/pages/MemberInvitation/services/invitation.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url)
    const hotelId = url.searchParams.get('hotelId') || undefined
    const status = url.searchParams.get('status') as 'pending' | 'accepted' | 'expired' | 'cancelled' | undefined
    const invitationType = url.searchParams.get('invitationType') as 'targeted' | 'unlimited' | undefined
    const startDate = url.searchParams.get('startDate') || undefined
    const endDate = url.searchParams.get('endDate') || undefined

    const [records, statistics] = await Promise.all([
      InvitationService.getInvitationRecords({
        hotelId,
        status,
        invitationType,
        startDate,
        endDate,
      }),
      InvitationService.getInvitationStatistics(),
    ])

    return json({ records, statistics, error: null })
  } catch (error) {
    return json(
      {
        records: [],
        statistics: {
          totalInvitations: 0,
          pendingInvitations: 0,
          acceptedInvitations: 0,
          expiredInvitations: 0,
          conversionRate: 0,
          byHotel: [],
        },
        error: '加载邀请记录失败',
      },
      { status: 500 }
    )
  }
}

export default function InvitationRecordsRoute() {
  const data = useLoaderData<typeof loader>()
  return <InvitationRecordsPage records={data.records as any} statistics={data.statistics as any} error={data.error} />
}
