/**
 * 酒店后台Mock数据 - 样板房场景
 * 模拟一个拥有3家门店的连锁酒店集团
 */

import type { StaffAccount, Store, RoomType, Room, HotelMember } from '../../types/hotel-backend.types'
import { StoreStatus, RoomTypeStatus, RoomStatus, HotelMemberLevel } from '../../types/hotel-backend.types'

// ===== 1. 员工账号(简化版 - 只要求手机号必填) =====
export const mockStaffAccounts: StaffAccount[] = [
  {
    id: 'staff-001',
    position: '前台主管',
    name: '张小花',
    phone: '13812340001',
    createdAt: '01/10/25 09:00:00',
    createdBy: '酒店管理员',
  },
  {
    id: 'staff-002',
    position: '保洁员',
    name: '李阿姨',
    phone: '13923450002',
    createdAt: '01/10/25 09:10:00',
    createdBy: '酒店管理员',
  },
  {
    id: 'staff-003',
    position: '维修工',
    name: '王师傅',
    phone: '18689010003',
    createdAt: '01/10/25 09:20:00',
    createdBy: '酒店管理员',
  },
  {
    id: 'staff-004',
    position: '前台',
    phone: '17767800004', // 只有手机号,姓名未填
    createdAt: '01/12/25 14:30:00',
    createdBy: '酒店管理员',
  },
  {
    id: 'staff-005',
    name: '赵师傅', // 只有姓名,岗位未填
    phone: '15112340005',
    createdAt: '01/15/25 10:00:00',
    createdBy: '酒店管理员',
  },
  {
    id: 'staff-006',
    phone: '15934560006', // 只有手机号(最小信息)
    createdAt: '01/16/25 08:20:00',
    createdBy: '酒店管理员',
  },
]

// ===== 2. 门店信息 =====
export const mockStores: Store[] = [
  {
    id: 'store-001',
    // 基本信息
    name: '原乡芦荻',
    city: '桐庐',
    phone: '13575481983',
    wechat: '13575481983',
    address: '桐庐县芦茨村大母山',
    longitude: 119.6684377,
    latitude: 29.6890704,
    openedYear: '2016',
    slogan: '既是一间民宿，也是一种植根于山野的生活方式。',
    tags: ['文艺复古', '有烟火气'],
    description: `原乡芦荻位于千年古村庄茨洼,几颗青石白墙小楼依次坐落在芦茨湾边上,推门望江水,开窗见青山。

目前分为4栋,分别为1号院、2号院、3号院、5号院,共计21间客房。大大落地窗,独户一露台,足不出户坐看阳云。

设有餐厅、咖啡馆、茶空间和猫猫杂货铺,暖身暖胃,食住无忧。

1号院7间房,落成于2016年存,装修偏日式风格,木质系,设有茶室。
2号院5间房,落成于2022年夏,装修偏现代,主要功能区有餐厅、咖啡馆,户外大露台等超大公区。
3号院4间房,落成于2019年春,装修偏现代,院内设有泳池。
5号院为猫猫杂货铺,员工生活区。`,

    // 媒体资源
    logo: 'https://picsum.photos/200/200?random=logo1',
    coverImage: 'https://picsum.photos/800/600?random=cover1',
    videoUrl: 'https://example.com/store-video.mp4',
    videoCover: 'https://picsum.photos/800/450?random=video1',
    newsImages: [
      'https://picsum.photos/400/300?random=news1',
      'https://picsum.photos/400/300?random=news2',
    ],

    // 门店设施
    facilities: [
      '老建筑', '特色民居', '江景', '免费停车', '餐厅', '茶室', '咖啡厅',
      '洗衣房', '洗涤用具', '公共区域监控', '门禁系统', '急救包', '泳池',
      '公用WIFI', '非经营休息区', '吸烟区', '户外家具', '图书室', '花园',
      '储物柜', '电子 身份证', '咖啡厅', '便利店', '多功能厅', '儿童书籍',
      '拖鞋', '钓鱼', '楼梯扶手',
    ],

    // 系统字段
    status: StoreStatus.OPERATING,
    totalRooms: 21,
    availableRooms: 8,
    rating: 4.9,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/15/25 14:30:00',
  },
]

