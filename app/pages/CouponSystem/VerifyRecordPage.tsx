/**
 * 优惠券核销记录页面
 */

import { useState } from 'react'
import type { UserCoupon } from './types/coupon.types'
import { VerifyStatus } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'

interface VerifyRecordPageProps {
  coupons: UserCoupon[]
}

const verifyStatusLabels = {
  [VerifyStatus.UNUSED]: '未使用',
  [VerifyStatus.USED]: '已使用',
  [VerifyStatus.EXPIRED]: '已过期',
}

export default function VerifyRecordPage({ coupons }: VerifyRecordPageProps) {
  const [filterStatus, setFilterStatus] = useState<VerifyStatus | 'all'>('all')

  const filteredCoupons = filterStatus === 'all'
    ? coupons
    : coupons.filter(c => c.status === filterStatus)

  return (
    <MainLayout>
      <div className="flex h-full">
        <div className="w-[60%] h-full overflow-y-auto bg-background p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">核销记录</h1>
            </div>

            <Card>
              <CardHeader>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('all')}
                  >
                    全部
                  </Button>
                  <Button
                    variant={filterStatus === VerifyStatus.UNUSED ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(VerifyStatus.UNUSED)}
                  >
                    未使用
                  </Button>
                  <Button
                    variant={filterStatus === VerifyStatus.USED ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(VerifyStatus.USED)}
                  >
                    已使用
                  </Button>
                  <Button
                    variant={filterStatus === VerifyStatus.EXPIRED ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(VerifyStatus.EXPIRED)}
                  >
                    已过期
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用户</TableHead>
                      <TableHead>优惠券名称</TableHead>
                      <TableHead>优惠内容</TableHead>
                      <TableHead>领取时间</TableHead>
                      <TableHead>过期时间</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>使用订单</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCoupons.map((coupon) => (
                      <TableRow key={coupon.userCouponId}>
                        <TableCell className="text-sm">{coupon.userName}</TableCell>
                        <TableCell className="font-medium">{coupon.couponName}</TableCell>
                        <TableCell className="text-sm text-red-600">{coupon.discountAmount}</TableCell>
                        <TableCell className="text-sm text-slate-600">{coupon.receivedAt}</TableCell>
                        <TableCell className="text-sm text-slate-600">{coupon.expireAt}</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${
                            coupon.status === VerifyStatus.USED ? 'bg-green-100 text-green-700' :
                            coupon.status === VerifyStatus.EXPIRED ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {verifyStatusLabels[coupon.status]}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-blue-600">{coupon.orderId || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-[40%] h-full border-l">
          {/* LogicPanel placeholder */}
        </div>
      </div>
    </MainLayout>
  )
}
