/**
 * 平台后台 - 积分管理类型定义
 */

/**
 * 积分基础规则配置
 */
export interface PointsBaseRuleConfig {
  id: string
  registerRewardPoints: number // 注册奖励积分（可配置）
  inviteRewardPoints: number // 邀请奖励积分（可配置，受邀人首单离店触发）
  baseExchangeRate: number // 基础兑换汇率（X积分=1元，可配置）
  maxDeductionPercent: number // 最大抵扣比例（0-100，如30表示30%）
  expiryYears: number // 积分有效期（次年年末过期，固定为1）
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
 * 邀请来源类型
 */
export enum InviteSource {
  USER = 'user',           // C端用户邀请
  MERCHANT = 'merchant',   // 商户邀请
}

/**
 * 积分发放类型
 */
export enum PointsIssueType {
  REGISTER = 'register', // 注册奖励
  INVITE = 'invite', // 邀请奖励（受邀人首单离店触发）
  ECO_REWARD = 'eco_reward', // 环保奖励（离店后发放）
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
  inviteSource?: InviteSource // 邀请来源（仅注册奖励时有值）
  createdAt: string
  expiresAt?: string // 过期时间（获得积分时计算，次年年末）
}
