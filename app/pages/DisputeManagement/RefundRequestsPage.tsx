/**
 * 退款申请管理页面
 */

import { useState } from 'react'
import type { RefundRequest } from './types/dispute.types'
import { RefundStatus } from './types/dispute.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Select } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { ExternalLink } from 'lucide-react'
import MainLayout from '../PointsSystem/components/MainLayout'

interface RefundRequestsPageProps {
  requests: RefundRequest[]
}

const statusLabels: Record<RefundStatus, string> = {
  [RefundStatus.PENDING_MERCHANT]: '待商家处理',
  [RefundStatus.NEGOTIATING]: '协商中',
  [RefundStatus.MERCHANT_REJECTED]: '商家拒绝',
  [RefundStatus.ARBITRATING]: '仲裁中',
  [RefundStatus.COMPLETED]: '已完成',
  [RefundStatus.REJECTED]: '已驳回',
  [RefundStatus.USER_WITHDRAWN]: '用户已撤诉',
}

const statusColors: Record<RefundStatus, string> = {
  [RefundStatus.PENDING_MERCHANT]: 'bg-yellow-100 text-yellow-700',
  [RefundStatus.NEGOTIATING]: 'bg-blue-100 text-blue-700',
  [RefundStatus.MERCHANT_REJECTED]: 'bg-orange-100 text-orange-700',
  [RefundStatus.ARBITRATING]: 'bg-purple-100 text-purple-700',
  [RefundStatus.COMPLETED]: 'bg-green-100 text-green-700',
  [RefundStatus.REJECTED]: 'bg-red-100 text-red-700',
  [RefundStatus.USER_WITHDRAWN]: 'bg-slate-100 text-slate-600',
}

export default function RefundRequestsPage({ requests }: RefundRequestsPageProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredRequests = selectedStatus === 'all'
    ? requests
    : requests.filter((r) => r.status === selectedStatus)

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">退款申请管理</h1>
          <p className="text-sm text-slate-500 mt-1">
            管理用户退款申请,跟踪商家协商和仲裁流程
          </p>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  按状态筛选
                </label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">全部状态</option>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-sm text-slate-600">
                  共 <span className="font-bold text-slate-900">{filteredRequests.length}</span> 条
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 退款申请列表 */}
        <Card>
          <CardHeader>
            <CardTitle>退款申请列表</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                暂无退款申请
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>订单号</TableHead>
                    <TableHead>酒店</TableHead>
                    <TableHead>用户</TableHead>
                    <TableHead>退款金额</TableHead>
                    <TableHead>退款比例</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>申请时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-mono text-sm">
                        {request.orderNumber}
                      </TableCell>
                      <TableCell>{request.hotelName}</TableCell>
                      <TableCell>
                        <div>{request.userName}</div>
                        <div className="text-xs text-slate-500">{request.userPhone}</div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ¥{request.refundAmount}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{request.refundRatio}%</span>
                        <div className="text-xs text-slate-500">
                          实付¥{request.actualPaid}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusColors[request.status]}`}>
                          {statusLabels[request.status]}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {request.createdAt}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          查看详情
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </MainLayout>
  )
}
