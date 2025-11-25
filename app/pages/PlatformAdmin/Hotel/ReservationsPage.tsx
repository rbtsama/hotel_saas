import { useState } from 'react'
import { Form, useSearchParams, useNavigation } from '@remix-run/react'
import type { Reservation, ReservationStatus, PaginatedReservations } from './types/hotel.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Search, Plus, Eye } from 'lucide-react'

interface ReservationsPageProps {
  paginatedData: PaginatedReservations
  error: string | null
}

/**
 * 获取状态显示配置
 */
function getStatusConfig(status: ReservationStatus) {
  const configs = {
    pending: { label: '待确认', className: 'border-orange-300 text-orange-700 bg-orange-50' },
    confirmed: { label: '已确认', className: 'border-blue-300 text-blue-700 bg-blue-50' },
    checked_in: { label: '已入住', className: 'border-green-300 text-green-700 bg-green-50' },
    completed: { label: '已完成', className: 'border-slate-300 text-slate-700 bg-slate-50' },
    cancelled: { label: '已取消', className: 'border-red-300 text-red-700 bg-red-50' },
  }
  return configs[status]
}

/**
 * 获取预订来源显示
 */
function getSourceLabel(source: 'online' | 'front_desk') {
  return source === 'online' ? '线上' : '前台'
}

