/**
 * 经营管理 - Service层
 */

import type {
  BusinessOverview,
  BusinessStatistics,
  BusinessStatsParams,
  FinancialStatement,
  Settlement
} from '../types/business.types'
import { mockBusinessOverview, mockBusinessStatistics, mockFinancialStatements, mockSettlements } from './mocks/business.mock'

class BusinessService {
  /**
   * 获取经营概览
   */
  async getBusinessOverview(): Promise<BusinessOverview> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockBusinessOverview
  }

  /**
   * 获取经营统计
   */
  async getBusinessStatistics(params: BusinessStatsParams): Promise<BusinessStatistics> {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockBusinessStatistics
  }

  /**
   * 获取财务对账单列表
   */
  async getFinancialStatements(): Promise<FinancialStatement[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockFinancialStatements
  }

  /**
   * 获取对账单详情
   */
  async getFinancialStatementById(id: string): Promise<FinancialStatement | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockFinancialStatements.find(s => s.id === id) || null
  }

  /**
   * 确认对账单
   */
  async confirmStatement(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const statement = mockFinancialStatements.find(s => s.id === id)
    if (statement && statement.status === 'pending') {
      statement.status = 'confirmed'
      statement.confirmedAt = new Date().toISOString()
    }
  }

  /**
   * 获取结算记录
   */
  async getSettlements(): Promise<Settlement[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockSettlements
  }

  /**
   * 申请结算
   */
  async requestSettlement(month: string, amount: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    // 实际会创建结算申请
  }
}

export default new BusinessService()
