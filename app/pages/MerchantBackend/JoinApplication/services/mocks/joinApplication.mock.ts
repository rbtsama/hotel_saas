/**
 * 商户端 - 入驻申请 Mock 数据
 */

import type { JoinApplication } from '../../types/joinApplication.types'
import { StoreType, OTAPlatform, OTAChallenge } from '../../types/joinApplication.types'

/**
 * 入驻申请示例数据
 */
export const mockJoinApplication: JoinApplication = {
  id: 'join-app-1',
  status: 'pending',

  // 主账号信息
  adminPhone: '13800138000',
  adminName: '李明',

  // 门店基本信息
  storeName: '西湖畔度假民宿',
  storeType: StoreType.HOMESTAY,
  bookingPlatform: '携程',
  storeAddress: '浙江省杭州市西湖区西湖路123号',
  storeDescription: '位于西湖风景区核心位置，步行5分钟可达西湖，周边餐饮购物便利，房间装修温馨舒适，提供24小时热水和免费WiFi。',

  // 运营人员信息
  hasOTASpecialist: true,
  otaContactName: '王芳',
  otaContactPhone: '13900139000',

  // 平台相关
  onlinePlatforms: [OTAPlatform.CTRIP, OTAPlatform.MEITUAN, OTAPlatform.FLIGGY],
  hasCtripSpecialOffer: true,
  interestedPlatforms: [OTAPlatform.XIAOHONGSHU, OTAPlatform.DOUYIN],
  otaChallenges: [OTAChallenge.COMPLEX_RULES, OTAChallenge.NO_ENERGY, OTAChallenge.COMPETITION],

  // 房型图片（示例：3个房型）
  roomTypeImages: [
    {
      roomTypeName: '单人',
      images: ['room1-1.jpg', 'room1-2.jpg', 'room1-3.jpg'],
    },
    {
      roomTypeName: '双人大床',
      images: ['room2-1.jpg', 'room2-2.jpg'],
    },
    {
      roomTypeName: '家庭房',
      images: ['room3-1.jpg', 'room3-2.jpg', 'room3-3.jpg', 'room3-4.jpg'],
    },
  ],

  createdAt: '2025-11-28 10:30:00',
  updatedAt: '2025-11-28 10:30:00',
}
