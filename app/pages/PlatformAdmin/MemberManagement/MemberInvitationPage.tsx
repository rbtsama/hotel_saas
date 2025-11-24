/**
 * 平台后台 - 会员邀请页面
 */

import { useState } from 'react'
import type { MemberInvitationRecord } from './types/memberInvitation.types'
import { Card, CardContent } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MemberInvitationPageProps {
  invitations: MemberInvitationRecord[]
}

export default function MemberInvitationPage({ invitations }: MemberInvitationPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 计算分页
  const totalPages = Math.ceil(invitations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentInvitations = invitations.slice(startIndex, endIndex)

  const getRoleBadge = (role: 'user' | 'merchant') => {
    if (role === 'user') {
      return <Badge className="bg-blue-50 text-blue-700 border-blue-200">用户</Badge>
    }
    return <Badge className="bg-purple-50 text-purple-700 border-purple-200">商户</Badge>
  }

  const getVipLevelBadge = (level: number) => {
    if (level === 0) {
      return <Badge className="bg-slate-50 text-slate-700 border-slate-200">VIP0</Badge>
    }
    return <Badge className="bg-amber-50 text-amber-700 border-amber-200">VIP{level}</Badge>
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
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="min-w-[100px] text-slate-900 font-semibold">邀请角色</TableHead>
                    <TableHead className="min-w-[120px] text-slate-900 font-semibold">邀请人</TableHead>
                    <TableHead className="min-w-[120px] text-slate-900 font-semibold">受邀人</TableHead>
                    <TableHead className="min-w-[100px] text-slate-900 font-semibold">VIP等级</TableHead>
                    <TableHead className="min-w-[180px] text-slate-900 font-semibold">VIP获得时间</TableHead>
                    <TableHead className="min-w-[180px] text-slate-900 font-semibold">受邀人注册时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentInvitations.map((record) => (
                    <TableRow key={record.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                      <TableCell>{getRoleBadge(record.inviterRole)}</TableCell>
                      <TableCell className="text-sm text-slate-900 font-medium">
                        {record.inviterId}
                      </TableCell>
                      <TableCell className="text-sm text-slate-900 font-medium">{record.inviteeId}</TableCell>
                      <TableCell>{getVipLevelBadge(record.vipLevel)}</TableCell>
                      <TableCell className="text-sm text-slate-900">{record.vipAcquiredAt}</TableCell>
                      <TableCell className="text-sm text-slate-900">{record.userRegisteredAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {invitations.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  暂无邀请记录
                </div>
              )}
            </CardContent>
          </Card>

          {/* 分页组件 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                共 {invitations.length} 条记录，第 {currentPage} / {totalPages} 页
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-8 border-slate-300"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  上一页
                </Button>
                <div className="text-sm text-slate-900 px-3">
                  {currentPage} / {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 border-slate-300"
                >
                  下一页
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
