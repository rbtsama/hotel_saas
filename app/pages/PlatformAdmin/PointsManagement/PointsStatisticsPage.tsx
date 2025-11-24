/**
 * 平台后台 - 积分发放统计页面
 */

import { useState } from 'react'
import type { PointsStatistics } from './types/points.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { TrendingUp, TrendingDown, Activity, Download } from 'lucide-react'

interface PointsStatisticsPageProps {
  statistics: PointsStatistics
}

export default function PointsStatisticsPage({ statistics }: PointsStatisticsPageProps) {
  const [dateRange, setDateRange] = useState('7days')

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">积分发放与使用统计</h1>
            <p className="text-slate-600 mt-1">
              查看积分发放、使用、流通数据，分析用户行为
            </p>
          </div>
          <Button className="gap-2 h-9 rounded-md bg-blue-600 hover:bg-blue-700 shadow-sm">
            <Download className="w-4 h-4" />
            导出报表
          </Button>
        </div>

        {/* 时间筛选 */}
        <Card className="mb-6 rounded-xl border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">时间范围：</span>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48 h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">最近7天</SelectItem>
                  <SelectItem value="30days">最近30天</SelectItem>
                  <SelectItem value="90days">最近90天</SelectItem>
                  <SelectItem value="custom">自定义</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 核心数据卡片 */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Card className="rounded-xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-slate-600">累计发放积分</CardDescription>
                <div className="p-2 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {statistics.totalIssued.toLocaleString()}
              </div>
              <p className="text-sm text-slate-500 mt-1">积分</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-slate-600">累计使用积分</CardDescription>
                <div className="p-2 bg-red-50 rounded-lg">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {statistics.totalUsed.toLocaleString()}
              </div>
              <p className="text-sm text-slate-500 mt-1">积分</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-slate-600">当前流通积分</CardDescription>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {statistics.currentCirculation.toLocaleString()}
              </div>
              <p className="text-sm text-slate-500 mt-1">积分</p>
            </CardContent>
          </Card>
        </div>

        {/* 积分发放明细 */}
        <Card className="mb-6 rounded-xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-slate-900">积分发放明细</CardTitle>
            <CardDescription className="text-slate-600">按发放类型统计积分发放情况</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-600">发放类型</TableHead>
                  <TableHead className="text-right text-slate-600">数量</TableHead>
                  <TableHead className="text-right text-slate-600">占比</TableHead>
                  <TableHead className="w-48 text-slate-600">占比图</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statistics.issueBreakdown.map((item) => (
                  <TableRow key={item.type} className="border-slate-200 hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium text-slate-900">{item.typeName}</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">
                      {item.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-slate-700">{item.percentage.toFixed(1)}%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full transition-all"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 积分使用明细 */}
        <Card className="rounded-xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-slate-900">积分使用明细</CardTitle>
            <CardDescription className="text-slate-600">按使用类型统计积分消耗情况</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-600">使用类型</TableHead>
                  <TableHead className="text-right text-slate-600">数量</TableHead>
                  <TableHead className="text-right text-slate-600">占比</TableHead>
                  <TableHead className="w-48 text-slate-600">占比图</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statistics.usageBreakdown.map((item) => (
                  <TableRow key={item.type} className="border-slate-200 hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium text-slate-900">{item.typeName}</TableCell>
                    <TableCell className="text-right font-semibold text-red-600">
                      {item.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-slate-700">{item.percentage.toFixed(1)}%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-red-500 rounded-full transition-all"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>
      </div>
    </MainLayout>
  )
}
