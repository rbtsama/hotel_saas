/**
 * 订单管理 - 统一类型定义
 * 修复 #001 和 #010：统一订单数据模型，完善状态流转
 */

// ==================== 订单状态（完整的14种状态） ====================

/**
 * 订单状态（完整状态机）
 */
export enum OrderStatus {
  /** 待支付 */
  PENDING_PAYMENT = 'pending_payment',
  /** 待确认（已支付，等酒店确认） */
  PENDING_CONFIRM = 'pending_confirm',
  /** 已确认 */
  CONFIRMED = 'confirmed',
  /** 待分配房间 */
  PENDING_ASSIGNMENT = 'pending_assignment',
  /** 已分配 */
  ASSIGNED = 'assigned',
  /** 预到店（当天） */
  PRE_CHECKIN = 'pre_checkin',
  /** 已入住 */
  CHECKED_IN = 'checked_in',
  /** 在住 */
  IN_HOUSE = 'in_house',
  /** 预离店（当天） */
  PRE_CHECKOUT = 'pre_checkout',
  /** 已退房 */
  CHECKED_OUT = 'checked_out',
  /** 已完成 */
  COMPLETED = 'completed',
  /** 已取消 */
  CANCELLED = 'cancelled',
  /** 退款中 */
  REFUNDING = 'refunding',
  /** 已退款 */
  REFUNDED = 'refunded'
}

/**
 * 订单状态显示标签
 */
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING_PAYMENT]: '待支付',
  [OrderStatus.PENDING_CONFIRM]: '待确认',
  [OrderStatus.CONFIRMED]: '已确认',
  [OrderStatus.PENDING_ASSIGNMENT]: '待分配',
  [OrderStatus.ASSIGNED]: '已分配',
  [OrderStatus.PRE_CHECKIN]: '预到店',
  [OrderStatus.CHECKED_IN]: '已入住',
  [OrderStatus.IN_HOUSE]: '在住',
  [OrderStatus.PRE_CHECKOUT]: '预离店',
  [OrderStatus.CHECKED_OUT]: '已退房',
  [OrderStatus.COMPLETED]: '已完成',
  [OrderStatus.CANCELLED]: '已取消',
  [OrderStatus.REFUNDING]: '退款中',
  [OrderStatus.REFUNDED]: '已退款'
}

/**
 * 订单状态颜色
 */
export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING_PAYMENT]: 'yellow',
  [OrderStatus.PENDING_CONFIRM]: 'yellow',
  [OrderStatus.CONFIRMED]: 'blue',
  [OrderStatus.PENDING_ASSIGNMENT]: 'blue',
  [OrderStatus.ASSIGNED]: 'green',
  [OrderStatus.PRE_CHECKIN]: 'green',
  [OrderStatus.CHECKED_IN]: 'green',
  [OrderStatus.IN_HOUSE]: 'green',
  [OrderStatus.PRE_CHECKOUT]: 'orange',
  [OrderStatus.CHECKED_OUT]: 'gray',
  [OrderStatus.COMPLETED]: 'green',
  [OrderStatus.CANCELLED]: 'red',
  [OrderStatus.REFUNDING]: 'orange',
  [OrderStatus.REFUNDED]: 'red'
}

// ==================== 支付方式 ====================

/**
 * 支付方式
 */
export enum PaymentMethod {
  /** 微信支付 */
  WECHAT = 'wechat',
  /** 支付宝 */
  ALIPAY = 'alipay',
  /** 银行卡 */
  BANK_CARD = 'bank_card',
  /** 线下支付（前台） */
  OFFLINE = 'offline'
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PaymentMethod.WECHAT]: '微信支付',
  [PaymentMethod.ALIPAY]: '支付宝',
  [PaymentMethod.BANK_CARD]: '银行卡',
  [PaymentMethod.OFFLINE]: '线下支付'
}

// ==================== 订单主体 ====================

/**
 * 订单（统一数据模型）
 */
export interface Order {
  // ========== 基本信息 ==========
  /** 订单ID */
  id: string
  /** 订单号（显示给用户的） */
  orderNumber: string
  /** 创建时间 */
  createdAt: string

  // ========== 关联信息 ==========
  /** 用户ID */
  userId: string
  /** 用户名 */
  userName: string
  /** 用户手机号 */
  userPhone: string
  /** 酒店ID（重要：用于权限过滤） */
  hotelId: string
  /** 酒店名称 */
  hotelName: string

  // ========== 房间信息 ==========
  /** 房型ID */
  roomTypeId: string
  /** 房型名称 */
  roomTypeName: string
  /** 房间号（分配后才有） */
  roomNumber?: string
  /** 入住日期 */
  checkInDate: string
  /** 退房日期 */
  checkOutDate: string
  /** 间夜数 */
  nights: number
  /** 房间数 */
  roomCount: number
  /** 入住人数 */
  guestCount: number

  // ========== 金额信息 ==========
  /** 房费小计 */
  roomPrice: number
  /** 优惠券优惠 */
  couponDiscount: number
  /** 积分抵扣 */
  pointsDiscount: number
  /** 会员折扣 */
  memberDiscount: number
  /** 实付金额 */
  actualAmount: number
  /** 平台佣金（5%） */
  commission: number
  /** 商家实收 */
  merchantAmount: number

