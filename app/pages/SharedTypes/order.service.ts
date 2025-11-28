/**
 * 订单管理 - 统一Service层
 * 修复 #001：统一数据访问，根据用户角色过滤数据
 */

import type {
  Order,
  OrderFilterParams,
  OrderListResponse,
  CurrentUser,
  UserRole,
  RefundRequest
} from './order.types'
import { OrderStatus } from './order.types'

// 使用 Mock 数据（前端工程师标准做法）
import { mockOrders } from './mocks/order.mock'

class OrderService {
  private orders = [...mockOrders]

  /**
   * 获取订单列表（带权限过滤）
   * - 平台用户：查看所有订单
   * - 酒店用户：只查看自己酒店的订单
   */
  async getOrderList(
    params: OrderFilterParams,
    currentUser: CurrentUser
  ): Promise<OrderListResponse> {
    await new Promise(resolve => setTimeout(resolve, 500)) // 模拟API延迟

    let filtered = [...this.orders]

    // ========== 权限过滤（核心：解决数据孤岛问题） ==========
    if (currentUser.role === UserRole.HOTEL_ADMIN || currentUser.role === UserRole.HOTEL_STAFF) {
      // 酒店用户：只能看自己酒店的订单
      filtered = filtered.filter(order => order.hotelId === currentUser.hotelId)
    }
    // 平台用户：可以看所有订单（不过滤）

    // ========== 业务筛选 ==========

    // 搜索关键词
    if (params.search) {
      const keyword = params.search.toLowerCase()
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(keyword) ||
        order.userName.toLowerCase().includes(keyword) ||
        order.userPhone.includes(keyword)
      )
    }

    // 酒店ID（平台后台可以按酒店筛选）
    if (params.hotelId) {
      filtered = filtered.filter(order => order.hotelId === params.hotelId)
    }

    // 房型
    if (params.roomTypeId) {
      filtered = filtered.filter(order => order.roomTypeId === params.roomTypeId)
    }

    // 订单状态（多选）
    if (params.status && params.status.length > 0) {
      filtered = filtered.filter(order => params.status!.includes(order.status))
    }

    // 入住日期范围
    if (params.checkInDateStart) {
      filtered = filtered.filter(order => order.checkInDate >= params.checkInDateStart!)
    }
    if (params.checkInDateEnd) {
      filtered = filtered.filter(order => order.checkInDate <= params.checkInDateEnd!)
    }

    // 创建日期范围
    if (params.createdAtStart) {
      filtered = filtered.filter(order => order.createdAt >= params.createdAtStart!)
    }
    if (params.createdAtEnd) {
      filtered = filtered.filter(order => order.createdAt <= params.createdAtEnd!)
    }

    // 是否有退款申请
    if (params.hasRefundRequest !== undefined) {
      filtered = filtered.filter(order => order.hasRefundRequest === params.hasRefundRequest)
    }

    // ========== 排序 ==========
    const sortBy = params.sortBy || 'createdAt'
    const sortOrder = params.sortOrder || 'desc'
    filtered.sort((a, b) => {
      let comparison = 0
      if (sortBy === 'createdAt') {
        comparison = a.createdAt.localeCompare(b.createdAt)
      } else if (sortBy === 'checkInDate') {
        comparison = a.checkInDate.localeCompare(b.checkInDate)
      } else if (sortBy === 'actualAmount') {
        comparison = a.actualAmount - b.actualAmount
      }
      return sortOrder === 'desc' ? -comparison : comparison
    })

    // ========== 分页 ==========
    const page = params.page || 1
    const pageSize = params.pageSize || 10
    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedOrders = filtered.slice(startIndex, endIndex)

