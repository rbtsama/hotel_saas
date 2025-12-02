/**
 * 平台后台 - 会员查询路由
 */

import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, useActionData } from '@remix-run/react'
import MembersQueryPage from '~/pages/PlatformAdmin/MemberManagement/MembersQueryPage'
import MemberQueryService from '~/pages/PlatformAdmin/MemberManagement/services/memberQuery.service'
import type { MemberQueryFilterParams } from '~/pages/PlatformAdmin/MemberManagement/types/memberQuery.types'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const accountStatus = url.searchParams.get('accountStatus') || 'all'
  const memberLevel = url.searchParams.get('memberLevel') || 'all'
  const merchantName = url.searchParams.get('merchantName') || undefined

  try {
    // 构建筛选参数
    const filter: MemberQueryFilterParams = {
      accountStatus: accountStatus === 'all' ? 'all' : (accountStatus as any),
      memberLevel:
        memberLevel === 'all' ? 'all' : parseInt(memberLevel, 10),
      merchantName,
    }

    // 获取分页数据
    const paginatedResult = await MemberQueryService.getMembers({
      filter,
      page,
      pageSize: 10,
    })

    return json({
      paginatedResult,
      currentPage: page,
      filters: {
        accountStatus,
        memberLevel,
        merchantName,
      },
      isExporting: false,
    })
  } catch (error) {
    console.error('Failed to load members:', error)
    return json(
      {
        paginatedResult: {
          list: [],
          total: 0,
          page: 1,
          pageSize: 10,
          totalPages: 0,
        },
        currentPage: 1,
        filters: {
          accountStatus: 'all',
          memberLevel: 'all',
          merchantName: undefined,
        },
        isExporting: false,
        error: '加载数据失败',
      },
      { status: 500 }
    )
  }
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const formData = await request.formData()
    const action = formData.get('action')

    if (action === 'export') {
      const accountStatus = formData.get('accountStatus') as string
      const memberLevel = formData.get('memberLevel') as string
      const merchantName = formData.get('merchantName') as string | undefined

      // 构建筛选参数
      const filter: MemberQueryFilterParams = {
        accountStatus: accountStatus === 'all' ? 'all' : (accountStatus as any),
        memberLevel:
          memberLevel === 'all' ? 'all' : parseInt(memberLevel, 10),
        merchantName: merchantName || undefined,
      }

      // 生成导出数据
      const csvBlob = await MemberQueryService.exportMembers(filter)

      // 返回文件
      return new Response(csvBlob, {
        headers: {
          'Content-Type': 'text/csv;charset=utf-8;',
          'Content-Disposition': 'attachment; filename="members_export.csv"',
        },
      })
    }

    return json({ error: 'Unknown action' }, { status: 400 })
  } catch (error) {
    console.error('Export failed:', error)
    return json({ error: '导出失败' }, { status: 500 })
  }
}

export default function MembersQueryRoute() {
  const loaderData = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  return (
    <MembersQueryPage
      paginatedResult={loaderData.paginatedResult}
      currentPage={loaderData.currentPage}
      filters={loaderData.filters}
      isExporting={false}
    />
  )
}
