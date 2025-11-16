/**
 * 酒店后台管理系统 - 完整类型定义
 */

// ============ 1. 账号管理模块 ============

// 员工账号(简化版)
export interface StaffAccount {
  id: string
  position?: string              // 岗位(选填)
  name?: string                  // 姓名(选填)
  phone: string                  // 手机号(必填,唯一)
  createdAt: string
  createdBy: string              // 创建人
}

// 员工表单数据
export interface StaffFormData {
  position?: string
  name?: string
  phone: string
}

// ============ 2. 门店管理模块 ============

// 门店状态
export enum StoreStatus {
  OPERATING = 'operating',       // 营业中
  RENOVATING = 'renovating',     // 装修中
  CLOSED = 'closed',             // 已关闭
}

// 门店基本信息(完整版)
export interface Store {
  id: string
  // 基本信息
  name: string                   // 名称(必填)
  city: string                   // 城市(必填)
  phone: string                  // 电话(必填)
  wechat?: string                // 微信号(选填)
  address: string                // 地址(必填)
  longitude?: number             // 经度(地图选点)
  latitude?: number              // 纬度(地图选点)
  openedYear: string             // 开业时间(年份,必填)
  slogan: string                 // slogan或门店推荐语(必填)
  tags: string[]                 // 门店推荐标签(多选)
  description: string            // 门店介绍(富文本)

  // 媒体资源
  logo?: string                  // 门店logo
  coverImage?: string            // 列表封面
  videoUrl?: string              // 门店视频
  videoCover?: string            // 视频封面
  newsImages: string[]           // 最新情报(多图)

  // 门店设施
  facilities: string[]           // 门店设施标签列表

  // 系统字段
  status: StoreStatus
  totalRooms: number             // 总房间数
  availableRooms: number         // 可用房间数
  rating: number                 // 评分(0-5)
  createdAt: string
  updatedAt: string
}

// 门店表单数据
export interface StoreFormData {
  name: string
  city: string
  phone: string
  wechat?: string
  address: string
  longitude?: number
  latitude?: number
  openedYear: string
  slogan: string
  tags: string[]
  description: string
  logo?: string
  coverImage?: string
  videoUrl?: string
  videoCover?: string
  newsImages: string[]
}

// ============ 周边信息配置 ============

// 距离类型
export enum DistanceType {
  DRIVING = 'driving',           // 驾驶距离
  WALKING = 'walking',           // 步行距离
}

// 周边信息分类
export enum SurroundingCategory {
  TRANSPORTATION = 'transportation', // 交通
  ATTRACTION = 'attraction',         // 景点
  FOOD = 'food',                     // 逛吃
}

// 周边信息项
export interface SurroundingItem {
  id: string
  category: SurroundingCategory
  placeName: string              // 地点名称
  distanceType: DistanceType     // 距离类型
  distanceKm: number             // 距离(公里)
  timeMinutes: number            // 用时(分钟)
}

// 周边信息配置
export interface SurroundingInfo {
  id: string
  storeId: string
  items: SurroundingItem[]       // 周边信息列表
  tourismMapImage?: string       // 旅游交通图
  updatedAt: string
}

// ============ 酒店政策配置 ============

// 取消政策类型
export enum CancellationPolicyType {
  NO_CANCELLATION = 'no_cancellation',           // 一经确认,不可取消
  FREE_BEFORE_DEADLINE = 'free_before_deadline', // 指定时间前免费取消
}

// 取消后处理方式
export enum AfterCancellationType {
  NOT_ALLOWED = 'not_allowed',                   // 不允许取消
  CHARGE_FEE = 'charge_fee',                     // 收取违约金
}

// 押金政策类型
export enum DepositPolicyType {
  NO_DEPOSIT = 'no_deposit',                     // 否
  FIXED_AMOUNT = 'fixed_amount',                 // 固定金额
  PER_ROOM = 'per_room',                         // 按预订房间数量支付
  PER_DAY = 'per_day',                           // 按预订天数
}

// 酒店政策配置
export interface HotelPolicy {
  id: string
  storeId: string

  // 入住退房时间
  latestBookingTime: string                      // 当天最晚预定时间(如: 22:00)
  checkInStartTime: string                       // 开始办理入住时间(如: 14:00)
  checkOutLatestTime: string                     // 最晚退房时间(如: 12:00)
  checkInNotes?: string                          // 入住备注

  // 取消政策
  cancellationPolicy: CancellationPolicyType
  freeCancelDays?: number                        // 入住日前X天
  freeCancelTime?: string                        // 免费取消时间(如: 22:00)
  afterCancellationType?: AfterCancellationType  // 此后处理方式

  // 办理入住年龄
  ageRestriction: boolean                        // 是否限制年龄
  minAge?: number                                // 最小年龄
  maxAge?: number                                // 最大年龄(不限为null)

  // 儿童政策
  allowChildren: boolean                         // 是否接待儿童
  childrenMinAge?: number                        // 允许几岁及以上儿童(不限为null)
  childrenNotes?: string                         // 儿童政策备注

  // 押金政策
  depositPolicy: DepositPolicyType
  depositAmount?: number                         // 押金金额

  // 前台可用支付方式
  paymentMethods: {
    creditCards: string[]                        // 信用卡/借记卡
    thirdParty: string[]                         // 第三方支付
    cash: boolean                                // 现金支付
  }

