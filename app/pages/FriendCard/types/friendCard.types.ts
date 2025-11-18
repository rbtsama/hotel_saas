/**
 * 亲友礼遇卡配置系统 - 类型定义
 */

/**
 * 会员等级类型
 */
export type MemberLevel = 'VIP1' | 'VIP2' | 'VIP3'

/**
 * 亲友卡配置
 */
export interface FriendCardConfig {
  id: string
  name: string // 配置名称，如"VIP2亲友卡"
  description: string // 配置说明
  memberLevel: MemberLevel // 赠送给哪个等级的会员
  cardsCount: number // 每人赠送几张（如VIP2送2张）
  experienceLevel: MemberLevel // 好友体验的会员等级
  experienceDuration: number // 体验时长（天数）
  experienceTimes: number // 体验次数（如"VIP2限时体验1次"）
  isActive: boolean // 是否启用
  createdAt: string // 创建时间
  updatedAt: string // 更新时间
}

/**
 * 亲友卡记录状态
 */
export type FriendCardStatus = 'pending' | 'accepted' | 'expired' | 'used'

/**
 * 亲友卡记录
 */
export interface FriendCardRecord {
  id: string
  cardId: string // 关联的配置ID
  senderId: string // 赠送者用户ID
  senderName: string // 赠送者姓名
  senderLevel: string // 赠送者会员等级
  receiverId?: string // 接收者用户ID（接受后填充）
  receiverName?: string // 接收者姓名
  receiverPhone?: string // 接收者手机号
  message: string // 赠言
  status: FriendCardStatus // 状态
  sentAt: string // 发送时间
  acceptedAt?: string // 接受时间
  usedAt?: string // 使用时间
  expiresAt: string // 过期时间
}

/**
 * 按会员等级统计
 */
export interface LevelStatistics {
  level: string // 会员等级
  sentCount: number // 发送数量
  acceptedCount: number // 接受数量
}

/**
 * 亲友卡统计数据
 */
export interface FriendCardStatistics {
  totalSent: number // 总发送数
  totalAccepted: number // 总接受数
  totalUsed: number // 总使用数
  conversionRate: number // 接受率（接受数/发送数）
  usageRate: number // 使用率（使用数/接受数）
  byMemberLevel: LevelStatistics[] // 按会员等级统计
}

/**
 * 配置过滤参数
 */
export interface FriendCardConfigFilterParams {
  memberLevel?: MemberLevel
  isActive?: boolean
}

/**
 * 记录过滤参数
 */
export interface FriendCardRecordFilterParams {
  status?: FriendCardStatus
  senderLevel?: string
  startDate?: string
  endDate?: string
  search?: string // 搜索赠送者或接收者名字
}

/**
 * 配置表单数据
 */
export interface FriendCardConfigFormData {
  name: string
  description: string
  memberLevel: MemberLevel
  cardsCount: number
  experienceLevel: MemberLevel
  experienceDuration: number
  experienceTimes: number
  isActive: boolean
}
