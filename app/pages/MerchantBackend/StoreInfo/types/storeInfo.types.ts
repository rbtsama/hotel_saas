// 门店信息类型定义

// ==================== 基本信息 ====================
export interface BasicInfo {
  // 门店身份
  name: string // 门店名称（锁定）
  city: string // 城市（锁定）
  address: string // 详细地址（锁定）
  hotelCategory: string // 类型（锁定）
  roomCount: number // 房间数（锁定）

  // 联系方式
  contactPhone: string // 联系电话
  contactName: string // 联系人名称
  email?: string // 邮箱地址

  // 门店描述
  description: string // 门店描述

  // 预订限制
  latestBookingTime: string // 当天最晚预订时间（格式：HH:mm）
}

// ==================== 政策相关 ====================
export interface PolicyInfo {
  // 入住及退房时间
  checkinStartTime: string // 开始办理入住时间（格式：HH:mm）
  checkoutEndTime: string // 最晚退房时间（格式：HH:mm）
  checkinNote?: string // 入住备注

  // 取消政策
  cancellationRule: 'no_cancel' | 'free_cancel' // 取消规则
  freeCancelDays?: number // 入住日前X天
  freeCancelTime?: string // XX:XX 前可免费取消
  afterCancelRule?: 'not_allowed' | 'penalty' // 超时处理

  // 办理入住年龄
  ageRestriction: 'no_limit' | 'limited' // 年龄限制
  minAge?: number // 最小年龄

  // 宠物政策
  petPolicy: 'not_allowed' | 'allowed' | 'on_request' // 宠物政策
  petNote?: string // 宠物补充说明

  // 支付方式
  paymentMethods: {
    acceptedCards: string[] // 接受的银行卡种类
    thirdPartyPayments: string[] // 第三方支付
    cashPayment: boolean // 现金支付
  }

  // 预订担保可用银行卡
  guaranteeCards: string[] // 可用卡种

  // 政策补充
  policyNote?: string // 补充说明
}

// ==================== 门店设施 ====================
export interface FacilityInfo {
  // 房间设施
  roomFacilities: string[]

  // 娱乐设施
  entertainmentFacilities: string[]

  // 公共区域
  publicAreas: string[]

  // 前台服务
  frontDeskServices: string[]

  // 餐饮服务
  diningServices: string[]

  // 商务服务
  businessServices: string[]

  // 清洁服务
  cleaningServices: string[]

  // 交通设施
  transportFacilities: string[]

  // 安全设施
  safetyFacilities: string[]
}

// ==================== 周边信息 ====================
export interface NearbyLocation {
  id: string
  category: 'attraction' | 'transport' | 'dining' | 'shopping' | 'hospital' | 'other'
  name: string
  distance: number // 距离（米）
  distanceType: 'straight' | 'driving' // 距离类型
}

export interface SurroundingInfo {
  locations: NearbyLocation[]
}

// ==================== 早餐政策 ====================
export interface BreakfastPriceRule {
  id: string
  minValue: number // 最小年龄/身高
  maxValue: number // 最大年龄/身高
  isFree: boolean // 是否免费
  price?: number // 价格（收费时必填）
}

export interface BreakfastPolicy {
  provided: boolean // 是否提供早餐
  breakfastType?: 'buffet' | 'set_meal' | 'alacarte' // 早餐类型
  cuisineType?: string[] // 菜系
  breakfastTime?: 'daily' | 'specified' // 早餐时间
  breakfastStartTime?: string // 开始时间
  breakfastEndTime?: string // 结束时间
  additionalPrice?: number // 加1份早餐价格

  // 儿童早餐收费详情
  childPricingType?: 'age' | 'height' // 计价方式
  childPriceRules?: BreakfastPriceRule[] // 收费规则列表
}

// ==================== 加床政策 ====================
export interface RoomExtraBedPolicy {
  roomTypeId: string
  roomTypeName: string
  courtyard: string // 院落

  // 加床
  extraBedProvided: boolean // 是否提供加床
  extraBedType?: 'single' | 'double' // 床型
  extraBedCount?: number // 数量
  extraBedPrice?: number // 价格

  // 婴儿床
  cribProvided: boolean // 是否提供婴儿床
  cribCount?: number // 数量
  cribPrice?: number // 价格
}

export interface ExtraBedPolicy {
  roomPolicies: RoomExtraBedPolicy[]
}

// ==================== 门店图片 ====================
export interface StoreImage {
  id: string
  url: string
  sortOrder: number
}

export interface ImageInfo {
  // 小程序分享图
  shareImage?: string // 分享封面图
  shareText?: string // 分享展示文案

