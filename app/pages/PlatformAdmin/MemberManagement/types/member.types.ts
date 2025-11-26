/**
 * 平台后台 - 会员管理类型定义
 */

/**
 * 会员等级升级规则
 */
export interface MemberLevelUpgradeRule {
  id: string
  level: number // VIP等级 0-9
  levelName: string // 等级名称
  upgradeNights: number // 升级所需累计间夜数
  validityDays: number // 会员有效期（天）
  maintainNights: number // 保级所需间夜数
  updatedAt: string
}

/**
 * 会员等级折扣规则
 */
export interface MemberLevelDiscountRule {
  id: string
  level: number // VIP等级 0-9
  levelName: string // 等级名称
  platformBaseDiscount: number // 平台基础折扣（0.5-1.0）
  merchantDiscountMin: number // 商户折扣最低值
  merchantDiscountMax: number // 商户折扣最高值（等于平台基础折扣）
  updatedAt: string
}

/**
 * 体验会员配置
 */
export interface TrialMemberConfig {
  id: string
  userGiftTrialDays: number // 用户赠送体验会员期限（天，可配置）
  merchantGiftTrialDays: number // 商家赠送体验会员期限（天，可配置）
  merchantMaxGiftLevel: number // 商家可赠送的最高等级（固定为3）
  updatedAt: string
  updatedBy: string
}

/**
 * 用户会员信息
 */
export interface UserMemberInfo {
  userId: string
  userName: string
  phone: string

  // 当前展示等级（体验和正式中取高值）
  currentLevel: number
  currentLevelName: string

  // 正式会员
  formalLevel: number // 正式会员等级
  formalValidityDate: string // 正式会员有效期

  // 体验会员
  trialLevel: number | null // 体验会员等级（null=无体验会员）
  trialValidityDate: string | null // 体验会员有效期

  // 间夜计数器
  totalNights: number // 累计总间夜（只增不减，用于升级）
  yearUpgradeNights: number // 当年升级间夜（每年1月1日清零）
  maintainNights: number // 保级间夜（升级后清零，年末检测后清零）

  // 年度标识
  upgradedThisYear: boolean // 当年是否已升级（true=无需保级）

  validityDate: string // 会员有效期（正式或体验中较晚的日期）
  pointsBalance: number // 积分余额
  registeredAt: string
}

/**
 * 用户间夜记录
 */
export interface UserNightRecord {
  id: string
  orderId: string
  hotelName: string
  checkInDate: string
  checkOutDate: string
  nights: number
  createdAt: string
}

/**
 * 会员等级调整记录
 */
export interface MemberLevelAdjustRecord {
  id: string
  userId: string
  userName: string
  fromLevel: number
  toLevel: number
  adjustType: 'upgrade' | 'downgrade' | 'manual'
  adjustTypeName: string
  reason: string
  operator: string
  createdAt: string
}