// ===== 3. 房型配置 =====
export const mockRoomTypes: RoomType[] = [
  // 人民广场店
  {
    id: 'rt-001',
    storeId: 'store-001',
    storeName: '上海人民广场店',
    name: '标准大床房',
    area: 25,
    bedType: '1.8m大床',
    maxGuests: 2,
    facilities: ['WiFi', '空调', '独立卫浴', '智能电视', '迷你冰箱'],
    images: ['https://picsum.photos/600/400?random=30'],
    description: '舒适温馨的标准客房,配备1.8米大床。',
    basePrice: 399,
    weekendPrice: 499,
    holidayPrice: 699,
    totalCount: 50,
    availableCount: 18,
    status: RoomTypeStatus.ACTIVE,
    createdAt: '2023/06/15 10:00:00',
  },
  {
    id: 'rt-002',
    storeId: 'store-001',
    storeName: '上海人民广场店',
    name: '豪华双床房',
    area: 32,
    bedType: '2张1.5m床',
    maxGuests: 3,
    facilities: ['WiFi', '空调', '独立卫浴', '智能电视', '迷你吧', '保险箱'],
    images: ['https://picsum.photos/600/400?random=31'],
    description: '宽敞的双床房,适合家庭或朋友出行。',
    basePrice: 499,
    weekendPrice: 599,
    holidayPrice: 899,
    totalCount: 40,
    availableCount: 15,
    status: RoomTypeStatus.ACTIVE,
    createdAt: '2023/06/15 10:00:00',
  },
  {
    id: 'rt-003',
    storeId: 'store-001',
    storeName: '上海人民广场店',
    name: '行政套房',
    area: 58,
    bedType: '2.0m特大床',
    maxGuests: 2,
    facilities: ['WiFi', '空调', '独立卫浴', '智能电视', '迷你吧', '保险箱', '浴缸', '办公桌'],
    images: ['https://picsum.photos/600/400?random=32'],
    description: '尊贵的行政套房,独立会客区和办公区。',
    basePrice: 899,
    weekendPrice: 1099,
    holidayPrice: 1499,
    totalCount: 20,
    availableCount: 8,
    status: RoomTypeStatus.ACTIVE,
    createdAt: '2023/06/15 10:00:00',
  },
  // 迪士尼店(亲子房型)
  {
    id: 'rt-004',
    storeId: 'store-003',
    storeName: '上海迪士尼店',
    name: '亲子主题房',
    area: 35,
    bedType: '1张1.8m大床+儿童床',
    maxGuests: 3,
    facilities: ['WiFi', '空调', '独立卫浴', '智能电视', '儿童玩具', '儿童洗漱用品'],
    images: ['https://picsum.photos/600/400?random=33'],
    description: '迪士尼主题装饰,为孩子打造梦幻空间。',
    basePrice: 599,
    weekendPrice: 799,
    holidayPrice: 1199,
    totalCount: 60,
    availableCount: 25,
    status: RoomTypeStatus.ACTIVE,
    createdAt: '2024/01/10 10:00:00',
  },
]

