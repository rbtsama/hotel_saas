import type { RoomTypePricing, PriceCalendarFilterParams } from '../types/roomPriceCalendar.types'
import { mockRoomPriceCalendarData } from './mocks'

class RoomPriceCalendarService {
  private mockData = [...mockRoomPriceCalendarData]

  async getPriceCalendar(params?: PriceCalendarFilterParams): Promise<RoomTypePricing[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    let filtered = [...this.mockData]

    if (params?.roomType) {
      filtered = filtered.filter(item =>
        item.roomTypeName.toLowerCase().includes(params.roomType!.toLowerCase())
      )
    }

    if (params?.startDate) {
      // 根据开始日期过滤（这里简化处理，实际可能需要重新生成日期范围）
      // 暂时返回所有数据
    }

    return filtered
  }

  async updatePrice(
    roomTypeId: string,
    date: string,
    newPrice: number
  ): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const roomType = this.mockData.find(rt => rt.id === roomTypeId)
    if (!roomType) return false

    const dailyPrice = roomType.dailyPrices.find(dp => dp.date === date)
    if (!dailyPrice) return false

    dailyPrice.price = newPrice
    return true
  }

  async batchUpdatePrices(
    roomTypeId: string,
    updates: Array<{ date: string; price: number }>
  ): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const roomType = this.mockData.find(rt => rt.id === roomTypeId)
    if (!roomType) return false

    updates.forEach(update => {
      const dailyPrice = roomType.dailyPrices.find(dp => dp.date === update.date)
      if (dailyPrice) {
        dailyPrice.price = update.price
      }
    })

    return true
  }
}

export default new RoomPriceCalendarService()
