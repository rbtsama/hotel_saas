/**
 * 争议处理相关类型定义
 */

// 退款申请状态
export enum RefundStatus {
  PENDING_MERCHANT = 'pending_merchant',       // 待商家处理
  NEGOTIATING = 'negotiating',                 // 协商中
  MERCHANT_REJECTED = 'merchant_rejected',     // 商家拒绝(自动进入仲裁)
  ARBITRATING = 'arbitrating',                 // 仲裁中
  COMPLETED = 'completed',                     // 已完成退款
  REJECTED = 'rejected',                       // 已驳回
  USER_WITHDRAWN = 'user_withdrawn',           // 用户已撤诉
}

// 仲裁决策
export enum ArbitrationDecision {
  SUPPORT = 'support',       // 支持退款
  OPPOSE = 'oppose',         // 反对退款
  PENDING = 'pending',       // 待投票
}

// 退款申请
export interface RefundRequest {
  id: string
  orderId: string                    // 订单ID
  orderNumber: string                // 订单号
  hotelName: string                  // 酒店名称
  userName: string                   // 用户名称
  userPhone: string                  // 用户手机号
  actualPaid: number                 // 用户实付金额
  refundRatio: number                // 退款比例(0-100)
  refundAmount: number               // 退款金额
  reason?: string                    // 退款理由(选填)
  evidence?: string[]                // 证据图片URLs(选填)
  status: RefundStatus               // 申请状态
  merchantResponse?: string          // 商家回复
  merchantResponseTime?: string      // 商家回复时间
  arbitrationId?: string             // 仲裁案件ID(如果进入仲裁)
  finalDecision?: 'approved' | 'rejected'  // 最终决策
  createdAt: string                  // 创建时间
  updatedAt: string                  // 更新时间
}

// 仲裁委员
export interface Arbitrator {
  id: string
  hotelId: string                    // 所属酒店ID
  hotelName: string                  // 酒店名称
  name: string                       // 姓名
  phone: string                      // 手机号
  isActive: boolean                  // 是否激活
  createdAt: string
}

// 仲裁投票记录
export interface ArbitrationVote {
  arbitratorId: string               // 仲裁委员ID
  arbitratorName: string             // 仲裁委员姓名
  arbitratorPhone: string            // 仲裁委员手机号
  decision: ArbitrationDecision      // 投票决策
  votedAt?: string                   // 投票时间
  comment?: string                   // 投票意见(选填)
}

// 仲裁案件
export interface ArbitrationCase {
  id: string
  refundRequestId: string            // 关联的退款申请ID
  refundRequest: RefundRequest       // 退款申请详情
  hotelId: string                    // 酒店ID
  hotelName: string                  // 酒店名称
  votes: ArbitrationVote[]           // 投票记录(7票)
  supportCount: number               // 支持票数
  opposeCount: number                // 反对票数
  pendingCount: number               // 待投票数
  finalResult?: 'approved' | 'rejected'  // 最终结果
  status: 'voting' | 'completed'     // 仲裁状态
  createdAt: string                  // 创建时间
  completedAt?: string               // 完成时间
}

// 退款申请表单数据
export interface RefundRequestFormData {
  orderId: string
  refundRatio: number
  reason?: string
  evidence?: string[]
}

// 商家回复数据
export interface MerchantResponseData {
  action: 'approve' | 'reject' | 'negotiate'
  response: string
}
