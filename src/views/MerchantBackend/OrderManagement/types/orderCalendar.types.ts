// 订单日历类型定义

export interface OrderBooking {
  id: string
  guestName: string // 客人名称（如"XIAOAI（服务）"）
  startDate: string // 入住日期 YYYY-MM-DD
  endDate: string // 离店日期 YYYY-MM-DD
  nights: number // 住宿天数
  hasSpecialMark: boolean // 是否有特殊标记（红点）
  orderStatus: 'confirmed' | 'pending' | 'checked-in' | 'checked-out' // 订单状态
}

export interface RoomTypeOrders {
  id: string
  roomTypeName: string // 房型名称
  buildingNumber: string // 号院
  totalRooms: number // 总房数
  bookings: OrderBooking[] // 订单列表
}

export interface OrderCalendarData {
  startDate: string // 开始日期
  endDate: string // 结束日期
  roomTypeOrders: RoomTypeOrders[] // 所有房型的订单数据
}

export interface OrderCalendarFilterParams {
  startDate?: string
  roomType?: string
}

// 订单状态颜色映射
export const ORDER_STATUS_COLORS = {
  confirmed: 'bg-gray-400', // 灰色 - 已确认
  pending: 'bg-yellow-400', // 黄色 - 待确认
  'checked-in': 'bg-green-500', // 绿色 - 已入住
  'checked-out': 'bg-blue-400' // 蓝色 - 已离店
} as const
