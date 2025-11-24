/**
 * 用户管理 - Mock数据
 */

import type { User, UserDetail, MemberLevel } from '../../types/user.types'

// 用户列表数据（15个用户）
export const mockUsers: User[] = [
  {
    userId: 'U001',
    name: '张三',
    phone: '13812348888',
    memberLevel: '钻石会员',
    currentPoints: 12580,
    registeredAt: '2023-01-15 10:30:00',
    status: 'active'
  },
  {
    userId: 'U002',
    name: '李四',
    phone: '13923456666',
    memberLevel: '白金会员',
    currentPoints: 8650,
    registeredAt: '2023-02-20 14:20:00',
    status: 'active'
  },
  {
    userId: 'U003',
    name: '王五',
    phone: '13634569999',
    memberLevel: '金卡会员',
    currentPoints: 4320,
    registeredAt: '2023-03-10 09:15:00',
    status: 'active'
  },
  {
    userId: 'U004',
    name: '赵六',
    phone: '13745677777',
    memberLevel: '银卡会员',
    currentPoints: 2150,
    registeredAt: '2023-04-05 16:45:00',
    status: 'active'
  },
  {
    userId: 'U005',
    name: '钱七',
    phone: '13556785555',
    memberLevel: '普通会员',
    currentPoints: 850,
    registeredAt: '2023-05-12 11:00:00',
    status: 'active'
  },
  {
    userId: 'U006',
    name: '孙八',
    phone: '13367894444',
    memberLevel: '金卡会员',
    currentPoints: 5670,
    registeredAt: '2023-06-18 13:30:00',
    status: 'disabled'
  },
  {
    userId: 'U007',
    name: '周九',
    phone: '18878903333',
    memberLevel: '白金会员',
    currentPoints: 9420,
    registeredAt: '2023-07-22 15:10:00',
    status: 'active'
  },
  {
    userId: 'U008',
    name: '吴十',
    phone: '18689012222',
    memberLevel: '银卡会员',
    currentPoints: 1980,
    registeredAt: '2023-08-08 10:25:00',
    status: 'active'
  },
  {
    userId: 'U009',
    name: '郑十一',
    phone: '18590121111',
    memberLevel: '钻石会员',
    currentPoints: 15680,
    registeredAt: '2023-09-14 09:40:00',
    status: 'active'
  },
  {
    userId: 'U010',
    name: '王十二',
    phone: '15201238888',
    memberLevel: '普通会员',
    currentPoints: 520,
    registeredAt: '2023-10-20 14:55:00',
    status: 'active'
  },
  {
    userId: 'U011',
    name: '刘十三',
    phone: '15112347777',
    memberLevel: '金卡会员',
    currentPoints: 6830,
    registeredAt: '2023-11-05 16:20:00',
    status: 'active'
  },
  {
    userId: 'U012',
    name: '陈十四',
    phone: '15023456666',
    memberLevel: '白金会员',
    currentPoints: 11250,
    registeredAt: '2023-12-10 11:35:00',
    status: 'active'
  },
  {
    userId: 'U013',
    name: '杨十五',
    phone: '15934565555',
    memberLevel: '银卡会员',
    currentPoints: 2680,
    registeredAt: '2024-01-15 13:45:00',
    status: 'active'
  },
  {
    userId: 'U014',
    name: '黄十六',
    phone: '15845674444',
    memberLevel: '普通会员',
    currentPoints: 320,
    registeredAt: '2024-02-20 10:15:00',
    status: 'disabled'
  },
  {
    userId: 'U015',
    name: '林十七',
    phone: '15756783333',
    memberLevel: '钻石会员',
    currentPoints: 18920,
    registeredAt: '2024-03-08 15:50:00',
    status: 'active'
  }
]

