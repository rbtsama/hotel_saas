/**
 * 平台后台 - 积分基础规则配置路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import BaseRuleConfigPage from '~/pages/PlatformAdmin/PointsManagement/BaseRuleConfigPage'
import PointsManagementService from '~/pages/PlatformAdmin/PointsManagement/services/points.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const config = await PointsManagementService.getBaseRuleConfig()
    return json({ config, error: null })
  } catch (error) {
    return json(
      { config: null, error: '加载配置失败' },
      { status: 500 }
    )
  }
}

export default function BaseRuleRoute() {
  const { config } = useLoaderData<typeof loader>()
  return <BaseRuleConfigPage config={config!} />
}
