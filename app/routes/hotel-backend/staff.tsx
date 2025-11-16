import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import StaffPage from '~/pages/HotelBackend/StaffPage'
import { mockStaffAccounts } from '~/pages/HotelBackend/services/mocks'

export async function loader() {
  return json({ staff: mockStaffAccounts })
}

export default function StaffRoute() {
  const { staff } = useLoaderData<typeof loader>()
  return <StaffPage staff={staff as any} />
}
