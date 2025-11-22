/**
 * 商户端 - VIP折扣 Mock 数据
 */

import type { VIPLevelDiscount, MerchantVIPDiscountConfig } from '../../types/vipDiscount.types'

/**
 * VIP等级折扣配置 Mock（根据PRD）
 */
export const mockVIPLevelDiscounts: VIPLevelDiscount[] = [
  {
    id: 'vip-discount-0',
    level: 0,
    levelName: 'VIP0',
    platformMinDiscount: 1.0,
    platformMaxDiscount: 1.0,
    storeDiscount: 1.0,
    holidayAllowed: true,
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-1',
    level: 1,
    levelName: 'VIP1',
    platformMinDiscount: 0.9,
    platformMaxDiscount: 0.95,
    storeDiscount: 0.95,
    weekdayExtraDiscount: undefined,
    weekendExtraDiscount: undefined,
    holidayAllowed: true,
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-2',
    level: 2,
    levelName: 'VIP2',
    platformMinDiscount: 0.85,
    platformMaxDiscount: 0.93,
    storeDiscount: 0.9,
    weekdayExtraDiscount: 0.9,
    weekendExtraDiscount: undefined,
    holidayAllowed: true,
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-3',
    level: 3,
    levelName: 'VIP3',
    platformMinDiscount: 0.85,
    platformMaxDiscount: 0.9,
    storeDiscount: 0.88,
    weekdayExtraDiscount: 0.85,
    weekendExtraDiscount: undefined,
    holidayAllowed: false,
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-4',
    level: 4,
    levelName: 'VIP4',
    platformMinDiscount: 0.8,
    platformMaxDiscount: 0.88,
    storeDiscount: 0.85,
    weekdayExtraDiscount: 0.8,
    weekendExtraDiscount: undefined,
    holidayAllowed: false,
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-5',
    level: 5,
    levelName: 'VIP5',
    platformMinDiscount: 0.75,
    platformMaxDiscount: 0.85,
    storeDiscount: 0.82,
    weekdayExtraDiscount: 0.8,
    weekendExtraDiscount: undefined,
    holidayAllowed: false,
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-6',
    level: 6,
    levelName: 'VIP6',
    platformMinDiscount: 0.7,
    platformMaxDiscount: 0.82,
    storeDiscount: 0.78,
    weekdayExtraDiscount: 0.75,
    weekendExtraDiscount: undefined,
    holidayAllowed: false,
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-7',
    level: 7,
    levelName: 'VIP7',
    platformMinDiscount: 0.65,
    platformMaxDiscount: 0.8,
    storeDiscount: 0.75,
    weekdayExtraDiscount: 0.75,
    weekendExtraDiscount: undefined,
    holidayAllowed: false,
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-8',
    level: 8,
    levelName: 'VIP8',
    platformMinDiscount: 0.6,
    platformMaxDiscount: 0.75,
    storeDiscount: 0.7,
    weekdayExtraDiscount: 0.7,
    weekendExtraDiscount: undefined,
    holidayAllowed: false,
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-9',
    level: 9,
    levelName: 'VIP9',
    platformMinDiscount: 0.55,
    platformMaxDiscount: 0.7,
    storeDiscount: 0.65,
    weekdayExtraDiscount: 0.7,
    weekendExtraDiscount: undefined,
    holidayAllowed: false,
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
