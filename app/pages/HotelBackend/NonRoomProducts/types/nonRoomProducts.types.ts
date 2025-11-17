// 非房产品类型定义

export interface NonRoomProduct {
  id: string
  sequenceNumber: number // 编号
  productCategory: string // 产品分类
  productName: string // 产品名
  productDescription: string // 产品描述
  price: number // 价格（必需字段，0表示免费）
  pricingType: 'per_time' | 'per_hour' | 'per_person' | 'fixed' // 计价方式
  inventory?: number // 库存数量（每日可售数量）
  duration?: number // 服务时长（分钟）
  needsAppointment: boolean // 是否需要预约
  applyUseSettings: string // 应用设置（标签，如"免费使用2小时"）
  status: 'active' | 'inactive' // 产品状态

  // 积分相关（新增）
  pointsReward: number // 积分奖励（购买或赠送时奖励的积分）
  rewardType: 'purchase' | 'gift' | 'both' // 奖励类型

  createdAt: string
}

/**
 * 积分奖励类型
 * - purchase: 用户购买时奖励积分
 * - gift: 酒店赠送时奖励积分（如入住时免费送拖鞋，奖励20积分）
 * - both: 购买和赠送都奖励
 */
export type RewardType = 'purchase' | 'gift' | 'both'

export interface NonRoomProductFilterParams {
  search?: string
  productCategory?: string
}

export interface NonRoomProductFormData {
  productCategory: string
  productName: string
  productDescription: string
  price: number
  pricingType: 'per_time' | 'per_hour' | 'per_person' | 'fixed'
  inventory?: number
  duration?: number
  needsAppointment: boolean
  applyUseSettings: string
  status: 'active' | 'inactive'
  // 积分相关
  pointsReward: number
  rewardType: 'purchase' | 'gift' | 'both'
}
