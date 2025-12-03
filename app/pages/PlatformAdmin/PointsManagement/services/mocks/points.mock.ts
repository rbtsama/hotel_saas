/**
 * 平台后台 - 积分管理Mock数据
 */

import type { PointsBaseRule, UserPointsAccount, PointsChangeLog, OperationLog } from '../../types/valueAddedService.types'

/**
 * 积分基础规则配置Mock
 */
export const mockPointsBaseRule: PointsBaseRule = {
  id: 'rule_001',
  registerReward: 100, // 注册奖励100积分
  inviterReward: 50, // 邀请人奖励50积分
  vipMultipliers: {
    'VIP0': 1.0,
    'VIP1': 1.2,
    'VIP2': 1.4,
    'VIP3': 1.6,
    'VIP4': 1.8,
    'VIP5': 2.0,
    'VIP6': 2.3,
    'VIP7': 2.6,
    'VIP8': 2.9,
    'VIP9': 3.2,
  },
  exchangeRate: 100, // 100积分 = 1元
  maxDeductionRatio: 20, // 最大抵扣20%
  validityMonths: 12, // 有效期12个月
  updatedBy: '兔子',
  updatedAt: '2025/01/22 14:30:00',
}

/**
 * 用户积分账户Mock数据
 */
export const mockUserPointsAccounts: UserPointsAccount[] = [
  {
    id: 'account_001',
    userId: 'user_001',
    phoneNumber: '13800138000',
    userName: '张三',
    totalPoints: 5800,
    availablePoints: 5200,
    frozenPoints: 400,
    expiredPoints: 200,
    vipLevel: 3,
    lastActivityAt: '2025/01/22 10:30:15',
    createdAt: '2024/06/15 09:20:00',
  },
  {
    id: 'account_002',
    userId: 'user_002',
    phoneNumber: '13900139000',
    userName: '李四',
    totalPoints: 12300,
    availablePoints: 11800,
    frozenPoints: 200,
    expiredPoints: 300,
    vipLevel: 5,
    lastActivityAt: '2025/01/21 15:45:22',
    createdAt: '2024/05/10 14:30:00',
  },
  {
    id: 'account_003',
    userId: 'user_003',
    phoneNumber: '13700137000',
    userName: '王五',
    totalPoints: 2400,
    availablePoints: 2200,
    frozenPoints: 100,
    expiredPoints: 100,
    vipLevel: 1,
    lastActivityAt: '2025/01/20 11:20:30',
    createdAt: '2024/08/22 10:00:00',
  },
  {
    id: 'account_004',
    userId: 'user_004',
    phoneNumber: '13600136000',
    userName: '赵六',
    totalPoints: 18900,
    availablePoints: 18500,
    frozenPoints: 200,
    expiredPoints: 200,
    vipLevel: 7,
    lastActivityAt: '2025/01/22 09:15:45',
    createdAt: '2024/03/08 08:30:00',
  },
  {
    id: 'account_005',
    userId: 'user_005',
    phoneNumber: '13500135000',
    userName: '孙七',
    totalPoints: 3600,
    availablePoints: 3400,
    frozenPoints: 150,
    expiredPoints: 50,
    vipLevel: 2,
    lastActivityAt: '2025/01/19 16:20:10',
    createdAt: '2024/07/05 11:45:00',
  },
]

/**
 * 积分变动记录Mock数据
 */
