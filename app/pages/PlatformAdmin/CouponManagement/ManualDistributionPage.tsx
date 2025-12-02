/**
 * 手动发放优惠券页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { Coupon, VipLevel } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Textarea } from '~/components/ui/textarea'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '~/components/ui/dialog'
import { Send, Users, Phone } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface ManualDistributionPageProps {
  enabledCoupons: Coupon[]
  vipLevels: VipLevel[]
  error: string | null
}

type DistributionType = 'phone' | 'vip'

export default function ManualDistributionPage({ enabledCoupons, vipLevels, error }: ManualDistributionPageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  // 发放策略
  const [distributionType, setDistributionType] = useState<DistributionType>('phone')

  // 通用字段
  const [couponId, setCouponId] = useState('')
  const [smsNotify, setSmsNotify] = useState(true)

  // 手机号发放
  const [phoneText, setPhoneText] = useState('')

  // VIP发放
  const [selectedVipLevels, setSelectedVipLevels] = useState<string[]>([])

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

  const handleSubmit = (e: React.FormEvent) => {
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

  const getCouponDisplayText = (couponId: string) => {
    const coupon = enabledCoupons.find(c => c.id === couponId)
    return coupon ? `${coupon.id}（${coupon.remark || coupon.name}）` : couponId
  }

  const isFormValid = () => {
    if (!couponId) return false
    if (distributionType === 'phone') {
      const phones = phoneText.split('\n').map(p => p.trim()).filter(Boolean)
      return phones.length > 0
    } else {
      return selectedVipLevels.length > 0
    }
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-semibold text-slate-900">手动发放优惠券</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 第一行：发放策略 + 优惠券选择 */}
                <div className="grid grid-cols-[240px_1fr] gap-6 items-start">
                  {/* 发放策略 */}
                  <div className="space-y-2.5">
                    <Label className="text-sm font-medium text-slate-900">发放策略 *</Label>
                    <RadioGroup value={distributionType} onValueChange={(value) => setDistributionType(value as DistributionType)}>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-colors cursor-pointer">
                          <RadioGroupItem value="phone" id="strategy-phone" />
                          <Label htmlFor="strategy-phone" className="text-sm cursor-pointer flex items-center gap-1.5 flex-1">
                            <Phone className="w-4 h-4 text-blue-600" />
                            按手机号发放
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2.5 rounded-lg border border-slate-200 hover:border-purple-400 hover:bg-purple-50/30 transition-colors cursor-pointer">
                          <RadioGroupItem value="vip" id="strategy-vip" />
                          <Label htmlFor="strategy-vip" className="text-sm cursor-pointer flex items-center gap-1.5 flex-1">
                            <Users className="w-4 h-4 text-purple-600" />
                            按VIP等级发放
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* 优惠券选择 + 短信通知 */}
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="couponId" className="text-sm font-medium text-slate-900">派发优惠券 *</Label>
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

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <Label htmlFor="smsNotify" className="text-sm font-medium text-slate-700">短信通知</Label>
                      <div className="flex items-center gap-2">
                        <Switch id="smsNotify" checked={smsNotify} onCheckedChange={setSmsNotify} />
                        <span className="text-sm text-slate-600 min-w-[40px]">{smsNotify ? '开启' : '关闭'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 第二行：目标用户区域（条件显示） */}
                <div className="min-h-[200px]">
                  {/* 手机号输入 */}
                  {distributionType === 'phone' && (
                    <div className="space-y-2 bg-gradient-to-br from-blue-50/50 to-blue-50/30 p-5 rounded-xl border border-blue-200/60 shadow-sm">
                      <Label htmlFor="phoneText" className="text-sm font-medium text-blue-900 flex items-center gap-1.5">
                        <Phone className="w-4 h-4" />
                        手机号列表 *
                      </Label>
                      <Textarea
                        id="phoneText"
                        value={phoneText}
                        onChange={(e) => setPhoneText(e.target.value)}
                        placeholder="请输入手机号，一行一个&#10;例如：&#10;13800138000&#10;13900139000"
                        rows={5}
                        className="border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono text-sm bg-white resize-none"
                      />
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-px bg-blue-200"></div>
                        <p className="text-xs text-blue-700">每行一个手机号，支持批量输入</p>
                        <div className="flex-1 h-px bg-blue-200"></div>
                      </div>
                    </div>
                  )}

                  {/* VIP等级选择 */}
                  {distributionType === 'vip' && (
                    <div className="space-y-3 bg-gradient-to-br from-purple-50/50 to-purple-50/30 p-5 rounded-xl border border-purple-200/60 shadow-sm">
                      <Label className="text-sm font-medium text-purple-900 flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        选择VIP等级 *
                      </Label>
                      <div className="grid grid-cols-4 gap-3">
                        {vipLevels.map((level) => (
                          <div
                            key={level.id}
                            className="flex items-center space-x-2 p-2.5 bg-white rounded-lg border border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer"
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
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-px bg-purple-200"></div>
                        <p className="text-xs text-purple-700">可多选，将发放给所选等级的所有用户</p>
                        <div className="flex-1 h-px bg-purple-200"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 第三行：提交按钮 */}
                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <Button
                    type="submit"
                    className="h-9 px-6 bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all"
                    disabled={!isFormValid()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    开始派发
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

      {/* 确认弹窗 */}
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
      </div>
    </MainLayout>
  )
}
