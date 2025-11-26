/**
 * 平台后台 - 会员邀请类型定义
 */

/**
 * 邀请角色
 */
export type InviterRole = 'user' | 'merchant'

/**
 * 邀请状态
 */
export type InvitationStatus = 'pending' | 'accepted' | 'rejected' | 'expired'

/**
 * 会员邀请记录
 */
export interface MemberInvitationRecord {
  id: string

  // 赠送信息
  vipLevel: number // 赠送的VIP等级
  isTrial: boolean // 是否为体验会员
  trialDays: number | null // 体验期限（天，正式会员为null）

  // 时间信息
  invitedAt: string // 赠送时间（原vipAcquiredAt）
  acceptedAt: string | null // 接受时间
  effectiveAt: string | null // 生效时间（接受后次日0点）
  expiresAt: string | null // 到期时间

  // 用户信息
  inviteeId: string // 受邀人用户ID
  inviterRole: InviterRole // 邀请角色
  inviterId: string // 邀请人ID(用户ID或商户ID)

  // 状态
  status: InvitationStatus // 邀请状态

  userRegisteredAt: string // 用户注册时间
}
