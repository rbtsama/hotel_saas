import type { Member, MemberDetail, MemberFilterParams, MemberListResponse } from '../types/members.types'
import { mockMembersData, mockMemberDetailsData } from './mocks'

class MembersService {
  private mockData = [...mockMembersData]
  private mockDetailsData = [...mockMemberDetailsData]

  async getMemberList(params?: MemberFilterParams): Promise<MemberListResponse> {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...this.mockData]

    // 电话筛选
    if (params?.phone) {
      filtered = filtered.filter(member =>
        member.phone.includes(params.phone!)
      )
    }

    // 等级筛选
    if (params?.level) {
      filtered = filtered.filter(member => member.level === params.level)
    }

    // 是否积分会员筛选
    if (params?.isPointsMember !== undefined) {
      filtered = filtered.filter(member => member.isPointsMember === params.isPointsMember)
    }

    // 日期范围筛选
    if (params?.startDate) {
      filtered = filtered.filter(member =>
        member.registrationTime >= params.startDate!
      )
    }
    if (params?.endDate) {
      filtered = filtered.filter(member =>
        member.registrationTime <= params.endDate!
      )
    }

    // 分页
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const members = filtered.slice(startIndex, endIndex)

    return {
      members,
      total,
      page,
      pageSize,
      totalPages
    }
  }

  async getMemberById(id: string): Promise<Member | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(member => member.id === id) || null
  }

  async getMemberDetailById(id: string): Promise<MemberDetail | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockDetailsData.find(member => member.id === id) || null
  }

  async updateMember(id: string, updates: Partial<Member>): Promise<Member | null> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.mockData.findIndex(member => member.id === id)
    if (index === -1) return null

    this.mockData[index] = {
      ...this.mockData[index],
      ...updates
    }

    return this.mockData[index]
  }

  async deleteMember(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.mockData.findIndex(member => member.id === id)
    if (index === -1) return false

    this.mockData.splice(index, 1)
    return true
  }
}

export default new MembersService()
