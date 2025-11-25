/**
 * 门店礼赠配置页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { StoreBenefitsConfig, StoreBenefit } from './types/store-benefits.types'
import { BenefitApplicability } from './types/store-benefits.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'

interface StoreBenefitsPageProps {
  config: StoreBenefitsConfig
}

const applicabilityLabels = {
  [BenefitApplicability.ALL_MEMBERS]: '全部会员',
  [BenefitApplicability.VIP2_AND_ABOVE]: 'VIP2及以上',
}

export default function StoreBenefitsPage({ config }: StoreBenefitsPageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const [showDialog, setShowDialog] = useState(false)
  const [editingBenefit, setEditingBenefit] = useState<StoreBenefit | null>(null)

  const handleEdit = (benefit: StoreBenefit) => {
    setEditingBenefit(benefit)
    setShowDialog(true)
  }

  const handleCreate = () => {
    setEditingBenefit(null)
    setShowDialog(true)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
    setEditingBenefit(null)
  }

  const sortedBenefits = [...config.benefits].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <MainLayout>
      <div className="p-6 bg-slate-50">
        <div className="space-y-6 max-w-5xl">
            {/* 页面标题 */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">门店礼赠配置</h1>
              <p className="text-sm text-slate-500 mt-1">
                配置会员专享礼赠，提升会员体验和忠诚度
              </p>
            </div>

            {/* 礼赠列表 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>礼赠列表</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">共 {config.benefits.length} 项礼赠</p>
                  </div>
                  <Button onClick={handleCreate}>+ 添加礼赠</Button>
                </div>
              </CardHeader>
              <CardContent>
                {sortedBenefits.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    暂无礼赠配置，点击"添加礼赠"开始配置
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">排序</TableHead>
                        <TableHead>礼赠名称</TableHead>
                        <TableHead>适用条件</TableHead>
                        <TableHead>接待时间</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedBenefits.map((benefit) => (
                        <TableRow key={benefit.id}>
                          <TableCell className="text-center text-slate-500">{benefit.sortOrder}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{benefit.name}</div>
                              <div className="text-sm text-slate-500 mt-1">{benefit.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              benefit.applicability === BenefitApplicability.VIP2_AND_ABOVE
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {applicabilityLabels[benefit.applicability]}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-slate-900">{benefit.receptionTime}</TableCell>
                          <TableCell>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={benefit.enabled}
                                className="sr-only peer"
                                onChange={() => alert(`切换礼赠状态：${benefit.name}`)}
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(benefit)}>
                                编辑
                              </Button>
                              <Form method="post" className="inline">
                                <input type="hidden" name="_action" value="delete" />
                                <input type="hidden" name="benefitId" value={benefit.id} />
                                <Button
                                  type="submit"
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={(e) => {
                                    if (!confirm(`确定删除礼赠"${benefit.name}"吗？`)) {
                                      e.preventDefault()
                                    }
                                  }}
                                >
                                  删除
                                </Button>
                              </Form>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
        </div>

        {/* 编辑/新增礼赠弹窗 */}
        {showDialog && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>{editingBenefit ? '编辑礼赠' : '添加礼赠'}</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleCloseDialog}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Form method="post" className="space-y-4" onSubmit={handleCloseDialog}>
                  <input type="hidden" name="_action" value={editingBenefit ? 'update' : 'create'} />
                  {editingBenefit && <input type="hidden" name="benefitId" value={editingBenefit.id} />}

                  {/* 礼赠名称 */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      礼赠名称 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={editingBenefit?.name}
                      placeholder="如：免费自行车租借"
                      required
                    />
                  </div>

                  {/* 礼赠描述 */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      礼赠描述 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      defaultValue={editingBenefit?.description}
                      placeholder="如：提供免费自行车，方便客人骑行游览周边景点"
                      required
                    />
                  </div>

                  {/* 适用条件 */}
                  <div className="space-y-2">
                    <Label htmlFor="applicability">
                      适用条件 <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="applicability"
                      name="applicability"
                      defaultValue={editingBenefit?.applicability || BenefitApplicability.ALL_MEMBERS}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      required
                    >
                      <option value={BenefitApplicability.ALL_MEMBERS}>全部会员</option>
                      <option value={BenefitApplicability.VIP2_AND_ABOVE}>VIP2及以上</option>
                    </select>
                  </div>

                  {/* 使用说明 */}
                  <div className="space-y-2">
                    <Label htmlFor="usageNotes">
                      使用说明 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="usageNotes"
                      name="usageNotes"
                      defaultValue={editingBenefit?.usageNotes}
                      placeholder="如：每份包含：自行车适用2小时"
                      required
                    />
                  </div>

                  {/* 预订规则 */}
                  <div className="space-y-2">
                    <Label htmlFor="bookingRules">
                      预订规则 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bookingRules"
                      name="bookingRules"
                      defaultValue={editingBenefit?.bookingRules}
                      placeholder="如：无需提前预订"
                      required
                    />
                  </div>

                  {/* 规则说明 */}
                  <div className="space-y-2">
                    <Label htmlFor="policyNotes">
                      规则说明 <span className="text-red-500">*</span>
                    </Label>
                    <textarea
                      id="policyNotes"
                      name="policyNotes"
                      defaultValue={editingBenefit?.policyNotes}
                      placeholder="如：入住期间每房每日享一次，使用地点为酒店内"
                      className="w-full min-h-[80px] p-3 border border-slate-300 rounded-md resize-y"
                      required
                    />
                  </div>

                  {/* 接待时间 */}
                  <div className="space-y-2">
                    <Label htmlFor="receptionTime">
                      接待时间 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="receptionTime"
                      name="receptionTime"
                      defaultValue={editingBenefit?.receptionTime}
                      placeholder="如：00:00-23:59"
                      required
                    />
                  </div>

                  {/* 启用状态 */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="enabled"
                      name="enabled"
                      value="true"
                      defaultChecked={editingBenefit?.enabled ?? true}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="enabled" className="cursor-pointer">启用该礼赠</Label>
                  </div>

                  {/* 按钮 */}
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button type="button" variant="outline" onClick={handleCloseDialog}>取消</Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? '保存中...' : '保存'}
                    </Button>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
