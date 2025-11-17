import type { NonRoomProduct } from '../../types/nonRoomProducts.types'

// 模拟非房产品数据 - 包含完整的价格和库存信息
export const mockNonRoomProductsData: NonRoomProduct[] = [
  {
    id: '1',
    sequenceNumber: 5,
    productCategory: '酒店套餐',
    productName: '房+茶席套餐',
    productDescription: '包含精品茶室使用2小时，提供六大茶系品鉴，配茶点',
    price: 158,
    pricingType: 'fixed' as const,
    inventory: 5, // 每日限5组
    duration: 120, // 2小时
    needsAppointment: true,
    applyUseSettings: '茶室免费使用2小时',
    status: 'active' as const,
    pointsReward: 50, // 购买奖励50积分
    rewardType: 'purchase' as const,
    createdAt: '01/10/25 09:00:00'
  },
  {
    id: '2',
    sequenceNumber: 4,
    productCategory: '休闲娱乐',
    productName: '沿江骑行',
    productDescription: '提供山地车租借，含头盔护具，推荐3条精选骑行路线',
    price: 0, // 免费
    pricingType: 'per_time' as const,
    inventory: 10, // 10辆车
    duration: 240, // 4小时
    needsAppointment: false,
    applyUseSettings: '免费自行车租借',
    status: 'active' as const,
    pointsReward: 30, // 免费使用也奖励30积分（鼓励体验）
    rewardType: 'gift' as const,
    createdAt: '01/08/25 14:30:00'
  },
  {
    id: '3',
    sequenceNumber: 3,
    productCategory: '餐饮服务',
    productName: '特色早餐',
    productDescription: '中西式自助早餐，含本地特色小吃、现煮面条、新鲜水果',
    price: 68,
    pricingType: 'per_person' as const,
    inventory: 100, // 餐厅容纳100人
    duration: 180, // 3小时供应时间
    needsAppointment: false,
    applyUseSettings: '每日7:00-10:00供应',
    status: 'active' as const,
    pointsReward: 20, // 购买奖励20积分
    rewardType: 'purchase' as const,
    createdAt: '01/05/25 11:20:00'
  },
  {
    id: '4',
    sequenceNumber: 2,
    productCategory: '康养服务',
    productName: 'SPA精油按摩',
    productDescription: '泰式精油全身按摩，使用进口精油，专业按摩师服务',
    price: 388,
    pricingType: 'per_hour' as const,
    inventory: 3, // 3个技师
    duration: 90, // 90分钟
    needsAppointment: true,
    applyUseSettings: '需提前预约',
    status: 'active' as const,
    pointsReward: 100, // 高价服务奖励100积分
    rewardType: 'purchase' as const,
    createdAt: '01/03/25 16:45:00'
  },
  {
    id: '5',
    sequenceNumber: 1,
    productCategory: '交通服务',
    productName: '机场接送',
    productDescription: '商务专车往返机场，含高速费、停车费，提供矿泉水',
    price: 280,
    pricingType: 'per_time' as const,
    inventory: 2, // 2辆车
    duration: 60, // 单程约60分钟
    needsAppointment: true,
    applyUseSettings: '需提前24小时预约',
    status: 'active' as const,
    pointsReward: 80, // 购买奖励80积分
    rewardType: 'purchase' as const,
    createdAt: '01/01/25 10:00:00'
  },
  // 新增案例：免费赠品
  {
    id: '6',
    sequenceNumber: 6,
    productCategory: '客房用品',
    productName: '一次性拖鞋',
    productDescription: '高品质一次性拖鞋，柔软舒适，入住时赠送',
    price: 0, // 免费赠送
    pricingType: 'fixed' as const,
    inventory: 200,
    needsAppointment: false,
    applyUseSettings: '入住时免费赠送',
    status: 'active' as const,
    pointsReward: 20, // 领取赠品奖励20积分
    rewardType: 'gift' as const,
    createdAt: '01/12/25 08:00:00'
  }
]
