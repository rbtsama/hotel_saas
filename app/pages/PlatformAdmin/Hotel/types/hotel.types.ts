/**
 * 房间状态类型
 */
export type RoomStatus = 'available' | 'booked' | 'occupied' | 'dirty' | 'maintenance'

/**
 * 房型信息
 */
export interface RoomType {
  id: string
  name: string
  totalRooms: number
  basePrice: number
}

/**
 * 房态数据
 */
export interface RoomStatusData {
  date: string // 格式: YYYY-MM-DD
  roomTypeId: string
  available: number
  booked: number
  occupied: number
  dirty: number
  maintenance: number
}

/**
 * 房态单元格数据
 */
export interface RoomStatusCell {
  date: string
  roomTypeId: string
  statusCounts: {
    available: number
    booked: number
    occupied: number
    dirty: number
    maintenance: number
  }
  totalRooms: number
}

/**
 * 房间可用性状态（用于房间管理）
 */
export type RoomAvailability = 'available' | 'maintenance' | 'out_of_service'

/**
 * 房间设施类型
 */
export type RoomFacility = 'wifi' | 'air_conditioning' | 'tv' | 'refrigerator' | 'bathtub' | 'balcony' | 'safe_box' | 'mini_bar'

/**
 * 房间信息
 */
export interface Room {
  id: string
  roomNumber: string
  roomTypeId: string
  roomTypeName: string
  floor: number
  status: RoomAvailability
  facilities: RoomFacility[]
  lastCleanedAt: string
  createdAt: string
  updatedAt: string
}

/**
 * 房间筛选参数
 */
export interface RoomFilterParams {
  search?: string
  roomTypeId?: string
  floor?: number
  status?: RoomAvailability | 'all'
}

/**
 * 入住记录
 */
export interface CheckInRecord {
  id: string
  reservationId: string
  orderNo: string
  guestName: string
  guestPhone: string
  guestIdCard: string
  roomTypeId: string
  roomTypeName: string
  roomNumber?: string
  checkInDate: string
  checkOutDate: string
  depositAmount: number
  depositPaid: boolean
  status: 'waiting' | 'checked_in'
  createdAt: string
}

/**
 * 可用房间
 */
export interface AvailableRoom {
  roomNumber: string
  roomTypeId: string
  roomTypeName: string
  floor: number
  status: 'available' | 'occupied' | 'cleaning'
}

/**
 * 办理入住表单
 */
export interface CheckInFormData {
  guestName: string
  guestPhone: string
  guestIdCard: string
  roomNumber: string
  depositAmount: number
}

/**
 * 退房账单明细
 */
export interface CheckOutBill {
  roomCharge: number
  deposit: number
  otherFees: number
  total: number
  refundAmount: number
}

/**
 * 入住搜索参数
 */
export interface CheckInSearchParams {
  keyword?: string
  status?: 'waiting' | 'checked_in'
}

/**
 * 预订状态类型
 */
export type ReservationStatus = 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled'

/**
 * 预订来源类型
 */
export type ReservationSource = 'online' | 'front_desk'

/**
 * 预订接口
 */
export interface Reservation {
  id: string
  orderNo: string
  guestName: string
  guestPhone: string
  roomTypeId: string
  roomTypeName: string
  checkInDate: string
  checkOutDate: string
  roomCount: number
  totalPrice: number
  source: ReservationSource
  status: ReservationStatus
  createdAt: string
}

/**
 * 预订筛选参数
 */
export interface ReservationFilterParams {
  status?: ReservationStatus | 'all'
  search?: string
  startDate?: string
  endDate?: string
  page?: number
  pageSize?: number
}

/**
 * 分页响应
 */
export interface PaginatedReservations {
  data: Reservation[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * 每日价格数据
 */
export interface DailyPrice {
  date: string // 格式: YYYY-MM-DD
  roomTypeId: string
  price: number
  isWeekend: boolean
  isHoliday: boolean
  label?: string
}

/**
 * 价格策略配置
 */
export interface PriceStrategy {
  id: string
  name: string
  roomTypeId: string
  weekdayPrice: number
  weekendPrice: number
  holidayMultiplier: number
}

/**
 * 批量价格设置参数
 */
export interface BatchPriceParams {
  roomTypeId: string
  startDate: string
  endDate: string
  price: number
  applyTo: 'weekday' | 'weekend' | 'all'
}
