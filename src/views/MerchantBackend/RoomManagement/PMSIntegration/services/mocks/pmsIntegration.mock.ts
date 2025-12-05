import type { PMSIntegrationConfig, RoomTypeMapping } from '../../types/pmsIntegration.types'

// 模拟房型映射数据
const mockRoomTypeMappings: RoomTypeMapping[] = [
  {
    id: '1',
    localRoomTypeName: '竹林大床房【1号院】',
    buildingNumber: '1号院',
    pmsRoomTypeName: '竹林大床房【1号院】',
    pmsRoomTypeId: 'pms-room-001'
  },
  {
    id: '2',
    localRoomTypeName: '景观双床房【1号院】',
    buildingNumber: '1号院',
    pmsRoomTypeName: '景观双床房【1号院】',
    pmsRoomTypeId: 'pms-room-002'
  },
  {
    id: '3',
    localRoomTypeName: '景观大套房【1号院】',
    buildingNumber: '1号院',
    pmsRoomTypeName: '景观大套房【1号院】',
    pmsRoomTypeId: 'pms-room-003'
  },
  {
    id: '4',
    localRoomTypeName: '童趣滑滑梯房【1号院】',
    buildingNumber: '1号院',
    pmsRoomTypeName: '童趣滑滑梯房【1号院】',
    pmsRoomTypeId: 'pms-room-004'
  },
  {
    id: '5',
    localRoomTypeName: '顶层景观大套房【1号院】',
    buildingNumber: '1号院',
    pmsRoomTypeName: '顶层景观大套房【1号院】',
    pmsRoomTypeId: 'pms-room-005'
  },
  {
    id: '6',
    localRoomTypeName: '江景大床房A【2号院】',
    buildingNumber: '2号院',
    pmsRoomTypeName: '江景大床房A【2号院】',
    pmsRoomTypeId: 'pms-room-006'
  },
  {
    id: '7',
    localRoomTypeName: '江景大床房B【2号院】',
    buildingNumber: '2号院',
    pmsRoomTypeName: '江景大床房B【2号院】',
    pmsRoomTypeId: 'pms-room-007'
  },
  {
    id: '8',
    localRoomTypeName: '青梅小院【2号院】',
    buildingNumber: '2号院',
    pmsRoomTypeName: '青梅小院【2号院】',
    pmsRoomTypeId: 'pms-room-008'
  },
  {
    id: '9',
    localRoomTypeName: '露台大床房【3号院】',
    buildingNumber: '3号院',
    pmsRoomTypeName: '露台大床房【3号院】',
    pmsRoomTypeId: 'pms-room-009'
  },
  {
    id: '10',
    localRoomTypeName: '山景大床房【3号院】',
    buildingNumber: '3号院',
    pmsRoomTypeName: '山景大床房【3号院】',
    pmsRoomTypeId: 'pms-room-010'
  },
  {
    id: '11',
    localRoomTypeName: '观景loft大床房【3号院】',
    buildingNumber: '3号院',
    pmsRoomTypeName: '观景loft【3号院】',
    pmsRoomTypeId: 'pms-room-011'
  },
  {
    id: '12',
    localRoomTypeName: '观景榻榻米大床房【3号院】',
    buildingNumber: '3号院',
    pmsRoomTypeName: '观景榻榻米【3号院】',
    pmsRoomTypeId: 'pms-room-012'
  },
  {
    id: '13',
    localRoomTypeName: '独栋带泡池大床房【3号院】',
    buildingNumber: '3号院',
    pmsRoomTypeName: '独栋小院【3号院】',
    pmsRoomTypeId: 'pms-room-013'
  }
]

// 模拟PMS对接配置
export const mockPMSIntegrationConfig: PMSIntegrationConfig = {
  id: 'config-1',
  isPMSEnabled: true,
  pmsProvider: 'order-coming',
  pmsStoreId: '69808093',
  roomTypeMappings: mockRoomTypeMappings,
  updatedAt: '01/17/25 14:30:00'
}
