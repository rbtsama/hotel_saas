/**
 * 平台后台 - 积分管理 Mock 数据
 */

import type {
  PointsBaseRuleConfig,
  MemberLevelPointsRate,
  PointsStatistics,
  UserPointsAccount,
  PointsRecord,
} from '../../types/points.types'
import { PointsIssueType, PointsUsageType } from '../../types/points.types'

/**
 * 积分基础规则配置 Mock
 */
export const mockPointsBaseRuleConfig: PointsBaseRuleConfig = {
  id: 'config-1',
  registerRewardPoints: 30,
  inviteRewardPoints: 30,
  baseExchangeRate: 1.0,
  updatedAt: '2025-11-20 10:30:00',
  updatedBy: '系统管理员',
}

/**
 * 会员等级积分汇率 Mock
 */
export const mockMemberLevelPointsRates: MemberLevelPointsRate[] = [
  { id: 'rate-0', level: 0, levelName: 'VIP0', rateMultiplier: 1.0, updatedAt: '2025-11-01 09:00:00' },
  { id: 'rate-1', level: 1, levelName: 'VIP1', rateMultiplier: 1.05, updatedAt: '2025-11-01 09:00:00' },
  { id: 'rate-2', level: 2, levelName: 'VIP2', rateMultiplier: 1.1, updatedAt: '2025-11-01 09:00:00' },
  { id: 'rate-3', level: 3, levelName: 'VIP3', rateMultiplier: 1.2, updatedAt: '2025-11-01 09:00:00' },
  { id: 'rate-4', level: 4, levelName: 'VIP4', rateMultiplier: 1.3, updatedAt: '2025-11-01 09:00:00' },
  { id: 'rate-5', level: 5, levelName: 'VIP5', rateMultiplier: 1.4, updatedAt: '2025-11-01 09:00:00' },
  { id: 'rate-6', level: 6, levelName: 'VIP6', rateMultiplier: 1.5, updatedAt: '2025-11-01 09:00:00' },
  { id: 'rate-7', level: 7, levelName: 'VIP7', rateMultiplier: 1.6, updatedAt: '2025-11-01 09:00:00' },
  { id: 'rate-8', level: 8, levelName: 'VIP8', rateMultiplier: 1.8, updatedAt: '2025-11-01 09:00:00' },
  { id: 'rate-9', level: 9, levelName: 'VIP9', rateMultiplier: 2.0, updatedAt: '2025-11-01 09:00:00' },
]

/**
 * 积分统计数据 Mock
 */
export const mockPointsStatistics: PointsStatistics = {
  totalIssued: 123456,
  totalUsed: 98765,
  currentCirculation: 24691,
  issueBreakdown: [
    {
      type: PointsIssueType.REGISTER,
      typeName: '注册奖励',
      amount: 45000,
      percentage: 36.5,
    },
    {
      type: PointsIssueType.INVITE,
      typeName: '邀请奖励',
      amount: 32100,
      percentage: 26.0,
    },
    {
      type: PointsIssueType.ECO_REWARD,
      typeName: '环保奖励',
      amount: 46356,
      percentage: 37.5,
    },
  ],
  usageBreakdown: [
    {
      type: PointsUsageType.DEDUCT_ROOM_FEE,
      typeName: '抵扣房费',
      amount: 78234,
      percentage: 79.2,
    },
    {
      type: PointsUsageType.REDEEM_BREAKFAST,
      typeName: '兑换早餐',
      amount: 15231,
      percentage: 15.4,
    },
    {
      type: PointsUsageType.REDEEM_SERVICE,
      typeName: '兑换服务',
      amount: 5300,
      percentage: 5.4,
    },
  ],
}

/**
 * 用户积分账户列表 Mock
 */
export const mockUserPointsAccounts: UserPointsAccount[] = [
  {
    userId: 'user-1',
    userName: '张三',
    phone: '13812341234',
    memberLevel: 3,
    memberLevelName: 'VIP3',
    currentPoints: 150,
    pointsRate: 1.2,
    totalNights: 32,
    createdAt: '2024-05-20 14:30:00',
  },
  {
    userId: 'user-2',
    userName: '李四',
    phone: '13923455678',
    memberLevel: 2,
    memberLevelName: 'VIP2',
    currentPoints: 80,
    pointsRate: 1.1,
    totalNights: 18,
    createdAt: '2024-08-15 09:20:00',
  },
  {
    userId: 'user-3',
    userName: '王五',
    phone: '13634569012',
    memberLevel: 1,
    memberLevelName: 'VIP1',
    currentPoints: 200,
    pointsRate: 1.05,
    totalNights: 7,
    createdAt: '2025-01-10 16:45:00',
  },
  {
    userId: 'user-4',
    userName: '赵六',
    phone: '13745673456',
    memberLevel: 4,
    memberLevelName: 'VIP4',
    currentPoints: 350,
    pointsRate: 1.3,
    totalNights: 65,
    createdAt: '2023-11-05 11:20:00',
  },
  {
    userId: 'user-5',
    userName: '孙七',
    phone: '13556787890',
    memberLevel: 0,
    memberLevelName: 'VIP0',
    currentPoints: 30,
    pointsRate: 1.0,
    totalNights: 0,
    createdAt: '2025-11-22 18:30:00',
  },
]

/**
 * 积分明细记录 Mock
 */
export const mockPointsRecords: PointsRecord[] = [
  {
    id: 'record-1',
    userId: 'user-1',
    userName: '张三',
    type: PointsIssueType.ECO_REWARD,
    typeName: '环保奖励',
    amount: 5,
    balance: 150,
    description: '自带拖鞋 - 订单20251122001',
    createdAt: '2025-11-22 14:30:00',
  },
  {
    id: 'record-2',
    userId: 'user-1',
    userName: '张三',
    type: PointsUsageType.DEDUCT_ROOM_FEE,
    typeName: '抵扣房费',
    amount: -50,
    balance: 145,
    description: '订单20251122001 - XX豪华酒店',
    createdAt: '2025-11-22 14:00:00',
  },
  {
    id: 'record-3',
    userId: 'user-1',
    userName: '张三',
    type: PointsUsageType.REDEEM_BREAKFAST,
    typeName: '兑换早餐',
    amount: -20,
    balance: 195,
    description: '单人早餐 - 订单20251122001',
    createdAt: '2025-11-22 14:00:00',
  },
  {
    id: 'record-4',
    userId: 'user-2',
    userName: '李四',
    type: PointsIssueType.INVITE,
    typeName: '邀请奖励',
    amount: 30,
    balance: 80,
    description: '好友王五完成首次入住',
    createdAt: '2025-11-15 16:00:00',
  },
  {
    id: 'record-5',
    userId: 'user-5',
    userName: '孙七',
    type: PointsIssueType.REGISTER,
    typeName: '注册奖励',
    amount: 30,
    balance: 30,
    description: '新用户注册',
    createdAt: '2025-11-22 18:30:00',
  },
]
