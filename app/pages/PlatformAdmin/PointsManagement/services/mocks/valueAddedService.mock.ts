/**
 * 平台后台 - 积分增值服务 Mock 数据
 */

import type { PointsRewardItem, PointsExchangeItem } from '../../types/valueAddedService.types'

/**
 * 积分奖励服务 Mock（环保奖励）
 */
export const mockPointsRewards: PointsRewardItem[] = [
  {
    id: 'reward-1',
    serviceName: '自带拖鞋',
    serviceDescription: '支持环保，自带拖鞋可获得积分奖励',
    pointsReward: 5,
    status: 'active',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'reward-2',
    serviceName: '自带牙刷',
    serviceDescription: '环保从小事做起，自带牙刷获得积分',
    pointsReward: 3,
    status: 'active',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'reward-3',
    serviceName: '自带毛巾',
    serviceDescription: '自带毛巾，共建绿色酒店',
    pointsReward: 5,
    status: 'inactive',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/10 09:20:00'
  },
  {
    id: 'reward-4',
    serviceName: '无需清洁',
    serviceDescription: '离店时选择无需清洁房间，减少资源消耗',
    pointsReward: 10,
    status: 'active',
    createdAt: '2025/01/05 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  }
]

/**
 * 积分换购服务 Mock（增值服务）
 */
export const mockPointsExchanges: PointsExchangeItem[] = [
  {
    id: 'exchange-1',
    serviceName: '单人早餐',
    serviceDescription: '含单人自助早餐，早餐时间7:00-10:00',
    pointsCost: 20,
    status: 'active',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'exchange-2',
    serviceName: '双人早餐',
    serviceDescription: '含双人自助早餐，早餐时间7:00-10:00',
    pointsCost: 35,
    status: 'active',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'exchange-3',
    serviceName: '延迟退房（2小时）',
    serviceDescription: '最晚可延迟至14:00退房',
    pointsCost: 15,
    status: 'active',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  },
  {
    id: 'exchange-4',
    serviceName: '洗衣服务',
    serviceDescription: '提供当日洗衣服务',
    pointsCost: 10,
    status: 'inactive',
    createdAt: '2025/01/01 10:00:00',
    updatedAt: '2025/01/10 11:00:00'
  },
  {
    id: 'exchange-5',
    serviceName: '免费升级房型',
    serviceDescription: '免费升级至更高一级房型（视库存情况）',
    pointsCost: 50,
    status: 'active',
    createdAt: '2025/01/05 10:00:00',
    updatedAt: '2025/01/15 14:30:00'
  }
]