export default function ReservationsPage({ paginatedData, error }: ReservationsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigation = useNavigation()

  // 从 URL 读取筛选参数
  const status = searchParams.get('status') || 'all'
  const search = searchParams.get('search') || ''
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')

  // 本地状态
  const [localSearch, setLocalSearch] = useState(search)
  const [localStatus, setLocalStatus] = useState(status)
  const [localStartDate, setLocalStartDate] = useState(startDate)
  const [localEndDate, setLocalEndDate] = useState(endDate)
  const [localPageSize, setLocalPageSize] = useState(pageSize.toString())
  const [jumpPage, setJumpPage] = useState('')

  const isLoading = navigation.state === 'loading'

  // 提交筛选
  const handleFilter = () => {
    const params = new URLSearchParams()
    if (localStatus !== 'all') params.set('status', localStatus)
    if (localSearch) params.set('search', localSearch)
    if (localStartDate) params.set('startDate', localStartDate)
    if (localEndDate) params.set('endDate', localEndDate)
    params.set('page', '1')
    params.set('pageSize', localPageSize)
    setSearchParams(params)
  }

  // 翻页
  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    setSearchParams(params)
  }

  // 改变每页条数
  const changePageSize = (newSize: string) => {
    setLocalPageSize(newSize)
    const params = new URLSearchParams(searchParams)
    params.set('pageSize', newSize)
    params.set('page', '1')
    setSearchParams(params)
  }

  // 跳转页码
  const handleJumpPage = () => {
    const targetPage = parseInt(jumpPage)
    if (targetPage >= 1 && targetPage <= paginatedData.totalPages) {
      goToPage(targetPage)
      setJumpPage('')
    }
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-700">错误: {error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { data: reservations, total, totalPages } = paginatedData

  return (
    <div className="p-6 space-y-6">
      {/* 筛选器卡片 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900">预订管理</CardTitle>
            <Button
              className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
              onClick={() => {
                // TODO: 跳转到新增预订页面
                alert('前台预订功能待开发')
              }}
            >
              <Plus className="w-4 h-4 mr-1.5" />
              新增预订
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 第一行：状态筛选 */}
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-600 font-medium min-w-[60px]">状态：</span>
              <Select value={localStatus} onValueChange={setLocalStatus}>
                <SelectTrigger className="w-40 h-9 border-slate-300 focus:border-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="pending">待确认</SelectItem>
                  <SelectItem value="confirmed">已确认</SelectItem>
                  <SelectItem value="checked_in">已入住</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="cancelled">已取消</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 第二行：搜索框 */}
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-600 font-medium min-w-[60px]">搜索：</span>
              <Input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="订单号/客人姓名/手机号"
                className="flex-1 h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
              />
            </div>

            {/* 第三行：日期范围 */}
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-600 font-medium min-w-[60px]">入住日期：</span>
              <Input
                type="date"
                value={localStartDate}
                onChange={(e) => setLocalStartDate(e.target.value)}
                className="w-48 h-9 border-slate-300 focus:border-blue-500"
              />
              <span className="text-slate-400">至</span>
              <Input
                type="date"
                value={localEndDate}
                onChange={(e) => setLocalEndDate(e.target.value)}
                className="w-48 h-9 border-slate-300 focus:border-blue-500"
              />
            </div>

            {/* 第四行：操作按钮 */}
            <div className="flex gap-2">
              <Button
                onClick={handleFilter}
                disabled={isLoading}
                className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                <Search className="w-4 h-4 mr-1.5" />
                {isLoading ? '搜索中...' : '搜索'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setLocalSearch('')
                  setLocalStatus('all')
                  setLocalStartDate('')
                  setLocalEndDate('')
                  setSearchParams({})
                }}
                className="h-9 border-slate-300 hover:border-slate-400"
              >
                重置
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 数据表格卡片 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6">
          <div className="rounded-md border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="text-slate-600 font-semibold">订单号</TableHead>
                  <TableHead className="text-slate-600 font-semibold">客人姓名</TableHead>
                  <TableHead className="text-slate-600 font-semibold">手机号</TableHead>
                  <TableHead className="text-slate-600 font-semibold">房型</TableHead>
                  <TableHead className="text-slate-600 font-semibold">入住日期</TableHead>
                  <TableHead className="text-slate-600 font-semibold">退房日期</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">房间数</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-right">总价</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">来源</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">状态</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center text-slate-500 py-8">
                      暂无数据
                    </TableCell>
                  </TableRow>
                ) : (
                  reservations.map((reservation) => {
                    const statusConfig = getStatusConfig(reservation.status)
                    return (
                      <TableRow
                        key={reservation.id}
                        className="hover:bg-slate-50 transition-colors border-slate-200"
                      >
                        <TableCell className="font-mono text-sm text-slate-900">
                          {reservation.orderNo}
                        </TableCell>
                        <TableCell className="text-slate-900">{reservation.guestName}</TableCell>
                        <TableCell className="text-slate-700">{reservation.guestPhone}</TableCell>
                        <TableCell className="text-slate-900">{reservation.roomTypeName}</TableCell>
                        <TableCell className="text-slate-700">{reservation.checkInDate}</TableCell>
                        <TableCell className="text-slate-700">{reservation.checkOutDate}</TableCell>
                        <TableCell className="text-center text-slate-900">
                          {reservation.roomCount}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-slate-900">
                          ¥{reservation.totalPrice}
                        </TableCell>
                        <TableCell className="text-center text-slate-700">
                          {getSourceLabel(reservation.source)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 border-slate-300 hover:border-blue-500 hover:text-blue-600"
                              onClick={() => {
                                // TODO: 查看详情
                                alert(`查看预订 ${reservation.id} 的详情`)
                              }}
                            >
                              <Eye className="w-3.5 h-3.5 mr-1" />
                              详情
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* 专业分页组件 */}
          {totalPages > 0 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
              {/* 左侧：统计信息 */}
              <div className="text-sm text-slate-600">
                共 <span className="font-semibold text-slate-900">{total}</span> 条记录，每页显示
                <Select value={localPageSize} onValueChange={changePageSize}>
                  <SelectTrigger className="inline-flex w-20 h-8 mx-2 border-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                条
              </div>

              {/* 右侧：分页控制 */}
              <div className="flex items-center gap-2">
                {/* 首页 */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => goToPage(1)}
                  className="h-8 border-slate-300"
                >
                  首页
                </Button>

                {/* 上一页 */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => goToPage(page - 1)}
                  className="h-8 border-slate-300"
                >
                  上一页
                </Button>

                {/* 页码显示 */}
                <div className="flex items-center gap-1">
                  {/* 显示当前页附近的页码 */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => goToPage(pageNum)}
                        className={
                          pageNum === page
                            ? 'h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white'
                            : 'h-8 w-8 border-slate-300'
                        }
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                {/* 下一页 */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => goToPage(page + 1)}
                  className="h-8 border-slate-300"
                >
                  下一页
                </Button>

                {/* 末页 */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => goToPage(totalPages)}
                  className="h-8 border-slate-300"
                >
                  末页
                </Button>

                {/* 跳转 */}
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-sm text-slate-600">跳转</span>
                  <Input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={jumpPage}
                    onChange={(e) => setJumpPage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleJumpPage()}
                    className="w-16 h-8 text-center border-slate-300"
                    placeholder="页"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleJumpPage}
                    className="h-8 border-slate-300"
                  >
                    GO
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
