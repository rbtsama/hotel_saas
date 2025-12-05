// 房价日历类型定义

export interface DailyPrice {
  date: string // 日期 YYYY-MM-DD
  dayOfWeek: string // 星期几
  price: number // 价格
  isWeekend: boolean // 是否周末
  hasDiscount: boolean // 是否有折扣
}

export interface RoomTypePricing {
  id: string
  roomTypeName: string // 房型名称
  buildingNumber: string // 号院
  dailyPrices: DailyPrice[] // 每日价格列表
}

export interface PriceCalendarData {
  startDate: string // 开始日期
  endDate: string // 结束日期
  roomTypePricings: RoomTypePricing[] // 所有房型的价格数据
}

export interface PriceCalendarFilterParams {
  startDate?: string
  roomType?: string
}
