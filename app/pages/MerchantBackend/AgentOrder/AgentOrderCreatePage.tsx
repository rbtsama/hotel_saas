/**
 * 商户端 - 创建专属订单页面
 */

import { useState, useEffect } from 'react'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { QrCode, X, Download } from 'lucide-react'

// 模拟房型数据
interface RoomType {
  id: string
  name: string
  price: number
  available: boolean
}

export default function AgentOrderCreatePage() {
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
    salePrice: '',
    specialPrice: '',
    limitPhone: '',
    notes: '',
  })
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([])

  const today = new Date().toISOString().split('T')[0]

  // 根据日期获取可售房型
  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      // 模拟获取房型数据
      setRoomTypes([
        { id: 'deluxe-king', name: '豪华大床房', price: 588, available: true },
        { id: 'deluxe-twin', name: '豪华双床房', price: 588, available: true },
        { id: 'executive-suite', name: '行政套房', price: 988, available: false },
        { id: 'presidential-suite', name: '总统套房', price: 1888, available: true },
      ])
    }
  }, [formData.checkInDate, formData.checkOutDate])

  // 计算间夜数
  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0
    const checkIn = new Date(formData.checkInDate)
    const checkOut = new Date(formData.checkOutDate)
    const diffTime = checkOut.getTime() - checkIn.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  // 选择房型或日期变化后自动计算售卖总价
  useEffect(() => {
    if (formData.roomType && formData.checkInDate && formData.checkOutDate) {
      const selectedRoom = roomTypes.find(r => r.id === formData.roomType)
      const nights = calculateNights()
      if (selectedRoom && nights > 0) {
        const totalPrice = selectedRoom.price * nights
        setFormData(prev => ({ ...prev, salePrice: totalPrice.toString() }))
      }
    }
  }, [formData.roomType, formData.checkInDate, formData.checkOutDate, roomTypes])

  const handleGenerate = () => {
    if (!formData.checkInDate || !formData.checkOutDate || !formData.roomType || !formData.specialPrice) {
      alert('请填写必填项')
      return
    }
    setQrDialogOpen(true)
  }

  const handleDownloadQR = () => {
    // 实际项目中这里会生成并下载二维码图片
    console.log('下载二维码')
  }

  const selectedRoom = roomTypes.find(r => r.id === formData.roomType)

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-3xl mx-auto p-8 space-y-8">
          {/* 页面标题 */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">创建专属订单</h1>
          </div>

          {/* 订单信息卡片 */}
          <Card className="rounded-xl border-slate-200 shadow-md hover:shadow-lg transition-all duration-200">
            <CardContent className="pt-6 space-y-6">
              {/* 日期选择 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkInDate">入住日期 <span className="text-red-500">*</span></Label>
                  <Input
                    id="checkInDate"
                    type="date"
                    min={today}
                    value={formData.checkInDate}
                    onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value, roomType: '', salePrice: '' })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOutDate">离店日期 <span className="text-red-500">*</span></Label>
                  <Input
                    id="checkOutDate"
                    type="date"
                    min={formData.checkInDate || today}
                    value={formData.checkOutDate}
                    onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value, roomType: '', salePrice: '' })}
                    required
                  />
                </div>
              </div>

              {/* 房型选择 */}
              <div className="space-y-2">
                <Label htmlFor="roomType">房型 <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.roomType}
                  onValueChange={(val) => setFormData({ ...formData, roomType: val })}
                  disabled={!formData.checkInDate || !formData.checkOutDate}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.checkInDate && formData.checkOutDate ? "选择房型" : "请先选择日期"} />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((room) => (
                      <SelectItem
                        key={room.id}
                        value={room.id}
                        disabled={!room.available}
                      >
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 价格设置 */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>售卖总价</Label>
                  <div className="text-2xl font-semibold text-slate-900">
                    {formData.salePrice ? `¥${formData.salePrice}` : '-'}
                  </div>
                  {formData.salePrice && calculateNights() > 0 && (
                    <div className="text-xs text-slate-500">
                      {selectedRoom?.name} × {calculateNights()} 晚
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialPrice">专属优惠总价 <span className="text-red-500">*</span></Label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">¥</span>
                    <Input
                      id="specialPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.specialPrice}
                      onChange={(e) => setFormData({ ...formData, specialPrice: e.target.value })}
                      className="max-w-[200px]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 限制购买人手机号 */}
              <div className="space-y-2">
                <Label htmlFor="limitPhone">限制购买人手机号</Label>
                <Input
                  id="limitPhone"
                  type="tel"
                  maxLength={11}
                  placeholder="仅限该手机号购买"
                  value={formData.limitPhone}
                  onChange={(e) => setFormData({ ...formData, limitPhone: e.target.value.replace(/\D/g, '') })}
                />
              </div>

              {/* 备注 */}
              <div className="space-y-2">
                <Label htmlFor="notes">备注</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  maxLength={500}
                  placeholder="填写备注信息"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="resize-none"
                />
                <div className="text-xs text-slate-400 text-right">
                  {formData.notes.length}/500
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 生成付款码按钮 */}
          <div className="flex justify-center">
            <Button size="lg" onClick={handleGenerate} className="w-full max-w-md h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all">
              生成付款码
            </Button>
          </div>

          {/* 付款码弹窗 - 全黑蒙层设计 */}
          {qrDialogOpen && (
            <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
              {/* 弹窗内容 */}
              <div className="bg-white rounded-lg max-w-sm w-full mx-4 relative">
                {/* 关闭按钮 */}
                <button
                  onClick={() => setQrDialogOpen(false)}
                  className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity z-10 text-slate-600 hover:text-slate-900"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">关闭</span>
                </button>

                <div className="p-6 space-y-4">
                  {/* 二维码 */}
                  <div className="flex items-center justify-center">
                    <div className="w-64 h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                      <QrCode className="w-48 h-48 text-slate-400" />
                    </div>
                  </div>

                  {/* 保存二维码按钮 */}
                  <Button onClick={handleDownloadQR} variant="outline" className="w-full gap-2 h-9 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all">
                    <Download className="w-4 h-4" />
                    保存二维码
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
