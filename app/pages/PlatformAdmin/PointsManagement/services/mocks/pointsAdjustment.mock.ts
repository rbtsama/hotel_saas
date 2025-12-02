/**
 * 积分调整功能 Mock 数据
 */

import type { UserPointsInfo, PointsDetailRecord } from '../../types/pointsAdjustment.types'

// 模拟用户积分信息
export const mockUserPointsInfo: Record<string, UserPointsInfo> = {
  '100000': {
    userId: '100000',
    userName: '旅行达人',
    phone: '13812348888',
    memberLevel: 'VIP3',
    currentPoints: 2580,
    totalEarned: 15800,
    totalSpent: 13220,
    lastUpdateTime: '2025/01/23 15:30:20'
  },
  '100001': {
    userId: '100001',
    userName: '阳光少年',
    phone: '13923456666',
    memberLevel: 'VIP1',
    currentPoints: 450,
    totalEarned: 1200,
    totalSpent: 750,
    lastUpdateTime: '2025/01/22 10:15:30'
  },
  '100002': {
    userId: '100002',
    userName: '微笑的猫咪',
    phone: '13634569999',
    memberLevel: 'VIP5',
    currentPoints: 8900,
    totalEarned: 45000,
    totalSpent: 36100,
    lastUpdateTime: '2025/01/24 09:45:10'
  },
  '154655': {
    userId: '154655',
    userName: '测试用户',
    phone: '13800138000',
    memberLevel: 'VIP2',
    currentPoints: 6850,
    totalEarned: 15620,
    totalSpent: 8770,
    lastUpdateTime: '2024/11/24 18:30:00'
  }
}

// 模拟积分明细记录
export const mockPointsDetails: Record<string, PointsDetailRecord[]> = {
  '100000': [
    {
      id: 'PD001',
      type: 'earn',
      typeLabel: '订单完成',
      amount: 580,
      balance: 2580,
      description: '订单 #12501230001 完成',
      operator: '系统',
      createdAt: '2025/01/23 15:30:20'
    },
    {
      id: 'PD002',
      type: 'spend',
      typeLabel: '积分抵扣',
      amount: -500,
      balance: 2000,
      description: '订单 #12501220005 积分抵扣',
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
      description: '订单 #12501180003 完成',
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
  '100001': [
    {
      id: 'PD101',
      type: 'earn',
      typeLabel: '订单完成',
      amount: 200,
      balance: 450,
      description: '订单 #12501220008 完成',
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
      description: '订单 #12501120002 积分抵扣',
      operator: '系统',
      createdAt: '2025/01/12 16:30:45'
    }
  ],
  '100002': [
    {
      id: 'PD201',
      type: 'earn',
      typeLabel: '订单完成',
      amount: 1200,
      balance: 8900,
      description: '订单 #12501240001 完成',
      operator: '系统',
      createdAt: '2025/01/24 09:45:10'
    },
    {
      id: 'PD202',
      type: 'spend',
      typeLabel: '积分抵扣',
      amount: -3000,
      balance: 7700,
      description: '订单 #12501200012 积分抵扣',
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
  ],
  '154655': [
    {
      id: 'PD301',
      type: 'earn',
      typeLabel: '订单完成',
      amount: 1294,
      balance: 6850,
      description: '订单 #12511243210 完成',
      operator: '系统',
      createdAt: '2024/11/24 18:30:00'
    },
    {
      id: 'PD302',
      type: 'earn',
      typeLabel: '订单完成',
      amount: 942,
      balance: 5556,
      description: '订单 #12511185432 完成',
      operator: '系统',
      createdAt: '2024/11/18 16:20:00'
    },
    {
      id: 'PD303',
      type: 'spend',
      typeLabel: '积分抵扣',
      amount: -800,
      balance: 4614,
      description: '订单 #12511106543 积分抵扣',
      operator: '系统',
      createdAt: '2024/11/10 10:15:00'
    },
    {
      id: 'PD304',
      type: 'adjust',
      typeLabel: '平台调整',
      amount: 500,
      balance: 5414,
      description: '会员升级奖励',
      operator: '兔子',
      createdAt: '2024/11/05 14:00:00'
    },
    {
      id: 'PD305',
      type: 'earn',
      typeLabel: '订单完成',
      amount: 680,
      balance: 4914,
      description: '订单 #12510280987 完成',
      operator: '系统',
      createdAt: '2024/10/28 12:40:00'
    }
  ]
}
