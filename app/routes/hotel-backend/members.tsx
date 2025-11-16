import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import MembersPage from '~/pages/HotelBackend/MembersPage'
import { mockHotelMembers } from '~/pages/HotelBackend/services/mocks'

export async function loader() {
  return json({ members: mockHotelMembers })
}

export default function MembersRoute() {
  const { members } = useLoaderData<typeof loader>()
  return <MembersPage members={members as any} />
}
