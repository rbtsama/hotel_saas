/**
 * 积分调整功能 Mock 数据
 */

import type { UserPointsInfo, PointsDetailRecord } from '../../types/pointsAdjustment.types'

// 模拟用户积分信息
export const mockUserPointsInfo: Record<string, UserPointsInfo> = {
  'U001': {
    userId: 'U001',
    userName: '张三',
    phone: '13812348888',
    memberLevel: 'VIP3',
    currentPoints: 2580,
    totalEarned: 15800,
    totalSpent: 13220,
    lastUpdateTime: '2025/01/23 15:30:20'
  },
  'U002': {
    userId: 'U002',
    userName: '李四',
    phone: '13923456666',
    memberLevel: 'VIP1',
    currentPoints: 450,
    totalEarned: 1200,
    totalSpent: 750,
    lastUpdateTime: '2025/01/22 10:15:30'
  },
  'U003': {
    userId: 'U003',
    userName: '王五',
    phone: '13634569999',
    memberLevel: 'VIP5',
    currentPoints: 8900,
    totalEarned: 45000,
    totalSpent: 36100,
    lastUpdateTime: '2025/01/24 09:45:10'
  }
}

// 模拟积分明细记录
export const mockPointsDetails: Record<string, PointsDetailRecord[]> = {
  'U001': [
    {
      id: 'PD001',
      type: 'earn',
      typeLabel: '订单完成',
      amount: 580,
      balance: 2580,
      description: '订单 #202501230001 完成',
      operator: '系统',
      createdAt: '2025/01/23 15:30:20'
    },
    {
      id: 'PD002',
      type: 'spend',
      typeLabel: '积分抵扣',
      amount: -500,
      balance: 2000,
      description: '订单 #202501220005 积分抵扣',
      operator: '系统',
      createdAt: '2025/01/22 10:20:15'
    },
    {
      id: 'PD003',
      type: 'adjust',
      typeLabel: '平台调整',
      amount: 200,
      balance: 2500,
      description: '客服补偿',
      operator: '兔子',
      createdAt: '2025/01/20 14:10:30'
    },
    {
      id: 'PD004',
      type: 'earn',
      typeLabel: '订单完成',
      amount: 320,
      balance: 2300,
      description: '订单 #202501180003 完成',
      operator: '系统',
      createdAt: '2025/01/18 18:45:22'
    },
    {
      id: 'PD005',
      type: 'adjust',
      typeLabel: '平台调整',
      amount: -100,
      balance: 1980,
      description: '异常扣除',
      operator: '兔子',
      createdAt: '2025/01/15 11:20:10'
    }
  ],
  'U002': [
    {
      id: 'PD101',
      type: 'earn',
      typeLabel: '订单完成',
      amount: 200,
      balance: 450,
      description: '订单 #202501220008 完成',
      operator: '系统',
      createdAt: '2025/01/22 10:15:30'
    },
    {
      id: 'PD102',
      type: 'earn',
      typeLabel: '注册奖励',
      amount: 100,
      balance: 250,
      description: '新用户注册奖励',
      operator: '系统',
      createdAt: '2025/01/10 09:00:00'
    },
    {
      id: 'PD103',
      type: 'spend',
      typeLabel: '积分抵扣',
      amount: -150,
      balance: 150,
      description: '订单 #202501120002 积分抵扣',
      operator: '系统',
      createdAt: '2025/01/12 16:30:45'
    }
  ],
  'U003': [
    {
      id: 'PD201',
      type: 'earn',
      typeLabel: '订单完成',
      amount: 1200,
      balance: 8900,
      description: '订单 #202501240001 完成',
      operator: '系统',
      createdAt: '2025/01/24 09:45:10'
    },
    {
      id: 'PD202',
      type: 'spend',
      typeLabel: '积分抵扣',
      amount: -3000,
      balance: 7700,
      description: '订单 #202501200012 积分抵扣',
      operator: '系统',
      createdAt: '2025/01/20 20:15:30'
    },
    {
      id: 'PD203',
      type: 'adjust',
      typeLabel: '平台调整',
      amount: 500,
      balance: 10700,
      description: '运营活动奖励',
      operator: '兔子',
      createdAt: '2025/01/15 14:30:00'
    }
  ]
}
