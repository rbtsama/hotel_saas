/**
 * 门店礼赠配置 Mock 数据
 */

import type { StoreBenefitsConfig, StoreBenefit } from '../../types/store-benefits.types'
import { BenefitApplicability } from '../../types/store-benefits.types'

export const mockStoreBenefits: StoreBenefit[] = [
  {
    id: 'benefit-1',
    name: '免费自行车租借',
    description: '提供免费自行车，方便客人骑行游览周边景点',
    applicability: BenefitApplicability.ALL_MEMBERS,
    usageNotes: '每份包含：自行车适用2小时',
    bookingRules: '无需提前预订',
    policyNotes: '入住期间每房每日享一次，使用地点为酒店内',
    receptionTime: '08:00-20:00',
    sortOrder: 1,
    enabled: true,
    createdAt: '01/10/25 14:00:00',
  },
  {
    id: 'benefit-2',
    name: 'Mini Bar畅饮',
    description: '房间内Mini Bar所有饮品免费享用',
    applicability: BenefitApplicability.VIP2_AND_ABOVE,
    usageNotes: '每份包含：Mini Bar全部饮品（酒水除外）',
    bookingRules: '无需提前预订',
    policyNotes: '入住期间每房每日享一次，使用地点为客房内',
    receptionTime: '00:00-23:59',
    sortOrder: 2,
    enabled: true,
    createdAt: '01/10/25 14:00:00',
  },
  {
    id: 'benefit-3',
    name: '免费延迟退房至14:00',
    description: 'VIP会员专享，可免费延迟至下午2点退房',
    applicability: BenefitApplicability.VIP2_AND_ABOVE,
    usageNotes: '每份包含：延迟退房至14:00（视房态而定）',
    bookingRules: '需提前1天联系前台预约',
    policyNotes: '入住期间每房享一次，需视房态而定，旺季不适用',
    receptionTime: '00:00-14:00',
    sortOrder: 3,
    enabled: true,
    createdAt: '01/10/25 14:00:00',
  },
]

export const mockStoreBenefitsConfig: StoreBenefitsConfig = {
  id: 'config-1',
  storeId: 'store-1',
  benefits: mockStoreBenefits,
  updatedAt: '01/15/25 10:30:00',
}
