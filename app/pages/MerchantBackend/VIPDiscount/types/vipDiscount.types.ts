/**
 * 商户端 - VIP等级折扣类型定义
 */

/**
 * 时段类型
 */
export enum PeriodType {
  MONDAY = 'monday',       // 周一
  TUESDAY = 'tuesday',     // 周二
  WEDNESDAY = 'wednesday', // 周三
  THURSDAY = 'thursday',   // 周四
  FRIDAY = 'friday',       // 周五
  SATURDAY = 'saturday',   // 周六
  SUNDAY = 'sunday',       // 周日
  HOLIDAY = 'holiday',     // 节假日（优先）
}

/**
 * VIP等级折扣配置
 */
export interface VIPLevelDiscount {
  id: string
  level: number
  levelName: string
  platformDiscount: number // 平台会员折扣（只读，商户不可修改）
  mondayDiscount: number    // 周一折扣（可编辑，必须 <= platformDiscount）
  tuesdayDiscount: number   // 周二折扣（可编辑，必须 <= platformDiscount）
  wednesdayDiscount: number // 周三折扣（可编辑，必须 <= platformDiscount）
  thursdayDiscount: number  // 周四折扣（可编辑，必须 <= platformDiscount）
  fridayDiscount: number    // 周五折扣（可编辑，必须 <= platformDiscount）
  saturdayDiscount: number  // 周六折扣（可编辑，必须 <= platformDiscount）
  sundayDiscount: number    // 周日折扣（可编辑，必须 <= platformDiscount）
  holidayDiscount: number   // 节假日折扣（可编辑，必须 <= platformDiscount，优先级最高）
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
