/**
 * 优惠券管理 - Mock 数据
 */

import type {
  Coupon,
  SceneDistribution,
  CouponRecord,
  VipLevel,
  CouponOperationLog,
} from '../../types/coupon.types'

/**
 * Mock 优惠券列表
 */
export const mockCoupons: Coupon[] = [
  {
    id: 'cp1000',
    name: '新用户专享满300减50',
    type: 'full_reduction',
    threshold: 300,
    amount: 50,
    smsNotify: true,
    validDays: 30,
    platformRatio: 30,
    merchantRatio: 70,
    remark: '用于新用户注册发放',
    status: 'enabled',
    createdAt: '2025/01/15 10:30:00',
    createdBy: 'admin001',
  },
  {
    id: 'cp1001',
    name: '周末特惠8折券',
    type: 'discount',
    discount: 80,
    maxDiscount: 100,
    smsNotify: true,
    validDays: 60,
    platformRatio: 50,
    merchantRatio: 50,
    remark: '限周末入住使用',
    status: 'enabled',
    createdAt: '2025/01/20 14:20:00',
    createdBy: 'admin002',
  },
  {
    id: 'cp1002',
    name: '立减30元优惠券',
    type: 'instant_reduction',
    amount: 30,
    smsNotify: false,
    validDays: 7,
    platformRatio: 100,
    merchantRatio: 0,
    remark: '无门槛立减',
    status: 'enabled',
    createdAt: '2025/01/25 09:15:00',
    createdBy: 'admin001',
  },
  {
    id: 'cp1003',
    name: '情人节特惠满500减80',
    type: 'full_reduction',
    threshold: 500,
    amount: 80,
    smsNotify: true,
    validDays: 0,
    platformRatio: 40,
    merchantRatio: 60,
    remark: '情人节活动专用',
    status: 'disabled',
    createdAt: '2025/01/28 16:45:00',
    createdBy: 'admin003',
  },
  {
    id: 'cp1004',
    name: '会员专享9折券',
    type: 'discount',
    discount: 90,
    maxDiscount: 50,
    smsNotify: true,
    validDays: 60,
    platformRatio: 20,
    merchantRatio: 80,
    remark: 'VIP会员专享',
    status: 'enabled',
    createdAt: '2024/12/01 11:00:00',
    createdBy: 'admin002',
  },
]

/**
 * Mock 场景发放配置
 */
export const mockSceneDistributions: SceneDistribution[] = [
  {
    id: 'SD001',
    scene: 'registration',
    sceneName: '注册发放',
    triggerDescription: '新用户完成注册时',
    couponId: 'cp1000',
    couponName: '新用户专享满300减50',
    couponRemark: '用于新用户注册发放',
    smsNotify: true,
    status: 'enabled',
  },
  {
    id: 'SD002',
    scene: 'checkout',
    sceneName: '离店发放',
    triggerDescription: '订单状态变为"已离店"时',
    couponId: 'cp1002',
    couponName: '立减30元优惠券',
    couponRemark: '无门槛立减',
    smsNotify: true,
    status: 'enabled',
  },
]

/**
 * Mock 优惠券记录
 */
export const mockCouponRecords: CouponRecord[] = [
  {
    couponId: 'cp1000',
    couponType: 'full_reduction',
    couponName: '新用户专享满300减50',
    distributionType: 'registration',
    userPhone: '13812348888',
    vipLevel: 'VIP1',
    operatedAt: '2025/01/16 08:30:00',
    operatedBy: 'system',
  },
  {
    couponId: 'cp1001',
    couponType: 'discount',
    couponName: '周末特惠8折券',
    distributionType: 'manual_vip',
    userPhone: '多手机号',
    vipLevel: 'VIP2',
    operatedAt: '2025/01/22 10:15:00',
    operatedBy: 'admin001',
  },
  {
    couponId: 'cp1002',
    couponType: 'instant_reduction',
    couponName: '立减30元优惠券',
    distributionType: 'checkout',
    userPhone: '18612341234',
    vipLevel: 'VIP3',
    operatedAt: '2025/01/26 15:40:00',
    operatedBy: 'system',
  },
  {
    couponId: 'cp1000',
    couponType: 'full_reduction',
    couponName: '新用户专享满300减50',
    distributionType: 'registration',
    userPhone: '13512345678',
    vipLevel: 'VIP1',
    operatedAt: '2024/12/20 09:00:00',
    operatedBy: 'system',
  },
  {
    couponId: 'cp1004',
    couponType: 'discount',
    couponName: '会员专享9折券',
    distributionType: 'manual_phone',
    userPhone: '18712349999',
    vipLevel: 'VIP4',
    operatedAt: '2025/01/28 13:25:00',
    operatedBy: 'admin002',
  },
  {
    couponId: 'cp1001',
    couponType: 'discount',
    couponName: '周末特惠8折券',
    distributionType: 'manual_vip',
    userPhone: '多手机号',
    vipLevel: 'VIP3',
    operatedAt: '2025/01/29 16:00:00',
    operatedBy: 'admin001',
  },
]

