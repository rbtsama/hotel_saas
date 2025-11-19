/**
 * 退款管理页面
 */

import type { RefundRequest } from './types/order.types'
import { RefundStatus } from './types/order.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'

interface RefundManagementPageProps {
  refunds: RefundRequest[]
  error?: string | null
}

const refundStatusLabels: Record<RefundStatus, string> = {
  [RefundStatus.PENDING]: '待处理',
  [RefundStatus.APPROVED]: '已同意',
  [RefundStatus.REJECTED]: '已拒绝'
}

const OperationLogButton = ({ moduleName }: { moduleName: string }) => (
  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
    📋 {moduleName}操作记录
  </Button>
)

const BusinessLogicPanel = ({ sections }: { sections: Array<{ title: string; content: React.ReactNode }> }) => (
  <div className="p-6 space-y-6 overflow-y-auto">
    <div>
      <h2 className="text-xl font-bold text-slate-900">业务逻辑说明</h2>
      <p className="text-sm text-slate-500 mt-1">
        后台配置如何影响前端用户体验
      </p>
    </div>
    {sections.map((section, index) => (
      <div key={index}>
        <h3 className="font-semibold mb-3">{section.title}</h3>
        {section.content}
      </div>
    ))}
  </div>
)

export default function RefundManagementPage({ refunds, error }: RefundManagementPageProps) {
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
      <div className="flex h-screen">
        <div className="w-[60%] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">退款管理</h1>
                <p className="text-sm text-slate-500 mt-1">
                  处理用户退款申请
                </p>
              </div>
              <OperationLogButton moduleName="退款管理" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>退款申请列表</CardTitle>
                <CardDescription>共 {refunds.length} 个申请</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>申请时间</TableHead>
                      <TableHead>订单号</TableHead>
                      <TableHead>用户</TableHead>
                      <TableHead>酒店</TableHead>
                      <TableHead>退款原因</TableHead>
                      <TableHead className="text-right">申请金额</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {refunds.map((refund) => (
                      <TableRow key={refund.refundId}>
                        <TableCell className="text-sm text-slate-600">{refund.requestedAt}</TableCell>
                        <TableCell className="font-mono text-sm text-blue-600">{refund.orderId}</TableCell>
                        <TableCell className="text-sm">{refund.userName}</TableCell>
                        <TableCell className="text-sm">{refund.hotelName}</TableCell>
                        <TableCell className="text-sm max-w-xs truncate">{refund.reason}</TableCell>
                        <TableCell className="text-right font-medium text-red-600">¥{refund.requestAmount}</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${
                            refund.status === RefundStatus.PENDING ? 'bg-yellow-100 text-yellow-700' :
                            refund.status === RefundStatus.APPROVED ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {refundStatusLabels[refund.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {refund.status === RefundStatus.PENDING && (
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="text-green-600">同意</Button>
                              <Button variant="outline" size="sm" className="text-red-600">拒绝</Button>
                            </div>
                          )}
                          {refund.status !== RefundStatus.PENDING && (
                            <Button variant="outline" size="sm">查看详情</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-[40%] h-full border-l">
          <BusinessLogicPanel
            sections={[
              {
                title: '📱 用户端体验',
                content: (
                  <div className="bg-slate-50 border rounded-lg p-4">
                    <p className="font-semibold text-sm mb-2">📱 申请退款</p>
                    <div className="text-xs space-y-1 text-slate-700">
                      <div>实付：¥1299</div>
                      <div className="border-t pt-1 mt-1">
                        <div>预计退款：<span className="text-green-600 font-bold">¥1039.20</span></div>
                        <div className="text-orange-600 text-xs">距离入住5天，按80%退款</div>
                      </div>
                      <div className="text-slate-500 mt-2">→ 后台退款规则自动计算退款金额</div>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
