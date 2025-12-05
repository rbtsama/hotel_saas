// 房型图片类型定义

export interface RoomImage {
  id: string
  url: string
  thumbnail?: string
}

export interface RoomTypeImages {
  id: string
  roomTypeName: string // 房型名称，如"竹林大床房"
  buildingNumber: string // 号院，如"1号院"
  images: RoomImage[]
  maxImages: number // 最大图片数量，默认10
}

export interface RoomTypeImagesFilterParams {
  search?: string
  buildingNumber?: string
}
