/**
 * 积分调整功能类型定义
 */

/**
 * 用户积分信息
 */
export interface UserPointsInfo {
  userId: string
  userName: string
  phone: string
  memberLevel: string // 会员等级（如VIP1）
  currentPoints: number // 当前积分余额
  totalEarned: number // 累计获得积分
  totalSpent: number // 累计消耗积分
  lastUpdateTime: string // 最后更新时间
}

/**
 * 积分明细记录
 */
export interface PointsDetailRecord {
  id: string
  type: 'earn' | 'spend' | 'adjust' // 类型：获得、消费、平台调整
  typeLabel: string // 类型名称
  amount: number // 积分数量（正数为增加，负数为减少）
  balance: number // 操作后余额
  description: string // 说明
  operator: string // 操作人
  createdAt: string // 创建时间
}

/**
 * 积分调整操作类型
 */
export type AdjustmentType = 'increase' | 'decrease'

/**
 * 积分调整表单数据
 */
export interface PointsAdjustmentFormData {
  userId: string
  type: AdjustmentType
  amount: number
  reason: string
}
