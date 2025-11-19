import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import BusinessStatisticsPage from '~/pages/HotelBackend/BusinessManagement/BusinessStatisticsPage'
import businessService from '~/pages/HotelBackend/BusinessManagement/services/business.service'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const startDate = url.searchParams.get('startDate') || '11/12/25'
  const endDate = url.searchParams.get('endDate') || '11/18/25'

  try {
    const data = await businessService.getBusinessStatistics({
      startDate,
      endDate,
      groupBy: 'day'
    })
    return json({ data, error: null })
  } catch (error) {
    return json({ data: null, error: '获取经营统计失败' }, { status: 500 })
  }
}

export default function BusinessStatisticsRoute() {
  const { data, error } = useLoaderData<typeof loader>()

  if (error || !data) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error || '数据加载失败'}</div>
      </div>
    )
  }

  return <BusinessStatisticsPage data={data} />
}
