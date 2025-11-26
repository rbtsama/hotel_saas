/**
 * 商户端 - 邀请会员 Mock 数据
 */

import type { InviteRecord } from '../../types/inviteMember.types'

/**
 * 邀请记录 Mock
 * 说明：商户赠送体验会员记录，受邀人接受后生效
 */
export const mockInviteRecords: InviteRecord[] = [
  // 赠送VIP1 - 已接受已生效
  {
    id: 'invite-1',
    inviteeId: '100086',
    giftedVipLevel: 1,
    trialDays: 7,
    invitedAt: '2025/11/24 15:30:25',
    acceptedAt: '2025/11/24 16:00:00',
    effectiveAt: '2025/11/25 00:00:00',
    expiresAt: '2025/12/01 23:59:59',
    status: 'accepted',
  },
  // 赠送VIP2 - 待接受
  {
    id: 'invite-2',
    inviteeId: '100087',
    giftedVipLevel: 2,
    trialDays: 7,
    invitedAt: '2025/11/24 14:20:15',
    acceptedAt: null,
    effectiveAt: null,
    expiresAt: null,
    status: 'pending',
  },
  // 赠送VIP3 - 已接受已生效
  {
    id: 'invite-3',
    inviteeId: '100088',
    giftedVipLevel: 3,
    trialDays: 7,
    invitedAt: '2025/11/24 12:45:50',
    acceptedAt: '2025/11/24 13:10:00',
    effectiveAt: '2025/11/25 00:00:00',
    expiresAt: '2025/12/01 23:59:59',
    status: 'accepted',
  },
  // 赠送VIP1 - 已过期
  {
    id: 'invite-4',
    inviteeId: '100089',
    giftedVipLevel: 1,
    trialDays: 7,
    invitedAt: '2025/11/10 11:10:35',
    acceptedAt: null,
    effectiveAt: null,
    expiresAt: '2025/11/17 23:59:59',
    status: 'expired',
  },
  // 赠送VIP2 - 已接受已生效
  {
    id: 'invite-5',
    inviteeId: '100090',
    giftedVipLevel: 2,
    trialDays: 7,
    invitedAt: '2025/11/24 09:25:10',
    acceptedAt: '2025/11/24 10:00:00',
    effectiveAt: '2025/11/25 00:00:00',
    expiresAt: '2025/12/01 23:59:59',
    status: 'accepted',
  },
  // 赠送VIP3 - 已接受已生效
  {
    id: 'invite-6',
    inviteeId: '100091',
    giftedVipLevel: 3,
    trialDays: 7,
    invitedAt: '2025/11/23 18:50:22',
    acceptedAt: '2025/11/23 19:15:00',
    effectiveAt: '2025/11/24 00:00:00',
    expiresAt: '2025/11/30 23:59:59',
    status: 'accepted',
  },
  // 赠送VIP1 - 待接受
  {
    id: 'invite-7',
    inviteeId: '100092',
    giftedVipLevel: 1,
    trialDays: 7,
    invitedAt: '2025/11/23 16:35:40',
    acceptedAt: null,
    effectiveAt: null,
    expiresAt: null,
    status: 'pending',
  },
  // 赠送VIP2 - 已拒绝
  {
    id: 'invite-8',
    inviteeId: '100093',
    giftedVipLevel: 2,
    trialDays: 7,
    invitedAt: '2025/11/23 14:15:30',
    acceptedAt: null,
    effectiveAt: null,
    expiresAt: null,
    status: 'rejected',
  },
]
