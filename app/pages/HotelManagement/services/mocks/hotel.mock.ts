/**
 * 酒店管理 Mock 数据
 * 模拟真实的商家入驻场景
 */

import type { JoinApplication, PartnerHotel } from '../../types/hotel.types'
import { FollowUpStatus, HotelStatus, OnboardingStatus } from '../../types/hotel.types'

// ==================== 加盟申请（10个） ====================

export const mockJoinApplications: JoinApplication[] = [
  {
    applicationId: 'APP_20250115001',
    submittedAt: '01/15/25 14:30:00',
    hotelName: '云栖山居·莫干山店',
    phone: '13912345678',
    email: 'yunqi@hotel.com',
    province: '浙江',
    city: '湖州市',
    address: '德清县莫干山镇竹海路188号',
    hotelDescription: '精品民宿，15间客房，山景为主，装修文艺风格',
    qualifications: {
      businessLicense: true,
      foodLicense: true,
      hygieneLicense: true
    },
    hotelImages: [
      '/images/hotel1_1.jpg',
      '/images/hotel1_2.jpg',
      '/images/hotel1_3.jpg'
    ],
    followUpStatus: FollowUpStatus.IN_NEGOTIATION,
    followUpNotes: '老板很有意向，要求抽佣降到4%，待商务部审批',
    lastFollowUpAt: '01/15/25 16:00:00',
    lastFollowUpBy: 'BD-张三'
  },
  {
    applicationId: 'APP_20250114002',
    submittedAt: '01/14/25 10:20:00',
    hotelName: '锦江之星·杭州西湖店',
    phone: '13823456789',
    email: 'jinjiang_hz@hotel.com',
    province: '浙江',
    city: '杭州市',
    address: '西湖区南山路58号',
    hotelDescription: '经济型连锁酒店，38间客房，靠近西湖景区',
    qualifications: {
      businessLicense: true,
      foodLicense: false,
      hygieneLicense: true
    },
    hotelImages: [
      '/images/hotel2_1.jpg',
      '/images/hotel2_2.jpg'
    ],
    followUpStatus: FollowUpStatus.TO_SIGN,
    followUpNotes: '资料齐全，已通过审核，等待法务寄送合同',
    lastFollowUpAt: '01/14/25 15:30:00',
    lastFollowUpBy: 'BD-李四'
  },
  {
    applicationId: 'APP_20250113003',
    submittedAt: '01/13/25 09:15:00',
    hotelName: '亚朵轻居·上海人民广场店',
    phone: '13734567890',
    email: 'atour_sh@hotel.com',
    province: '上海',
    city: '上海市',
    address: '黄浦区福州路128号',
    hotelDescription: '中端商务酒店，52间客房，近地铁1/2号线',
    qualifications: {
      businessLicense: true,
      foodLicense: true,
      hygieneLicense: true
    },
    hotelImages: [
      '/images/hotel3_1.jpg',
      '/images/hotel3_2.jpg',
      '/images/hotel3_3.jpg',
      '/images/hotel3_4.jpg'
    ],
    followUpStatus: FollowUpStatus.SIGNED,
    followUpNotes: '已签约，待财务录入盛付通信息后开通',
    lastFollowUpAt: '01/13/25 17:00:00',
    lastFollowUpBy: 'BD-王五',
    contractInfo: {
      contractType: '小而美商家服务协议',
      version: 'V2.1',
      signerName: '陈老板',
      signerPhone: '13734567890',
      signedAt: '01/13/25 15:30:00',
      contractContent: `发布日期：2025年01月13日
生效日期：2025年01月13日

亲爱的商家，欢迎您使用小而美平台！

《小而美商家服务协议》（以下简称"本协议"或"服务协议"）由您（以下简称"商家"或"门店"）与小而美平台的运营方杭州小而美信息技术服务有限公司（以下简称"小而美"）订立，对小而美及商家具有约束力。

一、定义

1. 平台/小而美平台：指小而美运营的房源信息发布及预订的信息技术服务网络平台，包括但不限于小而美HOMESTAY微信小程序等线上网络平台。

2. 商家/门店：指在小而美平台注册，并在平台上发布房源信息及使用规则，并为房客提供房源使用及相关服务的主体。

3. 房客/用户：指在小而美平台注册，通过小而美平台预订商家所发布房源的主体。

二、服务条款

(一) 房源的基本要求

1. 商家发布的房源及其中的各项设备设施和提供的服务应符合下列要求：
   (1) 符合国家及当地建筑、治安、消防安全等要求，具有保障人身安全、财产安全的相应措施；
   (2) 可满足房客居住用途；
   (3) 具有安全性、适用性、舒适性；
   (4) 符合国家或地方对房屋用途、使用等限制及规定，不属于国家公租房、公共租赁用房、廉租房、共有产权房、经济适用房、保障房等依法不得擅自处置的房屋；
   (5) 符合小而美平台的房源标准。

(四) 技术服务费及结算

1. 小而美将按照商家实际收取的订单金额（"实收订单金额"）的一定比例（下称"技术服务费比例"）作为平台的技术服务费（即技术服务费=商家实收订单金额×技术服务费比例）。该等技术服务费比例由双方另行协商确认。

签约人：${`陈老板`}
签约账号：${`13734567890`}
签约时间：${`01/13/25 15:30:00`}`
    }
  },
  {
    applicationId: 'APP_20250112004',
    submittedAt: '01/12/25 16:40:00',
    hotelName: '海景花园酒店·青岛',
    phone: '13645678901',
    email: 'haijing_qd@hotel.com',
    province: '山东',
    city: '青岛市',
    address: '市南区香港中路88号',
    hotelDescription: '四星级酒店，120间客房，海景房为主',
    qualifications: {
      businessLicense: true,
      foodLicense: true,
      hygieneLicense: false
    },
    hotelImages: [
      '/images/hotel4_1.jpg'
    ],
    followUpStatus: FollowUpStatus.TO_CONTACT,
    followUpNotes: '缺少卫生许可证，已要求补充材料',
    lastFollowUpAt: '01/12/25 18:00:00',
    lastFollowUpBy: 'BD-赵六'
  },
  {
    applicationId: 'APP_20250110005',
    submittedAt: '01/10/25 11:00:00',
    hotelName: '温泉度假村·从化',
    phone: '13556789012',
    email: 'wenquan_gz@hotel.com',
    province: '广东',
    city: '广州市',
    address: '从化区温泉镇温泉东路298号',
    hotelDescription: '度假村类型，80间客房，带温泉和SPA设施',
    qualifications: {
      businessLicense: true,
      foodLicense: true,
      hygieneLicense: true
    },
    hotelImages: [
      '/images/hotel5_1.jpg',
      '/images/hotel5_2.jpg'
    ],
    followUpStatus: FollowUpStatus.IN_NEGOTIATION,
    followUpNotes: '对方要求平台提供流量支持，商讨营销方案中',
    lastFollowUpAt: '01/11/25 14:20:00',
    lastFollowUpBy: 'BD-张三'
  },
  {
    applicationId: 'APP_20250108006',
    submittedAt: '01/08/25 13:50:00',
    hotelName: '如家精选·成都春熙路店',
    phone: '13467890123',
    email: 'rujia_cd@hotel.com',
    province: '四川',
    city: '成都市',
    address: '锦江区总府路168号',
    hotelDescription: '经济型酒店，45间客房，市中心商圈',
    qualifications: {
      businessLicense: true,
      foodLicense: false,
      hygieneLicense: true
    },
    hotelImages: [
      '/images/hotel6_1.jpg'
    ],
    followUpStatus: FollowUpStatus.REJECTED,
    followUpNotes: '品牌方统一管理，不接受单店合作',
    lastFollowUpAt: '01/09/25 10:00:00',
    lastFollowUpBy: 'BD-李四'
  }
]

