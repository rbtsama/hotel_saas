import type { UserReview, UserReviewDetail, UserReviewFilterParams, UserReviewListResponse } from '../types/userReviews.types'
import { mockUserReviewsData, mockUserReviewDetailsData } from './mocks'

class UserReviewsService {
  private mockData = [...mockUserReviewsData]
  private mockDetailsData = [...mockUserReviewDetailsData]

  async getReviewList(params?: UserReviewFilterParams): Promise<UserReviewListResponse> {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...this.mockData]

    // 日期范围筛选
    if (params?.startDate) {
      filtered = filtered.filter(review =>
        review.reviewTime >= params.startDate!
      )
    }
    if (params?.endDate) {
      filtered = filtered.filter(review =>
        review.reviewTime <= params.endDate!
      )
    }

    // 入住人筛选
    if (params?.guestName) {
      filtered = filtered.filter(review =>
        review.guestName.toLowerCase().includes(params.guestName!.toLowerCase())
      )
    }

    // 电话筛选
    if (params?.guestPhone) {
      filtered = filtered.filter(review =>
        review.guestPhone.includes(params.guestPhone!)
      )
    }

    // 房型筛选
    if (params?.roomType) {
      filtered = filtered.filter(review =>
        review.roomType.toLowerCase().includes(params.roomType!.toLowerCase())
      )
    }

    // 分页
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const reviews = filtered.slice(startIndex, endIndex)

    return {
      reviews,
      total,
      page,
      pageSize,
      totalPages
    }
  }

  async getReviewById(id: string): Promise<UserReview | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(review => review.id === id) || null
  }

  async getReviewDetailById(id: string): Promise<UserReviewDetail | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockDetailsData.find(review => review.id === id) || null
  }

  async deleteReview(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.mockData.findIndex(review => review.id === id)
    if (index === -1) return false

    this.mockData.splice(index, 1)
    return true
  }
}

export default new UserReviewsService()