    return {
      orders: paginatedOrders,
      total,
      page,
      pageSize,
      totalPages
    }
  }

  /**
   * 获取订单详情
   */
  async getOrderById(orderId: string, currentUser: CurrentUser): Promise<Order | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const order = this.orders.find(o => o.id === orderId)

    if (!order) return null

    // 权限检查
    if (currentUser.role === UserRole.HOTEL_ADMIN || currentUser.role === UserRole.HOTEL_STAFF) {
      if (order.hotelId !== currentUser.hotelId) {
        throw new Error('无权查看此订单')
      }
    }

    return order
  }

  /**
   * 确认订单（酒店后台）
   */
  async confirmOrder(orderId: string, currentUser: CurrentUser): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const order = this.orders.find(o => o.id === orderId)

    if (!order) throw new Error('订单不存在')
    if (order.hotelId !== currentUser.hotelId) throw new Error('无权操作此订单')
    if (order.status !== OrderStatus.PENDING_PAYMENT) {
      throw new Error('订单状态不允许确认')
    }

    order.status = OrderStatus.PENDING_CHECKIN
    order.paidAt = new Date().toISOString()
  }

  /**
   * 分配房间（酒店后台）
   */
  async assignRoom(orderId: string, roomNumber: string, currentUser: CurrentUser): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const order = this.orders.find(o => o.id === orderId)

    if (!order) throw new Error('订单不存在')
    if (order.hotelId !== currentUser.hotelId) throw new Error('无权操作此订单')
    if (order.status !== OrderStatus.PENDING_CHECKIN) {
      throw new Error('订单状态不允许分配房间')
    }

    order.roomNumber = roomNumber
    // 分配房间不改变状态，仍为待入住
  }

  /**
   * 办理入住（酒店前台）
   */
  async checkIn(orderId: string, currentUser: CurrentUser): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const order = this.orders.find(o => o.id === orderId)

    if (!order) throw new Error('订单不存在')
    if (order.hotelId !== currentUser.hotelId) throw new Error('无权操作此订单')
    if (order.status !== OrderStatus.PENDING_CHECKIN) {
      throw new Error('订单状态不允许入住')
    }

    order.status = OrderStatus.CHECKED_IN
    order.checkedInAt = new Date().toISOString()
  }

  /**
   * 办理退房（酒店前台）
   */
  async checkOut(orderId: string, currentUser: CurrentUser): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const order = this.orders.find(o => o.id === orderId)

    if (!order) throw new Error('订单不存在')
    if (order.hotelId !== currentUser.hotelId) throw new Error('无权操作此订单')
    if (order.status !== OrderStatus.CHECKED_IN) {
      throw new Error('订单状态不允许退房')
    }

    order.status = OrderStatus.CHECKED_OUT
    order.checkedOutAt = new Date().toISOString()
  }

  /**
   * 完成订单
   */
  async completeOrder(orderId: string, currentUser: CurrentUser): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const order = this.orders.find(o => o.id === orderId)

    if (!order) throw new Error('订单不存在')
    if (order.hotelId !== currentUser.hotelId) throw new Error('无权操作此订单')
    if (order.status !== OrderStatus.CHECKED_OUT) {
      throw new Error('订单状态不允许完成')
    }

    order.status = OrderStatus.COMPLETED
    order.completedAt = new Date().toISOString()
  }

  /**
   * 取消订单
   */
  async cancelOrder(orderId: string, reason: string, currentUser: CurrentUser): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const order = this.orders.find(o => o.id === orderId)

    if (!order) throw new Error('订单不存在')

    // 权限检查
    if (currentUser.role === UserRole.HOTEL_ADMIN || currentUser.role === UserRole.HOTEL_STAFF) {
      if (order.hotelId !== currentUser.hotelId) throw new Error('无权操作此订单')
    }

    // 已入住或已完成的订单不能取消
    if ([OrderStatus.CHECKED_IN, OrderStatus.CHECKED_OUT, OrderStatus.COMPLETED].includes(order.status)) {
      throw new Error('订单状态不允许取消')
    }

    order.status = OrderStatus.CANCELLED
    order.cancelledAt = new Date().toISOString()
    order.hotelNote = (order.hotelNote || '') + `\n[取消原因] ${reason}`
  }

  /**
   * 获取订单统计（Dashboard用）
   */
  async getOrderStatistics(currentUser: CurrentUser): Promise<{
    todayOrders: number
    pendingConfirm: number
    inHouse: number
    totalRevenue: number
  }> {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...this.orders]

    // 权限过滤
    if (currentUser.role === UserRole.HOTEL_ADMIN || currentUser.role === UserRole.HOTEL_STAFF) {
      filtered = filtered.filter(order => order.hotelId === currentUser.hotelId)
    }

    const today = new Date().toISOString().split('T')[0]

    return {
      todayOrders: filtered.filter(o => o.createdAt.startsWith(today)).length,
      pendingConfirm: filtered.filter(o => o.status === OrderStatus.PENDING_CHECKIN).length,
      inHouse: filtered.filter(o => o.status === OrderStatus.CHECKED_IN).length,
      totalRevenue: filtered
        .filter(o => o.status === OrderStatus.COMPLETED)
        .reduce((sum, o) => sum + o.actualAmount, 0)
    }
  }
}

export default new OrderService()
