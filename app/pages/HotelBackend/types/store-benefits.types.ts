/**
 * 门店礼赠配置类型定义
 */

// 适用条件
export enum BenefitApplicability {
  ALL_MEMBERS = 'all_members',           // 全部会员
  VIP2_AND_ABOVE = 'vip2_and_above',     // VIP2及以上
}

// 礼赠项
export interface StoreBenefit {
  id: string
  name: string                            // 礼赠名称
  description: string                     // 礼赠描述
  applicability: BenefitApplicability     // 适用条件
  usageNotes: string                      // 使用说明
  bookingRules: string                    // 预订规则
  policyNotes: string                     // 规则说明
  receptionTime: string                   // 接待时间
  sortOrder: number                       // 排序
  enabled: boolean                        // 是否启用
  createdAt: string
}

// 门店礼赠配置
export interface StoreBenefitsConfig {
  id: string
  storeId: string
  benefits: StoreBenefit[]
  updatedAt: string
}

// 礼赠表单数据
export interface BenefitFormData {
  name: string
  description: string
  applicability: BenefitApplicability
  usageNotes: string
  bookingRules: string
  policyNotes: string
  receptionTime: string
  enabled: boolean
}
