/**
 * 协议配置路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import AgreementConfigPage from '~/pages/SystemSettings/AgreementConfigPage'
import { mockAgreements } from '~/pages/SystemSettings/services/mocks'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return json({
      agreements: mockAgreements,
      error: null,
    })
  } catch (error) {
    return json({
      agreements: [],
      error: '加载失败',
    }, { status: 500 })
  }
}

export default function AgreementsRoute() {
  const data = useLoaderData<typeof loader>()

  if (data.error) {
    return (
      <div className="p-6">
        <div className="text-red-600">错误: {data.error}</div>
      </div>
    )
  }

  return <AgreementConfigPage agreements={data.agreements as any} />
}
