import { Link, useNavigate } from '@remix-run/react'
import type { RefundRequest } from './types/refundManagement.types'
import { REFUND_STATUS_LABELS } from './types/refundManagement.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { ArrowLeft, CheckCircle, XCircle, Calendar, AlertCircle } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LogicPanel, { LogicList, LogicTable, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'
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

  // LogicPanel 内容
  const logicSections = [
    {
      title: '退款详情页说明',
      content: (
        <div className="space-y-3">
          <p>退款详情页展示了客人退款申请的完整信息，帮助商家做出合理的处理决策。</p>
          <LogicList items={[
            '退款申请信息：包含申请时间、订单号、客人信息等基础数据',
            '订单详情：展示房型、入住日期等订单相关信息',
            '退款金额：对比支付金额和申请退款金额',
            '退款原因：客人填写的退款理由',
            '处理时间线：完整记录退款处理的各个环节',
            '操作按钮：提供同意、拒绝、协商等处理选项',
          ]} />
        </div>
      )
    },
    {
      title: '处理决策指南',
      content: (
        <div className="space-y-3">
          <p>在处理退款申请时，建议遵循以下原则：</p>
          <LogicTable
            headers={['场景', '建议操作', '注意事项']}
            rows={[
              ['符合退款政策', '直接同意退款', '按政策规定的比例退款'],
              ['不符合政策', '礼貌拒绝，说明原因', '可提供改期等替代方案'],
              ['存在争议', '先与客人沟通', '了解详细情况后再做决定'],
              ['需要证据', '要求客人提供照片等', '保存沟通记录'],
              ['协商空间', '提出协商改期', '灵活处理，维护客户关系'],
            ]}
          />
          <LogicHighlight type="info">
            <strong>处理原则：</strong>合理合法、公平公正、及时响应、灵活处理
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '时间线解读',
      content: (
        <div className="space-y-3">
          <p>处理时间线记录了退款申请的完整流程，帮助追溯和分析：</p>
          <LogicList items={[
            <><strong>客人提交申请</strong>：记录申请时间和退款金额</>,
            <><strong>商家处理</strong>：记录审核人员和处理结果</>,
            <><strong>平台介入</strong>：如有争议，记录平台客服介入情况</>,
            <><strong>退款执行</strong>：记录实际退款时间和方式</>,
            <><strong>流程结束</strong>：标记最终状态（已退款/客人撤诉等）</>,
          ]} />
          <LogicHighlight type="warning">
            <strong>重要：</strong>每个环节都会自动记录操作人和时间，确保流程可追溯。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '操作按钮说明',
      content: (
        <div className="space-y-3">
          <LogicTable
            headers={['按钮', '功能', '使用场景']}
            rows={[
              ['同意退款', '批准客人的退款申请', '符合退款政策，同意全额或部分退款'],
              ['拒绝退款', '拒绝客人的退款申请', '不符合退款政策，需说明拒绝理由'],
              ['协商改期', '与客人协商改期入住', '客人因行程变动申请退款，可改期解决'],
            ]}
          />
          <p className="text-sm text-muted-foreground">
            注：只有状态为"待审核"的申请才能进行处理操作。
          </p>
        </div>
      )
    },
    {
      title: '最佳实践',
      content: (
        <div className="space-y-3">
          <LogicHighlight type="success">
            <p className="mb-2"><strong>推荐做法：</strong></p>
            <LogicList items={[
              '及时响应：24小时内给出处理意见',
              '证据留存：保存聊天记录、照片等证据',
              '客户沟通：处理前先与客人电话沟通',
              '灵活处理：在政策范围内尽量满足客人需求',
              '记录完整：在系统中详细记录处理过程',
              '数据分析：定期分析退款原因，改进服务',
            ]} />
          </LogicHighlight>
        </div>
      )
    },
  ]

  // 主内容区
  const mainContent = (
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
  )

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：主内容区（60%） */}
        <div className={`${isPresentationMode ? 'w-full' : 'w-[60%]'} overflow-y-auto border-r`}>
          {mainContent}
        </div>

        {/* 右侧：LogicPanel（40%） */}
        {!isPresentationMode && (
          <div className="w-[40%]">
            <LogicPanel title="退款详情处理" sections={logicSections} />
          </div>
        )}
      </div>
    </MainLayout>
  )
}
