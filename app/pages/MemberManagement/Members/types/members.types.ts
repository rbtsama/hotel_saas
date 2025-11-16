// 会员管理类型定义

export interface Member {
  id: string
  registrationTime: string // 注册时间
  nickname: string // 昵称
  name: string // 姓名
  phone: string // 电话
  level: MemberLevelType // 等级
  orderCount: number // 订单数
  nightCount: number // 间夜数
  consumptionAmount: number // 消费金额
  isPointsMember: boolean // 是否积分会员
  createdAt: string
}

export interface MemberOrder {
  id: string
  orderNumber: string // 订单号
  hotelName: string // 酒店名称
  roomType: string // 房型
  checkInDate: string // 入住日期
  checkOutDate: string // 退房日期
  nightCount: number // 间夜数
  totalAmount: number // 订单金额
  status: 'completed' | 'cancelled' | 'pending' // 订单状态
  orderTime: string // 下单时间
}

export interface MemberDetail extends Member {
  email?: string // 邮箱
  gender?: 'male' | 'female' | 'other' // 性别
  birthday?: string // 生日
  idCard?: string // 身份证号
  address?: string // 地址
  currentPoints: number // 当前积分
  totalPoints: number // 累计获得积分
  usedPoints: number // 已使用积分
  lastOrderTime?: string // 最近下单时间
  lastLoginTime?: string // 最近登录时间
  memberSince: string // 成为会员时长
  orders: MemberOrder[] // 订单列表
  isBlacklisted: boolean // 是否被拉黑
  blacklistReason?: string // 拉黑原因
}

export type MemberLevelType = '注册会员' | 'VIP1' | 'VIP2' | 'VIP3'

export interface MemberFilterParams {
  phone?: string
  level?: MemberLevelType
  isPointsMember?: boolean
  startDate?: string
  endDate?: string
  page?: number
  pageSize?: number
}

export interface MemberListResponse {
  members: Member[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 会员等级标签配置
export const MEMBER_LEVEL_LABELS = {
  '注册会员': { label: '注册会员', color: 'bg-blue-100 text-blue-700' },
  'VIP1': { label: 'VIP1', color: 'bg-purple-100 text-purple-700' },
  'VIP2': { label: 'VIP2', color: 'bg-purple-100 text-purple-700' },
  'VIP3': { label: 'VIP3', color: 'bg-purple-100 text-purple-700' }
} as const
