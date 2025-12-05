import type { RoomType, RoomTypeFilterParams } from '../types/roomType.types'
import { mockRoomTypeData } from './mocks'

class RoomTypeService {
  private mockData = [...mockRoomTypeData]

  async getList(params?: RoomTypeFilterParams): Promise<RoomType[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    let filtered = [...this.mockData]

    if (params?.category && params.category !== '请选择类型') {
      filtered = filtered.filter(item => item.category === params.category)
    }

    if (params?.name) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(params.name.toLowerCase())
      )
    }

    return filtered
  }

  async getById(id: string): Promise<RoomType | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(item => item.id === id) || null
  }

  async create(data: Partial<RoomType>): Promise<RoomType> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newRoomType: RoomType = {
      id: String(this.mockData.length + 1),
      sortOrder: this.mockData.length + 1,
      ...data as RoomType
    }
    this.mockData.push(newRoomType)
    return newRoomType
  }

  async update(id: string, data: Partial<RoomType>): Promise<RoomType | null> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const index = this.mockData.findIndex(item => item.id === id)
    if (index === -1) return null

    this.mockData[index] = { ...this.mockData[index], ...data }
    return this.mockData[index]
  }

  async delete(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = this.mockData.findIndex(item => item.id === id)
    if (index === -1) return false

    this.mockData.splice(index, 1)
    return true
  }

  async toggleOnline(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const roomType = this.mockData.find(item => item.id === id)
    if (!roomType) return false

    roomType.isOnline = !roomType.isOnline
    return true
  }
}

export default new RoomTypeService()
