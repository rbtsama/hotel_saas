/**
 * 商户端 - 邀请会员类型定义
 */

/**
 * 邀请状态
 */
export type InviteStatus = 'pending' | 'accepted' | 'rejected' | 'expired'

/**
 * 邀请记录
 */
export interface InviteRecord {
  id: string

  // 赠送信息
  inviteeId: string // 受邀人用户ID（6位数字格式）
  giftedVipLevel: number // 赠送的VIP等级（1-3）
  trialDays: number // 体验期限（天）

  // 时间信息
  invitedAt: string // 赠送时间
  acceptedAt: string | null // 接受时间
  effectiveAt: string | null // 生效时间（接受后次日0点）
  expiresAt: string | null // 到期时间

  // 状态
  status: InviteStatus // 邀请状态
}
