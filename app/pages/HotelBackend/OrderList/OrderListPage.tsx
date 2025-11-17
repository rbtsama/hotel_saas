import { useState } from 'react'
import { Form, Link, useNavigate } from '@remix-run/react'
import type { OrderListResponse } from './types/orderList.types'
import { CHECK_IN_STATUS_LABELS } from './types/orderList.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Search, Edit, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '~/lib/utils'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface OrderListPageProps {
  result: OrderListResponse | null
  error: string | null
}

export default function OrderListPage({ result, error }: OrderListPageProps) {
  const navigate = useNavigate()
  const [roomType, setRoomType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [checkInStatus, setCheckInStatus] = useState('')
  const [refundStatus, setRefundStatus] = useState('')

  const orders = result?.orders || []
  const currentPage = result?.page || 1
  const totalPages = result?.totalPages || 1
  const total = result?.total || 0

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', String(page))
    navigate(`?${params.toString()}`)
  }

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
      <div className="flex h-full">
        {/* 左侧：订单列表界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto">
          <div className="p-6 space-y-6">
      {/* 筛选表单 */}
      <Card>
        <CardContent className="pt-6">
          <Form method="get" className="space-y-4">
            <div className="grid grid-cols-6 gap-4">
              {/* 房型 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">房型</label>
                <Input
                  name="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  placeholder="请选择房型"
                />
              </div>

              {/* 订房日期 */}
              <div className="space-y-2 col-span-2">
                <label className="text-sm text-muted-foreground">订房日期</label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="开始日期"
                  />
                  <span>-</span>
                  <Input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="结束日期"
                  />
                </div>
              </div>

              {/* 支付状态 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">支付状态</label>
                <Select name="paymentStatus" value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="已支付" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="paid">已支付</SelectItem>
                    <SelectItem value="unpaid">未支付</SelectItem>
                    <SelectItem value="refunded">已退款</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 入住状态 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">入住状态</label>
                <Select name="checkInStatus" value={checkInStatus} onValueChange={setCheckInStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择入住状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="not-checked-in">待入住</SelectItem>
                    <SelectItem value="checked-in">已入住</SelectItem>
                    <SelectItem value="checked-out">已离店</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 退款状态 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">退款状态</label>
                <Select name="refundStatus" value={refundStatus} onValueChange={setRefundStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择退款状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="no-refund">无退款</SelectItem>
                    <SelectItem value="refund-pending">退款中</SelectItem>
                    <SelectItem value="refunded">已退款</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                搜索
              </Button>
              <Button type="button" variant="outline" onClick={() => window.location.href = '/hotel-backend/order-list'}>
                重置
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* 订单列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>订单号</TableHead>
                <TableHead>订房人</TableHead>
                <TableHead>房型</TableHead>
                <TableHead>入住日期</TableHead>
                <TableHead>支付金额</TableHead>
                <TableHead>订单状态</TableHead>
                <TableHead>下单时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{order.guestName}</div>
                      <div className="text-sm text-muted-foreground">{order.guestPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.roomType}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {order.checkInDate} - {order.checkOutDate}
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          order.refundStatus === 'refund-pending'
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        )}
                      >
                        {order.refundStatus === 'refund-pending' ? '退款完成' : CHECK_IN_STATUS_LABELS[order.checkInStatus]}
                      </span>
                      {order.hasRefundRequest && (
                        <span className="w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                          退
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{order.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Edit className="h-4 w-4 mr-1" />
                        取消订单
                      </Button>
                      <Link to={`/hotel-backend/order-list/${order.id}`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <FileText className="h-4 w-4 mr-1" />
                          查询
                        </Button>
                      </Link>
                      <Link to={`/hotel-backend/order-list/${order.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Edit className="h-4 w-4 mr-1" />
                          详情
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {orders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              暂无订单数据
            </div>
          )}

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                共 {total} 条，10条/页
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  )
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-sm text-muted-foreground">前往</span>
                  <Input
                    type="number"
                    min={1}
                    max={totalPages}
                    defaultValue={currentPage}
                    className="w-16 h-8 text-center"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const value = parseInt(e.currentTarget.value)
                        if (value >= 1 && value <= totalPages) {
                          handlePageChange(value)
                        }
                      }
                    }}
                  />
                  <span className="text-sm text-muted-foreground">页</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
          </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="订单管理中心"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">订单管理的核心价值：</p>
                    <LogicList
                      items={[
                        <><strong>订单查询</strong>：快速定位客人订单，处理客人咨询</>,
                        <><strong>状态跟踪</strong>：实时了解订单状态，把控入住流程</>,
                        <><strong>退款处理</strong>：及时响应退款申请，维护客户关系</>,
                        <><strong>数据统计</strong>：分析订单趋势，优化运营策略</>
                      ]}
                    />
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>酒店痛点</strong>：传统PMS系统订单分散，缺乏统一管理平台。本系统整合线上线下订单，提供一站式订单管理解决方案。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '订单状态流转',
                content: (
                  <>
                    <p className="font-semibold mb-2">订单完整生命周期：</p>
                    <div className="bg-slate-50 border rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-8 bg-yellow-100 text-yellow-700 rounded flex items-center justify-center text-xs font-medium">待支付</div>
                        <span className="text-slate-400">→</span>
                        <div className="w-20 h-8 bg-blue-100 text-blue-700 rounded flex items-center justify-center text-xs font-medium">待入住</div>
                        <span className="text-slate-400">→</span>
                        <div className="w-20 h-8 bg-green-100 text-green-700 rounded flex items-center justify-center text-xs font-medium">已入住</div>
                        <span className="text-slate-400">→</span>
                        <div className="w-20 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center text-xs font-medium">已完成</div>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <div className="w-20 h-8 bg-red-100 text-red-700 rounded flex items-center justify-center text-xs font-medium">已取消</div>
                        <span className="text-xs text-slate-500">← 可在待支付/待入住阶段取消</span>
                      </div>
                    </div>
                    <LogicTable
                      headers={['状态', '说明', '可执行操作']}
                      rows={[
                        ['待支付', '订单已创建，等待客人付款', '取消订单、修改订单'],
                        ['待入住', '已支付，等待入住日期到达', '取消订单（需退款）、修改订单'],
                        ['已入住', '客人已办理入住手续', '查看详情、办理退房'],
                        ['已完成', '客人已退房，订单完结', '查看详情、打印凭证'],
                        ['已取消', '订单已取消（可能已退款）', '查看详情']
                      ]}
                    />
                  </>
                )
              },
              {
                title: '筛选功能说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">多条件组合筛选：</p>
                    <LogicTable
                      headers={['筛选项', '使用场景', '示例']}
                      rows={[
                        ['房型', '查找特定房型的订单', '筛选"豪华大床房"的所有订单'],
                        ['订房日期', '查看某时间段的订单', '查看2025年1月的所有订单'],
                        ['支付状态', '追踪待支付订单', '筛选"未支付"订单进行催款'],
                        ['入住状态', '准备入住接待', '筛选"待入住"订单准备房间'],
                        ['退款状态', '处理退款申请', '筛选"退款中"订单优先处理']
                      ]}
                    />
                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>使用技巧</strong>：多个筛选条件可组合使用，例如：筛选"豪华大床房 + 待入住 + 明天入住"，快速定位需要准备的房间。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '操作说明',
                content: (
                  <>
                    <LogicTable
                      headers={['操作', '功能说明', '注意事项']}
                      rows={[
                        ['搜索', '根据筛选条件查询订单', '点击"重置"可清空所有筛选条件'],
                        ['查询', '查看订单基本信息', '快速浏览订单概要'],
                        ['详情', '查看订单完整信息', '包含客人信息、房间信息、费用明细'],
                        ['取消订单', '取消未入住的订单', '已支付订单取消需退款，需谨慎操作']
                      ]}
                    />
                  </>
                )
              },
              {
                title: '字段说明',
                content: (
                  <>
                    <LogicTable
                      headers={['字段名', '含义', '示例']}
                      rows={[
                        ['订单号', '订单唯一标识', 'ORD20250115001234'],
                        ['订房人', '客人姓名和联系方式', '张三 / 138****5678'],
                        ['房型', '预订的房型名称', '豪华大床房'],
                        ['入住日期', '入住-离店日期范围', '01/20 - 01/22'],
                        ['支付金额', '订单实付金额', '¥658'],
                        ['订单状态', '当前订单所处状态', '待入住 / 已入住 / 已完成'],
                        ['下单时间', '订单创建时间', '01/15 14:30:25']
                      ]}
                    />
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>订单号规则</strong>：ORD（订单标识） + YYYYMMDD（日期） + 6位流水号，确保唯一性且便于追溯。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '退款处理说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">红点标记的含义：</p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">订单状态：</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">待入住</span>
                        <span className="w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">退</span>
                      </div>
                      <p className="text-xs text-orange-700">
                        <strong>红点"退"标记</strong> = 该订单有退款申请待处理，需要酒店方尽快响应。
                      </p>
                    </div>
                    <p className="font-semibold mb-2">退款处理流程：</p>
                    <LogicList
                      items={[
                        '客人提交退款申请 → 订单出现红点标记',
                        '酒店查看退款详情 → 了解退款原因',
                        '酒店审核退款 → 同意/拒绝退款申请',
                        '系统处理退款 → 原路退回到客人账户',
                        '红点消失 → 退款流程完成'
                      ]}
                    />
                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>退款政策</strong>：入住前24小时可免费取消，24小时内取消需扣除首晚房费。具体政策可在"门店管理-酒店政策"中配置。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '数据统计价值',
                content: (
                  <>
                    <p className="font-semibold mb-2">通过订单数据可分析：</p>
                    <LogicList
                      items={[
                        <><strong>入住率</strong>：统计某时间段的订单量，计算房间入住率</>,
                        <><strong>热门房型</strong>：分析哪些房型订单量最高，优化房型配置</>,
                        <><strong>客源分析</strong>：统计回头客比例，评估客户忠诚度</>,
                        <><strong>退款率</strong>：监控退款订单比例，改进服务质量</>
                      ]}
                    />
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-700">
                        <strong>💡 运营建议</strong>：定期导出订单数据，使用Excel透视表分析趋势，找出运营优化点。例如：发现周末退款率高 → 可能是周末服务质量不稳定 → 加强周末人员配置。
                      </p>
                    </div>
                  </>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
