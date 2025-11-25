import type { RoomType, RoomStatusData, Reservation, ReservationFilterParams, PaginatedReservations, DailyPrice, PriceStrategy, BatchPriceParams, CheckInRecord, CheckInSearchParams, AvailableRoom, CheckInFormData, CheckOutBill, Room, RoomFilterParams } from '../types/hotel.types'
import { mockRoomTypes, mockRoomStatusData, mockReservations, mockDailyPrices, mockPriceStrategies, mockWaitingCheckIns, mockCheckedInGuests, mockAvailableRooms, mockRooms } from './mocks'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

class HotelService {
  private roomTypes = [...mockRoomTypes]
  private roomStatusData = [...mockRoomStatusData]
  private reservations = [...mockReservations]
  private dailyPrices = [...mockDailyPrices]
  private priceStrategies = [...mockPriceStrategies]
  private waitingCheckIns = [...mockWaitingCheckIns]
  private checkedInGuests = [...mockCheckedInGuests]
  private availableRooms = [...mockAvailableRooms]
  private rooms = [...mockRooms]

  /**
   * 获取所有房型
   */
  async getRoomTypes(): Promise<RoomType[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.roomTypes
  }

  /**
   * 获取指定日期范围的房态数据
   * @param startDate 开始日期 YYYY-MM-DD
   * @param days 天数
   */
  async getRoomStatusData(startDate: string, days: number = 7): Promise<RoomStatusData[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const start = dayjs(startDate)
    const dates: string[] = []

    for (let i = 0; i < days; i++) {
      dates.push(start.add(i, 'day').format('YYYY-MM-DD'))
    }

    // 过滤出指定日期范围内的数据
    return this.roomStatusData.filter(data => dates.includes(data.date))
  }

