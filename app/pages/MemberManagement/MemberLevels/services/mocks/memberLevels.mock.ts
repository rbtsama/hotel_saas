import type { MemberLevel } from '../../types/memberLevels.types'

// 模拟会员等级数据 - 固定VIP0-VIP9共10个等级
export const mockMemberLevelsData: MemberLevel[] = [
  {
    id: '0',
    level: 0,
    displayName: '注册会员',
    upgradeNights: 1, // 完成1次订单升级到VIP1
    maintainNights: 0, // VIP0无需保级
    validityDays: 0, // VIP0永久有效
    discountMin: 0,
    discountMax: 0,
    pointsRate: 1.0, // 1元=1积分
    giftTrialCount: 0, // 无赠送
    giftValidityDays: 30, // 赠送有效期30天
    cardImage: '/images/member-cards/vip0.svg', // 会员卡图片
    status: 'active',
    updatedAt: '2025/01/01 00:00:00'
  },
  {
    id: '1',
    level: 1,
    displayName: 'VIP1',
    upgradeNights: 3, // 完成3次订单升级到VIP2
    maintainNights: 1, // 有效期内至少1次订单保级
    validityDays: 365, // 1年有效期
    discountMin: 85,
    discountMax: 95,
    pointsRate: 1.2, // 1元=1.2积分
    giftTrialCount: 1, // 赠送1次体验
    giftValidityDays: 30, // 赠送有效期30天
    cardImage: '/images/member-cards/vip1.svg', // 会员卡图片
    status: 'active',
    updatedAt: '2025/01/10 14:30:00'
  },
  {
    id: '2',
    level: 2,
    displayName: 'VIP2',
    upgradeNights: 5, // 完成5次订单升级到VIP3
    maintainNights: 2, // 有效期内至少2次订单保级
    validityDays: 365,
    discountMin: 80,
    discountMax: 90,
    pointsRate: 1.5, // 1元=1.5积分
    giftTrialCount: 1,
    giftValidityDays: 60,
    cardImage: '/images/member-cards/vip2.svg', // 会员卡图片
    status: 'active',
    updatedAt: '2025/01/10 14:35:00'
  },
  {
    id: '3',
    level: 3,
    displayName: 'VIP3',
    upgradeNights: 8, // 完成8次订单升级到VIP4
    maintainNights: 3, // 有效期内至少3次订单保级
    validityDays: 365,
    discountMin: 75,
    discountMax: 88,
    pointsRate: 2.0, // 1元=2积分
    giftTrialCount: 2,
    giftValidityDays: 90,
    cardImage: '/images/member-cards/vip3.svg', // 会员卡图片
    status: 'active',
    updatedAt: '2025/01/10 14:40:00'
  },
  {
    id: '4',
    level: 4,
    displayName: 'VIP4',
    upgradeNights: 12, // 完成12次订单升级到VIP5
    maintainNights: 4,
    validityDays: 730, // 2年有效期
    discountMin: 70,
    discountMax: 85,
    pointsRate: 2.5, // 1元=2.5积分
    giftTrialCount: 2,
    giftValidityDays: 180,
    cardImage: '/images/member-cards/vip4.svg', // 会员卡图片
    status: 'active',
    updatedAt: '2025/01/10 14:45:00'
  },
  {
    id: '5',
    level: 5,
    displayName: 'VIP5',
    upgradeNights: 18, // 完成18次订单升级到VIP6
    maintainNights: 5,
    validityDays: 730,
    discountMin: 65,
    discountMax: 82,
    pointsRate: 3.0, // 1元=3积分
    giftTrialCount: 3,
    giftValidityDays: 180,
    status: 'active',
    updatedAt: '2025/01/10 14:50:00'
  },
  {
    id: '6',
    level: 6,
    displayName: 'VIP6',
    upgradeNights: 25, // 完成25次订单升级到VIP7
    maintainNights: 6,
    validityDays: 730,
    discountMin: 60,
    discountMax: 80,
    pointsRate: 3.5, // 1元=3.5积分
    giftTrialCount: 3,
    giftValidityDays: 365,
    status: 'active',
    updatedAt: '2025/01/10 14:55:00'
  },
  {
    id: '7',
    level: 7,
    displayName: 'VIP7',
    upgradeNights: 35, // 完成35次订单升级到VIP8
    maintainNights: 8,
    validityDays: 1095, // 3年有效期
    discountMin: 55,
    discountMax: 78,
    pointsRate: 4.0, // 1元=4积分
    giftTrialCount: 4,
    giftValidityDays: 365,
    status: 'active',
    updatedAt: '2025/01/10 15:00:00'
  },
  {
    id: '8',
    level: 8,
    displayName: 'VIP8',
    upgradeNights: 50, // 完成50次订单升级到VIP9
    maintainNights: 10,
    validityDays: 1095,
    discountMin: 50,
    discountMax: 75,
    pointsRate: 4.5, // 1元=4.5积分
    giftTrialCount: 5,
    giftValidityDays: 730,
    status: 'active',
    updatedAt: '2025/01/10 15:05:00'
  },
  {
    id: '9',
    level: 9,
    displayName: 'VIP9',
    upgradeNights: 999999, // 最高等级，无需升级
    maintainNights: 12,
    validityDays: 1825, // 5年有效期
    discountMin: 45,
    discountMax: 70,
    pointsRate: 5.0, // 1元=5积分
    giftTrialCount: 6,
    giftValidityDays: 730,
    status: 'active',
    updatedAt: '2025/01/10 15:10:00'
  }
]
