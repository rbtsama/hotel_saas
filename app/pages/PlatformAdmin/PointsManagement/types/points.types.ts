/**
 * 平台后台 - 积分管理类型定义
 */

/**
 * 积分基础规则配置
 */
export interface PointsBaseRuleConfig {
  id: string
  registerRewardPoints: number // 注册奖励积分
  inviteRewardPoints: number // 邀请奖励积分
  baseExchangeRate: number // 基础兑换汇率（1积分=X元）
  updatedAt: string
  updatedBy: string
}

/**
 * 会员等级积分汇率配置
 */
export interface MemberLevelPointsRate {
  id: string
  level: number // VIP等级 0-9
  levelName: string // 等级名称
  rateMultiplier: number // 积分汇率倍数（1.0-3.0）
  updatedAt: string
}

/**
 * 积分发放类型
 */
export enum PointsIssueType {
  REGISTER = 'register', // 注册奖励
  INVITE = 'invite', // 邀请奖励
  ECO_REWARD = 'eco_reward', // 环保奖励
}

/**
 * 积分使用类型
 */
export enum PointsUsageType {
  DEDUCT_ROOM_FEE = 'deduct_room_fee', // 抵扣房费
  REDEEM_BREAKFAST = 'redeem_breakfast', // 兑换早餐
  REDEEM_SERVICE = 'redeem_service', // 兑换服务
}

/**
 * 积分统计数据
 */
export interface PointsStatistics {
  totalIssued: number // 累计发放积分
  totalUsed: number // 累计使用积分
  currentCirculation: number // 当前流通积分
  issueBreakdown: {
    type: PointsIssueType
    typeName: string
    amount: number
    percentage: number
  }[]
  usageBreakdown: {
    type: PointsUsageType
    typeName: string
    amount: number
    percentage: number
  }[]
}

/**
 * 用户积分账户
 */
export interface UserPointsAccount {
  userId: string
  userName: string
  phone: string
  memberLevel: number
  memberLevelName: string
  currentPoints: number
  pointsRate: number // 当前积分汇率倍数
  totalNights: number // 累计间夜数
  createdAt: string
}

/**
 * 积分明细记录
 */
export interface PointsRecord {
  id: string
  userId: string
  userName: string
  type: PointsIssueType | PointsUsageType
  typeName: string
  amount: number // 正数为增加，负数为减少
  balance: number // 操作后余额
  description: string
  createdAt: string
}
