/**
 * 会员服务相关 Mock 数据
 */

import type {
  PointsServiceItem,
  PointsServiceConfig,
  VIPLevelDiscount,
  MerchantVIPDiscountConfig,
  InviteRecord,
} from '@/types/memberService'
import { PointsServiceType } from '@/types/memberService'

/**
 * 环保奖励服务 Mock
 */
export const mockEcoRewards: PointsServiceItem[] = [
  {
    id: 'eco-1',
    type: PointsServiceType.ECO_REWARD,
    typeName: '环保奖励',
    serviceName: '自带拖鞋',
    pointsAmount: -5, // 负数表示奖励
    description: '支持环保，自带拖鞋可获得积分奖励',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
  {
    id: 'eco-2',
    type: PointsServiceType.ECO_REWARD,
    typeName: '环保奖励',
    serviceName: '自带牙刷',
    pointsAmount: -3,
    description: '环保从小事做起，自带牙刷获得积分',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
  {
    id: 'eco-3',
    type: PointsServiceType.ECO_REWARD,
    typeName: '环保奖励',
    serviceName: '自带毛巾',
    pointsAmount: -5,
    description: '自带毛巾，共建绿色酒店',
    enabled: false,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-10-15 09:20:00',
  },
]

/**
 * 增值服务 Mock
 */
export const mockValueAddedServices: PointsServiceItem[] = [
  {
    id: 'service-1',
    type: PointsServiceType.VALUE_ADDED,
    typeName: '增值服务',
    serviceName: '单人早餐',
    pointsAmount: 20,
    description: '含单人自助早餐，早餐时间7:00-10:00',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
  {
    id: 'service-2',
    type: PointsServiceType.VALUE_ADDED,
    typeName: '增值服务',
    serviceName: '双人早餐',
    pointsAmount: 35,
    description: '含双人自助早餐，早餐时间7:00-10:00',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
  {
    id: 'service-3',
    type: PointsServiceType.VALUE_ADDED,
    typeName: '增值服务',
    serviceName: '延迟退房（2小时）',
    pointsAmount: 15,
    description: '最晚可延迟至14:00退房',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
  {
    id: 'service-4',
    type: PointsServiceType.VALUE_ADDED,
    typeName: '增值服务',
    serviceName: '洗衣服务',
    pointsAmount: 10,
    description: '提供当日洗衣服务',
    enabled: false,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-10-10 11:00:00',
  },
]

/**
 * 积分服务配置 Mock
 */
export const mockPointsServiceConfig: PointsServiceConfig = {
  storeId: 'store-1',
  storeName: 'XX豪华酒店',
  ecoRewards: mockEcoRewards,
  valueAddedServices: mockValueAddedServices,
}

/**
 * VIP等级折扣配置 Mock
 *
 * 业务规则：
 * - platformDiscount: 平台设定的会员折扣（只读，商户不可修改）
 * - mondayDiscount ~ sundayDiscount: 商户设置的每周7天折扣（必须 <= platformDiscount）
 * - holidayDiscount: 商户设置的节假日折扣（必须 <= platformDiscount，优先级最高）
 * - 默认值：所有折扣 = platformDiscount（无额外优惠）
 * - 只启用VIP0-3，其他等级暂不使用
 */
export const mockVIPLevelDiscounts: VIPLevelDiscount[] = [
  {
    id: 'vip-discount-0',
    level: 0,
    levelName: 'VIP0',
    platformDiscount: 1.0,
    mondayDiscount: 1.0,
    tuesdayDiscount: 1.0,
    wednesdayDiscount: 1.0,
    thursdayDiscount: 1.0,
    fridayDiscount: 1.0,
    saturdayDiscount: 1.0,
    sundayDiscount: 1.0,
    holidayDiscount: 1.0,
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-1',
    level: 1,
    levelName: 'VIP1',
    platformDiscount: 0.95,
    mondayDiscount: 0.90, // 周一更优惠
    tuesdayDiscount: 0.90, // 周二更优惠
    wednesdayDiscount: 0.90, // 周三更优惠
    thursdayDiscount: 0.90, // 周四更优惠
    fridayDiscount: 0.92, // 周五略优惠
    saturdayDiscount: 0.95, // 周六使用平台折扣
    sundayDiscount: 0.95, // 周日使用平台折扣
    holidayDiscount: 0.95, // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-2',
    level: 2,
    levelName: 'VIP2',
    platformDiscount: 0.93,
    mondayDiscount: 0.88, // 周一更优惠
    tuesdayDiscount: 0.88, // 周二更优惠
    wednesdayDiscount: 0.88, // 周三更优惠
    thursdayDiscount: 0.88, // 周四更优惠
    fridayDiscount: 0.90, // 周五略优惠
    saturdayDiscount: 0.93, // 周六使用平台折扣
    sundayDiscount: 0.93, // 周日使用平台折扣
    holidayDiscount: 0.93, // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-3',
    level: 3,
    levelName: 'VIP3',
    platformDiscount: 0.9,
    mondayDiscount: 0.85, // 周一更优惠
    tuesdayDiscount: 0.85, // 周二更优惠
    wednesdayDiscount: 0.85, // 周三更优惠
    thursdayDiscount: 0.85, // 周四更优惠
    fridayDiscount: 0.88, // 周五略优惠
    saturdayDiscount: 0.90, // 周六使用平台折扣
    sundayDiscount: 0.90, // 周日使用平台折扣
    holidayDiscount: 0.90, // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
]

/**
 * 商户VIP折扣配置 Mock
 */
export const mockMerchantVIPDiscountConfig: MerchantVIPDiscountConfig = {
  storeId: 'store-1',
  storeName: 'XX豪华酒店',
  discounts: mockVIPLevelDiscounts,
}

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
