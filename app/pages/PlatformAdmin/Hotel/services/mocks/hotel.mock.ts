import type { RoomType, RoomStatusData, CheckInRecord, AvailableRoom, Reservation, Room, DailyPrice, PriceStrategy } from '../../types/hotel.types'
import dayjs from 'dayjs'

/**
 * 房型数据
 */
export const mockRoomTypes: RoomType[] = [
  {
    id: 'rt001',
    name: '豪华大床房',
    totalRooms: 10,
    basePrice: 688,
  },
  {
    id: 'rt002',
    name: '豪华双床房',
    totalRooms: 12,
    basePrice: 688,
  },
  {
    id: 'rt003',
    name: '行政套房',
    totalRooms: 6,
    basePrice: 988,
  },
  {
    id: 'rt004',
    name: '总统套房',
    totalRooms: 2,
    basePrice: 1888,
  },
  {
    id: 'rt005',
    name: '经济单人房',
    totalRooms: 15,
    basePrice: 388,
  },
]

/**
 * 生成7天的房态数据
 */
function generateRoomStatusData(): RoomStatusData[] {
  const data: RoomStatusData[] = []
  const today = dayjs()

  // 为每个房型生成7天的数据
  mockRoomTypes.forEach(roomType => {
    for (let i = 0; i < 7; i++) {
      const date = today.add(i, 'day').format('YYYY-MM-DD')

      // 模拟不同日期的房态
      let available = roomType.totalRooms
      let booked = 0
      let occupied = 0
      let dirty = 0
      let maintenance = 0

      // 根据日期和房型模拟不同的占用情况
      if (i === 0) {
        // 今天：部分已入住，部分脏房
        occupied = Math.floor(roomType.totalRooms * 0.6)
        dirty = Math.floor(roomType.totalRooms * 0.15)
        maintenance = roomType.id === 'rt001' ? 1 : 0
        available = roomType.totalRooms - occupied - dirty - maintenance
      } else if (i === 1) {
        // 明天：部分已订，部分已住，部分脏房
        booked = Math.floor(roomType.totalRooms * 0.3)
        occupied = Math.floor(roomType.totalRooms * 0.4)
        dirty = Math.floor(roomType.totalRooms * 0.1)
        maintenance = roomType.id === 'rt004' ? 1 : 0
        available = roomType.totalRooms - booked - occupied - dirty - maintenance
      } else if (i >= 2 && i <= 4) {
        // 2-4天后：高峰期，大部分已订
        booked = Math.floor(roomType.totalRooms * 0.7)
        occupied = Math.floor(roomType.totalRooms * 0.1)
        dirty = Math.floor(roomType.totalRooms * 0.05)
        available = roomType.totalRooms - booked - occupied - dirty
      } else {
        // 5-6天后：部分已订
        booked = Math.floor(roomType.totalRooms * 0.4)
        occupied = Math.floor(roomType.totalRooms * 0.2)
        dirty = Math.floor(roomType.totalRooms * 0.1)
        available = roomType.totalRooms - booked - occupied - dirty
      }

      data.push({
        date,
        roomTypeId: roomType.id,
        available,
        booked,
        occupied,
        dirty,
        maintenance,
      })
    }
  })

  return data
}

/**
 * 房态数据
 */
export const mockRoomStatusData: RoomStatusData[] = generateRoomStatusData()

/**
 * 预订数据
 */
