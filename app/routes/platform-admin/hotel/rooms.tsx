/**
 * 平台后台 - 客房管理路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import RoomsPage from '~/pages/PlatformAdmin/Hotel/RoomsPage'
import HotelService from '~/pages/PlatformAdmin/Hotel/services/hotel.service'
import type { Room, RoomType } from '~/pages/PlatformAdmin/Hotel/types/hotel.types'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search') || undefined
  const roomTypeId = url.searchParams.get('roomType') || undefined
  const floor = url.searchParams.get('floor') ? Number(url.searchParams.get('floor')) : undefined
  const status = url.searchParams.get('status') || 'all'

  try {
    const [rooms, roomTypes, floors] = await Promise.all([
      HotelService.getRooms({
        search,
        roomTypeId: roomTypeId === 'all' ? undefined : roomTypeId,
        floor,
        status: status as any,
      }),
      HotelService.getRoomTypes(),
      HotelService.getFloors(),
    ])

    return json({ rooms, roomTypes, floors, error: null })
  } catch (error) {
    console.error('Failed to load rooms:', error)
    return json(
      { rooms: [], roomTypes: [], floors: [], error: 'Failed to load rooms data' },
      { status: 500 }
    )
  }
}

export default function RoomsRoute() {
  const { rooms, roomTypes, floors, error } = useLoaderData<typeof loader>()

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          错误: {error}
        </div>
      </div>
    )
  }

  return <RoomsPage rooms={rooms as Room[]} roomTypes={roomTypes as RoomType[]} floors={floors as number[]} />
}
