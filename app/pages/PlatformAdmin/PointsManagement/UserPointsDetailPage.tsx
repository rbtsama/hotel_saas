/**
 * 平台后台 - 用户积分明细查看页面
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { UserMemberInfo, UserNightRecord } from '../MemberManagement/types/member.types'
import type { PointsRecord } from './types/points.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Badge } from '~/components/ui/badge'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { ArrowLeft, Edit2, TrendingUp, TrendingDown } from 'lucide-react'

interface UserPointsDetailPageProps {
  userInfo: UserMemberInfo
  nightRecords: UserNightRecord[]
  pointsRecords: PointsRecord[]
}

export default function UserPointsDetailPage({
  userInfo,
  nightRecords,
  pointsRecords,
}: UserPointsDetailPageProps) {
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false)
  const [adjustType, setAdjustType] = useState<'increase' | 'decrease'>('increase')
  const [adjustAmount, setAdjustAmount] = useState(0)
  const [adjustReason, setAdjustReason] = useState('')

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回列表
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                用户详情 - {userInfo.userName}
              </h1>
              <p className="text-slate-600 mt-1">查看和管理用户的会员信息、积分明细</p>
            </div>
          </div>
        </div>

        {/* 基本信息和会员信息 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">手机号：</span>
                <span className="font-medium">{userInfo.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">姓名：</span>
                <span className="font-medium">{userInfo.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">注册时间：</span>
                <span className="font-medium">{userInfo.registeredAt}</span>
              </div>
            </CardContent>
          </Card>

          {/* 会员信息 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>会员信息</CardTitle>
                <Badge className="bg-purple-100 text-purple-700">
                  {userInfo.currentLevelName}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">有效期至：</span>
                <span className="font-medium">{userInfo.validityDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">累计总间夜：</span>
                <span className="font-medium text-primary">{userInfo.totalNights}晚</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">保级进度：</span>
                <span className="font-medium text-secondary">
                  {userInfo.maintainNights}晚
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 积分信息 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>积分信息</CardTitle>
                <CardDescription>当前积分余额和积分价值</CardDescription>
              </div>
              <Button onClick={() => setAdjustDialogOpen(true)} className="gap-2">
                <Edit2 className="w-4 h-4" />
                手动调整积分
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-600 mb-1">当前积分</p>
                <p className="text-3xl font-bold text-primary">{userInfo.pointsBalance}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">积分汇率</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {userInfo.currentLevel === 0 ? 1.0 : (1.0 + userInfo.currentLevel * 0.1).toFixed(1)}倍
                </p>
                <p className="text-xs text-slate-500">({userInfo.currentLevelName}专享)</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">可抵扣金额</p>
                <p className="text-2xl font-semibold text-secondary">
                  ¥{(userInfo.pointsBalance * (1.0 + userInfo.currentLevel * 0.1)).toFixed(0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 间夜记录 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>间夜记录</CardTitle>
            <CardDescription>用户的历史入住记录</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>订单号</TableHead>
                  <TableHead>酒店名称</TableHead>
                  <TableHead>入住日期</TableHead>
                  <TableHead>离店日期</TableHead>
                  <TableHead className="text-right">间夜数</TableHead>
                  <TableHead>记录时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nightRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.orderId}</TableCell>
                    <TableCell>{record.hotelName}</TableCell>
                    <TableCell>{record.checkInDate}</TableCell>
                    <TableCell>{record.checkOutDate}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {record.nights}晚
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">{record.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 积分明细 */}
        <Card>
          <CardHeader>
            <CardTitle>积分明细</CardTitle>
            <CardDescription>用户的积分获取和使用记录</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>时间</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead className="text-right">金额</TableHead>
                  <TableHead className="text-right">余额</TableHead>
                  <TableHead>说明</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pointsRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="text-sm text-slate-600">{record.createdAt}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.typeName}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-semibold ${
                          record.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {record.amount > 0 ? '+' : ''}
                        {record.amount}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">{record.balance}</TableCell>
                    <TableCell className="text-sm text-slate-600">{record.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 手动调整积分弹窗 */}
        <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>手动调整积分</DialogTitle>
              <DialogDescription>
                为用户 {userInfo.userName} 手动调整积分余额
              </DialogDescription>
            </DialogHeader>
            <Form method="post" onSubmit={() => setAdjustDialogOpen(false)}>
              <input type="hidden" name="_action" value="adjust_points" />
              <input type="hidden" name="userId" value={userInfo.userId} />
              <div className="space-y-4 py-4">
                {/* 当前积分 */}
                <div className="p-3 bg-slate-100 rounded-lg">
                  <p className="text-sm text-slate-600">当前积分</p>
                  <p className="text-2xl font-bold text-slate-900">{userInfo.pointsBalance}</p>
                </div>

                {/* 调整类型 */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={adjustType === 'increase' ? 'default' : 'outline'}
                    onClick={() => setAdjustType('increase')}
                    className="gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    增加
                  </Button>
                  <Button
                    type="button"
                    variant={adjustType === 'decrease' ? 'default' : 'outline'}
                    onClick={() => setAdjustType('decrease')}
                    className="gap-2"
                  >
                    <TrendingDown className="w-4 h-4" />
                    减少
                  </Button>
                </div>

                {/* 调整数量 */}
                <div className="space-y-2">
                  <Label htmlFor="adjustAmount">调整数量</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="adjustAmount"
                      name="adjustAmount"
                      type="number"
                      min="1"
                      value={adjustAmount}
                      onChange={(e) => setAdjustAmount(parseInt(e.target.value) || 0)}
                      className="flex-1"
                    />
                    <span className="text-sm text-slate-600">积分</span>
                  </div>
                </div>

                {/* 调整原因 */}
                <div className="space-y-2">
                  <Label htmlFor="adjustReason">调整原因（必填）</Label>
                  <Input
                    id="adjustReason"
                    name="adjustReason"
                    value={adjustReason}
                    onChange={(e) => setAdjustReason(e.target.value)}
                    placeholder="请输入调整原因"
                    required
                  />
                </div>

                {/* 预览 */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                  <p className="text-blue-900">
                    <strong>调整后余额：</strong>
                    {adjustType === 'increase'
                      ? userInfo.pointsBalance + adjustAmount
                      : userInfo.pointsBalance - adjustAmount}
                    积分
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setAdjustDialogOpen(false)}>
                  取消
                </Button>
                <Button type="submit" disabled={!adjustReason || adjustAmount <= 0}>
                  确定
                </Button>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
        </div>
      </div>
    </MainLayout>
  )
}
