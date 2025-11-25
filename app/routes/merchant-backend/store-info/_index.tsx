import { json, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, useRevalidator } from '@remix-run/react'
import StoreInfoMainPage from '~/pages/MerchantBackend/StoreInfo/StoreInfoMainPage'
import StoreInfoService from '~/pages/MerchantBackend/StoreInfo/services/storeInfo.service'
import type {
  BasicInfo,
  PolicyInfo,
  FacilityInfo,
  SurroundingInfo,
  BreakfastPolicy,
  ExtraBedPolicy,
  ImageInfo,
} from '~/pages/MerchantBackend/StoreInfo/types/storeInfo.types'

export async function loader() {
  try {
    const storeInfo = await StoreInfoService.getStoreInfo()
    return json({ storeInfo, error: null })
  } catch (error) {
    return json({ storeInfo: null, error: '加载门店信息失败' }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const actionType = formData.get('actionType') as string
  const dataStr = formData.get('data') as string

  try {
    let result

    switch (actionType) {
      case 'update_basic_info':
        result = await StoreInfoService.updateBasicInfo(JSON.parse(dataStr) as Partial<BasicInfo>)
        break
      case 'update_policy_info':
        result = await StoreInfoService.updatePolicyInfo(
          JSON.parse(dataStr) as Partial<PolicyInfo>
        )
        break
      case 'update_facility_info':
        result = await StoreInfoService.updateFacilityInfo(
          JSON.parse(dataStr) as Partial<FacilityInfo>
        )
        break
      case 'update_surrounding_info':
        result = await StoreInfoService.updateSurroundingInfo(
          JSON.parse(dataStr) as Partial<SurroundingInfo>
        )
        break
      case 'update_breakfast_policy':
        result = await StoreInfoService.updateBreakfastPolicy(
          JSON.parse(dataStr) as Partial<BreakfastPolicy>
        )
        break
      case 'update_extrabed_policy':
        result = await StoreInfoService.updateExtraBedPolicy(
          JSON.parse(dataStr) as Partial<ExtraBedPolicy>
        )
        break
      case 'update_image_info':
        result = await StoreInfoService.updateImageInfo(
          JSON.parse(dataStr) as Partial<ImageInfo>
        )
        break
      case 'update_share_text':
        result = await StoreInfoService.updateShareText(dataStr)
        break
      default:
        return json({ success: false, error: '未知操作类型' }, { status: 400 })
    }

    return json({ success: true, data: result })
  } catch (error) {
    return json({ success: false, error: '操作失败' }, { status: 500 })
  }
}

export default function StoreInfoRoute() {
  const { storeInfo, error } = useLoaderData<typeof loader>()
  const revalidator = useRevalidator()

  if (error || !storeInfo) {
    return (
      <div className="p-6">
        <div className="text-red-600">错误：{error || '数据加载失败'}</div>
      </div>
    )
  }

  const createActionHandler =
    (actionType: string) => async (data: any) => {
      const formData = new FormData()
      formData.append('actionType', actionType)
      formData.append('data', JSON.stringify(data))

      const response = await fetch('/merchant-backend/store-info', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('操作失败')
      }

      // 重新加载数据
      revalidator.revalidate()
    }

  const handleUpdateShareText = async (text: string) => {
    const formData = new FormData()
    formData.append('actionType', 'update_share_text')
    formData.append('data', text)

    const response = await fetch('/merchant-backend/store-info', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('操作失败')
    }

    // 重新加载数据
    revalidator.revalidate()
  }

  return (
    <StoreInfoMainPage
      data={storeInfo}
      onUpdateBasicInfo={createActionHandler('update_basic_info')}
      onUpdatePolicyInfo={createActionHandler('update_policy_info')}
      onUpdateFacilityInfo={createActionHandler('update_facility_info')}
      onUpdateSurroundingInfo={createActionHandler('update_surrounding_info')}
      onUpdateBreakfastPolicy={createActionHandler('update_breakfast_policy')}
      onUpdateExtraBedPolicy={createActionHandler('update_extrabed_policy')}
      onUpdateImageInfo={createActionHandler('update_image_info')}
      onUpdateShareText={handleUpdateShareText}
    />
  )
}
