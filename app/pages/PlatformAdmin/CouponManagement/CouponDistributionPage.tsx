/**
 * 优惠券发放页面 - 统一手动发放和自动发放
 */

import { useState } from 'react'
import { Form, Link, useNavigation } from '@remix-run/react'
import type { Coupon, VipLevel, SceneDistribution } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Textarea } from '~/components/ui/textarea'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Checkbox } from '~/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '~/components/ui/dialog'
import { Send, Edit, FileText } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface CouponDistributionPageProps {
  enabledCoupons: Coupon[]
  vipLevels: VipLevel[]
  scenes: SceneDistribution[]
  error: string | null
}

export default function CouponDistributionPage({
  enabledCoupons,
  vipLevels,
  scenes,
  error,
}: CouponDistributionPageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  // 手动发放 - 按手机号
  const [phoneText, setPhoneText] = useState('')
  const [phonesCouponId, setPhonesCouponId] = useState('')
  const [phonesSms, setPhonesSms] = useState(true)

  // 手动发放 - 按VIP等级
  const [selectedVipLevels, setSelectedVipLevels] = useState<string[]>([])
  const [vipCouponId, setVipCouponId] = useState('')
  const [vipSms, setVipSms] = useState(true)

  // 确认弹窗（手动发放）
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmData, setConfirmData] = useState<{
    type: 'phone' | 'vip'
    phones?: string[]
    vipLevels?: string[]
    couponId: string
    smsNotify: boolean
  } | null>(null)

  // 自动发放 - 编辑弹窗
  const [editingScene, setEditingScene] = useState<SceneDistribution | null>(null)
  const [selectedCouponId, setSelectedCouponId] = useState<string>('')
  const [smsNotify, setSmsNotify] = useState<boolean>(true)
  const [dialogOpen, setDialogOpen] = useState(false)

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

  // 手动发放 - 处理VIP等级勾选
  const handleVipLevelToggle = (levelId: string) => {
    setSelectedVipLevels((prev) =>
      prev.includes(levelId) ? prev.filter((id) => id !== levelId) : [...prev, levelId]
    )
  }

  // 手动发放 - 按手机号提交
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const phones = phoneText.split('\n').map((p) => p.trim()).filter(Boolean)
    if (phones.length === 0 || !phonesCouponId) return

    setConfirmData({
      type: 'phone',
      phones,
      couponId: phonesCouponId,
      smsNotify: phonesSms,
    })
    setConfirmOpen(true)
  }

  // 手动发放 - 按VIP等级提交
  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedVipLevels.length === 0 || !vipCouponId) return

    setConfirmData({
      type: 'vip',
      vipLevels: selectedVipLevels,
      couponId: vipCouponId,
      smsNotify: vipSms,
    })
    setConfirmOpen(true)
  }

  // 自动发放 - 编辑场景
  const handleEditClick = (scene: SceneDistribution) => {
    setEditingScene(scene)
    setSelectedCouponId(scene.couponId || '')
    setSmsNotify(scene.smsNotify)
    setDialogOpen(true)
  }

  // 自动发放 - 关闭编辑弹窗
  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingScene(null)
    setSelectedCouponId('')
    setSmsNotify(true)
  }

  // 获取优惠券显示文本
  const getCouponDisplayText = (couponId: string | null, couponName?: string | null) => {
    if (!couponId) return '未配置'
    const coupon = enabledCoupons.find((c) => c.id === couponId)
    if (coupon) {
      return `${coupon.id}（${coupon.remark || coupon.name}）`
    }
    return couponName ? `${couponId}（${couponName}）` : couponId
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* 手动发放优惠券 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900">手动发放优惠券</CardTitle>
            <Link to="/platform-admin/coupon-management/records">
              <Button variant="outline" className="h-9">
                <FileText className="w-4 h-4 mr-2" />
                优惠券记录
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone">按手机号发放</TabsTrigger>
                <TabsTrigger value="vip">按VIP等级发放</TabsTrigger>
              </TabsList>

              {/* 按手机号发放 */}
              <TabsContent value="phone" className="space-y-4">
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneText">手机号列表 *</Label>
                    <Textarea
                      id="phoneText"
                      value={phoneText}
                      onChange={(e) => setPhoneText(e.target.value)}
                      placeholder="请输入手机号，一行一个&#10;13800138000&#10;13900139000"
                      rows={8}
                      className="border-slate-300 font-mono text-sm"
                    />
                    <p className="text-xs text-slate-500">每行一个手机号，支持多个</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phonesCouponId">选择派发优惠券 *</Label>
                    <Select value={phonesCouponId} onValueChange={setPhonesCouponId} required>
                      <SelectTrigger className="h-9 border-slate-300">
                        <SelectValue placeholder="选择优惠券" />
                      </SelectTrigger>
                      <SelectContent>
                        {enabledCoupons.map((coupon) => (
                          <SelectItem key={coupon.id} value={coupon.id}>
                            {coupon.id}（{coupon.remark || coupon.name}）
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="phonesSms">短信通知</Label>
                    <Switch id="phonesSms" checked={phonesSms} onCheckedChange={setPhonesSms} />
                  </div>

                  <Button
                    type="submit"
                    className="h-9 bg-blue-600 hover:bg-blue-700"
                    disabled={!phoneText || !phonesCouponId}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    开始派发
                  </Button>
                </form>
              </TabsContent>

              {/* 按VIP等级发放 */}
              <TabsContent value="vip" className="space-y-4">
                <form onSubmit={handleVipSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>VIP等级 *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {vipLevels.map((level) => (
                        <div key={level.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`vip-${level.id}`}
                            checked={selectedVipLevels.includes(level.id)}
                            onCheckedChange={() => handleVipLevelToggle(level.id)}
                          />
                          <Label htmlFor={`vip-${level.id}`} className="text-sm cursor-pointer">
                            {level.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">可多选，将发放给所选等级的所有用户</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vipCouponId">选择派发优惠券 *</Label>
                    <Select value={vipCouponId} onValueChange={setVipCouponId} required>
                      <SelectTrigger className="h-9 border-slate-300">
                        <SelectValue placeholder="选择优惠券" />
                      </SelectTrigger>
                      <SelectContent>
                        {enabledCoupons.map((coupon) => (
                          <SelectItem key={coupon.id} value={coupon.id}>
                            {coupon.id}（{coupon.remark || coupon.name}）
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="vipSms">短信通知</Label>
                    <Switch id="vipSms" checked={vipSms} onCheckedChange={setVipSms} />
                  </div>

                  <Button
                    type="submit"
                    className="h-9 bg-blue-600 hover:bg-blue-700"
                    disabled={selectedVipLevels.length === 0 || !vipCouponId}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    开始派发
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 自动发放优惠券 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">自动发放优惠券</CardTitle>
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
                        <span className={scene.smsNotify ? 'text-green-700' : 'text-slate-600'}>
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

        {/* 手动发放确认弹窗 */}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确认发放优惠券</DialogTitle>
              <DialogDescription>请确认以下发放信息</DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">发放方式：</span>
                <span className="text-sm font-medium">
                  {confirmData?.type === 'phone' ? '按手机号' : '按VIP等级'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-600">目标用户：</span>
                <span className="text-sm font-medium">
                  {confirmData?.type === 'phone'
                    ? confirmData.phones && confirmData.phones.length > 3
                      ? `${confirmData.phones.slice(0, 3).join(', ')}...`
                      : confirmData.phones?.join(', ')
                    : confirmData?.vipLevels?.map((id) => vipLevels.find((v) => v.id === id)?.name).join(', ')}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-600">发放优惠券：</span>
                <span className="text-sm font-medium">
                  {confirmData && getCouponDisplayText(confirmData.couponId)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-600">短信通知：</span>
                <span className="text-sm font-medium">{confirmData?.smsNotify ? '是' : '否'}</span>
              </div>
            </div>

            <DialogFooter>
              <Form method="post">
                <input type="hidden" name="_action" value="distribute" />
                <input type="hidden" name="type" value={confirmData?.type} />
                <input type="hidden" name="couponId" value={confirmData?.couponId} />
                <input type="hidden" name="smsNotify" value={confirmData?.smsNotify ? 'true' : 'false'} />
                {confirmData?.type === 'phone' && (
                  <input type="hidden" name="phones" value={JSON.stringify(confirmData.phones)} />
                )}
                {confirmData?.type === 'vip' && (
                  <input type="hidden" name="vipLevelIds" value={JSON.stringify(confirmData.vipLevels)} />
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setConfirmOpen(false)}
                  className="h-9 border-slate-300 mr-2"
                >
                  取消
                </Button>
                <Button type="submit" disabled={isSubmitting} className="h-9 bg-blue-600 hover:bg-blue-700">
                  {isSubmitting ? '发放中...' : '确认发放'}
                </Button>
              </Form>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 自动发放编辑对话框 */}
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
                  <div className="text-sm text-slate-700 font-medium">{editingScene?.sceneName}</div>
                </div>

                <div className="space-y-2">
                  <Label>触发时机</Label>
                  <div className="text-sm text-slate-600">{editingScene?.triggerDescription}</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="couponId">选择派发优惠券 *</Label>
                  <Select name="couponId" value={selectedCouponId} onValueChange={setSelectedCouponId} required>
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
                  <Switch id="smsNotify" name="smsNotify" checked={smsNotify} onCheckedChange={setSmsNotify} />
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
