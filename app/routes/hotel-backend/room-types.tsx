import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import RoomTypesPage from '~/pages/HotelBackend/RoomTypesPage'
import { mockRoomTypes } from '~/pages/HotelBackend/services/mocks'

export async function loader() {
  return json({ roomTypes: mockRoomTypes })
}

export default function RoomTypesRoute() {
  const { roomTypes } = useLoaderData<typeof loader>()
  return <RoomTypesPage roomTypes={roomTypes as any} />
}
