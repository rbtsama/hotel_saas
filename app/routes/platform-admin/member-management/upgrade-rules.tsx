/**
 * 平台后台 - 会员等级升级规则配置路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import UpgradeRulesPage from '~/pages/PlatformAdmin/MemberManagement/UpgradeRulesPage'
import MemberManagementService from '~/pages/PlatformAdmin/MemberManagement/services/member.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const rules = await MemberManagementService.getUpgradeRules()
    return json({ rules })
  } catch (error) {
    throw new Response('加载升级规则失败', { status: 500 })
  }
}

export default function UpgradeRulesRoute() {
  const { rules } = useLoaderData<typeof loader>()
  return <UpgradeRulesPage rules={rules} />
}