// ===== 4. 房间信息 =====
export const mockRooms: Room[] = [
  // 人民广场店 - 2楼标准大床房
  { id: 'room-001', storeId: 'store-001', storeName: '上海人民广场店', roomTypeId: 'rt-001', roomTypeName: '标准大床房', roomNumber: '2001', floor: 2, status: RoomStatus.OCCUPIED, currentGuestName: '张三', checkInDate: '01/15/25', checkOutDate: '01/17/25', lastCleanedAt: '01/15/25 14:00:00' },
  { id: 'room-002', storeId: 'store-001', storeName: '上海人民广场店', roomTypeId: 'rt-001', roomTypeName: '标准大床房', roomNumber: '2002', floor: 2, status: RoomStatus.AVAILABLE, lastCleanedAt: '01/16/25 10:30:00' },
  { id: 'room-003', storeId: 'store-001', storeName: '上海人民广场店', roomTypeId: 'rt-001', roomTypeName: '标准大床房', roomNumber: '2003', floor: 2, status: RoomStatus.CLEANING, lastCleanedAt: '01/16/25 09:00:00' },
  { id: 'room-004', storeId: 'store-001', storeName: '上海人民广场店', roomTypeId: 'rt-001', roomTypeName: '标准大床房', roomNumber: '2004', floor: 2, status: RoomStatus.RESERVED, checkInDate: '01/17/25' },
  { id: 'room-005', storeId: 'store-001', storeName: '上海人民广场店', roomTypeId: 'rt-001', roomTypeName: '标准大床房', roomNumber: '2005', floor: 2, status: RoomStatus.MAINTENANCE, notes: '空调故障维修中', lastMaintenanceAt: '01/16/25 08:00:00' },

  // 人民广场店 - 3楼豪华双床房
  { id: 'room-006', storeId: 'store-001', storeName: '上海人民广场店', roomTypeId: 'rt-002', roomTypeName: '豪华双床房', roomNumber: '3001', floor: 3, status: RoomStatus.OCCUPIED, currentGuestName: '李四', checkInDate: '01/14/25', checkOutDate: '01/18/25' },
  { id: 'room-007', storeId: 'store-001', storeName: '上海人民广场店', roomTypeId: 'rt-002', roomTypeName: '豪华双床房', roomNumber: '3002', floor: 3, status: RoomStatus.AVAILABLE },
  { id: 'room-008', storeId: 'store-001', storeName: '上海人民广场店', roomTypeId: 'rt-002', roomTypeName: '豪华双床房', roomNumber: '3003', floor: 3, status: RoomStatus.AVAILABLE },

  // 迪士尼店 - 亲子房
  { id: 'room-009', storeId: 'store-003', storeName: '上海迪士尼店', roomTypeId: 'rt-004', roomTypeName: '亲子主题房', roomNumber: '1001', floor: 1, status: RoomStatus.OCCUPIED, currentGuestName: '王五', checkInDate: '01/15/25', checkOutDate: '01/16/25' },
  { id: 'room-010', storeId: 'store-003', storeName: '上海迪士尼店', roomTypeId: 'rt-004', roomTypeName: '亲子主题房', roomNumber: '1002', floor: 1, status: RoomStatus.AVAILABLE },
]

// ===== 5. 酒店会员 =====
export const mockHotelMembers: HotelMember[] = [
  {
    id: 'hm-001',
    name: '陈女士',
    phone: '13812341111',
    level: HotelMemberLevel.SVIP,
    levelName: '超级VIP',
    points: 8900,
    totalStays: 28,
    totalAmount: 45600,
    discount: 0.85, // 8.5折
    joinedAt: '2023/06/20',
    lastVisitAt: '01/10/25',
    notes: '老客户,偏好高楼层安静房间',
  },
  {
    id: 'hm-002',
    name: '刘先生',
    phone: '13923452222',
    level: HotelMemberLevel.VIP,
    levelName: 'VIP',
    points: 3200,
    totalStays: 12,
    totalAmount: 18900,
    discount: 0.9, // 9折
    joinedAt: '2024/03/15',
    lastVisitAt: '01/05/25',
  },
  {
    id: 'hm-003',
    name: '孙女士',
    phone: '18689013333',
    level: HotelMemberLevel.NORMAL,
    levelName: '普通会员',
    points: 560,
    totalStays: 3,
    totalAmount: 2800,
    discount: 0.98, // 9.8折
    joinedAt: '2024/12/01',
    lastVisitAt: '12/28/24',
  },
]
