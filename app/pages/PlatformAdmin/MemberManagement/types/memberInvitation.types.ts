/**
 * 平台后台 - 会员邀请类型定义
 */

/**
 * 邀请角色
 */
export type InviterRole = 'user' | 'merchant'

/**
 * 会员邀请记录
 */
export interface MemberInvitationRecord {
  id: string
  vipAcquiredAt: string // VIP获得时间(主键)
  vipLevel: number // VIP等级
  inviteeId: string // 受邀人用户ID
  inviterRole: InviterRole // 邀请角色
  inviterId: string // 邀请人ID(用户ID或"-"表示商户)
  userRegisteredAt: string // 用户注册时间
}