  // 预定担保到门店可用银行卡
  guaranteeCards: string[]

  // 政策补充
  policyNotes?: string

  updatedAt: string
}

// ============ 早餐政策配置 ============

export enum BreakfastType {
  A_LA_CARTE = 'a_la_carte',     // 单点
  BUFFET = 'buffet',             // 自助餐
  SET_MEAL = 'set_meal',         // 固定套餐
}

export enum BreakfastTimeType {
  ALL_DAY = 'all_day',           // 每日开放
  SPECIFIC = 'specific',         // 指定时间
}

export enum ChildPricingType {
  BY_AGE = 'by_age',             // 按年龄定价
  BY_HEIGHT = 'by_height',       // 按身高定价
}

export interface ChildBreakfastRule {
  id: string
  minAge: number
  maxAge: number
  isFree: boolean
  price?: number
}

export interface BreakfastPolicy {
  id: string
  storeId: string
  provided: boolean
  type?: BreakfastType
  cuisines: string[]             // 类型(多选)
  timeType?: BreakfastTimeType
  startTime?: string
  endTime?: string
  extraPrice?: number            // 加1份早餐价格
  childPricingType?: ChildPricingType
  childRules: ChildBreakfastRule[]
  updatedAt: string
}

// ============ 加床政策配置 ============

export interface ExtraBedRule {
  id: string
  ageMin: number
  ageMax: number | null
  bedType: string                // 床型(如:固定床铺)
  entryMethod: string            // 每次入住
  price: number
}

export interface CribRule {
  id: string
  // 加婴儿床规则(简化)
}

export interface RoomTypeExtraBedConfig {
  roomTypeId: string
  roomTypeName: string
  allowExtraBed: string          // 不提供出加床/提供1张/提供2张等
  allowCrib: string              // 不提供加婴儿床/提供1张等
}

export interface ExtraBedPolicy {
  id: string
  storeId: string
  extraBedRules: ExtraBedRule[]
  cribRules: CribRule[]
  roomTypeConfigs: RoomTypeExtraBedConfig[]
  updatedAt: string
}

// ============ 3. 房型管理模块 ============

// 房型状态
export enum RoomTypeStatus {
  ACTIVE = 'active',             // 在售
  PAUSED = 'paused',             // 暂停销售
  DISCONTINUED = 'discontinued', // 已下架
}

// 房型配置
export interface RoomType {
  id: string
  sortOrder: number              // 编号/排序
  category: string               // 类型(普通/豪华等)
  name: string                   // 房型名称
  院: string                     // 所属院(如:1号院)
  bedrooms: number               // 卧室数
  roomCount: number              // 房间数
  area: number                   // 面积(平方米)
  maxAdults: number              // 限住成人数
  isOnline: boolean              // 上架状态
  basePrice: number              // 基础价格
  facilities: string[]           // 房间设施标签
  images: string[]               // 房型图片
  createdAt: string
}

// ============ 4. 房屋管理模块 ============

// 房间状态
export enum RoomStatus {
  AVAILABLE = 'available',       // 空闲可售
  OCCUPIED = 'occupied',         // 已入住
  CLEANING = 'cleaning',         // 清洁中
  MAINTENANCE = 'maintenance',   // 维修中
  RESERVED = 'reserved',         // 已预订
}

// 房间信息
export interface Room {
  id: string
  storeId: string
  storeName: string
  roomTypeId: string
  roomTypeName: string
  roomNumber: string             // 房间号(如:2001)
  floor: number                  // 楼层
  status: RoomStatus
  lastCleanedAt?: string         // 最后清洁时间
  lastMaintenanceAt?: string     // 最后维护时间
  currentGuestName?: string      // 当前入住客人
  checkInDate?: string           // 入住日期
  checkOutDate?: string          // 预计退房日期
  notes?: string                 // 备注
}

// 房间维护记录
export interface MaintenanceRecord {
  id: string
  roomId: string
  roomNumber: string
  type: 'repair' | 'cleaning' | 'inspection'
  description: string
  staffName: string
  startTime: string
  endTime?: string
  status: 'pending' | 'in_progress' | 'completed'
}

// ============ 5. 会员管理模块 ============

// 酒店自有会员等级
export enum HotelMemberLevel {
  NORMAL = 'normal',             // 普通
  VIP = 'vip',                   // VIP
  SVIP = 'svip',                 // 超级VIP
}

// 酒店会员
export interface HotelMember {
  id: string
  name: string
  phone: string
  level: HotelMemberLevel
  levelName: string
  points: number                 // 酒店积分
  totalStays: number             // 总入住次数
  totalAmount: number            // 总消费金额
  discount: number               // 会员折扣(0.9 = 9折)
  joinedAt: string
  lastVisitAt?: string
  notes?: string
}

// ============ 统计数据 ============

// 门店统计
export interface StoreStats {
  totalStores: number
  operatingStores: number
  totalRooms: number
  occupancyRate: number          // 入住率
  revenue: number                // 营收
}

// 房间统计
export interface RoomStats {
  totalRooms: number
  availableRooms: number
  occupiedRooms: number
  cleaningRooms: number
  maintenanceRooms: number
}
