/**
 * 门店礼赠配置服务
 */

import type { StoreBenefitsConfig, StoreBenefit, BenefitFormData } from '../types/store-benefits.types'
import { mockStoreBenefitsConfig } from './mocks/store-benefits.mock'

class StoreBenefitsService {
  private config: StoreBenefitsConfig = JSON.parse(JSON.stringify(mockStoreBenefitsConfig))

  /**
   * 获取门店礼赠配置
   */
  async getConfig(storeId: string): Promise<StoreBenefitsConfig> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { ...this.config }
  }

  /**
   * 添加礼赠
   */
  async addBenefit(storeId: string, data: BenefitFormData): Promise<StoreBenefit> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const newBenefit: StoreBenefit = {
      id: `benefit-${Date.now()}`,
      ...data,
      sortOrder: this.config.benefits.length + 1,
      createdAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).replace(/(\d+)\/(\d+)\/(\d+),/, '$1/$2/$3'),
    }

    this.config.benefits.push(newBenefit)
    this.config.updatedAt = newBenefit.createdAt

    return newBenefit
  }

  /**
   * 更新礼赠
   */
  async updateBenefit(benefitId: string, data: Partial<BenefitFormData>): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.config.benefits.findIndex(b => b.id === benefitId)
    if (index === -1) throw new Error('礼赠不存在')

    this.config.benefits[index] = {
      ...this.config.benefits[index],
      ...data,
    }

    this.config.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/(\d+)\/(\d+)\/(\d+),/, '$1/$2/$3')
  }

  /**
   * 删除礼赠
   */
  async deleteBenefit(benefitId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    this.config.benefits = this.config.benefits.filter(b => b.id !== benefitId)

    this.config.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/(\d+)\/(\d+)\/(\d+),/, '$1/$2/$3')
  }

  /**
   * 重新排序礼赠
   */
  async reorderBenefits(benefitIds: string[]): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const reordered = benefitIds.map((id, index) => {
      const benefit = this.config.benefits.find(b => b.id === id)
      if (!benefit) throw new Error(`礼赠 ${id} 不存在`)
      return {
        ...benefit,
        sortOrder: index + 1,
      }
    })

    this.config.benefits = reordered
    this.config.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/(\d+)\/(\d+)\/(\d+),/, '$1/$2/$3')
  }
}

export default new StoreBenefitsService()
