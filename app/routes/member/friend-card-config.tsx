/**
 * 亲友礼遇卡配置页面 - 路由
 */

import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import FriendCardConfigPage from '~/pages/FriendCard/FriendCardConfigPage'
import FriendCardService from '~/pages/FriendCard/services/friendCard.service'

/**
 * Loader: 加载配置列表
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const memberLevel = url.searchParams.get('memberLevel') || undefined
  const isActiveParam = url.searchParams.get('isActive')

  try {
    const configs = await FriendCardService.getConfigs({
      memberLevel: memberLevel as any,
      isActive: isActiveParam ? isActiveParam === 'true' : undefined,
    })

    return json({ configs, error: null })
  } catch (error) {
    console.error('Failed to load friend card configs:', error)
    return json(
      {
        configs: [],
        error: '加载配置失败',
      },
      { status: 500 }
    )
  }
}

/**
 * Action: 处理配置创建、更新、删除
 */
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  try {
    switch (intent) {
      case 'create': {
        const data = {
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          memberLevel: formData.get('memberLevel') as any,
          cardsCount: parseInt(formData.get('cardsCount') as string),
          experienceLevel: formData.get('experienceLevel') as any,
          experienceDuration: parseInt(formData.get('experienceDuration') as string),
          experienceTimes: parseInt(formData.get('experienceTimes') as string),
          isActive: formData.get('isActive') === 'on',
        }

        await FriendCardService.createConfig(data)
        return redirect('/member/friend-card-config')
      }

      case 'update': {
        const id = formData.get('id') as string
        const data = {
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          memberLevel: formData.get('memberLevel') as any,
          cardsCount: parseInt(formData.get('cardsCount') as string),
          experienceLevel: formData.get('experienceLevel') as any,
          experienceDuration: parseInt(formData.get('experienceDuration') as string),
          experienceTimes: parseInt(formData.get('experienceTimes') as string),
          isActive: formData.get('isActive') === 'on',
        }

        await FriendCardService.updateConfig(id, data)
        return redirect('/member/friend-card-config')
      }

      case 'delete': {
        const id = formData.get('id') as string
        await FriendCardService.deleteConfig(id)
        return redirect('/member/friend-card-config')
      }

      case 'toggle': {
        const id = formData.get('id') as string
        await FriendCardService.toggleConfigStatus(id)
        return redirect('/member/friend-card-config')
      }

      default:
        return json({ error: '无效的操作' }, { status: 400 })
    }
  } catch (error) {
    console.error('Action failed:', error)
    return json(
      { error: error instanceof Error ? error.message : '操作失败' },
      { status: 500 }
    )
  }
}

/**
 * 默认导出：页面组件
 */
export default function FriendCardConfigRoute() {
  const data = useLoaderData<typeof loader>()
  return <FriendCardConfigPage configs={data.configs as any} error={data.error} />
}
