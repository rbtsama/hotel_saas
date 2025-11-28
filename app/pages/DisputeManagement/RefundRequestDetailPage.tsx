/**
 * 退款申请详情页面
 */

import { useState } from 'react'
import type { RefundRequest } from './types/dispute.types'
import { RefundStatus, RefundChannel } from './types/dispute.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Badge } from '~/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { User, Store, ImageIcon } from 'lucide-react'
import MainLayout from '../PointsSystem/components/MainLayout'
import BackButton from '../SharedComponents/BackButton'

interface RefundRequestDetailPageProps {
  request: RefundRequest
}

const statusLabels: Record<RefundStatus, string> = {
  [RefundStatus.PENDING_MERCHANT]: '待商家处理',
  [RefundStatus.ARBITRATING]: '仲裁中',
  [RefundStatus.REFUNDED]: '已退款',
  [RefundStatus.REJECTED]: '已驳回',
}

const statusStyles: Record<RefundStatus, string> = {
  [RefundStatus.PENDING_MERCHANT]: 'bg-orange-50 text-orange-700 border-orange-200',
  [RefundStatus.ARBITRATING]: 'bg-blue-50 text-blue-700 border-blue-200',
  [RefundStatus.REFUNDED]: 'bg-green-50 text-green-700 border-green-200',
  [RefundStatus.REJECTED]: 'bg-red-50 text-red-700 border-red-200',
}

