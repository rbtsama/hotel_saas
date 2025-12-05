import type { RefundRequest } from '../../types/refund.types'

/**
 * 平台后台退款管理Mock数据
 * 基于 HotelBackend/RefundManagement 的 mock 数据
 */
export const mockRefundManagementData: RefundRequest[] = [
  {
    id: '1',
    requestTime: '2025-10-16 14:04:55',
    orderNumber: '20251014100110',
    guestPhone: '19157973208',
    guestName: '张三',
    paidAmount: 9,
    refundAmount: 4.5,
    processStatus: 'platform-approved',
    createdAt: '2025-10-16 14:04:55',
    refundReason: '房间设施不符合预期，要求部分退款',
    checkInDate: '2025-10-15',
    checkOutDate: '2025-10-17',
    roomType: '豪华大床房',
    timeline: [
      { time: '2025-10-16 14:04:55', status: '客人提交退款申请', note: '申请退款4.5元' },
      { time: '2025-10-16 15:30:20', status: '商家审核中', operator: '张经理' },
      { time: '2025-10-16 18:45:10', status: '平台介入', operator: '平台客服001' },
      { time: '2025-10-17 10:20:00', status: '平台欠款已退款', operator: '系统', note: '平台垫付退款已完成' }
    ]
  },
  {
    id: '2',
    requestTime: '2025-10-16 13:35:05',
    orderNumber: '20251014100110',
    guestPhone: '19157973208',
    guestName: '张三',
    paidAmount: 9,
    refundAmount: 7.2,
    processStatus: 'merchant-refund',
    createdAt: '2025-10-16 13:35:05',
    refundReason: '临时有事无法入住',
    checkInDate: '2025-10-15',
    checkOutDate: '2025-10-17',
    roomType: '豪华大床房',
    timeline: [
      { time: '2025-10-16 13:35:05', status: '客人提交退款申请', note: '申请退款7.2元' },
      { time: '2025-10-16 14:00:00', status: '客人撤诉', note: '客人主动撤销申请' }
    ]
  },
  {
    id: '3',
    requestTime: '2025-10-13 12:02:50',
    orderNumber: '20251011100141',
    guestPhone: '19157973208',
    guestName: '张三',
    paidAmount: 646,
    refundAmount: 646,
    processStatus: 'platform-refund',
    createdAt: '2025-10-13 12:02:50',
    refundReason: '酒店临时通知无房，要求全额退款',
    checkInDate: '2025-10-14',
    checkOutDate: '2025-10-16',
    roomType: '行政套房',
    timeline: [
      { time: '2025-10-13 12:02:50', status: '客人提交退款申请', note: '要求全额退款646元' },
      { time: '2025-10-13 13:15:30', status: '商家同意退款', operator: '李经理' },
      { time: '2025-10-13 14:00:00', status: '平台支持退款', operator: '平台客服002' },
      { time: '2025-10-13 16:30:00', status: '已退款', operator: '系统', note: '退款已原路返回' }
    ]
  },
  {
    id: '4',
    requestTime: '2025-09-25 15:23:53',
    orderNumber: '20250923100191',
    guestPhone: '18601273203',
    guestName: '李四',
    paidAmount: 780,
    refundAmount: 780,
    processStatus: 'platform-refund',
    createdAt: '2025-09-25 15:23:53',
    refundReason: '酒店卫生条件差，要求全额退款',
    checkInDate: '2025-09-24',
    checkOutDate: '2025-09-26',
    roomType: '豪华双床房',
    timeline: [
      { time: '2025-09-25 15:23:53', status: '客人提交退款申请', note: '要求全额退款780元' },
      { time: '2025-09-25 16:00:00', status: '商家拒绝', operator: '王经理', note: '不符合退款条件' },
      { time: '2025-09-25 17:30:00', status: '平台介入调查', operator: '平台客服003' },
      { time: '2025-09-26 10:00:00', status: '平台支持退款', operator: '平台客服003', note: '经核实，支持客人退款' },
      { time: '2025-09-26 14:00:00', status: '已退款', operator: '系统', note: '退款已原路返回' }
    ]
  },
  {
    id: '5',
    requestTime: '2025-09-25 15:23:24',
    orderNumber: '20250923100191',
    guestPhone: '18601273203',
    guestName: '李四',
    paidAmount: 780,
    refundAmount: 78,
    processStatus: 'merchant-refund',
    createdAt: '2025-09-25 15:23:24',
    refundReason: '房间空调噪音大，申请部分退款',
    checkInDate: '2025-09-24',
    checkOutDate: '2025-09-26',
    roomType: '豪华双床房',
    timeline: [
      { time: '2025-09-25 15:23:24', status: '客人提交退款申请', note: '申请部分退款78元' },
      { time: '2025-09-25 15:30:00', status: '客人撤诉', note: '与商家协商后撤销申请' }
    ]
  },
  {
    id: '6',
    requestTime: '2025-09-25 15:17:51',
    orderNumber: '20250923100191',
    guestPhone: '18601273203',
    guestName: '李四',
    paidAmount: 780,
    refundAmount: 78,
    processStatus: 'merchant-refund',
    createdAt: '2025-09-25 15:17:51',
    refundReason: '早餐质量不佳',
    checkInDate: '2025-09-24',
    checkOutDate: '2025-09-26',
    roomType: '豪华双床房',
    timeline: [
      { time: '2025-09-25 15:17:51', status: '客人提交退款申请', note: '申请部分退款78元' },
      { time: '2025-09-25 15:20:00', status: '客人撤诉', note: '客人主动撤销申请' }
    ]
  }
]
