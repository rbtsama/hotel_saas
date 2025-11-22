/**
 * 平台后台 - 会员等级折扣规则配置路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import DiscountRulesPage from '~/pages/PlatformAdmin/MemberManagement/DiscountRulesPage'
import MemberManagementService from '~/pages/PlatformAdmin/MemberManagement/services/member.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const rules = await MemberManagementService.getDiscountRules()
    return json({ rules })
  } catch (error) {
    throw new Response('加载折扣规则失败', { status: 500 })
  }
}

export default function DiscountRulesRoute() {
  const { rules } = useLoaderData<typeof loader>()
  return <DiscountRulesPage rules={rules} />
}
