import type { NonRoomProduct } from '../../types/nonRoomProducts.types'

// 模拟非房产品数据
export const mockNonRoomProductsData: NonRoomProduct[] = [
  {
    id: '1',
    sequenceNumber: 5,
    productCategory: '酒店套餐',
    productName: '一方茶席',
    productDescription: '沉江骑行套餐',
    applyUseSettings: '茶室免费使用2小时',
    createdAt: '01/10/25 09:00:00'
  },
  {
    id: '2',
    sequenceNumber: 4,
    productCategory: '休闲娱乐',
    productName: '沿江骑行',
    productDescription: '免费自行车租借，探索周边美景',
    applyUseSettings: '免费自行车租借',
    createdAt: '01/08/25 14:30:00'
  },
  {
    id: '3',
    sequenceNumber: 3,
    productCategory: '餐饮服务',
    productName: '特色早餐',
    productDescription: '提供当地特色早餐，新鲜食材',
    applyUseSettings: '每日7:00-10:00供应',
    createdAt: '01/05/25 11:20:00'
  },
  {
    id: '4',
    sequenceNumber: 2,
    productCategory: '康养服务',
    productName: 'SPA按摩',
    productDescription: '专业按摩师提供全身放松服务',
    applyUseSettings: '需提前预约',
    createdAt: '01/03/25 16:45:00'
  },
  {
    id: '5',
    sequenceNumber: 1,
    productCategory: '交通服务',
    productName: '机场接送',
    productDescription: '往返机场专车接送服务',
    applyUseSettings: '需提前24小时预约',
    createdAt: '01/01/25 10:00:00'
  }
]
