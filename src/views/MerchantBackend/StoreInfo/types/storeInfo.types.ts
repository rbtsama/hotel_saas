// 门店信息类型定义

// ==================== 基本信息 ====================
export interface BasicInfo {
  // 门店身份（锁定字段）
  name: string // 门店名称（锁定）
  city: string // 城市（锁定）
  address: string // 详细地址（锁定）
  hotelCategory: string // 类型（锁定）
  roomCount: number // 房间数（锁定）

  // 联系方式
  contactPhone: string // 联系电话 ★必填
  contactName: string // 联系人名称 ★必填
  email?: string // 邮箱地址

  // 门店展示
  logo?: string // 门店Logo图片
  slogan?: string // Slogan/门店推荐语
  recommendTags: string[] // 门店推荐标签 ★必填，最多2项
  description: string // 门店介绍 ★必填

  // 列表展示
  listCover: string // 列表封面 ★必填

  // 视频素材
  video?: string // 门店视频
  videoCover?: string // 视频封面

  // 动态信息
  latestNews: string[] // 最新情报图片
}

// ==================== 政策相关 ====================
export interface PolicyInfo {
  // 预订时间
  checkinStartTime: string // 开始办理入住时间 ★必填（格式：HH:mm）
  checkoutEndTime: string // 最晚退房时间 ★必填（格式：HH:mm）
  checkinNote?: string // 入住备注

  // 取消规则
  cancellationRule: 'no_cancel' | 'free_cancel' // 取消规则 ★必填
  freeCancelDays?: number // 入住日前X天
  freeCancelTime?: string // XX:XX前（格式：HH:mm）
  afterCancelRule?: 'not_allowed' | 'penalty' // 超时处理

  // 办理入住年龄
  ageRestriction: 'no_limit' | 'limited' // 年龄限制 ★必填
  minAge?: number // 最小年龄
  maxAge?: number | 'unlimited' // 最大年龄

  // 儿童政策
  childPolicy: 'allowed' | 'on_request' | 'not_allowed' // 儿童政策 ★必填
  childNote?: string // 儿童政策说明

  // 宠物政策
  petPolicy: 'allowed' | 'on_request' | 'not_allowed' // 宠物政策 ★必填
  petNote?: string // 宠物政策说明

  // 押金政策
  depositType: 'none' | 'fixed' | 'per_room' | 'per_day' // 押金类型 ★必填
  depositAmount?: number // 押金金额

  // 前台支付方式
  acceptedCards: string[] // 银行卡
  thirdPartyPayments: string[] // 第三方支付
  cashPayment: boolean // 现金支付

  // 预订担保银行卡
  guaranteeCards: string[] // 可用卡种

  // 政策补充
  policyNote?: string // 补充说明
}

// ==================== 门店设施 ====================
export interface FacilityInfo {
  // 亮点标签（复选，最多选择）
  highlights: string[] // 免费WiFi、免费停车、宠物友好、近地铁、含早、亲子友好、行李寄存、网红打卡、浴缸、私汤温泉

  // 详细设施（按服务类型分组）
  transportServices: string[] // 交通服务
  cleaningServices: string[] // 清洁服务
  safetyServices: string[] // 安全安保
  sportsServices: string[] // 运动设施
  spaServices: string[] // 康体设施
  accessibilityServices: string[] // 无障碍设施
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
  maxValue: number | 'unlimited' // 最大年龄/身高
  isFree: boolean // 是否免费
  price?: number // 价格（收费时必填）
}

export interface BreakfastPolicy {
  provided: boolean // 是否提供早餐 ★必填
  breakfastType?: 'buffet' | 'set_meal' | 'alacarte' // 早餐类型
  cuisineTypes?: string[] // 菜系（多选）
  timeType?: 'daily' | 'specified' // 早餐时间类型
  startTime?: string // 开始时间（格式：HH:mm）
  endTime?: string // 结束时间（格式：HH:mm）
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
  { value: 'jcb', label: 'JCB' },
  { value: 'diners', label: 'Diners Club' },
  { value: 'unionpay', label: '银联' },
  { value: 'discover', label: '发现卡' },
]

// 第三方支付
export const THIRD_PARTY_PAYMENTS = [
  { value: 'wechat', label: '微信支付' },
  { value: 'alipay', label: '支付宝' },
  { value: 'unionpay', label: '云闪付' },
  { value: 'applepay', label: 'Apple Pay' },
  { value: 'paypal', label: 'PayPal' },
]

