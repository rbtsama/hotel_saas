/**
 * 平台后台 - 用户会员等级管理页面
 */

import { useState } from 'react'
import { Link } from '@remix-run/react'
import type { UserMemberInfo } from './types/member.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Badge } from '~/components/ui/badge'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { Search, Eye } from 'lucide-react'

interface UserMemberManagementPageProps {
  users: UserMemberInfo[]
  total: number
}

export default function UserMemberManagementPage({
  users,
  total,
}: UserMemberManagementPageProps) {
  const [searchPhone, setSearchPhone] = useState('')
  const [filterLevel, setFilterLevel] = useState<string>('all')

  // VIP等级徽章颜色
  const getLevelBadgeClass = (level: number) => {
    if (level === 0) return 'bg-slate-100 text-slate-600'
    if (level <= 2) return 'bg-blue-100 text-blue-700'
    if (level <= 5) return 'bg-purple-100 text-purple-700'
    return 'bg-amber-100 text-amber-700'
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* 搜索筛选 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-[200px]">
                <Input
                  id="searchPhone"
                  placeholder="输入手机号"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="w-[160px]">
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="h-9 border-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部等级</SelectItem>
                    <SelectItem value="0">VIP0</SelectItem>
                    <SelectItem value="1">VIP1</SelectItem>
                    <SelectItem value="2">VIP2</SelectItem>
                    <SelectItem value="3">VIP3</SelectItem>
                    <SelectItem value="4">VIP4</SelectItem>
                    <SelectItem value="5">VIP5</SelectItem>
                    <SelectItem value="6">VIP6</SelectItem>
                    <SelectItem value="7">VIP7</SelectItem>
                    <SelectItem value="8">VIP8</SelectItem>
                    <SelectItem value="9">VIP9</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[200px]">
                <Input
                  id="searchMerchant"
                  placeholder="输入关联商户"
                  className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <Button className="h-9 bg-blue-600 hover:bg-blue-700 font-medium shadow-sm">
                <Search className="w-4 h-4 mr-2" />
                搜索
              </Button>
              <Button variant="outline" className="h-9 border-slate-300">
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 用户列表 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-900">用户列表 (共{total}位)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-slate-900 font-semibold">手机号</TableHead>
                  <TableHead className="text-slate-900 font-semibold">姓名</TableHead>
                  <TableHead className="text-slate-900 font-semibold">会员等级</TableHead>
                  <TableHead className="text-slate-900 font-semibold">累计间夜</TableHead>
                  <TableHead className="text-slate-900 font-semibold">保级进度</TableHead>
                  <TableHead className="text-slate-900 font-semibold">有效期至</TableHead>
                  <TableHead className="text-slate-900 font-semibold">积分</TableHead>
                  <TableHead className="text-right text-slate-900 font-semibold">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userId} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium text-slate-900">{user.phone}</TableCell>
                    <TableCell className="text-slate-700">{user.userName}</TableCell>
                    <TableCell>
                      <Badge className={`${getLevelBadgeClass(user.currentLevel)} border-0`}>
                        {user.currentLevelName}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-blue-600">{user.totalNights}</span>
                      <span className="text-slate-500 text-sm ml-1">晚</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-700">
                        {user.maintainNights} 晚
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-900">
                      {user.validityDate}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-blue-600">{user.pointsBalance}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/platform-admin/member-management/user/${user.userId}`}>
                        <Button variant="ghost" size="sm" className="gap-1 hover:bg-slate-100">
                          <Eye className="w-4 h-4" />
                          详情
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
