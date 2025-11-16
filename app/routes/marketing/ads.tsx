/**
 * 广告管理路由
 */

import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import AdsManagementPage from '~/pages/MarketingManagement/AdsManagementPage'
import AdsService from '~/pages/MarketingManagement/services/ads.service'
import { WeekDay } from '~/pages/MarketingManagement/types/ads.types'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url)
    const positionId = url.searchParams.get('position')

    // 获取所有广告位
    const positions = await AdsService.getAllPositions()

    // 如果没有指定广告位,默认使用第一个
    const currentPositionId = positionId || positions[0]?.id
    if (!currentPositionId) {
      return json({
        positions: [],
        currentPosition: null,
        advertisements: [],
        error: '没有可用的广告位',
      })
    }

    // 获取当前广告位信息
    const currentPosition = await AdsService.getPositionById(currentPositionId)
    if (!currentPosition) {
      return json({
        positions,
        currentPosition: null,
        advertisements: [],
        error: '广告位不存在',
      })
    }

    // 获取该广告位的所有广告
    const advertisements = await AdsService.getAdsByPosition(currentPositionId)

    return json({
      positions,
      currentPosition,
      advertisements,
      error: null,
    })
  } catch (error) {
    console.error('广告管理加载失败:', error)
    return json({
      positions: [],
      currentPosition: null,
      advertisements: [],
      error: '加载失败',
    }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get('_action')

  try {
    switch (action) {
      // 更新广告位配置
      case 'updatePosition': {
        const positionId = formData.get('positionId') as string
        const enabled = formData.get('enabled') === 'true'
        const carouselInterval = Number(formData.get('carouselInterval'))

        await AdsService.updatePosition(positionId, {
          enabled,
          carouselInterval,
        })

        return json({ success: true, message: '广告位设置已更新' })
      }

      // 创建广告
      case 'createAd': {
        const positionId = formData.get('positionId') as string
        const imageUrl = formData.get('imageUrl') as string
        const validDateStart = formData.get('validDateStart') as string
        const validDateEnd = formData.get('validDateEnd') as string
        const validTimeStart = formData.get('validTimeStart') as string
        const validTimeEnd = formData.get('validTimeEnd') as string
        const weekDaysRaw = formData.getAll('weekDays')
        const weekDays = weekDaysRaw.map((d) => Number(d) as WeekDay)
        const clickUrl = formData.get('clickUrl') as string
        const enabled = formData.get('enabled') === 'true'

        if (weekDays.length === 0) {
          return json({ success: false, error: '请至少选择一个星期' }, { status: 400 })
        }

        await AdsService.createAd(positionId, {
          imageUrl,
          validDateStart,
          validDateEnd,
          validTimeStart,
          validTimeEnd,
          weekDays,
          clickUrl: clickUrl || undefined,
          enabled,
        })

        return redirect(`/marketing/ads?position=${positionId}`)
      }

      // 更新广告
      case 'updateAd': {
        const adId = formData.get('adId') as string
        const positionId = formData.get('positionId') as string
        const imageUrl = formData.get('imageUrl') as string
        const validDateStart = formData.get('validDateStart') as string
        const validDateEnd = formData.get('validDateEnd') as string
        const validTimeStart = formData.get('validTimeStart') as string
        const validTimeEnd = formData.get('validTimeEnd') as string
        const weekDaysRaw = formData.getAll('weekDays')
        const weekDays = weekDaysRaw.map((d) => Number(d) as WeekDay)
        const clickUrl = formData.get('clickUrl') as string
        const enabled = formData.get('enabled') === 'true'

        if (weekDays.length === 0) {
          return json({ success: false, error: '请至少选择一个星期' }, { status: 400 })
        }

        await AdsService.updateAd(adId, {
          imageUrl,
          validDateStart,
          validDateEnd,
          validTimeStart,
          validTimeEnd,
          weekDays,
          clickUrl: clickUrl || undefined,
          enabled,
        })

        return redirect(`/marketing/ads?position=${positionId}`)
      }

      // 删除广告
      case 'deleteAd': {
        const adId = formData.get('adId') as string
        const url = new URL(request.url)
        const positionId = url.searchParams.get('position')

        await AdsService.deleteAd(adId)

        return redirect(`/marketing/ads?position=${positionId}`)
      }

      // 重新排序广告
      case 'reorderAds': {
        const positionId = formData.get('positionId') as string
        const adIdsJson = formData.get('adIds') as string
        const adIds = JSON.parse(adIdsJson) as string[]

        await AdsService.reorderAds(positionId, adIds)

        return redirect(`/marketing/ads?position=${positionId}`)
      }

      default:
        return json({ success: false, error: '未知操作' }, { status: 400 })
    }
  } catch (error) {
    console.error('广告管理操作失败:', error)
    return json(
      { success: false, error: error instanceof Error ? error.message : '操作失败' },
      { status: 500 }
    )
  }
}

export default function AdsRoute() {
  const data = useLoaderData<typeof loader>()

  if (data.error) {
    return (
      <div className="p-6">
        <div className="text-red-600">错误: {data.error}</div>
      </div>
    )
  }

  return (
    <AdsManagementPage
      positions={data.positions as any}
      currentPosition={data.currentPosition as any}
      advertisements={data.advertisements as any}
    />
  )
}
