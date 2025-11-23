/**
 * 商户端 - 邀请会员页面
 */

import { useState } from 'react'
import type { InviteRecord, InviteStatistics } from './types/inviteMember.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { UserPlus, Gift } from 'lucide-react'

interface InviteMemberPageProps {
  records: InviteRecord[]
  statistics: InviteStatistics
}

export default function InviteMemberPage({ records, statistics }: InviteMemberPageProps) {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [inviterPhone, setInviterPhone] = useState('')
  const [inviteePhone, setInviteePhone] = useState('')
  const [searchPhone, setSearchPhone] = useState('')

  const handleInvite = () => {
    console.log('发起邀请:', { inviterPhone, inviteePhone })
    setInviteDialogOpen(false)
    setInviterPhone('')
    setInviteePhone('')
  }

  const filteredRecords = searchPhone
    ? records.filter(r =>
        r.inviterPhone.includes(searchPhone) ||
        r.inviteePhone.includes(searchPhone)
      )
    : records

  const getRegistrationStatusBadge = (status: InviteRecord['registrationStatus']) => {
    switch (status) {
      case 'registered':
        return <Badge className="bg-green-100 text-green-700">已注册</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">待注册</Badge>
      case 'expired':
        return <Badge variant="outline" className="text-slate-500">已过期</Badge>
    }
  }

  const getRewardStatusBadge = (status: InviteRecord['rewardStatus'], points?: number) => {
    switch (status) {
      case 'rewarded':
        return <Badge className="bg-blue-100 text-blue-700">已发放 {points}分</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">待发放</Badge>
      case 'not_eligible':
        return <Badge variant="outline" className="text-slate-400">未达成</Badge>
    }
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* 页面标题 */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">邀请会员</h1>
              <p className="text-slate-600 mt-1">
                帮助老客户邀请新会员注册,双方获得奖励
              </p>
            </div>
            <Button onClick={() => setInviteDialogOpen(true)} className="gap-2">
              <UserPlus className="w-4 h-4" />
              发起邀请
            </Button>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-slate-600">总邀请数</div>
                <div className="text-3xl font-bold text-slate-900 mt-2">
                  {statistics.totalInvites}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-slate-600">成功注册</div>
                <div className="text-3xl font-bold text-green-600 mt-2">
                  {statistics.successfulRegistrations}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-slate-600">待注册</div>
                <div className="text-3xl font-bold text-yellow-600 mt-2">
                  {statistics.pendingRegistrations}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-slate-600">总奖励积分</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  {statistics.totalRewardPoints}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 搜索和筛选 */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="searchPhone">手机号搜索</Label>
                  <Input
                    id="searchPhone"
                    placeholder="输入老客户或被邀请人手机号"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={() => setSearchPhone('')}>
                  清除
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 邀请记录列表 */}
          <Card>
            <CardHeader>
              <CardTitle>邀请记录</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>老客户</TableHead>
                    <TableHead>被邀请人</TableHead>
                    <TableHead>注册状态</TableHead>
                    <TableHead>奖励状态</TableHead>
                    <TableHead>邀请时间</TableHead>
                    <TableHead>过期时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="font-medium">{record.inviterName}</div>
                        <div className="text-sm text-slate-500">{record.inviterPhone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{record.inviteeName || '-'}</div>
                        <div className="text-sm text-slate-500">{record.inviteePhone}</div>
                      </TableCell>
                      <TableCell>{getRegistrationStatusBadge(record.registrationStatus)}</TableCell>
                      <TableCell>{getRewardStatusBadge(record.rewardStatus, record.rewardPoints)}</TableCell>
                      <TableCell className="text-sm text-slate-600">{record.invitedAt}</TableCell>
                      <TableCell className="text-sm text-slate-600">{record.expiresAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredRecords.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  暂无邀请记录
                </div>
              )}
            </CardContent>
          </Card>

          {/* 说明 */}
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium text-foreground flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  邀请规则:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-6">
                  <li>前台工作人员帮助老客户发起邀请,填写双方手机号</li>
                  <li>被邀请人7天内注册成功,双方各获得50积分奖励</li>
                  <li>超过7天未注册,邀请链接失效</li>
                  <li>奖励积分在被邀请人注册成功后自动发放</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 发起邀请弹窗 */}
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>发起邀请</DialogTitle>
                <DialogDescription>
                  帮助老客户邀请新会员注册,双方各获得50积分
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="inviterPhone">老客户手机号</Label>
                  <Input
                    id="inviterPhone"
                    placeholder="输入老客户的手机号"
                    value={inviterPhone}
                    onChange={(e) => setInviterPhone(e.target.value)}
                    maxLength={11}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inviteePhone">被邀请人手机号</Label>
                  <Input
                    id="inviteePhone"
                    placeholder="输入被邀请人的手机号"
                    value={inviteePhone}
                    onChange={(e) => setInviteePhone(e.target.value)}
                    maxLength={11}
                  />
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
                  <p className="font-medium mb-1">温馨提示:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>邀请链接有效期7天</li>
                    <li>注册成功后双方各获得50积分</li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                  取消
                </Button>
                <Button
                  onClick={handleInvite}
                  disabled={!inviterPhone || !inviteePhone || inviterPhone.length !== 11 || inviteePhone.length !== 11}
                >
                  发送邀请
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </MainLayout>
  )
}
