/**
 * 商户端 - 订单列表模块类型
 *
 * 核心改动：废弃本地4维状态模型，统一导入SharedTypes
 */

// ========== 导入SharedTypes统一类型 ==========
export type {
  Order,
  OrderStatus,
  OrderFilterParams,
  OrderListResponse,
  PaymentStatus,
  CheckInStatus
} from '@/pages/SharedTypes/order.types'

export {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  PAYMENT_STATUS_LABELS,
  CHECK_IN_STATUS_LABELS
} from '@/pages/SharedTypes/order.types'

// ========== 本地特有类型（如果需要扩展） ==========

/**
 * 商户端特定的筛选参数（扩展自SharedTypes）
 * 目前与SharedTypes一致，预留扩展空间
 */
export interface OrderListFilterParams {
  roomType?: string
  startDate?: string
  endDate?: string
  paymentStatus?: string
  checkInStatus?: string
  refundStatus?: string
  page?: number
  pageSize?: number
}
