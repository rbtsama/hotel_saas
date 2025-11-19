import { Link, useNavigate } from '@remix-run/react'
import type { RefundRequest } from './types/refundManagement.types'
import { REFUND_STATUS_LABELS } from './types/refundManagement.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { ArrowLeft, CheckCircle, XCircle, Calendar, AlertCircle } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { useViewMode } from '~/contexts/ViewModeContext'

interface RefundDetailPageProps {
  refund: RefundRequest
}

export default function RefundDetailPage({ refund }: RefundDetailPageProps) {
  const navigate = useNavigate()
  const { isPresentationMode } = useViewMode()

  const handleApprove = () => {
    alert('同意退款功能开发中...')
  }

  const handleReject = () => {
    alert('拒绝退款功能开发中...')
  }

  const handleNegotiate = () => {
    alert('协商改期功能开发中...')
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：主内容区（60%） */}
        <div className={`${isPresentationMode ? 'w-full' : 'w-[60%]'} overflow-y-auto border-r`}>
          <div className="p-6 space-y-6">
      {/* 返回按钮 */}
      <div>
        <Link to="/hotel-backend/refund-management">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回列表
          </Button>
        </Link>
      </div>

      {/* 标题和状态 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">退款申请详情</h1>
          <p className="text-sm text-muted-foreground mt-1">
            申请时间：{refund.requestTime}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
          <span className="text-sm text-muted-foreground">当前状态：</span>
          <span className="font-semibold">{REFUND_STATUS_LABELS[refund.processStatus]}</span>
        </div>
      </div>

      {/* 基本信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">退款申请信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">订单号</div>
              <div className="font-mono font-semibold">{refund.orderNumber}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">申请时间</div>
              <div>{refund.requestTime}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">客人姓名</div>
              <div>{refund.guestName || '-'}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">客人手机号</div>
              <div>{refund.guestPhone}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 订单信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">订单信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">房型</div>
              <div>{refund.roomType || '-'}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">入住日期</div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {refund.checkInDate || '-'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">离店日期</div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {refund.checkOutDate || '-'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 退款金额 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">退款金额</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">客人支付金额</div>
              <div className="text-2xl font-bold">¥{refund.paidAmount}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">申请退款金额</div>
              <div className="text-2xl font-bold text-orange-600">¥{refund.refundAmount}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">退款比例</div>
              <div className="text-2xl font-bold text-blue-600">
                {((refund.refundAmount / refund.paidAmount) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 退款原因 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            退款原因
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm leading-relaxed">
              {refund.refundReason || '客人未填写退款原因'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 处理时间线 */}
      {refund.timeline && refund.timeline.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">处理时间线</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {refund.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    {index < refund.timeline!.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{item.status}</span>
                      {item.operator && (
                        <span className="text-sm text-muted-foreground">
                          - {item.operator}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {item.time}
                    </div>
                    {item.note && (
                      <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded mt-2">
                        {item.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 操作按钮 */}
      {refund.processStatus === 'pending' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">处理操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button onClick={handleApprove} className="flex-1" size="lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                同意退款
              </Button>
              <Button onClick={handleReject} variant="destructive" className="flex-1" size="lg">
                <XCircle className="h-5 w-5 mr-2" />
                拒绝退款
              </Button>
              <Button onClick={handleNegotiate} variant="outline" className="flex-1" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                协商改期
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
          </div>
        </div>

        {/* 右侧：LogicPanel（40%） */}
        {!isPresentationMode && (
          <div className="w-[40%]">
            {/* LogicPanel placeholder */}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
