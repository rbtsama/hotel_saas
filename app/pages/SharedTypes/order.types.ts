/**
 * 订单管理 - 统一类型定义
 * 修复 #001 和 #010：统一订单数据模型，完善状态流转
 */

// ==================== 订单状态 ====================

/**
 * 订单状态
 *
 * 正常流程：
 * 待支付 → 待入住 → 入住中 → 已离店 → 已完成
 *
 * 异常流程：
 * 1. 超时取消：用户超时未支付，系统自动取消
 * 2. 已取消：入住之前主动取消订单
 * 3. 退款申请：已离店后7天内可发起退款申请
 *    - 商家同意退款 → 已完成
 *    - 商家拒绝 → 争议仲裁 → 仲裁结果（退款/不退款） → 已完成
 *    - 7天后未申请退款 → 自动变为已完成
 */
export enum OrderStatus {
  /** 待支付 - 订单已创建，等待用户支付 */
  PENDING_PAYMENT = 'pending_payment',

  /** 待入住 - 已支付，等待入住日期到来 */
  PENDING_CHECKIN = 'pending_checkin',

  /** 入住中 - 用户已办理入住，正在住店 */
  CHECKED_IN = 'checked_in',

  /** 已离店 - 用户已退房，7天内可申请退款 */
  CHECKED_OUT = 'checked_out',

  /** 已完成 - 离店7天后自然完成，或退款流程结束后完成 */
  COMPLETED = 'completed',

  // ========== 异常状态 ==========

  /** 超时取消 - 用户超时未支付，系统自动取消 */
  TIMEOUT_CANCELLED = 'timeout_cancelled',

  /** 已取消 - 入住之前主动取消订单 */
  CANCELLED = 'cancelled',

  /** 退款申请 - 已离店后7天内，用户发起退款申请 */
  REFUND_REQUESTED = 'refund_requested',
}

/**
 * 订单状态显示标签
 */
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING_PAYMENT]: '待支付',
  [OrderStatus.PENDING_CHECKIN]: '待入住',
  [OrderStatus.CHECKED_IN]: '入住中',
  [OrderStatus.CHECKED_OUT]: '已离店',
  [OrderStatus.COMPLETED]: '已完成',
  [OrderStatus.TIMEOUT_CANCELLED]: '超时取消',
  [OrderStatus.CANCELLED]: '已取消',
  [OrderStatus.REFUND_REQUESTED]: '退款申请',
}

/**
 * 订单状态颜色
 */
export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING_PAYMENT]: 'orange',      // 橙色 - 待支付
  [OrderStatus.PENDING_CHECKIN]: 'blue',        // 蓝色 - 待入住
  [OrderStatus.CHECKED_IN]: 'green',            // 绿色 - 入住中
  [OrderStatus.CHECKED_OUT]: 'slate',           // 灰色 - 已离店
  [OrderStatus.COMPLETED]: 'green',             // 绿色 - 已完成
  [OrderStatus.TIMEOUT_CANCELLED]: 'red',       // 红色 - 超时取消
  [OrderStatus.CANCELLED]: 'red',               // 红色 - 已取消
  [OrderStatus.REFUND_REQUESTED]: 'orange',     // 橙色 - 退款申请
}

/**
 * 订单状态流转规则说明
 */
