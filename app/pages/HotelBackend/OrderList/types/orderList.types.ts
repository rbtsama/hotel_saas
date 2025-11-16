// 订单列表类型定义

export interface Order {
  id: string // 订单号
  orderNumber: string // 订单编号
  guestName: string // 订房人姓名
  guestPhone: string // 订房人手机号
  roomType: string // 房型
  checkInDate: string // 入住日期 YYYY-MM-DD
  checkOutDate: string // 离店日期 YYYY-MM-DD
  totalAmount: number // 支付金额
  orderStatus: OrderStatus // 订单状态
  paymentStatus: PaymentStatus // 支付状态
  checkInStatus: CheckInStatus // 入住状态
  refundStatus: RefundStatus // 退款状态
  createdAt: string // 下单时间
  hasRefundRequest: boolean // 是否有退款申请（红点标记）
}

export type OrderStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'partial-refund'
export type CheckInStatus = 'not-checked-in' | 'checked-in' | 'checked-out'
export type RefundStatus = 'no-refund' | 'refund-pending' | 'refunded'

export interface OrderListFilterParams {
  roomType?: string
  startDate?: string
  endDate?: string
  paymentStatus?: PaymentStatus
  checkInStatus?: CheckInStatus
  refundStatus?: RefundStatus
  page?: number
  pageSize?: number
}

export interface OrderListResponse {
  orders: Order[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 订单状态标签配置
export const ORDER_STATUS_LABELS = {
  pending: '待确认',
  confirmed: '已确认',
  cancelled: '已取消',
  completed: '已完成'
} as const

export const PAYMENT_STATUS_LABELS = {
  unpaid: '未支付',
  paid: '已支付',
  refunded: '已退款',
  'partial-refund': '部分退款'
} as const

export const CHECK_IN_STATUS_LABELS = {
  'not-checked-in': '待入住',
  'checked-in': '待入住', // 根据截图，已确认也显示"待入住"
  'checked-out': '已入住'
} as const

export const REFUND_STATUS_LABELS = {
  'no-refund': '无退款',
  'refund-pending': '退款中',
  'refunded': '已退款'
} as const
