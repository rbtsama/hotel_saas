/**
 * 订单列表页面
 */

import { useState } from 'react'
import { Link } from '@remix-run/react'
import type { Order } from './types/order.types'
import { OrderStatus } from './types/order.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'

interface OrderListPageProps {
  orders: Order[]
  error?: string | null
}

const orderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.PENDING_PAYMENT]: '待支付',
  [OrderStatus.PENDING_CONFIRM]: '待确认',
  [OrderStatus.PENDING_CHECKIN]: '待入住',
  [OrderStatus.CHECKED_IN]: '已入住',
  [OrderStatus.COMPLETED]: '已完成',
  [OrderStatus.CANCELLED]: '已取消'
}

const getStatusColor = (status: OrderStatus) => {
  const colors: Record<OrderStatus, string> = {
    [OrderStatus.PENDING_PAYMENT]: 'bg-yellow-100 text-yellow-700',
    [OrderStatus.PENDING_CONFIRM]: 'bg-blue-100 text-blue-700',
    [OrderStatus.PENDING_CHECKIN]: 'bg-purple-100 text-purple-700',
    [OrderStatus.CHECKED_IN]: 'bg-green-100 text-green-700',
    [OrderStatus.COMPLETED]: 'bg-slate-100 text-slate-600',
    [OrderStatus.CANCELLED]: 'bg-red-100 text-red-700'
  }
  return colors[status]
}

const OperationLogButton = ({ moduleName }: { moduleName: string }) => (
  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-900">
    📋 {moduleName}操作记录
  </Button>
)


export default function OrderListPage({ orders, error }: OrderListPageProps) {
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all')
  const [searchKeyword, setSearchKeyword] = useState('')

  const filteredOrders = orders.filter(order => {
    if (filterStatus !== 'all' && order.status !== filterStatus) return false
    if (searchKeyword && !order.orderId.includes(searchKeyword) && !order.userName.includes(searchKeyword)) return false
    return true
  })

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">订单列表</h1>
                <p className="text-sm text-slate-500 mt-1">
                  管理平台所有订单
                </p>
              </div>
              <OperationLogButton moduleName="订单列表" />
            </div>

            {/* 筛选栏 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="all">全部状态</option>
                    <option value={OrderStatus.PENDING_PAYMENT}>待支付</option>
                    <option value={OrderStatus.PENDING_CONFIRM}>待确认</option>
                    <option value={OrderStatus.PENDING_CHECKIN}>待入住</option>
                    <option value={OrderStatus.CHECKED_IN}>已入住</option>
                    <option value={OrderStatus.COMPLETED}>已完成</option>
                    <option value={OrderStatus.CANCELLED}>已取消</option>
                  </select>

                  <Input
                    placeholder="搜索订单号或用户名..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="flex-1"
                  />

                  <Button variant="outline">导出订单</Button>
                </div>
              </CardContent>
            </Card>

            {/* 订单列表 */}
            <Card>
              <CardHeader>
                <CardTitle>订单列表</CardTitle>
                <CardDescription>共 {filteredOrders.length} 个订单</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div>订单号</div>
                        <div className="text-xs text-muted-foreground font-normal">唯一订单编号</div>
                      </TableHead>
                      <TableHead>
                        <div>下单时间</div>
                        <div className="text-xs text-muted-foreground font-normal">创建订单时间</div>
                      </TableHead>
                      <TableHead>
                        <div>房客</div>
                        <div className="text-xs text-muted-foreground font-normal">用户姓名和手机</div>
                      </TableHead>
                      <TableHead>
                        <div>酒店</div>
                        <div className="text-xs text-muted-foreground font-normal">酒店名称和房型</div>
                      </TableHead>
                      <TableHead>
                        <div>入住日期</div>
                        <div className="text-xs text-muted-foreground font-normal">入住-退房时间</div>
                      </TableHead>
                      <TableHead>
                        <div>间夜</div>
                        <div className="text-xs text-muted-foreground font-normal">入住天数</div>
                      </TableHead>
                      <TableHead className="text-right">
                        <div>实付金额</div>
                        <div className="text-xs text-muted-foreground font-normal">用户实际支付</div>
                      </TableHead>
                      <TableHead>
                        <div>状态</div>
                        <div className="text-xs text-muted-foreground font-normal">订单当前状态</div>
                      </TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.orderId}>
                        <TableCell className="font-mono text-sm text-blue-600">{order.orderId}</TableCell>
                        <TableCell className="text-sm text-slate-900">{order.createdAt}</TableCell>
                        <TableCell className="text-sm">
                          <div>{order.userName}</div>
                          <div className="text-xs text-slate-500">{order.userPhone}</div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="font-medium">{order.hotelName}</div>
                          <div className="text-xs text-slate-500">{order.roomType}</div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div>{order.checkInDate}</div>
                          <div className="text-xs text-slate-500">至 {order.checkOutDate}</div>
                        </TableCell>
                        <TableCell className="text-sm text-center">{order.nights}晚</TableCell>
                        <TableCell className="text-right font-medium text-green-600">
                          ¥{order.actualAmount}
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                            {orderStatusLabels[order.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link to={`/order/${order.orderId}`}>
                            <Button variant="outline" size="sm">查看详情</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
      </div>
    </MainLayout>
  )
}
