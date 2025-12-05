import type { RoomTypeInventory, InventoryCalendarFilterParams } from '../types/inventoryCalendar.types'
import { mockInventoryCalendarData } from './mocks'

class InventoryCalendarService {
  private mockData = [...mockInventoryCalendarData]

  async getInventoryCalendar(params?: InventoryCalendarFilterParams): Promise<RoomTypeInventory[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    let filtered = [...this.mockData]

    if (params?.roomType) {
      filtered = filtered.filter(item =>
        item.roomTypeName.toLowerCase().includes(params.roomType!.toLowerCase())
      )
    }

    if (params?.startDate) {
      // 根据开始日期过滤（这里简化处理）
      // 实际应用中可能需要重新生成日期范围
    }

    return filtered
  }

  async updateInventory(
    roomTypeId: string,
    date: string,
    availableRooms: number
  ): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const roomType = this.mockData.find(rt => rt.id === roomTypeId)
    if (!roomType) return false

    const dailyInventory = roomType.dailyInventories.find(di => di.date === date)
    if (!dailyInventory) return false

    dailyInventory.availableRooms = availableRooms
    dailyInventory.bookedRooms = dailyInventory.totalRooms - availableRooms

    // 更新状态
    if (availableRooms === 0) {
      dailyInventory.status = 'sold-out'
    } else if (availableRooms <= dailyInventory.totalRooms * 0.3) {
      dailyInventory.status = 'limited'
    } else {
      dailyInventory.status = 'available'
    }

    return true
  }

  async batchUpdateInventory(
    roomTypeId: string,
    updates: Array<{ date: string; availableRooms: number }>
  ): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const roomType = this.mockData.find(rt => rt.id === roomTypeId)
    if (!roomType) return false

    updates.forEach(update => {
      const dailyInventory = roomType.dailyInventories.find(di => di.date === update.date)
      if (dailyInventory) {
        dailyInventory.availableRooms = update.availableRooms
        dailyInventory.bookedRooms = dailyInventory.totalRooms - update.availableRooms

        // 更新状态
        if (update.availableRooms === 0) {
          dailyInventory.status = 'sold-out'
        } else if (update.availableRooms <= dailyInventory.totalRooms * 0.3) {
          dailyInventory.status = 'limited'
        } else {
          dailyInventory.status = 'available'
        }
      }
    })

    return true
  }
}

export default new InventoryCalendarService()
