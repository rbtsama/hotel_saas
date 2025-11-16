import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import UserListPage from '~/pages/UserManagement/UserListPage'
import { mockUserList } from '~/pages/UserManagement/services/mocks'

export async function loader() {
  return json({ users: mockUserList })
}

export default function UserListRoute() {
  const { users } = useLoaderData<typeof loader>()
  return <UserListPage users={users as any} />
}