export const mockReservations: Reservation[] = [
  {
    id: 'rsv001',
    orderNo: 'ORD20251126001',
    guestName: '张伟',
    guestPhone: '13800138001',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    checkInDate: '2025-11-28',
    checkOutDate: '2025-11-30',
    roomCount: 1,
    totalPrice: 1376,
    source: 'online',
    status: 'confirmed',
    createdAt: '2025-11-25 09:30:00',
  },
  {
    id: 'rsv002',
    orderNo: 'ORD20251126002',
    guestName: '李娜',
    guestPhone: '13900139002',
    roomTypeId: 'rt003',
    roomTypeName: '行政套房',
    checkInDate: '2025-11-27',
    checkOutDate: '2025-11-29',
    roomCount: 1,
    totalPrice: 1976,
    source: 'front_desk',
    status: 'pending',
    createdAt: '2025-11-26 10:15:00',
  },
  {
    id: 'rsv003',
    orderNo: 'ORD20251126003',
    guestName: '王强',
    guestPhone: '13700137003',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    checkInDate: '2025-11-26',
    checkOutDate: '2025-11-28',
    roomCount: 2,
    totalPrice: 2752,
    source: 'online',
    status: 'checked_in',
    createdAt: '2025-11-24 14:20:00',
  },
  {
    id: 'rsv004',
    orderNo: 'ORD20251125004',
    guestName: '赵敏',
    guestPhone: '13600136004',
    roomTypeId: 'rt004',
    roomTypeName: '总统套房',
    checkInDate: '2025-11-29',
    checkOutDate: '2025-12-01',
    roomCount: 1,
    totalPrice: 3776,
    source: 'online',
    status: 'confirmed',
    createdAt: '2025-11-23 16:45:00',
  },
  {
    id: 'rsv005',
    orderNo: 'ORD20251125005',
    guestName: '刘洋',
    guestPhone: '13500135005',
    roomTypeId: 'rt005',
    roomTypeName: '经济单人房',
    checkInDate: '2025-11-27',
    checkOutDate: '2025-11-28',
    roomCount: 1,
    totalPrice: 388,
    source: 'front_desk',
    status: 'confirmed',
    createdAt: '2025-11-25 11:30:00',
  },
  {
    id: 'rsv006',
    orderNo: 'ORD20251124006',
    guestName: '陈红',
    guestPhone: '13400134006',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    checkInDate: '2025-11-24',
    checkOutDate: '2025-11-26',
    roomCount: 1,
    totalPrice: 1376,
    source: 'online',
    status: 'completed',
    createdAt: '2025-11-22 09:00:00',
  },
  {
    id: 'rsv007',
    orderNo: 'ORD20251124007',
    guestName: '杨涛',
    guestPhone: '13300133007',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    checkInDate: '2025-11-30',
    checkOutDate: '2025-12-02',
    roomCount: 1,
    totalPrice: 1376,
    source: 'online',
    status: 'confirmed',
    createdAt: '2025-11-24 13:20:00',
  },
  {
    id: 'rsv008',
    orderNo: 'ORD20251123008',
    guestName: '周杰',
    guestPhone: '13200132008',
    roomTypeId: 'rt003',
    roomTypeName: '行政套房',
    checkInDate: '2025-11-25',
    checkOutDate: '2025-11-27',
    roomCount: 1,
    totalPrice: 1976,
    source: 'front_desk',
    status: 'cancelled',
    createdAt: '2025-11-21 15:40:00',
  },
  {
    id: 'rsv009',
    orderNo: 'ORD20251123009',
    guestName: '吴梅',
    guestPhone: '13100131009',
    roomTypeId: 'rt005',
    roomTypeName: '经济单人房',
    checkInDate: '2025-11-28',
    checkOutDate: '2025-11-30',
    roomCount: 2,
    totalPrice: 776,
    source: 'online',
    status: 'pending',
    createdAt: '2025-11-26 08:50:00',
  },
  {
    id: 'rsv010',
    orderNo: 'ORD20251122010',
    guestName: '郑芳',
    guestPhone: '13000130010',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    checkInDate: '2025-11-26',
    checkOutDate: '2025-11-29',
    roomCount: 1,
    totalPrice: 2064,
    source: 'online',
    status: 'checked_in',
    createdAt: '2025-11-20 10:30:00',
  },
  {
    id: 'rsv011',
    orderNo: 'ORD20251122011',
    guestName: '孙强',
    guestPhone: '13999139011',
    roomTypeId: 'rt004',
    roomTypeName: '总统套房',
    checkInDate: '2025-12-01',
    checkOutDate: '2025-12-03',
    roomCount: 1,
    totalPrice: 3776,
    source: 'online',
    status: 'confirmed',
    createdAt: '2025-11-21 14:00:00',
  },
  {
    id: 'rsv012',
    orderNo: 'ORD20251121012',
    guestName: '马丽',
    guestPhone: '13888138012',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    checkInDate: '2025-11-27',
    checkOutDate: '2025-11-28',
    roomCount: 1,
    totalPrice: 688,
    source: 'front_desk',
    status: 'confirmed',
    createdAt: '2025-11-26 09:15:00',
  },
  {
    id: 'rsv013',
    orderNo: 'ORD20251121013',
    guestName: '林峰',
    guestPhone: '13777137013',
    roomTypeId: 'rt003',
    roomTypeName: '行政套房',
    checkInDate: '2025-11-23',
    checkOutDate: '2025-11-25',
    roomCount: 1,
    totalPrice: 1976,
    source: 'online',
    status: 'completed',
    createdAt: '2025-11-19 16:30:00',
  },
  {
    id: 'rsv014',
    orderNo: 'ORD20251120014',
    guestName: '许静',
    guestPhone: '13666136014',
    roomTypeId: 'rt005',
    roomTypeName: '经济单人房',
    checkInDate: '2025-11-29',
    checkOutDate: '2025-12-01',
    roomCount: 1,
    totalPrice: 776,
    source: 'online',
    status: 'pending',
    createdAt: '2025-11-26 11:45:00',
  },
  {
    id: 'rsv015',
    orderNo: 'ORD20251120015',
    guestName: '何伟',
    guestPhone: '13555135015',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    checkInDate: '2025-11-22',
    checkOutDate: '2025-11-24',
    roomCount: 1,
    totalPrice: 1376,
    source: 'front_desk',
    status: 'cancelled',
    createdAt: '2025-11-18 13:20:00',
  },
]

