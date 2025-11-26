/**
 * 平台后台 - 会员管理 Mock 数据
 */

import type {
  MemberLevelUpgradeRule,
  MemberLevelDiscountRule,
  TrialMemberConfig,
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
 * 体验会员配置 Mock
 */
export const mockTrialMemberConfig: TrialMemberConfig = {
  id: 'trial-config-1',
  userGiftTrialDays: 7,
  merchantGiftTrialDays: 7,
  merchantMaxGiftLevel: 3,
  updatedAt: '2025-11-20 10:00:00',
  updatedBy: '系统管理员',
}

/**
 * 用户会员信息列表 Mock
 */
export const mockUserMemberInfos: UserMemberInfo[] = [
  // 用户1: 只有正式会员VIP3，今年已升级
  {
    userId: '100000',
    userName: '旅行达人',
    phone: '13812341234',
    currentLevel: 3,
    currentLevelName: 'VIP3',
    formalLevel: 3,
    formalValidityDate: '2026-10-15',
    trialLevel: null,
    trialValidityDate: null,
    totalNights: 32,
    yearUpgradeNights: 8,
    maintainNights: 12,
    upgradedThisYear: true,
    validityDate: '2026-10-15',
    pointsBalance: 150,
    registeredAt: '2024-05-20 14:30:00',
  },
  // 用户2: 正式VIP2，有体验VIP3（体验等级更高）
  {
    userId: '100001',
    userName: '阳光少年',
    phone: '13923455678',
    currentLevel: 3,
    currentLevelName: 'VIP3 (体验)',
    formalLevel: 2,
    formalValidityDate: '2026-08-20',
    trialLevel: 3,
    trialValidityDate: '2025-12-05',
    totalNights: 18,
    yearUpgradeNights: 12,
    maintainNights: 6,
    upgradedThisYear: false,
    validityDate: '2026-08-20',
    pointsBalance: 80,
    registeredAt: '2024-08-15 09:20:00',
  },
  // 用户3: 正式VIP1，今年未升级
  {
    userId: '100002',
    userName: '微笑的猫咪',
    phone: '13634569012',
    currentLevel: 1,
    currentLevelName: 'VIP1',
    formalLevel: 1,
    formalValidityDate: '2026-01-25',
    trialLevel: null,
    trialValidityDate: null,
    totalNights: 7,
    yearUpgradeNights: 3,
    maintainNights: 2,
    upgradedThisYear: false,
    validityDate: '2026-01-25',
    pointsBalance: 200,
    registeredAt: '2025-01-10 16:45:00',
  },
  // 用户4: 只有体验会员VIP2
  {
    userId: '100003',
    userName: '星空漫步',
    phone: '13745670123',
    currentLevel: 2,
    currentLevelName: 'VIP2 (体验)',
    formalLevel: 0,
    formalValidityDate: '2025-12-31',
    trialLevel: 2,
    trialValidityDate: '2025-12-01',
    totalNights: 3,
    yearUpgradeNights: 3,
    maintainNights: 0,
    upgradedThisYear: false,
    validityDate: '2025-12-01',
    pointsBalance: 50,
    registeredAt: '2025-11-15 10:20:00',
  },
  // 用户5: 正式VIP4，有体验VIP2（正式等级更高）
  {
    userId: '100004',
    userName: '梦想家',
    phone: '13856781234',
    currentLevel: 4,
    currentLevelName: 'VIP4',
    formalLevel: 4,
    formalValidityDate: '2026-06-30',
    trialLevel: 2,
    trialValidityDate: '2025-12-10',
    totalNights: 65,
    yearUpgradeNights: 15,
    maintainNights: 28,
    upgradedThisYear: true,
    validityDate: '2026-06-30',
    pointsBalance: 320,
    registeredAt: '2023-08-10 14:15:00',
  },
]

/**
 * 用户间夜记录 Mock
 */
export const mockUserNightRecords: UserNightRecord[] = [
  {
    id: 'night-1',
    orderId: '12511011234',
    hotelName: 'XX豪华酒店',
    checkInDate: '2025-11-01',
    checkOutDate: '2025-11-03',
    nights: 2,
    createdAt: '2025-11-03 12:00:00',
  },
  {
    id: 'night-2',
    orderId: '12510155678',
    hotelName: 'YY精品酒店',
    checkInDate: '2025-10-15',
    checkOutDate: '2025-10-16',
    nights: 1,
    createdAt: '2025-10-16 12:00:00',
  },
  {
    id: 'night-3',
    orderId: '12509209012',
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
    userId: '100000',
    userName: '旅行达人',
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
    userId: '100003',
    userName: '星空漫步',
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
    userId: '100004',
    userName: '梦想家',
    fromLevel: 0,
    toLevel: 2,
    adjustType: 'manual',
    adjustTypeName: '手动调整',
    reason: '客诉补偿',
    operator: '管理员',
    createdAt: '2025-11-20 15:00:00',
  },
]
