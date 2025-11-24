/**
 * 平台后台 - 会员等级升级规则配置页面
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { MemberLevelUpgradeRule } from './types/member.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LearningModal from '~/pages/Architecture/ScenarioDesign/components/LearningModal'
import { useViewMode } from '~/contexts/ViewModeContext'
import { Edit, TrendingUp } from 'lucide-react'

interface UpgradeRulesPageProps {
  rules: MemberLevelUpgradeRule[]
}

export default function UpgradeRulesPage({ rules }: UpgradeRulesPageProps) {
  const { isLearningMode } = useViewMode()
  const [editingRule, setEditingRule] = useState<MemberLevelUpgradeRule | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    upgradeNights: 0,
    validityDays: 365,
    maintainNights: 0,
  })

  const handleEdit = (rule: MemberLevelUpgradeRule) => {
    setEditingRule(rule)
    setFormData({
      upgradeNights: rule.upgradeNights,
      validityDays: rule.validityDays,
      maintainNights: rule.maintainNights,
    })
    setEditDialogOpen(true)
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">会员等级升级与保级规则配置</h1>
            <p className="text-slate-600 mt-1">
              配置VIP0-VIP9的升级条件、会员有效期、保级条件
            </p>
          </div>
          <LearningModal title="会员等级升级规则 - 学习内容" isLearningMode={isLearningMode}>
            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold mb-2">核心概念</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li><strong>升级条件：</strong>用户累计总间夜数达到此标准即可升级</li>
                  <li><strong>会员有效期：</strong>升级后会员等级的有效期（从升级日起计算）</li>
                  <li><strong>保级条件：</strong>有效期内需完成的间夜数，否则降级</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">升级流程示例</h3>
                <div className="p-3 bg-slate-100 rounded-lg space-y-2 text-sm">
                  <p><strong>场景：</strong>用户当前VIP2，累计间夜29晚</p>
                  <ol className="list-decimal list-inside ml-2 space-y-1 text-slate-600">
                    <li>用户完成新订单，离店后增加1间夜</li>
                    <li>累计间夜数变为30晚</li>
                    <li>系统检测：30晚 ≥ VIP3升级条件（30晚）</li>
                    <li>自动升级至VIP3</li>
                    <li>设置有效期：2026-11-22（365天后）</li>
                    <li>重置保级间夜计数器 = 0</li>
                  </ol>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">保级/降级流程示例</h3>
                <div className="p-3 bg-slate-100 rounded-lg space-y-2 text-sm">
                  <p><strong>场景：</strong>用户VIP3有效期即将到期</p>
                  <ol className="list-decimal list-inside ml-2 space-y-1 text-slate-600">
                    <li>定时任务每日凌晨检查会员有效期</li>
                    <li>发现用户A的VIP3今日到期</li>
                    <li>检查保级间夜：12晚（需要15晚）</li>
                    <li>未达标 → 降级至VIP2</li>
                    <li>重新设置VIP2有效期</li>
                    <li>发送降级通知</li>
                  </ol>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">配置规则</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>升级条件必须递增：VIP9 &gt; VIP8 &gt; ... &gt; VIP1</li>
                  <li>保级条件 ≤ 升级条件</li>
                  <li>有效期建议为365天</li>
                  <li>修改后立即生效</li>
                </ul>
              </section>
            </div>
          </LearningModal>
        </div>

        {/* 说明卡片 */}
        <Card className="mb-6 border-blue-200 bg-blue-50 rounded-xl shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">升级与保级机制</p>
                <p>
                  升级条件基于<strong>累计总间夜数</strong>，保级条件基于<strong>有效期内间夜数</strong>。
                  设置合理的梯度可以激励用户持续消费,提升用户粘性。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 规则配置表格 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-slate-900">会员等级升级与保级规则</CardTitle>
            <CardDescription className="text-slate-600">
              配置VIP0-VIP9共10个等级的升级和保级规则
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-slate-600 font-semibold">等级</TableHead>
                  <TableHead className="text-slate-600 font-semibold">升级条件<br /><span className="text-xs text-slate-500">（累计间夜数）</span></TableHead>
                  <TableHead className="text-slate-600 font-semibold">会员有效期<br /><span className="text-xs text-slate-500">（天）</span></TableHead>
                  <TableHead className="text-slate-600 font-semibold">保级条件<br /><span className="text-xs text-slate-500">（有效期内间夜）</span></TableHead>
                  <TableHead className="text-slate-600 font-semibold">最后更新</TableHead>
                  <TableHead className="text-right text-slate-600 font-semibold">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium text-slate-900">{rule.levelName}</TableCell>
                    <TableCell>
                      {rule.level === 0 ? (
                        <span className="text-slate-400">-</span>
                      ) : (
                        <span className="font-semibold text-blue-600">{rule.upgradeNights}间夜</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {rule.level === 0 ? (
                        <span className="text-slate-400">-</span>
                      ) : (
                        <span className="text-slate-700">{rule.validityDays}天</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {rule.level === 0 ? (
                        <span className="text-slate-400">-</span>
                      ) : (
                        <span className="text-blue-600 font-semibold">{rule.maintainNights}间夜</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">{rule.updatedAt}</TableCell>
                    <TableCell className="text-right">
                      {rule.level !== 0 && (
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(rule)} className="hover:bg-slate-100">
                          <Edit className="w-4 h-4 mr-1" />
                          编辑
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 编辑弹窗 */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>编辑{editingRule?.levelName}等级规则</DialogTitle>
              <DialogDescription>
                配置该等级的升级条件、有效期和保级条件
              </DialogDescription>
            </DialogHeader>
            <Form method="post" onSubmit={() => setEditDialogOpen(false)}>
              <input type="hidden" name="_action" value="update_upgrade_rule" />
              <input type="hidden" name="level" value={editingRule?.level} />
              <div className="space-y-4 py-4">
                {/* 升级条件 */}
                <div className="space-y-2">
                  <Label htmlFor="upgradeNights">升级条件（累计间夜数）</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="upgradeNights"
                      name="upgradeNights"
                      type="number"
                      min="1"
                      max="999"
                      value={formData.upgradeNights}
                      onChange={(e) => setFormData({ ...formData, upgradeNights: parseInt(e.target.value) || 0 })}
                      className="max-w-xs h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <span className="text-sm text-slate-600">间夜</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    用户累计总间夜数达到此标准即可升级（范围：1-999）
                  </p>
                </div>

                {/* 会员有效期 */}
                <div className="space-y-2">
                  <Label htmlFor="validityDays">会员有效期</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="validityDays"
                      name="validityDays"
                      type="number"
                      min="30"
                      max="730"
                      value={formData.validityDays}
                      onChange={(e) => setFormData({ ...formData, validityDays: parseInt(e.target.value) || 365 })}
                      className="max-w-xs h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <span className="text-sm text-slate-600">天</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    升级后会员等级的有效期（范围：30-730天，建议365天）
                  </p>
                </div>

                {/* 保级条件 */}
                <div className="space-y-2">
                  <Label htmlFor="maintainNights">保级条件（有效期内间夜数）</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="maintainNights"
                      name="maintainNights"
                      type="number"
                      min="1"
                      max="999"
                      value={formData.maintainNights}
                      onChange={(e) => setFormData({ ...formData, maintainNights: parseInt(e.target.value) || 0 })}
                      className="max-w-xs h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <span className="text-sm text-slate-600">间夜</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    有效期内需完成的间夜数，否则降级（范围：1-999，必须 ≤ 升级条件）
                  </p>
                </div>

                {/* 校验提示 */}
                {formData.maintainNights > formData.upgradeNights && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-900">
                    ⚠️ 保级条件不能大于升级条件
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)} className="h-9">
                  取消
                </Button>
                <Button
                  type="submit"
                  disabled={formData.maintainNights > formData.upgradeNights}
                  className="h-9 bg-blue-600 hover:bg-blue-700"
                >
                  确定
                </Button>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
        </div>
      </div>
    </MainLayout>
  )
}