/**
 * 生成指定月份的每日价格数据
 * @param year 年份
 * @param month 月份 (1-12)
 */
function generateDailyPrices(year: number, month: number): DailyPrice[] {
  const prices: DailyPrice[] = []
  const startDate = dayjs(`${year}-${String(month).padStart(2, '0')}-01`)
  const daysInMonth = startDate.daysInMonth()

  // 中国法定节假日（简化版）
  const holidays = [
    '2025-01-01', // 元旦
    '2025-02-09', '2025-02-10', '2025-02-11', '2025-02-12', '2025-02-13', // 春节
    '2025-04-04', '2025-04-05', '2025-04-06', // 清明节
    '2025-05-01', '2025-05-02', '2025-05-03', // 劳动节
    '2025-06-09', '2025-06-10', '2025-06-11', // 端午节
    '2025-10-01', '2025-10-02', '2025-10-03', '2025-10-04', '2025-10-05', '2025-10-06', '2025-10-07', // 国庆节
    '2025-12-25', // 圣诞节
  ]

  mockRoomTypes.forEach(roomType => {
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = startDate.date(day)
      const dateStr = currentDate.format('YYYY-MM-DD')
      const dayOfWeek = currentDate.day()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const isHoliday = holidays.includes(dateStr)

      let price = roomType.basePrice
      let label = ''

      if (isHoliday) {
        // 节假日价格上浮30%
        price = Math.floor(roomType.basePrice * 1.3)
        label = '节假日'
      } else if (isWeekend) {
        // 周末价格上浮15%
        price = Math.floor(roomType.basePrice * 1.15)
        label = '周末'
      }

      prices.push({
        date: dateStr,
        roomTypeId: roomType.id,
        price,
        isWeekend,
        isHoliday,
        label,
      })
    }
  })

  return prices
}

/**
 * 当前月和下个月的价格数据
 */
const today = dayjs()
const currentYear = today.year()
const currentMonth = today.month() + 1
const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1
const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear

export const mockDailyPrices: DailyPrice[] = [
  ...generateDailyPrices(currentYear, currentMonth),
  ...generateDailyPrices(nextMonthYear, nextMonth),
]

/**
 * 价格策略配置数据
 */
