/**
 * 商户端 - 代客下单类型定义
 */

/**
 * 代客下单状态
 */
export enum AgentOrderStatus {
  PENDING_PAYMENT = 'pending_payment', // 待支付
  PAID = 'paid', // 已支付
  CHECKED_IN = 'checked_in', // 已入住
  CHECKED_OUT = 'checked_out', // 已离店
  EXPIRED = 'expired', // 已过期
}

/**
 * 代客下单信息
 */
export interface AgentOrder {
  id: string
  orderId: string // 订单号（DKD开头）
  storeId: string
  storeName: string
  roomTypeName: string
  checkInDate: string
  checkOutDate: string
  nights: number
  marketPrice: number // 门市价
  specialPrice: number // 专属特惠价
  specialRequirements: string[] // 特殊要求
  notes?: string // 备注
  qrCodeUrl?: string // 付款二维码URL
  customerName?: string // 客户姓名
  customerPhone?: string // 客户手机号
  status: AgentOrderStatus
  validUntil: string // 有效期（7天）
  createdAt: string
  paidAt?: string
}

/**
 * 代客下单创建表单
 */
export interface AgentOrderCreateForm {
  roomTypeId: string
  roomTypeName: string
  checkInDate: string
  checkOutDate: string
  marketPrice: number
  specialPrice: number
  specialRequirements: string[]
  notes?: string
}
