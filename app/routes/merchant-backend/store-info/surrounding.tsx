/**
 * 商户端 - 门店信息 - 周边信息路由
 */

import { json, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, useRevalidator } from '@remix-run/react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import SurroundingInfoPage from '~/pages/MerchantBackend/StoreInfo/SurroundingInfoPage'
import StoreInfoService from '~/pages/MerchantBackend/StoreInfo/services/storeInfo.service'
import type { SurroundingInfo } from '~/pages/MerchantBackend/StoreInfo/types/storeInfo.types'

export async function loader() {
  try {
    const storeInfo = await StoreInfoService.getStoreInfo()
    return json({ data: storeInfo.surroundingInfo, error: null })
  } catch (error) {
    return json({ data: null, error: '加载周边信息失败' }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const dataStr = formData.get('data') as string

  try {
    const result = await StoreInfoService.updateSurroundingInfo(JSON.parse(dataStr) as Partial<SurroundingInfo>)
    return json({ success: true, data: result })
  } catch (error) {
    return json({ success: false, error: '保存失败' }, { status: 500 })
  }
}

export default function SurroundingInfoRoute() {
  const { data, error } = useLoaderData<typeof loader>()
  const revalidator = useRevalidator()

  if (error || !data) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-red-600">错误：{error || '数据加载失败'}</div>
        </div>
      </MainLayout>
    )
  }

  const handleSave = async (updateData: Partial<SurroundingInfo>) => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(updateData))

    const response = await fetch('/merchant-backend/store-info/surrounding', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('保存失败')
    }

    revalidator.revalidate()
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">周边信息</h1>
          </div>
          <SurroundingInfoPage data={data} onSave={handleSave} />
        </div>
      </div>
    </MainLayout>
  )
}
