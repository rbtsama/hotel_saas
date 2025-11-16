import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import RoomTypeListPage from '~/pages/HotelBackend/RoomTypeListPage'

const mockRoomTypes = [
  { id: '5', sortOrder: 5, category: '普通', name: '竹林大床房', 院: '1号院', bedrooms: 1, roomCount: 1, area: 28, maxAdults: 2, isOnline: true, basePrice: 599, facilities: [], images: [], createdAt: '01/10/25 10:00:00' },
  { id: '6', sortOrder: 6, category: '普通', name: '景观双床房', 院: '1号院', bedrooms: 1, roomCount: 2, area: 28, maxAdults: 2, isOnline: true, basePrice: 599, facilities: [], images: [], createdAt: '01/10/25 10:00:00' },
  { id: '21', sortOrder: 21, category: '普通', name: '景观大客房', 院: '1号院', bedrooms: 1, roomCount: 2, area: 68, maxAdults: 2, isOnline: true, basePrice: 899, facilities: [], images: [], createdAt: '01/10/25 10:00:00' },
  { id: '20', sortOrder: 20, category: '普通', name: '童趣滑梯榻榻米房', 院: '1号院', bedrooms: 1, roomCount: 1, area: 48, maxAdults: 2, isOnline: true, basePrice: 699, facilities: [], images: [], createdAt: '01/10/25 10:00:00' },
  { id: '22', sortOrder: 22, category: '普通', name: '顶层景观大套房', 院: '1号院', bedrooms: 1, roomCount: 1, area: 68, maxAdults: 2, isOnline: true, basePrice: 999, facilities: [], images: [], createdAt: '01/10/25 10:00:00' },
  { id: '40', sortOrder: 40, category: '普通', name: '江景大床房A', 院: '2号院', bedrooms: 1, roomCount: 2, area: 50, maxAdults: 2, isOnline: true, basePrice: 799, facilities: [], images: [], createdAt: '01/10/25 10:00:00' },
  { id: '41', sortOrder: 41, category: '普通', name: '江景大床房B', 院: '2号院', bedrooms: 1, roomCount: 2, area: 50, maxAdults: 2, isOnline: true, basePrice: 799, facilities: [], images: [], createdAt: '01/10/25 10:00:00' },
]

export async function loader() {
  return json({ roomTypes: mockRoomTypes })
}

export default function RoomTypeListRoute() {
  const { roomTypes } = useLoaderData<typeof loader>()
  return <RoomTypeListPage roomTypes={roomTypes as any} />
}
