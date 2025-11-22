/**
 * 商户端 - 积分服务管理服务
 */

import type { PointsServiceConfig, PointsServiceItem } from '../types/pointsService.types'
import { PointsServiceType } from '../types/pointsService.types'
import { mockPointsServiceConfig } from './mocks'

class PointsServiceManagementService {
  private config = { ...mockPointsServiceConfig }

  /**
   * 获取积分服务配置
   */
  async getConfig(storeId: string): Promise<PointsServiceConfig> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { ...this.config }
  }

  /**
   * 添加环保奖励服务
   */
  async addEcoReward(storeId: string, data: Partial<PointsServiceItem>): Promise<PointsServiceItem> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const newItem: PointsServiceItem = {
      id: `eco-${Date.now()}`,
      type: PointsServiceType.ECO_REWARD,
      typeName: '环保奖励',
      serviceName: data.serviceName!,
      pointsAmount: data.pointsAmount!,
      description: data.description,
      enabled: data.enabled ?? true,
      createdAt: new Date().toLocaleString('zh-CN'),
      updatedAt: new Date().toLocaleString('zh-CN'),
    }
    this.config.ecoRewards.push(newItem)
    return newItem
  }

  /**
   * 添加增值服务
   */
  async addValueAddedService(storeId: string, data: Partial<PointsServiceItem>): Promise<PointsServiceItem> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const newItem: PointsServiceItem = {
      id: `service-${Date.now()}`,
      type: PointsServiceType.VALUE_ADDED,
      typeName: '增值服务',
      serviceName: data.serviceName!,
      pointsAmount: data.pointsAmount!,
      description: data.description,
      enabled: data.enabled ?? true,
      createdAt: new Date().toLocaleString('zh-CN'),
      updatedAt: new Date().toLocaleString('zh-CN'),
    }
    this.config.valueAddedServices.push(newItem)
    return newItem
  }

  /**
   * 更新服务项
   */
  async updateService(serviceId: string, data: Partial<PointsServiceItem>): Promise<PointsServiceItem> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    let item = this.config.ecoRewards.find((s) => s.id === serviceId)
    if (!item) {
      item = this.config.valueAddedServices.find((s) => s.id === serviceId)
    }

    if (!item) throw new Error('服务不存在')

    Object.assign(item, data, {
      updatedAt: new Date().toLocaleString('zh-CN'),
    })

    return { ...item }
  }

  /**
   * 切换服务启用状态
   */
  async toggleServiceStatus(serviceId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    let item = this.config.ecoRewards.find((s) => s.id === serviceId)
    if (!item) {
      item = this.config.valueAddedServices.find((s) => s.id === serviceId)
    }

    if (!item) throw new Error('服务不存在')

    item.enabled = !item.enabled
    item.updatedAt = new Date().toLocaleString('zh-CN')
  }

  /**
   * 删除服务项
   */
  async deleteService(serviceId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    this.config.ecoRewards = this.config.ecoRewards.filter((s) => s.id !== serviceId)
    this.config.valueAddedServices = this.config.valueAddedServices.filter((s) => s.id !== serviceId)
  }
}

export default new PointsServiceManagementService()
