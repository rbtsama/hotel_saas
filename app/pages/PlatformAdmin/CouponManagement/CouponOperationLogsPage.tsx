/**
 * 优惠券操作记录页面 - 优惠券本身的CRUD操作记录
 */

import { Link } from '@remix-run/react'
import type { CouponOperationLog } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '~/components/ui/pagination'
import { ArrowLeft } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface CouponOperationLogsPageProps {
  logs: CouponOperationLog[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  error: string | null
}

export default function CouponOperationLogsPage({
  logs,
  total,
  page,
  pageSize,
  totalPages,
  error
}: CouponOperationLogsPageProps) {
  const getOperationTypeName = (type: string) => {
    const map: Record<string, string> = {
      create: '创建',
      edit: '编辑',
      enable: '启用',
      disable: '停用',
      delete: '删除',
    }
    return map[type] || type
  }

  const getOperationTypeColor = (type: string) => {
    const map: Record<string, string> = {
      create: 'bg-green-50 text-green-700 border-green-300',
      edit: 'bg-blue-50 text-blue-700 border-blue-300',
      enable: 'bg-green-50 text-green-700 border-green-300',
      disable: 'bg-orange-50 text-orange-700 border-orange-300',
      delete: 'bg-red-50 text-red-700 border-red-300',
    }
    return map[type] || 'bg-slate-50 text-slate-700 border-slate-300'
  }
  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            错误: {error}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Link to="/platform-admin/coupon-management/issue">
                <Button variant="outline" size="sm" className="h-8 border-slate-300">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  返回
                </Button>
              </Link>
              <CardTitle className="text-lg font-semibold text-slate-900">优惠券操作记录</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="text-slate-900 font-semibold">优惠券ID</TableHead>
                  <TableHead className="text-slate-900 font-semibold">优惠券名称</TableHead>
                  <TableHead className="text-slate-900 font-semibold">操作类型</TableHead>
                  <TableHead className="text-slate-900 font-semibold">操作描述</TableHead>
                  <TableHead className="text-slate-900 font-semibold">操作时间</TableHead>
                  <TableHead className="text-slate-900 font-semibold">操作人</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                    <TableCell className="text-slate-900 font-medium">{log.couponId}</TableCell>
                    <TableCell className="text-slate-900">{log.couponName || '-'}</TableCell>
                    <TableCell>
                      <Badge className={getOperationTypeColor(log.operationType)}>
                        {getOperationTypeName(log.operationType)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-900 text-sm">{log.description}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{log.operatedAt}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{log.operatedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* 统计和分页 */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-600">共 {total} 条</div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={page > 1 ? `?page=${page - 1}` : '#'}
                        className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink href={`?page=${p}`} isActive={p === page}>
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href={page < totalPages ? `?page=${page + 1}` : '#'}
                        className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
