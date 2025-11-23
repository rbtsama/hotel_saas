// 会员等级类型定义

export interface MemberLevel {
  id: string
  level: number // VIP等级：0-9（VIP0-VIP9）
  displayName: string // 展示名称（可修改）

  // 升级和保级规则
  upgradeNights: number // 升级间夜：在本等级完成X次后升级到下一级
  maintainNights: number // 保级间夜：有效期内完成小于X次会降1级
  validityDays: number // 有效期（天）：达到本等级后+X天有效

  // 折扣规则
  discountMin: number // 折扣范围最小值（百分比，非负整数）
  discountMax: number // 折扣范围最大值（百分比，非负整数，必须 ≥ discountMin）

  // 积分汇率（消费 1 元 = X 积分）
  pointsRate: number // 积分汇率（支持2位小数的正数）

  // 赠送规则
  giftTrialCount: number // 赠送体验次数（≥0整数）
  giftValidityDays: number // 赠送有效期（天）（>0整数）
  cardImage?: string // 会员卡图片URL

  status: 'active' | 'inactive' // 状态
  updatedAt?: string
}

export interface MemberLevelFilterParams {
  level?: number
  status?: 'active' | 'inactive'
}

// 会员等级编辑表单
export interface MemberLevelFormData {
  displayName: string
  upgradeNights: number
  maintainNights: number
  validityDays: number
  discountMin: number
  discountMax: number
  pointsRate: number
  giftTrialCount: number
  giftValidityDays: number
  cardImage?: string
  status: 'active' | 'inactive'
}
