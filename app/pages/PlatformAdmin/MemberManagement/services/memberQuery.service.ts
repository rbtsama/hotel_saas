/**
 * 平台后台 - 会员查询服务
 */

import type {
  MemberQueryRecord,
  MemberQueryFilterParams,
  PaginatedResult,
} from '../types/memberQuery.types'
import { mockMembersData } from './mocks/memberQuery.mock'

class MemberQueryService {
  private data = [...mockMembersData]

  /**
   * 获取会员列表（支持筛选和分页）
   */
  async getMembers(params?: {
    filter?: MemberQueryFilterParams
    page?: number
    pageSize?: number
  }): Promise<PaginatedResult<MemberQueryRecord>> {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const filter = params?.filter || {}

    let filtered = [...this.data]

    // 按账号状态筛选
    if (filter.accountStatus && filter.accountStatus !== 'all') {
      filtered = filtered.filter((item) => item.accountStatus === filter.accountStatus)
    }

    // 按会员等级筛选
    if (filter.memberLevel !== undefined && filter.memberLevel !== 'all') {
      filtered = filtered.filter((item) => item.currentLevel === filter.memberLevel)
    }

    // 按关联商户筛选（模糊搜索）
    if (filter.merchantName) {
      filtered = filtered.filter(
        (item) =>
          item.relatedMerchant.toLowerCase().includes(filter.merchantName!.toLowerCase())
      )
    }

    // 按更新时间倒序排列
    filtered.sort((a, b) => {
      const timeA = new Date(a.updatedAt.replace(/\//g, '-')).getTime()
      const timeB = new Date(b.updatedAt.replace(/\//g, '-')).getTime()
      return timeB - timeA
    })

    // 计算分页信息
    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const list = filtered.slice(start, end)

    return {
      list,
      total,
      page,
      pageSize,
      totalPages,
    }
  }

  /**
   * 导出会员数据为CSV格式
   */
  async exportMembers(filter?: MemberQueryFilterParams): Promise<Blob> {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 800))

    let filtered = [...this.data]

    // 应用筛选条件
    if (filter?.accountStatus && filter.accountStatus !== 'all') {
      filtered = filtered.filter((item) => item.accountStatus === filter.accountStatus)
    }

    if (filter?.memberLevel !== undefined && filter.memberLevel !== 'all') {
      filtered = filtered.filter((item) => item.currentLevel === filter.memberLevel)
    }

    // 按关联商户筛选（模糊搜索）
    if (filter?.merchantName) {
      filtered = filtered.filter(
        (item) =>
          item.relatedMerchant.toLowerCase().includes(filter.merchantName!.toLowerCase())
      )
    }

    // 按更新时间倒序
    filtered.sort((a, b) => {
      const timeA = new Date(a.updatedAt.replace(/\//g, '-')).getTime()
      const timeB = new Date(b.updatedAt.replace(/\//g, '-')).getTime()
      return timeB - timeA
    })

    // 生成 CSV 内容
    const headers = [
      '手机号',
      '账号状态',
      '会员等级',
      '正式会员等级',
      '有效期至',
      '获得方式',
      '关联商户',
      '赠送会员等级',
      '有效期至',
      '赠送人',
      '更新时间',
    ]

    const rows = filtered.map((record) => [
      record.phone,
      this.getStatusLabel(record.accountStatus),
      record.currentLevel,
      record.formalLevel,
      record.formalExpiryDate,
      this.getObtainMethodLabel(record.obtainMethod),
      record.relatedMerchant,
      record.giftLevel,
      record.giftExpiryDate,
      record.giftFrom,
      record.updatedAt,
    ])

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    // 转换为 Blob
    const bom = '\uFEFF' // UTF-8 BOM，用于正确显示中文
    return new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })
  }

  /**
   * 获取账号状态标签
   */
  private getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pre_register: '预注册',
      registered: '注册',
      disabled: '禁用',
    }
    return map[status] || status
  }

  /**
   * 获取获得方式标签
   */
  private getObtainMethodLabel(method: string): string {
    const map: Record<string, string> = {
      nights_consume: '间夜消费',
      merchant_import: '商户导入',
    }
    return map[method] || method
  }
}

export default new MemberQueryService()
