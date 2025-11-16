// 会员等级类型定义

export interface MemberLevel {
  id: string
  isDefault: boolean // 是否默认
  levelName: string // 会员等级名称
  upgradeCondition: string // 获得等级条件
  levelBenefits: string // 会员权益
  validityPeriod: string // 等级有效期
  requiredNights: number // 预订订单要求（住宿次数）
  discountRangeMin: number // 折扣范围最小值（如 80）
  discountRangeMax: number // 折扣范围最大值（如 95）
  discountPercentage: number // 折扣百分比（如 85）
  status: 'active' | 'inactive' // 状态
  createdAt: string
}

export interface MemberLevelFilterParams {
  levelName?: string
  status?: 'active' | 'inactive'
}
