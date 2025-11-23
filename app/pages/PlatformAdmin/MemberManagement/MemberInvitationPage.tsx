/**
 * 平台后台 - 会员邀请页面
 */

import type { MemberInvitationRecord } from './types/memberInvitation.types'
import { Card, CardContent } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface MemberInvitationPageProps {
  invitations: MemberInvitationRecord[]
}

export default function MemberInvitationPage({ invitations }: MemberInvitationPageProps) {
  const getRoleBadge = (role: 'user' | 'merchant') => {
    if (role === 'user') {
      return <Badge className="bg-blue-100 text-blue-700">用户</Badge>
    }
    return <Badge className="bg-purple-100 text-purple-700">商户</Badge>
  }

  const getVipLevelBadge = (level: number) => {
    if (level === 0) {
      return <Badge variant="outline" className="text-slate-600">VIP0</Badge>
    }
    return <Badge className="bg-amber-100 text-amber-700">VIP{level}</Badge>
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* 页面标题 */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">会员邀请</h1>
          </div>

          {/* 邀请记录列表 */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px]">VIP获得时间</TableHead>
                    <TableHead className="min-w-[100px]">VIP等级</TableHead>
                    <TableHead className="min-w-[120px]">受邀人</TableHead>
                    <TableHead className="min-w-[100px]">邀请角色</TableHead>
                    <TableHead className="min-w-[120px]">邀请人</TableHead>
                    <TableHead className="min-w-[180px]">用户注册时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.vipAcquiredAt}</TableCell>
                      <TableCell>{getVipLevelBadge(record.vipLevel)}</TableCell>
                      <TableCell className="text-slate-600">{record.inviteeId}</TableCell>
                      <TableCell>{getRoleBadge(record.inviterRole)}</TableCell>
                      <TableCell className="text-slate-600">
                        {record.inviterRole === 'merchant' ? '-' : record.inviterId}
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{record.userRegisteredAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {invitations.length === 0 && (
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
                <p className="font-medium text-foreground">记录说明:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>用户邀请: 普通用户邀请他人注册,受邀人获得VIP0</li>
                  <li>商户邀请: 商户发起邀请,受邀人获得VIP1体验卡(7天有效期)</li>
                  <li>VIP获得时间为受邀人实际获得VIP的时间</li>
                  <li>记录按VIP获得时间倒序排列</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
