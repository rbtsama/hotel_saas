/**
 * 平台后台 - 积分增值服务管理服务
 */

import type {
  PointsRewardItem,
  PointsExchangeItem,
  PointsBaseRule,
  UserPointsAccount,
  PointsChangeLog,
  OperationLog,
} from '../types/valueAddedService.types'
import { mockPointsRewards, mockPointsExchanges, mockPointsBaseRule, mockUserPointsAccounts, mockPointsChangeLogs, mockOperationLogs } from './mocks'

class ValueAddedServiceService {
  private rewardItems = [...mockPointsRewards]
  private exchangeItems = [...mockPointsExchanges]
  private baseRule: PointsBaseRule = { ...mockPointsBaseRule }
  private userAccounts = [...mockUserPointsAccounts]
  private changeLogs = [...mockPointsChangeLogs]
  private operationLogs = [...mockOperationLogs]

  // ==================== 积分奖励服务 ====================

  /**
   * 获取所有积分奖励服务
   */
  async getRewardServices(): Promise<PointsRewardItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.rewardItems].sort((a, b) => a.序号 - b.序号)
  }

  /**
   * 创建积分奖励服务
   */
  async createRewardService(data: Partial<PointsRewardItem>): Promise<PointsRewardItem> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // 生成新ID
    const maxId = Math.max(
      ...this.rewardItems.map((item) => parseInt(item.id.replace('PR', ''), 10)),
      0
    )
    const newId = `PR${String(maxId + 1).padStart(3, '0')}`

    // 生成新序号
    const maxOrder = Math.max(...this.rewardItems.map((item) => item.序号), 0)

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    const newItem: PointsRewardItem = {
      id: newId,
      序号: data.序号 || maxOrder + 1,
      serviceName: data.serviceName || '',
      pointsReward: data.pointsReward || 0,
      status: data.status || 'active',
      createdAt: now,
      updatedAt: now,
    }

    this.rewardItems.push(newItem)
    return { ...newItem }
  }

  /**
   * 更新积分奖励服务
   */
  async updateRewardService(id: string, data: Partial<PointsRewardItem>): Promise<PointsRewardItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const index = this.rewardItems.findIndex((item) => item.id === id)
    if (index === -1) return null

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    this.rewardItems[index] = {
      ...this.rewardItems[index],
      ...data,
      id, // 确保ID不被修改
      updatedAt: now,
    }

    return { ...this.rewardItems[index] }
  }

  /**
   * 删除积分奖励服务
   */
  async deleteRewardService(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.rewardItems.findIndex((item) => item.id === id)
    if (index === -1) return false

    this.rewardItems.splice(index, 1)
    return true
  }

  /**
   * 切换积分奖励服务状态
   */
  async toggleRewardServiceStatus(id: string): Promise<PointsRewardItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.rewardItems.findIndex((item) => item.id === id)
    if (index === -1) return null

    const newStatus = this.rewardItems[index].status === 'active' ? 'inactive' : 'active'

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    this.rewardItems[index] = {
      ...this.rewardItems[index],
      status: newStatus,
      updatedAt: now,
    }

    return { ...this.rewardItems[index] }
  }

  /**
   * 重新排序积分奖励服务
   */
  async reorderRewardServices(ids: string[]): Promise<PointsRewardItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // 验证所有ID都存在
    const allIdsExist = ids.every((id) => this.rewardItems.some((item) => item.id === id))
    if (!allIdsExist) {
      throw new Error('部分服务ID不存在')
    }

    // 更新序号
    ids.forEach((id, index) => {
      const item = this.rewardItems.find((item) => item.id === id)
      if (item) {
        item.序号 = index + 1
      }
    })

    return this.getRewardServices()
  }

  // ==================== 积分换购服务 ====================

  /**
   * 获取所有积分换购服务
   */
  async getExchangeServices(): Promise<PointsExchangeItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.exchangeItems].sort((a, b) => a.序号 - b.序号)
  }

  /**
   * 创建积分换购服务
   */
  async createExchangeService(data: Partial<PointsExchangeItem>): Promise<PointsExchangeItem> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // 生成新ID
    const maxId = Math.max(
      ...this.exchangeItems.map((item) => parseInt(item.id.replace('PE', ''), 10)),
      0
    )
    const newId = `PE${String(maxId + 1).padStart(3, '0')}`

    // 生成新序号
    const maxOrder = Math.max(...this.exchangeItems.map((item) => item.序号), 0)

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    const newItem: PointsExchangeItem = {
      id: newId,
      序号: data.序号 || maxOrder + 1,
      serviceName: data.serviceName || '',
      pointsCost: data.pointsCost || 0,
      status: data.status || 'active',
      createdAt: now,
      updatedAt: now,
    }

    this.exchangeItems.push(newItem)
    return { ...newItem }
  }

  /**
   * 更新积分换购服务
   */
  async updateExchangeService(id: string, data: Partial<PointsExchangeItem>): Promise<PointsExchangeItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const index = this.exchangeItems.findIndex((item) => item.id === id)
    if (index === -1) return null

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    this.exchangeItems[index] = {
      ...this.exchangeItems[index],
      ...data,
      id, // 确保ID不被修改
      updatedAt: now,
    }

    return { ...this.exchangeItems[index] }
  }

  /**
   * 删除积分换购服务
   */
  async deleteExchangeService(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.exchangeItems.findIndex((item) => item.id === id)
    if (index === -1) return false

    this.exchangeItems.splice(index, 1)
    return true
  }

  /**
   * 切换积分换购服务状态
   */
  async toggleExchangeServiceStatus(id: string): Promise<PointsExchangeItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.exchangeItems.findIndex((item) => item.id === id)
    if (index === -1) return null

    const newStatus = this.exchangeItems[index].status === 'active' ? 'inactive' : 'active'

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    this.exchangeItems[index] = {
      ...this.exchangeItems[index],
      status: newStatus,
      updatedAt: now,
    }

    return { ...this.exchangeItems[index] }
  }

  /**
   * 重新排序积分换购服务
   */
  async reorderExchangeServices(ids: string[]): Promise<PointsExchangeItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // 验证所有ID都存在
    const allIdsExist = ids.every((id) => this.exchangeItems.some((item) => item.id === id))
    if (!allIdsExist) {
      throw new Error('部分服务ID不存在')
    }

    // 更新序号
    ids.forEach((id, index) => {
      const item = this.exchangeItems.find((item) => item.id === id)
      if (item) {
        item.序号 = index + 1
      }
    })

    return this.getExchangeServices()
  }

  // ==================== 积分基础规则 ====================

  /**
   * 获取积分基础规则配置
   */
  async getBaseRule(): Promise<PointsBaseRule> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { ...this.baseRule }
  }

  /**
   * 更新积分基础规则配置
   */
  async updateBaseRule(data: Partial<PointsBaseRule>, updatedBy: string): Promise<PointsBaseRule> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    this.baseRule = {
      ...this.baseRule,
      ...data,
      updatedBy,
      updatedAt: now,
    }

    // 记录操作日志
    const operationDetails = this.buildOperationDetails(data)
    const logId = `op_log_${Date.now()}`
    this.operationLogs.unshift({
      id: logId,
      operationType: '编辑基础规则',
      operationDetails,
      operator: updatedBy,
      operatedAt: now,
    })

    return { ...this.baseRule }
  }

  /**
   * 构建操作详情字符串
   */
  private buildOperationDetails(data: Partial<PointsBaseRule>): string {
    const details: string[] = []

    if (data.registerReward !== undefined && data.registerReward !== this.baseRule.registerReward) {
      details.push(`修改注册奖励从${this.baseRule.registerReward}积分改为${data.registerReward}积分`)
    }
    if (data.inviterReward !== undefined && data.inviterReward !== this.baseRule.inviterReward) {
      details.push(`修改邀请奖励从${this.baseRule.inviterReward}积分改为${data.inviterReward}积分`)
    }
    if (data.exchangeRate !== undefined && data.exchangeRate !== this.baseRule.exchangeRate) {
      details.push(`修改积分兑换汇率从${this.baseRule.exchangeRate}积分=1元改为${data.exchangeRate}积分=1元`)
    }
    if (data.maxDeductionRatio !== undefined && data.maxDeductionRatio !== this.baseRule.maxDeductionRatio) {
      details.push(`修改最大抵扣比例从${this.baseRule.maxDeductionRatio}%改为${data.maxDeductionRatio}%`)
    }
    if (data.validityMonths !== undefined && data.validityMonths !== this.baseRule.validityMonths) {
      details.push(`修改积分有效期从${this.baseRule.validityMonths}个月改为${data.validityMonths}个月`)
    }
    if (data.vipMultipliers !== undefined) {
      details.push('修改VIP等级入住返还倍数')
    }

    return details.length > 0 ? details.join('，') : '编辑基础规则'
  }

  // ==================== 用户积分账户 ====================

  /**
   * 按手机号查询用户积分账户
   */
  async getUserAccountByPhone(phoneNumber: string): Promise<UserPointsAccount | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.userAccounts.find((account) => account.phoneNumber === phoneNumber) || null
  }

  /**
   * 获取所有用户积分账户
   */
  async getAllUserAccounts(): Promise<UserPointsAccount[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.userAccounts]
  }

  // ==================== 积分变动记录 ====================

  /**
   * 按用户ID获取积分变动记录
   */
  async getPointsChangeLogsByUserId(userId: string, pageSize: number = 20, pageNum: number = 1): Promise<{ data: PointsChangeLog[]; total: number }> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const filtered = this.changeLogs.filter((log) => log.userId === userId)
    const total = filtered.length
    const start = (pageNum - 1) * pageSize
    const end = start + pageSize

    return {
      data: filtered.slice(start, end),
      total,
    }
  }

  /**
   * 手动调整用户积分
   */
  async adjustUserPoints(userId: string, pointsAmount: number, remark: string, operator: string): Promise<PointsChangeLog> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const account = this.userAccounts.find((acc) => acc.id === userId)
    if (!account) {
      throw new Error('用户不存在')
    }

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    const balanceBefore = account.availablePoints
    const balanceAfter = balanceBefore + pointsAmount

    // 更新账户
    account.availablePoints = balanceAfter
    account.totalPoints += pointsAmount

    // 创建变动记录
    const logId = `log_${Date.now()}`
    const changeLog: PointsChangeLog = {
      id: logId,
      userId: account.userId,
      phoneNumber: account.phoneNumber,
      userName: account.userName,
      operationType: 'adjust',
      pointsAmount,
      remark,
      operator,
      balanceBefore,
      balanceAfter,
      operatedAt: now,
    }

    this.changeLogs.unshift(changeLog)

    // 记录操作日志
    const opLog: OperationLog = {
      id: `op_log_${Date.now()}`,
      operationType: '手动调整用户积分',
      operationDetails: `为用户${account.phoneNumber}调整${pointsAmount > 0 ? '增加' : '扣减'}${Math.abs(pointsAmount)}积分，原因：${remark}`,
      targetId: userId,
      operator,
      operatedAt: now,
    }

    this.operationLogs.unshift(opLog)

    return changeLog
  }

  // ==================== 操作日志 ====================

  /**
   * 获取所有操作日志
   */
  async getOperationLogs(pageSize: number = 20, pageNum: number = 1): Promise<{ data: OperationLog[]; total: number }> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const total = this.operationLogs.length
    const start = (pageNum - 1) * pageSize
    const end = start + pageSize

    return {
      data: this.operationLogs.slice(start, end),
      total,
    }
  }
}

export default new ValueAddedServiceService()
