/**
 * 酒店开通流程管理 - 类型定义
 */

// 开通状态
export enum OnboardingStatus {
  NOT_STARTED = 'not_started',   // 未开通
  CONFIGURING = 'configuring',   // 配置中
  COMPLETED = 'completed',       // 已上线
  ON_HOLD = 'on_hold',          // 暂停
}

// 开通任务
export interface HotelOnboardingTask {
  id: string
  hotelId: string
  hotelName: string
  signedDate: string              // 签约日期
  status: OnboardingStatus

  // 账号信息
  accountCreated: boolean         // 账号已创建
  accountCredentials?: {
    username: string
    password: string
    sentAt?: string               // 发送时间
  }

  // 配置进度
  configProgress: {
    basicInfo: boolean            // 门店基本信息
    images: boolean               // 门店图片
    facilities: boolean           // 门店设施
    policy: boolean               // 门店政策
    roomTypes: boolean            // 房型配置
    pricing: boolean              // 价格配置
    inventory: boolean            // 库存配置
  }

  completionRate: number          // 完成百分比 (0-100)
  onlineDate?: string             // 上线日期

  bdOwner: string                 // 负责BD
  notes: string                   // 备注

  createdAt: string
  updatedAt: string
}

// 开通统计
export interface OnboardingStatistics {
  total: number                   // 总数
  notStarted: number              // 未开通
  configuring: number             // 配置中
  completed: number               // 已上线
  onHold: number                  // 暂停
  avgOnboardingDays: number       // 平均开通天数
}

// 操作记录
export interface OnboardingLog {
  id: string
  taskId: string
  action: string                  // 操作类型
  description: string             // 描述
  operator: string                // 操作人
  createdAt: string
}

// 表单数据
export interface OnboardingTaskFormData {
  hotelName: string
  signedDate: string
  bdOwner: string
  notes?: string
}
