/**
 * 平台后台 - 会员管理 Mock 数据
 */

import type {
  MemberLevelUpgradeRule,
  MemberLevelDiscountRule,
  UserMemberInfo,
  UserNightRecord,
  MemberLevelAdjustRecord,
} from '../../types/member.types'

/**
 * 会员等级升级规则 Mock
 */
export const mockMemberLevelUpgradeRules: MemberLevelUpgradeRule[] = [
  {
    id: 'upgrade-0',
    level: 0,
    levelName: 'VIP0',
    upgradeNights: 0,
    validityDays: 0,
    maintainNights: 0,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'upgrade-1',
    level: 1,
    levelName: 'VIP1',
    upgradeNights: 5,
    validityDays: 365,
    maintainNights: 3,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'upgrade-2',
    level: 2,
    levelName: 'VIP2',
    upgradeNights: 15,
    validityDays: 365,
    maintainNights: 8,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'upgrade-3',
    level: 3,
    levelName: 'VIP3',
    upgradeNights: 30,
    validityDays: 365,
    maintainNights: 15,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'upgrade-4',
    level: 4,
    levelName: 'VIP4',
    upgradeNights: 60,
    validityDays: 365,
    maintainNights: 25,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'upgrade-5',
    level: 5,
    levelName: 'VIP5',
    upgradeNights: 100,
    validityDays: 365,
    maintainNights: 40,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'upgrade-6',
    level: 6,
    levelName: 'VIP6',
    upgradeNights: 150,
    validityDays: 365,
    maintainNights: 60,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'upgrade-7',
    level: 7,
    levelName: 'VIP7',
    upgradeNights: 220,
    validityDays: 365,
    maintainNights: 85,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'upgrade-8',
    level: 8,
    levelName: 'VIP8',
    upgradeNights: 300,
    validityDays: 365,
    maintainNights: 120,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'upgrade-9',
    level: 9,
    levelName: 'VIP9',
    upgradeNights: 400,
    validityDays: 365,
    maintainNights: 160,
    updatedAt: '2025-11-01 09:00:00',
  },
]

/**
 * 会员等级折扣规则 Mock
 */
export const mockMemberLevelDiscountRules: MemberLevelDiscountRule[] = [
  {
    id: 'discount-0',
    level: 0,
    levelName: 'VIP0',
    platformBaseDiscount: 1.0,
    merchantDiscountMin: 1.0,
    merchantDiscountMax: 1.0,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'discount-1',
    level: 1,
    levelName: 'VIP1',
    platformBaseDiscount: 0.95,
    merchantDiscountMin: 0.9,
    merchantDiscountMax: 0.95,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'discount-2',
    level: 2,
    levelName: 'VIP2',
    platformBaseDiscount: 0.93,
    merchantDiscountMin: 0.85,
    merchantDiscountMax: 0.93,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'discount-3',
    level: 3,
    levelName: 'VIP3',
    platformBaseDiscount: 0.9,
    merchantDiscountMin: 0.85,
    merchantDiscountMax: 0.9,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'discount-4',
    level: 4,
    levelName: 'VIP4',
    platformBaseDiscount: 0.88,
    merchantDiscountMin: 0.8,
    merchantDiscountMax: 0.88,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'discount-5',
    level: 5,
    levelName: 'VIP5',
    platformBaseDiscount: 0.85,
    merchantDiscountMin: 0.75,
    merchantDiscountMax: 0.85,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'discount-6',
    level: 6,
    levelName: 'VIP6',
    platformBaseDiscount: 0.82,
    merchantDiscountMin: 0.7,
    merchantDiscountMax: 0.82,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'discount-7',
    level: 7,
    levelName: 'VIP7',
    platformBaseDiscount: 0.8,
    merchantDiscountMin: 0.65,
    merchantDiscountMax: 0.8,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'discount-8',
    level: 8,
    levelName: 'VIP8',
    platformBaseDiscount: 0.75,
    merchantDiscountMin: 0.6,
    merchantDiscountMax: 0.75,
    updatedAt: '2025-11-01 09:00:00',
  },
  {
    id: 'discount-9',
    level: 9,
    levelName: 'VIP9',
    platformBaseDiscount: 0.7,
    merchantDiscountMin: 0.55,
    merchantDiscountMax: 0.7,
    updatedAt: '2025-11-01 09:00:00',
  },
]

/**
 * 用户会员信息列表 Mock
 */
export const mockUserMemberInfos: UserMemberInfo[] = [
  {
    userId: 'user-1',
    userName: '张三',
    phone: '13812341234',
    currentLevel: 3,
    currentLevelName: 'VIP3',
    totalNights: 32,
    maintainNights: 12,
    validityDate: '2026-10-15',
    pointsBalance: 150,
    registeredAt: '2024-05-20 14:30:00',
  },
  {
    userId: 'user-2',
    userName: '李四',
    phone: '13923455678',
    currentLevel: 2,
    currentLevelName: 'VIP2',
    totalNights: 18,
    maintainNights: 6,
    validityDate: '2026-08-20',
    pointsBalance: 80,
    registeredAt: '2024-08-15 09:20:00',
  },
  {
    userId: 'user-3',
    userName: '王五',
    phone: '13634569012',
    currentLevel: 1,
    currentLevelName: 'VIP1',
    totalNights: 7,
    maintainNights: 2,
    validityDate: '2026-01-25',
    pointsBalance: 200,
    registeredAt: '2025-01-10 16:45:00',
  },
]

/**
 * 用户间夜记录 Mock
 */
export const mockUserNightRecords: UserNightRecord[] = [
  {
    id: 'night-1',
    orderId: '20251101001',
    hotelName: 'XX豪华酒店',
    checkInDate: '2025-11-01',
    checkOutDate: '2025-11-03',
    nights: 2,
    createdAt: '2025-11-03 12:00:00',
  },
  {
    id: 'night-2',
    orderId: '20251015001',
    hotelName: 'YY精品酒店',
    checkInDate: '2025-10-15',
    checkOutDate: '2025-10-16',
    nights: 1,
    createdAt: '2025-10-16 12:00:00',
  },
  {
    id: 'night-3',
    orderId: '20250920001',
    hotelName: 'ZZ商务酒店',
    checkInDate: '2025-09-20',
    checkOutDate: '2025-09-22',
    nights: 2,
    createdAt: '2025-09-22 12:00:00',
  },
]

/**
 * 会员等级调整记录 Mock
 */
export const mockMemberLevelAdjustRecords: MemberLevelAdjustRecord[] = [
  {
    id: 'adjust-1',
    userId: 'user-1',
    userName: '张三',
    fromLevel: 2,
    toLevel: 3,
    adjustType: 'upgrade',
    adjustTypeName: '自动升级',
    reason: '累计间夜数达到30间夜',
    operator: '系统',
    createdAt: '2025-10-15 14:30:00',
  },
  {
    id: 'adjust-2',
    userId: 'user-4',
    userName: '赵六',
    fromLevel: 3,
    toLevel: 2,
    adjustType: 'downgrade',
    adjustTypeName: '自动降级',
    reason: '会员有效期内未完成保级间夜',
    operator: '系统',
    createdAt: '2025-09-01 00:00:00',
  },
  {
    id: 'adjust-3',
    userId: 'user-5',
    userName: '孙七',
    fromLevel: 0,
    toLevel: 2,
    adjustType: 'manual',
    adjustTypeName: '手动调整',
    reason: '客诉补偿',
    operator: '管理员-张三',
    createdAt: '2025-11-20 15:00:00',
  },
]
