/**
 * 平台后台 - 积分服务设置路由（积分奖励 + 积分换购）
 */

import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PointsServicesPage from '~/pages/PlatformAdmin/PointsManagement/PointsServicesPage'
import ValueAddedServiceService from '~/pages/PlatformAdmin/PointsManagement/services/valueAddedService.service'

/**
 * Loader: 加载积分奖励和换购服务列表
 */
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const [rewardServices, exchangeServices] = await Promise.all([
      ValueAddedServiceService.getRewardServices(),
      ValueAddedServiceService.getExchangeServices(),
    ])

    return json({
      rewardServices,
      exchangeServices,
      error: null,
    })
  } catch (error) {
    console.error('加载积分服务失败:', error)
    return json(
      {
        rewardServices: [],
        exchangeServices: [],
        error: '加载积分服务失败',
      },
      { status: 500 }
    )
  }
}

/**
 * Action: 处理积分服务的所有操作
 */
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const actionType = formData.get('action') as string

  try {
    switch (actionType) {
      // ==================== 积分奖励服务 ====================
      case 'create-reward': {
        const serviceName = formData.get('serviceName') as string
        const serviceDescription = formData.get('serviceDescription') as string
        const pointsAmount = parseInt(formData.get('pointsAmount') as string, 10)

        // 验证
        if (!serviceName || serviceName.trim().length === 0) {
          return json({ error: '服务内容不能为空' }, { status: 400 })
        }
        if (serviceName.length > 50) {
          return json({ error: '服务内容不能超过50字符' }, { status: 400 })
        }
        if (isNaN(pointsAmount) || pointsAmount < 1) {
          return json({ error: '积分数量必须为正整数' }, { status: 400 })
        }

        await ValueAddedServiceService.createRewardService({
          serviceName: serviceName.trim(),
          serviceDescription: serviceDescription?.trim() || '',
          pointsReward: pointsAmount,
          status: 'active',
        })

        return redirect('/platform-admin/points-management/services')
      }

      case 'update-reward': {
        const id = formData.get('id') as string
        const serviceName = formData.get('serviceName') as string
        const serviceDescription = formData.get('serviceDescription') as string
        const pointsAmount = parseInt(formData.get('pointsAmount') as string, 10)

        // 验证
        if (!serviceName || serviceName.trim().length === 0) {
          return json({ error: '服务内容不能为空' }, { status: 400 })
        }
        if (serviceName.length > 50) {
          return json({ error: '服务内容不能超过50字符' }, { status: 400 })
        }
        if (isNaN(pointsAmount) || pointsAmount < 1) {
          return json({ error: '积分数量必须为正整数' }, { status: 400 })
        }

        const result = await ValueAddedServiceService.updateRewardService(id, {
          serviceName: serviceName.trim(),
          serviceDescription: serviceDescription?.trim() || '',
          pointsReward: pointsAmount,
        })

        if (!result) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/services')
      }

      case 'delete-reward': {
        const id = formData.get('id') as string
        const success = await ValueAddedServiceService.deleteRewardService(id)

        if (!success) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/services')
      }

      case 'toggle-reward': {
        const id = formData.get('id') as string
        const result = await ValueAddedServiceService.toggleRewardServiceStatus(id)

        if (!result) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/services')
      }

      // ==================== 积分换购服务 ====================
      case 'create-exchange': {
        const serviceName = formData.get('serviceName') as string
        const serviceDescription = formData.get('serviceDescription') as string
        const pointsAmount = parseInt(formData.get('pointsAmount') as string, 10)

        // 验证
        if (!serviceName || serviceName.trim().length === 0) {
          return json({ error: '服务内容不能为空' }, { status: 400 })
        }
        if (serviceName.length > 50) {
          return json({ error: '服务内容不能超过50字符' }, { status: 400 })
        }
        if (isNaN(pointsAmount) || pointsAmount < 1) {
          return json({ error: '积分数量必须为正整数' }, { status: 400 })
        }

        await ValueAddedServiceService.createExchangeService({
          serviceName: serviceName.trim(),
          serviceDescription: serviceDescription?.trim() || '',
          pointsCost: pointsAmount,
          status: 'active',
        })

        return redirect('/platform-admin/points-management/services')
      }

      case 'update-exchange': {
        const id = formData.get('id') as string
        const serviceName = formData.get('serviceName') as string
        const serviceDescription = formData.get('serviceDescription') as string
        const pointsAmount = parseInt(formData.get('pointsAmount') as string, 10)

        // 验证
        if (!serviceName || serviceName.trim().length === 0) {
          return json({ error: '服务内容不能为空' }, { status: 400 })
        }
        if (serviceName.length > 50) {
          return json({ error: '服务内容不能超过50字符' }, { status: 400 })
        }
        if (isNaN(pointsAmount) || pointsAmount < 1) {
          return json({ error: '积分数量必须为正整数' }, { status: 400 })
        }

        const result = await ValueAddedServiceService.updateExchangeService(id, {
          serviceName: serviceName.trim(),
          serviceDescription: serviceDescription?.trim() || '',
          pointsCost: pointsAmount,
        })

        if (!result) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/services')
      }

      case 'delete-exchange': {
        const id = formData.get('id') as string
        const success = await ValueAddedServiceService.deleteExchangeService(id)

        if (!success) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/services')
      }

      case 'toggle-exchange': {
        const id = formData.get('id') as string
        const result = await ValueAddedServiceService.toggleExchangeServiceStatus(id)

        if (!result) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/services')
      }

      case 'reorder-exchange': {
        const idsJson = formData.get('ids') as string
        const ids = JSON.parse(idsJson) as string[]

        if (!Array.isArray(ids) || ids.length === 0) {
          return json({ error: '无效的排序数据' }, { status: 400 })
        }

        await ValueAddedServiceService.reorderExchangeServices(ids)
        return redirect('/platform-admin/points-management/services')
      }

      default:
        return json({ error: '未知操作类型' }, { status: 400 })
    }
  } catch (error) {
    console.error('操作失败:', error)
    return json(
      { error: error instanceof Error ? error.message : '操作失败' },
      { status: 500 }
    )
  }
}

/**
 * 路由组件
 */
export default function PointsServicesRoute() {
  const { rewardServices, exchangeServices, error } = useLoaderData<typeof loader>()

  return (
    <PointsServicesPage
      rewardServices={rewardServices as any}
      exchangeServices={exchangeServices as any}
      error={error}
    />
  )
}
