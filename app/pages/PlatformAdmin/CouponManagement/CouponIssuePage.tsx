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
import { ToggleButton } from '~/components/common/ToggleButton'

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
      register: '注册发放',
      first_order: '首单发放',
      checkout: '离店发放',
      birthday: '生日发放',
    }
    return map[type] || type
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* 1. 手动发放 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-slate-900">手动发放</CardTitle>
              <Link to="/platform-admin/coupon-management/issue-records">
                <Button variant="outline" className="h-9 border-slate-300">
                  发放记录
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleManualSubmit} className="space-y-6">
              {/* 发放策略选择 */}
              <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-lg">
                <Label className="text-sm font-medium text-slate-700">发放方式:</Label>
                <RadioGroup value={distributionType} onValueChange={(value) => setDistributionType(value as DistributionType)} className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="method-phone" />
                    <Label htmlFor="method-phone" className="cursor-pointer text-sm">按手机号</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vip" id="method-vip" />
                    <Label htmlFor="method-vip" className="cursor-pointer text-sm">按VIP等级</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 发放配置 */}
              <div className="grid grid-cols-[300px_1fr] gap-6">
                {/* 左侧：目标用户 */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">
                    {distributionType === 'phone' ? '手机号列表 *' : 'VIP等级 *'}
                  </Label>

                  {distributionType === 'phone' ? (
                    <Textarea
                      value={phoneText}
                      onChange={(e) => setPhoneText(e.target.value)}
                      placeholder="一行一个手机号&#10;13800138000&#10;13900139000"
                      rows={12}
                      className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono text-sm resize-none"
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {vipLevels.map((level) => (
                        <div
                          key={level.id}
                          className="flex items-center space-x-2 p-2.5 bg-white rounded border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
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
                  )}
                </div>

                {/* 右侧：优惠券和发送设置 */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="couponId" className="text-sm font-medium text-slate-700">派发优惠券 *</Label>
                    <Select value={couponId} onValueChange={setCouponId}>
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

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <Label className="text-sm font-medium text-slate-700">短信通知</Label>
                    <div className="flex items-center gap-2">
                      <Switch checked={smsNotify} onCheckedChange={setSmsNotify} />
                      <span className="text-sm text-slate-600">{smsNotify ? '是' : '否'}</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      className="h-9 px-6 bg-blue-600 hover:bg-blue-700"
                      disabled={!isManualFormValid()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      开始派发
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 2. 自动发放 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-900">自动发放</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="text-slate-900 font-semibold">场景名称</TableHead>
                  <TableHead className="text-slate-900 font-semibold">触发时机</TableHead>
                  <TableHead className="text-slate-900 font-semibold w-[280px]">选择派发优惠券</TableHead>
                  <TableHead className="text-slate-900 font-semibold w-[100px]">短信通知</TableHead>
                  <TableHead className="text-slate-900 font-semibold w-[100px]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenes.map((scene) => (
                  <TableRow key={scene.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                    <TableCell className="font-medium text-slate-900">{getSceneTypeName(scene.sceneType)}</TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {scene.sceneType === 'register' && '用户注册成功时'}
                      {scene.sceneType === 'first_order' && '用户首单完成时'}
                      {scene.sceneType === 'checkout' && '订单离店时'}
                      {scene.sceneType === 'birthday' && '用户生日当天'}
                    </TableCell>
                    <TableCell className="text-slate-900">
                      {scene.couponId ? getCouponDisplayText(scene.couponId) : (
                        <span className="text-slate-400">未配置</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={scene.smsNotify ? 'text-green-600' : 'text-slate-600'}>
                        {scene.smsNotify ? '是' : '否'}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 border-slate-300"
                          onClick={() => handleEditScene(scene)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          配置
                        </Button>
                        <Form method="post" style={{ display: 'inline' }}>
                          <input type="hidden" name="_action" value="toggle" />
                          <input type="hidden" name="sceneId" value={scene.id} />
                          <ToggleButton
                            isEnabled={scene.status === 'enabled'}
                            disabled={!scene.couponId}
                            size="sm"
                            className="h-7 px-2"
                          />
                        </Form>
                      </div>
                    </TableCell>
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
