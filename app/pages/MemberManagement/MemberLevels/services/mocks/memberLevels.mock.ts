import type { MemberLevel } from '../../types/memberLevels.types'

// 模拟会员等级数据
export const mockMemberLevelsData: MemberLevel[] = [
  {
    id: '1',
    isDefault: true,
    levelName: '注册会员',
    upgradeCondition: '注册即享',
    levelBenefits: '-',
    validityPeriod: '-',
    requiredNights: 0,
    discountRangeMin: 0,
    discountRangeMax: 0,
    discountPercentage: 0,
    status: 'active',
    createdAt: '2025-01-01 00:00:00'
  },
  {
    id: '2',
    isDefault: false,
    levelName: 'VIP1',
    upgradeCondition: '预定1次及以上',
    levelBenefits: '获得等级后可赚送本套*1,消费1元累计1星积值',
    validityPeriod: '2年',
    requiredNights: 1,
    discountRangeMin: 80,
    discountRangeMax: 95,
    discountPercentage: 85,
    status: 'active',
    createdAt: '2025-01-05 10:00:00'
  },
  {
    id: '3',
    isDefault: false,
    levelName: 'VIP2',
    upgradeCondition: '预定5次及以上',
    levelBenefits: '获得等级后可赚送本套*2,消费1元累计1星积值',
    validityPeriod: '2年',
    requiredNights: 5,
    discountRangeMin: 75,
    discountRangeMax: 90,
    discountPercentage: 85,
    status: 'active',
    createdAt: '2025-01-05 10:05:00'
  },
  {
    id: '4',
    isDefault: false,
    levelName: 'VIP3',
    upgradeCondition: '预定10次及以上',
    levelBenefits: '获得等级后可赚送本套*3,消费1元累计1星积值',
    validityPeriod: '2年',
    requiredNights: 10,
    discountRangeMin: 65,
    discountRangeMax: 88,
    discountPercentage: 85,
    status: 'active',
    createdAt: '2025-01-05 10:10:00'
  }
]
