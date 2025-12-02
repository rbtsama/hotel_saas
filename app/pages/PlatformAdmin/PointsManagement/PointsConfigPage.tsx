/**
 * 平台后台 - 积分管理配置页面（3个Card：基础规则、奖励服务、换购服务）
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { PointsBaseRule, PointsRewardItem, PointsExchangeItem } from './types/valueAddedService.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Input } from '~/components/ui/input'
import { Plus, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import ServiceItemDialog from './components/ServiceItemDialog'

interface PointsConfigPageProps {
  baseRule: PointsBaseRule
  rewardServices: PointsRewardItem[]
  exchangeServices: PointsExchangeItem[]
  error: string | null
}

export default function PointsConfigPage({
  baseRule,
  rewardServices,
  exchangeServices,
  error,
}: PointsConfigPageProps) {
  // 基础规则编辑状态
  const [isEditingBaseRule, setIsEditingBaseRule] = useState(false)
  const [baseRuleForm, setBaseRuleForm] = useState({
    registerReward: baseRule.registerReward,
    inviterReward: baseRule.inviterReward,
    exchangeRate: baseRule.exchangeRate,
    maxDeductionRatio: baseRule.maxDeductionRatio,
    validityMonths: baseRule.validityMonths,
    vip0: baseRule.vipMultipliers['VIP0'] || 1.0,
    vip1: baseRule.vipMultipliers['VIP1'] || 1.2,
    vip2: baseRule.vipMultipliers['VIP2'] || 1.4,
    vip3: baseRule.vipMultipliers['VIP3'] || 1.6,
    vip4: baseRule.vipMultipliers['VIP4'] || 1.8,
    vip5: baseRule.vipMultipliers['VIP5'] || 2.0,
    vip6: baseRule.vipMultipliers['VIP6'] || 2.3,
    vip7: baseRule.vipMultipliers['VIP7'] || 2.6,
    vip8: baseRule.vipMultipliers['VIP8'] || 2.9,
    vip9: baseRule.vipMultipliers['VIP9'] || 3.2,
  })

  // 服务Dialog状态
  const [isRewardCreateDialogOpen, setIsRewardCreateDialogOpen] = useState(false)
  const [isRewardEditDialogOpen, setIsRewardEditDialogOpen] = useState(false)
  const [editingRewardItem, setEditingRewardItem] = useState<PointsRewardItem | null>(null)

  const [isExchangeCreateDialogOpen, setIsExchangeCreateDialogOpen] = useState(false)
  const [isExchangeEditDialogOpen, setIsExchangeEditDialogOpen] = useState(false)
  const [editingExchangeItem, setEditingExchangeItem] = useState<PointsExchangeItem | null>(null)

  // 编辑奖励
  const handleEditReward = (item: PointsRewardItem) => {
    setEditingRewardItem(item)
    setIsRewardEditDialogOpen(true)
  }

  // 编辑换购
  const handleEditExchange = (item: PointsExchangeItem) => {
    setEditingExchangeItem(item)
    setIsExchangeEditDialogOpen(true)
  }

  // 删除奖励
  const handleDeleteReward = (id: string) => {
    if (confirm('确认删除该积分奖励服务？')) {
      document.getElementById(`delete-reward-${id}`)?.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      )
    }
  }

  // 删除换购
  const handleDeleteExchange = (id: string) => {
    if (confirm('确认删除该积分换购服务？')) {
      document.getElementById(`delete-exchange-${id}`)?.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      )
    }
  }

  // 上移/下移 - 奖励
  const handleMoveReward = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === rewardServices.length - 1) return

    const newList = [...rewardServices]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]]

    const ids = newList.map((item) => item.id)
    const form = document.getElementById('reorder-reward-form') as HTMLFormElement
    if (form) {
      const input = form.querySelector('input[name="ids"]') as HTMLInputElement
      if (input) {
        input.value = JSON.stringify(ids)
        form.requestSubmit()
      }
    }
  }

  // 上移/下移 - 换购
  const handleMoveExchange = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === exchangeServices.length - 1) return

    const newList = [...exchangeServices]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]]

    const ids = newList.map((item) => item.id)
    const form = document.getElementById('reorder-exchange-form') as HTMLFormElement
    if (form) {
      const input = form.querySelector('input[name="ids"]') as HTMLInputElement
      if (input) {
        input.value = JSON.stringify(ids)
        form.requestSubmit()
      }
    }
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            错误: {error}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6 overflow-y-auto h-full">
        {/* 服务Dialog */}
        <ServiceItemDialog
          open={isRewardCreateDialogOpen}
          onOpenChange={setIsRewardCreateDialogOpen}
          mode="create"
          type="reward"
        />
        <ServiceItemDialog
          open={isRewardEditDialogOpen}
          onOpenChange={setIsRewardEditDialogOpen}
          mode="edit"
          type="reward"
          item={editingRewardItem}
        />
        <ServiceItemDialog
          open={isExchangeCreateDialogOpen}
          onOpenChange={setIsExchangeCreateDialogOpen}
          mode="create"
          type="exchange"
        />
        <ServiceItemDialog
          open={isExchangeEditDialogOpen}
          onOpenChange={setIsExchangeEditDialogOpen}
          mode="edit"
          type="exchange"
          item={editingExchangeItem}
        />

        {/* 隐藏的重排序表单 */}
        <Form method="post" action="/platform-admin/points-management/config" id="reorder-reward-form" style={{ display: 'none' }}>
          <input type="hidden" name="action" value="reorder-reward" />
          <input type="hidden" name="ids" value="[]" />
        </Form>
        <Form method="post" action="/platform-admin/points-management/config" id="reorder-exchange-form" style={{ display: 'none' }}>
          <input type="hidden" name="action" value="reorder-exchange" />
          <input type="hidden" name="ids" value="[]" />
        </Form>

        {/* Card 1: 基础规则配置 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900">积分基础规则</CardTitle>
            {!isEditingBaseRule ? (
              <Button
                onClick={() => setIsEditingBaseRule(true)}
                className="h-9 bg-blue-600 hover:bg-blue-700"
              >
                编辑
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  form="base-rule-form"
                  className="h-9 bg-blue-600 hover:bg-blue-700"
                >
                  保存
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 border-slate-300"
                  onClick={() => {
                    setIsEditingBaseRule(false)
                    setBaseRuleForm({
                      registerReward: baseRule.registerReward,
                      inviterReward: baseRule.inviterReward,
                      exchangeRate: baseRule.exchangeRate,
                      maxDeductionRatio: baseRule.maxDeductionRatio,
                      validityMonths: baseRule.validityMonths,
                      vip0: baseRule.vipMultipliers['VIP0'] || 1.0,
                      vip1: baseRule.vipMultipliers['VIP1'] || 1.2,
                      vip2: baseRule.vipMultipliers['VIP2'] || 1.4,
                      vip3: baseRule.vipMultipliers['VIP3'] || 1.6,
                      vip4: baseRule.vipMultipliers['VIP4'] || 1.8,
                      vip5: baseRule.vipMultipliers['VIP5'] || 2.0,
                      vip6: baseRule.vipMultipliers['VIP6'] || 2.3,
                      vip7: baseRule.vipMultipliers['VIP7'] || 2.6,
                      vip8: baseRule.vipMultipliers['VIP8'] || 2.9,
                      vip9: baseRule.vipMultipliers['VIP9'] || 3.2,
                    })
                  }}
                >
                  取消
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Form method="post" action="/platform-admin/points-management/config" className="space-y-6" id="base-rule-form">
              <input type="hidden" name="action" value="update-base-rule" />

              {/* 第一行：注册奖励、邀请人奖励 */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">注册奖励</label>
                  {isEditingBaseRule ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        name="registerReward"
                        value={baseRuleForm.registerReward}
                        onChange={(e) => setBaseRuleForm({ ...baseRuleForm, registerReward: parseInt(e.target.value) || 0 })}
                        className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        min="0"
                      />
                      <span className="text-sm text-slate-600 whitespace-nowrap">积分</span>
                    </div>
                  ) : (
                    <div className="h-9 flex items-center">
                      <span className="font-semibold text-slate-900">{baseRule.registerReward} 积分</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">邀请人奖励</label>
                  {isEditingBaseRule ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        name="inviterReward"
                        value={baseRuleForm.inviterReward}
                        onChange={(e) => setBaseRuleForm({ ...baseRuleForm, inviterReward: parseInt(e.target.value) || 0 })}
                        className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        min="0"
                      />
                      <span className="text-sm text-slate-600 whitespace-nowrap">积分</span>
                    </div>
                  ) : (
                    <div className="h-9 flex items-center">
                      <span className="font-semibold text-slate-900">{baseRule.inviterReward} 积分</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 第二行：积分兑换汇率、最大抵扣比例、积分有效期 */}
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">积分兑换汇率</label>
                  {isEditingBaseRule ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        name="exchangeRate"
                        value={baseRuleForm.exchangeRate}
                        onChange={(e) => setBaseRuleForm({ ...baseRuleForm, exchangeRate: parseInt(e.target.value) || 0 })}
                        className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        min="1"
                      />
                      <span className="text-sm text-slate-600 whitespace-nowrap">积分=1元</span>
                    </div>
                  ) : (
                    <div className="h-9 flex items-center">
                      <span className="font-semibold text-slate-900">{baseRule.exchangeRate} 积分 = 1元</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">最大抵扣比例</label>
                  {isEditingBaseRule ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        name="maxDeductionRatio"
                        value={baseRuleForm.maxDeductionRatio}
                        onChange={(e) => setBaseRuleForm({ ...baseRuleForm, maxDeductionRatio: parseInt(e.target.value) || 0 })}
                        className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        min="0"
                        max="100"
                      />
                      <span className="text-sm text-slate-600">%</span>
                    </div>
                  ) : (
                    <div className="h-9 flex items-center">
                      <span className="font-semibold text-slate-900">{baseRule.maxDeductionRatio}%</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">积分有效期</label>
                  {isEditingBaseRule ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        name="validityMonths"
                        value={baseRuleForm.validityMonths}
                        onChange={(e) => setBaseRuleForm({ ...baseRuleForm, validityMonths: parseInt(e.target.value) || 0 })}
                        className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        min="1"
                      />
                      <span className="text-sm text-slate-600">月</span>
                    </div>
                  ) : (
                    <div className="h-9 flex items-center">
                      <span className="font-semibold text-slate-900">{baseRule.validityMonths} 个月</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 第三行：入住返还倍数 */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <label className="text-sm font-medium text-slate-600">入住返还倍数</label>
                <div className="grid grid-cols-10 gap-3">
                  {['vip0', 'vip1', 'vip2', 'vip3', 'vip4', 'vip5', 'vip6', 'vip7', 'vip8', 'vip9'].map((key, idx) => (
                    <div key={key} className="space-y-1.5">
                      <div className="text-xs text-slate-600 text-center">VIP{idx}</div>
                      {isEditingBaseRule ? (
                        <Input
                          type="number"
                          name={key}
                          value={baseRuleForm[key as keyof typeof baseRuleForm]}
                          onChange={(e) => setBaseRuleForm({ ...baseRuleForm, [key]: parseFloat(e.target.value) || 1.0 })}
                          className="h-8 text-xs text-center border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                          step="0.1"
                          min="1"
                        />
                      ) : (
                        <div className="h-8 flex items-center justify-center">
                          <span className="font-semibold text-slate-900">{baseRule.vipMultipliers[`VIP${idx}`]?.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>

        {/* Card 2: 积分奖励服务 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900">积分奖励服务</CardTitle>
            <Button
              onClick={() => setIsRewardCreateDialogOpen(true)}
              className="h-9 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              新增
            </Button>
          </CardHeader>
          <CardContent>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 bg-slate-50">
                    <TableHead className="text-slate-900 font-semibold w-[80px]">序号</TableHead>
                    <TableHead className="text-slate-900 font-semibold">服务内容</TableHead>
                    <TableHead className="text-slate-900 font-semibold w-[120px]">奖励积分</TableHead>
                    <TableHead className="text-slate-900 font-semibold text-center w-[280px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewardServices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                        暂无数据
                      </TableCell>
                    </TableRow>
                  ) : (
                    rewardServices.map((item, index) => (
                      <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="text-slate-900">{item.序号}</TableCell>
                        <TableCell className="text-slate-900 font-medium">{item.serviceName}</TableCell>
                        <TableCell className="text-slate-900 font-semibold">{item.pointsReward}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2 border-slate-300"
                              disabled={index === 0}
                              onClick={() => handleMoveReward(index, 'up')}
                            >
                              <ChevronUp className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2 border-slate-300"
                              disabled={index === rewardServices.length - 1}
                              onClick={() => handleMoveReward(index, 'down')}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-3 border-slate-300"
                              onClick={() => handleEditReward(item)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              编辑
                            </Button>

                            <Form
                              method="post"
                              action="/platform-admin/points-management/config"
                              id={`delete-reward-${item.id}`}
                            >
                              <input type="hidden" name="action" value="delete-reward" />
                              <input type="hidden" name="id" value={item.id} />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-7 px-3 border-red-300 text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteReward(item.id)}
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                删除
                              </Button>
                            </Form>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: 积分换购服务 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900">积分换购服务</CardTitle>
            <Button
              onClick={() => setIsExchangeCreateDialogOpen(true)}
              className="h-9 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              新增
            </Button>
          </CardHeader>
          <CardContent>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 bg-slate-50">
                    <TableHead className="text-slate-900 font-semibold w-[80px]">序号</TableHead>
                    <TableHead className="text-slate-900 font-semibold">服务内容</TableHead>
                    <TableHead className="text-slate-900 font-semibold w-[120px]">消耗积分</TableHead>
                    <TableHead className="text-slate-900 font-semibold text-center w-[340px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exchangeServices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                        暂无数据
                      </TableCell>
                    </TableRow>
                  ) : (
                    exchangeServices.map((item, index) => (
                      <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="text-slate-900">{item.序号}</TableCell>
                        <TableCell className="text-slate-900 font-medium">{item.serviceName}</TableCell>
                        <TableCell className="text-slate-900 font-semibold">{item.pointsCost}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2 border-slate-300"
                              disabled={index === 0}
                              onClick={() => handleMoveExchange(index, 'up')}
                            >
                              <ChevronUp className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2 border-slate-300"
                              disabled={index === exchangeServices.length - 1}
                              onClick={() => handleMoveExchange(index, 'down')}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-3 border-slate-300"
                              onClick={() => handleEditExchange(item)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              编辑
                            </Button>

                            <Form
                              method="post"
                              action="/platform-admin/points-management/config"
                              id={`delete-exchange-${item.id}`}
                            >
                              <input type="hidden" name="action" value="delete-exchange" />
                              <input type="hidden" name="id" value={item.id} />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-7 px-3 border-red-300 text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteExchange(item.id)}
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                删除
                              </Button>
                            </Form>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
