/**
 * 商户端 - 邀请会员类型定义
 */

/**
 * 邀请记录
 */
export interface InviteRecord {
  id: string
  inviterName: string // 老客户姓名
  inviterPhone: string // 老客户手机号
  inviteePhone: string // 被邀请人手机号
  inviteeName?: string // 被邀请人姓名
  registrationStatus: 'pending' | 'registered' | 'expired' // 注册状态
  registeredAt?: string // 注册时间
  rewardStatus: 'not_eligible' | 'pending' | 'rewarded' // 奖励状态
  rewardPoints?: number // 奖励积分
  invitedAt: string // 邀请时间
  expiresAt: string // 过期时间
}

/**
 * 邀请统计
 */
export interface InviteStatistics {
  totalInvites: number // 总邀请数
  successfulRegistrations: number // 成功注册数
  pendingRegistrations: number // 待注册数
  totalRewardPoints: number // 总奖励积分
}
