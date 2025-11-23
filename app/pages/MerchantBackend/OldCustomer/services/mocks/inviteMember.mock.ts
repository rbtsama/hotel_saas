/**
 * 商户端 - 邀请会员 Mock 数据
 */

import type { InviteRecord, InviteStatistics } from '../../types/inviteMember.types'

/**
 * 邀请记录 Mock
 */
export const mockInviteRecords: InviteRecord[] = [
  {
    id: 'invite-1',
    inviterName: '张三',
    inviterPhone: '138****1234',
    inviteePhone: '139****5678',
    inviteeName: '李四',
    registrationStatus: 'registered',
    registeredAt: '11/20/25 14:30:00',
    rewardStatus: 'rewarded',
    rewardPoints: 50,
    invitedAt: '11/18/25 10:20:00',
    expiresAt: '11/25/25 10:20:00',
  },
  {
    id: 'invite-2',
    inviterName: '王五',
    inviterPhone: '136****2345',
    inviteePhone: '137****6789',
    registrationStatus: 'pending',
    rewardStatus: 'not_eligible',
    invitedAt: '11/22/25 16:45:00',
    expiresAt: '11/29/25 16:45:00',
  },
  {
    id: 'invite-3',
    inviterName: '赵六',
    inviterPhone: '135****3456',
    inviteePhone: '138****7890',
    inviteeName: '钱七',
    registrationStatus: 'registered',
    registeredAt: '11/23/25 09:15:00',
    rewardStatus: 'pending',
    invitedAt: '11/23/25 08:00:00',
    expiresAt: '11/30/25 08:00:00',
  },
  {
    id: 'invite-4',
    inviterName: '孙八',
    inviterPhone: '134****4567',
    inviteePhone: '139****8901',
    registrationStatus: 'expired',
    rewardStatus: 'not_eligible',
    invitedAt: '11/10/25 13:20:00',
    expiresAt: '11/17/25 13:20:00',
  },
  {
    id: 'invite-5',
    inviterName: '周九',
    inviterPhone: '133****5678',
    inviteePhone: '136****9012',
    inviteeName: '吴十',
    registrationStatus: 'registered',
    registeredAt: '11/21/25 11:30:00',
    rewardStatus: 'rewarded',
    rewardPoints: 50,
    invitedAt: '11/20/25 10:00:00',
    expiresAt: '11/27/25 10:00:00',
  },
]

/**
 * 邀请统计 Mock
 */
export const mockInviteStatistics: InviteStatistics = {
  totalInvites: 15,
  successfulRegistrations: 8,
  pendingRegistrations: 5,
  totalRewardPoints: 400,
}
