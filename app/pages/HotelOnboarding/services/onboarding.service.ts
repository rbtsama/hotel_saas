import type {
  HotelOnboardingTask,
  OnboardingStatistics,
  OnboardingTaskFormData,
} from '../types/onboarding.types'
import { OnboardingStatus } from '../types/onboarding.types'
import { mockOnboardingTasks, mockOnboardingStatistics } from './mocks'

/**
 * 酒店开通流程服务
 */
class OnboardingService {
  private tasks: HotelOnboardingTask[] = [...mockOnboardingTasks]

  /**
   * 获取开通任务列表
   */
  async getList(filters?: {
    status?: OnboardingStatus
    bdOwner?: string
    search?: string
  }): Promise<HotelOnboardingTask[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filtered = [...this.tasks]

    if (filters?.status) {
      filtered = filtered.filter((task) => task.status === filters.status)
    }

    if (filters?.bdOwner) {
      filtered = filtered.filter((task) => task.bdOwner === filters.bdOwner)
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter((task) =>
        task.hotelName.toLowerCase().includes(searchLower)
      )
    }

    return filtered.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  /**
   * 获取统计数据
   */
  async getStatistics(): Promise<OnboardingStatistics> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 重新计算统计数据
    const stats: OnboardingStatistics = {
      total: this.tasks.length,
      notStarted: this.tasks.filter(t => t.status === OnboardingStatus.NOT_STARTED).length,
      configuring: this.tasks.filter(t => t.status === OnboardingStatus.CONFIGURING).length,
      completed: this.tasks.filter(t => t.status === OnboardingStatus.COMPLETED).length,
      onHold: this.tasks.filter(t => t.status === OnboardingStatus.ON_HOLD).length,
      avgOnboardingDays: mockOnboardingStatistics.avgOnboardingDays,
    }

    return stats
  }

  /**
   * 根据ID获取任务
   */
  async getById(id: string): Promise<HotelOnboardingTask | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.tasks.find((task) => task.id === id) || null
  }

  /**
   * 创建新的开通任务
   */
  async create(data: OnboardingTaskFormData): Promise<HotelOnboardingTask> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const now = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(',', '')

    const newTask: HotelOnboardingTask = {
      id: String(this.tasks.length + 1),
      hotelId: `hotel_${String(this.tasks.length + 1).padStart(3, '0')}`,
      hotelName: data.hotelName,
      signedDate: data.signedDate,
      status: OnboardingStatus.NOT_STARTED,
      accountCreated: false,
      configProgress: {
        basicInfo: false,
        images: false,
        facilities: false,
        policy: false,
        roomTypes: false,
        pricing: false,
        inventory: false,
      },
      completionRate: 0,
      bdOwner: data.bdOwner,
      notes: data.notes || '',
      createdAt: now,
      updatedAt: now,
    }

    this.tasks.push(newTask)
    return newTask
  }

  /**
   * 生成账号
   */
  async generateAccount(taskId: string): Promise<HotelOnboardingTask> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) throw new Error('任务不存在')

    const now = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(',', '')

    // 生成用户名 (拼音简写)
    const username = `hotel_${task.hotelId}_${Math.random().toString(36).substring(2, 6)}`
    // 生成随机密码
    const password = `${task.hotelId}_${new Date().getFullYear()}`

    task.accountCreated = true
    task.accountCredentials = {
      username,
      password,
      sentAt: now,
    }
    task.updatedAt = now

    return task
  }

  /**
   * 更新配置进度
   */
  async updateProgress(
    taskId: string,
    progress: Partial<HotelOnboardingTask['configProgress']>
  ): Promise<HotelOnboardingTask> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) throw new Error('任务不存在')

    const now = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(',', '')

    task.configProgress = {
      ...task.configProgress,
      ...progress,
    }

    // 计算完成率
    const progressValues = Object.values(task.configProgress)
    const completedCount = progressValues.filter((v) => v).length
    task.completionRate = Math.round((completedCount / progressValues.length) * 100)

    // 更新状态
    if (task.completionRate === 100) {
      task.status = OnboardingStatus.COMPLETED
    } else if (task.completionRate > 0) {
      task.status = OnboardingStatus.CONFIGURING
    }

    task.updatedAt = now

    return task
  }

  /**
   * 标记为上线
   */
  async markAsOnline(taskId: string): Promise<HotelOnboardingTask> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) throw new Error('任务不存在')

    const now = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(',', '')

    task.status = OnboardingStatus.COMPLETED
    task.onlineDate = now
    task.completionRate = 100
    task.updatedAt = now

    // 确保所有配置项都完成
    Object.keys(task.configProgress).forEach((key) => {
      task.configProgress[key as keyof typeof task.configProgress] = true
    })

    return task
  }

  /**
   * 更新状态
   */
  async updateStatus(taskId: string, status: OnboardingStatus): Promise<HotelOnboardingTask> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) throw new Error('任务不存在')

    const now = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(',', '')

    task.status = status
    task.updatedAt = now

    return task
  }

  /**
   * 更新备注
   */
  async updateNotes(taskId: string, notes: string): Promise<HotelOnboardingTask> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) throw new Error('任务不存在')

    const now = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(',', '')

    task.notes = notes
    task.updatedAt = now

    return task
  }
}

export default new OnboardingService()
