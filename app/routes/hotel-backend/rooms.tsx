import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import RoomsPage from '~/pages/HotelBackend/RoomsPage'
import { mockRooms } from '~/pages/HotelBackend/services/mocks'

export async function loader() {
  return json({ rooms: mockRooms })
}

export default function RoomsRoute() {
  const { rooms } = useLoaderData<typeof loader>()
  return <RoomsPage rooms={rooms as any} />
}
