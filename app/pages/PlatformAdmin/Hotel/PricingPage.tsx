/**
 * 平台后台 - 房价管理页面
 */

import { useState } from 'react'
import type { RoomType, DailyPrice } from './types/hotel.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '~/components/ui/dialog'
import { Badge } from '~/components/ui/badge'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

interface PricingPageProps {
  roomTypes: RoomType[]
  initialPrices: DailyPrice[]
  initialYear: number
  initialMonth: number
}

export default function PricingPage({ roomTypes, initialPrices, initialYear, initialMonth }: PricingPageProps) {
  const [selectedRoomType, setSelectedRoomType] = useState<string>(roomTypes[0]?.id || '')
  const [currentYear, setCurrentYear] = useState(initialYear)
  const [currentMonth, setCurrentMonth] = useState(initialMonth)
  const [prices, setPrices] = useState<DailyPrice[]>(initialPrices)
  const [editingDate, setEditingDate] = useState<string | null>(null)
  const [editPrice, setEditPrice] = useState<number>(0)
  const [showBatchDialog, setShowBatchDialog] = useState(false)

  // 批量设置表单状态
  const [batchStartDate, setBatchStartDate] = useState('')
  const [batchEndDate, setBatchEndDate] = useState('')
  const [batchPrice, setBatchPrice] = useState('')
  const [batchApplyTo, setBatchApplyTo] = useState<'all' | 'weekday' | 'weekend'>('all')

  // 获取当前选中房型的价格数据
  const currentRoomPrices = prices.filter(p => p.roomTypeId === selectedRoomType)

  // 生成日历数据
  const generateCalendar = () => {
    const firstDay = dayjs(`${currentYear}-${String(currentMonth).padStart(2, '0')}-01`)
    const daysInMonth = firstDay.daysInMonth()
    const startDayOfWeek = firstDay.day() // 0 = Sunday, 1 = Monday, ...

    // 调整：周一为0，周日为6
    const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1

    const calendar: (DailyPrice | null)[][] = []
    let week: (DailyPrice | null)[] = Array(adjustedStartDay).fill(null)

    for (let day = 1; day <= daysInMonth; day++) {
      const date = firstDay.date(day).format('YYYY-MM-DD')
      const priceData = currentRoomPrices.find(p => p.date === date)

      week.push(priceData || null)

      if (week.length === 7) {
        calendar.push(week)
        week = []
      }
    }

    // 填充最后一周
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null)
      }
      calendar.push(week)
    }

    return calendar
  }

  const calendar = generateCalendar()

  // 切换到上个月
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1)
      setCurrentMonth(12)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // 切换到下个月
  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1)
      setCurrentMonth(1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // 点击价格单元格，进入编辑模式
  const handleCellClick = (priceData: DailyPrice) => {
    setEditingDate(priceData.date)
    setEditPrice(priceData.price)
  }

  // 保存单日价格
  const handleSaveSinglePrice = () => {
    if (!editingDate) return

    setPrices(prev =>
      prev.map(p =>
        p.date === editingDate && p.roomTypeId === selectedRoomType
          ? { ...p, price: editPrice }
          : p
      )
    )
    setEditingDate(null)
  }

  // 处理批量设置
  const handleBatchUpdate = () => {
    if (!batchStartDate || !batchEndDate || !batchPrice) return

    const price = parseInt(batchPrice)
    if (isNaN(price) || price <= 0) return

    const start = dayjs(batchStartDate)
    const end = dayjs(batchEndDate)

    setPrices(prev =>
      prev.map(p => {
        if (p.roomTypeId !== selectedRoomType) return p

        const currentDate = dayjs(p.date)
        if (currentDate.isBefore(start, 'day') || currentDate.isAfter(end, 'day')) return p

        // 根据应用类型决定是否更新
        if (batchApplyTo === 'all') {
          return { ...p, price }
        } else if (batchApplyTo === 'weekday' && !p.isWeekend && !p.isHoliday) {
          return { ...p, price }
        } else if (batchApplyTo === 'weekend' && (p.isWeekend || p.isHoliday)) {
          return { ...p, price }
        }

        return p
      })
    )

    // 重置表单
    setShowBatchDialog(false)
    setBatchStartDate('')
    setBatchEndDate('')
    setBatchPrice('')
    setBatchApplyTo('all')
  }

  const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

  return (
    <div className="h-screen overflow-y-auto bg-slate-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">房价管理</h1>
        </div>

        {/* 筛选器 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-end">
              {/* 房型选择 */}
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="roomType" className="text-sm font-medium text-slate-700 mb-2">
                  选择房型
                </Label>
                <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                  <SelectTrigger id="roomType" className="h-9 border-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map(rt => (
                      <SelectItem key={rt.id} value={rt.id}>
                        {rt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 月份选择 */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevMonth}
                  className="h-9 px-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-md min-w-[140px] justify-center">
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-900">
                    {currentYear}年{currentMonth}月
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextMonth}
                  className="h-9 px-3"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* 批量设置按钮 */}
              <Dialog open={showBatchDialog} onOpenChange={setShowBatchDialog}>
                <DialogTrigger asChild>
                  <Button className="h-9 bg-blue-600 hover:bg-blue-700">
                    批量设置
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-slate-900">
                      批量设置价格
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* 日期范围 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate" className="text-sm font-medium text-slate-700">
                          开始日期
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={batchStartDate}
                          onChange={(e) => setBatchStartDate(e.target.value)}
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate" className="text-sm font-medium text-slate-700">
                          结束日期
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={batchEndDate}
                          onChange={(e) => setBatchEndDate(e.target.value)}
                          className="h-9"
                        />
                      </div>
                    </div>

                    {/* 价格 */}
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-medium text-slate-700">
                        价格（元/晚）
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        value={batchPrice}
                        onChange={(e) => setBatchPrice(e.target.value)}
                        className="h-9"
                        placeholder="请输入价格"
                      />
                    </div>

                    {/* 应用范围 */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">应用到</Label>
                      <Select value={batchApplyTo} onValueChange={(v) => setBatchApplyTo(v as any)}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全部日期</SelectItem>
                          <SelectItem value="weekday">仅工作日</SelectItem>
                          <SelectItem value="weekend">仅周末/节假日</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowBatchDialog(false)}
                      className="h-9"
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleBatchUpdate}
                      className="h-9 bg-blue-600 hover:bg-blue-700"
                    >
                      确认
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* 日历 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">
              {roomTypes.find(rt => rt.id === selectedRoomType)?.name} - 价格日历
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    {weekDays.map((day, idx) => (
                      <th
                        key={day}
                        className={`p-3 text-sm font-semibold text-slate-600 ${
                          idx >= 5 ? 'bg-blue-50' : ''
                        }`}
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calendar.map((week, weekIdx) => (
                    <tr key={weekIdx} className="border-b border-slate-100">
                      {week.map((priceData, dayIdx) => {
                        const isWeekend = dayIdx >= 5
                        const isEditing = editingDate === priceData?.date

                        return (
                          <td
                            key={dayIdx}
                            className={`p-2 align-top h-24 ${
                              isWeekend ? 'bg-blue-50/30' : ''
                            } ${
                              priceData?.isHoliday ? 'bg-orange-50/50' : ''
                            } ${
                              priceData ? 'cursor-pointer hover:bg-slate-50 transition-colors' : ''
                            }`}
                            onClick={() => priceData && !isEditing && handleCellClick(priceData)}
                          >
                            {priceData && (
                              <div className="space-y-1">
                                {/* 日期 */}
                                <div className="text-xs font-medium text-slate-700">
                                  {dayjs(priceData.date).date()}日
                                </div>

                                {/* 价格 */}
                                {isEditing ? (
                                  <div className="flex flex-col gap-1">
                                    <Input
                                      type="number"
                                      value={editPrice}
                                      onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                                      className="h-7 text-xs"
                                      autoFocus
                                      onBlur={handleSaveSinglePrice}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSaveSinglePrice()
                                        if (e.key === 'Escape') setEditingDate(null)
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div className="text-sm font-semibold text-blue-600">
                                    ¥{priceData.price}
                                  </div>
                                )}

                                {/* 标签 */}
                                {priceData.label && !isEditing && (
                                  <Badge
                                    variant="outline"
                                    className={`text-xs px-1.5 py-0 ${
                                      priceData.isHoliday
                                        ? 'border-orange-300 text-orange-700 bg-orange-50'
                                        : 'border-blue-300 text-blue-700 bg-blue-50'
                                    }`}
                                  >
                                    {priceData.label}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 说明 */}
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
                <span>周末</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
                <span>节假日</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💡 点击日期可直接修改价格</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
