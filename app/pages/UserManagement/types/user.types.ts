/**
 * 用户管理相关类型定义
 */

// 会员等级
export enum MemberLevel {
  NORMAL = 'normal',       // 普通会员
  SILVER = 'silver',       // 银卡会员
  GOLD = 'gold',           // 金卡会员
  DIAMOND = 'diamond',     // 钻石会员
}

// 用户状态
export enum UserStatus {
  ACTIVE = 'active',       // 正常
  FROZEN = 'frozen',       // 冻结
  BANNED = 'banned',       // 封禁
}

// 用户基础信息
export interface UserBasicInfo {
  id: string
  name: string
  phone: string
  avatar?: string
  gender?: 'male' | 'female'
  birthday?: string
  idCardNumber?: string          // 身份证号(脱敏)
  isRealNameVerified: boolean    // 是否实名认证
  registeredAt: string
  lastLoginAt: string
  status: UserStatus
}

// 会员信息
export interface MembershipInfo {
  level: MemberLevel
  levelName: string              // 等级名称
  validUntil: string             // 会员有效期
  joinedAt: string               // 加入会员时间
  benefits: string[]             // 会员权益列表
  upgradeProgress: {             // 升级进度
    currentPoints: number
    requiredPoints: number
    currentNights: number
    requiredNights: number
  }
}

// 积分信息
export interface PointsInfo {
  balance: number                // 当前积分余额
  totalEarned: number            // 累计获得积分
  totalSpent: number             // 累计消费积分
  expiringPoints: number         // 即将过期积分
  expiringDate: string           // 过期日期
  recentRecords: Array<{
    id: string
    type: 'earn' | 'spend'
    amount: number
    reason: string
    createdAt: string
  }>
}

// 优惠券信息
export interface CouponInfo {
  available: number              // 可用优惠券数量
  used: number                   // 已使用数量
  expired: number                // 已过期数量
  recentCoupons: Array<{
    id: string
    name: string
    discount: number
    validUntil: string
    status: 'available' | 'used' | 'expired'
  }>
}

// 订单统计
export interface OrderStats {
  totalOrders: number            // 总订单数
  totalAmount: number            // 总消费金额
  completedOrders: number        // 完成订单数
  cancelledOrders: number        // 取消订单数
  averageAmount: number          // 平均订单金额
  recentOrders: Array<{
    id: string
    orderNumber: string
    hotelName: string
    amount: number
    status: string
    createdAt: string
  }>
}

// 退款争议信息
export interface DisputeInfo {
  refundRequestCount: number     // 退款申请次数
  approvedCount: number          // 通过次数
  rejectedCount: number          // 驳回次数
  creditScore: number            // 信用评分(0-100)
}

// 行为标签
export interface UserTags {
  preferences: string[]          // 偏好标签(商务/度假/亲子)
  consumptionLevel: string       // 消费能力(低/中/高)
  activityLevel: string          // 活跃度(低/中/高)
}

// 用户完整信息
export interface UserDetail {
  basic: UserBasicInfo
  membership: MembershipInfo
  points: PointsInfo
  coupons: CouponInfo
  orderStats: OrderStats
  dispute: DisputeInfo
  tags: UserTags
}

// 用户列表项(精简信息)
export interface UserListItem {
  id: string
  name: string
  phone: string
  memberLevel: MemberLevel
  memberLevelName: string
  pointsBalance: number
  totalOrders: number
  totalAmount: number
  registeredAt: string
  status: UserStatus
}
