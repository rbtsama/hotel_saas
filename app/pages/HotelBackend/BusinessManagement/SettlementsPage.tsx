/**
 * 结算管理页面
 * 展示：结算记录、申请结算、到账状态
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { DollarSign, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Settlement } from './types/business.types'

interface SettlementsPageProps {
  settlements: Settlement[]
}

export default function SettlementsPage({ settlements }: SettlementsPageProps) {
  const [showRequestDialog, setShowRequestDialog] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">待审核</Badge>
      case 'processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">处理中</Badge>
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">已到账</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'processing':
        return <AlertCircle className="w-5 h-5 text-blue-600" />
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="p-6 space-y-6">
          {/* 标题和操作 */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">结算管理</h1>
              <p className="text-muted-foreground mt-2">管理每月结算申请和到账记录</p>
            </div>
            <Button onClick={() => setShowRequestDialog(true)}>
              申请结算
            </Button>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">待审核</p>
                    <p className="text-2xl font-bold mt-1 text-yellow-600">
                      {settlements.filter(s => s.status === 'pending').length}
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
                    <p className="text-sm text-muted-foreground">处理中</p>
                    <p className="text-2xl font-bold mt-1 text-blue-600">
                      {settlements.filter(s => s.status === 'processing').length}
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-blue-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">已到账</p>
                    <p className="text-2xl font-bold mt-1 text-green-600">
                      {settlements.filter(s => s.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">累计到账</p>
                    <p className="text-2xl font-bold mt-1 text-green-600">
                      ¥{settlements
                        .filter(s => s.status === 'completed')
                        .reduce((sum, s) => sum + s.amount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 结算记录列表 */}
          <Card>
            <CardHeader>
              <CardTitle>结算记录</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>结算ID</TableHead>
                    <TableHead>结算月份</TableHead>
                    <TableHead className="text-right">结算金额</TableHead>
                    <TableHead>银行账号</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>申请时间</TableHead>
                    <TableHead>到账时间</TableHead>
                    <TableHead>备注</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settlements.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                        暂无结算记录
                      </TableCell>
                    </TableRow>
                  ) : (
                    settlements.map((settlement) => (
                      <TableRow key={settlement.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          {getStatusIcon(settlement.status)}
                          {settlement.id}
                        </TableCell>
                        <TableCell>{settlement.month}</TableCell>
                        <TableCell className="text-right text-green-600 font-bold">
                          ¥{settlement.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{settlement.bankAccount}</TableCell>
                        <TableCell>{getStatusBadge(settlement.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {settlement.requestedAt}
                        </TableCell>
                        <TableCell className="text-sm">
                          {settlement.settledAt || '-'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                          {settlement.note || '-'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 结算说明 */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                结算说明
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 每月1日自动生成上月对账单</li>
                <li>• 对账单确认后，可申请结算</li>
                <li>• 结算金额 = 订单总收入 - 平台佣金（5%）</li>
                <li>• 审核通过后，3-5个工作日到账</li>
                <li>• 到账后会发送短信和邮件通知</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 申请结算弹窗 */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>申请结算</DialogTitle>
          </DialogHeader>

          <Form method="post" className="space-y-4" onSubmit={() => setShowRequestDialog(false)}>
            <input type="hidden" name="action" value="request" />

            <div className="space-y-2">
              <Label htmlFor="month">结算月份</Label>
              <Input
                id="month"
                name="month"
                type="month"
                required
                placeholder="选择月份"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">结算金额</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                required
                placeholder="输入结算金额"
              />
              <p className="text-xs text-muted-foreground">
                系统会自动核对对账单金额
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankAccount">收款银行账号</Label>
              <Input
                id="bankAccount"
                name="bankAccount"
                required
                placeholder="输入银行账号后4位"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">备注（可选）</Label>
              <Textarea
                id="note"
                name="note"
                placeholder="补充说明"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRequestDialog(false)}
              >
                取消
              </Button>
              <Button type="submit">
                提交申请
              </Button>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
