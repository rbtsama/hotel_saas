/**
 * 优惠券管理 - Mock 数据
 */

import type {
  Coupon,
  SceneDistribution,
  CouponRecord,
  VipLevel,
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
  { id: 'VIP1', name: '普通会员', level: 1 },
  { id: 'VIP2', name: '黄金会员', level: 2 },
  { id: 'VIP3', name: '白金会员', level: 3 },
  { id: 'VIP4', name: '钻石会员', level: 4 },
]