  // 门店主页首图
  mainImages: StoreImage[] // 图片列表（最多5张）
}

// ==================== 完整门店信息 ====================
export interface StoreInfo {
  id: string
  basicInfo: BasicInfo
  policyInfo: PolicyInfo
  facilityInfo: FacilityInfo
  surroundingInfo: SurroundingInfo
  breakfastPolicy: BreakfastPolicy
  extraBedPolicy: ExtraBedPolicy
  imageInfo: ImageInfo
  updatedAt: string
}

// ==================== 常量定义 ====================

// 银行卡类型
export const CARD_TYPES = [
  { value: 'visa', label: 'Visa' },
  { value: 'master', label: 'Master' },
  { value: 'amex', label: 'Amex' },
  { value: 'jcb', label: 'Jcb' },
  { value: 'diners', label: 'Diners Club' },
  { value: 'unionpay', label: '银联' },
  { value: 'discover', label: '发现卡' },
]

// 第三方支付
export const THIRD_PARTY_PAYMENTS = [
  { value: 'wechat', label: '微信' },
  { value: 'alipay', label: '支付宝' },
  { value: 'unionpay', label: '云闪付' },
  { value: 'applepay', label: 'Apple Pay' },
  { value: 'paypal', label: 'PayPal' },
]

// 周边位置类别
export const LOCATION_CATEGORIES = [
  { value: 'attraction', label: '景点' },
  { value: 'transport', label: '交通' },
  { value: 'dining', label: '餐饮' },
  { value: 'shopping', label: '购物' },
  { value: 'hospital', label: '医疗' },
  { value: 'other', label: '其他' },
]

// 房间设施
export const ROOM_FACILITIES = [
  '空调', '暖气', '电风扇', '书桌', '衣橱', '化妆镜', '电视', '音响', '阳台',
  '小院', '落地窗', '浴缸', '淋浴', '吹风机', '拖鞋', '24H热水', '洗漱用品',
  '卫浴毛巾', '电热水壶', '冰箱', '保险箱', '遮光窗帘', '独卫', '投影仪',
  '麻将机', '棋牌', '独立淋浴间', '防潮', '智能马桶', '无烟',
]

// 娱乐设施
export const ENTERTAINMENT_FACILITIES = [
  '茶室', '酒吧', '手工活动', '泳池', '恒温泳池', '景观泳池', '水上乐园',
  '海滩', '徒步旅行', '种植采摘', '亲近动物', '桌面足球', '投影设备',
  '家庭影院', '露天电影', '户外篝火', '壁炉烤火',
]

// 公共区域
export const PUBLIC_AREAS = [
  '公用WIFI', '电梯', '非经营休息区', '暖气', '加湿器', '净水机', '音响',
  '新风', '禁烟', '吸烟区', '户外家具', '图书室', '花园', '野餐区',
  '礼品廊', '厨房', '烧烤',
]

// 前台服务
export const FRONT_DESK_SERVICES = [
  '保险柜', '储物柜', '电子身份证', '信用卡结算',
]

// 餐饮服务
export const DINING_SERVICES = [
  '早餐送餐', '咖啡厅', '小吃吧', '便利店', '清真饮食',
]

// 商务服务
export const BUSINESS_SERVICES = [
  '会议室', '商务中心', '多功能厅', '共享办公', '专用展览厅', '商务服务',
  '婚宴服务', '快递服务', '多媒体演示系统', '传真/复印',
]

// 清洁服务
export const CLEANING_SERVICES = [
  '每日清洁', '更换床单', '更换毛巾', '深度清洁',
]

// 交通设施
export const TRANSPORT_FACILITIES = [
  '免费停车', '充电桩', '免费接送服务', '租车服务',
]

// 安全设施
export const SAFETY_FACILITIES = [
  '公共区域监控', '门禁系统', '医务室', '急救包', '安全报警器',
  '火灾报警器', '烟雾报警器', '一氧化碳报警器', '灭火器', '安保人员',
]

// 早餐类型
export const BREAKFAST_TYPES = [
  { value: 'buffet', label: '自助餐' },
  { value: 'set_meal', label: '套餐' },
  { value: 'alacarte', label: '点餐' },
]

// 菜系类型
export const CUISINE_TYPES = [
  { value: 'chinese', label: '中式' },
  { value: 'western', label: '西式' },
  { value: 'japanese', label: '日式' },
  { value: 'korean', label: '韩式' },
  { value: 'asian', label: '亚洲风味' },
  { value: 'halal', label: '清真' },
  { value: 'vegetarian', label: '素食' },
]
