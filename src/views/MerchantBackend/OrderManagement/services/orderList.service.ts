import type { Order, OrderListResponse } from '@/pages/SharedTypes/order.types'
import type { OrderListFilterParams } from '../types/orderList.types'
import { mockOrderListData } from './mocks'

class OrderListService {
  private mockData = [...mockOrderListData]

  async getOrderList(params?: OrderListFilterParams): Promise<OrderListResponse> {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...this.mockData]

    // 房型筛选
    if (params?.roomType) {
      filtered = filtered.filter(order =>
        order.roomType.toLowerCase().includes(params.roomType!.toLowerCase())
      )
    }

    // 日期范围筛选
    if (params?.startDate) {
      filtered = filtered.filter(order =>
        order.checkInDate >= params.startDate!
      )
    }
    if (params?.endDate) {
      filtered = filtered.filter(order =>
        order.checkOutDate <= params.endDate!
      )
    }

    // 支付状态筛选
    if (params?.paymentStatus) {
      filtered = filtered.filter(order => order.paymentStatus === params.paymentStatus)
    }

    // 入住状态筛选
    if (params?.checkInStatus) {
      filtered = filtered.filter(order => order.checkInStatus === params.checkInStatus)
    }

    // 退款状态筛选
    if (params?.refundStatus) {
      filtered = filtered.filter(order => order.refundStatus === params.refundStatus)
    }

    // 分页
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const orders = filtered.slice(startIndex, endIndex)

    return {
      orders,
      total,
      page,
      pageSize,
      totalPages
    }
  }

  async getOrderById(id: string): Promise<Order | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(order => order.id === id) || null
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.mockData.findIndex(order => order.id === id)
    if (index === -1) return null

    this.mockData[index] = {
      ...this.mockData[index],
      ...updates
    }

    return this.mockData[index]
  }

  async deleteOrder(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.mockData.findIndex(order => order.id === id)
    if (index === -1) return false

    this.mockData.splice(index, 1)
    return true
  }
}

export default new OrderListService()
