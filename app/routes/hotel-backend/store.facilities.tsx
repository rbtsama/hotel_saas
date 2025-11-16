/**
 * 门店设施路由
 */

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import StoreFacilitiesPage from '~/pages/HotelBackend/StoreFacilitiesPage'
import { mockStores } from '~/pages/HotelBackend/services/mocks'

export async function loader() {
  const store = mockStores[0]
  return json({ selectedFacilities: store?.facilities || [] })
}

export default function StoreFacilitiesRoute() {
  const { selectedFacilities } = useLoaderData<typeof loader>()
  return <StoreFacilitiesPage selectedFacilities={selectedFacilities as any} />
}
