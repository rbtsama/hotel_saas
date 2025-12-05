// 库存日历类型定义

export interface DailyInventory {
  date: string // 日期 YYYY-MM-DD
  dayOfWeek: string // 星期几
  totalRooms: number // 总房数
  availableRooms: number // 可定房数
  bookedRooms: number // 已订房数
  status: 'available' | 'limited' | 'sold-out' // 库存状态
  isWeekend: boolean // 是否周末
}

export interface RoomTypeInventory {
  id: string
  roomTypeName: string // 房型名称
  buildingNumber: string // 号院
  totalRooms: number // 该房型总房数
  dailyInventories: DailyInventory[] // 每日库存列表
}

export interface InventoryCalendarData {
  startDate: string // 开始日期
  endDate: string // 结束日期
  roomTypeInventories: RoomTypeInventory[] // 所有房型的库存数据
}

export interface InventoryCalendarFilterParams {
  startDate?: string
  roomType?: string
}

// 库存状态类型
export type InventoryStatus = 'available' | 'limited' | 'sold-out'