// ==================== 合作酒店（8个） ====================

export const mockPartnerHotels: PartnerHotel[] = [
  {
    hotelId: 'HOTEL_000001',
    activatedAt: '12/15/24 10:00:00',
    hotelName: '亚朵酒店·上海新天地店',
    province: '上海',
    city: '上海市',
    district: '黄浦区',
    address: '黄浦区马当路388号',
    adminAccount: 'atour_shtd',
    commissionRate: 5.0,
    shengfutongId: '45632702',
    status: HotelStatus.ONLINE,
    completionRate: 100,
    onboardingStatus: OnboardingStatus.COMPLETED,
    createdAt: '12/15/24 10:00:00',
    createdBy: '张总',
    updatedAt: '01/10/25 14:20:00',
    updatedBy: '李经理'
  },
  {
    hotelId: 'HOTEL_000002',
    activatedAt: '11/20/24 09:30:00',
    hotelName: '全季酒店·北京三里屯店',
    province: '北京',
    city: '北京市',
    district: '朝阳区',
    address: '朝阳区工体北路58号',
    adminAccount: 'ji_bjslt',
    commissionRate: 5.0,
    shengfutongId: '45632703',
    status: HotelStatus.ONLINE,
    completionRate: 100,
    onboardingStatus: OnboardingStatus.COMPLETED,
    createdAt: '11/20/24 09:30:00',
    createdBy: '张总'
  },
  {
    hotelId: 'HOTEL_000003',
    activatedAt: '10/10/24 11:00:00',
    hotelName: '汉庭酒店·杭州西湖断桥店',
    province: '浙江',
    city: '杭州市',
    district: '西湖区',
    address: '西湖区北山街68号',
    adminAccount: 'hanting_hzdq',
    commissionRate: 4.5,
    shengfutongId: '45632704',
    status: HotelStatus.ONLINE,
    completionRate: 85,
    onboardingStatus: OnboardingStatus.CONFIGURING,
    createdAt: '10/10/24 11:00:00',
    createdBy: '张总',
    updatedAt: '01/05/25 16:00:00',
    updatedBy: '李经理'
  },
  {
    hotelId: 'HOTEL_000004',
    activatedAt: '09/15/24 14:00:00',
    hotelName: '山野·莫干山云栖民宿',
    province: '浙江',
    city: '湖州市',
    district: '德清县',
    address: '德清县莫干山镇竹海路188号',
    adminAccount: 'shanye_mgsy',
    commissionRate: 6.0,
    shengfutongId: '45632705',
    status: HotelStatus.ONLINE,
    completionRate: 65,
    onboardingStatus: OnboardingStatus.CONFIGURING,
    createdAt: '09/15/24 14:00:00',
    createdBy: '李经理'
  },
  {
    hotelId: 'HOTEL_000005',
    activatedAt: '08/20/24 10:30:00',
    hotelName: '柏悦酒店·上海浦东店',
    province: '上海',
    city: '上海市',
    district: '浦东新区',
    address: '浦东新区世纪大道100号',
    adminAccount: 'parkhyatt_shpd',
    commissionRate: 3.5,
    shengfutongId: '45632706',
    status: HotelStatus.ONLINE,
    completionRate: 100,
    onboardingStatus: OnboardingStatus.COMPLETED,
    createdAt: '08/20/24 10:30:00',
    createdBy: '张总'
  },
  {
    hotelId: 'HOTEL_000006',
    activatedAt: '07/10/24 09:00:00',
    hotelName: '如家酒店·成都春熙路店',
    province: '四川',
    city: '成都市',
    district: '锦江区',
    address: '锦江区总府路168号',
    adminAccount: 'rujia_cdcx',
    commissionRate: 5.0,
    shengfutongId: '45632707',
    status: HotelStatus.ONLINE,
    completionRate: 30,
    onboardingStatus: OnboardingStatus.CONFIGURING,
    createdAt: '07/10/24 09:00:00',
    createdBy: '李经理'
  },
  {
    hotelId: 'HOTEL_000007',
    activatedAt: '06/15/24 15:30:00',
    hotelName: '城市便捷酒店·广州天河店',
    province: '广东',
    city: '广州市',
    district: '天河区',
    address: '天河区天河路228号',
    adminAccount: 'citybj_gzth',
    commissionRate: 5.5,
    shengfutongId: '45632708',
    status: HotelStatus.OFFLINE,
    completionRate: 0,
    onboardingStatus: OnboardingStatus.NOT_STARTED,
    createdAt: '06/15/24 15:30:00',
    createdBy: '王主管',
    updatedAt: '12/20/24 10:00:00',
    updatedBy: '李经理'
  },
  {
    hotelId: 'HOTEL_000008',
    activatedAt: '05/01/24 10:00:00',
    hotelName: '维也纳酒店·深圳南山店',
    province: '广东',
    city: '深圳市',
    district: '南山区',
    address: '南山区科技园南区深南大道9988号',
    adminAccount: 'vienna_szns',
    commissionRate: 5.0,
    shengfutongId: '45632709',
    status: HotelStatus.ONLINE,
    completionRate: 100,
    onboardingStatus: OnboardingStatus.COMPLETED,
    createdAt: '05/01/24 10:00:00',
    createdBy: '李经理'
  }
]

