import type { RoomTypeOrders, OrderCalendarFilterParams, OrderBooking } from '../types/orderCalendar.types'
import { mockOrderCalendarData } from './mocks'

class OrderCalendarService {
  private mockData = [...mockOrderCalendarData]

  async getOrderCalendar(params?: OrderCalendarFilterParams): Promise<RoomTypeOrders[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    let filtered = [...this.mockData]

    if (params?.roomType) {
      filtered = filtered.filter(item =>
        item.roomTypeName.toLowerCase().includes(params.roomType!.toLowerCase())
      )
    }

    if (params?.startDate) {
      // 根据开始日期过滤订单（这里简化处理）
      // 实际应用中可能需要过滤订单的日期范围
    }

    return filtered
  }

  async getOrderDetails(orderId: string): Promise<OrderBooking | null> {
    await new Promise(resolve => setTimeout(resolve, 200))

    for (const roomType of this.mockData) {
      const booking = roomType.bookings.find(b => b.id === orderId)
      if (booking) return booking
    }

    return null
  }

  async createOrder(
    roomTypeId: string,
    orderData: Omit<OrderBooking, 'id'>
  ): Promise<OrderBooking> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const roomType = this.mockData.find(rt => rt.id === roomTypeId)
    if (!roomType) {
      throw new Error('房型不存在')
    }

    const newOrder: OrderBooking = {
      ...orderData,
      id: `order-${Date.now()}`
    }

    roomType.bookings.push(newOrder)
    return newOrder
  }

  async updateOrder(
    orderId: string,
    updates: Partial<OrderBooking>
  ): Promise<OrderBooking | null> {
    await new Promise(resolve => setTimeout(resolve, 400))

    for (const roomType of this.mockData) {
      const bookingIndex = roomType.bookings.findIndex(b => b.id === orderId)
      if (bookingIndex !== -1) {
        roomType.bookings[bookingIndex] = {
          ...roomType.bookings[bookingIndex],
          ...updates
        }
        return roomType.bookings[bookingIndex]
      }
    }

    return null
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    for (const roomType of this.mockData) {
      const bookingIndex = roomType.bookings.findIndex(b => b.id === orderId)
      if (bookingIndex !== -1) {
        roomType.bookings.splice(bookingIndex, 1)
        return true
      }
    }

    return false
  }
}

export default new OrderCalendarService()
