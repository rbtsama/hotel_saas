/**
 * 酒店管理系统类型定义
 * 商家入驻流程：加盟申请 → 审核通过 → 合作酒店
 */

// ==================== 加盟申请 ====================

/**
 * 跟进状态
 */
export enum FollowUpStatus {
  /** 待联系 */
  TO_CONTACT = 'to_contact',
  /** 洽谈中 */
  IN_NEGOTIATION = 'in_negotiation',
  /** 待签约 */
  TO_SIGN = 'to_sign',
  /** 已签约 */
  SIGNED = 'signed',
  /** 已拒绝 */
  REJECTED = 'rejected'
}

/**
 * 准入材料（资质证照）
 */
export interface QualificationDocuments {
  /** 营业执照 */
  businessLicense: boolean
  /** 餐饮经营许可证 */
  foodLicense: boolean
  /** 公共场所卫生许可证 */
  hygieneLicense: boolean
}

/**
 * 加盟申请
 */
export interface JoinApplication {
  /** 申请ID */
  applicationId: string
  /** 留资时间 */
  submittedAt: string
  /** 酒店名称 */
  hotelName: string
  /** 联系人手机号 */
  phone: string
  /** 联系人邮箱 */
  email: string
  /** 省份 */
  province: string
  /** 城市 */
  city: string
  /** 酒店地址 */
  address: string
  /** 酒店状况描述 */
  hotelDescription: string
  /** 准入材料 */
  qualifications: QualificationDocuments
  /** 酒店图片URL列表 */
  hotelImages: string[]
  /** 跟进状态 */
  followUpStatus: FollowUpStatus
  /** 跟进记录（BD备注） */
  followUpNotes: string
  /** 最后跟进时间 */
  lastFollowUpAt?: string
  /** 最后跟进人 */
  lastFollowUpBy?: string
  /** 签约信息（只有已签约状态才有） */
  contractInfo?: ContractInfo
}

/**
 * 签约信息
 */
export interface ContractInfo {
  /** 协议类型 */
  contractType: string
  /** 版本号 */
  version: string
  /** 签约人 */
  signerName: string
  /** 签约账号（手机号） */
  signerPhone: string
  /** 签约时间 */
  signedAt: string
  /** 协议内容（完整文本） */
  contractContent: string
}

// ==================== 合作酒店 ====================

/**
 * 酒店状态
 */
export enum HotelStatus {
  /** 上线 */
  ONLINE = 'online',
  /** 下线 */
  OFFLINE = 'offline'
}

/**
 * 配置状态
 */
export enum OnboardingStatus {
  /** 未开始 */
  NOT_STARTED = 'not_started',
  /** 配置中 */
  CONFIGURING = 'configuring',
  /** 已完成 */
  COMPLETED = 'completed'
}

/**
 * 合作酒店
 */
export interface PartnerHotel {
  /** 酒店ID */
  hotelId: string
  /** 开通时间 */
  activatedAt: string
  /** 酒店名称 */
  hotelName: string
  /** 省份 */
  province: string
  /** 城市 */
  city: string
  /** 区县 */
  district: string
  /** 详细地址 */
  address: string
  /** 管理员账号（酒店登录账号） */
  adminAccount: string
  /** 抽佣比例（%） */
  commissionRate: number
  /** 盛付通号（支付通道） */
  shengfutongId: string
  /** 酒店状态 */
  status: HotelStatus
  /** 配置进度（0-100） */
  completionRate: number
  /** 配置状态 */
  onboardingStatus: OnboardingStatus
  /** 创建时间 */
  createdAt: string
  /** 创建人 */
  createdBy: string
  /** 最后修改时间 */
  updatedAt?: string
  /** 最后修改人 */
  updatedBy?: string
}

// ==================== 查询参数 ====================

/**
 * 加盟申请查询参数
 */
export interface JoinApplicationQuery {
  /** 跟进状态筛选 */
  followUpStatus?: FollowUpStatus
  /** 关键词搜索（酒店名称） */
  keyword?: string
}

/**
 * 合作酒店查询参数
 */
export interface PartnerHotelQuery {
  /** 开通时间范围（开始） */
  activatedStart?: string
  /** 开通时间范围（结束） */
  activatedEnd?: string
  /** 省份 */
  province?: string
  /** 城市 */
  city?: string
  /** 区县 */
  district?: string
  /** 酒店名称模糊搜索 */
  keyword?: string
  /** 酒店状态 */
  status?: HotelStatus
  /** 配置状态 */
  onboardingStatus?: OnboardingStatus
}

// ==================== 操作请求 ====================

/**
 * 更新跟进状态请求
 */
export interface UpdateFollowUpRequest {
  applicationId: string
  followUpStatus: FollowUpStatus
  followUpNotes: string
  operatorName: string
}

/**
 * 更新合作酒店请求
 */
export interface UpdatePartnerHotelRequest {
  hotelId: string
  adminAccount?: string
  commissionRate?: number
  shengfutongId?: string
  status?: HotelStatus
  operatorName: string
}
