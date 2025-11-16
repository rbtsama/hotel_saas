// PMS对接类型定义

export interface RoomTypeMapping {
  id: string
  localRoomTypeName: string // 小而美房型名称
  buildingNumber: string // 号院
  pmsRoomTypeName: string // PMS房型名称
  pmsRoomTypeId?: string // PMS房型ID（可选）
}

export interface PMSIntegrationConfig {
  id: string
  isPMSEnabled: boolean // 是否对接PMS
  pmsProvider?: string // 选择对接的PMS（订单来了等）
  pmsStoreId?: string // PMS门店ID
  roomTypeMappings: RoomTypeMapping[] // 房型映射列表
  updatedAt: string
}

export interface PMSProviderOption {
  value: string
  label: string
}

// PMS可选项
export const PMS_PROVIDERS: PMSProviderOption[] = [
  { value: 'order-coming', label: '订单来了' },
  { value: 'cloud-pms', label: '云PMS' },
  { value: 'hotel-master', label: '酒店大师' }
]
