// 非房产品类型定义

export interface NonRoomProduct {
  id: string
  sequenceNumber: number // 编号
  productCategory: string // 产品分类
  productName: string // 产品名
  productDescription: string // 产品描述
  applyUseSettings: string // 应用设置（标签）
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
  applyUseSettings: string
}
