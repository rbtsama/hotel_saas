/**
 * 平台后台 - 会员查询页面
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { MemberQueryRecord, PaginatedResult } from './types/memberQuery.types'
import { AccountStatusLabels, ObtainMethodLabels } from './types/memberQuery.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'
import { FileDown, Search } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface MembersQueryPageProps {
  paginatedResult: PaginatedResult<MemberQueryRecord>
  currentPage: number
  filters: {
    accountStatus: string
    memberLevel: string
    merchantName?: string
  }
  isExporting: boolean
}

export default function MembersQueryPage({
  paginatedResult,
  currentPage,
  filters,
  isExporting,
}: MembersQueryPageProps) {
  const [selectedAccountStatus, setSelectedAccountStatus] = useState(
    filters.accountStatus || 'all'
  )
  const [selectedMemberLevel, setSelectedMemberLevel] = useState(
    filters.memberLevel || 'all'
  )
  const [merchantNameSearch, setMerchantNameSearch] = useState(
    filters.merchantName || ''
  )

  // 获取账号状态文字颜色
  const getStatusTextClass = (status: string) => {
    switch (status) {
      case 'pre_register':
        return 'text-blue-600'
      case 'registered':
        return 'text-green-600'
      case 'disabled':
        return 'text-red-600'
      default:
        return 'text-slate-600'
    }
  }

  // 生成分页链接
  const getPaginationItems = () => {
    const { totalPages } = paginatedResult
    const maxVisiblePages = 5
    const items = []

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink href={`?page=1&accountStatus=${selectedAccountStatus}&memberLevel=${selectedMemberLevel}${merchantNameSearch ? `&merchantName=${encodeURIComponent(merchantNameSearch)}` : ''}`}>
            1
          </PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`?page=${i}&accountStatus=${selectedAccountStatus}&memberLevel=${selectedMemberLevel}${merchantNameSearch ? `&merchantName=${encodeURIComponent(merchantNameSearch)}` : ''}`}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href={`?page=${totalPages}&accountStatus=${selectedAccountStatus}&memberLevel=${selectedMemberLevel}${merchantNameSearch ? `&merchantName=${encodeURIComponent(merchantNameSearch)}` : ''}`}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* 页面标题 */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">会员查询</h1>
            <p className="text-sm text-slate-600 mt-1">
              展示所有会员数据，支持查看预注册、正式注册的账户
            </p>
          </div>

          {/* 搜索和筛选 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">
                搜索筛选
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Form method="get" className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  {/* 关联商户搜索 */}
                  <div>
                    <Label htmlFor="merchantName" className="text-sm font-medium text-slate-700">
                      关联商户
                    </Label>
                    <Input
                      id="merchantName"
                      name="merchantName"
                      value={merchantNameSearch}
                      onChange={(e) => setMerchantNameSearch(e.target.value)}
                      placeholder="搜索商户名称"
                      className="h-9 mt-1.5 border-slate-300"
                    />
                  </div>

                  {/* 账号状态筛选 */}
                  <div>
                    <Label htmlFor="accountStatus" className="text-sm font-medium text-slate-700">
                      账号状态
                    </Label>
                    <Select
                      name="accountStatus"
                      value={selectedAccountStatus}
                      onValueChange={setSelectedAccountStatus}
                    >
                      <SelectTrigger className="h-9 mt-1.5 border-slate-300">
                        <SelectValue placeholder="全部状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部状态</SelectItem>
                        <SelectItem value="pre_register">预注册</SelectItem>
                        <SelectItem value="registered">注册</SelectItem>
                        <SelectItem value="disabled">禁用</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 会员等级筛选 */}
                  <div>
                    <Label htmlFor="memberLevel" className="text-sm font-medium text-slate-700">
                      会员等级
                    </Label>
                    <Select
                      name="memberLevel"
                      value={selectedMemberLevel}
                      onValueChange={setSelectedMemberLevel}
                    >
                      <SelectTrigger className="h-9 mt-1.5 border-slate-300">
                        <SelectValue placeholder="全部等级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部等级</SelectItem>
                        {Array.from({ length: 10 }, (_, i) => i).map((level) => (
                          <SelectItem key={level} value={String(level)}>
                            VIP{level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-end gap-2">
                    <Button
                      type="submit"
                      className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm flex-1"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      搜索
                    </Button>
                  </div>
                </div>
              </Form>
            </CardContent>
          </Card>

          {/* 会员列表 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-slate-900">
                    会员列表
                    <span className="ml-2 text-sm font-normal text-slate-600">
                      共 {paginatedResult.total} 位会员
                    </span>
                  </CardTitle>
                </div>
                {/* 导出按钮 */}
                <Form method="post" action="">
                  <input type="hidden" name="action" value="export" />
                  <input type="hidden" name="accountStatus" value={selectedAccountStatus} />
                  <input type="hidden" name="memberLevel" value={selectedMemberLevel} />
                  <input type="hidden" name="merchantName" value={merchantNameSearch} />
                  <Button
                    type="submit"
                    variant="outline"
                    className="h-9 border-slate-300 hover:border-slate-400 text-slate-700"
                    disabled={isExporting}
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    {isExporting ? '导出中...' : '导出'}
                  </Button>
                </Form>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 bg-slate-50">
                      <TableHead className="text-slate-900 font-semibold">手机号</TableHead>
                      <TableHead className="text-slate-900 font-semibold">账号状态</TableHead>
                      <TableHead className="text-slate-900 font-semibold">会员等级</TableHead>
                      <TableHead className="text-slate-900 font-semibold">正式会员等级</TableHead>
                      <TableHead className="text-slate-900 font-semibold">有效期至</TableHead>
                      <TableHead className="text-slate-900 font-semibold">获得方式</TableHead>
                      <TableHead className="text-slate-900 font-semibold">关联商户</TableHead>
                      <TableHead className="text-slate-900 font-semibold">赠送会员等级</TableHead>
                      <TableHead className="text-slate-900 font-semibold">赠送有效期</TableHead>
                      <TableHead className="text-slate-900 font-semibold">赠送人</TableHead>
                      <TableHead className="text-slate-900 font-semibold">更新时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedResult.list.map((record) => (
                      <TableRow
                        key={record.id}
                        className="hover:bg-slate-50 transition-colors border-slate-200"
                      >
                        <TableCell className="font-medium text-slate-900">{record.phone}</TableCell>
                        <TableCell className={`font-medium ${getStatusTextClass(record.accountStatus)}`}>
                          {AccountStatusLabels[record.accountStatus as keyof typeof AccountStatusLabels]}
                        </TableCell>
                        <TableCell className="text-slate-900">VIP{record.currentLevel}</TableCell>
                        <TableCell className="text-slate-900">VIP{record.formalLevel}</TableCell>
                        <TableCell className="text-slate-900">{record.formalExpiryDate}</TableCell>
                        <TableCell className="text-slate-900">
                          {ObtainMethodLabels[record.obtainMethod as keyof typeof ObtainMethodLabels]}
                        </TableCell>
                        <TableCell className="text-slate-900">{record.relatedMerchant}</TableCell>
                        <TableCell className="text-slate-900">
                          {record.giftLevel === 0 ? '-' : `VIP${record.giftLevel}`}
                        </TableCell>
                        <TableCell className="text-slate-900">{record.giftExpiryDate}</TableCell>
                        <TableCell className="text-slate-900">{record.giftFrom}</TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {record.updatedAt}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {paginatedResult.list.length === 0 && (
                <div className="text-center py-12 text-slate-500">暂无会员数据</div>
              )}

              {/* 分页 */}
              {paginatedResult.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href={
                            currentPage > 1
                              ? `?page=${currentPage - 1}&accountStatus=${selectedAccountStatus}&memberLevel=${selectedMemberLevel}${merchantNameSearch ? `&merchantName=${encodeURIComponent(merchantNameSearch)}` : ''}`
                              : '#'
                          }
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>

                      {getPaginationItems()}

                      <PaginationItem>
                        <PaginationNext
                          href={
                            currentPage < paginatedResult.totalPages
                              ? `?page=${currentPage + 1}&accountStatus=${selectedAccountStatus}&memberLevel=${selectedMemberLevel}${merchantNameSearch ? `&merchantName=${encodeURIComponent(merchantNameSearch)}` : ''}`
                              : '#'
                          }
                          className={
                            currentPage === paginatedResult.totalPages
                              ? 'pointer-events-none opacity-50'
                              : ''
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
