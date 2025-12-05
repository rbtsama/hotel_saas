/**
 * 平台后台 - 积分增值服务类型定义
 */

/**
 * 积分奖励服务项
 */
export interface PointsRewardItem {
  id: string
  序号: number // 排序序号
  serviceName: string // 服务名称
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
  序号: number // 排序序号
  serviceName: string // 服务名称
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
  pointsAmount: number // 积分数量（奖励或消耗）
  status: 'active' | 'inactive'
}

/**
 * 积分基础规则配置
 */
export interface PointsBaseRule {
  id: string
  registerReward: number // 注册奖励（积分数）
  inviterReward: number // 邀请人奖励（积分数）
  vipMultipliers: Record<string, number> // VIP0-9各等级的入住返还倍数
  exchangeRate: number // 多少积分=1元
  maxDeductionRatio: number // 最大抵扣比例（百分比 0-100）
  validityMonths: number // 有效期（月）
  updatedBy: string // 最后更新人
  updatedAt: string
}

/**
 * 用户积分账户
 */
export interface UserPointsAccount {
  id: string
  userId: string
  phoneNumber: string
  userName: string
  totalPoints: number // 总积分
  availablePoints: number // 可用积分
  frozenPoints: number // 冻结积分
  expiredPoints: number // 已过期积分
  vipLevel: number // VIP等级（0-9）
  lastActivityAt: string
  createdAt: string
}

/**
 * 积分变动记录
 */
export interface PointsChangeLog {
  id: string
  userId: string
  phoneNumber: string
  userName: string
  operationType: 'earn' | 'deduct' | 'expire' | 'adjust' // 操作类型：获得/扣减/过期/调整
  pointsAmount: number // 变动积分数
  relatedOrderId?: string // 关联订单ID（可选）
  relatedServiceId?: string // 关联服务ID（可选）
  remark: string // 备注说明
  operator?: string // 操作员（手动调整时有）
  balanceBefore: number // 变动前余额
  balanceAfter: number // 变动后余额
  operatedAt: string
}

/**
 * 操作日志记录
 */
export interface OperationLog {
  id: string
  operationType: string // 操作类型：编辑配置/新增规则/删除规则/手动调整等
  operationDetails: string // 操作详情
  targetId?: string // 目标ID（关联的规则/用户ID等）
  operator: string // 操作员
  operatedAt: string
}
