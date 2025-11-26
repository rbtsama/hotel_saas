/**
 * 平台后台 - 会员邀请记录页面
 */

import { useState } from 'react'
import type { MemberInvitationRecord } from './types/memberInvitation.types'
import { Card, CardContent } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface MemberInvitationPageProps {
  invitations: MemberInvitationRecord[]
}

export default function MemberInvitationPage({ invitations }: MemberInvitationPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [jumpPage, setJumpPage] = useState('')

  // 计算分页
  const totalItems = invitations.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentInvitations = invitations.slice(startIndex, endIndex)

  // 生成页码数组
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages + 2) {
      // 页数较少时，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 页数较多时，显示省略号
      if (currentPage <= 3) {
        // 当前页靠近开头
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // 当前页靠近结尾
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        // 当前页在中间
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1) // 重置到第一页
  }

  const handleJumpPage = () => {
    const page = parseInt(jumpPage, 10)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setJumpPage('')
    }
  }

  const handleJumpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJumpPage()
    }
  }

  const getRoleText = (role: 'user' | 'merchant') => {
    return role === 'user' ? '用户' : '商户'
  }

  const getVipLevelText = (level: number) => {
    return `VIP${level}`
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* 页面标题 */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">会员邀请记录</h1>
          </div>

          {/* 邀请记录列表 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-200">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="min-w-[100px] text-slate-900 font-semibold">邀请角色</TableHead>
                    <TableHead className="min-w-[120px] text-slate-900 font-semibold">邀请人</TableHead>
                    <TableHead className="min-w-[120px] text-slate-900 font-semibold">受邀人</TableHead>
                    <TableHead className="min-w-[100px] text-slate-900 font-semibold">VIP等级</TableHead>
                    <TableHead className="min-w-[180px] text-slate-900 font-semibold">VIP获得时间</TableHead>
                    <TableHead className="min-w-[180px] text-slate-900 font-semibold">受邀人注册时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentInvitations.map((record) => (
                    <TableRow key={record.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                      <TableCell className="text-sm text-slate-900">{getRoleText(record.inviterRole)}</TableCell>
                      <TableCell className="text-sm text-slate-900 font-medium">
                        {record.inviterId}
                      </TableCell>
                      <TableCell className="text-sm text-slate-900 font-medium">{record.inviteeId}</TableCell>
                      <TableCell className="text-sm text-slate-900">{getVipLevelText(record.vipLevel)}</TableCell>
                      <TableCell className="text-sm text-slate-900">{record.invitedAt}</TableCell>
                      <TableCell className="text-sm text-slate-900">{record.userRegisteredAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {invitations.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  暂无邀请记录
                </div>
              )}
            </CardContent>
          </Card>

          {/* 专业分页组件 */}
          {totalItems > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-lg border border-slate-200 p-4">
              {/* 左侧：统计信息 */}
              <div className="text-sm text-slate-600">
                共 <span className="font-medium text-slate-900">{totalItems}</span> 条记录，
                显示第 <span className="font-medium text-slate-900">{startIndex + 1}</span> - <span className="font-medium text-slate-900">{endIndex}</span> 条
              </div>

              {/* 中间：分页按钮 */}
              <div className="flex items-center gap-1">
                {/* 首页 */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0 border-slate-300 hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50"
                  title="首页"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* 上一页 */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0 border-slate-300 hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50"
                  title="上一页"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* 页码按钮 */}
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-slate-400">...</span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page as number)}
                      className={`h-8 w-8 p-0 ${
                        currentPage === page
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </Button>
                  )
                ))}

                {/* 下一页 */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0 border-slate-300 hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50"
                  title="下一页"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* 末页 */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0 border-slate-300 hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50"
                  title="末页"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>

              {/* 右侧：每页条数 + 跳转 */}
              <div className="flex items-center gap-4">
                {/* 每页条数 */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">每页</span>
                  <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
                    <SelectTrigger className="h-8 w-20 border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-slate-600">条</span>
                </div>

                {/* 跳转 */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">跳至</span>
                  <Input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={jumpPage}
                    onChange={(e) => setJumpPage(e.target.value)}
                    onKeyDown={handleJumpKeyDown}
                    placeholder=""
                    className="h-8 w-16 text-center border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                  />
                  <span className="text-sm text-slate-600">页</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleJumpPage}
                    className="h-8 px-3 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                  >
                    确定
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
