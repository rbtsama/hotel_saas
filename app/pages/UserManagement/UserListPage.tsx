/**
 * 用户列表页面
 */

import { useState } from 'react'
import { Link } from '@remix-run/react'
import type { UserListItem } from './types/user.types'
import { MemberLevel, UserStatus } from './types/user.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import MainLayout from '../PointsSystem/components/MainLayout'

interface UserListPageProps {
  users: UserListItem[]
}

const memberLevelColors: Record<MemberLevel, string> = {
  [MemberLevel.DIAMOND]: 'bg-purple-100 text-purple-700 border-purple-300',
  [MemberLevel.GOLD]: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  [MemberLevel.SILVER]: 'bg-slate-100 text-slate-700 border-slate-300',
  [MemberLevel.NORMAL]: 'bg-slate-50 text-slate-600 border-slate-200',
}

const statusColors: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'bg-green-100 text-green-700',
  [UserStatus.FROZEN]: 'bg-orange-100 text-orange-700',
  [UserStatus.BANNED]: 'bg-red-100 text-red-700',
}

const statusLabels: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: '正常',
  [UserStatus.FROZEN]: '冻结',
  [UserStatus.BANNED]: '封禁',
}

export default function UserListPage({ users }: UserListPageProps) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')

  const filteredUsers = users.filter((user) => {
    const matchKeyword =
      searchKeyword === '' ||
      user.name.includes(searchKeyword) ||
      user.phone.includes(searchKeyword)

    const matchLevel =
      selectedLevel === 'all' || user.memberLevel === selectedLevel

    return matchKeyword && matchLevel
  })

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">用户管理</h1>
          <p className="text-sm text-slate-500 mt-1">
            查看和管理平台用户信息,包括会员等级、积分、订单等数据
          </p>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="搜索用户(姓名/手机号)"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-slate-300 rounded-md"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="all">全部等级</option>
                <option value={MemberLevel.DIAMOND}>钻石会员</option>
                <option value={MemberLevel.GOLD}>金卡会员</option>
                <option value={MemberLevel.SILVER}>银卡会员</option>
                <option value={MemberLevel.NORMAL}>普通会员</option>
              </select>
              <div className="text-sm text-slate-600 flex items-center">
                共 <span className="font-bold text-slate-900 mx-1">{filteredUsers.length}</span> 个用户
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 用户列表 */}
        <Card>
          <CardHeader>
            <CardTitle>用户列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>用户信息</TableHead>
                  <TableHead>会员等级</TableHead>
                  <TableHead>积分余额</TableHead>
                  <TableHead>订单统计</TableHead>
                  <TableHead>消费金额</TableHead>
                  <TableHead>注册时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    {/* 用户信息 */}
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.phone}</div>
                      </div>
                    </TableCell>

                    {/* 会员等级 */}
                    <TableCell>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${
                          memberLevelColors[user.memberLevel]
                        }`}
                      >
                        {user.memberLevelName}
                      </span>
                    </TableCell>

                    {/* 积分余额 */}
                    <TableCell className="font-semibold text-blue-600">
                      {user.pointsBalance.toLocaleString()}
                    </TableCell>

                    {/* 订单统计 */}
                    <TableCell className="text-sm text-slate-600">
                      {user.totalOrders} 单
                    </TableCell>

                    {/* 消费金额 */}
                    <TableCell className="font-semibold">
                      ¥{user.totalAmount.toLocaleString()}
                    </TableCell>

                    {/* 注册时间 */}
                    <TableCell className="text-xs text-slate-500">
                      {user.registeredAt}
                    </TableCell>

                    {/* 状态 */}
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          statusColors[user.status]
                        }`}
                      >
                        {statusLabels[user.status]}
                      </span>
                    </TableCell>

                    {/* 操作 */}
                    <TableCell>
                      <Link to={`/user/detail/${user.id}`}>
                        <Button variant="outline" size="sm">
                          查看详情
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>
      </div>
    </MainLayout>
  )
}
