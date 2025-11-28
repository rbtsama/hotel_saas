/**
 * 商户端 - 入驻申请路由
 */

import { json, type ActionFunctionArgs } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import JoinApplicationPage from '~/pages/MerchantBackend/JoinApplication/JoinApplicationPage'
import JoinApplicationService from '~/pages/MerchantBackend/JoinApplication/services/joinApplication.service'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  try {
    // 这里可以处理表单提交
    const data = Object.fromEntries(formData)
    console.log('收到入驻申请:', data)

    return json({ success: true, message: '申请已提交' })
  } catch (error) {
    return json({ success: false, message: '提交失败' }, { status: 500 })
  }
}

export default function JoinApplicationRoute() {
  const actionData = useActionData<typeof action>()

  return <JoinApplicationPage />
}
