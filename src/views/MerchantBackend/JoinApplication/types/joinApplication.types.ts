/**
 * 商户端 - 入驻申请类型定义
 */

/**
 * 店铺类型
 */
export enum StoreType {
  HOMESTAY = 'homestay',     // 民宿
  HOTEL = 'hotel',           // 酒店
  APARTMENT = 'apartment',   // 公寓
  HOSTEL = 'hostel',         // 青旅
  GUESTHOUSE = 'guesthouse', // 客栈
}

export const StoreTypeLabels: Record<StoreType, string> = {
  [StoreType.HOMESTAY]: '民宿',
  [StoreType.HOTEL]: '酒店',
  [StoreType.APARTMENT]: '公寓',
  [StoreType.HOSTEL]: '青旅',
  [StoreType.GUESTHOUSE]: '客栈',
}

/**
 * OTA平台
 */
export enum OTAPlatform {
  CTRIP = 'ctrip',           // 携程
  MEITUAN = 'meituan',       // 美团
  FLIGGY = 'fliggy',         // 飞猪等OTA
  XIAOHONGSHU = 'xiaohongshu', // 小红书
  DOUYIN = 'douyin',         // 抖音
  WECHAT_VIDEO = 'wechat_video', // 微信视频号
  OVERSEAS = 'overseas',     // 海外渠道（booking、agoda、Expedia）
}

export const OTAPlatformLabels: Record<OTAPlatform, string> = {
  [OTAPlatform.CTRIP]: '携程',
  [OTAPlatform.MEITUAN]: '美团',
  [OTAPlatform.FLIGGY]: '飞猪等OTA',
  [OTAPlatform.XIAOHONGSHU]: '小红书',
  [OTAPlatform.DOUYIN]: '抖音',
  [OTAPlatform.WECHAT_VIDEO]: '微信视频号',
  [OTAPlatform.OVERSEAS]: '海外渠道：booking、agoda、Expedia',
}

/**
 * OTA困境选项
 */
export enum OTAChallenge {
  COMPLEX_RULES = 'complex_rules',       // 运营规则太复杂
  NO_ENERGY = 'no_energy',               // 没精力站琐
  LOSS_BUT_DARE_NOT = 'loss_but_dare_not', // 亏钱但没不敢
  COMPETITION = 'competition',           // 房边竞争太卷
  LACK_KNOWLEDGE = 'lack_knowledge',     // 平台运营懂比在乃法
}

export const OTAChallengeLabels: Record<OTAChallenge, string> = {
  [OTAChallenge.COMPLEX_RULES]: '运营规则太复杂',
  [OTAChallenge.NO_ENERGY]: '没精力站琐',
  [OTAChallenge.LOSS_BUT_DARE_NOT]: '亏钱但没不敢',
  [OTAChallenge.COMPETITION]: '房边竞争太卷',
  [OTAChallenge.LACK_KNOWLEDGE]: '平台运营懂比在乃法',
}

/**
 * 房型图片信息
 */
export interface RoomTypeImages {
  roomTypeName: string // 房型名称（商家自定义）
  images: string[]     // 图片URL列表
}

/**
 * 入驻申请表单
 */
export interface JoinApplicationForm {
  // 主账号信息
  adminPhone: string // 主账号手机号
  adminName: string  // 主账号姓名

  // 门店基本信息
  storeName: string           // 网络名称/门店名称
  storeType: StoreType        // 店铺类型
  bookingPlatform: string     // 预订申请（曾官网预订费用）
  storeAddress: string        // 店铺详细地址
  storeDescription: string    // 民宿详情介绍

  // 运营人员信息
  hasOTASpecialist: boolean   // 是否有负责OTA渠道的专业运营人员
  otaContactName: string      // OTA负责人姓名
  otaContactPhone: string     // OTA负责人手机号

  // 平台相关
  onlinePlatforms: OTAPlatform[]     // 已上线的平台
  hasCtripSpecialOffer: boolean      // 携程星否特惠
  interestedPlatforms: OTAPlatform[] // 您酒店兴趣的代运营平台
  otaChallenges: OTAChallenge[]      // 目前ota的困境

  // 房型图片
  roomTypeImages: RoomTypeImages[]   // 按房型上传的图片
}

/**
 * 入驻申请记录
 */
export interface JoinApplication extends JoinApplicationForm {
  id: string
  status: 'pending' | 'approved' | 'rejected' // 申请状态
  createdAt: string
  updatedAt: string
  reviewedAt?: string
  reviewedBy?: string
  rejectReason?: string
}
