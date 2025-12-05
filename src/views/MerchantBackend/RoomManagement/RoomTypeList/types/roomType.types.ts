// 房型类型定义

export interface RoomType {
  id: string
  sortOrder: number // 编号/排序
  category: string // 类型（普通/豪华等）
  name: string // 房型名称
  院: string // 号院
  bedrooms: number // 卧室数
  roomCount: number // 房间数
  area: string // 面积
  maxAdults: number // 限住成人数
  isOnline: boolean // 上架状态
}

export interface RoomTypeFilterParams {
  category?: string
  name?: string
}
