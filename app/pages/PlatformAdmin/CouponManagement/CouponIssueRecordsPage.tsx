/**
 * 优惠券发放记录页面
 */

import { Link } from '@remix-run/react'
import type { CouponRecord } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '~/components/ui/pagination'
import { ArrowLeft } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface CouponIssueRecordsPageProps {
  records: CouponRecord[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  error: string | null
}

export default function CouponIssueRecordsPage({
  records,
  total,
  page,
  pageSize,
  totalPages,
  error
}: CouponIssueRecordsPageProps) {
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
              <CardTitle className="text-lg font-semibold text-slate-900">优惠券发放记录</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="text-slate-900 font-semibold">优惠券</TableHead>
                  <TableHead className="text-slate-900 font-semibold">发放方式</TableHead>
                  <TableHead className="text-slate-900 font-semibold">目标用户</TableHead>
                  <TableHead className="text-slate-900 font-semibold">发放数量</TableHead>
                  <TableHead className="text-slate-900 font-semibold">发放时间</TableHead>
                  <TableHead className="text-slate-900 font-semibold">操作人</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                    <TableCell className="text-slate-900">{record.couponId}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-slate-300">
                        {record.distributionType === 'manual_phone' ? '手机号' :
                         record.distributionType === 'manual_vip' ? 'VIP等级' : '自动发放'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-900 text-sm max-w-[200px] truncate">
                      {record.targetUsers}
                    </TableCell>
                    <TableCell className="text-slate-900">{record.count || 1}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{record.createdAt}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{record.createdBy}</TableCell>
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
