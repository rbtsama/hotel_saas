/**
 * 酒店政策路由
 */

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import StorePolicyPage from '~/pages/HotelBackend/StorePolicyPage'
import { mockHotelPolicy } from '~/pages/HotelBackend/services/mocks'

export async function loader() {
  return json({ policy: mockHotelPolicy })
}

export default function StorePolicyRoute() {
  const { policy } = useLoaderData<typeof loader>()
  return <StorePolicyPage policy={policy as any} />
}
