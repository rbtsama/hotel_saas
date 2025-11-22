/**
 * 平台后台 - 会员等级积分汇率配置页面
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { MemberLevelPointsRate } from './types/points.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LearningModal from '~/pages/Architecture/ScenarioDesign/components/LearningModal'
import { useViewMode } from '~/contexts/ViewModeContext'
import { Edit } from 'lucide-react'

interface MemberLevelRatesPageProps {
  rates: MemberLevelPointsRate[]
}

export default function MemberLevelRatesPage({ rates }: MemberLevelRatesPageProps) {
  const { isLearningMode } = useViewMode()
  const [editingRate, setEditingRate] = useState<MemberLevelPointsRate | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [rateValue, setRateValue] = useState(1.0)

  const handleEdit = (rate: MemberLevelPointsRate) => {
    setEditingRate(rate)
    setRateValue(rate.rateMultiplier)
    setEditDialogOpen(true)
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-6xl mx-auto p-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">会员等级积分汇率配置</h1>
            <p className="text-slate-600 mt-1">
              配置不同会员等级的积分使用汇率，等级越高，积分价值越大
            </p>
          </div>
          <LearningModal title="会员等级积分汇率 - 学习内容" isLearningMode={isLearningMode}>
            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold mb-2">什么是积分汇率倍数？</h3>
                <p className="text-slate-600">
                  积分汇率倍数决定会员使用积分抵扣现金的实际价值。基础汇率由"积分基础规则"设定，
                  不同会员等级享有不同的倍数加成。
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">计算示例</h3>
                <div className="p-3 bg-slate-100 rounded-lg space-y-2 text-sm">
                  <p><strong>前提条件：</strong></p>
                  <ul className="list-disc list-inside ml-2 text-slate-600">
                    <li>基础兑换汇率：1积分 = 1元</li>
                    <li>VIP3汇率倍数：1.2倍</li>
                  </ul>
                  <p className="mt-2"><strong>计算过程：</strong></p>
                  <p className="text-slate-600">
                    VIP3用户使用50积分抵扣 = 50积分 × 1元 × 1.2倍 = <span className="font-semibold text-primary">¥60</span>
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">配置规则</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>汇率倍数范围：1.0-3.0倍</li>
                  <li>必须保持递增：VIP9 &gt; VIP8 &gt; ... &gt; VIP0</li>
                  <li>修改后立即生效</li>
                  <li>仅影响新订单，历史订单不变</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">业务影响</h3>
                <p className="text-slate-600 mb-2">
                  设置合理的汇率梯度可以：
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>激励用户升级会员等级</li>
                  <li>提升高等级会员的忠诚度</li>
                  <li>增加用户消费频次</li>
                  <li>平衡积分成本和用户价值</li>
                </ol>
              </section>
            </div>
          </LearningModal>
        </div>

        {/* 说明卡片 */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900">
              <strong>提示：</strong>
              积分汇率决定会员使用积分抵扣现金的实际价值。例如：VIP3汇率为1.2倍，使用50积分可抵扣60元。
              设置时请确保等级越高，汇率越高。
            </p>
          </CardContent>
        </Card>

        {/* 汇率配置表格 */}
        <Card>
          <CardHeader>
            <CardTitle>会员等级积分汇率配置</CardTitle>
            <CardDescription>
              配置VIP0-VIP9共10个等级的积分汇率倍数
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>会员等级</TableHead>
                  <TableHead>积分汇率倍数</TableHead>
                  <TableHead>最后更新时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rates.map((rate) => {
                  return (
                    <TableRow key={rate.id}>
                      <TableCell className="font-medium">{rate.levelName}</TableCell>
                      <TableCell>
                        <span className="text-lg font-semibold text-primary">
                          {rate.rateMultiplier.toFixed(1)}倍
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">
                        {rate.updatedAt}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(rate)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          编辑
                        </Button>
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>编辑{editingRate?.levelName}积分汇率</DialogTitle>
              <DialogDescription>
                修改该等级的积分使用汇率倍数（范围：1.0-3.0）
              </DialogDescription>
            </DialogHeader>
            <Form method="post" onSubmit={() => setEditDialogOpen(false)}>
              <input type="hidden" name="_action" value="update_level_rate" />
              <input type="hidden" name="level" value={editingRate?.level} />
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="rateMultiplier">当前汇率倍数</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="rateMultiplier"
                      name="rateMultiplier"
                      type="number"
                      min="1.0"
                      max="3.0"
                      step="0.1"
                      value={rateValue}
                      onChange={(e) => setRateValue(parseFloat(e.target.value) || 1.0)}
                      className="max-w-xs"
                    />
                    <span className="text-sm text-slate-600">倍</span>
                  </div>
                  <p className="text-sm text-slate-500">
                    范围：1.0-3.0，保留1位小数
                  </p>
                </div>

                <div className="p-3 bg-slate-100 rounded-lg text-sm">
                  <p className="text-slate-700 mb-1">
                    <strong>实时预览：</strong>
                  </p>
                  <p className="text-slate-600">
                    该等级用户使用50积分可抵扣：
                    <span className="font-semibold text-primary ml-2">
                      ¥{(50 * 1.0 * rateValue).toFixed(0)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                >
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
