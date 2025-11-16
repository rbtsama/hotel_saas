// 非房产品类型定义

export interface NonRoomProduct {
  id: string
  sequenceNumber: number // 编号
  productCategory: string // 产品分类
  productName: string // 产品名
  productDescription: string // 产品描述
  price: number // 价格（必需字段）
  pricingType: 'per_time' | 'per_hour' | 'per_person' | 'fixed' // 计价方式
  inventory?: number // 库存数量（每日可售数量）
  duration?: number // 服务时长（分钟）
  needsAppointment: boolean // 是否需要预约
  applyUseSettings: string // 应用设置（标签，如"免费使用2小时"）
  status: 'active' | 'inactive' // 产品状态
  createdAt: string
}

export interface NonRoomProductFilterParams {
  search?: string
  productCategory?: string
}

export interface NonRoomProductFormData {
  productCategory: string
  productName: string
  productDescription: string
  price: number
  pricingType: 'per_time' | 'per_hour' | 'per_person' | 'fixed'
  inventory?: number
  duration?: number
  needsAppointment: boolean
  applyUseSettings: string
  status: 'active' | 'inactive'
}
