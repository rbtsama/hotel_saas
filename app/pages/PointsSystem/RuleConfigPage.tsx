/**
 * 积分规则配置页面
 * 展示和配置积分获取、消耗、有效期规则
 */

import { useState } from 'react'
import type { PointsRuleConfig } from './types/points.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import MainLayout from './components/MainLayout'
import SettingsPageHeader from '~/pages/SharedComponents/SettingsPageHeader'
import { mockPointsRuleChangeLogs } from '~/pages/SharedTypes/changeLog.mock'

interface RuleConfigPageProps {
  config: PointsRuleConfig
  error?: string | null
}

export default function RuleConfigPage({ config: initialConfig, error }: RuleConfigPageProps) {
  const [config, setConfig] = useState(initialConfig)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleEditToggle = () => {
    setIsEditMode(true)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setConfig(initialConfig) // 恢复原始数据
  }

  const handleSave = () => {
    // 这里应该调用API保存
    console.log('保存配置:', config)
    setIsEditMode(false)
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* 页面标题 - 使用通用头部组件 */}
        <SettingsPageHeader
          title="平台积分设置"
          isEditing={isEditMode}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
          onCancel={handleCancel}
          changeLogs={mockPointsRuleChangeLogs}
          changeLogTitle="积分规则配置 - 修改记录"
        />

        {/* 积分获取规则 */}
        <Card>
          <CardHeader>
            <CardTitle>积分获取规则</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="earnRatio">消费兑换比例</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">消费 1 元 =</span>
                  <Input
                    id="earnRatio"
                    type="number"
                    value={config.earnRule.earnRatio}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        earnRule: { ...config.earnRule, earnRatio: Number(e.target.value) }
                      })
                    }
                    className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm">积分</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  参考：美团 1:1，京东 1:2
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minOrderAmount">最低起算金额</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">订单满</span>
                  <Input
                    id="minOrderAmount"
                    type="number"
                    value={config.earnRule.minOrderAmount}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        earnRule: { ...config.earnRule, minOrderAmount: Number(e.target.value) }
                      })
                    }
                    className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm">元起算</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registerBonus">注册奖励积分</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">注册送</span>
                  <Input
                    id="registerBonus"
                    type="number"
                    min="0"
                    value={config.earnRule.registerBonus}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        earnRule: { ...config.earnRule, registerBonus: Number(e.target.value) }
                      })
                    }
                    className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm">积分</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inviteBonus">邀请奖励积分</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">邀请送</span>
                  <Input
                    id="inviteBonus"
                    type="number"
                    min="0"
                    value={config.earnRule.inviteBonus}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        earnRule: { ...config.earnRule, inviteBonus: Number(e.target.value) }
                      })
                    }
                    className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm">积分</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delayHours">发放时机</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">订单完成后</span>
                <Input
                  id="delayHours"
                  type="number"
                  value={config.earnRule.delayHours}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      earnRule: { ...config.earnRule, delayHours: Number(e.target.value) }
                    })
                  }
                  className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                  disabled={!isEditMode}
                />
                <span className="text-sm">小时发放积分</span>
              </div>
              <p className="text-xs text-muted-foreground">
                建议24小时（给风控系统留出检测时间）
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">排除项设置</p>
              <div className="space-y-2">
                <label className={`flex items-center gap-2 text-sm ${!isEditMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    checked={config.earnRule.excludeCoupon}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        earnRule: { ...config.earnRule, excludeCoupon: e.target.checked }
                      })
                    }
                    className="rounded"
                    disabled={!isEditMode}
                  />
                  优惠券抵扣金额不计入积分
                </label>
                <label className={`flex items-center gap-2 text-sm ${!isEditMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    checked={config.earnRule.excludeCommission}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        earnRule: { ...config.earnRule, excludeCommission: e.target.checked }
                      })
                    }
                    className="rounded"
                    disabled={!isEditMode}
                  />
                  平台佣金不计入积分
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 积分使用规则 */}
        <Card>
          <CardHeader>
            <CardTitle>积分使用规则</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="redeemRatio">积分兑换比例（汇率）</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="redeemRatio"
                    type="number"
                    step="0.01"
                    min="0"
                    value={config.redeemRule.redeemRatio}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        redeemRule: { ...config.redeemRule, redeemRatio: Number(e.target.value) }
                      })
                    }
                    className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm">积分 = 1 元</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  参考：京东 100:1，美团 100:1
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minRedeemPoints">最低使用门槛</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">至少</span>
                  <Input
                    id="minRedeemPoints"
                    type="number"
                    value={config.redeemRule.minRedeemPoints}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        redeemRule: { ...config.redeemRule, minRedeemPoints: Number(e.target.value) }
                      })
                    }
                    className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm">积分起用</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxRedeemPercent">单笔订单抵扣上限</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">最多抵扣订单金额的</span>
                <Input
                  id="maxRedeemPercent"
                  type="number"
                  value={config.redeemRule.maxRedeemPercent}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      redeemRule: { ...config.redeemRule, maxRedeemPercent: Number(e.target.value) }
                    })
                  }
                  className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                  disabled={!isEditMode}
                />
                <span className="text-sm">%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                建议20-30%（防止用户纯用积分白嫖）
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">示例计算</p>
              <p className="text-sm text-muted-foreground">
                订单金额：¥358 | 用户使用：500积分
                <br />
                可抵扣金额：500 ÷ {config.redeemRule.redeemRatio} = ¥{(500 / config.redeemRule.redeemRatio).toFixed(2)}
                <br />
                抵扣上限：358 × {config.redeemRule.maxRedeemPercent}% = ¥{(358 * config.redeemRule.maxRedeemPercent / 100).toFixed(2)}
                <br />
                实际抵扣：¥{Math.min(500 / config.redeemRule.redeemRatio, 358 * config.redeemRule.maxRedeemPercent / 100).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 积分有效期规则 */}
        <Card>
          <CardHeader>
            <CardTitle>积分有效期规则</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 基础有效期 */}
            <div className="space-y-2">
              <Label htmlFor="baseExpiryMonths">基础有效期</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">积分至少有效</span>
                <Input
                  id="baseExpiryMonths"
                  type="number"
                  value={config.expiryRule.baseExpiryMonths}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      expiryRule: { ...config.expiryRule, baseExpiryMonths: Number(e.target.value) }
                    })
                  }
                  className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                  disabled={!isEditMode}
                />
                <span className="text-sm">个月</span>
              </div>
              <p className="text-xs text-slate-500">
                保证用户获得的积分至少有12个月使用时间
              </p>
            </div>

            {/* 过期提醒天数 */}
            <div className="space-y-2">
              <Label htmlFor="reminderDays">过期提醒</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">到期前</span>
                <Input
                  id="reminderDays"
                  type="number"
                  value={config.expiryRule.reminderDays}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      expiryRule: { ...config.expiryRule, reminderDays: Number(e.target.value) }
                    })
                  }
                  className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                  disabled={!isEditMode}
                />
                <span className="text-sm">天提醒</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
