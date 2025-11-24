/**
 * 平台后台 - 用户搜索路由（精确匹配用户ID或手机号）
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import UserSearchPage from '~/pages/PlatformAdmin/UserManagement/UserSearchPage'
import { mockUsers, mockUserDetails } from '~/pages/PlatformAdmin/UserManagement/services/mocks/user.mock'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search') || undefined

  try {
    let userDetail = null

    // 精确匹配用户ID或手机号
    if (search) {
      const searchTrim = search.trim()
      const foundUser = mockUsers.find(
        (user) => user.userId === searchTrim || user.phone === searchTrim
      )

      if (foundUser) {
        userDetail = mockUserDetails[foundUser.userId] || null
      }
    }

    return json({ userDetail, searchQuery: search || '' })
  } catch (error) {
    return json({ userDetail: null, searchQuery: search || '' }, { status: 500 })
  }
}

export default function UserSearchRoute() {
  const { userDetail, searchQuery } = useLoaderData<typeof loader>()
  return <UserSearchPage userDetail={userDetail} searchQuery={searchQuery} />
}