// 门店亮点标签
export const HIGHLIGHT_TAGS = [
  { value: 'free_wifi', label: '免费WiFi' },
  { value: 'free_parking', label: '免费停车' },
  { value: 'pet_friendly', label: '宠物友好' },
  { value: 'near_subway', label: '近地铁' },
  { value: 'breakfast', label: '含早' },
  { value: 'family_friendly', label: '亲子友好' },
  { value: 'luggage_storage', label: '行李寄存' },
  { value: 'instagram_worthy', label: '网红打卡' },
  { value: 'bathtub', label: '浴缸' },
  { value: 'hot_spring', label: '私汤温泉' },
]

// 门店推荐标签（最多2项）
export const RECOMMEND_TAGS = [
  { value: 'luxury', label: '高端奢华' },
  { value: 'budget', label: '经济实惠' },
  { value: 'romantic', label: '浪漫情侣' },
  { value: 'family', label: '亲子家庭' },
  { value: 'business', label: '商务出行' },
  { value: 'scenic', label: '景区周边' },
  { value: 'city_center', label: '市中心' },
  { value: 'quiet', label: '安静舒适' },
  { value: 'unique', label: '特色民宿' },
  { value: 'hot_spring', label: '温泉养生' },
]

// 交通服务
export const TRANSPORT_SERVICES = [
  '免费停车',
  '收费停车',
  '充电桩',
  '免费接送服务',
  '收费接送服务',
  '租车服务',
  '代叫车服务',
  '免费班车',
]

// 清洁服务
export const CLEANING_SERVICES = [
  '每日清洁',
  '更换床单',
  '更换毛巾',
  '深度清洁',
  '洗衣服务',
  '干洗服务',
  '熨烫服务',
]

// 安全安保
export const SAFETY_SERVICES = [
  '公共区域监控',
  '门禁系统',
  '保险箱',
  '医务室',
  '急救包',
  '安全报警器',
  '火灾报警器',
  '烟雾报警器',
  '一氧化碳报警器',
  '灭火器',
  '安保人员',
  '24小时安保',
]

// 运动设施
export const SPORTS_SERVICES = [
  '健身房',
  '游泳池',
  '恒温泳池',
  '室内泳池',
  '室外泳池',
  '瑜伽室',
  '乒乓球',
  '台球',
  '网球场',
  '篮球场',
  '足球场',
  '高尔夫球场',
  '骑行',
  '徒步',
]

// 康体设施
export const SPA_SERVICES = [
  'SPA',
  '按摩',
  '桑拿',
  '汗蒸',
  '温泉',
  '私汤',
  '公共浴池',
  '美容美发',
  '足浴',
]

// 无障碍设施
export const ACCESSIBILITY_SERVICES = [
  '无障碍通道',
  '无障碍客房',
  '无障碍卫生间',
  '无障碍电梯',
  '无障碍停车位',
  '轮椅租赁',
  '助听设备',
  '盲文标识',
  '低位设施',
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
  { value: 'southeast_asian', label: '东南亚' },
  { value: 'halal', label: '清真' },
  { value: 'vegetarian', label: '素食' },
  { value: 'local', label: '本地特色' },
]

// 取消规则选项
export const CANCELLATION_RULES = [
  { value: 'no_cancel', label: '不可取消' },
  { value: 'free_cancel', label: '免费取消' },
]

// 超时取消处理
export const AFTER_CANCEL_RULES = [
  { value: 'not_allowed', label: '不可取消' },
  { value: 'penalty', label: '收取罚金' },
]

// 年龄限制选项
export const AGE_RESTRICTIONS = [
  { value: 'no_limit', label: '无限制' },
  { value: 'limited', label: '有限制' },
]

// 儿童政策选项
export const CHILD_POLICIES = [
  { value: 'allowed', label: '允许' },
  { value: 'on_request', label: '需确认' },
  { value: 'not_allowed', label: '不允许' },
]

// 宠物政策选项
export const PET_POLICIES = [
  { value: 'allowed', label: '允许' },
  { value: 'on_request', label: '需确认' },
  { value: 'not_allowed', label: '不允许' },
]

// 押金类型选项
export const DEPOSIT_TYPES = [
  { value: 'none', label: '无需押金' },
  { value: 'fixed', label: '固定金额' },
  { value: 'per_room', label: '每间房' },
  { value: 'per_day', label: '每天' },
]

// 早餐时间类型
export const BREAKFAST_TIME_TYPES = [
  { value: 'daily', label: '每日相同' },
  { value: 'specified', label: '指定日期' },
]

// 儿童计价方式
export const CHILD_PRICING_TYPES = [
  { value: 'age', label: '按年龄' },
  { value: 'height', label: '按身高' },
]

// 加床类型
export const EXTRA_BED_TYPES = [
  { value: 'single', label: '单人床' },
  { value: 'double', label: '双人床' },
]
