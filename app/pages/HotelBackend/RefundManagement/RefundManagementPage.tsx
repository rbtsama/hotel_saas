import { useState } from 'react'
import { Form, Link, useNavigate } from '@remix-run/react'
import type { RefundListResponse } from './types/refundManagement.types'
import { REFUND_STATUS_LABELS } from './types/refundManagement.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Search, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LogicPanel, { LogicList, LogicTable, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'
import { useViewMode } from '~/contexts/ViewModeContext'

interface RefundManagementPageProps {
  result: RefundListResponse | null
  error: string | null
}

export default function RefundManagementPage({ result, error }: RefundManagementPageProps) {
  const navigate = useNavigate()
  const { isPresentationMode } = useViewMode()
  const [orderNumber, setOrderNumber] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const refunds = result?.refunds || []
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

  // LogicPanel 内容
  const logicSections = [
    {
      title: '业务场景',
      content: (
        <div className="space-y-3">
          <p>客诉退款管理是酒店SAAS系统的重要组成部分，用于处理客人因订单问题提出的退款申请。良好的退款管理能够：</p>
          <LogicList items={[
            '保护商家权益：规范退款流程，避免恶意退款',
            '维护客人利益：及时处理合理诉求，提升服务质量',
            '平台信誉保障：公正处理纠纷，建立信任机制',
            '数据追溯：完整记录退款历史，便于后续分析',
          ]} />
        </div>
      )
    },
    {
      title: '退款处理流程',
      content: (
        <div className="space-y-3">
          <p>标准退款处理流程包括以下环节：</p>
          <LogicList items={[
            <><strong>1. 客人申请</strong>：客人在订单详情页提交退款申请，填写退款原因和金额</>,
            <><strong>2. 商家审核</strong>：酒店方查看申请详情，根据退款政策进行审核</>,
            <><strong>3. 平台介入</strong>：如有争议，平台客服介入协调处理</>,
            <><strong>4. 退款执行</strong>：审核通过后，系统自动将款项退回客人账户</>,
            <><strong>5. 完成归档</strong>：退款完成后记录归档，更新订单状态</>,
          ]} />
          <LogicHighlight type="info">
            <strong>处理时效：</strong>商家应在24小时内响应退款申请，平台介入后48小时内给出处理结果。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '处理进度说明',
      content: (
        <div className="space-y-3">
          <p>系统提供多种退款状态，清晰展示处理进度：</p>
          <LogicTable
            headers={['状态', '说明', '后续操作']}
            rows={[
              ['待审核', '客人刚提交申请，等待商家处理', '商家需及时查看并做出决定'],
              ['已批准', '商家同意退款，等待执行', '系统将自动处理退款'],
              ['已拒绝', '商家拒绝退款申请', '客人可申请平台介入'],
              ['已退款', '退款已成功到账', '流程结束，记录归档'],
              ['平台欠款已退款', '平台垫付的退款已处理', '商家需结算平台垫付金额'],
              ['平台支持退款', '平台客服介入后支持退款', '按平台决定执行退款'],
              ['客人撤诉', '客人主动撤销退款申请', '流程结束，保持原订单状态'],
            ]}
          />
        </div>
      )
    },
    {
      title: '操作说明',
      content: (
        <div className="space-y-3">
          <p>商家可以通过以下方式管理退款申请：</p>
          <LogicList items={[
            <><strong>筛选查询</strong>：支持按订单号、手机号、申诉日期筛选退款记录</>,
            <><strong>查看详情</strong>：点击"详情"按钮查看退款申请的完整信息</>,
            <><strong>处理申请</strong>：在详情页可以同意退款、拒绝退款或协商改期</>,
            <><strong>状态追踪</strong>：实时查看退款处理的最新进度</>,
          ]} />
          <LogicHighlight type="warning">
            <strong>注意：</strong>处理退款前请仔细核对订单信息和退款原因，必要时可联系客人沟通。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '字段说明',
      content: (
        <div className="space-y-3">
          <LogicTable
            headers={['字段', '说明', '示例']}
            rows={[
              ['客诉时间', '客人提交退款申请的时间', '2025-10-16 14:04:55'],
              ['订单号', '关联订单的唯一编号', '20251014100110'],
              ['订房手机号', '下单时填写的手机号码', '19157973208'],
              ['客人支付金额', '客人实际支付的总金额（元）', '646'],
              ['申请退款金额', '客人申请退回的金额（元）', '646 或 部分退款如 323'],
              ['处理进度', '当前退款申请的处理状态', '待审核/已退款/客人撤诉等'],
            ]}
          />
          <LogicHighlight type="info">
            <strong>金额说明：</strong>申请退款金额可能小于支付金额（部分退款），商家需根据退款政策和实际情况判断。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '风险提示',
      content: (
        <div className="space-y-3">
          <LogicHighlight type="warning">
            <p className="mb-2"><strong>处理退款时请注意以下风险：</strong></p>
            <LogicList items={[
              '时效要求：超时未处理可能导致平台强制退款',
              '证据保存：保留沟通记录和订单凭证，便于纠纷举证',
              '政策一致：退款决定应符合已公示的退款政策',
              '恶意识别：注意识别恶意退款，保护商家权益',
              '客户关系：合理退款有助于维护客户关系和口碑',
            ]} />
          </LogicHighlight>
          <p className="text-sm text-muted-foreground">
            建议：定期审视退款数据，分析退款原因，优化服务质量和退款政策。
          </p>
        </div>
      )
    },
  ]

  // 主内容区
  const mainContent = (
    <div className="p-6 space-y-6">
      {/* 筛选表单 */}
      <Card>
        <CardContent className="pt-6">
          <Form method="get" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {/* 订单号 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">订单号</label>
                <Input
                  name="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="请输入订单号"
                />
              </div>

              {/* 订房手机号 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">订房手机号</label>
                <Input
                  name="guestPhone"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="请输入订房手机号"
                />
              </div>

              {/* 申诉日期 */}
              <div className="space-y-2 col-span-2">
                <label className="text-sm text-muted-foreground">申诉日期</label>
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
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                搜索
              </Button>
              <Button type="button" variant="outline" onClick={() => window.location.href = '/hotel-backend/refund-management'}>
                重置
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* 退款列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>客诉时间</TableHead>
                <TableHead>订单号</TableHead>
                <TableHead>订房手机号</TableHead>
                <TableHead>客人支付金额</TableHead>
                <TableHead>申请退款金额</TableHead>
                <TableHead>处理进度</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refunds.map((refund) => (
                <TableRow key={refund.id}>
                  <TableCell className="text-sm">{refund.requestTime}</TableCell>
                  <TableCell className="font-mono text-sm">{refund.orderNumber}</TableCell>
                  <TableCell>{refund.guestPhone}</TableCell>
                  <TableCell>{refund.paidAmount}</TableCell>
                  <TableCell>{refund.refundAmount}</TableCell>
                  <TableCell>
                    <span className="text-sm">{REFUND_STATUS_LABELS[refund.processStatus]}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/hotel-backend/refund-management/${refund.id}`}>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <FileText className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {refunds.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              暂无退款数据
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
  )

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：主内容区（60%） */}
        <div className={`${isPresentationMode ? 'w-full' : 'w-[60%]'} overflow-y-auto border-r`}>
          {mainContent}
        </div>

        {/* 右侧：LogicPanel（40%） */}
        {!isPresentationMode && (
          <div className="w-[40%]">
            <LogicPanel title="客诉退款管理" sections={logicSections} />
          </div>
        )}
      </div>
    </MainLayout>
  )
}
