/**
 * 平台后台 - 会员管理类型定义
 */

/**
 * 性别枚举
 */
export enum Gender {
  MALE = 'male',   // 男
  FEMALE = 'female' // 女
}

/**
 * 性别显示名称映射
 */
export const GenderLabels: Record<Gender, string> = {
  [Gender.MALE]: '男',
  [Gender.FEMALE]: '女'
}

/**
 * 地区信息（省市维度）
 */
export interface Region {
  province: string // 省份
  city: string     // 城市
}

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
 * 会员等级折扣规则（平台端）
 */
export interface MemberLevelDiscountRule {
  id: string
  level: number // VIP等级 0-9
  levelName: string // 等级名称
  platformDiscount: number // 平台会员折扣（0.5-1.0，如0.95=95%）
  updatedAt: string
}

/**
 * 商户会员折扣配置
 */
export interface MerchantMemberDiscountConfig {
  hotelId: string
  hotelName: string
  discounts: {
    level: number // VIP等级
    levelName: string
    platformDiscount: number // 平台折扣（只读）
    weekdayDiscount: number // 平日折扣（可编辑，必须 <= platformDiscount）
    weekendDiscount: number // 周末折扣（可编辑，必须 <= platformDiscount）
    holidayDiscount: number // 节假日折扣（可编辑，必须 <= platformDiscount）
  }[]
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
 * 会员基本信息
 *
 * 注意：
 * - 昵称（nickname）：必填，可修改
 * - 姓名（realName）：选填，填写后不可改为空
 * - 性别（gender）：选填，填写后不可改为空
 * - 地区（region）：选填，填写后不可改为空
 */
export interface UserMemberInfo {
  userId: string

  // 基本信息
  nickname: string // 昵称（必填，可修改）
  realName: string | null // 真实姓名（选填，填写后不可改为空）
  gender: Gender | null // 性别（选填，填写后不可改为空）
  region: Region | null // 地区（选填，填写后不可改为空）
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

/**
 * 账号状态
 */
export type AccountStatus = 'pre_register' | 'registered' | 'disabled'

export const AccountStatusLabels: Record<AccountStatus, string> = {
  pre_register: '预注册',
  registered: '注册',
  disabled: '禁用',
}

/**
 * 获得方式
 */
export type ObtainMethod = 'nights_consume' | 'merchant_import'

export const ObtainMethodLabels: Record<ObtainMethod, string> = {
  nights_consume: '间夜消费',
  merchant_import: '商户导入',
}

/**
 * 会员信息（查询结果）
 */
export interface MemberQueryRecord {
  id: string // 唯一ID
  phone: string // 手机号
  accountStatus: AccountStatus // 账号状态
  currentLevel: number // 会员等级（正式/赠送取最大）
  formalLevel: number // 正式会员等级
  formalExpiryDate: string // 正式会员有效期至（如：2025/05/19）
  obtainMethod: ObtainMethod // 获得方式
  relatedMerchant: string // 关联商户（最新成功更新VIP的商户名）
  giftLevel: number // 赠送会员等级
  giftExpiryDate: string // 赠送会员有效期至
  giftFrom: string // 赠送人（手机号）
  updatedAt: string // 更新时间（时间戳或格式化字符串）
}

/**
 * 会员查询筛选参数
 */
export interface MemberQueryFilterParams {
  accountStatus?: AccountStatus | 'all'
  memberLevel?: number | 'all'
  merchantName?: string // 关联商户搜索
}

/**
 * 分页结果
 */
export interface PaginatedResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
