import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { FeatureModule, MembershipLevel } from './types/miniprogram.types'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import ModuleSummary from './components/ModuleSummary'
import ModuleCard from './components/ModuleCard'
import MembershipLevels from './components/MembershipLevels'

interface WechatMiniprogramPageProps {
  modules: FeatureModule[] | any[]
  membershipLevels: MembershipLevel[] | any[]
  summary: {
    totalModules: number
    totalFeatures: number
    totalScreens: number
  }
}

export default function WechatMiniprogramPage({
  modules,
  membershipLevels,
  summary
}: WechatMiniprogramPageProps) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <ModuleSummary
            totalModules={summary.totalModules}
            totalFeatures={summary.totalFeatures}
            totalScreens={summary.totalScreens}
          />
        </div>

        <div className="mb-8">
          <Form method="get" className="flex gap-2">
            <Input
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="搜索功能或模块..."
              className="flex-1"
            />
            <Button type="submit">搜索</Button>
            {searchValue && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearchValue('')
                  window.location.href = '/wechat-miniprogram'
                }}
              >
                清除
              </Button>
            )}
          </Form>
        </div>

        {modules.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">未找到匹配的功能模块</p>
            <p className="text-sm mt-2">尝试使用其他关键词搜索</p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">功能模块详情</h2>
            {modules.map((module) => (
              <div key={module.id}>
                <ModuleCard module={module} />
                {module.id === 'membership' && (
                  <div className="mt-4">
                    <MembershipLevels levels={membershipLevels} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 bg-muted/30 rounded-lg border">
          <h3 className="text-xl font-bold mb-4">小程序总结</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">产品定位：</strong>
              民宿/酒店预订平台微信小程序，连接优质民宿与用户，提供完整的在线预订服务
            </p>
            <p>
              <strong className="text-foreground">核心业务流程：</strong>
              浏览门店 → 搜索筛选 → 查看详情 → 选择房型 → 购物车 → 确认订单 → 支付 → 订单管理 → 评价/售后
            </p>
            <p>
              <strong className="text-foreground">关键模块：</strong>
              门店展示与搜索、房型预订、订单管理、会员系统、售后服务、商家入驻
            </p>
            <p>
              <strong className="text-foreground">特色亮点：</strong>
              4级会员体系、里程值积分（100里程值=1元）、售后委员会裁决、亲友礼遇卡、定向会员邀请
            </p>
            <p>
              <strong className="text-foreground">设计风格：</strong>
              暖色调（amber/金黄色）强调温馨自然，卡片式布局，图文并茂展示门店特色
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
