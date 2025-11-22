/**
 * 商户端 - 代客下单订单列表页面
 */

import { useState } from 'react'
import { Link } from '@remix-run/react'
import type { AgentOrder } from './types/agentOrder.types'
import { AgentOrderStatus } from './types/agentOrder.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { Eye, Plus } from 'lucide-react'

interface AgentOrderListPageProps {
  orders: AgentOrder[]
}

const statusLabels: Record<AgentOrderStatus, { label: string; className: string }> = {
  [AgentOrderStatus.PENDING_PAYMENT]: { label: '待支付', className: 'bg-yellow-100 text-yellow-700' },
  [AgentOrderStatus.PAID]: { label: '已支付', className: 'bg-blue-100 text-blue-700' },
  [AgentOrderStatus.CHECKED_IN]: { label: '已入住', className: 'bg-green-100 text-green-700' },
  [AgentOrderStatus.CHECKED_OUT]: { label: '已离店', className: 'bg-slate-100 text-slate-600' },
  [AgentOrderStatus.EXPIRED]: { label: '已过期', className: 'bg-red-100 text-red-700' },
}

export default function AgentOrderListPage({ orders }: AgentOrderListPageProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterDate, setFilterDate] = useState('7days')

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">代客下单订单列表</h1>
              <p className="text-slate-600 mt-1">
                查看所有代客下单订单的状态
              </p>
            </div>
            <Link to="/merchant-backend/agent-order/create">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                创建代客下单
              </Button>
            </Link>
          </div>

          {/* 筛选条件 */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">订单状态：</span>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                      <SelectItem value="pending_payment">待支付</SelectItem>
                      <SelectItem value="paid">已支付</SelectItem>
                      <SelectItem value="checked_in">已入住</SelectItem>
                      <SelectItem value="checked_out">已离店</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">日期：</span>
                  <Select value={filterDate} onValueChange={setFilterDate}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">最近7天</SelectItem>
                      <SelectItem value="30days">最近30天</SelectItem>
                      <SelectItem value="all">全部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>搜索</Button>
                <Button variant="outline">重置</Button>
              </div>
            </CardContent>
          </Card>

          {/* 订单列表 */}
          <Card>
            <CardHeader>
              <CardTitle>订单列表</CardTitle>
              <CardDescription>共 {orders.length} 个订单</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>订单号</TableHead>
                    <TableHead>客户</TableHead>
                    <TableHead>房型</TableHead>
                    <TableHead>入住日期</TableHead>
                    <TableHead className="text-right">金额</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>
                        {order.customerName ? (
                          <div>
                            <div>{order.customerName}</div>
                            <div className="text-xs text-slate-500">{order.customerPhone}</div>
                          </div>
                        ) : (
                          <span className="text-slate-400">待支付</span>
                        )}
                      </TableCell>
                      <TableCell>{order.roomTypeName}</TableCell>
                      <TableCell className="text-sm">
                        {order.checkInDate} 至<br />{order.checkOutDate}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-secondary">
                        ¥{order.specialPrice}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusLabels[order.status].className}>
                          {statusLabels[order.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/merchant-backend/agent-order/${order.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
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
