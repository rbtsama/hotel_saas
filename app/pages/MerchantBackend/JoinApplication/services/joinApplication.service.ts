/**
 * 商户端 - 入驻申请服务
 */

import type { JoinApplication, JoinApplicationForm } from '../types/joinApplication.types'
import { mockJoinApplication } from './mocks'

class JoinApplicationService {
  private applications: JoinApplication[] = [mockJoinApplication]

  /**
   * 提交入驻申请
   */
  async submitApplication(data: JoinApplicationForm): Promise<JoinApplication> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newApplication: JoinApplication = {
      ...data,
      id: `join-app-${this.applications.length + 1}`,
      status: 'pending',
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
      updatedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    }

    this.applications.push(newApplication)
    return newApplication
  }

  /**
   * 获取申请详情
   */
  async getApplication(id: string): Promise<JoinApplication | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.applications.find((app) => app.id === id) || null
  }
}

export default new JoinApplicationService()
