/**
 * 商户端 - 邀请会员页面
 */

import { useState } from 'react'
import type { InviteRecord } from './types/inviteMember.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Dialog, DialogContent } from '~/components/ui/dialog'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { QrCode, X, Download } from 'lucide-react'

interface InviteMemberPageProps {
  records: InviteRecord[]
}

export default function InviteMemberPage({ records }: InviteMemberPageProps) {
  const [qrDialogOpen, setQrDialogOpen] = useState(false)

  const handleDownloadQR = () => {
    console.log('下载二维码')
  }

  // 按受邀时间倒序排列
  const sortedRecords = [...records].sort((a, b) =>
    new Date(b.invitedAt).getTime() - new Date(a.invitedAt).getTime()
  )

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-5xl mx-auto p-6 space-y-6">
          {/* 页面标题 */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">邀请会员</h1>
            <Button onClick={() => setQrDialogOpen(true)} size="lg">
              邀请会员
            </Button>
          </div>

          {/* 邀请记录列表 */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">受邀人</TableHead>
                    <TableHead className="min-w-[180px]">受邀时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium text-slate-900">
                        {record.inviteeName || record.inviteePhone}
                      </TableCell>
                      <TableCell className="text-slate-600">{record.invitedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {sortedRecords.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  暂无邀请记录
                </div>
              )}
            </CardContent>
          </Card>

          {/* 邀请二维码弹窗 */}
          <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
            <DialogContent className="max-w-sm p-0">
              {/* 关闭按钮 */}
              <button
                onClick={() => setQrDialogOpen(false)}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">关闭</span>
              </button>

              <div className="p-6 space-y-4">
                {/* 二维码 */}
                <div className="flex items-center justify-center">
                  <div className="w-64 h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                    <QrCode className="w-48 h-48 text-slate-400" />
                  </div>
                </div>

                {/* 保存图片按钮 */}
                <Button onClick={handleDownloadQR} variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  保存图片
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </MainLayout>
  )
}
