/**
 * 平台后台 - 积分基础规则配置页面
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { PointsBaseRuleConfig } from './types/points.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import LearningModal from '~/pages/Architecture/ScenarioDesign/components/LearningModal'

interface BaseRuleConfigPageProps {
  config: PointsBaseRuleConfig
  isLearningMode?: boolean
}

export default function BaseRuleConfigPage({ config, isLearningMode = true }: BaseRuleConfigPageProps) {
  const [formData, setFormData] = useState(config)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto p-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">积分基础规则配置</h1>
            <p className="text-slate-600 mt-1">
              配置积分获取和使用的基础规则，包括注册奖励、邀请奖励、基础兑换汇率
            </p>
          </div>
          <LearningModal title="积分基础规则配置 - 学习内容" isLearningMode={isLearningMode}>
            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold mb-2">功能说明</h3>
                <p className="text-slate-600">
                  本页面用于配置积分系统的基础规则，这些规则会影响所有用户的积分获取和使用。
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">配置项说明</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li><strong>注册奖励积分：</strong>新用户注册成功后自动发放的积分数量（范围：0-100）</li>
                  <li><strong>邀请奖励积分：</strong>被邀请用户完成首次离店后发放给邀请人的积分数量（范围：0-100）</li>
                  <li><strong>基础兑换汇率：</strong>用户使用积分抵扣现金的基础汇率，1积分=X元（范围：0.1-10.0）</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">业务流程</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-600">
                  <li>用户注册 → 系统自动发放"注册奖励积分"</li>
                  <li>被邀请用户完成首次离店 → 系统自动给邀请人发放"邀请奖励积分"</li>
                  <li>用户下单使用积分抵扣 → 按"基础兑换汇率 × 会员等级倍数"计算抵扣金额</li>
                </ol>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">注意事项</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>修改配置后立即生效，仅对新订单生效</li>
                  <li>历史订单不受影响</li>
                  <li>所有操作会记录操作日志</li>
                  <li>建议谨慎调整兑换汇率，避免用户体验波动</li>
                </ul>
              </section>
            </div>
          </LearningModal>
        </div>

        {/* 配置表单 */}
        <Form method="post">
          <input type="hidden" name="_action" value="update_base_rule" />

          <Card>
            <CardHeader>
              <CardTitle>积分获取规则</CardTitle>
              <CardDescription>配置用户获取积分的基础规则</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 注册奖励积分 */}
              <div className="space-y-2">
                <Label htmlFor="registerRewardPoints">注册奖励积分</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="registerRewardPoints"
                    name="registerRewardPoints"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.registerRewardPoints}
                    onChange={(e) =>
                      setFormData({ ...formData, registerRewardPoints: parseInt(e.target.value) || 0 })
                    }
                    className="max-w-xs"
                  />
                  <span className="text-sm text-slate-600">积分</span>
                </div>
                <p className="text-sm text-slate-500">
                  新用户注册成功后自动发放（范围：0-100）
                </p>
              </div>

              {/* 邀请奖励积分 */}
              <div className="space-y-2">
                <Label htmlFor="inviteRewardPoints">邀请奖励积分</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="inviteRewardPoints"
                    name="inviteRewardPoints"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.inviteRewardPoints}
                    onChange={(e) =>
                      setFormData({ ...formData, inviteRewardPoints: parseInt(e.target.value) || 0 })
                    }
                    className="max-w-xs"
                  />
                  <span className="text-sm text-slate-600">积分</span>
                </div>
                <p className="text-sm text-slate-500">
                  被邀请用户完成首次离店后发放给邀请人（范围：0-100）
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>积分使用规则</CardTitle>
              <CardDescription>配置用户使用积分的基础规则</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 基础兑换汇率 */}
              <div className="space-y-2">
                <Label htmlFor="baseExchangeRate">基础兑换汇率</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">1 积分 =</span>
                    <Input
                      id="baseExchangeRate"
                      name="baseExchangeRate"
                      type="number"
                      min="0.1"
                      max="10"
                      step="0.1"
                      value={formData.baseExchangeRate}
                      onChange={(e) =>
                        setFormData({ ...formData, baseExchangeRate: parseFloat(e.target.value) || 1.0 })
                      }
                      className="w-32"
                    />
                    <span className="text-sm text-slate-600">元</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  用户使用积分抵扣现金的基础汇率（范围：0.1-10.0）
                </p>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
                  <strong>示例：</strong>基础汇率1.0，VIP3汇率倍数1.2，则VIP3用户使用50积分可抵扣 50 × 1.0 × 1.2 = ¥60
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 更新信息 */}
          <div className="mt-6 p-4 bg-slate-100 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">最后更新时间：</span>
                <span className="text-slate-900 ml-2">{formData.updatedAt}</span>
              </div>
              <div>
                <span className="text-slate-600">更新人：</span>
                <span className="text-slate-900 ml-2">{formData.updatedBy}</span>
              </div>
            </div>
          </div>

          {/* 保存按钮 */}
          <div className="mt-6 flex justify-end">
            <Button type="submit" size="lg">
              保存设置
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
