import type { StoreInfo } from '../../types/storeInfo.types'

// 模拟门店信息数据
export const mockStoreInfo: StoreInfo = {
  id: 'store-001',
  basicInfo: {
    // 门店身份（锁定字段）
    name: '云栖山居民宿',
    city: '杭州市',
    address: '西湖区龙坞茶镇云栖竹径88号',
    hotelCategory: '民宿',
    roomCount: 12,

    // 联系方式
    contactPhone: '0571-88888888',
    contactName: '张经理',
    email: 'yunqi@example.com',

    // 门店描述
    description:
      '云栖山居坐落于杭州西湖区龙坞茶镇，毗邻云栖竹径景区。民宿依山而建，掩映在竹林茶园之中，环境清幽。这里远离城市喧嚣，却交通便利，距离西湖景区仅20分钟车程。\n\n民宿采用现代简约设计风格，融合江南园林元素。12间客房各具特色，配备智能家居系统、独立卫浴、观景阳台等设施。公共区域设有茶室、书吧、户外露台，可观山景品茗。\n\n我们提供特色茶文化体验、徒步路线推荐、当地美食指引等服务，致力于为宾客打造一个静心休憩的山居时光。',

    // 预订限制
    latestBookingTime: '22:00',
  },

  policyInfo: {
    // 入住及退房时间
    checkinStartTime: '14:00',
    checkoutEndTime: '12:00',
    checkinNote: '如需提前入住或延迟退房，请提前联系前台，视当日房态而定，可能需额外收费。',

    // 取消政策
    cancellationRule: 'free_cancel',
    freeCancelDays: 3,
    freeCancelTime: '18:00',
    afterCancelRule: 'penalty',

    // 办理入住年龄
    ageRestriction: 'limited',
    minAge: 18,

    // 宠物政策
    petPolicy: 'on_request',
    petNote: '小型宠物（10kg以下）需提前申请，经审核通过后可携带入住，需额外支付清洁费用200元/晚。',

    // 支付方式
    paymentMethods: {
      acceptedCards: ['visa', 'master', 'unionpay', 'jcb'],
      thirdPartyPayments: ['wechat', 'alipay', 'unionpay'],
      cashPayment: true,
    },

    // 预订担保可用银行卡
    guaranteeCards: ['visa', 'master', 'unionpay', 'amex'],

    // 政策补充
    policyNote:
      '1. 请携带有效身份证件办理入住；\n2. 为保障您的住宿体验，民宿实行禁烟政策，吸烟请前往指定区域；\n3. 民宿提供免费停车位，车位有限，先到先得；\n4. 公共区域监控24小时运行，保障客人安全。',
  },

  facilityInfo: {
    // 房间设施
    roomFacilities: [
      '空调',
      '暖气',
      '书桌',
      '衣橱',
      '化妆镜',
      '电视',
      '阳台',
      '小院',
      '落地窗',
      '浴缸',
      '淋浴',
      '吹风机',
      '拖鞋',
      '24H热水',
      '洗漱用品',
      '卫浴毛巾',
      '电热水壶',
      '冰箱',
      '遮光窗帘',
      '独卫',
      '智能马桶',
      '无烟',
    ],

    // 娱乐设施
    entertainmentFacilities: [
      '茶室',
      '手工活动',
      '徒步旅行',
      '种植采摘',
      '投影设备',
      '家庭影院',
      '户外篝火',
    ],

    // 公共区域
    publicAreas: [
      '公用WIFI',
      '电梯',
      '非经营休息区',
      '暖气',
      '加湿器',
      '净水机',
      '音响',
      '新风',
      '禁烟',
      '吸烟区',
      '户外家具',
      '图书室',
      '花园',
      '野餐区',
      '烧烤',
    ],

    // 前台服务
    frontDeskServices: ['保险柜', '储物柜', '电子身份证', '信用卡结算'],

    // 餐饮服务
    diningServices: ['早餐送餐', '咖啡厅', '小吃吧'],

    // 商务服务
    businessServices: ['会议室', '快递服务'],

    // 清洁服务
    cleaningServices: ['每日清洁', '更换床单', '更换毛巾', '深度清洁'],

    // 交通设施
    transportFacilities: ['免费停车', '充电桩', '免费接送服务'],

    // 安全设施
    safetyFacilities: [
      '公共区域监控',
      '门禁系统',
      '急救包',
      '安全报警器',
      '火灾报警器',
      '烟雾报警器',
      '灭火器',
      '安保人员',
    ],
  },

  surroundingInfo: {
    locations: [
      {
        id: 'loc-001',
        category: 'attraction',
        name: '云栖竹径',
        distance: 500,
        distanceType: 'straight',
      },
      {
        id: 'loc-002',
        category: 'attraction',
        name: '西湖风景区',
        distance: 8500,
        distanceType: 'driving',
      },
      {
        id: 'loc-003',
        category: 'attraction',
        name: '龙井茶园',
        distance: 3200,
        distanceType: 'driving',
      },
      {
        id: 'loc-004',
        category: 'transport',
        name: '地铁6号线龙坞站',
        distance: 2000,
        distanceType: 'straight',
      },
      {
        id: 'loc-005',
        category: 'transport',
        name: '杭州萧山国际机场',
        distance: 45000,
        distanceType: 'driving',
      },
      {
        id: 'loc-006',
        category: 'dining',
        name: '云栖小镇餐厅',
        distance: 800,
        distanceType: 'straight',
      },
      {
        id: 'loc-007',
        category: 'dining',
        name: '龙坞茶镇美食街',
        distance: 1500,
        distanceType: 'straight',
      },
      {
        id: 'loc-008',
        category: 'shopping',
        name: '龙坞茶镇商业中心',
        distance: 1200,
        distanceType: 'straight',
      },
      {
        id: 'loc-009',
        category: 'shopping',
        name: '万科良渚文化村',
        distance: 12000,
        distanceType: 'driving',
      },
      {
        id: 'loc-010',
        category: 'hospital',
        name: '西溪医院',
        distance: 6500,
        distanceType: 'driving',
      },
    ],
  },

  breakfastPolicy: {
    provided: true,
    breakfastType: 'set_meal',
    cuisineType: ['chinese', 'western'],
    breakfastTime: 'specified',
    breakfastStartTime: '07:30',
    breakfastEndTime: '09:30',
    additionalPrice: 38,

    // 儿童早餐收费详情
    childPricingType: 'age',
    childPriceRules: [
      {
        id: 'rule-001',
        minValue: 0,
        maxValue: 3,
        isFree: true,
      },
      {
        id: 'rule-002',
        minValue: 4,
        maxValue: 12,
        isFree: false,
        price: 19,
      },
      {
        id: 'rule-003',
        minValue: 13,
        maxValue: 17,
        isFree: false,
        price: 28,
      },
    ],
  },

  extraBedPolicy: {
    roomPolicies: [
      {
        roomTypeId: 'room-001',
        roomTypeName: '山景大床房',
        courtyard: '1号院',
        extraBedProvided: true,
        extraBedType: 'single',
        extraBedCount: 1,
        extraBedPrice: 100,
        cribProvided: true,
        cribCount: 1,
        cribPrice: 0,
      },
      {
        roomTypeId: 'room-002',
        roomTypeName: '竹林双床房',
        courtyard: '1号院',
        extraBedProvided: true,
        extraBedType: 'single',
        extraBedCount: 1,
        extraBedPrice: 100,
        cribProvided: true,
        cribCount: 1,
        cribPrice: 0,
      },
      {
        roomTypeId: 'room-003',
        roomTypeName: '茶园套房',
        courtyard: '1号院',
        extraBedProvided: true,
        extraBedType: 'double',
        extraBedCount: 1,
        extraBedPrice: 150,
        cribProvided: true,
        cribCount: 1,
        cribPrice: 0,
      },
      {
        roomTypeId: 'room-004',
        roomTypeName: '湖景大床房',
        courtyard: '2号院',
        extraBedProvided: true,
        extraBedType: 'single',
        extraBedCount: 1,
        extraBedPrice: 100,
        cribProvided: true,
        cribCount: 1,
        cribPrice: 0,
      },
      {
        roomTypeId: 'room-005',
        roomTypeName: '江景大床房',
        courtyard: '2号院',
        extraBedProvided: true,
        extraBedType: 'single',
        extraBedCount: 1,
        extraBedPrice: 100,
        cribProvided: false,
      },
      {
        roomTypeId: 'room-006',
        roomTypeName: '青梅小院',
        courtyard: '2号院',
        extraBedProvided: true,
        extraBedType: 'double',
        extraBedCount: 2,
        extraBedPrice: 150,
        cribProvided: true,
        cribCount: 1,
        cribPrice: 0,
      },
      {
        roomTypeId: 'room-007',
        roomTypeName: '露台大床房',
        courtyard: '3号院',
        extraBedProvided: true,
        extraBedType: 'single',
        extraBedCount: 1,
        extraBedPrice: 120,
        cribProvided: true,
        cribCount: 1,
        cribPrice: 0,
      },
      {
        roomTypeId: 'room-008',
        roomTypeName: '山景大床房',
        courtyard: '3号院',
        extraBedProvided: false,
        cribProvided: true,
        cribCount: 1,
        cribPrice: 0,
      },
      {
        roomTypeId: 'room-009',
        roomTypeName: '观景loft大床房',
        courtyard: '3号院',
        extraBedProvided: true,
        extraBedType: 'single',
        extraBedCount: 1,
        extraBedPrice: 120,
        cribProvided: false,
      },
      {
        roomTypeId: 'room-010',
        roomTypeName: '观景榻榻米大床房',
        courtyard: '3号院',
        extraBedProvided: false,
        cribProvided: false,
      },
      {
        roomTypeId: 'room-011',
        roomTypeName: '独栋带泡池大床房',
        courtyard: '3号院',
        extraBedProvided: true,
        extraBedType: 'double',
        extraBedCount: 1,
        extraBedPrice: 180,
        cribProvided: true,
        cribCount: 1,
        cribPrice: 0,
      },
    ],
  },

  imageInfo: {
    // 小程序分享图
    shareImage: 'https://placehold.co/500x400/2C5F8D/white?text=Share+Image',
    shareText: '云栖山居 | 隐于竹海，归于山林',

    // 门店主页首图
    mainImages: [
      {
        id: 'img-001',
        url: 'https://placehold.co/1000x1500/2C5F8D/white?text=Main+Image+1',
        sortOrder: 1,
      },
      {
        id: 'img-002',
        url: 'https://placehold.co/1000x1500/4A8FBF/white?text=Main+Image+2',
        sortOrder: 2,
      },
      {
        id: 'img-003',
        url: 'https://placehold.co/1000x1500/C67A28/white?text=Main+Image+3',
        sortOrder: 3,
      },
      {
        id: 'img-004',
        url: 'https://placehold.co/1000x1500/5A8A65/white?text=Main+Image+4',
        sortOrder: 4,
      },
      {
        id: 'img-005',
        url: 'https://placehold.co/1000x1500/B94D3D/white?text=Main+Image+5',
        sortOrder: 5,
      },
    ],
  },

  updatedAt: '01/15/25 10:30:00',
}
