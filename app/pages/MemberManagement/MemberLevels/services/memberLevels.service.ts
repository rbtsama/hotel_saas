import type { MemberLevel, MemberLevelFilterParams } from '../types/memberLevels.types'
import { mockMemberLevelsData } from './mocks'

class MemberLevelsService {
  private mockData = [...mockMemberLevelsData]

  async getLevelList(params?: MemberLevelFilterParams): Promise<MemberLevel[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    let filtered = [...this.mockData]

    if (params?.levelName) {
      filtered = filtered.filter(level =>
        level.levelName.toLowerCase().includes(params.levelName!.toLowerCase())
      )
    }

    if (params?.status) {
      filtered = filtered.filter(level => level.status === params.status)
    }

    return filtered
  }

  async getLevelById(id: string): Promise<MemberLevel | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(level => level.id === id) || null
  }

  async createLevel(data: Omit<MemberLevel, 'id' | 'createdAt'>): Promise<MemberLevel> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const newLevel: MemberLevel = {
      ...data,
      id: String(this.mockData.length + 1),
      createdAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/(\d+)\/(\d+)\/(\d+),/, '$1-$2-$3')
    }

    this.mockData.push(newLevel)
    return newLevel
  }

  async updateLevel(id: string, data: Partial<MemberLevel>): Promise<MemberLevel | null> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.mockData.findIndex(level => level.id === id)
    if (index === -1) return null

    this.mockData[index] = {
      ...this.mockData[index],
      ...data
    }

    return this.mockData[index]
  }

  async deleteLevel(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.mockData.findIndex(level => level.id === id)
    if (index === -1) return false

    this.mockData.splice(index, 1)
    return true
  }
}

export default new MemberLevelsService()
