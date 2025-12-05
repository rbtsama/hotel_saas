// 客诉退款类型定义

export interface RefundRequest {
  id: string
  requestTime: string // 客诉时间
  orderNumber: string // 订单号
  guestPhone: string // 订房手机号
  paidAmount: number // 客人支付金额
  refundAmount: number // 申请退款金额
  processStatus: RefundProcessStatus // 处理进度
  createdAt: string
  refundReason?: string // 退款原因
  guestName?: string // 客人姓名
  checkInDate?: string // 入住日期
  checkOutDate?: string // 离店日期
  roomType?: string // 房型
  timeline?: RefundTimeline[] // 处理时间线
}

// 退款处理时间线
export interface RefundTimeline {
  time: string
  status: string
  operator?: string
  note?: string
}

export type RefundProcessStatus =
  | 'pending' // 待审核
  | 'approved' // 已批准
  | 'rejected' // 已拒绝
  | 'refunded' // 已退款
  | 'platform-approved' // 平台欠款已退款
  | 'platform-refund' // 平台支持退款
  | 'merchant-refund' // 客人撤诉

export interface RefundFilterParams {
  orderNumber?: string
  guestPhone?: string
  startDate?: string
  endDate?: string
  processStatus?: RefundProcessStatus
  page?: number
  pageSize?: number
}

export interface RefundListResponse {
  refunds: RefundRequest[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 处理进度标签
export const REFUND_STATUS_LABELS = {
  'pending': '待审核',
  'approved': '已批准',
  'rejected': '已拒绝',
  'refunded': '已退款',
  'platform-approved': '平台欠款已退款',
  'platform-refund': '平台支持退款',
  'merchant-refund': '客人撤诉'
} as const