export const mockPointsChangeLogs: PointsChangeLog[] = [
  {
    id: 'log_001',
    userId: 'user_001',
    phoneNumber: '13800138000',
    userName: '张三',
    operationType: 'earn',
    pointsAmount: 100,
    relatedOrderId: 'order_20250122001',
    remark: '订单入住返还',
    balanceBefore: 5100,
    balanceAfter: 5200,
    operatedAt: '2025/01/22 10:30:15',
  },
  {
    id: 'log_002',
    userId: 'user_001',
    phoneNumber: '13800138000',
    userName: '张三',
    operationType: 'deduct',
    pointsAmount: 50,
    relatedServiceId: 'service_pe002',
    remark: '兑换双人早餐',
    balanceBefore: 5250,
    balanceAfter: 5200,
    operatedAt: '2025/01/21 14:20:30',
  },
  {
    id: 'log_003',
    userId: 'user_002',
    phoneNumber: '13900139000',
    userName: '李四',
    operationType: 'earn',
    pointsAmount: 200,
    relatedOrderId: 'order_20250121001',
    remark: '订单入住返还（VIP5倍数：2.0倍）',
    balanceBefore: 11600,
    balanceAfter: 11800,
    operatedAt: '2025/01/21 15:45:22',
  },
  {
    id: 'log_004',
    userId: 'user_003',
    phoneNumber: '13700137000',
    userName: '王五',
    operationType: 'adjust',
    pointsAmount: 500,
    remark: '手动调整 - 新用户注册奖励',
    operator: '兔子',
    balanceBefore: 1700,
    balanceAfter: 2200,
    operatedAt: '2025/01/20 11:20:30',
  },
  {
    id: 'log_005',
    userId: 'user_004',
    phoneNumber: '13600136000',
    userName: '赵六',
    operationType: 'earn',
    pointsAmount: 150,
    relatedServiceId: 'service_pr006',
    remark: '首次评价奖励',
    balanceBefore: 18350,
    balanceAfter: 18500,
    operatedAt: '2025/01/22 09:15:45',
  },
  {
    id: 'log_006',
    userId: 'user_001',
    phoneNumber: '13800138000',
    userName: '张三',
    operationType: 'earn',
    pointsAmount: 50,
    relatedServiceId: 'service_pr001',
    remark: '自带拖鞋奖励',
    balanceBefore: 5150,
    balanceAfter: 5200,
    operatedAt: '2025/01/18 13:45:22',
  },
  {
    id: 'log_007',
    userId: 'user_005',
    phoneNumber: '13500135000',
    userName: '孙七',
    operationType: 'deduct',
    pointsAmount: 20,
    relatedServiceId: 'service_pe001',
    remark: '兑换单人早餐',
    balanceBefore: 3420,
    balanceAfter: 3400,
    operatedAt: '2025/01/19 16:20:10',
  },
  {
    id: 'log_008',
    userId: 'user_002',
    phoneNumber: '13900139000',
    userName: '李四',
    operationType: 'deduct',
    pointsAmount: 80,
    relatedServiceId: 'service_pe007',
    remark: '兑换接送机服务',
    balanceBefore: 11880,
    balanceAfter: 11800,
    operatedAt: '2025/01/15 10:30:00',
  },
]

/**
 * 操作日志Mock数据
 */
export const mockOperationLogs: OperationLog[] = [
  {
    id: 'op_log_001',
    operationType: '手动调整积分',
    operationDetails: '手机号: 13800138000, +100 积分, 原因: 系统异常补偿',
    operator: '张三',
    operatedAt: '2025/01/22 10:30:15',
  },
  {
    id: 'op_log_002',
    operationType: '手动调整积分',
    operationDetails: '手机号: 13900139000, -50 积分',
    operator: '李四',
    operatedAt: '2025/01/20 14:20:30',
  },
  {
    id: 'op_log_003',
    operationType: '手动调整积分',
    operationDetails: '手机号: 13700137000, +200 积分, 原因: 活动奖励',
    targetId: 'pr008',
    operator: '王五',
    operatedAt: '2025/01/18 16:45:10',
  },
  {
    id: 'op_log_004',
    operationType: '手动调整积分',
    operationDetails: '手机号: 13600136000, -100 积分, 原因: 违规扣除',
    targetId: 'user_001',
    operator: '赵六',
    operatedAt: '2025/01/15 09:15:22',
  },
  {
    id: 'op_log_005',
    operationType: '手动调整积分',
    operationDetails: '手机号: 13500135000, +300 积分',
    targetId: 'pr009',
    operator: '张三',
    operatedAt: '2025/01/10 11:20:18',
  },
  {
    id: 'op_log_006',
    operationType: '手动调整积分',
    operationDetails: '手机号: 13400134000, +150 积分, 原因: 推广奖励',
    targetId: 'pe009',
    operator: '李四',
    operatedAt: '2025/01/08 15:10:45',
  },
  {
    id: 'op_log_007',
    operationType: '编辑基础规则',
    operationDetails: '修改VIP等级入住返还倍数，调整VIP1-9各等级倍数',
    operator: '兔子',
    operatedAt: '2025/01/05 08:00:00',
  },
]
