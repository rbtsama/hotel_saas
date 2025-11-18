/**
 * 亲友礼遇卡记录页面 - 路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import FriendCardRecordsPage from '~/pages/FriendCard/FriendCardRecordsPage'
import FriendCardService from '~/pages/FriendCard/services/friendCard.service'

/**
 * Loader: 加载记录列表和统计数据
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const status = url.searchParams.get('status') || undefined
  const senderLevel = url.searchParams.get('senderLevel') || undefined
  const search = url.searchParams.get('search') || undefined
  const startDate = url.searchParams.get('startDate') || undefined
  const endDate = url.searchParams.get('endDate') || undefined

  try {
    // 并行加载记录和统计数据
    const [records, statistics] = await Promise.all([
      FriendCardService.getRecords({
        status: status as any,
        senderLevel,
        search,
        startDate,
        endDate,
      }),
      FriendCardService.getStatistics(),
    ])

    return json({ records, statistics, error: null })
  } catch (error) {
    console.error('Failed to load friend card records:', error)
    return json(
      {
        records: [],
        statistics: {
          totalSent: 0,
          totalAccepted: 0,
          totalUsed: 0,
          conversionRate: 0,
          usageRate: 0,
          byMemberLevel: [],
        },
        error: '加载记录失败',
      },
      { status: 500 }
    )
  }
}

/**
 * 默认导出：页面组件
 */
export default function FriendCardRecordsRoute() {
  const data = useLoaderData<typeof loader>()
  return <FriendCardRecordsPage records={data.records as any} statistics={data.statistics as any} error={data.error} />
}
