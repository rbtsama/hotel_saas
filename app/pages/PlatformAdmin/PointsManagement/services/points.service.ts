/**
 * 平台后台 - 积分管理服务
 */

import type {
  PointsBaseRuleConfig,
  MemberLevelPointsRate,
  PointsStatistics,
  UserPointsAccount,
  PointsRecord,
} from '../types/points.types'
import {
  mockPointsBaseRuleConfig,
  mockMemberLevelPointsRates,
  mockPointsStatistics,
  mockUserPointsAccounts,
  mockPointsRecords,
} from './mocks'

class PointsManagementService {
  private baseRuleConfig = { ...mockPointsBaseRuleConfig }
  private levelRates = [...mockMemberLevelPointsRates]
  private statistics = { ...mockPointsStatistics }
  private userAccounts = [...mockUserPointsAccounts]
  private pointsRecords = [...mockPointsRecords]

  /**
   * 获取积分基础规则配置
   */
  async getBaseRuleConfig(): Promise<PointsBaseRuleConfig> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { ...this.baseRuleConfig }
  }

  /**
   * 更新积分基础规则配置
   */
  async updateBaseRuleConfig(data: Partial<PointsBaseRuleConfig>): Promise<PointsBaseRuleConfig> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    this.baseRuleConfig = {
      ...this.baseRuleConfig,
      ...data,
      updatedAt: new Date().toLocaleString('zh-CN'),
    }
    return { ...this.baseRuleConfig }
  }

  /**
   * 获取所有会员等级积分汇率
   */
  async getMemberLevelRates(): Promise<MemberLevelPointsRate[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.levelRates]
  }

  /**
   * 更新会员等级积分汇率
   */
  async updateMemberLevelRate(level: number, rateMultiplier: number): Promise<MemberLevelPointsRate> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const index = this.levelRates.findIndex((r) => r.level === level)
    if (index !== -1) {
      this.levelRates[index] = {
        ...this.levelRates[index],
        rateMultiplier,
        updatedAt: new Date().toLocaleString('zh-CN'),
      }
      return { ...this.levelRates[index] }
    }
    throw new Error('等级不存在')
  }

  /**
   * 获取积分统计数据
   */
  async getStatistics(startDate?: string, endDate?: string): Promise<PointsStatistics> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    // 实际应用中根据日期范围过滤
    return { ...this.statistics }
  }

  /**
   * 获取用户积分账户列表
   */
  async getUserAccounts(params?: {
    phone?: string
    memberLevel?: number
    page?: number
    pageSize?: number
  }): Promise<{ list: UserPointsAccount[]; total: number }> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    let filtered = [...this.userAccounts]

    if (params?.phone) {
      filtered = filtered.filter((u) => u.phone.includes(params.phone!))
    }
    if (params?.memberLevel !== undefined) {
      filtered = filtered.filter((u) => u.memberLevel === params.memberLevel)
    }

    return {
      list: filtered,
      total: filtered.length,
    }
  }

  /**
   * 获取用户积分明细
   */
  async getUserPointsRecords(userId: string): Promise<PointsRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.pointsRecords.filter((r) => r.userId === userId)
  }

  /**
   * 手动调整用户积分
   */
  async adjustUserPoints(userId: string, amount: number, reason: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const user = this.userAccounts.find((u) => u.userId === userId)
    if (!user) throw new Error('用户不存在')

    user.currentPoints += amount

    const newRecord: PointsRecord = {
      id: `record-${Date.now()}`,
      userId,
      userName: user.userName,
      type: amount > 0 ? 'register' as any : 'deduct_room_fee' as any,
      typeName: '手动调整',
      amount,
      balance: user.currentPoints,
      description: reason,
      createdAt: new Date().toLocaleString('zh-CN'),
    }
    this.pointsRecords.unshift(newRecord)
  }
}

export default new PointsManagementService()
