/**
 * 仲裁委员管理页面
 */

import { useState } from 'react'
import type { Arbitrator } from './types/dispute.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import MainLayout from '../PointsSystem/components/MainLayout'

interface ArbitratorsPageProps {
  arbitrators: Arbitrator[]
}

export default function ArbitratorsPage({ arbitrators }: ArbitratorsPageProps) {
  const [selectedHotel, setSelectedHotel] = useState<string>('all')

  // 按酒店分组
  const hotelGroups = arbitrators.reduce((acc, arb) => {
    if (!acc[arb.hotelId]) {
      acc[arb.hotelId] = {
        hotelName: arb.hotelName,
        arbitrators: [],
      }
    }
    acc[arb.hotelId].arbitrators.push(arb)
    return acc
  }, {} as Record<string, { hotelName: string; arbitrators: Arbitrator[] }>)

  const filteredArbitrators = selectedHotel === 'all'
    ? arbitrators
    : hotelGroups[selectedHotel]?.arbitrators || []

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-4 space-y-4">
        {/* 页面标题 */}
        <div>
          <h1 className="text-xl font-bold text-slate-900">仲裁委员管理</h1>
          <p className="text-xs text-slate-500 mt-1">
            管理各酒店的仲裁委员,每个酒店需配置7名委员
          </p>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-xs font-medium text-slate-700 mb-1 block">
                  按酒店筛选
                </label>
                <select
                  className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-md"
                  value={selectedHotel}
                  onChange={(e) => setSelectedHotel(e.target.value)}
                >
                  <option value="all">全部酒店</option>
                  {Object.entries(hotelGroups).map(([hotelId, group]) => (
                    <option key={hotelId} value={hotelId}>
                      {group.hotelName} ({group.arbitrators.length}人)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 酒店仲裁委员列表 */}
        {selectedHotel === 'all' ? (
          // 分组展示
          <div className="space-y-4">
            {Object.entries(hotelGroups).map(([hotelId, group]) => (
              <Card key={hotelId}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{group.hotelName}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600">
                        {group.arbitrators.filter((a) => a.isActive).length} / {group.arbitrators.length} 激活
                      </span>
                      {group.arbitrators.length < 7 && (
                        <span className="px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded">
                          未满7人
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead className="text-xs py-2">姓名</TableHead>
                          <TableHead className="text-xs py-2">手机号</TableHead>
                          <TableHead className="text-xs py-2">状态</TableHead>
                          <TableHead className="text-xs py-2">添加时间</TableHead>
                          <TableHead className="text-xs py-2">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.arbitrators.map((arb) => (
                          <TableRow key={arb.id} className="text-xs">
                            <TableCell className="py-2">{arb.name}</TableCell>
                            <TableCell className="font-mono py-2">{arb.phone}</TableCell>
                            <TableCell className="py-2">
                              <span
                                className={`inline-flex px-1.5 py-0.5 text-xs rounded-full ${
                                  arb.isActive
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {arb.isActive ? '激活' : '停用'}
                              </span>
                            </TableCell>
                            <TableCell className="py-2 text-slate-600">
                              {arb.createdAt}
                            </TableCell>
                            <TableCell className="py-2">
                              <div className="flex gap-1">
                                <Button variant="outline" size="sm" className="h-6 text-xs px-2">
                                  {arb.isActive ? '停用' : '激活'}
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
                                  编辑
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // 单个酒店展示
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {hotelGroups[selectedHotel]?.hotelName} - 仲裁委员
                </CardTitle>
                <Button>添加仲裁委员</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>姓名</TableHead>
                    <TableHead>手机号</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>添加时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArbitrators.map((arb) => (
                    <TableRow key={arb.id}>
                      <TableCell className="font-medium">{arb.name}</TableCell>
                      <TableCell className="font-mono text-sm">{arb.phone}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            arb.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {arb.isActive ? '激活' : '停用'}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {arb.createdAt}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            {arb.isActive ? '停用' : '激活'}
                          </Button>
                          <Button variant="ghost" size="sm">
                            编辑
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            删除
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </MainLayout>
  )
}
