import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import StoreBreakfastPage from '~/pages/HotelBackend/StoreBreakfastPage'
import { mockBreakfastPolicy } from '~/pages/HotelBackend/services/mocks/breakfast.mock'

export async function loader() {
  return json({ policy: mockBreakfastPolicy })
}

export default function StoreBreakfastRoute() {
  const { policy } = useLoaderData<typeof loader>()
  return <StoreBreakfastPage policy={policy as any} />
}
