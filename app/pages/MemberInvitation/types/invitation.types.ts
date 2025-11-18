// 会员邀请类型定义

export interface InvitationConfig {
  id: string
  name: string
  description: string
  invitationType: 'targeted' | 'unlimited' // 定向邀请 | 无限制
  targetMemberLevel: 'VIP1' | 'VIP2' | 'VIP3' // 邀请成为的会员等级
  validityHours: number // 链接有效时长（小时）
  maxInvitations?: number // 最大邀请人数（无限制邀请不限）
  isActive: boolean // 是否启用
  createdAt: string
  updatedAt: string
}

export interface InvitationRecord {
  id: string
  invitationConfigId: string
  hotelId: string
  hotelName: string
  inviterType: 'hotel' | 'platform' // 邀请方类型
  invitationType: 'targeted' | 'unlimited'
  targetMemberLevel: 'VIP1' | 'VIP2' | 'VIP3'

  // 定向邀请特有字段
  targetCustomerName?: string
  targetCustomerPhone?: string

  // 链接信息
  invitationCode: string
  invitationLink: string
  validUntil: string

  // 使用状态
  status: 'pending' | 'accepted' | 'expired' | 'cancelled'
  acceptedBy?: string // 接受者用户ID
  acceptedAt?: string
  acceptedUserName?: string
  acceptedUserPhone?: string

  createdAt: string
}

export interface InvitationStatistics {
  totalInvitations: number
  pendingInvitations: number
  acceptedInvitations: number
  expiredInvitations: number
  conversionRate: number // 转化率
  byHotel: {
    hotelId: string
    hotelName: string
    invitationCount: number
    acceptedCount: number
  }[]
}

export interface InvitationFilterParams {
  hotelId?: string
  status?: 'pending' | 'accepted' | 'expired' | 'cancelled'
  invitationType?: 'targeted' | 'unlimited'
  startDate?: string
  endDate?: string
}
