import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import OnboardingPage from '~/pages/HotelOnboarding/OnboardingPage'
import OnboardingService from '~/pages/HotelOnboarding/services/onboarding.service'
import { OnboardingStatus } from '~/pages/HotelOnboarding/types/onboarding.types'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search') || undefined
  const statusParam = url.searchParams.get('status')
  const bdOwner = url.searchParams.get('bdOwner') || undefined

  try {
    const [tasks, statistics] = await Promise.all([
      OnboardingService.getList({
        search,
        status: statusParam && statusParam !== 'all' ? statusParam as OnboardingStatus : undefined,
        bdOwner,
      }),
      OnboardingService.getStatistics(),
    ])

    return json({ tasks, statistics, error: null })
  } catch (error) {
    console.error('加载开通任务失败:', error)
    return json(
      { tasks: [], statistics: null, error: '加载数据失败' },
      { status: 500 }
    )
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const actionType = formData.get('actionType') as string
  const taskId = formData.get('taskId') as string

  try {
    switch (actionType) {
      case 'generate_account':
        await OnboardingService.generateAccount(taskId)
        return json({ success: true, message: '账号生成成功' })

      case 'mark_online':
        await OnboardingService.markAsOnline(taskId)
        return json({ success: true, message: '已标记为上线' })

      case 'update_status':
        const newStatus = formData.get('status') as OnboardingStatus
        await OnboardingService.updateStatus(taskId, newStatus)
        return json({ success: true, message: '状态更新成功' })

      default:
        return json({ success: false, message: '未知操作' }, { status: 400 })
    }
  } catch (error) {
    console.error('操作失败:', error)
    return json(
      { success: false, message: '操作失败' },
      { status: 500 }
    )
  }
}

export default function OnboardingRoute() {
  const { tasks, statistics, error } = useLoaderData<typeof loader>()
  const navigate = useNavigate()

  const handleGenerateAccount = async (taskId: string) => {
    const formData = new FormData()
    formData.append('actionType', 'generate_account')
    formData.append('taskId', taskId)

    try {
      const response = await fetch('/hotel/onboarding', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        // 刷新页面数据
        navigate('/hotel/onboarding', { replace: true })
      }
    } catch (error) {
      console.error('生成账号失败:', error)
    }
  }

  const handleMarkAsOnline = async (taskId: string) => {
    const formData = new FormData()
    formData.append('actionType', 'mark_online')
    formData.append('taskId', taskId)

    try {
      const response = await fetch('/hotel/onboarding', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        // 刷新页面数据
        navigate('/hotel/onboarding', { replace: true })
      }
    } catch (error) {
      console.error('标记上线失败:', error)
    }
  }

  return (
    <OnboardingPage
      tasks={tasks}
      statistics={statistics!}
      error={error}
      onGenerateAccount={handleGenerateAccount}
      onMarkAsOnline={handleMarkAsOnline}
    />
  )
}
