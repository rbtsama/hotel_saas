import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import StoreExtraBedPage from '~/pages/HotelBackend/StoreExtraBedPage'

const mockPolicy = {
  id: 'eb-001',
  storeId: 'store-001',
  extraBedRules: [],
  cribRules: [],
  roomTypeConfigs: [],
  updatedAt: '01/15/25 17:30:00',
}

const mockRoomTypes = [
  { id: 'rt-001', name: '竹林大床房', 院: '1号院' },
  { id: 'rt-002', name: '景观双床房', 院: '1号院' },
  { id: 'rt-003', name: '景观大客房', 院: '1号院' },
  { id: 'rt-004', name: '童趣滑梯榻榻米房', 院: '1号院' },
  { id: 'rt-005', name: '顶层景观大套房', 院: '1号院' },
  { id: 'rt-006', name: '江景大床房A', 院: '2号院' },
  { id: 'rt-007', name: '江景大床房B', 院: '2号院' },
  { id: 'rt-008', name: '青梅小院', 院: '2号院' },
  { id: 'rt-009', name: '露台大床房', 院: '3号院' },
  { id: 'rt-010', name: '山景大床房', 院: '3号院' },
  { id: 'rt-011', name: '观景loft大床房', 院: '3号院' },
  { id: 'rt-012', name: '观景榻榻米木床房', 院: '3号院' },
  { id: 'rt-013', name: '独栋帝池独木床房', 院: '3号院' },
]

export async function loader() {
  return json({ policy: mockPolicy, roomTypes: mockRoomTypes })
}

export default function StoreExtraBedRoute() {
  const { policy, roomTypes } = useLoaderData<typeof loader>()
  return <StoreExtraBedPage policy={policy as any} roomTypes={roomTypes as any} />
}