// ==================== 省市区数据（用于筛选） ====================

export const mockProvinces = [
  '全部',
  '上海',
  '北京',
  '浙江',
  '广东',
  '四川',
  '山东'
]

export const mockCities: Record<string, string[]> = {
  '上海': ['上海市'],
  '北京': ['北京市'],
  '浙江': ['杭州市', '湖州市'],
  '广东': ['广州市', '深圳市'],
  '四川': ['成都市'],
  '山东': ['青岛市']
}

// ==================== 状态标签映射 ====================

export const followUpStatusLabels: Record<FollowUpStatus, string> = {
  [FollowUpStatus.TO_CONTACT]: '待联系',
  [FollowUpStatus.IN_NEGOTIATION]: '洽谈中',
  [FollowUpStatus.TO_SIGN]: '待签约',
  [FollowUpStatus.SIGNED]: '已签约',
  [FollowUpStatus.REJECTED]: '已拒绝'
}

export const hotelStatusLabels: Record<HotelStatus, string> = {
  [HotelStatus.ONLINE]: '上线',
  [HotelStatus.OFFLINE]: '下线'
}

export const onboardingStatusLabels: Record<OnboardingStatus, string> = {
  [OnboardingStatus.NOT_STARTED]: '未开始',
  [OnboardingStatus.CONFIGURING]: '配置中',
  [OnboardingStatus.COMPLETED]: '已完成'
}
