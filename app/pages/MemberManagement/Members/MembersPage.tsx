import { useState } from 'react'
import { Form, Link, useNavigate } from '@remix-run/react'
import type { MemberListResponse } from './types/members.types'
import { MEMBER_LEVEL_LABELS } from './types/members.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Search, UserCheck, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '~/lib/utils'
import { useViewMode } from '~/contexts/ViewModeContext'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'

interface MembersPageProps {
  result: MemberListResponse | null
  error: string | null
}

export default function MembersPage({ result, error }: MembersPageProps) {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [level, setLevel] = useState('')
  const [isPointsMember, setIsPointsMember] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const members = result?.members || []
  const currentPage = result?.page || 1
  const totalPages = result?.totalPages || 1
  const total = result?.total || 0

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', String(page))
    navigate(`?${params.toString()}`)
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar menuItems={menuConfig} />
        <div className="flex-1 p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </div>
    )
  }

  const mainContent = (
    <div className="p-6 space-y-6">
      {/* 筛选表单 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <Form method="get" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {/* 注册日期 */}
              <div className="space-y-2 col-span-2">
                <label className="text-sm text-slate-900 font-medium">注册日期</label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="开始日期"
                    className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <span>-</span>
                  <Input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="结束日期"
                    className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* 电话 */}
              <div className="space-y-2">
                <label className="text-sm text-slate-900 font-medium">电话</label>
                <Input
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入电话"
                  className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* 等级 */}
              <div className="space-y-2">
                <label className="text-sm text-slate-900 font-medium">等级</label>
                <Select name="level" value={level} onValueChange={setLevel}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="请选择等级" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="注册会员">注册会员</SelectItem>
                    <SelectItem value="VIP1">VIP1</SelectItem>
                    <SelectItem value="VIP2">VIP2</SelectItem>
                    <SelectItem value="VIP3">VIP3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 是否积分会员 */}
              <div className="space-y-2">
                <label className="text-sm text-slate-900 font-medium">是否积分会员</label>
                <Select name="isPointsMember" value={isPointsMember} onValueChange={setIsPointsMember}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="请选择是否积分会员" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="true">是</SelectItem>
                    <SelectItem value="false">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="h-9 bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" />
                搜索
              </Button>
              <Button type="button" variant="outline" onClick={() => window.location.href = '/member-management/members'} className="h-9">
                重置
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* 导入会员按钮 */}
      <div className="flex gap-2">
        <Button variant="destructive" className="h-9">
          <UserCheck className="h-4 w-4 mr-2" />
          导入会员
        </Button>
        <Button variant="outline" className="h-9 text-orange-600 border-orange-600 hover:bg-orange-50">
          <Users className="h-4 w-4 mr-2" />
          清除会员
        </Button>
      </div>

      {/* 会员列表 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-slate-900 font-semibold">注册时间</TableHead>
                <TableHead className="text-slate-900 font-semibold">昵称</TableHead>
                <TableHead className="text-slate-900 font-semibold">姓名</TableHead>
                <TableHead className="text-slate-900 font-semibold">电话</TableHead>
                <TableHead className="text-slate-900 font-semibold">等级</TableHead>
                <TableHead className="text-center text-slate-900 font-semibold">订单数</TableHead>
                <TableHead className="text-center text-slate-900 font-semibold">间夜数</TableHead>
                <TableHead className="text-center text-slate-900 font-semibold">消费金额</TableHead>
                <TableHead className="text-center text-slate-900 font-semibold">是否积分会员</TableHead>
                <TableHead className="text-right text-slate-900 font-semibold">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="text-sm text-slate-900">{member.registrationTime}</TableCell>
                  <TableCell className="text-slate-700">{member.nickname || '-'}</TableCell>
                  <TableCell className="text-slate-700">{member.name || '-'}</TableCell>
                  <TableCell className="text-slate-900 font-medium">{member.phone}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        MEMBER_LEVEL_LABELS[member.level].color
                      )}
                    >
                      {MEMBER_LEVEL_LABELS[member.level].label}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-slate-700">{member.orderCount}</TableCell>
                  <TableCell className="text-center text-slate-700">{member.nightCount}</TableCell>
                  <TableCell className="text-center font-semibold text-slate-900">{member.consumptionAmount}</TableCell>
                  <TableCell className="text-center text-slate-700">
                    {member.isPointsMember ? '是' : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/member-management/members/${member.id}`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          查
                        </Button>
                      </Link>
                      <Link to={`/member-management/members/${member.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          拉黑
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {members.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              暂无会员数据
            </div>
          )}

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                共 {total} 条，10条/页
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  )
                })}
                {totalPages > 6 && <span className="text-muted-foreground">...</span>}
                {totalPages > 6 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-sm text-muted-foreground">前往</span>
                  <Input
                    type="number"
                    min={1}
                    max={totalPages}
                    defaultValue={currentPage}
                    className="w-16 h-8 text-center"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const value = parseInt(e.currentTarget.value)
                        if (value >= 1 && value <= totalPages) {
                          handlePageChange(value)
                        }
                      }
                    }}
                  />
                  <span className="text-sm text-muted-foreground">页</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto">
        {mainContent}
      </div>
    </div>
  )
}
