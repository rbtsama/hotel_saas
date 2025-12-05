import type { RefundRequest, RefundFilterParams, RefundListResponse } from '../types/refund.types'
import { mockRefundManagementData } from './mocks/refund.mock'

/**
 * 平台后台 - 退款Service
 * 提供退款的查询和处理操作
 */
class RefundService {
  private mockData = [...mockRefundManagementData]

  /**
   * 获取退款列表（支持筛选和分页）
   */
  async getRefundList(params?: RefundFilterParams): Promise<RefundListResponse> {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...this.mockData]

    // 订单号筛选
    if (params?.orderNumber) {
      filtered = filtered.filter(refund =>
        refund.orderNumber.includes(params.orderNumber!)
      )
    }

    // 手机号筛选
    if (params?.guestPhone) {
      filtered = filtered.filter(refund =>
        refund.guestPhone.includes(params.guestPhone!)
      )
    }

    // 日期范围筛选
    if (params?.startDate) {
      filtered = filtered.filter(refund =>
        refund.requestTime >= params.startDate!
      )
    }
    if (params?.endDate) {
      filtered = filtered.filter(refund =>
        refund.requestTime <= params.endDate!
      )
    }

    // 处理状态筛选
    if (params?.processStatus) {
      filtered = filtered.filter(refund => refund.processStatus === params.processStatus)
    }

    // 分页
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const refunds = filtered.slice(startIndex, endIndex)

    return {
      refunds,
      total,
      page,
      pageSize,
      totalPages
    }
  }

  /**
   * 根据ID获取退款详情
   */
  async getRefundById(id: string): Promise<RefundRequest | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(refund => refund.id === id) || null
  }

  /**
   * 更新退款状态
   */
  async updateRefundStatus(id: string, updates: Partial<RefundRequest>): Promise<RefundRequest | null> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.mockData.findIndex(refund => refund.id === id)
    if (index === -1) return null

    this.mockData[index] = {
      ...this.mockData[index],
      ...updates
    }

    return this.mockData[index]
  }
}

export default new RefundService()
