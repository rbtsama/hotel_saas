/**
 * 订单详情页面
 * 展示订单完整信息，包含基本信息、客人信息、房间信息、费用明细
 */

import { Link } from '@remix-run/react'
import type { Order } from './types/orderList.types'
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS, CHECK_IN_STATUS_LABELS } from './types/orderList.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { ArrowLeft, Printer, Edit, XCircle } from 'lucide-react'
import { cn } from '~/lib/utils'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface OrderDetailPageProps {
  order: Order
  error: string | null
}

export default function OrderDetailPage({ order, error }: OrderDetailPageProps) {
  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </MainLayout>
    )
  }

  // 计算间夜数
  const checkInDate = new Date(order.checkInDate)
  const checkOutDate = new Date(order.checkOutDate)
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))

  // 计算费用明细（示例）
  const roomPrice = order.totalAmount / nights
  const discount = 0 // 示例：无优惠
  const totalPrice = order.totalAmount

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：订单详情界面 (60%) */}
        <div className="h-full overflow-y-auto p-6 bg-background">
          <div className="p-6 space-y-6">
            {/* 页面头部 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/hotel-backend/order-list">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    返回订单列表
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold">订单详情</h1>
                  <p className="text-muted-foreground mt-1">查看订单完整信息</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  打印订单
                </Button>
              </div>
            </div>

            {/* 订单基本信息 */}
            <Card>
              <CardHeader>
                <CardTitle>订单基本信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">订单号</label>
                    <div className="font-mono text-lg font-medium">{order.orderNumber}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">下单时间</label>
                    <div className="text-lg">{order.createdAt}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">订单状态</label>
                    <div>
                      <span
                        className={cn(
                          "px-3 py-1 rounded text-sm font-medium",
                          order.checkInStatus === 'not-checked-in'
                            ? "bg-blue-100 text-blue-700"
                            : order.checkInStatus === 'checked-in'
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        )}
                      >
                        {CHECK_IN_STATUS_LABELS[order.checkInStatus]}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">支付状态</label>
                    <div>
                      <span
                        className={cn(
                          "px-3 py-1 rounded text-sm font-medium",
                          order.paymentStatus === 'paid'
                            ? "bg-green-100 text-green-700"
                            : order.paymentStatus === 'unpaid'
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        )}
                      >
                        {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 客人信息 */}
            <Card>
              <CardHeader>
                <CardTitle>客人信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">订房人姓名</label>
                    <div className="text-lg font-medium">{order.guestName}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">联系电话</label>
                    <div className="text-lg">{order.guestPhone}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 房间信息 */}
            <Card>
              <CardHeader>
                <CardTitle>房间信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">房型</label>
                    <div className="text-lg font-medium">{order.roomType}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">间夜数</label>
                    <div className="text-lg">{nights} 晚</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">入住日期</label>
                    <div className="text-lg">{order.checkInDate}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">离店日期</label>
                    <div className="text-lg">{order.checkOutDate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 费用明细 */}
            <Card>
              <CardHeader>
                <CardTitle>费用明细</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground">房费（{nights} 晚 × ¥{roomPrice.toFixed(2)}）</span>
                    <span className="text-lg">¥{order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground">优惠</span>
                    <span className="text-lg text-green-600">-¥{discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-bold">实付金额</span>
                    <span className="text-2xl font-bold text-primary">¥{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex gap-4">
              {order.checkInStatus === 'not-checked-in' && (
                <>
                  <Button variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    修改订单
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    <XCircle className="h-4 w-4 mr-2" />
                    取消订单
                  </Button>
                </>
              )}
              {order.checkInStatus === 'checked-in' && (
                <Button variant="default" className="flex-1">
                  办理退房
                </Button>
              )}
              {(order.checkInStatus === 'checked-out' || order.orderStatus === 'completed') && (
                <Button variant="outline" className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  打印凭证
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 右侧：LogicPanel (40%) */}
        <div className="w-[40%] h-full border-l">
          {/* LogicPanel placeholder */}
        </div>
      </div>
    </MainLayout>
  )
}
