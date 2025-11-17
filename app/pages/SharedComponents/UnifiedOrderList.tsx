/**
 * 统一订单列表组件
 * 修复 #001：同一组件，根据用户角色自动过滤数据
 * 用于平台后台和酒店后台
 */

import { useState } from 'react'
import { Link } from '@remix-run/react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Input } from '~/components/ui/input'
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
import { Search, Filter, Download, Eye, AlertCircle } from 'lucide-react'
import type { Order, OrderFilterParams } from '~/pages/SharedTypes/order.types'
import { OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '~/pages/SharedTypes/order.types'

interface UnifiedOrderListProps {
  orders: Order[]
  total: number
  currentPage: number
  pageSize: number
  /** 是否显示酒店列（平台后台显示，酒店后台隐藏） */
  showHotelColumn?: boolean
  /** 页面标题 */
  title?: string
}

export default function UnifiedOrderList({
  orders,
  total,
  currentPage,
  pageSize,
  showHotelColumn = false,
  title = '订单列表'
}: UnifiedOrderListProps) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const getStatusBadgeColor = (status: OrderStatus) => {
    const colorMap: Record<string, string> = {
      yellow: 'bg-yellow-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      gray: 'bg-gray-500',
      red: 'bg-red-500'
    }
    return colorMap[ORDER_STATUS_COLORS[status]] || 'bg-gray-500'
  }

  const formatAmount = (amount: number) => `¥${amount.toFixed(2)}`

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">共 {total} 条订单</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 筛选栏 */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索订单号、用户名、手机号..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="订单状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value={OrderStatus.PENDING_PAYMENT}>待支付</SelectItem>
                <SelectItem value={OrderStatus.PENDING_CONFIRM}>待确认</SelectItem>
                <SelectItem value={OrderStatus.CONFIRMED}>已确认</SelectItem>
                <SelectItem value={OrderStatus.ASSIGNED}>已分配</SelectItem>
                <SelectItem value={OrderStatus.CHECKED_IN}>已入住</SelectItem>
                <SelectItem value={OrderStatus.IN_HOUSE}>在住</SelectItem>
                <SelectItem value={OrderStatus.CHECKED_OUT}>已退房</SelectItem>
                <SelectItem value={OrderStatus.COMPLETED}>已完成</SelectItem>
                <SelectItem value={OrderStatus.CANCELLED}>已取消</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              导出Excel
            </Button>
          </div>

          {/* 订单表格 */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>订单号</TableHead>
                  {showHotelColumn && <TableHead>酒店</TableHead>}
                  <TableHead>客人信息</TableHead>
                  <TableHead>房型</TableHead>
                  <TableHead>入住日期</TableHead>
                  <TableHead>间夜</TableHead>
                  <TableHead>金额</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={showHotelColumn ? 9 : 8} className="text-center py-8 text-muted-foreground">
                      暂无订单数据
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        {order.orderNumber}
                        {order.hasRefundRequest && (
                          <Badge variant="destructive" className="ml-2">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            退款
                          </Badge>
                        )}
                      </TableCell>
                      {showHotelColumn && (
                        <TableCell>
                          <div className="text-sm">{order.hotelName}</div>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="text-sm font-medium">{order.userName}</div>
                        <div className="text-xs text-muted-foreground">{order.userPhone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{order.roomTypeName}</div>
                        {order.roomNumber && (
                          <div className="text-xs text-muted-foreground">房号: {order.roomNumber}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{order.checkInDate}</div>
                        <div className="text-xs text-muted-foreground">至 {order.checkOutDate}</div>
                      </TableCell>
                      <TableCell>{order.nights}晚</TableCell>
                      <TableCell className="font-semibold">
                        {formatAmount(order.actualAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusBadgeColor(order.status)} text-white`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link to={`/order-detail/${order.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            查看
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* 分页 */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              显示 {(currentPage - 1) * pageSize + 1} 到 {Math.min(currentPage * pageSize, total)} 条，共 {total} 条
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1}>
                上一页
              </Button>
              <Button variant="outline" size="sm" disabled={currentPage * pageSize >= total}>
                下一页
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
