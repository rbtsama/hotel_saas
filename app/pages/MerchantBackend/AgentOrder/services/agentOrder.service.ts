/**
 * 商户端 - 代客下单服务
 */

import type { AgentOrder, AgentOrderCreateForm } from '../types/agentOrder.types'
import { AgentOrderStatus } from '../types/agentOrder.types'
import { mockAgentOrders } from './mocks'

class AgentOrderService {
  private orders = [...mockAgentOrders]

  /**
   * 获取代客下单列表
   */
  async getList(params?: {
    status?: AgentOrderStatus
    dateRange?: string
  }): Promise<AgentOrder[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    let filtered = [...this.orders]

    if (params?.status) {
      filtered = filtered.filter((o) => o.status === params.status)
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  /**
   * 根据ID获取订单详情
   */
  async getById(id: string): Promise<AgentOrder | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.orders.find((o) => o.id === id) || null
  }

  /**
   * 创建代客下单
   */
  async create(data: AgentOrderCreateForm): Promise<AgentOrder> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + 7)

    const newOrder: AgentOrder = {
      id: `agent-order-${Date.now()}`,
      orderId: `DKD${Date.now()}`,
      storeId: 'store-1',
      storeName: 'XX豪华酒店',
      roomTypeName: data.roomTypeName,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      nights: Math.ceil((new Date(data.checkOutDate).getTime() - new Date(data.checkInDate).getTime()) / (1000 * 60 * 60 * 24)),
      marketPrice: data.marketPrice,
      specialPrice: data.specialPrice,
      specialRequirements: data.specialRequirements,
      notes: data.notes,
      qrCodeUrl: `/qrcode/${Date.now()}.png`,
      status: AgentOrderStatus.PENDING_PAYMENT,
      validUntil: validUntil.toISOString().split('T')[0],
      createdAt: new Date().toLocaleString('zh-CN'),
    }

    this.orders.unshift(newOrder)
    return newOrder
  }

  /**
   * 更新订单状态
   */
  async updateStatus(orderId: string, status: AgentOrderStatus): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const order = this.orders.find((o) => o.orderId === orderId)
    if (order) {
      order.status = status
      if (status === AgentOrderStatus.PAID && !order.paidAt) {
        order.paidAt = new Date().toLocaleString('zh-CN')
      }
    }
  }
}

export default new AgentOrderService()
