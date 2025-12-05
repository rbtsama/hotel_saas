/**
 * 会员服务相关类型定义
 */

/**
 * 积分服务类型
 */
export enum PointsServiceType {
  ECO_REWARD = 'eco_reward', // 环保奖励（离店后发放）
  VALUE_ADDED = 'value_added', // 增值服务（下单时扣除）
}

/**
 * 积分服务项
 */
export interface PointsServiceItem {
  id: string
  type: PointsServiceType
  typeName: string
  serviceName: string // 服务名称（如"自带拖鞋"）
  pointsAmount: number // 积分数量（环保奖励为负数，增值服务为正数）
  description?: string // 服务说明
  enabled: boolean // 是否启用
  createdAt: string
  updatedAt: string
}

/**
 * 积分服务配置
 */
export interface PointsServiceConfig {
  storeId: string
  storeName: string
  ecoRewards: PointsServiceItem[] // 环保奖励列表
  valueAddedServices: PointsServiceItem[] // 增值服务列表
}

/**
 * VIP等级折扣配置
 */
export interface VIPLevelDiscount {
  id: string
  level: number
  levelName: string
  platformDiscount: number // 平台会员折扣（只读，商户不可修改）
  mondayDiscount: number    // 周一折扣（可编辑，必须 <= platformDiscount）
  tuesdayDiscount: number   // 周二折扣（可编辑，必须 <= platformDiscount）
  wednesdayDiscount: number // 周三折扣（可编辑，必须 <= platformDiscount）
  thursdayDiscount: number  // 周四折扣（可编辑，必须 <= platformDiscount）
  fridayDiscount: number    // 周五折扣（可编辑，必须 <= platformDiscount）
  saturdayDiscount: number  // 周六折扣（可编辑，必须 <= platformDiscount）
  sundayDiscount: number    // 周日折扣（可编辑，必须 <= platformDiscount）
  holidayDiscount: number   // 节假日折扣（可编辑，必须 <= platformDiscount，优先级最高）
  updatedAt: string
}

/**
 * 商户VIP折扣配置
 */
export interface MerchantVIPDiscountConfig {
  storeId: string
  storeName: string
  discounts: VIPLevelDiscount[]
}

/**
 * 邀请状态
 */
export type InviteStatus = 'pending' | 'accepted' | 'rejected' | 'expired'

/**
 * 邀请记录
 */
export interface InviteRecord {
  id: string

  // 赠送信息
  inviteeId: string // 受邀人用户ID（6位数字格式）
  giftedVipLevel: number // 赠送的VIP等级（1-3）
  trialDays: number // 体验期限（天）

  // 时间信息
  invitedAt: string // 赠送时间
  acceptedAt: string | null // 接受时间
  effectiveAt: string | null // 生效时间（接受后次日0点）
  expiresAt: string | null // 到期时间

  // 状态
  status: InviteStatus // 邀请状态
}
