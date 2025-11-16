/**
 * 周边信息Mock数据
 */

import type { SurroundingInfo, SurroundingItem } from '../../types/hotel-backend.types'
import { SurroundingCategory, DistanceType } from '../../types/hotel-backend.types'

export const mockSurroundingInfo: SurroundingInfo = {
  id: 'surrounding-001',
  storeId: 'store-001',
  items: [
    // 交通
    {
      id: 'sur-001',
      category: SurroundingCategory.TRANSPORTATION,
      placeName: '桐庐站',
      distanceType: DistanceType.DRIVING,
      distanceKm: 24,
      timeMinutes: 25,
    },
    // 景点
    {
      id: 'sur-002',
      category: SurroundingCategory.ATTRACTION,
      placeName: '富春江镇',
      distanceType: DistanceType.DRIVING,
      distanceKm: 12,
      timeMinutes: 15,
    },
    // 逛吃
    {
      id: 'sur-003',
      category: SurroundingCategory.FOOD,
      placeName: '芦茨村',
      distanceType: DistanceType.WALKING,
      distanceKm: 1,
      timeMinutes: 10,
    },
  ],
  tourismMapImage: 'https://picsum.photos/600/800?random=map1',
  updatedAt: '01/15/25 16:40:00',
}
