/**
 * 经营管理 - Mock数据
 * 符合1.0系统规模：20家酒店，50单/天
 */

import type { BusinessOverview, BusinessStatistics, FinancialStatement, Settlement } from '../../types/business.types'

// 今日经营概览
export const mockBusinessOverview: BusinessOverview = {
  today: {
    date: '11/18/25',
    orderCount: 3,
    checkInCount: 2,
    checkOutCount: 1,
    revenue: 1520,
    commission: 76,
    netRevenue: 1444,
    occupancyRate: 75, // 75%出租率
    averageRoomRate: 380
  },
  thisMonth: {
    month: '11/25',
    totalOrders: 45,
    totalRevenue: 22500,
    totalCommission: 1125,
    netRevenue: 21375,
    avgOccupancyRate: 68,
    roomNights: 85,
    revPAR: 265 // RevPAR = 总收入 / 总可售房间数
  },
  todos: {
    pendingConfirm: 2,
    pendingRefund: 1,
    pendingReview: 3,
    todayCheckIn: 4,
    todayCheckOut: 2
  }
}

// 经营统计（最近7天）
export const mockBusinessStatistics: BusinessStatistics = {
  dateRange: {
    start: '11/12/25',
    end: '11/18/25'
  },
  orderStats: {
    totalOrders: 21,
    completedOrders: 18,
    cancelledOrders: 2,
    refundedOrders: 1,
    completionRate: 85.7,
    cancellationRate: 9.5
  },
  revenueStats: {
    totalRevenue: 10500,
    totalCommission: 525,
    netRevenue: 9975,
    couponDiscount: 450,
    pointsDiscount: 200,
    memberDiscount: 350
  },
  roomTypeStats: [
    {
      roomTypeName: '豪华大床房',
      orderCount: 12,
      revenue: 6300,
      occupancyRate: 85
    },
    {
      roomTypeName: '标准双床房',
      orderCount: 9,
      revenue: 4200,
      occupancyRate: 64
    }
  ],
  trendData: [
    { date: '11/12', orderCount: 3, revenue: 1500, occupancyRate: 60 },
    { date: '11/13', orderCount: 2, revenue: 1050, occupancyRate: 55 },
    { date: '11/14', orderCount: 4, revenue: 1800, occupancyRate: 70 },
    { date: '11/15', orderCount: 3, revenue: 1350, occupancyRate: 65 },
    { date: '11/16', orderCount: 2, revenue: 980, occupancyRate: 50 },
    { date: '11/17', orderCount: 4, revenue: 2300, occupancyRate: 80 },
    { date: '11/18', orderCount: 3, revenue: 1520, occupancyRate: 75 }
  ]
}

// 财务对账单
export const mockFinancialStatements: FinancialStatement[] = [
  {
    id: 'STMT001',
    month: '10/25',
    orders: [
      {
        orderNumber: '20251001001',
        checkInDate: '10/01/25',
        checkOutDate: '10/02/25',
        roomTypeName: '豪华大床房',
        actualAmount: 520,
        commission: 26,
        merchantAmount: 494
      },
      {
        orderNumber: '20251002002',
        checkInDate: '10/02/25',
        checkOutDate: '10/03/25',
        roomTypeName: '标准双床房',
        actualAmount: 300,
        commission: 15,
        merchantAmount: 285
      }
      // ... 更多订单
    ],
    summary: {
      totalOrders: 52,
      totalRevenue: 26800,
      totalCommission: 1340,
      totalMerchantAmount: 25460,
      commissionRate: 5
    },
    status: 'settled',
    createdAt: '11/01/25 00:00:00',
    confirmedAt: '11/02/25 10:00:00',
    settledAt: '11/05/25 15:30:00'
  },
  {
    id: 'STMT002',
    month: '11/25',
    orders: [],
    summary: {
      totalOrders: 45,
      totalRevenue: 22500,
      totalCommission: 1125,
      totalMerchantAmount: 21375,
      commissionRate: 5
    },
    status: 'confirmed',
    createdAt: '12/01/25 00:00:00',
    confirmedAt: '12/02/25 09:00:00'
  }
]

// 结算记录
export const mockSettlements: Settlement[] = [
  {
    id: 'STL001',
    month: '10/25',
    amount: 25460,
    status: 'completed',
    bankAccount: '****1234',
    requestedAt: '11/02/25 10:00:00',
    settledAt: '11/05/25 15:30:00',
    note: '10月份经营结算，已到账'
  },
  {
    id: 'STL002',
    month: '11/25',
    amount: 21375,
    status: 'pending',
    bankAccount: '****1234',
    requestedAt: '12/02/25 09:00:00',
    note: '11月份经营结算，审核中'
  }
]
