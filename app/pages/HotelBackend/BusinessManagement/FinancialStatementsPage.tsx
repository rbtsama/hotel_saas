/**
 * 财务对账页面
 * 展示：月度对账单、订单明细、确认操作
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { FileText, CheckCircle2, Clock, DollarSign } from 'lucide-react'
import type { FinancialStatement } from './types/business.types'

interface FinancialStatementsPageProps {
  statements: FinancialStatement[]
}

export default function FinancialStatementsPage({ statements }: FinancialStatementsPageProps) {
  const [selectedStatement, setSelectedStatement] = useState<FinancialStatement | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">待确认</Badge>
      case 'confirmed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">已确认</Badge>
      case 'settled':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">已结算</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="p-6 space-y-6">
          {/* 标题 */}
          <div>
            <h1 className="text-3xl font-bold">财务对账</h1>
            <p className="text-muted-foreground mt-2">每月对账单，核对收入和佣金</p>
          </div>

          {/* 对账单列表 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                对账单列表
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>对账单号</TableHead>
                    <TableHead>对账月份</TableHead>
                    <TableHead className="text-right">订单数</TableHead>
                    <TableHead className="text-right">总收入</TableHead>
                    <TableHead className="text-right">平台佣金</TableHead>
                    <TableHead className="text-right">商家实收</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statements.map((statement) => (
                    <TableRow key={statement.id}>
                      <TableCell className="font-medium">{statement.id}</TableCell>
                      <TableCell>{statement.month}</TableCell>
                      <TableCell className="text-right">{statement.summary.totalOrders}</TableCell>
                      <TableCell className="text-right text-green-600">
                        ¥{statement.summary.totalRevenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-orange-600">
                        ¥{statement.summary.totalCommission.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-blue-600 font-bold">
                        ¥{statement.summary.totalMerchantAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(statement.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {statement.createdAt}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedStatement(statement)}
                          >
                            查看详情
                          </Button>
                          {statement.status === 'pending' && (
                            <Form method="post">
                              <input type="hidden" name="action" value="confirm" />
                              <input type="hidden" name="statementId" value={statement.id} />
                              <Button size="sm" type="submit">
                                确认对账
                              </Button>
                            </Form>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 统计汇总 */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">待确认</p>
                    <p className="text-2xl font-bold mt-1 text-yellow-600">
                      {statements.filter(s => s.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">已确认</p>
                    <p className="text-2xl font-bold mt-1 text-blue-600">
                      {statements.filter(s => s.status === 'confirmed').length}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-blue-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">已结算</p>
                    <p className="text-2xl font-bold mt-1 text-green-600">
                      {statements.filter(s => s.status === 'settled').length}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">累计实收</p>
                    <p className="text-2xl font-bold mt-1 text-green-600">
                      ¥{statements
                        .filter(s => s.status === 'settled')
                        .reduce((sum, s) => sum + s.summary.totalMerchantAmount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 详情弹窗 */}
      <Dialog open={!!selectedStatement} onOpenChange={() => setSelectedStatement(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>对账单详情 - {selectedStatement?.id}</DialogTitle>
          </DialogHeader>

          {selectedStatement && (
            <div className="space-y-4">
              {/* 汇总信息 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">汇总信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">对账月份：</span>
                      <span className="font-bold">{selectedStatement.month}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">订单总数：</span>
                      <span className="font-bold">{selectedStatement.summary.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">总收入：</span>
                      <span className="font-bold text-green-600">
                        ¥{selectedStatement.summary.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">平台佣金（{selectedStatement.summary.commissionRate}%）：</span>
                      <span className="font-bold text-orange-600">
                        ¥{selectedStatement.summary.totalCommission.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between col-span-2 border-t pt-2">
                      <span className="text-muted-foreground">商家实收：</span>
                      <span className="font-bold text-blue-600 text-lg">
                        ¥{selectedStatement.summary.totalMerchantAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 订单明细 */}
              {selectedStatement.orders.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">订单明细（前10条）</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>订单号</TableHead>
                          <TableHead>入住日期</TableHead>
                          <TableHead>离店日期</TableHead>
                          <TableHead>房型</TableHead>
                          <TableHead className="text-right">实付金额</TableHead>
                          <TableHead className="text-right">佣金</TableHead>
                          <TableHead className="text-right">商家实收</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedStatement.orders.slice(0, 10).map((order) => (
                          <TableRow key={order.orderNumber}>
                            <TableCell className="font-mono text-xs">{order.orderNumber}</TableCell>
                            <TableCell>{order.checkInDate}</TableCell>
                            <TableCell>{order.checkOutDate}</TableCell>
                            <TableCell>{order.roomTypeName}</TableCell>
                            <TableCell className="text-right">¥{order.actualAmount}</TableCell>
                            <TableCell className="text-right text-orange-600">¥{order.commission}</TableCell>
                            <TableCell className="text-right text-blue-600">¥{order.merchantAmount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              {/* 时间线 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">处理时间线</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">创建时间：</span>
                      <span>{selectedStatement.createdAt}</span>
                    </div>
                    {selectedStatement.confirmedAt && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">确认时间：</span>
                        <span>{selectedStatement.confirmedAt}</span>
                      </div>
                    )}
                    {selectedStatement.settledAt && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">结算时间：</span>
                        <span>{selectedStatement.settledAt}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
