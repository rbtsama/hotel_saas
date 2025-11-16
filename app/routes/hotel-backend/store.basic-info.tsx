/**
 * 门店基本信息路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import StoreBasicInfoPage from '~/pages/HotelBackend/StoreBasicInfoPage'
import { mockStores } from '~/pages/HotelBackend/services/mocks'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // 实际项目中会根据当前登录的酒店管理员获取其门店
    // 这里简化为返回第一个门店
    const store = mockStores[0]

    if (!store) {
      return json({
        store: null,
        error: '门店不存在',
      }, { status: 404 })
    }

    return json({
      store,
      error: null,
    })
  } catch (error) {
    return json({
      store: null,
      error: '加载失败',
    }, { status: 500 })
  }
}

export default function StoreBasicInfoRoute() {
  const data = useLoaderData<typeof loader>()

  if (data.error || !data.store) {
    return (
      <div className="p-6">
        <div className="text-red-600">错误: {data.error}</div>
      </div>
    )
  }

  return <StoreBasicInfoPage store={data.store as any} />
}
