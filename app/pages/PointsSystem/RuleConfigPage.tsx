/**
 * 积分规则配置页面
 * 展示和配置积分获取、消耗、有效期规则
 */

import { useState } from 'react'
import type { PointsRuleConfig } from './types/points.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import MainLayout from './components/MainLayout'

interface RuleConfigPageProps {
  config: PointsRuleConfig
  error?: string | null
}

const BusinessLogicPanel = ({ sections }: { sections: Array<{ title: string; content: React.ReactNode }> }) => (
  <div className="p-6 space-y-6 overflow-y-auto">
    <div>
      <h2 className="text-xl font-bold text-slate-900">业务逻辑说明</h2>
      <p className="text-sm text-slate-500 mt-1">
        后台配置如何影响前端用户体验
      </p>
    </div>
    {sections.map((section, index) => (
      <div key={index}>
        <h3 className="font-semibold mb-3">{section.title}</h3>
        {section.content}
      </div>
    ))}
  </div>
)

export default function RuleConfigPage({ config: initialConfig, error }: RuleConfigPageProps) {
  const [config, setConfig] = useState(initialConfig)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      alert('保存成功')
      setIsSaving(false)
    }, 1000)
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
      <div className="flex h-screen">
        <div className="w-[60%] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">积分规则配置</h1>
              <p className="text-sm text-slate-500 mt-1">
                配置积分获取、消耗、有效期规则
              </p>
            </div>

          {/* 积分获取规则 */}
          <Card>
            <CardHeader>
              <CardTitle>积分获取规则</CardTitle>
              <CardDescription>配置用户订单完成后如何获得积分</CardDescription>
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
                      className="w-24"
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
                      className="w-24"
                    />
                    <span className="text-sm">元起算</span>
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
                    className="w-24"
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
                  <label className="flex items-center gap-2 text-sm">
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
                    />
                    优惠券抵扣金额不计入积分
                  </label>
                  <label className="flex items-center gap-2 text-sm">
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
                    />
                    平台佣金不计入积分
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 积分消耗规则 */}
          <Card>
            <CardHeader>
              <CardTitle>积分消耗规则</CardTitle>
              <CardDescription>配置用户如何使用积分抵扣房费</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="redeemRatio">积分兑换比例</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="redeemRatio"
                      type="number"
                      value={config.redeemRule.redeemRatio}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          redeemRule: { ...config.redeemRule, redeemRatio: Number(e.target.value) }
                        })
                      }
                      className="w-24"
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
                      className="w-24"
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
                    className="w-24"
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
              <CardDescription>配置积分的过期时间和提醒</CardDescription>
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
                    className="w-24"
                  />
                  <span className="text-sm">个月</span>
                </div>
                <p className="text-xs text-slate-500">
                  保证用户获得的积分至少有12个月使用时间
                </p>
              </div>

              {/* 统一过期节点 */}
              <div className="space-y-2">
                <Label>统一过期节点</Label>
                <div className="mt-2 space-y-2">
                  {config.expiryRule.expiryNodes?.map((node, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded border">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{node.month}月{node.day}日</span>
                        <span className="text-xs text-slate-500">({node.label})</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-600">
                        删除
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  + 添加节点
                </Button>
                <p className="text-xs text-slate-500 mt-2">
                  当前设置：每年1月1日、7月1日统一过期
                </p>
              </div>

              {/* 计算规则说明 */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">📐 计算规则</p>
                <p className="text-sm text-slate-700">
                  过期日期 = 获得日期 + 基础有效期（{config.expiryRule.baseExpiryMonths}个月）+ 之后最近的过期节点
                </p>
              </div>

              {/* 示例计算 */}
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium mb-2">💡 示例计算</p>
                <div className="text-xs space-y-1 text-slate-700">
                  <div>24年3月28日获得 → 25年3月28日（+12个月）→ 25年7月1日过期（最近节点）</div>
                  <div>24年8月15日获得 → 25年8月15日（+12个月）→ 26年1月1日过期（最近节点）</div>
                  <div>24年12月20日获得 → 25年12月20日（+12个月）→ 26年1月1日过期（最近节点）</div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  ✅ 保证最低有效期12个月，实际有效期12-18个月
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
                    className="w-24"
                  />
                  <span className="text-sm">天提醒</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 操作按钮 */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              最后更新：{config.updatedAt} | 操作人：{config.updatedBy}
            </div>
            <Button onClick={handleSave} disabled={isSaving} size="lg">
              {isSaving ? '保存中...' : '保存配置'}
            </Button>
          </div>
          </div>
        </div>

        {/* 右侧：业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <BusinessLogicPanel
            sections={[
              {
                title: '📱 用户端体验',
                content: (
                  <>
                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面1：我的积分</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div className="text-2xl font-bold text-green-600">1258 积分</div>
                        <div className="text-slate-500">可抵扣¥12.58</div>
                      </div>
                    </div>

                  <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                    <p className="font-semibold text-sm mb-2">📱 页面2：积分明细</p>
                    <div className="text-xs space-y-1 text-slate-700">
                      <div>• 01/15 订单完成 +458积分</div>
                      <div>• 01/14 积分抵扣 -500积分</div>
                      <div>• 12/15 积分过期 -200积分</div>
                      <div className="text-slate-500">→ 后台配置的"有效期规则"决定何时过期</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                    <p className="font-semibold text-sm mb-2">📱 页面3：下单页-积分抵扣</p>
                    <div className="text-xs space-y-1 text-slate-700">
                      <div>房费：¥358</div>
                      <div>使用积分：<input className="border px-1 w-16 text-xs" placeholder="500" /> 积分</div>
                      <div>可抵扣：¥5（最多可抵¥107，您只用了500积分）</div>
                      <div>实付：<span className="text-red-600 font-bold">¥353</span></div>
                      <div className="text-slate-500">→ 后台配置的"抵扣上限30%"限制最多抵扣金额</div>
                      <div className="text-slate-500">→ 后台配置的"100积分=1元"决定兑换比例</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      • 后台设置"获取比例1:1" → 前端显示"消费¥100得100积分"
                      <br />
                      • 后台设置"抽佣5%" → 前端不显示（用户不关心）
                      <br />
                      • 后台设置"过期节点1/1、7/1" → 前端提醒"您的积分将于1月1日过期"
                      <br />
                      • 后台设置"抵扣上限30%" → 前端提示"最多可抵扣¥107"
                    </p>
                  </div>
                  </>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
