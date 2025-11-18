import type { InvitationConfig, InvitationRecord, InvitationStatistics, InvitationFilterParams } from '../types/invitation.types'
import { mockInvitationConfigs, mockInvitationRecords, mockInvitationStatistics } from './mocks'

class InvitationService {
  private configs = [...mockInvitationConfigs]
  private records = [...mockInvitationRecords]
  private statistics = { ...mockInvitationStatistics }

  /**
   * 获取所有邀请配置
   */
  async getInvitationConfigs(): Promise<InvitationConfig[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.configs]
  }

  /**
   * 获取邀请记录（支持筛选）
   */
  async getInvitationRecords(filters?: InvitationFilterParams): Promise<InvitationRecord[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    let filtered = [...this.records]

    if (filters?.hotelId) {
      filtered = filtered.filter(record => record.hotelId === filters.hotelId)
    }

    if (filters?.status) {
      filtered = filtered.filter(record => record.status === filters.status)
    }

    if (filters?.invitationType) {
      filtered = filtered.filter(record => record.invitationType === filters.invitationType)
    }

    if (filters?.startDate) {
      filtered = filtered.filter(record => record.createdAt >= filters.startDate!)
    }

    if (filters?.endDate) {
      filtered = filtered.filter(record => record.createdAt <= filters.endDate!)
    }

    return filtered
  }

  /**
   * 获取邀请统计数据
   */
  async getInvitationStatistics(): Promise<InvitationStatistics> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return { ...this.statistics }
  }

  /**
   * 创建邀请配置
   */
  async createInvitationConfig(data: Omit<InvitationConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<InvitationConfig> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const now = new Date()
    const timestamp = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

    const newConfig: InvitationConfig = {
      id: String(this.configs.length + 1),
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    this.configs.push(newConfig)
    return newConfig
  }

  /**
   * 更新邀请配置
   */
  async updateInvitationConfig(id: string, data: Partial<Omit<InvitationConfig, 'id' | 'createdAt' | 'updatedAt'>>): Promise<InvitationConfig> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.configs.findIndex(config => config.id === id)
    if (index === -1) {
      throw new Error('邀请配置不存在')
    }

    const now = new Date()
    const timestamp = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

    this.configs[index] = {
      ...this.configs[index],
      ...data,
      updatedAt: timestamp,
    }

    return this.configs[index]
  }

  /**
   * 删除邀请配置
   */
  async deleteInvitationConfig(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.configs.findIndex(config => config.id === id)
    if (index === -1) {
      throw new Error('邀请配置不存在')
    }

    this.configs.splice(index, 1)
  }

  /**
   * 根据ID获取邀请配置
   */
  async getInvitationConfigById(id: string): Promise<InvitationConfig | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.configs.find(config => config.id === id) || null
  }

  /**
   * 生成邀请链接（酒店后台使用）
   */
  async generateInvitationLink(data: {
    hotelId: string
    hotelName: string
    invitationType: 'targeted' | 'unlimited'
    targetMemberLevel: 'VIP1' | 'VIP2' | 'VIP3'
    validityHours: number
    targetCustomerName?: string
    targetCustomerPhone?: string
  }): Promise<InvitationRecord> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const now = new Date()
    const validUntil = new Date(now.getTime() + data.validityHours * 60 * 60 * 1000)

    const formatDate = (date: Date) => {
      return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
    }

    const invitationCode = this.generateRandomCode()

    const newRecord: InvitationRecord = {
      id: `INV-${String(this.records.length + 1).padStart(3, '0')}`,
      invitationConfigId: '1', // 这里可以根据实际情况选择配置
      hotelId: data.hotelId,
      hotelName: data.hotelName,
      inviterType: 'hotel',
      invitationType: data.invitationType,
      targetMemberLevel: data.targetMemberLevel,
      targetCustomerName: data.targetCustomerName,
      targetCustomerPhone: data.targetCustomerPhone,
      invitationCode,
      invitationLink: `https://example.com/invite?code=${invitationCode}`,
      validUntil: formatDate(validUntil),
      status: 'pending',
      createdAt: formatDate(now),
    }

    this.records.unshift(newRecord) // 新记录放在前面
    return newRecord
  }

  /**
   * 取消邀请
   */
  async cancelInvitation(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const record = this.records.find(r => r.id === id)
    if (!record) {
      throw new Error('邀请记录不存在')
    }

    if (record.status !== 'pending') {
      throw new Error('只能取消待接受的邀请')
    }

    record.status = 'cancelled'
  }

  /**
   * 生成随机邀请码
   */
  private generateRandomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 9; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  /**
   * 获取酒店的邀请记录
   */
  async getHotelInvitationRecords(hotelId: string): Promise<InvitationRecord[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return this.records.filter(record => record.hotelId === hotelId)
  }
}

export default new InvitationService()
