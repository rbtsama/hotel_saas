/**
 * 优惠券发放页面 - 统一手动发放、场景配置、操作记录
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { Coupon, VipLevel, SceneDistribution, CouponRecord } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Textarea } from '~/components/ui/textarea'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '~/components/ui/dialog'
import { Send, Users, Phone, Edit } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface CouponIssuePageProps {
  enabledCoupons: Coupon[]
  vipLevels: VipLevel[]
  scenes: SceneDistribution[]
  records: CouponRecord[]
  error: string | null
}

type DistributionType = 'phone' | 'vip'

export default function CouponIssuePage({
  enabledCoupons,
  vipLevels,
  scenes,
  records,
  error
}: CouponIssuePageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  // 手动发放状态
  const [distributionType, setDistributionType] = useState<DistributionType>('phone')
  const [couponId, setCouponId] = useState('')
  const [smsNotify, setSmsNotify] = useState(true)
  const [phoneText, setPhoneText] = useState('')
  const [selectedVipLevels, setSelectedVipLevels] = useState<string[]>([])

  // 场景配置编辑状态
  const [editingScene, setEditingScene] = useState<SceneDistribution | null>(null)
  const [sceneCouponId, setSceneCouponId] = useState('')
  const [sceneSmsNotify, setSceneSmsNotify] = useState(true)
  const [sceneDialogOpen, setSceneDialogOpen] = useState(false)

  // 确认弹窗
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmData, setConfirmData] = useState<{
    type: DistributionType
    phones?: string[]
    vipLevels?: string[]
    couponId: string
    smsNotify: boolean
  } | null>(null)

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

  const handleVipLevelToggle = (levelId: string) => {
    setSelectedVipLevels((prev) =>
      prev.includes(levelId) ? prev.filter((id) => id !== levelId) : [...prev, levelId]
    )
  }

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (distributionType === 'phone') {
      const phones = phoneText.split('\n').map(p => p.trim()).filter(Boolean)
      if (phones.length === 0 || !couponId) return

      setConfirmData({
        type: 'phone',
        phones,
        couponId,
        smsNotify,
      })
    } else {
      if (selectedVipLevels.length === 0 || !couponId) return

      setConfirmData({
        type: 'vip',
        vipLevels: selectedVipLevels,
        couponId,
        smsNotify,
      })
    }

    setConfirmOpen(true)
  }

  const handleEditScene = (scene: SceneDistribution) => {
    setEditingScene(scene)
    setSceneCouponId(scene.couponId || '')
    setSceneSmsNotify(scene.smsNotify)
    setSceneDialogOpen(true)
  }

  const getCouponDisplayText = (couponId: string) => {
    const coupon = enabledCoupons.find(c => c.id === couponId)
    return coupon ? `${coupon.id}（${coupon.remark || coupon.name}）` : couponId
  }

  const isManualFormValid = () => {
    if (!couponId) return false
    if (distributionType === 'phone') {
      const phones = phoneText.split('\n').map(p => p.trim()).filter(Boolean)
      return phones.length > 0
    } else {
      return selectedVipLevels.length > 0
    }
  }

  const getSceneTypeName = (type: string) => {
    const map: Record<string, string> = {
      register: '注册送券',
      first_order: '首单送券',
      birthday: '生日送券',
      share: '分享送券',
    }
    return map[type] || type
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* 1. 手动发放 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-900">手动发放优惠券</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleManualSubmit} className="space-y-5">
              {/* 第一行：派发优惠券、发放策略、短信通知 */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="couponId" className="text-sm font-medium text-slate-700 mb-2 block">派发优惠券 *</Label>
                  <Select value={couponId} onValueChange={setCouponId} required>
                    <SelectTrigger className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
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

                <div className="w-[240px]">
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">发放策略 *</Label>
                  <RadioGroup value={distributionType} onValueChange={(value) => setDistributionType(value as DistributionType)}>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="strategy-phone" />
                        <Label htmlFor="strategy-phone" className="text-sm cursor-pointer">
                          按手机号
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vip" id="strategy-vip" />
                        <Label htmlFor="strategy-vip" className="text-sm cursor-pointer">
                          按VIP等级
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="w-[140px]">
                  <Label htmlFor="smsNotify" className="text-sm font-medium text-slate-700 mb-2 block">短信通知</Label>
                  <div className="flex items-center gap-2 h-9">
                    <Switch id="smsNotify" checked={smsNotify} onCheckedChange={setSmsNotify} />
                    <span className="text-sm text-slate-600">{smsNotify ? '开启' : '关闭'}</span>
                  </div>
                </div>
              </div>

              {/* 第二行：目标用户区域 */}
              <div className="min-h-[240px]">
                {/* 手机号输入 */}
                {distributionType === 'phone' && (
                  <div className="space-y-2">
                    <Label htmlFor="phoneText" className="text-sm font-medium text-slate-700">手机号列表 *</Label>
                    <Textarea
                      id="phoneText"
                      value={phoneText}
                      onChange={(e) => setPhoneText(e.target.value)}
                      placeholder="请输入手机号，一行一个&#10;例如：&#10;13800138000&#10;13900139000"
                      rows={8}
                      className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono text-sm resize-none"
                    />
                    <p className="text-xs text-slate-500">每行一个手机号，支持批量输入</p>
                  </div>
                )}

                {/* VIP等级选择 */}
                {distributionType === 'vip' && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">选择VIP等级 *</Label>
                    <div className="grid grid-cols-5 gap-3">
                      {vipLevels.map((level) => (
                        <div
                          key={level.id}
                          className="flex items-center space-x-2 p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
                        >
                          <Checkbox
                            id={`vip-${level.id}`}
                            checked={selectedVipLevels.includes(level.id)}
                            onCheckedChange={() => handleVipLevelToggle(level.id)}
                          />
                          <Label htmlFor={`vip-${level.id}`} className="text-sm cursor-pointer font-medium">
                            {level.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">可多选，将发放给所选等级的所有用户</p>
                  </div>
                )}
              </div>

              {/* 提交按钮 */}
              <div className="flex justify-end pt-4 border-t border-slate-200">
                <Button
                  type="submit"
                  className="h-9 px-6 bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all"
                  disabled={!isManualFormValid()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  开始派发
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 2. 场景发放配置 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-900">场景发放配置</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-900 font-semibold">场景</TableHead>
                  <TableHead className="text-slate-900 font-semibold">优惠券</TableHead>
                  <TableHead className="text-slate-900 font-semibold">短信通知</TableHead>
                  <TableHead className="text-slate-900 font-semibold">状态</TableHead>
                  <TableHead className="text-right text-slate-900 font-semibold">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenes.map((scene) => (
                  <TableRow key={scene.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                    <TableCell className="font-medium text-slate-900">{getSceneTypeName(scene.sceneType)}</TableCell>
                    <TableCell className="text-slate-900">
                      {scene.couponId ? getCouponDisplayText(scene.couponId) : '-'}
                    </TableCell>
                    <TableCell>
                      <span className={scene.smsNotify ? 'text-green-600' : 'text-slate-600'}>
                        {scene.smsNotify ? '是' : '否'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        scene.status === 'enabled'
                          ? 'bg-green-50 text-green-700 border-green-300'
                          : 'bg-slate-100 text-slate-600 border-slate-300'
                      }>
                        {scene.status === 'enabled' ? '已启用' : '已停用'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 border-slate-300"
                        onClick={() => handleEditScene(scene)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        配置
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 3. 操作记录 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-900">操作记录 (近30条)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-900 font-semibold">优惠券</TableHead>
                  <TableHead className="text-slate-900 font-semibold">发放方式</TableHead>
                  <TableHead className="text-slate-900 font-semibold">目标用户</TableHead>
                  <TableHead className="text-slate-900 font-semibold">发放时间</TableHead>
                  <TableHead className="text-slate-900 font-semibold">操作人</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.slice(0, 30).map((record) => (
                  <TableRow key={record.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                    <TableCell className="text-slate-900">{getCouponDisplayText(record.couponId)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-slate-300">
                        {record.distributionType === 'manual_phone' ? '手机号' :
                         record.distributionType === 'manual_vip' ? 'VIP等级' : '场景发放'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-900 text-sm max-w-[200px] truncate">
                      {record.targetUsers}
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{record.createdAt}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{record.createdBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                    : confirmData?.vipLevels?.map(id => vipLevels.find(v => v.id === id)?.name).join(', ')}
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

        {/* 场景配置编辑弹窗 */}
        <Dialog open={sceneDialogOpen} onOpenChange={setSceneDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>配置{editingScene && getSceneTypeName(editingScene.sceneType)}</DialogTitle>
            </DialogHeader>

            <Form method="post" className="space-y-4">
              <input type="hidden" name="_action" value="update-scene" />
              <input type="hidden" name="sceneId" value={editingScene?.id} />

              <div className="space-y-2">
                <Label>选择优惠券</Label>
                <Select value={sceneCouponId} onValueChange={setSceneCouponId}>
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

              <div className="flex items-center justify-between">
                <Label htmlFor="sceneSms">短信通知</Label>
                <Switch id="sceneSms" checked={sceneSmsNotify} onCheckedChange={setSceneSmsNotify} />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setSceneDialogOpen(false)} className="h-9 border-slate-300">
                  取消
                </Button>
                <Button type="submit" className="h-9 bg-blue-600 hover:bg-blue-700">
                  保存
                </Button>
              </DialogFooter>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
