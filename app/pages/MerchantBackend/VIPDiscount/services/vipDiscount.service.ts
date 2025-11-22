/**
 * 商户端 - VIP折扣管理服务
 */

import type { MerchantVIPDiscountConfig, VIPLevelDiscount } from '../types/vipDiscount.types'
import { mockMerchantVIPDiscountConfig } from './mocks'

class VIPDiscountService {
  private config = { ...mockMerchantVIPDiscountConfig }

  /**
   * 获取VIP折扣配置
   */
  async getConfig(storeId: string): Promise<MerchantVIPDiscountConfig> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { ...this.config }
  }

  /**
   * 更新VIP等级折扣
   */
  async updateDiscount(level: number, data: Partial<VIPLevelDiscount>): Promise<VIPLevelDiscount> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const index = this.config.discounts.findIndex((d) => d.level === level)
    if (index !== -1) {
      this.config.discounts[index] = {
        ...this.config.discounts[index],
        ...data,
        updatedAt: new Date().toLocaleString('zh-CN'),
      }
      return { ...this.config.discounts[index] }
    }
    throw new Error('等级不存在')
  }
}

export default new VIPDiscountService()