  /**
   * 获取房型的指定日期房态
   */
  async getRoomStatusByDateAndType(date: string, roomTypeId: string): Promise<RoomStatusData | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.roomStatusData.find(
      data => data.date === date && data.roomTypeId === roomTypeId
    ) || null
  }

  /**
   * 获取预订列表（支持筛选和分页）
   */
  async getReservations(params?: ReservationFilterParams): Promise<PaginatedReservations> {
    await new Promise(resolve => setTimeout(resolve, 500))

    let filtered = [...this.reservations]

    // 状态筛选
    if (params?.status && params.status !== 'all') {
      filtered = filtered.filter(r => r.status === params.status)
    }

    // 搜索（订单号/客人姓名/手机号）
    if (params?.search && params.search.trim()) {
      const searchLower = params.search.toLowerCase().trim()
      filtered = filtered.filter(r =>
        r.orderNo.toLowerCase().includes(searchLower) ||
        r.guestName.toLowerCase().includes(searchLower) ||
        r.guestPhone.includes(searchLower)
      )
    }

    // 日期范围筛选
    if (params?.startDate) {
      filtered = filtered.filter(r => r.checkInDate >= params.startDate!)
    }
    if (params?.endDate) {
      filtered = filtered.filter(r => r.checkInDate <= params.endDate!)
    }

    // 按创建时间倒序排序
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // 分页
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const data = filtered.slice(start, end)

    return {
      data,
      total,
      page,
      pageSize,
      totalPages,
    }
  }

  /**
   * 根据ID获取预订详情
   */
  async getReservationById(id: string): Promise<Reservation | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.reservations.find(r => r.id === id) || null
  }

  /**
   * 确认预订
   */
  async confirmReservation(id: string): Promise<Reservation> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const reservation = this.reservations.find(r => r.id === id)
    if (!reservation) {
      throw new Error('预订不存在')
    }
    reservation.status = 'confirmed'
    return reservation
  }

  /**
   * 取消预订
   */
  async cancelReservation(id: string): Promise<Reservation> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const reservation = this.reservations.find(r => r.id === id)
    if (!reservation) {
      throw new Error('预订不存在')
    }
    reservation.status = 'cancelled'
    return reservation
  }

  /**
   * 获取指定月份的房价数据
   * @param year 年份
   * @param month 月份 (1-12)
   * @param roomTypeId 房型ID（可选）
   */
  async getDailyPrices(year: number, month: number, roomTypeId?: string): Promise<DailyPrice[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const startDate = dayjs(`${year}-${String(month).padStart(2, '0')}-01`)
    const endDate = startDate.endOf('month')

    let filtered = this.dailyPrices.filter(price => {
      const priceDate = dayjs(price.date)
      return priceDate.isSameOrAfter(startDate, 'day') && priceDate.isSameOrBefore(endDate, 'day')
    })

    if (roomTypeId) {
      filtered = filtered.filter(price => price.roomTypeId === roomTypeId)
    }

    return filtered
  }

  /**
   * 更新单日价格
   */
  async updateDailyPrice(date: string, roomTypeId: string, price: number): Promise<DailyPrice> {
    await new Promise(resolve => setTimeout(resolve, 200))

    const index = this.dailyPrices.findIndex(
      p => p.date === date && p.roomTypeId === roomTypeId
    )

    if (index === -1) {
      throw new Error('价格数据不存在')
    }

    this.dailyPrices[index].price = price
    return this.dailyPrices[index]
  }

  /**
   * 批量设置价格
   */
  async batchUpdatePrices(params: BatchPriceParams): Promise<DailyPrice[]> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const { roomTypeId, startDate, endDate, price, applyTo } = params
    const start = dayjs(startDate)
    const end = dayjs(endDate)
    const updatedPrices: DailyPrice[] = []

    this.dailyPrices.forEach(priceData => {
      if (priceData.roomTypeId !== roomTypeId) return

      const currentDate = dayjs(priceData.date)
      if (currentDate.isBefore(start, 'day') || currentDate.isAfter(end, 'day')) return

      // 根据应用类型决定是否更新
      let shouldUpdate = false
      if (applyTo === 'all') {
        shouldUpdate = true
      } else if (applyTo === 'weekday' && !priceData.isWeekend && !priceData.isHoliday) {
        shouldUpdate = true
      } else if (applyTo === 'weekend' && (priceData.isWeekend || priceData.isHoliday)) {
        shouldUpdate = true
      }

      if (shouldUpdate) {
        priceData.price = price
        updatedPrices.push(priceData)
      }
    })

    return updatedPrices
  }

  /**
   * 获取价格策略
   */
  async getPriceStrategies(roomTypeId?: string): Promise<PriceStrategy[]> {
    await new Promise(resolve => setTimeout(resolve, 200))

    if (roomTypeId) {
      return this.priceStrategies.filter(s => s.roomTypeId === roomTypeId)
    }

    return this.priceStrategies
  }

  /**
   * 获取待入住记录
   */
  async getWaitingCheckIns(params?: CheckInSearchParams): Promise<CheckInRecord[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...this.waitingCheckIns]

    // 关键词搜索（订单号/客人姓名/手机号/房间号）
    if (params?.keyword && params.keyword.trim()) {
      const keyword = params.keyword.toLowerCase().trim()
      filtered = filtered.filter(record =>
        record.orderNo.toLowerCase().includes(keyword) ||
        record.guestName.toLowerCase().includes(keyword) ||
        record.guestPhone.includes(keyword) ||
        (record.roomNumber && record.roomNumber.includes(keyword))
      )
    }

    // 按入住日期排序
    filtered.sort((a, b) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime())

    return filtered
  }

  /**
   * 获取在住客人记录
   */
  async getCheckedInGuests(params?: CheckInSearchParams): Promise<CheckInRecord[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...this.checkedInGuests]

    // 关键词搜索（订单号/客人姓名/手机号/房间号）
    if (params?.keyword && params.keyword.trim()) {
      const keyword = params.keyword.toLowerCase().trim()
      filtered = filtered.filter(record =>
        record.orderNo.toLowerCase().includes(keyword) ||
        record.guestName.toLowerCase().includes(keyword) ||
        record.guestPhone.includes(keyword) ||
        (record.roomNumber && record.roomNumber.includes(keyword))
      )
    }

    // 按入住日期倒序排序
    filtered.sort((a, b) => new Date(b.checkInDate).getTime() - new Date(a.checkInDate).getTime())

    return filtered
  }

  /**
   * 获取可用房间列表（根据房型筛选）
   */
  async getAvailableRooms(roomTypeId?: string): Promise<AvailableRoom[]> {
    await new Promise(resolve => setTimeout(resolve, 200))

    let filtered = this.availableRooms.filter(room => room.status === 'available')

    if (roomTypeId) {
      filtered = filtered.filter(room => room.roomTypeId === roomTypeId)
    }

    return filtered
  }

  /**
   * 办理入住
   */
  async checkIn(recordId: string, formData: CheckInFormData): Promise<CheckInRecord> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const index = this.waitingCheckIns.findIndex(r => r.id === recordId)
    if (index === -1) {
      throw new Error('待入住记录不存在')
    }

    const record = this.waitingCheckIns[index]

    // 检查房间是否可用
    const room = this.availableRooms.find(r => r.roomNumber === formData.roomNumber && r.status === 'available')
    if (!room) {
      throw new Error('房间不可用')
    }

    // 更新入住记录
    record.guestName = formData.guestName
    record.guestPhone = formData.guestPhone
    record.guestIdCard = formData.guestIdCard
    record.roomNumber = formData.roomNumber
    record.depositAmount = formData.depositAmount
    record.depositPaid = true
    record.status = 'checked_in'

    // 更新房间状态
    room.status = 'occupied'

    // 移动到在住列表
    this.waitingCheckIns.splice(index, 1)
    this.checkedInGuests.unshift(record)

    return record
  }

  /**
   * 办理退房
   */
  async checkOut(recordId: string): Promise<CheckOutBill> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const index = this.checkedInGuests.findIndex(r => r.id === recordId)
    if (index === -1) {
      throw new Error('在住记录不存在')
    }

    const record = this.checkedInGuests[index]

    // 计算账单
    const checkInDate = dayjs(record.checkInDate)
    const checkOutDate = dayjs(record.checkOutDate)
    const nights = checkOutDate.diff(checkInDate, 'day')

    const roomType = this.roomTypes.find(rt => rt.id === record.roomTypeId)
    const roomCharge = roomType ? roomType.basePrice * nights : 0

    const bill: CheckOutBill = {
      roomCharge,
      deposit: record.depositAmount,
      otherFees: 0,
      total: roomCharge,
      refundAmount: record.depositAmount,
    }

    // 更新房间状态为需清洁
    const room = this.availableRooms.find(r => r.roomNumber === record.roomNumber)
    if (room) {
      room.status = 'cleaning'
    }

    // 从在住列表移除
    this.checkedInGuests.splice(index, 1)

    return bill
  }

  /**
   * 续住
   */
  async extendStay(recordId: string, newCheckOutDate: string): Promise<CheckInRecord> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const record = this.checkedInGuests.find(r => r.id === recordId)
    if (!record) {
      throw new Error('在住记录不存在')
    }

    record.checkOutDate = newCheckOutDate

    return record
  }

  /**
   * 获取房间列表（支持筛选）
   */
  async getRooms(params?: RoomFilterParams): Promise<Room[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...this.rooms]

    // 搜索（房间号）
    if (params?.search && params.search.trim()) {
      const searchLower = params.search.toLowerCase().trim()
      filtered = filtered.filter(r =>
        r.roomNumber.toLowerCase().includes(searchLower)
      )
    }

    // 房型筛选
    if (params?.roomTypeId) {
      filtered = filtered.filter(r => r.roomTypeId === params.roomTypeId)
    }

    // 楼层筛选
    if (params?.floor) {
      filtered = filtered.filter(r => r.floor === params.floor)
    }

    // 状态筛选
    if (params?.status && params.status !== 'all') {
      filtered = filtered.filter(r => r.status === params.status)
    }

    // 按房间号排序
    filtered.sort((a, b) => a.roomNumber.localeCompare(b.roomNumber))

    return filtered
  }

  /**
   * 根据ID获取房间详情
   */
  async getRoomById(id: string): Promise<Room | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.rooms.find(r => r.id === id) || null
  }

  /**
   * 创建新房间
   */
  async createRoom(roomData: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>): Promise<Room> {
    await new Promise(resolve => setTimeout(resolve, 300))

    // 检查房间号是否已存在
    const exists = this.rooms.find(r => r.roomNumber === roomData.roomNumber)
    if (exists) {
      throw new Error('房间号已存在')
    }

    const newRoom: Room = {
      id: `room${String(this.rooms.length + 1).padStart(3, '0')}`,
      ...roomData,
      createdAt: dayjs().format('MM/DD/YY HH:mm:ss'),
      updatedAt: dayjs().format('MM/DD/YY HH:mm:ss'),
    }

    this.rooms.push(newRoom)
    return newRoom
  }

  /**
   * 更新房间信息
   */
  async updateRoom(id: string, roomData: Partial<Omit<Room, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Room> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.rooms.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('房间不存在')
    }

    // 如果更新房间号，检查是否与其他房间冲突
    if (roomData.roomNumber && roomData.roomNumber !== this.rooms[index].roomNumber) {
      const exists = this.rooms.find(r => r.roomNumber === roomData.roomNumber && r.id !== id)
      if (exists) {
        throw new Error('房间号已存在')
      }
    }

    this.rooms[index] = {
      ...this.rooms[index],
      ...roomData,
      updatedAt: dayjs().format('MM/DD/YY HH:mm:ss'),
    }

    return this.rooms[index]
  }

  /**
   * 更改房间状态
   */
  async updateRoomStatus(id: string, status: Room['status']): Promise<Room> {
    await new Promise(resolve => setTimeout(resolve, 200))

    const index = this.rooms.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('房间不存在')
    }

    this.rooms[index].status = status
    this.rooms[index].updatedAt = dayjs().format('MM/DD/YY HH:mm:ss')

    // 如果状态变为维修或停售，同时更新 lastCleanedAt
    if (status === 'maintenance' || status === 'out_of_service') {
      this.rooms[index].lastCleanedAt = dayjs().format('MM/DD/YY HH:mm:ss')
    }

    return this.rooms[index]
  }

  /**
   * 删除房间
   */
  async deleteRoom(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.rooms.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('房间不存在')
    }

    // 检查房间是否正在使用中
    const inUse = this.checkedInGuests.find(g => g.roomNumber === this.rooms[index].roomNumber)
    if (inUse) {
      throw new Error('房间正在使用中，无法删除')
    }

    this.rooms.splice(index, 1)
  }

  /**
   * 获取所有楼层列表（去重）
   */
  async getFloors(): Promise<number[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    const floors = [...new Set(this.rooms.map(r => r.floor))]
    return floors.sort((a, b) => a - b)
  }
}

export default new HotelService()
