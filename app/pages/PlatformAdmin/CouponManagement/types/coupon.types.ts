/**
 * 优惠券管理 - 类型定义
 */

// 优惠券类型
export type CouponType = 'full_reduction' | 'discount' | 'instant_reduction'

// 优惠券状态
export type CouponStatus = 'enabled' | 'disabled'

// 发放类型
export type DistributionType = 'registration' | 'checkout' | 'manual_vip' | 'manual_phone'

// 发放方式
export type ManualDistributionMode = 'by_phone' | 'by_vip_level'

/**
 * 优惠券
 */
export interface Coupon {
  id: string // cp1000开始
  name: string // 用户可见名称
  type: CouponType
  // 使用门槛（满减券）
  threshold?: number
  // 减免金额（满减券/立减券）
  amount?: number
  // 折扣率（折扣券）1-99表示几折
  discount?: number
  // 最高优惠金额（折扣券）
  maxDiscount?: number
  // 短信通知开关
  smsNotify: boolean
  // 平台承担比例（0-100）
  platformRatio: number
  // 商户承担比例（自动计算）
  merchantRatio: number
  // 有效天数（0=永久，其他=发放后N天23:59过期）
  validDays: number
  // 备注说明（仅后台可见）
  remark?: string
  // 状态
  status: CouponStatus
  // 创建时间
  createdAt: string
  // 创建人
  createdBy: string
}

/**
 * 优惠券筛选参数
 */
export interface CouponFilterParams {
  search?: string
  type?: CouponType | 'all'
  status?: CouponStatus | 'all'
  createdFrom?: string
  createdTo?: string
}

/**
 * 场景发放配置
 */
export interface SceneDistribution {
  id: string
  // 场景类型
  scene: 'registration' | 'checkout'
  // 场景名称
  sceneName: string
  // 触发时机描述
  triggerDescription: string
  // 关联优惠券ID
  couponId: string | null
  // 关联优惠券名称（用于显示）
  couponName: string | null
  // 关联优惠券备注（用于显示）
  couponRemark: string | null
  // 短信通知开关
  smsNotify: boolean
  // 状态
  status: 'enabled' | 'disabled'
}

/**
 * 优惠券记录
 */
export interface CouponRecord {
  // 优惠券ID
  couponId: string
  // 优惠券类型
  couponType: CouponType
  // 优惠券名称
  couponName: string
  // 发放类型
  distributionType: DistributionType
  // 用户手机号（单个手机号展示手机号，多个手机号展示"多手机号"）
  userPhone: string
  // VIP等级
  vipLevel: string
  // 操作时间
  operatedAt: string
  // 操作人（账号名）
  operatedBy: string
}

/**
 * VIP等级
 */
export interface VipLevel {
  id: string
  name: string
  level: number
}
