/**
 * 优惠券记录页面
 */

import { useState } from 'react'
import { Link, useNavigation } from '@remix-run/react'
import type { CouponRecord, PaginatedResult } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { ArrowLeft } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface CouponRecordsPageProps {
  records: PaginatedResult<CouponRecord>
  error: string | null
}

/**
 * 获取优惠券类型文本
 */
function getCouponTypeText(type: string): string {
  const map: Record<string, string> = {
    full_reduction: '满减券',
    discount: '折扣券',
    instant_reduction: '立减券',
  }
  return map[type] || type
}

/**
 * 获取优惠券类型颜色样式
 */
function getCouponTypeBadgeClass(type: string): string {
  const classMap: Record<string, string> = {
    full_reduction: 'bg-orange-50 text-orange-700 border-orange-300',
    discount: 'bg-green-50 text-green-700 border-green-300',
    instant_reduction: 'bg-blue-50 text-blue-700 border-blue-300',
  }
  return classMap[type] || 'border-slate-300 text-slate-700'
}

/**
 * 获取发放类型文本
 */
function getDistributionTypeText(type: string): string {
  const map: Record<string, string> = {
    registration: '注册发放',
    checkout: '离店发放',
    manual_vip: '手动(VIP)',
    manual_phone: '手动(手机号)',
  }
  return map[type] || type
}

export default function CouponRecordsPage({ records, error }: CouponRecordsPageProps) {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  // 详情Dialog状态
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<CouponRecord | null>(null)

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            错误: {error}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-6">
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <Link to="/platform-admin/coupon-management/distribution">
              <Button variant="outline" size="sm" className="h-8">
                <ArrowLeft className="w-4 h-4 mr-1" />
                返回
              </Button>
            </Link>
            <CardTitle className="text-lg font-semibold text-slate-900">
              优惠券记录 (共{records.total}条)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 bg-slate-50">
                    <TableHead className="text-slate-600 font-semibold">优惠券ID</TableHead>
                    <TableHead className="text-slate-600 font-semibold">优惠券类型</TableHead>
                    <TableHead className="text-slate-600 font-semibold">优惠券名称</TableHead>
                    <TableHead className="text-slate-600 font-semibold">发放类型</TableHead>
                    <TableHead className="text-slate-600 font-semibold">发放对象</TableHead>
                    <TableHead className="text-slate-600 font-semibold">操作时间</TableHead>
                    <TableHead className="text-slate-600 font-semibold">操作人</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-slate-500 py-8">
                        暂无记录
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.data.map((record, index) => (
                      <TableRow key={`${record.couponId}-${record.operatedAt}-${index}`} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="text-slate-900 font-medium">{record.couponId}</TableCell>
                        <TableCell>
                          <Badge className={`${getCouponTypeBadgeClass(record.couponType)} border`}>
                            {getCouponTypeText(record.couponType)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-900">{record.couponName}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              record.distributionType === 'registration' || record.distributionType === 'checkout'
                                ? 'border-blue-300 text-blue-700 bg-blue-50'
                                : 'border-purple-300 text-purple-700 bg-purple-50'
                            }
                          >
                            {getDistributionTypeText(record.distributionType)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {record.userPhone === '多手机号' ? (
                            <Button
                              variant="link"
                              className="h-auto p-0 text-blue-600"
                              onClick={() => {
                                setSelectedRecord(record)
                                setDetailDialogOpen(true)
                              }}
                            >
                              详情
                            </Button>
                          ) : (
                            <span className="text-slate-700 font-mono text-sm">{record.userPhone}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-slate-600 text-sm">{record.operatedAt}</TableCell>
                        <TableCell className="text-slate-600 text-sm">{record.operatedBy}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {isLoading && (
              <div className="text-center text-slate-500 py-4">
                加载中...
              </div>
            )}

            {/* 分页 */}
            {records.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-slate-600">
                  第 {records.page} 页，共 {records.totalPages} 页
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/platform-admin/coupon-management/records?page=${records.page - 1}`}
                    className={records.page === 1 ? 'pointer-events-none' : ''}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={records.page === 1}
                      className="h-8"
                    >
                      上一页
                    </Button>
                  </Link>
                  <Link
                    to={`/platform-admin/coupon-management/records?page=${records.page + 1}`}
                    className={records.page === records.totalPages ? 'pointer-events-none' : ''}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={records.page === records.totalPages}
                      className="h-8"
                    >
                      下一页
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 发放对象详情Dialog */}
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>发放详情</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedRecord?.vipLevels && selectedRecord.vipLevels.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">
                    发放VIP等级
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecord.vipLevels.map((vip) => (
                      <Badge key={vip} variant="outline" className="border-blue-300 text-blue-700">
                        {vip}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {selectedRecord?.phones && selectedRecord.phones.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">
                    发放手机号列表 (共{selectedRecord.phones.length}个)
                  </Label>
                  <div className="max-h-60 overflow-y-auto space-y-1 text-sm text-slate-600">
                    {selectedRecord.phones.map((phone, index) => (
                      <div key={index} className="font-mono">{phone}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
