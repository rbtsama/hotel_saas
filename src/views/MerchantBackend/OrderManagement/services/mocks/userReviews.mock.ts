import type { UserReview, UserReviewDetail } from '../../types/userReviews.types'

// 模拟用户点赞数据
export const mockUserReviewsData: UserReview[] = [
  {
    id: '1',
    reviewTime: '2025-09-30 16:17:08',
    guestName: 'xiaoai（测试）',
    guestPhone: '15715871766',
    roomType: '青梅小院【2号院】',
    createdAt: '2025-09-30 16:17:08'
  },
  {
    id: '2',
    reviewTime: '2025-09-25 14:30:22',
    guestName: '张三',
    guestPhone: '13812345678',
    roomType: '竹林大床房【1号院】',
    createdAt: '2025-09-25 14:30:22'
  },
  {
    id: '3',
    reviewTime: '2025-09-20 10:15:33',
    guestName: '李四',
    guestPhone: '13698765432',
    roomType: '景观双床房【1号院】',
    createdAt: '2025-09-20 10:15:33'
  },
  {
    id: '4',
    reviewTime: '2025-09-18 18:45:12',
    guestName: '王五',
    guestPhone: '15987654321',
    roomType: '顶层景观大套房【1号院】',
    createdAt: '2025-09-18 18:45:12'
  },
  {
    id: '5',
    reviewTime: '2025-09-15 09:20:55',
    guestName: '赵六',
    guestPhone: '13511112222',
    roomType: '江景大床房A【2号院】',
    createdAt: '2025-09-15 09:20:55'
  }
]

// 模拟详细评价数据
export const mockUserReviewDetailsData: UserReviewDetail[] = [
  {
    id: '1',
    reviewTime: '2025-09-30 16:17:08',
    guestName: 'xiaoai（测试）',
    guestPhone: '15715871766',
    roomType: '青梅小院【2号院】',
    createdAt: '2025-09-30 16:17:08',
    orderNumber: 'ORD202509301001',
    checkInDate: '2025-09-28',
    checkOutDate: '2025-09-30',
    nightCount: 2,
    totalAmount: 1280,
    ratings: {
      cleanliness: 5,
      service: 5,
      facilities: 4,
      valueForMoney: 5,
      location: 5
    },
    reviewContent: '酒店位置很好，就在景区旁边，非常方便。房间干净整洁，设施齐全，服务态度也很好。早餐品种丰富，味道不错。总体来说性价比很高，下次还会再来！',
    images: [],
    hotelReply: '感谢您的认可和支持！我们会继续努力为客人提供更好的服务，期待您的再次光临！',
    replyTime: '2025-09-30 18:30:00'
  },
  {
    id: '2',
    reviewTime: '2025-09-25 14:30:22',
    guestName: '张三',
    guestPhone: '13812345678',
    roomType: '竹林大床房【1号院】',
    createdAt: '2025-09-25 14:30:22',
    orderNumber: 'ORD202509251002',
    checkInDate: '2025-09-23',
    checkOutDate: '2025-09-25',
    nightCount: 2,
    totalAmount: 980,
    ratings: {
      cleanliness: 5,
      service: 5,
      facilities: 5,
      valueForMoney: 4,
      location: 4
    },
    reviewContent: '房间很有特色，装修风格独特，竹林环绕，环境清幽。服务人员热情周到，入住体验非常好。唯一不足是距离市区稍远，但正因如此才有如此静谧的环境。',
    images: []
  },
  {
    id: '3',
    reviewTime: '2025-09-20 10:15:33',
    guestName: '李四',
    guestPhone: '13698765432',
    roomType: '景观双床房【1号院】',
    createdAt: '2025-09-20 10:15:33',
    orderNumber: 'ORD202509201003',
    checkInDate: '2025-09-18',
    checkOutDate: '2025-09-20',
    nightCount: 2,
    totalAmount: 1180,
    ratings: {
      cleanliness: 4,
      service: 5,
      facilities: 4,
      valueForMoney: 4,
      location: 5
    },
    reviewContent: '带孩子出游选择了双床房，房间宽敞明亮，景观非常好。孩子很喜欢这里的环境。前台服务很贴心，还为孩子准备了小礼物。卫生方面有些小瑕疵，但总体满意。',
    images: [],
    hotelReply: '感谢您的反馈！我们会加强卫生管理，为客人提供更完美的入住体验。期待您的再次光临！',
    replyTime: '2025-09-20 15:00:00'
  },
  {
    id: '4',
    reviewTime: '2025-09-18 18:45:12',
    guestName: '王五',
    guestPhone: '15987654321',
    roomType: '顶层景观大套房【1号院】',
    createdAt: '2025-09-18 18:45:12',
    orderNumber: 'ORD202509181004',
    checkInDate: '2025-09-16',
    checkOutDate: '2025-09-18',
    nightCount: 2,
    totalAmount: 2380,
    ratings: {
      cleanliness: 5,
      service: 5,
      facilities: 5,
      valueForMoney: 5,
      location: 5
    },
    reviewContent: '顶层套房真的太棒了！180度观景阳台，可以看到整个景区的美景。房间装修豪华，配套设施一应俱全。酒店管家服务非常专业，让人感觉宾至如归。强烈推荐！',
    images: []
  },
  {
    id: '5',
    reviewTime: '2025-09-15 09:20:55',
    guestName: '赵六',
    guestPhone: '13511112222',
    roomType: '江景大床房A【2号院】',
    createdAt: '2025-09-15 09:20:55',
    orderNumber: 'ORD202509151005',
    checkInDate: '2025-09-13',
    checkOutDate: '2025-09-15',
    nightCount: 2,
    totalAmount: 1480,
    ratings: {
      cleanliness: 5,
      service: 4,
      facilities: 4,
      valueForMoney: 4,
      location: 5
    },
    reviewContent: '江景房视野开阔，可以看到江边美景。房间布置温馨，床品舒适。酒店早餐品种还可以，但希望能更丰富一些。整体入住体验不错，值得推荐。',
    images: []
  }
]
