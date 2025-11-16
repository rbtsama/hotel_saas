/**
 * 房型管理页面
 */

import { useState } from 'react'
import type { RoomType } from './types/hotel-backend.types'
import { RoomTypeStatus } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import MainLayout from '../PointsSystem/components/MainLayout'

interface RoomTypesPageProps {
  roomTypes: RoomType[]
}

const statusColors = {
  [RoomTypeStatus.ACTIVE]: 'bg-green-100 text-green-700',
  [RoomTypeStatus.PAUSED]: 'bg-orange-100 text-orange-700',
  [RoomTypeStatus.DISCONTINUED]: 'bg-slate-100 text-slate-600',
}

const statusLabels = {
  [RoomTypeStatus.ACTIVE]: '在售',
  [RoomTypeStatus.PAUSED]: '暂停',
  [RoomTypeStatus.DISCONTINUED]: '已下架',
}

export default function RoomTypesPage({ roomTypes }: RoomTypesPageProps) {
  const [selectedStore, setSelectedStore] = useState<string>('all')

  const filteredRoomTypes =
    selectedStore === 'all'
      ? roomTypes
      : roomTypes.filter((rt) => rt.storeId === selectedStore)

  // 获取门店列表
  const stores = Array.from(
    new Set(roomTypes.map((rt) => rt.storeName))
  ).map((name) => {
    const rt = roomTypes.find((r) => r.storeName === name)
    return { id: rt!.storeId, name }
  })

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">房型管理</h1>
            <p className="text-sm text-slate-500 mt-1">
              配置房型信息、价格策略和设施标签
            </p>
          </div>
          <Button>新增房型</Button>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <select
                className="px-3 py-2 border border-slate-300 rounded-md"
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
              >
                <option value="all">全部门店</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center text-sm text-slate-600">
                共 <span className="font-bold text-slate-900 mx-1">{filteredRoomTypes.length}</span> 个房型
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 房型列表 */}
        <Card>
          <CardHeader>
            <CardTitle>房型列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>房型信息</TableHead>
                  <TableHead>门店</TableHead>
                  <TableHead>面积/床型</TableHead>
                  <TableHead>价格策略</TableHead>
                  <TableHead>库存</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoomTypes.map((roomType) => (
                  <TableRow key={roomType.id}>
                    {/* 房型信息 */}
                    <TableCell>
                      <div className="flex gap-3">
                        <img
                          src={roomType.images[0]}
                          alt={roomType.name}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium text-slate-900">
                            {roomType.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            最多 {roomType.maxGuests} 人入住
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* 门店 */}
                    <TableCell className="text-sm">{roomType.storeName}</TableCell>

                    {/* 面积/床型 */}
                    <TableCell className="text-sm">
                      <div>{roomType.area}m²</div>
                      <div className="text-xs text-slate-500">{roomType.bedType}</div>
                    </TableCell>

                    {/* 价格策略 */}
                    <TableCell className="text-sm">
                      <div className="space-y-1">
                        <div>
                          <span className="text-slate-600">平日:</span>{' '}
                          <span className="font-semibold">¥{roomType.basePrice}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">周末:</span>{' '}
                          <span className="font-semibold text-orange-600">
                            ¥{roomType.weekendPrice}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-600">节假日:</span>{' '}
                          <span className="font-semibold text-red-600">
                            ¥{roomType.holidayPrice}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* 库存 */}
                    <TableCell>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          {roomType.availableCount}
                        </div>
                        <div className="text-xs text-slate-500">
                          / {roomType.totalCount}
                        </div>
                      </div>
                    </TableCell>

                    {/* 状态 */}
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          statusColors[roomType.status]
                        }`}
                      >
                        {statusLabels[roomType.status]}
                      </span>
                    </TableCell>

                    {/* 操作 */}
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          编辑
                        </Button>
                        <Button variant="outline" size="sm">
                          查看房间
                        </Button>
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
