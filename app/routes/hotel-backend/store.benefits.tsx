/**
 * 门店礼赠配置路由
 */

import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import StoreBenefitsPage from '~/pages/HotelBackend/StoreBenefitsPage'
import StoreBenefitsService from '~/pages/HotelBackend/services/store-benefits.service'
import { BenefitApplicability } from '~/pages/HotelBackend/types/store-benefits.types'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // 实际应用中，storeId应从session中获取
    const storeId = 'store-1'
    const config = await StoreBenefitsService.getConfig(storeId)
    return json({ config, error: null })
  } catch (error) {
    return json({ config: null, error: '加载失败' }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get('_action')
  const storeId = 'store-1' // 实际应从session获取

  try {
    switch (action) {
      case 'create': {
        const data = {
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          applicability: formData.get('applicability') as BenefitApplicability,
          usageNotes: formData.get('usageNotes') as string,
          bookingRules: formData.get('bookingRules') as string,
          policyNotes: formData.get('policyNotes') as string,
          receptionTime: formData.get('receptionTime') as string,
          enabled: formData.get('enabled') === 'true',
        }

        await StoreBenefitsService.addBenefit(storeId, data)
        return redirect('/hotel-backend/store/benefits')
      }

      case 'update': {
        const benefitId = formData.get('benefitId') as string
        const data = {
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          applicability: formData.get('applicability') as BenefitApplicability,
          usageNotes: formData.get('usageNotes') as string,
          bookingRules: formData.get('bookingRules') as string,
          policyNotes: formData.get('policyNotes') as string,
          receptionTime: formData.get('receptionTime') as string,
          enabled: formData.get('enabled') === 'true',
        }

        await StoreBenefitsService.updateBenefit(benefitId, data)
        return redirect('/hotel-backend/store/benefits')
      }

      case 'delete': {
        const benefitId = formData.get('benefitId') as string
        await StoreBenefitsService.deleteBenefit(benefitId)
        return redirect('/hotel-backend/store/benefits')
      }

      default:
        return json({ success: false, error: '未知操作' }, { status: 400 })
    }
  } catch (error) {
    console.error('门店礼赠操作失败:', error)
    return json(
      { success: false, error: error instanceof Error ? error.message : '操作失败' },
      { status: 500 }
    )
  }
}

export default function StoreBenefitsRoute() {
  const { config, error } = useLoaderData<typeof loader>()

  if (error || !config) {
    return (
      <div className="p-6">
        <div className="text-red-600">错误: {error || '配置不存在'}</div>
      </div>
    )
  }

  return <StoreBenefitsPage config={config} />
}
