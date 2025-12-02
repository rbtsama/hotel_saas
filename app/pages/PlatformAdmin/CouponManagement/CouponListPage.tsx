/**
 * 平台后台 - 优惠券列表页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { Coupon } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Switch } from '~/components/ui/switch'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import CouponDialog from './components/CouponDialog'

interface CouponListPageProps {
  coupons: Coupon[]
  error: string | null
}

/**
 * 获取优惠券类型文本
 */
function getCouponTypeText(type: string): string {
  const map: Record<string, string> = {
    full_reduction: '满减券',
    discount: '折扣券',
    instant_reduction: '立减券',
  }
  return map[type] || type
}

/**
 * 获取优惠券类型颜色样式
 */
function getCouponTypeBadgeClass(type: string): string {
  const classMap: Record<string, string> = {
    full_reduction: 'bg-orange-50 text-orange-700 border-orange-300',
    discount: 'bg-green-50 text-green-700 border-green-300',
    instant_reduction: 'bg-blue-50 text-blue-700 border-blue-300',
  }
  return classMap[type] || 'border-slate-300 text-slate-700'
}

/**
 * 获取有效期描述
 */
function getValidDaysText(days: number): string {
  if (days === 0) return '永久'
  return `发放后${days}天`
}

export default function CouponListPage({ coupons, error }: CouponListPageProps) {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading' || navigation.state === 'submitting'

  // Dialog弹窗状态
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)

  // 打开编辑Dialog
  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setIsEditDialogOpen(true)
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
      <div className="p-6 space-y-6">
      {/* 创建优惠券Dialog */}
      <CouponDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        mode="create"
      />

      {/* 编辑优惠券Dialog */}
      <CouponDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        coupon={editingCoupon}
      />

      {/* 筛选器 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6">
          <Form method="get" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                name="search"
                placeholder="搜索优惠券名称或ID"
                className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />

              <Select name="type" defaultValue="all">
                <SelectTrigger className="h-9 border-slate-300">
                  <SelectValue placeholder="优惠券类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="full_reduction">满减券</SelectItem>
                  <SelectItem value="discount">折扣券</SelectItem>
                  <SelectItem value="instant_reduction">立减券</SelectItem>
                </SelectContent>
              </Select>

              <Select name="status" defaultValue="all">
                <SelectTrigger className="h-9 border-slate-300">
                  <SelectValue placeholder="状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="enabled">启用</SelectItem>
                  <SelectItem value="disabled">停用</SelectItem>
                </SelectContent>
              </Select>

              <Button type="submit" disabled={isLoading} className="h-9 bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? '搜索中...' : '搜索'}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* 优惠券列表 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">优惠券列表</CardTitle>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="h-9 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            创建优惠券
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="text-slate-600 font-semibold">优惠券ID</TableHead>
                  <TableHead className="text-slate-600 font-semibold">优惠券类型</TableHead>
                  <TableHead className="text-slate-600 font-semibold">优惠券名称</TableHead>
                  <TableHead className="text-slate-600 font-semibold">备注说明</TableHead>
                  <TableHead className="text-slate-600 font-semibold">有效期</TableHead>
                  <TableHead className="text-slate-600 font-semibold">费用承担</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">短信通知</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">状态</TableHead>
                  <TableHead className="text-slate-600 font-semibold">创建时间</TableHead>
                  <TableHead className="text-slate-600 font-semibold">创建人</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center text-slate-500 py-8">
                      暂无数据
                    </TableCell>
                  </TableRow>
                ) : (
                  coupons.map((coupon) => (
                    <TableRow key={coupon.id} className="hover:bg-slate-50 transition-colors">
                      <TableCell className="text-slate-900 font-medium">{coupon.id}</TableCell>
                      <TableCell>
                        <Badge className={`${getCouponTypeBadgeClass(coupon.type)} border`}>
                          {getCouponTypeText(coupon.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-900">{coupon.name}</TableCell>
                      <TableCell className="text-slate-600 text-sm max-w-[150px] truncate" title={coupon.remark || '-'}>
                        {coupon.remark || '-'}
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        {getValidDaysText(coupon.validDays)}
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        平台{coupon.platformRatio}% / 商户{coupon.merchantRatio}%
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={coupon.smsNotify ? "text-green-700" : "text-slate-600"}>
                          {coupon.smsNotify ? '是' : '否'}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Form method="post" action={`/platform-admin/coupon-management/toggle/${coupon.id}`}>
                          <Switch
                            checked={coupon.status === 'enabled'}
                            onCheckedChange={(checked) => {
                              const form = document.querySelector(`form[action="/platform-admin/coupon-management/toggle/${coupon.id}"]`) as HTMLFormElement
                              if (form) form.requestSubmit()
                            }}
                          />
                        </Form>
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">{coupon.createdAt}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{coupon.createdBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          {/* 编辑按钮 - 始终可点击 */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 border-slate-300"
                            onClick={() => handleEdit(coupon)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>

                          {/* 删除按钮 - 始终可点击，删除前检查是否有发放记录 */}
                          <Form
                            method="post"
                            action={`/platform-admin/coupon-management/delete/${coupon.id}`}
                            onSubmit={(e) => {
                              if (!confirm('确定要删除该优惠券吗？删除后不可恢复。')) {
                                e.preventDefault()
                              }
                            }}
                          >
                            <Button variant="outline" size="sm" className="h-7 px-2 border-red-300 text-red-700 hover:bg-red-50">
                              <Trash2 className="w-3 h-3" />
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
