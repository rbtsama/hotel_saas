import type { RoomTypeOrders } from '../../types/orderCalendar.types'

// 模拟订单日历数据
export const mockOrderCalendarData: RoomTypeOrders[] = [
  {
    id: '1',
    roomTypeName: '竹林大床房【1号院】',
    buildingNumber: '1号院',
    totalRooms: 1,
    bookings: [
      {
        id: 'order-1-1',
        guestName: 'XIAOAI（服务）',
        startDate: '2025-11-17',
        endDate: '2025-11-19',
        nights: 2,
        hasSpecialMark: true,
        orderStatus: 'confirmed'
      }
    ]
  },
  {
    id: '2',
    roomTypeName: '景观双床房【1号院】',
    buildingNumber: '1号院',
    totalRooms: 2,
    bookings: [
      {
        id: 'order-2-1',
        guestName: 'xiaoai',
        startDate: '2025-11-25',
        endDate: '2025-11-27',
        nights: 2,
        hasSpecialMark: true,
        orderStatus: 'confirmed'
      }
    ]
  },
  {
    id: '3',
    roomTypeName: '景观大套房【1号院】',
    buildingNumber: '1号院',
    totalRooms: 2,
    bookings: []
  },
  {
    id: '4',
    roomTypeName: '童趣滑滑梯房【1号院】',
    buildingNumber: '1号院',
    totalRooms: 1,
    bookings: []
  },
  {
    id: '5',
    roomTypeName: '顶层景观大套房【1号院】',
    buildingNumber: '1号院',
    totalRooms: 1,
    bookings: [
      {
        id: 'order-5-1',
        guestName: 'XIAOAI（测试）',
        startDate: '2025-11-17',
        endDate: '2025-11-18',
        nights: 1,
        hasSpecialMark: true,
        orderStatus: 'checked-in'
      }
    ]
  },
  {
    id: '6',
    roomTypeName: '江景大床房A【2号院】',
    buildingNumber: '2号院',
    totalRooms: 2,
    bookings: []
  },
  {
    id: '7',
    roomTypeName: '江景大床房B【2号院】',
    buildingNumber: '2号院',
    totalRooms: 2,
    bookings: [
      {
        id: 'order-7-1',
        guestName: '张三',
        startDate: '2025-11-21',
        endDate: '2025-11-28',
        nights: 7,
        hasSpecialMark: false,
        orderStatus: 'checked-in'
      }
    ]
  },
  {
    id: '8',
    roomTypeName: '青梅小院【2号院】',
    buildingNumber: '2号院',
    totalRooms: 1,
    bookings: []
  },
  {
    id: '9',
    roomTypeName: '露台大床房【3号院】',
    buildingNumber: '3号院',
    totalRooms: 1,
    bookings: []
  },
  {
    id: '10',
    roomTypeName: '山景大床房【3号院】',
    buildingNumber: '3号院',
    totalRooms: 1,
    bookings: []
  },
  {
    id: '11',
    roomTypeName: '观景loft大床房【3号院】',
    buildingNumber: '3号院',
    totalRooms: 1,
    bookings: []
  },
  {
    id: '12',
    roomTypeName: '观景榻榻米大床房【3号院】',
    buildingNumber: '3号院',
    totalRooms: 1,
    bookings: []
  },
  {
    id: '13',
    roomTypeName: '独栋带泡池大床房【3号院】',
    buildingNumber: '3号院',
    totalRooms: 1,
    bookings: []
  }
]
