/**
 * 酒店政策Mock数据
 */

import type { HotelPolicy } from '../../types/hotel-backend.types'
import {
  CancellationPolicyType,
  AfterCancellationType,
  DepositPolicyType,
} from '../../types/hotel-backend.types'

export const mockHotelPolicy: HotelPolicy = {
  id: 'policy-001',
  storeId: 'store-001',

  // 入住退房时间
  latestBookingTime: '22:00',
  checkInStartTime: '14:00',
  checkOutLatestTime: '12:00',
  checkInNotes: '',

  // 取消政策
  cancellationPolicy: CancellationPolicyType.FREE_BEFORE_DEADLINE,
  freeCancelDays: 1,
  freeCancelTime: '22:00',
  afterCancellationType: AfterCancellationType.NOT_ALLOWED,

  // 办理入住年龄
  ageRestriction: true,
  minAge: 18,
  maxAge: undefined, // 不限

  // 儿童政策
  allowChildren: true,
  childrenMinAge: undefined, // 不限
  childrenNotes: `1、每间房可免费携带2位16岁以下儿童与成人共享一张床铺。儿童早餐免费提供部分主食。
2、部分房型可为儿童加床,将收取加床费200元,含1份早餐。如床位为榻榻米床榻,如需为榻榻米床上加床榻,将加收100元。`,

  // 押金政策
  depositPolicy: DepositPolicyType.NO_DEPOSIT,

  // 前台可用支付方式
  paymentMethods: {
    creditCards: ['银联'],
    thirdParty: [],
    cash: false,
  },

  // 预定担保到门店可用银行卡
  guaranteeCards: ['Visa', 'Master', 'Amex', 'Jcb', 'Diners Club', '银联', '发现卡'],

  // 政策补充
  policyNotes: '',

  updatedAt: '01/15/25 16:30:00',
}
