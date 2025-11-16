/**
 * 系统参数配置相关类型定义
 */

// 协议类型
export enum AgreementType {
  USER_AGREEMENT = 'user_agreement',           // 用户协议
  PRIVACY_POLICY = 'privacy_policy',           // 隐私政策
  SERVICE_TERMS = 'service_terms',             // 服务条款
  REFUND_POLICY = 'refund_policy',             // 退款政策
  MERCHANT_AGREEMENT = 'merchant_agreement',   // 商家入驻协议
}

// 协议配置
export interface Agreement {
  id: string
  type: AgreementType
  title: string                    // 协议标题
  content: string                  // 协议内容(Markdown格式)
  version: string                  // 版本号
  isActive: boolean                // 是否启用
  createdAt: string
  updatedAt: string
  updatedBy: string                // 更新人
}

// 协议历史版本
export interface AgreementHistory {
  id: string
  agreementId: string
  version: string
  content: string
  createdAt: string
  createdBy: string
}

// 标签类型
export enum TagType {
  RECOMMENDATION = 'recommendation',   // 推荐标签(亲子乐享、奇妙有趣、融于自然)
  HOTEL = 'hotel',                     // 酒店标签
  ROOM_FACILITY = 'room_facility',     // 房间设施标签
}

// 标签配置
export interface Tag {
  id: string
  type: TagType
  name: string                     // 标签名称
  color: string                    // 标签颜色(hex)
  icon?: string                    // 图标(可选)
  order: number                    // 排序顺序
  isEnabled: boolean               // 是否启用
  usageCount: number               // 使用次数(统计)
  createdAt: string
  updatedAt: string
}

// 标签表单数据
export interface TagFormData {
  name: string
  color: string
  icon?: string
  isEnabled: boolean
}

// 协议更新数据
export interface AgreementUpdateData {
  title: string
  content: string
  version: string
}
