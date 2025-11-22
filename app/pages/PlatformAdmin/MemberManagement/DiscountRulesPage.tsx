/**
 * 平台后台 - 会员等级折扣规则配置页面
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { MemberLevelDiscountRule } from './types/member.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LearningModal from '~/pages/Architecture/ScenarioDesign/components/LearningModal'
import { useViewMode } from '~/contexts/ViewModeContext'
import { Edit, Percent } from 'lucide-react'

interface DiscountRulesPageProps {
  rules: MemberLevelDiscountRule[]
}

export default function DiscountRulesPage({ rules }: DiscountRulesPageProps) {
  const { isLearningMode } = useViewMode()
  const [editingRule, setEditingRule] = useState<MemberLevelDiscountRule | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    platformBaseDiscount: 1.0,
    merchantDiscountMin: 1.0,
    merchantDiscountMax: 1.0,
  })

  const handleEdit = (rule: MemberLevelDiscountRule) => {
    setEditingRule(rule)
    setFormData({
      platformBaseDiscount: rule.platformBaseDiscount,
      merchantDiscountMin: rule.merchantDiscountMin,
      merchantDiscountMax: rule.merchantDiscountMax,
    })
    setEditDialogOpen(true)
  }

  const formatDiscount = (discount: number) => {
    return discount === 1.0 ? '无折扣' : `${(discount * 10).toFixed(1)}折`
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">会员等级折扣规则配置</h1>
            <p className="text-slate-600 mt-1">
              配置各会员等级的平台基础折扣，以及商户可设置的折扣范围
            </p>
          </div>
          <LearningModal title="会员等级折扣规则 - 学习内容" isLearningMode={isLearningMode}>
            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold mb-2">折扣规则说明</h3>
                <p className="text-slate-600 mb-3">
                  平台设定基础折扣，商户可在允许范围内设置更优惠的折扣。这种机制平衡了平台控制力和商户灵活性。
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li><strong>平台基础折扣：</strong>该等级的默认折扣力度</li>
                  <li><strong>商户折扣范围：</strong>商户可设置的最低和最高折扣</li>
                  <li><strong>商户折扣最高 = 平台基础折扣</strong></li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">价格计算示例</h3>
                <div className="p-3 bg-slate-100 rounded-lg space-y-2 text-sm">
                  <p><strong>条件：</strong></p>
                  <ul className="list-disc list-inside ml-2 text-slate-600">
                    <li>VIP3平台基础折扣：9折</li>
                    <li>商户设置VIP3折扣：88折（在85折-9折范围内）</li>
                    <li>房型原价：¥500</li>
                  </ul>
                  <p className="mt-2"><strong>计算：</strong></p>
                  <p className="text-slate-600">
                    最终价格 = ¥500 × 0.88 = <span className="font-semibold text-primary">¥440</span>
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">配置规则</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>平台基础折扣必须递减：VIP9 &lt; VIP8 &lt; ... &lt; VIP1</li>
                  <li>商户折扣最高 = 平台基础折扣</li>
                  <li>商户折扣最低 ≤ 商户折扣最高</li>
                  <li>折扣范围：0.5-1.0（例如9折 = 0.9）</li>
                </ul>
              </section>
            </div>
          </LearningModal>
        </div>

        {/* 配置表格 */}
        <Card>
          <CardHeader>
            <CardTitle>会员等级折扣规则配置</CardTitle>
            <CardDescription>
              平台设定基础折扣，商户可在允许范围内设置更优惠的折扣
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>等级</TableHead>
                  <TableHead>平台基础折扣</TableHead>
                  <TableHead>商户折扣范围</TableHead>
                  <TableHead>价格示例（¥500房型）</TableHead>
                  <TableHead>最后更新</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => {
                  const examplePrice = rule.level === 0 ? 500 : (500 * rule.platformBaseDiscount).toFixed(0)
                  return (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.levelName}</TableCell>
                      <TableCell>
                        <span className="font-semibold text-primary">
                          {formatDiscount(rule.platformBaseDiscount)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {rule.level === 0 ? (
                          <span className="text-slate-400">-</span>
                        ) : (
                          <span className="text-sm text-slate-700">
                            {formatDiscount(rule.merchantDiscountMin)} ~ {formatDiscount(rule.merchantDiscountMax)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {rule.level === 0 ? (
                          <span className="text-slate-500">¥500（原价）</span>
                        ) : (
                          <span className="text-secondary font-semibold">¥{examplePrice}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">{rule.updatedAt}</TableCell>
                      <TableCell className="text-right">
                        {rule.level !== 0 && (
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(rule)}>
                            <Edit className="w-4 h-4 mr-1" />
                            编辑
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 编辑弹窗 */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>编辑{editingRule?.levelName}折扣规则</DialogTitle>
              <DialogDescription>
                配置平台基础折扣和商户折扣范围
              </DialogDescription>
            </DialogHeader>
            <Form method="post" onSubmit={() => setEditDialogOpen(false)}>
              <input type="hidden" name="_action" value="update_discount_rule" />
              <input type="hidden" name="level" value={editingRule?.level} />
              <div className="space-y-4 py-4">
                {/* 平台基础折扣 */}
                <div className="space-y-2">
                  <Label htmlFor="platformBaseDiscount">平台基础折扣</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="platformBaseDiscount"
                      name="platformBaseDiscount"
                      type="number"
                      min="0.5"
                      max="1.0"
                      step="0.01"
                      value={formData.platformBaseDiscount}
                      onChange={(e) =>
                        setFormData({ ...formData, platformBaseDiscount: parseFloat(e.target.value) || 1.0 })
                      }
                      className="max-w-xs"
                    />
                    <span className="text-sm text-slate-600">（例如：9折 = 0.9）</span>
                  </div>
                </div>

                {/* 商户折扣范围 */}
                <div className="space-y-2">
                  <Label>商户折扣范围</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      name="merchantDiscountMin"
                      type="number"
                      min="0.5"
                      max="1.0"
                      step="0.01"
                      value={formData.merchantDiscountMin}
                      onChange={(e) =>
                        setFormData({ ...formData, merchantDiscountMin: parseFloat(e.target.value) || 1.0 })
                      }
                      className="w-32"
                      placeholder="最低"
                    />
                    <span className="text-slate-600">~</span>
                    <Input
                      value={formData.platformBaseDiscount}
                      disabled
                      className="w-32"
                      placeholder="最高"
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    商户设置的折扣必须在此范围内，最高值自动等于平台基础折扣
                  </p>
                </div>

                {/* 实时预览 */}
                <div className="p-3 bg-slate-100 rounded-lg text-sm space-y-1">
                  <p className="font-semibold text-slate-700">实时预览（¥500房型）：</p>
                  <p className="text-slate-600">
                    平台基础价：¥{(500 * formData.platformBaseDiscount).toFixed(0)}
                  </p>
                  <p className="text-slate-600">
                    商户可设价格：¥{(500 * formData.merchantDiscountMin).toFixed(0)} ~ ¥
                    {(500 * formData.platformBaseDiscount).toFixed(0)}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                  取消
                </Button>
                <Button type="submit">确定</Button>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
        </div>
      </div>
    </MainLayout>
  )
}
