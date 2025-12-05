// 用户点赞类型定义

export interface UserReview {
  id: string
  reviewTime: string // 留言时间
  guestName: string // 入住人姓名
  guestPhone: string // 入住人电话
  roomType: string // 预定房型
  createdAt: string
}

export interface UserReviewDetail extends UserReview {
  orderNumber: string // 订单号
  checkInDate: string // 入住日期
  checkOutDate: string // 退房日期
  nightCount: number // 入住天数
  totalAmount: number // 订单金额
  ratings: {
    cleanliness: number // 卫生整洁度
    service: number // 服务态度
    facilities: number // 设施设备
    valueForMoney: number // 性价比
    location: number // 位置交通
  }
  reviewContent: string // 评价内容
  images?: string[] // 评价图片
  hotelReply?: string // 酒店回复
  replyTime?: string // 回复时间
}

export interface UserReviewFilterParams {
  startDate?: string
  endDate?: string
  guestName?: string
  guestPhone?: string
  roomType?: string
  page?: number
  pageSize?: number
}

export interface UserReviewListResponse {
  reviews: UserReview[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
