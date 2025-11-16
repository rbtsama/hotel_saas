/**
 * 仲裁案件管理路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ArbitrationCasesPage from '~/pages/DisputeManagement/ArbitrationCasesPage'
import { mockArbitrationCases } from '~/pages/DisputeManagement/services/mocks'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return json({
      cases: mockArbitrationCases,
      error: null,
    })
  } catch (error) {
    return json({
      cases: [],
      error: '加载失败',
    }, { status: 500 })
  }
}

export default function ArbitrationCasesRoute() {
  const data = useLoaderData<typeof loader>()

  if (data.error) {
    return (
      <div className="p-6">
        <div className="text-red-600">错误: {data.error}</div>
      </div>
    )
  }

  return <ArbitrationCasesPage cases={data.cases as any} />
}