export const mockPriceStrategies: PriceStrategy[] = mockRoomTypes.map(roomType => ({
  id: `ps-${roomType.id}`,
  name: `${roomType.name}价格策略`,
  roomTypeId: roomType.id,
  weekdayPrice: roomType.basePrice,
  weekendPrice: Math.floor(roomType.basePrice * 1.15),
  holidayMultiplier: 1.3,
}))

/**
 * 待入住记录数据
 */
export const mockWaitingCheckIns: CheckInRecord[] = [
  {
    id: 'ci001',
    reservationId: 'res001',
    orderNo: 'ORD20251126001',
    guestName: '张三',
    guestPhone: '13800138001',
    guestIdCard: '110101199001011234',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    roomNumber: undefined,
    checkInDate: dayjs().format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    depositAmount: 500,
    depositPaid: false,
    status: 'waiting',
    createdAt: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 'ci002',
    reservationId: 'res002',
    orderNo: 'ORD20251126002',
    guestName: '李四',
    guestPhone: '13900139002',
    guestIdCard: '110101199102022345',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    roomNumber: undefined,
    checkInDate: dayjs().format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(3, 'day').format('YYYY-MM-DD'),
    depositAmount: 500,
    depositPaid: false,
    status: 'waiting',
    createdAt: dayjs().subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 'ci003',
    reservationId: 'res003',
    orderNo: 'ORD20251126003',
    guestName: '王五',
    guestPhone: '13700137003',
    guestIdCard: '110101199203033456',
    roomTypeId: 'rt003',
    roomTypeName: '行政套房',
    roomNumber: undefined,
    checkInDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(4, 'day').format('YYYY-MM-DD'),
    depositAmount: 800,
    depositPaid: false,
    status: 'waiting',
    createdAt: dayjs().subtract(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 'ci004',
    reservationId: 'res004',
    orderNo: 'ORD20251126004',
    guestName: '赵六',
    guestPhone: '13600136004',
    guestIdCard: '110101199304044567',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    roomNumber: undefined,
    checkInDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(5, 'day').format('YYYY-MM-DD'),
    depositAmount: 500,
    depositPaid: false,
    status: 'waiting',
    createdAt: dayjs().subtract(4, 'day').format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 'ci005',
    reservationId: 'res005',
    orderNo: 'ORD20251126005',
    guestName: '孙七',
    guestPhone: '13500135005',
    guestIdCard: '110101199405055678',
    roomTypeId: 'rt005',
    roomTypeName: '经济单人房',
    roomNumber: undefined,
    checkInDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(4, 'day').format('YYYY-MM-DD'),
    depositAmount: 300,
    depositPaid: false,
    status: 'waiting',
    createdAt: dayjs().subtract(5, 'day').format('YYYY-MM-DD HH:mm:ss'),
  },
]

/**
 * 在住客人记录数据
 */
export const mockCheckedInGuests: CheckInRecord[] = [
  {
    id: 'ci101',
    reservationId: 'res101',
    orderNo: 'ORD20251125001',
    guestName: '周八',
    guestPhone: '13400134006',
    guestIdCard: '110101199506066789',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    roomNumber: '1001',
    checkInDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    depositAmount: 500,
    depositPaid: true,
    status: 'checked_in',
    createdAt: dayjs().subtract(5, 'day').format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 'ci102',
    reservationId: 'res102',
    orderNo: 'ORD20251125002',
    guestName: '吴九',
    guestPhone: '13300133007',
    guestIdCard: '110101199607077890',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    roomNumber: '2001',
    checkInDate: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().format('YYYY-MM-DD'),
    depositAmount: 500,
    depositPaid: true,
    status: 'checked_in',
    createdAt: dayjs().subtract(6, 'day').format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 'ci103',
    reservationId: 'res103',
    orderNo: 'ORD20251125003',
    guestName: '郑十',
    guestPhone: '13200132008',
    guestIdCard: '110101199708088901',
    roomTypeId: 'rt003',
    roomTypeName: '行政套房',
    roomNumber: '3001',
    checkInDate: dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    depositAmount: 800,
    depositPaid: true,
    status: 'checked_in',
    createdAt: dayjs().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 'ci104',
    reservationId: 'res104',
    orderNo: 'ORD20251124001',
    guestName: '冯十一',
    guestPhone: '13100131009',
    guestIdCard: '110101199809099012',
    roomTypeId: 'rt004',
    roomTypeName: '总统套房',
    roomNumber: '4001',
    checkInDate: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(3, 'day').format('YYYY-MM-DD'),
    depositAmount: 1500,
    depositPaid: true,
    status: 'checked_in',
    createdAt: dayjs().subtract(8, 'day').format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 'ci105',
    reservationId: 'res105',
    orderNo: 'ORD20251124002',
    guestName: '陈十二',
    guestPhone: '13000130010',
    guestIdCard: '110101199910100123',
    roomTypeId: 'rt005',
    roomTypeName: '经济单人房',
    roomNumber: '5001',
    checkInDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    depositAmount: 300,
    depositPaid: true,
    status: 'checked_in',
    createdAt: dayjs().subtract(4, 'day').format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 'ci106',
    reservationId: 'res106',
    orderNo: 'ORD20251124003',
    guestName: '褚十三',
    guestPhone: '13888138011',
    guestIdCard: '110101200001011234',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    roomNumber: '2002',
    checkInDate: dayjs().format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(4, 'day').format('YYYY-MM-DD'),
    depositAmount: 500,
    depositPaid: true,
    status: 'checked_in',
    createdAt: dayjs().subtract(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
  },
]

/**
 * 可用房间数据
 */
export const mockAvailableRooms: AvailableRoom[] = [
  { roomNumber: '1001', roomTypeId: 'rt001', roomTypeName: '豪华大床房', floor: 1, status: 'occupied' },
  { roomNumber: '1002', roomTypeId: 'rt001', roomTypeName: '豪华大床房', floor: 1, status: 'available' },
  { roomNumber: '1003', roomTypeId: 'rt001', roomTypeName: '豪华大床房', floor: 1, status: 'available' },
  { roomNumber: '1004', roomTypeId: 'rt001', roomTypeName: '豪华大床房', floor: 1, status: 'cleaning' },
  { roomNumber: '2001', roomTypeId: 'rt002', roomTypeName: '豪华双床房', floor: 2, status: 'occupied' },
  { roomNumber: '2002', roomTypeId: 'rt002', roomTypeName: '豪华双床房', floor: 2, status: 'occupied' },
  { roomNumber: '2003', roomTypeId: 'rt002', roomTypeName: '豪华双床房', floor: 2, status: 'available' },
  { roomNumber: '2004', roomTypeId: 'rt002', roomTypeName: '豪华双床房', floor: 2, status: 'available' },
  { roomNumber: '3001', roomTypeId: 'rt003', roomTypeName: '行政套房', floor: 3, status: 'occupied' },
  { roomNumber: '3002', roomTypeId: 'rt003', roomTypeName: '行政套房', floor: 3, status: 'available' },
  { roomNumber: '4001', roomTypeId: 'rt004', roomTypeName: '总统套房', floor: 4, status: 'occupied' },
  { roomNumber: '4002', roomTypeId: 'rt004', roomTypeName: '总统套房', floor: 4, status: 'available' },
  { roomNumber: '5001', roomTypeId: 'rt005', roomTypeName: '经济单人房', floor: 5, status: 'occupied' },
  { roomNumber: '5002', roomTypeId: 'rt005', roomTypeName: '经济单人房', floor: 5, status: 'available' },
  { roomNumber: '5003', roomTypeId: 'rt005', roomTypeName: '经济单人房', floor: 5, status: 'available' },
]

/**
 * 房间数据 (30个房间)
 */
export const mockRooms: Room[] = [
  // 2层 - 豪华大床房 (201-205)
  {
    id: 'room001',
    roomNumber: '201',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    floor: 2,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator'],
    lastCleanedAt: '11/26/25 09:30:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 09:30:00',
  },
  {
    id: 'room002',
    roomNumber: '202',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    floor: 2,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator', 'safe_box'],
    lastCleanedAt: '11/26/25 10:00:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 10:00:00',
  },
  {
    id: 'room003',
    roomNumber: '203',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    floor: 2,
    status: 'maintenance',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator'],
    lastCleanedAt: '11/25/25 16:00:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/25/25 16:00:00',
  },
  {
    id: 'room004',
    roomNumber: '204',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    floor: 2,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator', 'balcony'],
    lastCleanedAt: '11/26/25 08:15:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 08:15:00',
  },
  {
    id: 'room005',
    roomNumber: '205',
    roomTypeId: 'rt001',
    roomTypeName: '豪华大床房',
    floor: 2,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator'],
    lastCleanedAt: '11/26/25 09:00:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 09:00:00',
  },
  // 3层 - 豪华双床房 (301-308)
  {
    id: 'room006',
    roomNumber: '301',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    floor: 3,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator'],
    lastCleanedAt: '11/26/25 10:30:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 10:30:00',
  },
  {
    id: 'room007',
    roomNumber: '302',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    floor: 3,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator', 'balcony'],
    lastCleanedAt: '11/26/25 09:45:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 09:45:00',
  },
  {
    id: 'room008',
    roomNumber: '303',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    floor: 3,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator', 'safe_box'],
    lastCleanedAt: '11/26/25 08:30:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 08:30:00',
  },
  {
    id: 'room009',
    roomNumber: '304',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    floor: 3,
    status: 'maintenance',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator'],
    lastCleanedAt: '11/24/25 16:00:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/24/25 16:00:00',
  },
  {
    id: 'room010',
    roomNumber: '305',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    floor: 3,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator'],
    lastCleanedAt: '11/26/25 10:15:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 10:15:00',
  },
  {
    id: 'room011',
    roomNumber: '306',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    floor: 3,
    status: 'out_of_service',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator'],
    lastCleanedAt: '11/20/25 14:00:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/20/25 14:00:00',
  },
  {
    id: 'room012',
    roomNumber: '307',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    floor: 3,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator', 'balcony'],
    lastCleanedAt: '11/26/25 08:50:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 08:50:00',
  },
  {
    id: 'room013',
    roomNumber: '308',
    roomTypeId: 'rt002',
    roomTypeName: '豪华双床房',
    floor: 3,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator'],
    lastCleanedAt: '11/26/25 10:00:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 10:00:00',
  },
  // 4层 - 行政套房 (401-406)
  {
    id: 'room014',
    roomNumber: '401',
    roomTypeId: 'rt003',
    roomTypeName: '行政套房',
    floor: 4,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator', 'bathtub', 'balcony', 'safe_box', 'mini_bar'],
    lastCleanedAt: '11/26/25 10:45:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 10:45:00',
  },
  {
    id: 'room015',
    roomNumber: '402',
    roomTypeId: 'rt003',
    roomTypeName: '行政套房',
    floor: 4,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator', 'bathtub', 'balcony', 'safe_box', 'mini_bar'],
    lastCleanedAt: '11/26/25 09:30:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 09:30:00',
  },
  {
    id: 'room016',
    roomNumber: '403',
    roomTypeId: 'rt003',
    roomTypeName: '行政套房',
    floor: 4,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator', 'bathtub', 'balcony', 'safe_box', 'mini_bar'],
    lastCleanedAt: '11/26/25 08:45:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 08:45:00',
  },
  {
    id: 'room017',
    roomNumber: '404',
    roomTypeId: 'rt003',
    roomTypeName: '行政套房',
    floor: 4,
    status: 'maintenance',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator', 'bathtub', 'balcony', 'safe_box', 'mini_bar'],
    lastCleanedAt: '11/23/25 15:00:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/23/25 15:00:00',
  },
  {
    id: 'room018',
    roomNumber: '405',
    roomTypeId: 'rt003',
    roomTypeName: '行政套房',
    floor: 4,
    status: 'available',
    facilities: ['wifi', 'air_conditioning', 'tv', 'refrigerator', 'bathtub', 'balcony', 'safe_box', 'mini_bar'],
    lastCleanedAt: '11/26/25 10:00:00',
    createdAt: '01/10/25 10:00:00',
    updatedAt: '11/26/25 10:00:00',
  },
]
