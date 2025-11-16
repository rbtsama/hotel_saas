/**
 * 仲裁委员管理路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ArbitratorsPage from '~/pages/DisputeManagement/ArbitratorsPage'
import { mockArbitrators } from '~/pages/DisputeManagement/services/mocks'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return json({
      arbitrators: mockArbitrators,
      error: null,
    })
  } catch (error) {
    return json({
      arbitrators: [],
      error: '加载失败',
    }, { status: 500 })
  }
}

export default function ArbitratorsRoute() {
  const data = useLoaderData<typeof loader>()

  if (data.error) {
    return (
      <div className="p-6">
        <div className="text-red-600">错误: {data.error}</div>
      </div>
    )
  }

  return <ArbitratorsPage arbitrators={data.arbitrators as any} />
}
