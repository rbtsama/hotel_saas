/**
 * 平台后台 - 积分增值服务类型定义
 */

/**
 * 积分奖励服务项
 */
export interface PointsRewardItem {
  id: string
  serviceName: string // 服务名称
  serviceDescription: string // 服务说明
  pointsReward: number // 积分奖励（正整数）
  status: 'active' | 'inactive' // 状态
  createdAt: string
  updatedAt?: string
}

/**
 * 积分换购服务项
 */
export interface PointsExchangeItem {
  id: string
  serviceName: string // 服务名称
  serviceDescription: string // 服务说明
  pointsCost: number // 积分消耗（正整数）
  status: 'active' | 'inactive' // 状态
  createdAt: string
  updatedAt?: string
}

/**
 * 服务表单数据
 */
export interface ServiceFormData {
  serviceName: string
  serviceDescription: string
  pointsAmount: number // 积分数量（奖励或消耗）
  status: 'active' | 'inactive'
}