  // ========== 支付信息 ==========
  /** 支付方式 */
  paymentMethod?: PaymentMethod
  /** 支付时间 */
  paidAt?: string

  // ========== 状态信息 ==========
  /** 订单状态 */
  status: OrderStatus
  /** 确认时间 */
  confirmedAt?: string
  /** 分配时间 */
  assignedAt?: string
  /** 入住时间 */
  checkedInAt?: string
  /** 退房时间 */
  checkedOutAt?: string
  /** 完成时间 */
  completedAt?: string
  /** 取消时间 */
  cancelledAt?: string

  // ========== 退款信息 ==========
  /** 是否有退款申请 */
  hasRefundRequest: boolean
  /** 退款金额 */
  refundAmount?: number
  /** 退款时间 */
  refundedAt?: string

  // ========== 备注信息 ==========
  /** 用户备注 */
  userNote?: string
  /** 酒店备注（内部） */
  hotelNote?: string
}

// ==================== 查询参数 ====================

/**
 * 订单列表筛选参数
 */
export interface OrderFilterParams {
  /** 搜索关键词（订单号/用户名/手机号） */
  search?: string
  /** 酒店ID（酒店后台必填，平台后台可选） */
  hotelId?: string
  /** 房型 */
  roomTypeId?: string
  /** 订单状态（多选） */
  status?: OrderStatus[]
  /** 入住日期范围-开始 */
  checkInDateStart?: string
  /** 入住日期范围-结束 */
  checkInDateEnd?: string
  /** 创建日期范围-开始 */
  createdAtStart?: string
  /** 创建日期范围-结束 */
  createdAtEnd?: string
  /** 是否有退款申请 */
  hasRefundRequest?: boolean
  /** 分页 */
  page?: number
  pageSize?: number
  /** 排序 */
  sortBy?: 'createdAt' | 'checkInDate' | 'actualAmount'
  sortOrder?: 'asc' | 'desc'
}

/**
 * 订单列表响应
 */
export interface OrderListResponse {
  orders: Order[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ==================== 权限相关 ====================

/**
 * 用户角色
 */
export enum UserRole {
  /** 超级管理员（平台） */
  SUPER_ADMIN = 'super_admin',
  /** 平台运营 */
  PLATFORM_OPERATOR = 'platform_operator',
  /** 酒店管理员 */
  HOTEL_ADMIN = 'hotel_admin',
  /** 酒店前台 */
  HOTEL_STAFF = 'hotel_staff'
}

/**
 * 当前用户信息（用于权限判断）
 */
export interface CurrentUser {
  id: string
  role: UserRole
  /** 酒店ID（酒店用户必有） */
  hotelId?: string
}

// ==================== 退款相关 ====================

/**
 * 退款状态
 */
export enum RefundStatus {
  /** 待商家审核 */
  PENDING = 'pending',
  /** 商家同意 */
  APPROVED_BY_MERCHANT = 'approved_by_merchant',
  /** 商家拒绝，用户可申诉 */
  REJECTED_BY_MERCHANT = 'rejected_by_merchant',
  /** 用户申诉中 */
  APPEALING = 'appealing',
  /** 平台仲裁中 */
  PLATFORM_REVIEWING = 'platform_reviewing',
  /** 平台同意退款 */
  APPROVED_BY_PLATFORM = 'approved_by_platform',
  /** 平台拒绝退款 */
  REJECTED_BY_PLATFORM = 'rejected_by_platform',
  /** 退款中 */
  REFUNDING = 'refunding',
  /** 已退款 */
  REFUNDED = 'refunded'
}

/**
 * 退款申请
 */
export interface RefundRequest {
  /** 退款ID */
  id: string
  /** 订单ID */
  orderId: string
  /** 订单号 */
  orderNumber: string
  /** 酒店ID */
  hotelId: string
  /** 酒店名称 */
  hotelName: string
  /** 用户ID */
  userId: string
  /** 用户名 */
  userName: string
  /** 用户手机 */
  userPhone: string

  /** 申请时间 */
  createdAt: string
  /** 退款原因 */
  reason: string
  /** 申请退款金额 */
  requestAmount: number
  /** 证据图片 */
  evidenceImages: string[]

  /** 退款状态 */
  status: RefundStatus

  /** 商家处理时间 */
  merchantReviewedAt?: string
  /** 商家处理人 */
  merchantReviewerName?: string
  /** 商家处理意见（同意/拒绝原因） */
  merchantResponse?: string

  /** 用户申诉时间 */
  appealedAt?: string
  /** 用户申诉理由 */
  appealReason?: string

  /** 平台处理时间 */
  platformReviewedAt?: string
  /** 平台处理人 */
  platformReviewerName?: string
  /** 平台裁决意见 */
  platformDecision?: string

  /** 实际退款金额 */
  actualRefundAmount?: number
  /** 退款完成时间 */
  refundedAt?: string
}
