import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import StoreSurroundingPage from '~/pages/HotelBackend/StoreSurroundingPage'
import { mockSurroundingInfo } from '~/pages/HotelBackend/services/mocks'

export async function loader() {
  return json({ surrounding: mockSurroundingInfo })
}

export default function StoreSurroundingRoute() {
  const { surrounding } = useLoaderData<typeof loader>()
  return <StoreSurroundingPage surrounding={surrounding as any} />
}
