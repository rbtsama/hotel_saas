/**
 * 广告表单弹窗组件
 */

import { useEffect, useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { Advertisement } from '../types/ads.types'
import { WeekDay } from '../types/ads.types'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

interface AdFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  positionId: string
  editingAd: Advertisement | null
}

const weekDayOptions = [
  { value: WeekDay.MONDAY, label: '周一' },
  { value: WeekDay.TUESDAY, label: '周二' },
  { value: WeekDay.WEDNESDAY, label: '周三' },
  { value: WeekDay.THURSDAY, label: '周四' },
  { value: WeekDay.FRIDAY, label: '周五' },
  { value: WeekDay.SATURDAY, label: '周六' },
  { value: WeekDay.SUNDAY, label: '周日' },
]

export default function AdFormDialog({
  open,
  onOpenChange,
  positionId,
  editingAd,
}: AdFormDialogProps) {
  const navigation = useNavigation()
  const [selectedWeekDays, setSelectedWeekDays] = useState<WeekDay[]>(
    editingAd?.weekDays || [WeekDay.MONDAY, WeekDay.TUESDAY, WeekDay.WEDNESDAY, WeekDay.THURSDAY, WeekDay.FRIDAY, WeekDay.SATURDAY, WeekDay.SUNDAY]
  )

  const isSubmitting =
    navigation.state === 'submitting' &&
    (navigation.formData?.get('_action') === 'createAd' ||
      navigation.formData?.get('_action') === 'updateAd')

  useEffect(() => {
    if (editingAd) {
      setSelectedWeekDays(editingAd.weekDays)
    } else {
      setSelectedWeekDays([WeekDay.MONDAY, WeekDay.TUESDAY, WeekDay.WEDNESDAY, WeekDay.THURSDAY, WeekDay.FRIDAY, WeekDay.SATURDAY, WeekDay.SUNDAY])
    }
  }, [editingAd])

  useEffect(() => {
    if (!isSubmitting && navigation.state === 'idle') {
      onOpenChange(false)
    }
  }, [isSubmitting, navigation.state, onOpenChange])

  const toggleWeekDay = (day: WeekDay) => {
    setSelectedWeekDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const selectAllWeekDays = () => {
    setSelectedWeekDays([
      WeekDay.MONDAY,
      WeekDay.TUESDAY,
      WeekDay.WEDNESDAY,
      WeekDay.THURSDAY,
      WeekDay.FRIDAY,
      WeekDay.SATURDAY,
      WeekDay.SUNDAY,
    ])
  }

  const selectWorkdays = () => {
    setSelectedWeekDays([
      WeekDay.MONDAY,
      WeekDay.TUESDAY,
      WeekDay.WEDNESDAY,
      WeekDay.THURSDAY,
      WeekDay.FRIDAY,
    ])
  }

  const selectWeekend = () => {
    setSelectedWeekDays([WeekDay.SATURDAY, WeekDay.SUNDAY])
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            {editingAd ? '编辑广告' : '新增广告'}
          </h2>
        </div>

        <Form method="post" className="p-6 space-y-4">
          <input
            type="hidden"
            name="_action"
            value={editingAd ? 'updateAd' : 'createAd'}
          />
          <input type="hidden" name="positionId" value={positionId} />
          {editingAd && <input type="hidden" name="adId" value={editingAd.id} />}

          {/* 广告图片URL */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">
              广告图片URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              defaultValue={editingAd?.imageUrl}
              required
            />
          </div>

          {/* 有效日期段 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validDateStart">
                有效开始日期 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="validDateStart"
                name="validDateStart"
                type="date"
                defaultValue={editingAd?.validDateStart}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validDateEnd">
                有效结束日期 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="validDateEnd"
                name="validDateEnd"
                type="date"
                defaultValue={editingAd?.validDateEnd}
                required
              />
            </div>
          </div>

          {/* 有效时间段 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validTimeStart">
                有效开始时间 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="validTimeStart"
                name="validTimeStart"
                type="time"
                step="1"
                defaultValue={editingAd?.validTimeStart}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validTimeEnd">
                有效结束时间 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="validTimeEnd"
                name="validTimeEnd"
                type="time"
                step="1"
                defaultValue={editingAd?.validTimeEnd}
                required
              />
            </div>
          </div>

          {/* 星期类型 */}
          <div className="space-y-2">
            <Label>
              星期类型 <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={selectAllWeekDays}>
                  全选
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={selectWorkdays}>
                  工作日
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={selectWeekend}>
                  周末
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {weekDayOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-2 px-3 py-2 border rounded cursor-pointer transition-colors ${
                      selectedWeekDays.includes(option.value)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="weekDays"
                      value={option.value}
                      checked={selectedWeekDays.includes(option.value)}
                      onChange={() => toggleWeekDay(option.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 跳转链接 */}
          <div className="space-y-2">
            <Label htmlFor="clickUrl">跳转链接 (选填)</Label>
            <Input
              id="clickUrl"
              name="clickUrl"
              type="url"
              placeholder="https://example.com/promotion"
              defaultValue={editingAd?.clickUrl}
            />
          </div>

          {/* 启用状态 */}
          <div className="space-y-2">
            <Label>启用状态</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="enabled"
                  value="true"
                  defaultChecked={editingAd?.enabled !== false}
                  className="w-4 h-4"
                />
                <span className="text-sm">启用</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="enabled"
                  value="false"
                  defaultChecked={editingAd?.enabled === false}
                  className="w-4 h-4"
                />
                <span className="text-sm">禁用</span>
              </label>
            </div>
          </div>

          {/* 表单按钮 */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '提交中...' : editingAd ? '更新' : '创建'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
