/**
 * 平台后台 - 会员查询类型定义
 */

/**
 * 账号状态
 */
export type AccountStatus = 'pre_register' | 'registered' | 'disabled'

export const AccountStatusLabels: Record<AccountStatus, string> = {
  pre_register: '预注册',
  registered: '注册',
  disabled: '禁用',
}

/**
 * 获得方式
 */
export type ObtainMethod = 'nights_consume' | 'merchant_import'

export const ObtainMethodLabels: Record<ObtainMethod, string> = {
  nights_consume: '间夜消费',
  merchant_import: '商户导入',
}

/**
 * 会员信息（查询结果）
 */
export interface MemberQueryRecord {
  id: string // 唯一ID
  phone: string // 手机号
  accountStatus: AccountStatus // 账号状态
  currentLevel: number // 会员等级（正式/赠送取最大）
  formalLevel: number // 正式会员等级
  formalExpiryDate: string // 正式会员有效期至（如：2025/05/19）
  obtainMethod: ObtainMethod // 获得方式
  relatedMerchant: string // 关联商户（最新成功更新VIP的商户名）
  giftLevel: number // 赠送会员等级
  giftExpiryDate: string // 赠送会员有效期至
  giftFrom: string // 赠送人（手机号）
  updatedAt: string // 更新时间（时间戳或格式化字符串）
}

/**
 * 会员查询筛选参数
 */
export interface MemberQueryFilterParams {
  accountStatus?: AccountStatus | 'all'
  memberLevel?: number | 'all'
  merchantName?: string // 关联商户搜索
}

/**
 * 分页结果
 */
export interface PaginatedResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
