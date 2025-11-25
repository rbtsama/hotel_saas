/**
 * 商户端 - 门店信息 - 基本信息路由
 */

import { json, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, useRevalidator } from '@remix-run/react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import BasicInfoPage from '~/pages/MerchantBackend/StoreInfo/BasicInfoPage'
import StoreInfoService from '~/pages/MerchantBackend/StoreInfo/services/storeInfo.service'
import type { BasicInfo } from '~/pages/MerchantBackend/StoreInfo/types/storeInfo.types'

export async function loader() {
  try {
    const storeInfo = await StoreInfoService.getStoreInfo()
    return json({ data: storeInfo.basicInfo, error: null })
  } catch (error) {
    return json({ data: null, error: '加载基本信息失败' }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const dataStr = formData.get('data') as string

  try {
    const result = await StoreInfoService.updateBasicInfo(JSON.parse(dataStr) as Partial<BasicInfo>)
    return json({ success: true, data: result })
  } catch (error) {
    return json({ success: false, error: '保存失败' }, { status: 500 })
  }
}

export default function BasicInfoRoute() {
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

  const handleSave = async (updateData: Partial<BasicInfo>) => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(updateData))

    const response = await fetch('/merchant-backend/store-info/basic', {
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
            <h1 className="text-2xl font-bold text-slate-900">基本信息</h1>
          </div>
          <BasicInfoPage data={data} onSave={handleSave} />
        </div>
      </div>
    </MainLayout>
  )
}
