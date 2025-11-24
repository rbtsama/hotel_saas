/**
 * 争议处理Mock数据
 */

import type {
  RefundRequest,
  Arbitrator,
  ArbitrationCase,
  ArbitrationVote,
} from '../../types/dispute.types'
import { RefundStatus, ArbitrationDecision } from '../../types/dispute.types'

// 仲裁委员Mock数据
export const mockArbitrators: Arbitrator[] = [
  // 希尔顿酒店的7名仲裁委员
  { id: 'arb-001', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '张伟', phone: '13812341001', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-002', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '李娜', phone: '13812341002', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-003', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '王强', phone: '13812341003', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-004', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '赵敏', phone: '13812341004', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-005', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '刘洋', phone: '13812341005', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-006', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '陈静', phone: '13812341006', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-007', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '周杰', phone: '13812341007', isActive: true, createdAt: '01/10/25 10:00:00' },

  // 万豪酒店的7名仲裁委员
  { id: 'arb-008', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '吴磊', phone: '13923452001', isActive: true, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-009', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '郑爽', phone: '13923452002', isActive: true, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-010', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '孙悦', phone: '13923452003', isActive: true, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-011', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '冯巩', phone: '13923452004', isActive: false, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-012', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '马云', phone: '13923452005', isActive: true, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-013', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '许晴', phone: '13923452006', isActive: true, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-014', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '梁朝伟', phone: '13923452007', isActive: true, createdAt: '01/12/25 14:20:00' },
]

// 退款申请Mock数据
export const mockRefundRequests: RefundRequest[] = [
  // 案例1: 待商家处理
  {
    id: 'refund-001',
    orderId: 'order-001',
    orderNumber: 'ORD20250115001',
    hotelName: '上海希尔顿酒店',
    userName: '张三',
    userPhone: '18689018888',
    actualPaid: 1200,
    refundRatio: 50,
    refundAmount: 600,
    reason: '房间设施陈旧,与宣传图片严重不符,空调噪音过大影响休息',
    evidence: [
      'https://picsum.photos/400/300?random=10',
      'https://picsum.photos/400/300?random=11',
    ],
    status: RefundStatus.PENDING_MERCHANT,
    createdAt: '01/15/25 14:30:00',
    updatedAt: '01/15/25 14:30:00',
  },

  // 案例2: 协商中
  {
    id: 'refund-002',
    orderId: 'order-002',
    orderNumber: 'ORD20250114002',
    hotelName: '北京万豪酒店',
    userName: '李四',
    userPhone: '13812346666',
    actualPaid: 2800,
    refundRatio: 30,
    refundAmount: 840,
    reason: '前台服务态度恶劣,入住等待时间过长',
    status: RefundStatus.NEGOTIATING,
    merchantResponse: '我们对服务问题深表歉意,愿意退款20%作为补偿',
    merchantResponseTime: '01/14/25 16:20:00',
    createdAt: '01/14/25 10:15:00',
    updatedAt: '01/14/25 16:20:00',
  },

  // 案例3: 仲裁中(商家拒绝)
  {
    id: 'refund-003',
    orderId: 'order-003',
    orderNumber: 'ORD20250113003',
    hotelName: '上海希尔顿酒店',
    userName: '王五',
    userPhone: '15934567777',
    actualPaid: 1580,
    refundRatio: 80,
    refundAmount: 1264,
    reason: '房间卫生状况极差,床单有污渍,浴室有异味',
    evidence: [
      'https://picsum.photos/400/300?random=12',
      'https://picsum.photos/400/300?random=13',
      'https://picsum.photos/400/300?random=14',
    ],
    status: RefundStatus.ARBITRATING,
    merchantResponse: '经核查,房间卫生符合标准,用户恶意投诉,拒绝退款',
    merchantResponseTime: '01/13/25 15:40:00',
    arbitrationId: 'arb-case-001',
    createdAt: '01/13/25 09:20:00',
    updatedAt: '01/13/25 15:45:00',
  },

  // 案例4: 已完成退款
  {
    id: 'refund-004',
    orderId: 'order-004',
    orderNumber: 'ORD20250112004',
    hotelName: '广州香格里拉酒店',
    userName: '赵六',
    userPhone: '17767805555',
    actualPaid: 980,
    refundRatio: 100,
    refundAmount: 980,
    reason: '因个人紧急事务无法入住',
    status: RefundStatus.COMPLETED,
    merchantResponse: '同意全额退款',
    merchantResponseTime: '01/12/25 11:30:00',
    finalDecision: 'approved',
    createdAt: '01/12/25 08:45:00',
    updatedAt: '01/12/25 14:20:00',
  },

  // 案例5: 已驳回
  {
    id: 'refund-005',
    orderId: 'order-005',
    orderNumber: 'ORD20250111005',
    hotelName: '深圳洲际酒店',
    userName: '孙七',
    userPhone: '15112344444',
    actualPaid: 1680,
    refundRatio: 50,
    refundAmount: 840,
    reason: '房间景观不好',
    status: RefundStatus.REJECTED,
    merchantResponse: '房间景观与订单描述一致,不符合退款条件',
    merchantResponseTime: '01/11/25 16:00:00',
    arbitrationId: 'arb-case-002',
    finalDecision: 'rejected',
    createdAt: '01/11/25 13:20:00',
    updatedAt: '01/11/25 18:30:00',
  },

  // 案例6: 用户已撤诉
  {
    id: 'refund-006',
    orderId: 'order-006',
    orderNumber: 'ORD20250110006',
    hotelName: '成都瑞吉酒店',
    userName: '周八',
    userPhone: '18889013333',
    actualPaid: 2200,
    refundRatio: 40,
    refundAmount: 880,
    reason: '早餐品质不符合预期',
    status: RefundStatus.USER_WITHDRAWN,
    merchantResponse: '愿意提供下次入住优惠券作为补偿',
    merchantResponseTime: '01/10/25 10:30:00',
    createdAt: '01/10/25 09:00:00',
    updatedAt: '01/10/25 15:20:00',
  },
]

