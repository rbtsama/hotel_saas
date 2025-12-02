/**
 * 优惠券弹窗组件 - 支持创建和编辑
 */

import { useState, useEffect } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { Coupon, CouponType } from '../types/coupon.types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'

interface CouponDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  coupon?: Coupon | null // 如果有值则为编辑模式
  mode: 'create' | 'edit'
}

export default function CouponDialog({ open, onOpenChange, coupon, mode }: CouponDialogProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  // 表单状态
  const [name, setName] = useState('')
  const [type, setType] = useState<CouponType>('full_reduction')
  const [threshold, setThreshold] = useState('')
  const [amount, setAmount] = useState('')
  const [discount, setDiscount] = useState('')
  const [maxDiscount, setMaxDiscount] = useState('')
  const [platformRatio, setPlatformRatio] = useState('50')
  const [validDays, setValidDays] = useState('30')
  const [remark, setRemark] = useState('')

  // 计算商户承担比例
  const merchantRatio = 100 - Number(platformRatio || 0)

  // 初始化表单数据（编辑模式）
  useEffect(() => {
    if (mode === 'edit' && coupon) {
      setName(coupon.name)
      setType(coupon.type)
      setThreshold(coupon.threshold?.toString() || '')
      setAmount(coupon.amount?.toString() || '')
      setDiscount(coupon.discount?.toString() || '')
      setMaxDiscount(coupon.maxDiscount?.toString() || '')
      setPlatformRatio(coupon.platformRatio.toString())
      setValidDays(coupon.validDays.toString())
      setRemark(coupon.remark || '')
    } else {
      // 重置表单（创建模式）
      setName('')
      setType('full_reduction')
      setThreshold('')
      setAmount('')
      setDiscount('')
      setMaxDiscount('')
      setPlatformRatio('50')
      setValidDays('30')
      setRemark('')
    }
  }, [mode, coupon, open])

  // 关闭弹窗并重置表单
  const handleClose = () => {
    onOpenChange(false)
  }

  // 获取表单action URL
  const formAction = mode === 'edit' && coupon
    ? `/platform-admin/coupon-management/edit/${coupon.id}`
    : '/platform-admin/coupon-management/create'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900">
            {mode === 'create' ? '创建优惠券' : '编辑优惠券'}
          </DialogTitle>
        </DialogHeader>

        <Form method="post" action={formAction} className="space-y-6">
          {/* 隐藏字段：优惠券ID（编辑模式） */}
          {mode === 'edit' && coupon && (
            <input type="hidden" name="couponId" value={coupon.id} />
          )}

          {/* 优惠券名称 */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              优惠券名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入优惠券名称（最多50字符）"
              maxLength={50}
              required
              className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* 优惠券类型 - 框式选择器 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              优惠券类型 <span className="text-red-500">*</span>
            </Label>
            <input type="hidden" name="type" value={type} />
            <div className="grid grid-cols-3 gap-3">
              {/* 满减券 */}
              <div
                onClick={() => {
                  setType('full_reduction')
                  // 切换类型时清空相关字段
                  setThreshold('')
                  setAmount('')
                  setDiscount('')
                  setMaxDiscount('')
                }}
                className={`
                  cursor-pointer p-3 rounded-lg border-2 transition-all text-center
                  ${type === 'full_reduction'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                  }
                `}
              >
                <div className={type === 'full_reduction' ? 'text-blue-700' : 'text-slate-700'}>
                  <div className="font-semibold mb-1">满减券</div>
                  <div className="text-xs text-slate-500">满X元减Y元</div>
                </div>
              </div>

              {/* 折扣券 */}
              <div
                onClick={() => {
                  setType('discount')
                  // 切换类型时清空相关字段
                  setThreshold('')
                  setAmount('')
                  setDiscount('')
                  setMaxDiscount('')
                }}
                className={`
                  cursor-pointer p-3 rounded-lg border-2 transition-all text-center
                  ${type === 'discount'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                  }
                `}
              >
                <div className={type === 'discount' ? 'text-blue-700' : 'text-slate-700'}>
                  <div className="font-semibold mb-1">折扣券</div>
                  <div className="text-xs text-slate-500">打X折，最高Y元</div>
                </div>
              </div>

              {/* 立减券 */}
              <div
                onClick={() => {
                  setType('instant_reduction')
                  // 切换类型时清空相关字段
                  setThreshold('')
                  setAmount('')
                  setDiscount('')
                  setMaxDiscount('')
                }}
                className={`
                  cursor-pointer p-3 rounded-lg border-2 transition-all text-center
                  ${type === 'instant_reduction'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                  }
                `}
              >
                <div className={type === 'instant_reduction' ? 'text-blue-700' : 'text-slate-700'}>
                  <div className="font-semibold mb-1">立减券</div>
                  <div className="text-xs text-slate-500">直接减Y元</div>
                </div>
              </div>
            </div>
          </div>

          {/* 满减券字段 */}
          {type === 'full_reduction' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="threshold" className="text-sm font-medium text-slate-700">
                  使用门槛(元) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="threshold"
                  name="threshold"
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder="如：300"
                  required
                  className="h-9"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium text-slate-700">
                  减免金额(元) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="如：50"
                  required
                  className="h-9"
                />
              </div>
            </div>
          )}

          {/* 折扣券字段 */}
          {type === 'discount' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount" className="text-sm font-medium text-slate-700">
                  折扣率% <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="如：85"
                    min={1}
                    max={99}
                    required
                    className="h-9 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    %
                  </span>
                </div>
                <p className="text-xs text-slate-500">输入折扣百分比，如85表示85%折扣</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxDiscount" className="text-sm font-medium text-slate-700">
                  最高优惠金额(元) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="maxDiscount"
                  name="maxDiscount"
                  type="number"
                  value={maxDiscount}
                  onChange={(e) => setMaxDiscount(e.target.value)}
                  placeholder="如：100"
                  min={0}
                  required
                  className="h-9"
                />
              </div>
            </div>
          )}

          {/* 立减券字段 */}
          {type === 'instant_reduction' && (
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-slate-700">
                减免金额(元) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="如：30"
                required
                className="h-9"
              />
            </div>
          )}

          {/* 费用承担 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platformRatio" className="text-sm font-medium text-slate-700">
                平台承担比例(%) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="platformRatio"
                name="platformRatio"
                type="number"
                value={platformRatio}
                onChange={(e) => {
                  const value = Math.min(100, Math.max(0, Number(e.target.value)))
                  setPlatformRatio(value.toString())
                }}
                min={0}
                max={100}
                required
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">商户承担比例(%)</Label>
              <Input
                value={merchantRatio}
                disabled
                className="h-9 bg-slate-50 text-slate-700 cursor-not-allowed border-slate-300"
              />
            </div>
          </div>

          {/* 有效天数 */}
          <div className="space-y-2">
            <Label htmlFor="validDays" className="text-sm font-medium text-slate-700">
              有效天数 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="validDays"
              name="validDays"
              type="number"
              value={validDays}
              onChange={(e) => setValidDays(e.target.value)}
              placeholder="0表示永久，其他表示发放后N天23:59过期"
              min={0}
              required
              className="h-9"
            />
            <p className="text-xs text-slate-500">0表示永久有效，其他数字表示发放后N天23:59过期</p>
          </div>

          {/* 备注说明 */}
          <div className="space-y-2">
            <Label htmlFor="remark" className="text-sm font-medium text-slate-700">备注说明</Label>
            <Textarea
              id="remark"
              name="remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="仅后台可见，最多200字符"
              maxLength={200}
              rows={3}
              className="resize-none border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* 按钮组 */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="h-9 border-slate-300"
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button
              type="submit"
              className="h-9 bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (mode === 'create' ? '创建中...' : '保存中...') : (mode === 'create' ? '创建' : '保存')}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
