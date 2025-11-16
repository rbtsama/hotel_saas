/**
 * 广告管理相关类型定义
 */

// 星期枚举
export enum WeekDay {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7,
}

// 广告位配置
export interface AdPosition {
  id: string
  name: string
  enabled: boolean // 广告位全局启用/禁用
  carouselInterval: number // 轮播时间(秒)
}

// 广告内容
export interface Advertisement {
  id: string
  positionId: string // 所属广告位ID
  imageUrl: string // 广告图片URL
  validDateStart: string // 有效日期开始 YYYY-MM-DD
  validDateEnd: string // 有效日期结束 YYYY-MM-DD
  validTimeStart: string // 有效时间开始 HH:mm:ss
  validTimeEnd: string // 有效时间结束 HH:mm:ss
  weekDays: WeekDay[] // 星期类型(多选)
  clickUrl?: string // 点击跳转链接(选填)
  order: number // 排序顺序
  enabled: boolean // 启用状态
  createdAt: string
  updatedAt: string
}

// 广告表单数据(创建/编辑)
export interface AdFormData {
  imageUrl: string
  validDateStart: string
  validDateEnd: string
  validTimeStart: string
  validTimeEnd: string
  weekDays: WeekDay[]
  clickUrl?: string
  enabled: boolean
}

// 广告位更新数据
export interface AdPositionUpdateData {
  enabled: boolean
  carouselInterval: number
}
