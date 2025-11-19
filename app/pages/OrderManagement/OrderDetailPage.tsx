/**
 * 订单详情页面
 */

import type { Order } from './types/order.types'
import { OrderStatus, PaymentMethod } from './types/order.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import MainLayout from '../PointsSystem/components/MainLayout'
import OperationLogButton from '../PointsSystem/components/OperationLogButton'

interface OrderDetailPageProps {
  order: Order
  error?: string | null
}

const orderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.PENDING_PAYMENT]: '待支付',
  [OrderStatus.PENDING_CONFIRM]: '待确认',
  [OrderStatus.PENDING_CHECKIN]: '待入住',
  [OrderStatus.CHECKED_IN]: '已入住',
  [OrderStatus.COMPLETED]: '已完成',
  [OrderStatus.CANCELLED]: '已取消'
}

const paymentMethodLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.WECHAT]: '微信支付',
  [PaymentMethod.ALIPAY]: '支付宝',
  [PaymentMethod.BANK_CARD]: '银行卡'
}

const BusinessLogicPanel = ({ sections }: { sections: Array<{ title: string; content: React.ReactNode }> }) => (
  <div className="p-6 space-y-6 overflow-y-auto">
    <div>
      <h2 className="text-xl font-bold text-slate-900">业务逻辑说明</h2>
      <p className="text-sm text-slate-500 mt-1">
        后台配置如何影响前端用户体验
      </p>
    </div>
    {sections.map((section, index) => (
      <div key={index}>
        <h3 className="font-semibold mb-3">{section.title}</h3>
        {section.content}
      </div>
    ))}
  </div>
)

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

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：功能区 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* 页面标题 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">订单详情</h1>
                <p className="text-sm text-slate-500 mt-1">订单号: {order.orderId}</p>
              </div>
              <OperationLogButton moduleName="订单详情" />
            </div>

            <Card>
              <CardHeader><CardTitle>订单信息</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div><Label>订单状态</Label><p>{orderStatusLabels[order.status]}</p></div>
                <div><Label>下单时间</Label><p>{order.createdAt}</p></div>
                <div><Label>支付方式</Label><p>{paymentMethodLabels[order.paymentMethod]}</p></div>
                <div><Label>支付时间</Label><p>{order.paidAt || '-'}</p></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>房客信息</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div><Label>姓名</Label><p>{order.userName}</p></div>
                <div><Label>手机号</Label><p>{order.userPhone}</p></div>
                <div><Label>入住人数</Label><p>{order.guestCount}人</p></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>酒店信息</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2"><Label>酒店名称</Label><p className="font-medium">{order.hotelName}</p></div>
                <div><Label>房型</Label><p>{order.roomType}</p></div>
                <div><Label>间夜数</Label><p>{order.nights}晚</p></div>
                <div><Label>入住日期</Label><p>{order.checkInDate}</p></div>
                <div><Label>退房日期</Label><p>{order.checkOutDate}</p></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>价格明细</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span>房费小计</span><span>¥{order.roomPrice}</span></div>
                <div className="flex justify-between text-red-600"><span>优惠券优惠</span><span>-¥{order.couponDiscount}</span></div>
                <div className="flex justify-between text-red-600"><span>积分抵扣</span><span>-¥{order.pointsDiscount}</span></div>
                <div className="flex justify-between text-red-600"><span>会员折扣</span><span>-¥{order.memberDiscount}</span></div>
                <div className="flex justify-between font-bold text-lg border-t pt-2"><span>实付金额</span><span className="text-red-600">¥{order.actualAmount}</span></div>
                <div className="border-t pt-2 text-xs text-slate-500">
                  <div className="flex justify-between"><span>平台佣金（5%）</span><span>¥{order.commission}</span></div>
                  <div className="flex justify-between"><span>商家实收</span><span>¥{order.merchantAmount}</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-[40%] h-full border-l">
          <BusinessLogicPanel
            sections={[
              {
                title: '💰 价格计算逻辑',
                content: (
                  <div className="text-sm text-slate-600 space-y-2">
                    <p className="font-medium">计算公式：</p>
                    <div className="bg-slate-50 p-3 rounded font-mono text-xs">
                      <div>房费小计 = {order.roomPrice}</div>
                      <div className="text-red-600">- 优惠券优惠 = {order.couponDiscount}</div>
                      <div className="text-red-600">- 积分抵扣 = {order.pointsDiscount}</div>
                      <div className="text-red-600">- 会员折扣 = {order.memberDiscount}</div>
                      <div className="border-t mt-1 pt-1 font-bold">= 实付金额 = {order.actualAmount}</div>
                    </div>
                  </div>
                )
              },
              {
                title: '📱 用户端展示',
                content: (
                  <div className="text-sm text-slate-600">
                    <p className="mb-2">用户在小程序/APP看到的订单详情：</p>
                    <div className="bg-white border rounded-lg p-4 space-y-2">
                      <div className="font-bold text-base">{order.hotelName}</div>
                      <div className="text-xs text-slate-500">{order.roomType}</div>
                      <div>入住：{order.checkInDate} - {order.checkOutDate}</div>
                      <div className="border-t pt-1 mt-1">
                        <div className="flex justify-between"><span>房费</span><span>¥{order.roomPrice}</span></div>
                        <div className="flex justify-between text-red-600"><span>优惠</span><span>-¥{order.couponDiscount + order.pointsDiscount + order.memberDiscount}</span></div>
                        <div className="flex justify-between font-bold"><span>实付</span><span className="text-red-600">¥{order.actualAmount}</span></div>
                      </div>
                      <div className="text-slate-500 mt-2">→ 价格明细与后台完全一致</div>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
