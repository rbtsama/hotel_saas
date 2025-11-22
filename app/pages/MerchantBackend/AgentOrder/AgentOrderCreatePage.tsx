/**
 * 商户端 - 创建代客下单页面
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { QrCode, Save, X } from 'lucide-react'

export default function AgentOrderCreatePage() {
  const [formData, setFormData] = useState({
    roomType: '',
    checkInDate: '',
    checkOutDate: '',
    marketPrice: 500,
    specialPrice: 350,
    requirements: {
      breakfast2: false,
      lateCheckout: false,
      upgrade: false,
      other: '',
    },
    notes: '',
  })
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [generatedOrder, setGeneratedOrder] = useState<any>(null)

  const nights = formData.checkInDate && formData.checkOutDate
    ? Math.ceil((new Date(formData.checkOutDate).getTime() - new Date(formData.checkInDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const handleGenerate = () => {
    setGeneratedOrder({
      orderId: `DKD${Date.now()}`,
      ...formData,
      nights,
    })
    setQrDialogOpen(true)
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">创建代客下单</h1>
            <p className="text-slate-600 mt-1">
              为老客户创建专属订单，设定特殊价格和要求，生成付款二维码
            </p>
          </div>

          <Form method="post">
            <div className="space-y-6">
              {/* 订单信息 */}
              <Card>
                <CardHeader>
                  <CardTitle>订单信息</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="roomType">房型选择</Label>
                    <Select value={formData.roomType} onValueChange={(val) => setFormData({ ...formData, roomType: val })}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择房型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deluxe-king">豪华大床房</SelectItem>
                        <SelectItem value="deluxe-twin">豪华双床房</SelectItem>
                        <SelectItem value="executive-suite">行政套房</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkInDate">入住日期</Label>
                      <Input
                        id="checkInDate"
                        name="checkInDate"
                        type="date"
                        value={formData.checkInDate}
                        onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkOutDate">离店日期</Label>
                      <Input
                        id="checkOutDate"
                        name="checkOutDate"
                        type="date"
                        value={formData.checkOutDate}
                        onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                      />
                    </div>
                  </div>

                  {nights > 0 && (
                    <div className="text-sm text-slate-600">
                      间夜数：<span className="font-semibold text-primary">{nights}晚</span>（自动计算）
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 价格设置 */}
              <Card>
                <CardHeader>
                  <CardTitle>价格设置</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>门市价格</Label>
                    <div className="text-lg font-semibold text-slate-900">¥{formData.marketPrice}</div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialPrice">专属特惠价</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="specialPrice"
                        name="specialPrice"
                        type="number"
                        min="1"
                        value={formData.specialPrice}
                        onChange={(e) => setFormData({ ...formData, specialPrice: parseInt(e.target.value) || 0 })}
                        className="max-w-xs"
                      />
                      <span className="text-sm text-slate-600">元</span>
                    </div>
                    <p className="text-xs text-slate-500">可设置低于门市价的特殊价格</p>
                  </div>
                </CardContent>
              </Card>

              {/* 特殊要求 */}
              <Card>
                <CardHeader>
                  <CardTitle>特殊要求（选填）</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="breakfast2"
                      checked={formData.requirements.breakfast2}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          requirements: { ...formData.requirements, breakfast2: !!checked },
                        })
                      }
                    />
                    <Label htmlFor="breakfast2">含双份早餐</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="lateCheckout"
                      checked={formData.requirements.lateCheckout}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          requirements: { ...formData.requirements, lateCheckout: !!checked },
                        })
                      }
                    />
                    <Label htmlFor="lateCheckout">延迟退房至14:00</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="upgrade"
                      checked={formData.requirements.upgrade}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          requirements: { ...formData.requirements, upgrade: !!checked },
                        })
                      }
                    />
                    <Label htmlFor="upgrade">免费升级房型</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="other">其他要求</Label>
                    <Input
                      id="other"
                      value={formData.requirements.other}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirements: { ...formData.requirements, other: e.target.value },
                        })
                      }
                      placeholder="其他特殊要求"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* 备注 */}
              <Card>
                <CardHeader>
                  <CardTitle>备注</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    name="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="例如：老客户张总专属订单，已电话沟通确认"
                  />
                </CardContent>
              </Card>

              {/* 操作按钮 */}
              <div className="flex justify-end">
                <Button type="button" size="lg" className="gap-2" onClick={handleGenerate}>
                  <QrCode className="w-4 h-4" />
                  生成付款码
                </Button>
              </div>
            </div>
          </Form>

          {/* 付款码弹窗 */}
          <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>代客下单付款码</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="text-center">
                  <div className="w-64 h-64 bg-slate-200 rounded-lg mx-auto flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">二维码图片</p>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-center text-lg">XX豪华酒店</p>
                  <p className="text-slate-600 text-center">地址：北京市朝阳区XX路88号</p>
                  <div className="border-t border-b py-3 my-3 space-y-1">
                    <p className="font-medium">{formData.roomType}</p>
                    <p className="text-slate-600">
                      {formData.checkInDate} 至 {formData.checkOutDate}（{nights}晚）
                    </p>
                    {(formData.requirements.breakfast2 || formData.requirements.lateCheckout || formData.requirements.upgrade) && (
                      <p className="text-slate-600">
                        {formData.requirements.breakfast2 && '含双份早餐、'}
                        {formData.requirements.lateCheckout && '延迟退房至14:00、'}
                        {formData.requirements.upgrade && '免费升级房型'}
                      </p>
                    )}
                  </div>
                  <p className="text-center">
                    <span className="text-2xl font-bold text-secondary">¥{formData.specialPrice}</span>
                    <span className="text-slate-500 ml-2">专属特惠价</span>
                  </p>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    请客户扫码完成支付<br />
                    （此码仅可支付一次，7天内有效）
                  </p>
                  <p className="text-center text-xs text-slate-400 mt-2">
                    订单号：{generatedOrder?.orderId}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Save className="w-4 h-4" />
                    保存图片
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setQrDialogOpen(false)}>
                    <X className="w-4 h-4" />
                    关闭
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </MainLayout>
  )
}
