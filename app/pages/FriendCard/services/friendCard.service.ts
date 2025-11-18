/**
 * 亲友礼遇卡配置系统 - Service层
 */

import type {
  FriendCardConfig,
  FriendCardRecord,
  FriendCardStatistics,
  FriendCardConfigFilterParams,
  FriendCardRecordFilterParams,
  FriendCardConfigFormData,
} from '../types/friendCard.types'
import {
  mockFriendCardConfigs,
  mockFriendCardRecords,
  mockFriendCardStatistics,
} from './mocks'

class FriendCardService {
  // 配置数据
  private configs: FriendCardConfig[] = [...mockFriendCardConfigs]
  // 记录数据
  private records: FriendCardRecord[] = [...mockFriendCardRecords]
  // 统计数据
  private statistics: FriendCardStatistics = { ...mockFriendCardStatistics }

  /**
   * 获取配置列表
   */
  async getConfigs(params?: FriendCardConfigFilterParams): Promise<FriendCardConfig[]> {
    await this.simulateDelay(300)

    let filtered = [...this.configs]

    // 按会员等级筛选
    if (params?.memberLevel) {
      filtered = filtered.filter((config) => config.memberLevel === params.memberLevel)
    }

    // 按启用状态筛选
    if (params?.isActive !== undefined) {
      filtered = filtered.filter((config) => config.isActive === params.isActive)
    }

    return filtered
  }

  /**
   * 根据ID获取配置
   */
  async getConfigById(id: string): Promise<FriendCardConfig | null> {
    await this.simulateDelay(200)
    return this.configs.find((config) => config.id === id) || null
  }

  /**
   * 创建配置
   */
  async createConfig(data: FriendCardConfigFormData): Promise<FriendCardConfig> {
    await this.simulateDelay(400)

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    const newConfig: FriendCardConfig = {
      id: `config-${Date.now()}`,
      ...data,
      createdAt: now,
      updatedAt: now,
    }

    this.configs.push(newConfig)
    return newConfig
  }

  /**
   * 更新配置
   */
  async updateConfig(id: string, data: FriendCardConfigFormData): Promise<FriendCardConfig> {
    await this.simulateDelay(400)

    const index = this.configs.findIndex((config) => config.id === id)
    if (index === -1) {
      throw new Error('配置不存在')
    }

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    this.configs[index] = {
      ...this.configs[index],
      ...data,
      updatedAt: now,
    }

    return this.configs[index]
  }

  /**
   * 删除配置
   */
  async deleteConfig(id: string): Promise<void> {
    await this.simulateDelay(300)

    const index = this.configs.findIndex((config) => config.id === id)
    if (index === -1) {
      throw new Error('配置不存在')
    }

    this.configs.splice(index, 1)
  }

  /**
   * 切换配置启用状态
   */
  async toggleConfigStatus(id: string): Promise<FriendCardConfig> {
    await this.simulateDelay(300)

    const config = this.configs.find((c) => c.id === id)
    if (!config) {
      throw new Error('配置不存在')
    }

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    config.isActive = !config.isActive
    config.updatedAt = now

    return config
  }

  /**
   * 获取记录列表
   */
  async getRecords(params?: FriendCardRecordFilterParams): Promise<FriendCardRecord[]> {
    await this.simulateDelay(500)

    let filtered = [...this.records]

    // 按状态筛选
    if (params?.status) {
      filtered = filtered.filter((record) => record.status === params.status)
    }

    // 按赠送者等级筛选
    if (params?.senderLevel) {
      filtered = filtered.filter((record) => record.senderLevel === params.senderLevel)
    }

    // 按日期范围筛选
    if (params?.startDate) {
      filtered = filtered.filter((record) => record.sentAt >= params.startDate!)
    }
    if (params?.endDate) {
      filtered = filtered.filter((record) => record.sentAt <= params.endDate!)
    }

    // 搜索赠送者或接收者名字
    if (params?.search) {
      const searchLower = params.search.toLowerCase()
      filtered = filtered.filter(
        (record) =>
          record.senderName.toLowerCase().includes(searchLower) ||
          record.receiverName?.toLowerCase().includes(searchLower)
      )
    }

    // 按发送时间倒序排列
    filtered.sort((a, b) => b.sentAt.localeCompare(a.sentAt))

    return filtered
  }

  /**
   * 根据ID获取记录
   */
  async getRecordById(id: string): Promise<FriendCardRecord | null> {
    await this.simulateDelay(200)
    return this.records.find((record) => record.id === id) || null
  }

  /**
   * 获取统计数据
   */
  async getStatistics(): Promise<FriendCardStatistics> {
    await this.simulateDelay(400)

    // 实时计算统计数据
    const totalSent = this.records.length
    const totalAccepted = this.records.filter(
      (r) => r.status === 'accepted' || r.status === 'used'
    ).length
    const totalUsed = this.records.filter((r) => r.status === 'used').length

    const conversionRate = totalSent > 0 ? Math.round((totalAccepted / totalSent) * 100) : 0
    const usageRate = totalAccepted > 0 ? Math.round((totalUsed / totalAccepted) * 100) : 0

    // 按会员等级统计
    const levelMap = new Map<string, { sentCount: number; acceptedCount: number }>()

    this.records.forEach((record) => {
      const level = record.senderLevel
      if (!levelMap.has(level)) {
        levelMap.set(level, { sentCount: 0, acceptedCount: 0 })
      }

      const stats = levelMap.get(level)!
      stats.sentCount++

      if (record.status === 'accepted' || record.status === 'used') {
        stats.acceptedCount++
      }
    })

    const byMemberLevel = Array.from(levelMap.entries()).map(([level, stats]) => ({
      level,
      sentCount: stats.sentCount,
      acceptedCount: stats.acceptedCount,
    }))

    return {
      totalSent,
      totalAccepted,
      totalUsed,
      conversionRate,
      usageRate,
      byMemberLevel,
    }
  }

  /**
   * 模拟API延迟
   */
  private simulateDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export default new FriendCardService()
