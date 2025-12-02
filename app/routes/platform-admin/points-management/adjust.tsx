/**
 * 平台后台 - 积分调整路由
 */

import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PointsAdjustPage from '~/pages/PlatformAdmin/PointsManagement/PointsAdjustPage'
import ValueAddedServiceService from '~/pages/PlatformAdmin/PointsManagement/services/valueAddedService.service'

/**
 * Loader: 初始化积分调整页面
 */
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url)
    const phoneNumber = url.searchParams.get('phoneNumber') || ''
    const pageNum = parseInt(url.searchParams.get('pageNum') || '1', 10)

    let userAccount = null
    let changeLogs = []
    let total = 0

    if (phoneNumber) {
      userAccount = await ValueAddedServiceService.getUserAccountByPhone(phoneNumber)
      if (userAccount) {
        const result = await ValueAddedServiceService.getPointsChangeLogsByUserId(userAccount.userId, 20, pageNum)
        changeLogs = result.data
        total = result.total
      }
    }

    return json({
      userAccount,
      changeLogs,
      total,
      pageNum,
      phoneNumber,
      error: null,
    })
  } catch (error) {
    console.error('加载积分调整页面失败:', error)
    return json(
      {
        userAccount: null,
        changeLogs: [],
        total: 0,
        pageNum: 1,
        error: '加载数据失败',
      },
      { status: 500 }
    )
  }
}

/**
 * Action: 处理积分调整相关操作
 */
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const actionType = formData.get('action') as string

  try {
    switch (actionType) {
      case 'search': {
        const phoneNumber = formData.get('phoneNumber') as string
        const pageNum = formData.get('pageNum') as string || '1'

        if (!phoneNumber || phoneNumber.trim().length === 0) {
          return json({ error: '请输入手机号' }, { status: 400 })
        }

        // 验证手机号格式
        const phoneRegex = /^1[3-9]\d{9}$/
        if (!phoneRegex.test(phoneNumber)) {
          return json({ error: '手机号格式不正确' }, { status: 400 })
        }

        // 返回搜索结果
        const userAccount = await ValueAddedServiceService.getUserAccountByPhone(phoneNumber)
        let changeLogs = []
        let total = 0

        if (userAccount) {
          const result = await ValueAddedServiceService.getPointsChangeLogsByUserId(userAccount.userId, 20, parseInt(pageNum, 10))
          changeLogs = result.data
          total = result.total
        }

        return json({
          userAccount,
          changeLogs,
          total,
          pageNum: parseInt(pageNum, 10),
          error: null,
        })
      }

      case 'adjust-points': {
        const userId = formData.get('userId') as string
        const pointsAmount = parseInt(formData.get('pointsAmount') as string, 10)
        const remark = formData.get('remark') as string

        if (!userId) {
          return json({ error: '用户ID不能为空' }, { status: 400 })
        }

        if (isNaN(pointsAmount)) {
          return json({ error: '调整积分必须为整数' }, { status: 400 })
        }

        if (!remark || remark.trim().length === 0) {
          return json({ error: '调整原因不能为空' }, { status: 400 })
        }

        if (remark.length > 200) {
          return json({ error: '调整原因不能超过200字符' }, { status: 400 })
        }

        try {
          await ValueAddedServiceService.adjustUserPoints(
            userId,
            pointsAmount,
            remark.trim(),
            '兔子' // 操作人，后期可从session获取
          )

          return json({ success: true, message: '积分调整成功' })
        } catch (error) {
          return json(
            { error: error instanceof Error ? error.message : '调整失败' },
            { status: 400 }
          )
        }
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
export default function PointsAdjustRoute() {
  const { userAccount, changeLogs, total, pageNum, phoneNumber, error } = useLoaderData<typeof loader>()

  return (
    <PointsAdjustPage
      userAccount={userAccount as any}
      changeLogs={changeLogs as any}
      total={total}
      pageNum={pageNum}
      phoneNumber={phoneNumber}
      error={error}
    />
  )
}
