import type { PMSIntegrationConfig, RoomTypeMapping } from '../types/pmsIntegration.types'
import { mockPMSIntegrationConfig } from './mocks'

class PMSIntegrationService {
  private config = { ...mockPMSIntegrationConfig }

  async getConfig(): Promise<PMSIntegrationConfig> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { ...this.config }
  }

  async updateConfig(data: Partial<PMSIntegrationConfig>): Promise<PMSIntegrationConfig> {
    await new Promise(resolve => setTimeout(resolve, 500))

    this.config = {
      ...this.config,
      ...data,
      updatedAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/(\d+)\/(\d+)\/(\d+),/, '$1/$2/$3')
    }

    return { ...this.config }
  }

  async updateRoomTypeMapping(
    mappingId: string,
    pmsRoomTypeName: string,
    pmsRoomTypeId?: string
  ): Promise<RoomTypeMapping | null> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const mapping = this.config.roomTypeMappings.find(m => m.id === mappingId)
    if (!mapping) return null

    mapping.pmsRoomTypeName = pmsRoomTypeName
    if (pmsRoomTypeId !== undefined) {
      mapping.pmsRoomTypeId = pmsRoomTypeId
    }

    // 更新配置时间
    this.config.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/(\d+)\/(\d+)\/(\d+),/, '$1/$2/$3')

    return { ...mapping }
  }

  async syncWithPMS(storeId: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟从PMS同步房型信息
    return {
      success: true,
      message: '房型信息已从PMS同步'
    }
  }

  async testPMSConnection(storeId: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 800))

    // 模拟测试PMS连接
    if (storeId && storeId.length > 0) {
      return {
        success: true,
        message: 'PMS连接成功'
      }
    }

    return {
      success: false,
      message: 'PMS连接失败，请检查门店ID'
    }
  }
}

export default new PMSIntegrationService()
