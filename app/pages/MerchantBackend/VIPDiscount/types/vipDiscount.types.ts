/**
 * 商户端 - VIP等级折扣类型定义
 */

/**
 * 时段类型
 */
export enum PeriodType {
  WEEKDAY = 'weekday', // 平日
  WEEKEND = 'weekend', // 周末
  HOLIDAY = 'holiday', // 节假日
}

/**
 * VIP等级折扣配置
 */
export interface VIPLevelDiscount {
  id: string
  level: number
  levelName: string
  platformMinDiscount: number // 平台最低折扣
  platformMaxDiscount: number // 平台最高折扣（即平台基础折扣）
  storeDiscount: number // 本店设置的折扣
  weekdayExtraDiscount?: number // 平日额外折扣
  weekendExtraDiscount?: number // 周末额外折扣
  holidayAllowed: boolean // 节假日是否可用VIP折扣
  updatedAt: string
}

/**
 * 商户VIP折扣配置
 */
export interface MerchantVIPDiscountConfig {
  storeId: string
  storeName: string
  discounts: VIPLevelDiscount[]
}
