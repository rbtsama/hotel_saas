/**
 * 商户端 - 邀请会员类型定义
 */

/**
 * 邀请记录(简化版 - 只记录受邀人和时间)
 */
export interface InviteRecord {
  id: string
  inviteeId: string // 受邀人用户ID
  inviteeName?: string // 受邀人姓名(可选)
  inviteePhone?: string // 受邀人手机号(可选)
  invitedAt: string // 受邀时间
}
