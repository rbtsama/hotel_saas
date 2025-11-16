import type { BreakfastPolicy } from '../../types/hotel-backend.types'
import { BreakfastType, BreakfastTimeType, ChildPricingType } from '../../types/hotel-backend.types'

export const mockBreakfastPolicy: BreakfastPolicy = {
  id: 'bp-001',
  storeId: 'store-001',
  provided: true,
  type: BreakfastType.SET_MEAL,
  cuisines: ['中式'],
  timeType: BreakfastTimeType.SPECIFIC,
  startTime: '08:00',
  endTime: '10:00',
  extraPrice: 50,
  childPricingType: ChildPricingType.BY_AGE,
  childRules: [
    { id: 'cr-001', minAge: 1, maxAge: 16, isFree: true },
    { id: 'cr-002', minAge: 17, maxAge: 17, isFree: false, price: 50 },
  ],
  updatedAt: '01/15/25 17:00:00',
}