/**
 * Mock VIP等级
 */
export const mockVipLevels: VipLevel[] = [
  { id: 'VIP0', name: 'VIP0', level: 0 },
  { id: 'VIP1', name: 'VIP1', level: 1 },
  { id: 'VIP2', name: 'VIP2', level: 2 },
  { id: 'VIP3', name: 'VIP3', level: 3 },
  { id: 'VIP4', name: 'VIP4', level: 4 },
  { id: 'VIP5', name: 'VIP5', level: 5 },
  { id: 'VIP6', name: 'VIP6', level: 6 },
  { id: 'VIP7', name: 'VIP7', level: 7 },
  { id: 'VIP8', name: 'VIP8', level: 8 },
  { id: 'VIP9', name: 'VIP9', level: 9 },
]

/**
 * Mock 操作记录
 */
export const mockOperationLogs: CouponOperationLog[] = [
  {
    id: 'LOG001',
    couponId: 'cp1000',
    operationType: 'create',
    operationContent: '创建优惠券',
    operatedAt: '2025/01/15 10:30:00',
    operatedBy: 'admin001',
  },
  {
    id: 'LOG002',
    couponId: 'cp1001',
    operationType: 'create',
    operationContent: '创建优惠券',
    operatedAt: '2025/01/20 14:20:00',
    operatedBy: 'admin002',
  },
  {
    id: 'LOG003',
    couponId: 'cp1001',
    operationType: 'edit',
    operationContent: '备注说明：限周末入住 → 限周末入住使用\n折扣率：85% → 80%',
    operatedAt: '2025/01/21 09:15:00',
    operatedBy: 'admin001',
  },
  {
    id: 'LOG004',
    couponId: 'cp1002',
    operationType: 'create',
    operationContent: '创建优惠券',
    operatedAt: '2025/01/25 09:15:00',
    operatedBy: 'admin001',
  },
  {
    id: 'LOG005',
    couponId: 'cp1003',
    operationType: 'create',
    operationContent: '创建优惠券',
    operatedAt: '2025/01/28 16:45:00',
    operatedBy: 'admin003',
  },
  {
    id: 'LOG006',
    couponId: 'cp1003',
    operationType: 'edit',
    operationContent: '备注说明：情人节活动专用 → 情人节活动专属\n平台承担比例：40% → 35%',
    operatedAt: '2025/01/29 10:20:00',
    operatedBy: 'admin003',
  },
  {
    id: 'LOG007',
    couponId: 'cp1004',
    operationType: 'create',
    operationContent: '创建优惠券',
    operatedAt: '2024/12/01 11:00:00',
    operatedBy: 'admin002',
  },
  {
    id: 'LOG008',
    couponId: 'cp1000',
    operationType: 'edit',
    operationContent: '短信通知：是 → 否',
    operatedAt: '2025/01/16 14:30:00',
    operatedBy: 'admin001',
  },
  {
    id: 'LOG009',
    couponId: 'cp1004',
    operationType: 'edit',
    operationContent: '平台承担比例：20% → 25%\n最高优惠金额：50元 → 60元',
    operatedAt: '2025/01/30 14:15:00',
    operatedBy: 'admin003',
  },
  {
    id: 'LOG010',
    couponId: 'cp1002',
    operationType: 'edit',
    operationContent: '有效天数：7天 → 14天\n备注说明：无门槛立减 → 无门槛立减券',
    operatedAt: '2025/01/31 11:20:00',
    operatedBy: 'admin001',
  },
]