// 仲裁案件Mock数据
export const mockArbitrationCases: ArbitrationCase[] = [
  // 案例1: 投票进行中(4支持 2反对 1待投)
  {
    id: 'arb-case-001',
    refundRequestId: 'refund-003',
    refundRequest: mockRefundRequests[2],
    hotelId: 'hotel-001',
    hotelName: '上海希尔顿酒店',
    votes: [
      { arbitratorId: 'arb-001', arbitratorName: '张伟', arbitratorPhone: '13812341001', decision: ArbitrationDecision.SUPPORT, votedAt: '01/13/25 16:00:00', comment: '证据充分,支持退款' },
      { arbitratorId: 'arb-002', arbitratorName: '李娜', arbitratorPhone: '13812341002', decision: ArbitrationDecision.SUPPORT, votedAt: '01/13/25 16:15:00', comment: '卫生问题确实存在' },
      { arbitratorId: 'arb-003', arbitratorName: '王强', arbitratorPhone: '13812341003', decision: ArbitrationDecision.OPPOSE, votedAt: '01/13/25 16:30:00', comment: '图片可能被篡改' },
      { arbitratorId: 'arb-004', arbitratorName: '赵敏', arbitratorPhone: '13812341004', decision: ArbitrationDecision.SUPPORT, votedAt: '01/13/25 17:00:00' },
      { arbitratorId: 'arb-005', arbitratorName: '刘洋', arbitratorPhone: '13812341005', decision: ArbitrationDecision.SUPPORT, votedAt: '01/13/25 17:20:00' },
      { arbitratorId: 'arb-006', arbitratorName: '陈静', arbitratorPhone: '13812341006', decision: ArbitrationDecision.OPPOSE, votedAt: '01/13/25 17:45:00' },
      { arbitratorId: 'arb-007', arbitratorName: '周杰', arbitratorPhone: '13812341007', decision: ArbitrationDecision.PENDING },
    ],
    supportCount: 4,
    opposeCount: 2,
    pendingCount: 1,
    status: 'voting',
    createdAt: '01/13/25 15:45:00',
  },

  // 案例2: 已完成(驳回 - 3支持 4反对)
  {
    id: 'arb-case-002',
    refundRequestId: 'refund-005',
    refundRequest: mockRefundRequests[4],
    hotelId: 'hotel-003',
    hotelName: '深圳洲际酒店',
    votes: [
      { arbitratorId: 'arb-015', arbitratorName: '委员A', arbitratorPhone: '15023453001', decision: ArbitrationDecision.OPPOSE, votedAt: '01/11/25 16:30:00' },
      { arbitratorId: 'arb-016', arbitratorName: '委员B', arbitratorPhone: '15023453002', decision: ArbitrationDecision.OPPOSE, votedAt: '01/11/25 16:45:00' },
      { arbitratorId: 'arb-017', arbitratorName: '委员C', arbitratorPhone: '15023453003', decision: ArbitrationDecision.SUPPORT, votedAt: '01/11/25 17:00:00' },
      { arbitratorId: 'arb-018', arbitratorName: '委员D', arbitratorPhone: '15023453004', decision: ArbitrationDecision.OPPOSE, votedAt: '01/11/25 17:15:00' },
      { arbitratorId: 'arb-019', arbitratorName: '委员E', arbitratorPhone: '15023453005', decision: ArbitrationDecision.SUPPORT, votedAt: '01/11/25 17:30:00' },
      { arbitratorId: 'arb-020', arbitratorName: '委员F', arbitratorPhone: '15023453006', decision: ArbitrationDecision.SUPPORT, votedAt: '01/11/25 17:45:00' },
      { arbitratorId: 'arb-021', arbitratorName: '委员G', arbitratorPhone: '15023453007', decision: ArbitrationDecision.OPPOSE, votedAt: '01/11/25 18:00:00' },
    ],
    supportCount: 3,
    opposeCount: 4,
    pendingCount: 0,
    finalResult: 'rejected',
    status: 'completed',
    createdAt: '01/11/25 16:10:00',
    completedAt: '01/11/25 18:30:00',
  },
]