export const ORDER_STATUS_FLOW_DESCRIPTION = {
  normalFlow: '待支付 → 待入住 → 入住中 → 已离店 → 已完成（离店7天后）',
  timeoutCancelled: '待支付 → 超时取消（用户超时未支付）',
  cancelled: '待支付/待入住 → 已取消（入住前主动取消）',
  refundFlow: '已离店 → 退款申请（7天内） → 已完成（商家退款/仲裁结束后）',
  autoComplete: '已离店 → 已完成（7天后未申请退款自动完成）',
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
  /** 入住时间 */
  checkedInAt?: string
  /** 离店时间 */
  checkedOutAt?: string
  /** 完成时间 */
  completedAt?: string
  /** 取消时间 */
  cancelledAt?: string

  // ========== 退款信息 ==========
  /**
   * 是否有退款申请
   * 规则：已离店后7天内可申请退款
   */
  hasRefundRequest: boolean
  /**
   * 退款申请时间
   * 仅在status为REFUND_REQUESTED时有值
   */
  refundRequestedAt?: string
  /** 退款金额 */
  refundAmount?: number
  /** 退款完成时间 */
  refundedAt?: string
  /**
   * 退款申请窗口期结束时间
   * 计算：checkedOutAt + 7天
   */
  refundWindowClosedAt?: string

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

// ==================== 订单状态流转业务规则 ====================

/**
 * 订单状态流转详细说明
 *
 * 一、正常流程（5个状态）
 * ─────────────────────────────────────────────────────
 * 1. 待支付 (PENDING_PAYMENT)
 *    - 用户创建订单后的初始状态
 *    - 等待用户支付
 *    - 超时未支付 → 超时取消
 *
 * 2. 待入住 (PENDING_CHECKIN)
 *    - 用户已完成支付
 *    - 等待入住日期到来
 *    - 入住前可取消 → 已取消
 *
 * 3. 入住中 (CHECKED_IN)
 *    - 用户已办理入住手续
 *    - 正在住店期间
 *    - 离店时间到来 → 已离店
 *
 * 4. 已离店 (CHECKED_OUT)
 *    - 用户已办理退房
 *    - 进入7天退款申请窗口期
 *    - 7天内可申请退款 → 退款申请
 *    - 7天后未申请 → 已完成
 *
 * 5. 已完成 (COMPLETED)
 *    - 终态，订单结束
 *    - 来源1：已离店7天后自动完成
 *    - 来源2：退款流程结束后完成（商家退款/仲裁结束）
 *
 * 二、异常状态（3个状态）
 * ─────────────────────────────────────────────────────
 * 1. 超时取消 (TIMEOUT_CANCELLED)
 *    - 用户创建订单后超时未支付
 *    - 系统自动取消
 *    - 终态，不可恢复
 *
 * 2. 已取消 (CANCELLED)
 *    - 入住之前主动取消订单
 *    - 可取消的状态：待支付、待入住
 *    - 终态，不可恢复
 *
 * 3. 退款申请 (REFUND_REQUESTED)
 *    - 已离店后7天内，用户发起退款申请
 *    - 退款流程：
 *      a. 商家同意退款 → 退款完成 → 已完成
 *      b. 商家拒绝退款 → 争议仲裁流程 → 仲裁结果（退款/不退款） → 已完成
 *    - 最终都会转为已完成状态
 *
 * 三、状态流转图
 * ─────────────────────────────────────────────────────
 *
 *                    ┌─────────────┐
 *                    │   待支付    │
 *                    └─────┬───────┘
 *                          │
 *                ┌─────────┼─────────┐
 *                │                   │
 *           超时未支付              支付成功
 *                │                   │
 *                ▼                   ▼
 *         ┌─────────────┐     ┌─────────────┐
 *         │  超时取消   │     │   待入住    │
 *         └─────────────┘     └─────┬───────┘
 *              (终态)                │
 *                          ┌─────────┼─────────┐
 *                          │                   │
 *                      入住前取消           办理入住
 *                          │                   │
 *                          ▼                   ▼
 *                   ┌─────────────┐     ┌─────────────┐
 *                   │   已取消    │     │   入住中    │
 *                   └─────────────┘     └─────┬───────┘
 *                        (终态)                │
 *                                           办理退房
 *                                              │
 *                                              ▼
 *                                       ┌─────────────┐
 *                                       │   已离店    │
 *                                       └─────┬───────┘
 *                                             │
 *                          ┌──────────────────┼──────────────────┐
 *                          │                                     │
 *                    7天内申请退款                           7天后未申请
 *                          │                                     │
 *                          ▼                                     ▼
 *                   ┌─────────────┐                      ┌─────────────┐
 *                   │  退款申请   │                      │   已完成    │
 *                   └─────┬───────┘                      └─────────────┘
 *                         │                                   (终态)
 *              ┌──────────┼──────────┐
 *              │                     │
 *          商家同意               商家拒绝
 *              │                     │
 *              ▼                     ▼
 *        退款完成              争议仲裁流程
 *              │                     │
 *              │                  仲裁结果
 *              │              (退款/不退款)
 *              │                     │
 *              └──────────┬──────────┘
 *                         │
 *                         ▼
 *                  ┌─────────────┐
 *                  │   已完成    │
 *                  └─────────────┘
 *                      (终态)
 *
 * 四、重要业务规则
 * ─────────────────────────────────────────────────────
 * 1. 退款申请窗口期：已离店后7天内（168小时）
 * 2. 自动完成时间：已离店后7天+1秒（过了窗口期）
 * 3. 退款申请后状态：无论商家同意/拒绝，最终都转为已完成
 * 4. 争议仲裁：仅在商家拒绝退款后触发，由平台仲裁委员会处理
 * 5. 终态状态：已完成、已取消、超时取消（这些状态不可再变更）
 */
