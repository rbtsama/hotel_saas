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
        <div className="p-4 space-y-4">
        {/* 页面标题 */}
        <div>
          <h1 className="text-xl font-bold text-slate-900">仲裁案件管理</h1>
          <p className="text-xs text-slate-500 mt-1">
            管理进入仲裁流程的退款申请,查看仲裁委员投票情况
          </p>
        </div>

        {/* 仲裁案件列表 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">仲裁案件列表 (共 {cases.length} 个)</CardTitle>
          </CardHeader>
          <CardContent>
            {cases.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                暂无仲裁案件
              </div>
            ) : (
              <div className="space-y-4">
                {cases.map((arbitrationCase) => (
                  <Card key={arbitrationCase.id} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">
                            案件 #{arbitrationCase.id}
                          </CardTitle>
                          <p className="text-xs text-slate-500 mt-0.5">
                            订单号: {arbitrationCase.refundRequest.orderNumber} | 酒店: {arbitrationCase.hotelName}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            arbitrationCase.status === 'voting'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {arbitrationCase.status === 'voting' ? '投票中' : '已完成'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* 退款申请信息 */}
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-sm text-slate-900 mb-2">退款申请信息</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
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
                      <div className="flex gap-3">
                        <div className="flex-1 bg-green-50 p-2 rounded text-center">
                          <div className="text-lg font-bold text-green-700">
                            {arbitrationCase.supportCount}
                          </div>
                          <div className="text-xs text-green-600">支持</div>
                        </div>
                        <div className="flex-1 bg-red-50 p-2 rounded text-center">
                          <div className="text-lg font-bold text-red-700">
                            {arbitrationCase.opposeCount}
                          </div>
                          <div className="text-xs text-red-600">反对</div>
                        </div>
                        <div className="flex-1 bg-slate-50 p-2 rounded text-center">
                          <div className="text-lg font-bold text-slate-700">
                            {arbitrationCase.pendingCount}
                          </div>
                          <div className="text-xs text-slate-600">待投</div>
                        </div>
                      </div>

                      {/* 投票详情 */}
                      <div>
                        <h4 className="font-semibold text-sm text-slate-900 mb-2">
                          仲裁委员投票 (7人)
                        </h4>
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-slate-50">
                                <TableHead className="text-xs py-2">委员</TableHead>
                                <TableHead className="text-xs py-2">手机号</TableHead>
                                <TableHead className="text-xs py-2">决策</TableHead>
                                <TableHead className="text-xs py-2">时间</TableHead>
                                <TableHead className="text-xs py-2">意见</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {arbitrationCase.votes.map((vote) => (
                                <TableRow key={vote.arbitratorId} className="text-xs">
                                  <TableCell className="py-2">{vote.arbitratorName}</TableCell>
                                  <TableCell className="font-mono py-2">
                                    {vote.arbitratorPhone}
                                  </TableCell>
                                  <TableCell className="py-2">
                                    {vote.decision === ArbitrationDecision.SUPPORT && (
                                      <span className="inline-flex px-1.5 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
                                        ✓ 支持
                                      </span>
                                    )}
                                    {vote.decision === ArbitrationDecision.OPPOSE && (
                                      <span className="inline-flex px-1.5 py-0.5 text-xs rounded-full bg-red-100 text-red-700">
                                        ✗ 反对
                                      </span>
                                    )}
                                    {vote.decision === ArbitrationDecision.PENDING && (
                                      <span className="inline-flex px-1.5 py-0.5 text-xs rounded-full bg-slate-100 text-slate-600">
                                        待投
                                      </span>
                                    )}
                                  </TableCell>
                                  <TableCell className="py-2 text-slate-600">
                                    {vote.votedAt || '-'}
                                  </TableCell>
                                  <TableCell className="py-2 text-slate-600">
                                    {vote.comment || '-'}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>

                      {/* 最终结果 */}
                      {arbitrationCase.finalResult && (
                        <div
                          className={`p-2 rounded text-center ${
                            arbitrationCase.finalResult === 'approved'
                              ? 'bg-green-100'
                              : 'bg-red-100'
                          }`}
                        >
                          <div className="text-sm font-bold">
                            最终:{' '}
                            {arbitrationCase.finalResult === 'approved'
                              ? '同意退款'
                              : '驳回申请'}
                          </div>
                          <div className="text-xs mt-0.5 text-slate-600">
                            {arbitrationCase.completedAt}
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
