/**
 * 商户端 - VIP等级折扣策略配置页面
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { VIPLevelDiscount, MerchantVIPDiscountConfig } from './types/vipDiscount.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Checkbox } from '~/components/ui/checkbox'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { Edit } from 'lucide-react'

interface VIPDiscountConfigPageProps {
  config: MerchantVIPDiscountConfig
}

export default function VIPDiscountConfigPage({ config }: VIPDiscountConfigPageProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingDiscount, setEditingDiscount] = useState<VIPLevelDiscount | null>(null)
  const [formData, setFormData] = useState({
    storeDiscount: 1.0,
    weekdayExtraDiscount: 0,
    weekendExtraDiscount: 0,
    weekdayEnabled: false,
    weekendEnabled: false,
    holidayAllowed: true,
  })

  const handleEdit = (discount: VIPLevelDiscount) => {
    setEditingDiscount(discount)
    setFormData({
      storeDiscount: discount.storeDiscount,
      weekdayExtraDiscount: discount.weekdayExtraDiscount || 0,
      weekendExtraDiscount: discount.weekendExtraDiscount || 0,
      weekdayEnabled: !!discount.weekdayExtraDiscount,
      weekendEnabled: !!discount.weekendExtraDiscount,
      holidayAllowed: discount.holidayAllowed,
    })
    setEditDialogOpen(true)
  }

  const formatDiscount = (val: number) => val === 1.0 ? '无' : `${(val * 10).toFixed(1)}折`

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">会员折扣策略配置</h1>
            <p className="text-slate-600 mt-1">
              在平台允许的范围内，设置各会员等级的折扣，以及平日/周末/节假日的差异化折扣
            </p>
          </div>

          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6 text-sm text-blue-900">
              <p><strong>说明：</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>本店折扣：</strong>必须在平台限制范围内</li>
                <li><strong>平日额外：</strong>在本店折扣基础上再打折（吸引平日客流）</li>
                <li><strong>周末额外：</strong>周末是否给予额外折扣</li>
                <li><strong>节假日：</strong>节假日是否允许使用VIP折扣</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>VIP等级折扣配置</CardTitle>
              <CardDescription>配置{config.storeName}的VIP会员折扣策略</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>等级</TableHead>
                    <TableHead>平台限制范围</TableHead>
                    <TableHead>本店折扣</TableHead>
                    <TableHead>平日额外</TableHead>
                    <TableHead>周末额外</TableHead>
                    <TableHead>节假日</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {config.discounts.map((discount) => (
                    <TableRow key={discount.id}>
                      <TableCell className="font-medium">{discount.levelName}</TableCell>
                      <TableCell>
                        {discount.level === 0 ? (
                          <span className="text-slate-400">无</span>
                        ) : (
                          <span className="text-sm text-slate-600">
                            {formatDiscount(discount.platformMinDiscount)} ~ {formatDiscount(discount.platformMaxDiscount)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-primary">
                          {formatDiscount(discount.storeDiscount)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-700">
                          {discount.weekdayExtraDiscount ? `再${formatDiscount(discount.weekdayExtraDiscount)}` : '无'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-700">
                          {discount.weekendExtraDiscount ? `再${formatDiscount(discount.weekendExtraDiscount)}` : '无'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {discount.holidayAllowed ? '可用' : '不可用'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {discount.level !== 0 && (
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(discount)}>
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
                <DialogTitle>编辑{editingDiscount?.levelName}折扣策略</DialogTitle>
                <DialogDescription>
                  配置该等级的折扣策略和时段规则
                </DialogDescription>
              </DialogHeader>
              <Form method="post" onSubmit={() => setEditDialogOpen(false)}>
                <input type="hidden" name="_action" value="update_discount" />
                <input type="hidden" name="level" value={editingDiscount?.level} />
                <div className="space-y-4 py-4">
                  <div className="p-3 bg-slate-100 rounded-lg text-sm text-slate-700">
                    平台限制范围：{formatDiscount(editingDiscount?.platformMinDiscount || 1)} ~ {formatDiscount(editingDiscount?.platformMaxDiscount || 1)}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storeDiscount">本店折扣</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="storeDiscount"
                        name="storeDiscount"
                        type="number"
                        min={editingDiscount?.platformMinDiscount}
                        max={editingDiscount?.platformMaxDiscount}
                        step="0.01"
                        value={formData.storeDiscount}
                        onChange={(e) => setFormData({ ...formData, storeDiscount: parseFloat(e.target.value) || 1 })}
                      />
                      <span className="text-sm text-slate-600">（例如：88折 = 0.88）</span>
                    </div>
                    <p className="text-xs text-slate-500">必须在平台范围内</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="weekdayEnabled"
                        checked={formData.weekdayEnabled}
                        onCheckedChange={(checked) => setFormData({ ...formData, weekdayEnabled: !!checked })}
                      />
                      <Label htmlFor="weekdayEnabled">启用平日额外折扣</Label>
                    </div>
                    {formData.weekdayEnabled && (
                      <Input
                        name="weekdayExtraDiscount"
                        type="number"
                        min="0.5"
                        max="1.0"
                        step="0.01"
                        value={formData.weekdayExtraDiscount}
                        onChange={(e) => setFormData({ ...formData, weekdayExtraDiscount: parseFloat(e.target.value) || 1 })}
                        placeholder="在本店折扣基础上再打折"
                      />
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="weekendEnabled"
                        checked={formData.weekendEnabled}
                        onCheckedChange={(checked) => setFormData({ ...formData, weekendEnabled: !!checked })}
                      />
                      <Label htmlFor="weekendEnabled">启用周末额外折扣</Label>
                    </div>
                    {formData.weekendEnabled && (
                      <Input
                        name="weekendExtraDiscount"
                        type="number"
                        min="0.5"
                        max="1.0"
                        step="0.01"
                        value={formData.weekendExtraDiscount}
                        onChange={(e) => setFormData({ ...formData, weekendExtraDiscount: parseFloat(e.target.value) || 1 })}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>节假日折扣</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="holidayAllowed"
                          checked={formData.holidayAllowed}
                          onCheckedChange={(checked) => setFormData({ ...formData, holidayAllowed: !!checked })}
                        />
                        <Label htmlFor="holidayAllowed">允许节假日使用VIP折扣</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>取消</Button>
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
