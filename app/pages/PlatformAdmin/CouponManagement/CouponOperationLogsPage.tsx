/**
 * 平台后台 - 优惠券操作记录页面
 */

import { Link } from '@remix-run/react'
import type { CouponOperationLog } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface CouponOperationLogsPageProps {
  logs: CouponOperationLog[]
  error: string | null
}

export default function CouponOperationLogsPage({ logs, error }: CouponOperationLogsPageProps) {
  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
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
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/platform-admin/coupon-management/list">
                <Button variant="outline" size="sm" className="h-8">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  返回
                </Button>
              </Link>
              <CardTitle className="text-lg font-semibold text-slate-900">操作记录</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 bg-slate-50">
                    <TableHead className="text-slate-600 font-semibold">优惠券ID</TableHead>
                    <TableHead className="text-slate-600 font-semibold text-center">操作</TableHead>
                    <TableHead className="text-slate-600 font-semibold">操作内容</TableHead>
                    <TableHead className="text-slate-600 font-semibold">操作时间</TableHead>
                    <TableHead className="text-slate-600 font-semibold">操作人</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                        暂无操作记录
                      </TableCell>
                    </TableRow>
                  ) : (
                    logs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="text-slate-900 font-medium">{log.couponId}</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={log.operationType === 'create'
                              ? 'bg-green-50 text-green-700 border-green-300 border'
                              : 'bg-blue-50 text-blue-700 border-blue-300 border'
                            }
                          >
                            {log.operationType === 'create' ? '创建' : '编辑'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-900">
                          <div className="whitespace-pre-line">{log.operationContent}</div>
                        </TableCell>
                        <TableCell className="text-slate-600 text-sm">{log.operatedAt}</TableCell>
                        <TableCell className="text-slate-600 text-sm">{log.operatedBy}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
