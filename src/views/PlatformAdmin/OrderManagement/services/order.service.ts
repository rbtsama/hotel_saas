import type { Order, OrderFilterParams, OrderListResponse } from '../types/order.types'
import { mockOrderListData } from './mocks/order.mock'

/**
 * 平台后台 - 订单Service
 * 提供订单的CRUD操作
 */
class OrderService {
  private mockData = [...mockOrderListData]

  /**
   * 获取订单列表（支持筛选和分页）
   */
  async getOrderList(params?: OrderFilterParams): Promise<OrderListResponse> {
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

    // 订单状态筛选
    if (params?.orderStatus && params.orderStatus !== 'all') {
      filtered = filtered.filter(order => order.status === params.orderStatus)
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

  /**
   * 根据ID获取订单详情
   */
  async getOrderById(id: string): Promise<Order | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(order => order.id === id) || null
  }

  /**
   * 更新订单
   */
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

  /**
   * 删除订单
   */
  async deleteOrder(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.mockData.findIndex(order => order.id === id)
    if (index === -1) return false

    this.mockData.splice(index, 1)
    return true
  }
}

export default new OrderService()
