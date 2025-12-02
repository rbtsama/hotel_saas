/**
 * 场景发放配置页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { SceneDistribution, Coupon } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Switch } from '~/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '~/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Label } from '~/components/ui/label'
import { Edit } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface SceneDistributionPageProps {
  scenes: SceneDistribution[]
  enabledCoupons: Coupon[]
  error: string | null
}

export default function SceneDistributionPage({ scenes, enabledCoupons, error }: SceneDistributionPageProps) {
  const navigation = useNavigation()
  const [editingScene, setEditingScene] = useState<SceneDistribution | null>(null)
  const [selectedCouponId, setSelectedCouponId] = useState<string>('')
  const [smsNotify, setSmsNotify] = useState<boolean>(true)
  const [dialogOpen, setDialogOpen] = useState(false)

  const isSubmitting = navigation.state === 'submitting'

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            错误: {error}
          </div>
        </div>
      </MainLayout>
    )
  }

  const handleEditClick = (scene: SceneDistribution) => {
    // 编辑功能独立，不受启用状态限制
    setEditingScene(scene)
    setSelectedCouponId(scene.couponId || '')
    setSmsNotify(scene.smsNotify)
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingScene(null)
    setSelectedCouponId('')
    setSmsNotify(true)
  }

  // 获取优惠券显示文本
  const getCouponDisplayText = (couponId: string | null, couponName: string | null) => {
    if (!couponId) return '未配置'
    return `${couponId}（${couponName || '未命名'}）`
  }

  return (
    <MainLayout>
      <div className="p-6">
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">自动发放</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="text-slate-600 font-semibold">场景名称</TableHead>
                  <TableHead className="text-slate-600 font-semibold">触发时机</TableHead>
                  <TableHead className="text-slate-600 font-semibold">选择派发优惠券</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">短信通知</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenes.map((scene) => (
                  <TableRow key={scene.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="text-slate-900 font-medium">{scene.sceneName}</TableCell>
                    <TableCell className="text-slate-700">{scene.triggerDescription}</TableCell>
                    <TableCell className="text-slate-700">
                      {getCouponDisplayText(scene.couponId, scene.couponName)}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={scene.smsNotify ? "text-green-700" : "text-slate-600"}>
                        {scene.smsNotify ? '是' : '否'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        {/* 编辑按钮 - 始终可用 */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 border-slate-300"
                          onClick={() => handleEditClick(scene)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          编辑
                        </Button>

                        {/* 启用/停用按钮 */}
                        <Form method="post">
                          <input type="hidden" name="sceneId" value={scene.id} />
                          <input type="hidden" name="_action" value="toggle" />
                          <Button
                            type="submit"
                            variant="outline"
                            size="sm"
                            disabled={!scene.couponId || isSubmitting}
                            className={`h-7 px-2 ${
                              scene.status === 'enabled'
                                ? 'border-orange-300 text-orange-700 hover:bg-orange-50'
                                : 'border-green-300 text-green-700 hover:bg-green-50'
                            }`}
                            title={!scene.couponId ? '请先选择优惠券' : ''}
                          >
                            {scene.status === 'enabled' ? '停用' : '启用'}
                          </Button>
                        </Form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 编辑对话框 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>编辑场景配置</DialogTitle>
          </DialogHeader>
          <Form method="post" onSubmit={handleDialogClose}>
            <input type="hidden" name="sceneId" value={editingScene?.id} />
            <input type="hidden" name="_action" value="update" />

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>场景名称</Label>
                <div className="text-sm text-slate-700 font-medium">
                  {editingScene?.sceneName}
                </div>
              </div>

              <div className="space-y-2">
                <Label>触发时机</Label>
                <div className="text-sm text-slate-600">
                  {editingScene?.triggerDescription}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="couponId">选择派发优惠券 *</Label>
                <Select
                  name="couponId"
                  value={selectedCouponId}
                  onValueChange={setSelectedCouponId}
                  required
                >
                  <SelectTrigger className="h-9 border-slate-300">
                    <SelectValue placeholder="选择优惠券" />
                  </SelectTrigger>
                  <SelectContent>
                    {enabledCoupons.map((coupon) => (
                      <SelectItem key={coupon.id} value={coupon.id}>
                        {coupon.id}（{coupon.name}）
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="smsNotify">短信通知</Label>
                <Switch
                  id="smsNotify"
                  name="smsNotify"
                  checked={smsNotify}
                  onCheckedChange={setSmsNotify}
                />
                <input type="hidden" name="smsNotify" value={smsNotify ? 'true' : 'false'} />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleDialogClose}
                className="h-9 border-slate-300"
              >
                取消
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !selectedCouponId}
                className="h-9 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? '保存中...' : '保存'}
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
      </div>
    </MainLayout>
  )
}
