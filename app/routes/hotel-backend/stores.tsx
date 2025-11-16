import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import StoresPage from '~/pages/HotelBackend/StoresPage'
import { mockStores } from '~/pages/HotelBackend/services/mocks'

export async function loader() {
  return json({ stores: mockStores })
}

export default function StoresRoute() {
  const { stores } = useLoaderData<typeof loader>()
  return <StoresPage stores={stores as any} />
}
