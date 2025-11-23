/**
 * 平台后台 - 会员邀请 Mock 数据
 */

import type { MemberInvitationRecord } from '../../types/memberInvitation.types'

export const mockMemberInvitations: MemberInvitationRecord[] = [
  {
    id: 'inv-1',
    vipAcquiredAt: '2025/11/24 15:30:25',
    vipLevel: 1,
    inviteeId: 'U10086',
    inviterRole: 'merchant',
    inviterId: '-',
    userRegisteredAt: '2025/11/24 15:28:10',
  },
  {
    id: 'inv-2',
    vipAcquiredAt: '2025/11/24 14:20:15',
    vipLevel: 0,
    inviteeId: 'U10087',
    inviterRole: 'user',
    inviterId: 'U10001',
    userRegisteredAt: '2025/11/24 14:18:30',
  },
  {
    id: 'inv-3',
    vipAcquiredAt: '2025/11/24 12:45:50',
    vipLevel: 1,
    inviteeId: 'U10088',
    inviterRole: 'merchant',
    inviterId: '-',
    userRegisteredAt: '2025/11/24 12:44:20',
  },
  {
    id: 'inv-4',
    vipAcquiredAt: '2025/11/24 11:10:35',
    vipLevel: 0,
    inviteeId: 'U10089',
    inviterRole: 'user',
    inviterId: 'U10002',
    userRegisteredAt: '2025/11/24 11:08:45',
  },
  {
    id: 'inv-5',
    vipAcquiredAt: '2025/11/24 09:25:10',
    vipLevel: 0,
    inviteeId: 'U10090',
    inviterRole: 'user',
    inviterId: 'U10003',
    userRegisteredAt: '2025/11/24 09:23:55',
  },
  {
    id: 'inv-6',
    vipAcquiredAt: '2025/11/23 18:50:22',
    vipLevel: 1,
    inviteeId: 'U10091',
    inviterRole: 'merchant',
    inviterId: '-',
    userRegisteredAt: '2025/11/23 18:48:15',
  },
  {
    id: 'inv-7',
    vipAcquiredAt: '2025/11/23 16:35:40',
    vipLevel: 0,
    inviteeId: 'U10092',
    inviterRole: 'user',
    inviterId: 'U10004',
    userRegisteredAt: '2025/11/23 16:33:20',
  },
  {
    id: 'inv-8',
    vipAcquiredAt: '2025/11/23 14:15:30',
    vipLevel: 1,
    inviteeId: 'U10093',
    inviterRole: 'merchant',
    inviterId: '-',
    userRegisteredAt: '2025/11/23 14:13:45',
  },
]
