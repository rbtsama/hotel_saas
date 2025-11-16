/**
 * 仲裁案件管理页面
 */

import type { ArbitrationCase } from './types/dispute.types'
import { ArbitrationDecision } from './types/dispute.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import MainLayout from '../PointsSystem/components/MainLayout'

interface ArbitrationCasesPageProps {
  cases: ArbitrationCase[]
}

export default function ArbitrationCasesPage({ cases }: ArbitrationCasesPageProps) {
  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">仲裁案件管理</h1>
          <p className="text-sm text-slate-500 mt-1">
            管理进入仲裁流程的退款申请,查看仲裁委员投票情况
          </p>
        </div>

        {/* 仲裁案件列表 */}
        <Card>
          <CardHeader>
            <CardTitle>仲裁案件列表 (共 {cases.length} 个)</CardTitle>
          </CardHeader>
          <CardContent>
            {cases.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                暂无仲裁案件
              </div>
            ) : (
              <div className="space-y-6">
                {cases.map((arbitrationCase) => (
                  <Card key={arbitrationCase.id} className="border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            案件 #{arbitrationCase.id}
                          </CardTitle>
                          <p className="text-sm text-slate-500 mt-1">
                            订单号: {arbitrationCase.refundRequest.orderNumber} | 酒店: {arbitrationCase.hotelName}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            arbitrationCase.status === 'voting'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {arbitrationCase.status === 'voting' ? '投票中' : '已完成'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* 退款申请信息 */}
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">退款申请信息</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-slate-600">用户:</span>{' '}
                            <span className="font-medium">{arbitrationCase.refundRequest.userName}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">退款金额:</span>{' '}
                            <span className="font-semibold text-red-600">
                              ¥{arbitrationCase.refundRequest.refundAmount}
                            </span>{' '}
                            ({arbitrationCase.refundRequest.refundRatio}%)
                          </div>
                          <div className="col-span-2">
                            <span className="text-slate-600">退款理由:</span>{' '}
                            {arbitrationCase.refundRequest.reason || '-'}
                          </div>
                          <div className="col-span-2">
                            <span className="text-slate-600">商家回复:</span>{' '}
                            {arbitrationCase.refundRequest.merchantResponse || '-'}
                          </div>
                        </div>
                      </div>

                      {/* 投票统计 */}
                      <div className="flex gap-6">
                        <div className="flex-1 bg-green-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-700">
                            {arbitrationCase.supportCount}
                          </div>
                          <div className="text-sm text-green-600">支持退款</div>
                        </div>
                        <div className="flex-1 bg-red-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-red-700">
                            {arbitrationCase.opposeCount}
                          </div>
                          <div className="text-sm text-red-600">反对退款</div>
                        </div>
                        <div className="flex-1 bg-slate-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-slate-700">
                            {arbitrationCase.pendingCount}
                          </div>
                          <div className="text-sm text-slate-600">待投票</div>
                        </div>
                      </div>

                      {/* 投票详情 */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">
                          仲裁委员投票详情 (7人)
                        </h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>委员姓名</TableHead>
                              <TableHead>手机号</TableHead>
                              <TableHead>投票决策</TableHead>
                              <TableHead>投票时间</TableHead>
                              <TableHead>意见</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {arbitrationCase.votes.map((vote) => (
                              <TableRow key={vote.arbitratorId}>
                                <TableCell>{vote.arbitratorName}</TableCell>
                                <TableCell className="font-mono text-sm">
                                  {vote.arbitratorPhone}
                                </TableCell>
                                <TableCell>
                                  {vote.decision === ArbitrationDecision.SUPPORT && (
                                    <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                      ✓ 支持
                                    </span>
                                  )}
                                  {vote.decision === ArbitrationDecision.OPPOSE && (
                                    <span className="inline-flex px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                                      ✗ 反对
                                    </span>
                                  )}
                                  {vote.decision === ArbitrationDecision.PENDING && (
                                    <span className="inline-flex px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
                                      ⏳ 待投票
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell className="text-sm text-slate-600">
                                  {vote.votedAt || '-'}
                                </TableCell>
                                <TableCell className="text-sm text-slate-600">
                                  {vote.comment || '-'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* 最终结果 */}
                      {arbitrationCase.finalResult && (
                        <div
                          className={`p-4 rounded-lg text-center ${
                            arbitrationCase.finalResult === 'approved'
                              ? 'bg-green-100'
                              : 'bg-red-100'
                          }`}
                        >
                          <div className="text-lg font-bold">
                            最终决策:{' '}
                            {arbitrationCase.finalResult === 'approved'
                              ? '同意退款'
                              : '驳回申请'}
                          </div>
                          <div className="text-sm mt-1">
                            完成时间: {arbitrationCase.completedAt}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </MainLayout>
  )
}
