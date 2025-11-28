/**
 * 商户端 - VIP折扣 Mock 数据
 */

import type { VIPLevelDiscount, MerchantVIPDiscountConfig } from '../../types/vipDiscount.types'

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
    mondayDiscount: 0.90,  // 周一更优惠
    tuesdayDiscount: 0.90,  // 周二更优惠
    wednesdayDiscount: 0.90, // 周三更优惠
    thursdayDiscount: 0.90,  // 周四更优惠
    fridayDiscount: 0.92,    // 周五略优惠
    saturdayDiscount: 0.95,  // 周六使用平台折扣
    sundayDiscount: 0.95,    // 周日使用平台折扣
    holidayDiscount: 0.95,   // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-2',
    level: 2,
    levelName: 'VIP2',
    platformDiscount: 0.93,
    mondayDiscount: 0.88,  // 周一更优惠
    tuesdayDiscount: 0.88,  // 周二更优惠
    wednesdayDiscount: 0.88, // 周三更优惠
    thursdayDiscount: 0.88,  // 周四更优惠
    fridayDiscount: 0.90,    // 周五略优惠
    saturdayDiscount: 0.93,  // 周六使用平台折扣
    sundayDiscount: 0.93,    // 周日使用平台折扣
    holidayDiscount: 0.93,   // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-3',
    level: 3,
    levelName: 'VIP3',
    platformDiscount: 0.9,
    mondayDiscount: 0.85,  // 周一更优惠
    tuesdayDiscount: 0.85,  // 周二更优惠
    wednesdayDiscount: 0.85, // 周三更优惠
    thursdayDiscount: 0.85,  // 周四更优惠
    fridayDiscount: 0.88,    // 周五略优惠
    saturdayDiscount: 0.90,  // 周六使用平台折扣
    sundayDiscount: 0.90,    // 周日使用平台折扣
    holidayDiscount: 0.90,   // 节假日使用平台折扣
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
