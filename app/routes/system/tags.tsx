/**
 * 标签配置路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import TagConfigPage from '~/pages/SystemSettings/TagConfigPage'
import { mockTags } from '~/pages/SystemSettings/services/mocks'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return json({
      tags: mockTags,
      error: null,
    })
  } catch (error) {
    return json({
      tags: [],
      error: '加载失败',
    }, { status: 500 })
  }
}

export default function TagsRoute() {
  const data = useLoaderData<typeof loader>()

  if (data.error) {
    return (
      <div className="p-6">
        <div className="text-red-600">错误: {data.error}</div>
      </div>
    )
  }

  return <TagConfigPage tags={data.tags as any} />
}
