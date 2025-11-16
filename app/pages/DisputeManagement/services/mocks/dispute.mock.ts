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
  { id: 'arb-001', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '张伟', phone: '138****1001', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-002', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '李娜', phone: '138****1002', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-003', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '王强', phone: '138****1003', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-004', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '赵敏', phone: '138****1004', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-005', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '刘洋', phone: '138****1005', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-006', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '陈静', phone: '138****1006', isActive: true, createdAt: '01/10/25 10:00:00' },
  { id: 'arb-007', hotelId: 'hotel-001', hotelName: '上海希尔顿酒店', name: '周杰', phone: '138****1007', isActive: true, createdAt: '01/10/25 10:00:00' },

  // 万豪酒店的7名仲裁委员
  { id: 'arb-008', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '吴磊', phone: '139****2001', isActive: true, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-009', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '郑爽', phone: '139****2002', isActive: true, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-010', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '孙悦', phone: '139****2003', isActive: true, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-011', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '冯巩', phone: '139****2004', isActive: false, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-012', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '马云', phone: '139****2005', isActive: true, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-013', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '许晴', phone: '139****2006', isActive: true, createdAt: '01/12/25 14:20:00' },
  { id: 'arb-014', hotelId: 'hotel-002', hotelName: '北京万豪酒店', name: '梁朝伟', phone: '139****2007', isActive: true, createdAt: '01/12/25 14:20:00' },
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
    userPhone: '186****8888',
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
    userPhone: '138****6666',
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
    userPhone: '159****7777',
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
    userPhone: '177****5555',
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
    userPhone: '151****4444',
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
    userPhone: '188****3333',
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
      { arbitratorId: 'arb-001', arbitratorName: '张伟', arbitratorPhone: '138****1001', decision: ArbitrationDecision.SUPPORT, votedAt: '01/13/25 16:00:00', comment: '证据充分,支持退款' },
      { arbitratorId: 'arb-002', arbitratorName: '李娜', arbitratorPhone: '138****1002', decision: ArbitrationDecision.SUPPORT, votedAt: '01/13/25 16:15:00', comment: '卫生问题确实存在' },
      { arbitratorId: 'arb-003', arbitratorName: '王强', arbitratorPhone: '138****1003', decision: ArbitrationDecision.OPPOSE, votedAt: '01/13/25 16:30:00', comment: '图片可能被篡改' },
      { arbitratorId: 'arb-004', arbitratorName: '赵敏', arbitratorPhone: '138****1004', decision: ArbitrationDecision.SUPPORT, votedAt: '01/13/25 17:00:00' },
      { arbitratorId: 'arb-005', arbitratorName: '刘洋', arbitratorPhone: '138****1005', decision: ArbitrationDecision.SUPPORT, votedAt: '01/13/25 17:20:00' },
      { arbitratorId: 'arb-006', arbitratorName: '陈静', arbitratorPhone: '138****1006', decision: ArbitrationDecision.OPPOSE, votedAt: '01/13/25 17:45:00' },
      { arbitratorId: 'arb-007', arbitratorName: '周杰', arbitratorPhone: '138****1007', decision: ArbitrationDecision.PENDING },
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
      { arbitratorId: 'arb-015', arbitratorName: '委员A', arbitratorPhone: '150****3001', decision: ArbitrationDecision.OPPOSE, votedAt: '01/11/25 16:30:00' },
      { arbitratorId: 'arb-016', arbitratorName: '委员B', arbitratorPhone: '150****3002', decision: ArbitrationDecision.OPPOSE, votedAt: '01/11/25 16:45:00' },
      { arbitratorId: 'arb-017', arbitratorName: '委员C', arbitratorPhone: '150****3003', decision: ArbitrationDecision.SUPPORT, votedAt: '01/11/25 17:00:00' },
      { arbitratorId: 'arb-018', arbitratorName: '委员D', arbitratorPhone: '150****3004', decision: ArbitrationDecision.OPPOSE, votedAt: '01/11/25 17:15:00' },
      { arbitratorId: 'arb-019', arbitratorName: '委员E', arbitratorPhone: '150****3005', decision: ArbitrationDecision.SUPPORT, votedAt: '01/11/25 17:30:00' },
      { arbitratorId: 'arb-020', arbitratorName: '委员F', arbitratorPhone: '150****3006', decision: ArbitrationDecision.SUPPORT, votedAt: '01/11/25 17:45:00' },
      { arbitratorId: 'arb-021', arbitratorName: '委员G', arbitratorPhone: '150****3007', decision: ArbitrationDecision.OPPOSE, votedAt: '01/11/25 18:00:00' },
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
