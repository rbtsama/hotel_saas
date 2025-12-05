/**
 * 优惠券管理 - 服务层
 */

import type {
  Coupon,
  CouponFilterParams,
  SceneDistribution,
  CouponRecord,
  VipLevel,
  PaginationParams,
  PaginatedResult,
  CouponOperationLog,
  CouponOperationType,
} from '../types/coupon.types'
import {
  mockCoupons,
  mockSceneDistributions,
  mockCouponRecords,
  mockVipLevels,
  mockOperationLogs,
} from './mocks'

class CouponService {
  private coupons = [...mockCoupons]
  private sceneDistributions = [...mockSceneDistributions]
  private couponRecords = [...mockCouponRecords]
  private vipLevels = [...mockVipLevels]
  private operationLogs = [...mockOperationLogs]

  /**
   * 获取优惠券列表（按创建时间倒序，支持分页）
   */
  async getCoupons(params?: PaginationParams): Promise<PaginatedResult<Coupon>> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 按创建时间倒序排列
    const sorted = [...this.coupons].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize

    return {
      data: sorted.slice(start, end),
      total: sorted.length,
      page,
      pageSize,
      totalPages: Math.ceil(sorted.length / pageSize),
    }
  }

  /**
   * 根据ID获取优惠券
   */
  async getCouponById(id: string): Promise<Coupon | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.coupons.find((c) => c.id === id) || null
  }

  /**
   * 创建优惠券
   */
  async createCoupon(data: Partial<Coupon>): Promise<Coupon> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // 生成新的优惠券ID
    const lastId = this.coupons.length > 0
      ? Math.max(...this.coupons.map(c => parseInt(c.id.replace('cp', ''))))
      : 999
    const newId = `cp${lastId + 1}`

    const newCoupon: Coupon = {
      id: newId,
      name: data.name || '',
      type: data.type || 'full_reduction',
      threshold: data.threshold,
      amount: data.amount,
      discount: data.discount,
      maxDiscount: data.maxDiscount,
      smsNotify: data.smsNotify !== undefined ? data.smsNotify : true, // 默认开启短信通知
      validDays: data.validDays || 0,
      remark: data.remark,
      platformRatio: data.platformRatio || 50,
      merchantRatio: data.merchantRatio || 50,
      status: 'disabled',
      createdAt: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).replace(/\//g, '/').replace(',', ''),
      createdBy: 'admin001', // 模拟当前登录用户
    }

    this.coupons.unshift(newCoupon)

    // 记录操作日志
    this.logOperation('create', newCoupon)

    return newCoupon
  }

  /**
   * 更新优惠券
   */
  async updateCoupon(id: string, data: Partial<Coupon>): Promise<Coupon | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const index = this.coupons.findIndex((c) => c.id === id)
    if (index === -1) return null

    // 保存旧数据用于对比
    const oldCoupon = { ...this.coupons[index] }

    // 允许所有状态的优惠券编辑
    this.coupons[index] = { ...this.coupons[index], ...data }

    // 记录操作日志
    this.logOperation('edit', this.coupons[index], oldCoupon)

    return this.coupons[index]
  }

  /**
   * 启用/停用优惠券
   */
  async toggleCouponStatus(id: string): Promise<Coupon | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.coupons.findIndex((c) => c.id === id)
    if (index === -1) return null

    this.coupons[index].status = this.coupons[index].status === 'enabled' ? 'disabled' : 'enabled'
    return this.coupons[index]
  }

  /**
   * 删除优惠券
   */
  async deleteCoupon(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const coupon = this.coupons.find((c) => c.id === id)
    if (!coupon) return false

    // 检查是否有发放记录
    const hasRecords = this.couponRecords.some((r) => r.couponId === id)
    if (hasRecords) {
      throw new Error('该券已有发放记录，无法删除')
    }

    const index = this.coupons.findIndex((c) => c.id === id)
    this.coupons.splice(index, 1)
    return true
  }

  /**
   * 获取启用的优惠券列表（用于下拉选择）
   */
  async getEnabledCoupons(): Promise<Coupon[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.coupons.filter((c) => c.status === 'enabled')
  }

  /**
   * 获取场景发放配置
   */
  async getSceneDistributions(): Promise<SceneDistribution[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.sceneDistributions]
  }

  /**
   * 更新场景发放配置
   */
  async updateSceneDistribution(
    id: string,
    data: { couponId: string; smsNotify: boolean }
  ): Promise<SceneDistribution | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const index = this.sceneDistributions.findIndex((s) => s.id === id)
    if (index === -1) return null

    const coupon = this.coupons.find((c) => c.id === data.couponId)
    if (!coupon) throw new Error('优惠券不存在')

    this.sceneDistributions[index].couponId = data.couponId
    this.sceneDistributions[index].couponName = coupon.name
    this.sceneDistributions[index].couponRemark = coupon.remark || null
    this.sceneDistributions[index].smsNotify = data.smsNotify

    return this.sceneDistributions[index]
  }

  /**
   * 启用/停用场景发放
   */
  async toggleSceneDistributionStatus(id: string): Promise<SceneDistribution | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.sceneDistributions.findIndex((s) => s.id === id)
    if (index === -1) return null

    // 启用时需要检查是否已配置优惠券
    if (this.sceneDistributions[index].status === 'disabled' && !this.sceneDistributions[index].couponId) {
      throw new Error('请先配置优惠券')
    }

    this.sceneDistributions[index].status = this.sceneDistributions[index].status === 'enabled' ? 'disabled' : 'enabled'

    return this.sceneDistributions[index]
  }

  /**
   * 手动发放优惠券（按手机号）
   */
  async distributeByPhones(params: { phones: string[]; couponId: string; smsNotify: boolean }): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const coupon = this.coupons.find((c) => c.id === params.couponId)
    if (!coupon) throw new Error('优惠券不存在')

    // 创建发放记录
    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(',', '')

    // 单条记录 - 如果只有一个手机号，直接显示手机号
    if (params.phones.length === 1) {
      this.couponRecords.unshift({
        couponId: params.couponId,
        couponType: coupon.type,
        couponName: coupon.name,
        distributionType: 'manual_phone',
        userPhone: params.phones[0],
        operatedAt: now,
        operatedBy: 'admin001',
      })
    } else {
      // 多个手机号 - 创建一条记录，userPhone显示"多手机号"，phones数组保存所有手机号
      this.couponRecords.unshift({
        couponId: params.couponId,
        couponType: coupon.type,
        couponName: coupon.name,
        distributionType: 'manual_phone',
        userPhone: '多手机号',
        phones: params.phones,
        operatedAt: now,
        operatedBy: 'admin001',
      })
    }

    return true
  }

  /**
   * 获取VIP等级列表
   */
  async getVipLevels(): Promise<VipLevel[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return [...this.vipLevels]
  }

  /**
   * 手动发放优惠券（按VIP等级）
   */
  async distributeByVipLevels(params: { vipLevelIds: string[]; couponId: string; smsNotify: boolean }): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const coupon = this.coupons.find((c) => c.id === params.couponId)
    if (!coupon) throw new Error('优惠券不存在')

    // 创建发放记录（一条记录代表多个VIP等级的批量发放）
    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(',', '')

    this.couponRecords.unshift({
      couponId: params.couponId,
      couponType: coupon.type,
      couponName: coupon.name,
      distributionType: 'manual_vip',
      userPhone: '多手机号',
      vipLevels: params.vipLevelIds,
      operatedAt: now,
      operatedBy: 'admin001',
    })

    return true
  }

  /**
   * 获取优惠券记录列表（支持分页）
   */
  async getCouponRecords(params?: PaginationParams): Promise<PaginatedResult<CouponRecord>> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 按操作时间倒序排列
    const sorted = [...this.couponRecords].sort((a, b) => {
      return new Date(b.operatedAt).getTime() - new Date(a.operatedAt).getTime()
    })

    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize

    return {
      data: sorted.slice(start, end),
      total: sorted.length,
      page,
      pageSize,
      totalPages: Math.ceil(sorted.length / pageSize),
    }
  }

  /**
   * 获取操作记录（按操作时间倒序）
   */
  async getOperationLogs(): Promise<CouponOperationLog[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.operationLogs].sort((a, b) => {
      return new Date(b.operatedAt).getTime() - new Date(a.operatedAt).getTime()
    })
  }

  /**
   * 记录操作日志
   */
  private logOperation(type: CouponOperationType, coupon: Coupon, oldCoupon?: Coupon) {
    let operationContent = ''

    if (type === 'create') {
      operationContent = '创建优惠券'
    } else {
      // 编辑操作：对比字段变更
      const changes: string[] = []

      if (oldCoupon) {
        // 对比所有字段
        if (oldCoupon.name !== coupon.name) {
          changes.push(`优惠券名称：${oldCoupon.name} → ${coupon.name}`)
        }
        if (oldCoupon.remark !== coupon.remark) {
          changes.push(`备注说明：${oldCoupon.remark || '无'} → ${coupon.remark || '无'}`)
        }
        if (oldCoupon.threshold !== coupon.threshold) {
          changes.push(`使用门槛：${oldCoupon.threshold}元 → ${coupon.threshold}元`)
        }
        if (oldCoupon.amount !== coupon.amount) {
          changes.push(`减免金额：${oldCoupon.amount}元 → ${coupon.amount}元`)
        }
        if (oldCoupon.discount !== coupon.discount) {
          changes.push(`折扣率：${oldCoupon.discount}% → ${coupon.discount}%`)
        }
        if (oldCoupon.maxDiscount !== coupon.maxDiscount) {
          changes.push(`最高优惠金额：${oldCoupon.maxDiscount}元 → ${coupon.maxDiscount}元`)
        }
        if (oldCoupon.platformRatio !== coupon.platformRatio) {
          changes.push(`平台承担比例：${oldCoupon.platformRatio}% → ${coupon.platformRatio}%`)
        }
        if (oldCoupon.validDays !== coupon.validDays) {
          changes.push(`有效天数：${oldCoupon.validDays === 0 ? '永久' : oldCoupon.validDays + '天'} → ${coupon.validDays === 0 ? '永久' : coupon.validDays + '天'}`)
        }
        if (oldCoupon.smsNotify !== coupon.smsNotify) {
          changes.push(`短信通知：${oldCoupon.smsNotify ? '是' : '否'} → ${coupon.smsNotify ? '是' : '否'}`)
        }
      }

      operationContent = changes.join('\n') || '无变更'
    }

    const newLog: CouponOperationLog = {
      id: `LOG${String(this.operationLogs.length + 1).padStart(3, '0')}`,
      couponId: coupon.id,
      operationType: type,
      operationContent,
      operatedAt: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).replace(/\//g, '/').replace(',', ''),
      operatedBy: 'admin001', // 模拟当前登录用户
    }

    this.operationLogs.unshift(newLog)
  }
}

export default new CouponService()
