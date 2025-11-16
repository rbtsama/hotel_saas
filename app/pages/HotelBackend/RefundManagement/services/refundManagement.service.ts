import type { RefundRequest, RefundFilterParams, RefundListResponse } from '../types/refundManagement.types'
import { mockRefundManagementData } from './mocks'

class RefundManagementService {
  private mockData = [...mockRefundManagementData]

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

    // 处理进度筛选
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

  async getRefundById(id: string): Promise<RefundRequest | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(refund => refund.id === id) || null
  }

  async updateRefundStatus(
    id: string,
    status: RefundRequest['processStatus']
  ): Promise<RefundRequest | null> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.mockData.findIndex(refund => refund.id === id)
    if (index === -1) return null

    this.mockData[index].processStatus = status
    return this.mockData[index]
  }

  async deleteRefund(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.mockData.findIndex(refund => refund.id === id)
    if (index === -1) return false

    this.mockData.splice(index, 1)
    return true
  }
}

export default new RefundManagementService()
