/**
 * 优惠券发放页面
 */

import type { IssueRecord, IssueChannel } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'

interface CouponGrantPageProps {
  records: IssueRecord[]
  error?: string | null
}

const issueChannelLabels: Record<string, string> = {
  manual: '手动发放',
  new_user: '新人注册',
  member_upgrade: '会员升级',
  activity: '活动发放'
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

export default function CouponGrantPage({ records, error }: CouponGrantPageProps) {
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
                <h1 className="text-2xl font-bold text-slate-900">优惠券发放</h1>
                <p className="text-sm text-slate-500 mt-1">
                  管理优惠券发放记录
                </p>
              </div>
              <OperationLogButton moduleName="优惠券发放" />
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>发放记录</CardTitle>
                  <Button>+ 手动发放</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>发放时间</TableHead>
                      <TableHead>优惠券名称</TableHead>
                      <TableHead>发放渠道</TableHead>
                      <TableHead>发放数量</TableHead>
                      <TableHead>操作人</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.recordId}>
                        <TableCell className="text-sm text-slate-600">{record.issuedAt}</TableCell>
                        <TableCell className="font-medium">{record.couponName}</TableCell>
                        <TableCell>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            {issueChannelLabels[record.channel]}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{record.count}张</TableCell>
                        <TableCell className="text-sm text-slate-600">{record.operatorName}</TableCell>
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
                  <>
                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 新人注册自动发券</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div>注册成功！恭喜您获得：</div>
                        <div>满200减30券 × 1张</div>
                        <div>有效期至：2025.02.14</div>
                        <button className="bg-red-500 text-white px-3 py-1 rounded mt-2 text-xs">立即使用</button>
                      </div>
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
