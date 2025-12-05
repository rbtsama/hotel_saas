/**
 * 平台后台 - 积分增值服务 Mock 数据
 */

import type { PointsRewardItem, PointsExchangeItem } from '../../types/valueAddedService.types'

/**
 * 积分奖励服务 Mock（环保奖励）
 */
export const mockPointsRewards: PointsRewardItem[] = [
  {
    id: 'PR001',
    序号: 1,
    serviceName: '自带拖鞋',
    pointsReward: 5,
    status: 'active',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'PR002',
    序号: 2,
    serviceName: '自带牙刷',
    pointsReward: 3,
    status: 'active',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'PR003',
    序号: 3,
    serviceName: '自带毛巾',
    pointsReward: 5,
    status: 'inactive',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/10 09:20:00'
  },
  {
    id: 'PR004',
    序号: 4,
    serviceName: '无需清洁',
    pointsReward: 10,
    status: 'active',
    createdAt: '2025/01/05 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'PR005',
    序号: 5,
    serviceName: '完善个人资料',
    pointsReward: 20,
    status: 'active',
    createdAt: '2025/01/08 09:00:00',
    updatedAt: '2025/01/18 11:20:00'
  },
  {
    id: 'PR006',
    序号: 6,
    serviceName: '首次评价',
    pointsReward: 15,
    status: 'active',
    createdAt: '2025/01/10 14:30:00',
    updatedAt: '2025/01/20 16:45:00'
  },
  {
    id: 'PR007',
    序号: 7,
    serviceName: '连续入住奖励',
    pointsReward: 30,
    status: 'active',
    createdAt: '2025/01/12 10:15:00',
    updatedAt: '2025/01/22 09:30:00'
  },
  {
    id: 'PR008',
    序号: 8,
    serviceName: '推荐商家',
    pointsReward: 50,
    status: 'active',
    createdAt: '2025/01/15 11:00:00',
    updatedAt: '2025/01/25 13:15:00'
  },
  {
    id: 'PR009',
    序号: 9,
    serviceName: '分享朋友圈',
    pointsReward: 8,
    status: 'inactive',
    createdAt: '2025/01/18 15:30:00',
    updatedAt: '2025/01/28 10:00:00'
  },
  {
    id: 'PR010',
    序号: 10,
    serviceName: '生日特惠',
    pointsReward: 25,
    status: 'active',
    createdAt: '2025/01/20 09:45:00',
    updatedAt: '2025/01/30 14:20:00'
  }
]

/**
 * 积分换购服务 Mock（增值服务）
 */
export const mockPointsExchanges: PointsExchangeItem[] = [
  {
    id: 'PE001',
    序号: 1,
    serviceName: '单人早餐',
    pointsCost: 20,
    status: 'active',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'PE002',
    序号: 2,
    serviceName: '双人早餐',
    pointsCost: 35,
    status: 'active',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'PE003',
    序号: 3,
    serviceName: '延迟退房（2小时）',
    pointsCost: 15,
    status: 'active',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'PE004',
    序号: 4,
    serviceName: '洗衣服务',
    pointsCost: 10,
    status: 'inactive',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/10 11:00:00'
  },
  {
    id: 'PE005',
    序号: 5,
    serviceName: '免费升级房型',
    pointsCost: 50,
    status: 'active',
    createdAt: '2025/01/05 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'PE006',
    序号: 6,
    serviceName: '免费WiFi升级',
    pointsCost: 8,
    status: 'active',
    createdAt: '2025/01/08 11:30:00',
    updatedAt: '2025/01/18 09:15:00'
  },
  {
    id: 'PE007',
    序号: 7,
    serviceName: '接送机服务',
    pointsCost: 80,
    status: 'active',
    createdAt: '2025/01/10 14:00:00',
    updatedAt: '2025/01/20 16:30:00'
  },
  {
    id: 'PE008',
    序号: 8,
    serviceName: '健身房会员',
    pointsCost: 25,
    status: 'active',
    createdAt: '2025/01/12 10:45:00',
    updatedAt: '2025/01/22 13:20:00'
  },
  {
    id: 'PE009',
    序号: 9,
    serviceName: '温泉体验券',
    pointsCost: 40,
    status: 'inactive',
    createdAt: '2025/01/15 09:30:00',
    updatedAt: '2025/01/25 11:00:00'
  },
  {
    id: 'PE010',
    序号: 10,
    serviceName: '城市观光套票',
    pointsCost: 60,
    status: 'active',
    createdAt: '2025/01/18 15:15:00',
    updatedAt: '2025/01/28 10:45:00'
  }
]
