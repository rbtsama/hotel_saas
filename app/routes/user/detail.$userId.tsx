import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import UserDetailPage from '~/pages/UserManagement/UserDetailPage'
import { mockUserDetails } from '~/pages/UserManagement/services/mocks'

export async function loader({ params }: LoaderFunctionArgs) {
  const userId = params.userId
  const user = userId ? mockUserDetails[userId] : null

  if (!user) {
    throw new Response('User not found', { status: 404 })
  }

  return json({ user })
}

export default function UserDetailRoute() {
  const { user } = useLoaderData<typeof loader>()
  return <UserDetailPage user={user as any} />
}