export default function RefundRequestDetailPage({ request }: RefundRequestDetailPageProps) {
  const [arbitrationResult, setArbitrationResult] = useState<string>(request.arbitrationResult || '')
  const [arbitrationRemark, setArbitrationRemark] = useState(request.arbitrationRemark || '')
  const [selectedAction, setSelectedAction] = useState<string>('')

  // 仲裁委员信息（10个委员）
  const [arbitrators, setArbitrators] = useState<Array<{ name: string; vote: string }>>(() =>
    Array.from({ length: 10 }, (_, i) => ({ name: '', vote: '' }))
  )

  const updateArbitrator = (index: number, field: 'name' | 'vote', value: string) => {
    setArbitrators(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  // 判断是否可以操作（仲裁中状态且商家拒绝后）
  const canOperate = request.status === RefundStatus.ARBITRATING && request.merchantApproved === false
  // 判断是否已完成（已退款或已驳回）
  const isCompleted = request.status === RefundStatus.REFUNDED || request.status === RefundStatus.REJECTED

  const handleSubmit = () => {
    // 模拟提交操作
    console.log('提交操作:', { arbitrationResult, arbitrationRemark, selectedAction })
    alert(`操作已提交：${selectedAction === 'reject' ? '驳回申请' : selectedAction === 'merchant_refund' ? '商家退款' : '平台退款'}`)
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-4xl mx-auto p-8 space-y-6">
          {/* 页面标题 */}
          <div className="flex items-center gap-4">
            <BackButton to="/dispute/refund-requests" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">退款申请详情</h1>
            </div>
          </div>

          {/* 基本信息 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-md">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">基本信息</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm text-slate-500">订单号</label>
                  <p className="text-sm font-mono text-slate-900 mt-1">{request.orderNumber}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">用户ID</label>
                  <p className="text-sm text-slate-900 mt-1">{request.userId}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">酒店</label>
                  <p className="text-sm text-slate-900 mt-1">{request.hotelName}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">状态</label>
                  <div className="mt-1">
                    <Badge className={statusStyles[request.status]}>
                      {statusLabels[request.status]}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-500">用户实付金额</label>
                  <p className="text-sm text-slate-900 mt-1">¥{request.actualPaid.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">申请退款金额</label>
                  <p className="text-sm font-semibold text-orange-600 mt-1">¥{request.refundAmount.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">退款比例</label>
                  <p className="text-sm text-slate-900 mt-1">{request.refundRatio}%</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">申请时间</label>
                  <p className="text-sm text-slate-900 mt-1">{request.createdAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 用户说辞 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-md">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4" />
                用户说辞
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm text-slate-500">退款理由</label>
                <p className="text-sm text-slate-900 mt-1 bg-slate-50 p-3 rounded-md">{request.userReason}</p>
              </div>
              {request.userEvidence && request.userEvidence.length > 0 && (
                <div>
                  <label className="text-sm text-slate-500 flex items-center gap-1">
                    <ImageIcon className="w-4 h-4" />
                    证据图片 ({request.userEvidence.length}张)
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {request.userEvidence.map((img, idx) => (
                      <div key={idx} className="w-20 h-20 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 text-xs">
                        图片{idx + 1}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 商家说辞（如果有） */}
          {(request.merchantResponse || request.merchantEvidence?.length) && (
            <Card className="rounded-xl border-slate-200 bg-white shadow-md">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  商家说辞
                  {request.merchantApproved !== undefined && (
                    <Badge className={request.merchantApproved ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}>
                      {request.merchantApproved ? '同意退款' : '拒绝退款'}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {request.merchantResponse && (
                  <div>
                    <label className="text-sm text-slate-500">商家回复</label>
                    <p className="text-sm text-slate-900 mt-1 bg-slate-50 p-3 rounded-md">{request.merchantResponse}</p>
                  </div>
                )}
                {request.merchantResponseAt && (
                  <div>
                    <label className="text-sm text-slate-500">回复时间</label>
                    <p className="text-sm text-slate-900 mt-1">{request.merchantResponseAt}</p>
                  </div>
                )}
                {request.merchantEvidence && request.merchantEvidence.length > 0 && (
                  <div>
                    <label className="text-sm text-slate-500 flex items-center gap-1">
                      <ImageIcon className="w-4 h-4" />
                      商家图片 ({request.merchantEvidence.length}张)
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {request.merchantEvidence.map((img, idx) => (
                        <div key={idx} className="w-20 h-20 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 text-xs">
                          图片{idx + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* 平台处理（仲裁结果和操作） */}
          {(canOperate || isCompleted) && (
            <Card className="rounded-xl border-slate-200 bg-white shadow-md">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-base font-semibold text-slate-900">平台处理</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* 已完成状态：只读展示 */}
                {isCompleted && (
                  <>
                    {request.arbitrationResult && (
                      <div>
                        <label className="text-sm text-slate-500">仲裁结果</label>
                        <div className="mt-1">
                          <Badge className={request.arbitrationResult === 'approved' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}>
                            {request.arbitrationResult === 'approved' ? '仲裁通过' : '仲裁驳回'}
                          </Badge>
                        </div>
                      </div>
                    )}
                    {request.arbitrationRemark && (
                      <div>
                        <label className="text-sm text-slate-500">备注</label>
                        <p className="text-sm text-slate-900 mt-1 bg-slate-50 p-3 rounded-md">{request.arbitrationRemark}</p>
                      </div>
                    )}
                    {request.refundChannel && (
                      <div>
                        <label className="text-sm text-slate-500">退款渠道</label>
                        <p className="text-sm text-slate-900 mt-1">
                          {request.refundChannel === RefundChannel.MERCHANT ? '商家退款' : '平台退款'}
                        </p>
                      </div>
                    )}
                    {request.completedAt && (
                      <div>
                        <label className="text-sm text-slate-500">完成时间</label>
                        <p className="text-sm text-slate-900 mt-1">{request.completedAt}</p>
                      </div>
                    )}
                  </>
                )}

                {/* 仲裁中状态：可编辑 */}
                {canOperate && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">仲裁结果</label>
                      <Select value={arbitrationResult} onValueChange={setArbitrationResult}>
                        <SelectTrigger className="h-9 border-slate-300 w-48">
                          <SelectValue placeholder="选择仲裁结果" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">仲裁通过（支持用户）</SelectItem>
                          <SelectItem value="rejected">仲裁驳回（支持商家）</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 仲裁委员投票 */}
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-3 block">仲裁小法庭投票记录（10位委员）</label>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                        {arbitrators.map((arbitrator, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 w-12">委员{index + 1}</span>
                            <Input
                              placeholder="姓名"
                              value={arbitrator.name}
                              onChange={(e) => updateArbitrator(index, 'name', e.target.value)}
                              className="h-9 border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 w-28"
                            />
                            <div className="flex gap-1">
                              <Button
                                type="button"
                                variant={arbitrator.vote === 'support' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateArbitrator(index, 'vote', 'support')}
                                className={`h-8 px-3 text-xs ${
                                  arbitrator.vote === 'support'
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                支持
                              </Button>
                              <Button
                                type="button"
                                variant={arbitrator.vote === 'reject' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateArbitrator(index, 'vote', 'reject')}
                                className={`h-8 px-3 text-xs ${
                                  arbitrator.vote === 'reject'
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                驳回
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">备注</label>
                      <Textarea
                        value={arbitrationRemark}
                        onChange={(e) => setArbitrationRemark(e.target.value)}
                        placeholder="记录仲裁小法庭的投票结果和理由..."
                        className="border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                        rows={3}
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <label className="text-sm font-medium text-slate-700 mb-3 block">选择操作（三选一）</label>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant={selectedAction === 'reject' ? 'default' : 'outline'}
                          onClick={() => setSelectedAction('reject')}
                          className={selectedAction === 'reject' ? 'bg-red-600 hover:bg-red-700' : 'border-red-300 text-red-600 hover:bg-red-50'}
                        >
                          驳回申请
                        </Button>
                        <Button
                          variant={selectedAction === 'merchant_refund' ? 'default' : 'outline'}
                          onClick={() => setSelectedAction('merchant_refund')}
                          className={selectedAction === 'merchant_refund' ? 'bg-orange-600 hover:bg-orange-700' : 'border-orange-300 text-orange-600 hover:bg-orange-50'}
                        >
                          商家退款
                        </Button>
                        <Button
                          variant={selectedAction === 'platform_refund' ? 'default' : 'outline'}
                          onClick={() => setSelectedAction('platform_refund')}
                          className={selectedAction === 'platform_refund' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-300 text-blue-600 hover:bg-blue-50'}
                        >
                          平台退款
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={handleSubmit}
                        disabled={!selectedAction}
                        className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                      >
                        确认提交
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