// 用户详情数据
export const mockUserDetails: Record<string, UserDetail> = {
  'U001': {
    userId: 'U001',
    name: '张三',
    phone: '13812348888',
    memberLevel: '钻石会员',
    currentPoints: 12580,
    registeredAt: '2023-01-15 10:30:00',
    status: 'active',
    memberInfo: {
      level: '钻石会员',
      levelProgress: {
        current: 25000,
        required: 25000,
        percentage: 100
      },
      retentionProgress: {
        current: 18500,
        required: 20000,
        percentage: 92.5
      },
      validUntil: '2025-12-31',
      joinedAt: '2023-06-20 14:30:00'
    },
    pointsInfo: {
      current: 12580,
      totalEarned: 28650,
      totalSpent: 16070,
      deductibleAmount: 125.80,
      lastUpdated: '2024-11-20 16:45:00'
    },
    recentOrders: [
      {
        orderId: 'O2024112001',
        hotelName: '北京三里屯亚朵酒店',
        roomType: '豪华大床房',
        checkIn: '2024-11-15',
        checkOut: '2024-11-17',
        amount: 1288,
        pointsEarned: 1546,
        status: 'completed'
      },
      {
        orderId: 'O2024111501',
        hotelName: '上海外滩全季酒店',
        roomType: '高级双床房',
        checkIn: '2024-11-10',
        checkOut: '2024-11-12',
        amount: 968,
        pointsEarned: 1162,
        status: 'completed'
      },
      {
        orderId: 'O2024110801',
        hotelName: '杭州西湖希尔顿酒店',
        roomType: '行政套房',
        checkIn: '2024-12-01',
        checkOut: '2024-12-03',
        amount: 2588,
        pointsEarned: 3106,
        status: 'upcoming'
      }
    ]
  },
  'U002': {
    userId: 'U002',
    name: '李四',
    phone: '13923456666',
    memberLevel: '白金会员',
    currentPoints: 8650,
    registeredAt: '2023-02-20 14:20:00',
    status: 'active',
    memberInfo: {
      level: '白金会员',
      levelProgress: {
        current: 12500,
        required: 15000,
        percentage: 83.3
      },
      retentionProgress: {
        current: 9200,
        required: 12000,
        percentage: 76.7
      },
      validUntil: '2025-12-31',
      joinedAt: '2023-08-10 11:20:00'
    },
    pointsInfo: {
      current: 8650,
      totalEarned: 18920,
      totalSpent: 10270,
      deductibleAmount: 86.50,
      lastUpdated: '2024-11-18 14:20:00'
    },
    recentOrders: [
      {
        orderId: 'O2024111802',
        hotelName: '深圳南山维也纳酒店',
        roomType: '商务大床房',
        checkIn: '2024-11-12',
        checkOut: '2024-11-14',
        amount: 688,
        pointsEarned: 756,
        status: 'completed'
      },
      {
        orderId: 'O2024110502',
        hotelName: '广州天河宜必思酒店',
        roomType: '标准双床房',
        checkIn: '2024-11-05',
        checkOut: '2024-11-06',
        amount: 398,
        pointsEarned: 438,
        status: 'completed'
      }
    ]
  },
  'U003': {
    userId: 'U003',
    name: '王五',
    phone: '13634569999',
    memberLevel: '金卡会员',
    currentPoints: 4320,
    registeredAt: '2023-03-10 09:15:00',
    status: 'active',
    memberInfo: {
      level: '金卡会员',
      levelProgress: {
        current: 6500,
        required: 8000,
        percentage: 81.3
      },
      retentionProgress: {
        current: 4200,
        required: 5000,
        percentage: 84.0
      },
      validUntil: '2025-12-31',
      joinedAt: '2023-10-05 16:45:00'
    },
    pointsInfo: {
      current: 4320,
      totalEarned: 9850,
      totalSpent: 5530,
      deductibleAmount: 43.20,
      lastUpdated: '2024-11-16 10:30:00'
    },
    recentOrders: [
      {
        orderId: 'O2024111603',
        hotelName: '成都春熙路如家酒店',
        roomType: '经济大床房',
        checkIn: '2024-11-10',
        checkOut: '2024-11-11',
        amount: 298,
        pointsEarned: 328,
        status: 'completed'
      }
    ]
  },
  'U004': {
    userId: 'U004',
    name: '赵六',
    phone: '13745677777',
    memberLevel: '银卡会员',
    currentPoints: 2150,
    registeredAt: '2023-04-05 16:45:00',
    status: 'active',
    memberInfo: {
      level: '银卡会员',
      levelProgress: {
        current: 2800,
        required: 3000,
        percentage: 93.3
      },
      retentionProgress: {
        current: 1850,
        required: 2000,
        percentage: 92.5
      },
      validUntil: '2025-12-31',
      joinedAt: '2023-12-15 13:20:00'
    },
    pointsInfo: {
      current: 2150,
      totalEarned: 4680,
      totalSpent: 2530,
      deductibleAmount: 21.50,
      lastUpdated: '2024-11-14 09:15:00'
    },
    recentOrders: [
      {
        orderId: 'O2024111404',
        hotelName: '西安钟楼7天酒店',
        roomType: '标准大床房',
        checkIn: '2024-11-08',
        checkOut: '2024-11-09',
        amount: 228,
        pointsEarned: 228,
        status: 'completed'
      }
    ]
  },
  'U005': {
    userId: 'U005',
    name: '钱七',
    phone: '13556785555',
    memberLevel: '普通会员',
    currentPoints: 850,
    registeredAt: '2023-05-12 11:00:00',
    status: 'active',
    memberInfo: {
      level: '普通会员',
      levelProgress: {
        current: 800,
        required: 1000,
        percentage: 80.0
      },
      retentionProgress: {
        current: 0,
        required: 0,
        percentage: 0
      },
      validUntil: '-',
      joinedAt: '2023-05-12 11:00:00'
    },
    pointsInfo: {
      current: 850,
      totalEarned: 1680,
      totalSpent: 830,
      deductibleAmount: 8.50,
      lastUpdated: '2024-11-10 15:20:00'
    },
    recentOrders: [
      {
        orderId: 'O2024111005',
        hotelName: '重庆解放碑汉庭酒店',
        roomType: '特惠房',
        checkIn: '2024-11-05',
        checkOut: '2024-11-06',
        amount: 188,
        pointsEarned: 188,
        status: 'completed'
      }
    ]
  }
}

// 会员等级列表（用于筛选）
export const memberLevels: MemberLevel[] = [
  '普通会员',
  '银卡会员',
  '金卡会员',
  '白金会员',
  '钻石会员'
]
