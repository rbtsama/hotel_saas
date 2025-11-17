/**
 * 酒店经营管理 - 类型定义
 * 包含：经营数据、统计报表、对账、结算
 */

// ==================== 经营数据概览 ====================

/**
 * 经营数据概览（Dashboard）
 */
export interface BusinessOverview {
  /** 今日数据 */
  today: DailyData
  /** 本月数据 */
  thisMonth: MonthlyData
  /** 待办事项 */
  todos: TodoSummary
}

/**
 * 日数据
 */
export interface DailyData {
  date: string
  /** 订单数 */
  orderCount: number
  /** 入住数 */
  checkInCount: number
  /** 退房数 */
  checkOutCount: number
  /** 营业收入 */
  revenue: number
  /** 平台佣金 */
  commission: number
  /** 实际收入 */
  netRevenue: number
  /** 出租率 */
  occupancyRate: number
  /** 平均房价 */
  averageRoomRate: number
}

/**
 * 月数据
 */
export interface MonthlyData {
  month: string
  /** 订单总数 */
  totalOrders: number
  /** 总收入 */
  totalRevenue: number
  /** 总佣金 */
  totalCommission: number
  /** 净收入 */
  netRevenue: number
  /** 平均出租率 */
  avgOccupancyRate: number
  /** 间夜数 */
  roomNights: number
  /** RevPAR（每间可售房收入） */
  revPAR: number
}

/**
 * 待办事项汇总
 */
export interface TodoSummary {
  /** 待确认订单 */
  pendingConfirm: number
  /** 待处理退款 */
  pendingRefund: number
  /** 待回复评价 */
  pendingReview: number
  /** 今日入住 */
  todayCheckIn: number
  /** 今日退房 */
  todayCheckOut: number
}

// ==================== 经营统计 ====================

/**
 * 经营统计报表
 */
export interface BusinessStatistics {
  /** 日期范围 */
  dateRange: {
    start: string
    end: string
  }
  /** 订单统计 */
  orderStats: OrderStatistics
  /** 收入统计 */
  revenueStats: RevenueStatistics
  /** 房型统计 */
  roomTypeStats: RoomTypeStatistics[]
  /** 趋势数据 */
  trendData: TrendData[]
}

/**
 * 订单统计
 */
export interface OrderStatistics {
  totalOrders: number
  completedOrders: number
  cancelledOrders: number
  refundedOrders: number
  completionRate: number // 完成率
  cancellationRate: number // 取消率
}

/**
 * 收入统计
 */
export interface RevenueStatistics {
  /** 总收入 */
  totalRevenue: number
  /** 平台佣金 */
  totalCommission: number
  /** 净收入 */
  netRevenue: number
  /** 优惠券优惠 */
  couponDiscount: number
  /** 积分抵扣 */
  pointsDiscount: number
  /** 会员折扣 */
  memberDiscount: number
}

/**
 * 房型统计
 */
export interface RoomTypeStatistics {
  roomTypeName: string
  orderCount: number
  revenue: number
  occupancyRate: number
}

/**
 * 趋势数据（每日）
 */
export interface TrendData {
  date: string
  orderCount: number
  revenue: number
  occupancyRate: number
}

// ==================== 财务对账 ====================

/**
 * 财务对账单
 */
export interface FinancialStatement {
  /** 对账单ID */
  id: string
  /** 对账月份 */
  month: string
  /** 订单明细 */
  orders: OrderFinancialDetail[]
  /** 汇总 */
  summary: FinancialSummary
  /** 状态 */
  status: 'pending' | 'confirmed' | 'settled'
  /** 创建时间 */
  createdAt: string
  /** 确认时间 */
  confirmedAt?: string
  /** 结算时间 */
  settledAt?: string
}

/**
 * 订单财务明细
 */
export interface OrderFinancialDetail {
  orderNumber: string
  checkInDate: string
  checkOutDate: string
  roomTypeName: string
  actualAmount: number // 实付金额
  commission: number // 平台佣金
  merchantAmount: number // 商家实收
}

/**
 * 财务汇总
 */
export interface FinancialSummary {
  /** 订单总数 */
  totalOrders: number
  /** 总收入 */
  totalRevenue: number
  /** 总佣金 */
  totalCommission: number
  /** 商家总实收 */
  totalMerchantAmount: number
  /** 佣金率 */
  commissionRate: number
}

// ==================== 结算管理 ====================

/**
 * 结算记录
 */
export interface Settlement {
  /** 结算ID */
  id: string
  /** 结算月份 */
  month: string
  /** 结算金额 */
  amount: number
  /** 结算状态 */
  status: 'pending' | 'processing' | 'completed'
  /** 银行账号 */
  bankAccount: string
  /** 申请时间 */
  requestedAt: string
  /** 到账时间 */
  settledAt?: string
  /** 备注 */
  note?: string
}

// ==================== 查询参数 ====================

/**
 * 经营统计查询参数
 */
export interface BusinessStatsParams {
  startDate: string
  endDate: string
  groupBy?: 'day' | 'week' | 'month'
}
