/**
 * 房屋管理页面 - 房态管理
 */

import { useState } from 'react'
import type { Room } from './types/hotel-backend.types'
import { RoomStatus } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import MainLayout from '../PointsSystem/components/MainLayout'

interface RoomsPageProps {
  rooms: Room[]
}

const statusColors = {
  [RoomStatus.AVAILABLE]: 'bg-green-100 text-green-700',
  [RoomStatus.OCCUPIED]: 'bg-blue-100 text-blue-700',
  [RoomStatus.CLEANING]: 'bg-yellow-100 text-yellow-700',
  [RoomStatus.MAINTENANCE]: 'bg-red-100 text-red-700',
  [RoomStatus.RESERVED]: 'bg-purple-100 text-purple-700',
}

const statusLabels = {
  [RoomStatus.AVAILABLE]: '空闲',
  [RoomStatus.OCCUPIED]: '已入住',
  [RoomStatus.CLEANING]: '清洁中',
  [RoomStatus.MAINTENANCE]: '维修中',
  [RoomStatus.RESERVED]: '已预订',
}

export default function RoomsPage({ rooms }: RoomsPageProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedStore, setSelectedStore] = useState<string>('all')

  const filteredRooms = rooms.filter((room) => {
    const matchStatus = selectedStatus === 'all' || room.status === selectedStatus
    const matchStore = selectedStore === 'all' || room.storeId === selectedStore
    return matchStatus && matchStore
  })

  const stores = Array.from(new Set(rooms.map((r) => r.storeName))).map(
    (name) => {
      const room = rooms.find((r) => r.storeName === name)
      return { id: room!.storeId, name }
    }
  )

  // 房态统计
  const stats = {
    available: rooms.filter((r) => r.status === RoomStatus.AVAILABLE).length,
    occupied: rooms.filter((r) => r.status === RoomStatus.OCCUPIED).length,
    cleaning: rooms.filter((r) => r.status === RoomStatus.CLEANING).length,
    maintenance: rooms.filter((r) => r.status === RoomStatus.MAINTENANCE).length,
    reserved: rooms.filter((r) => r.status === RoomStatus.RESERVED).length,
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">房屋管理</h1>
          <p className="text-sm text-slate-500 mt-1">
            实时房态管理、清洁维护调度
          </p>
        </div>

        {/* 房态统计 */}
        <div className="grid grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-600">{stats.available}</div>
              <div className="text-sm text-slate-600 mt-2">空闲可售</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.occupied}</div>
              <div className="text-sm text-slate-600 mt-2">已入住</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-yellow-600">{stats.cleaning}</div>
              <div className="text-sm text-slate-600 mt-2">清洁中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-red-600">{stats.maintenance}</div>
              <div className="text-sm text-slate-600 mt-2">维修中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.reserved}</div>
              <div className="text-sm text-slate-600 mt-2">已预订</div>
            </CardContent>
          </Card>
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
              <select
                className="px-3 py-2 border border-slate-300 rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">全部状态</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="flex items-center text-sm text-slate-600">
                共 <span className="font-bold text-slate-900 mx-1">{filteredRooms.length}</span> 间
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 房间列表 */}
        <Card>
          <CardHeader>
            <CardTitle>房间列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>房间号</TableHead>
                  <TableHead>门店</TableHead>
                  <TableHead>房型</TableHead>
                  <TableHead>楼层</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>客人信息</TableHead>
                  <TableHead>入住/退房</TableHead>
                  <TableHead>最后清洁</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    {/* 房间号 */}
                    <TableCell className="font-bold text-lg">
                      {room.roomNumber}
                    </TableCell>

                    {/* 门店 */}
                    <TableCell className="text-sm">{room.storeName}</TableCell>

                    {/* 房型 */}
                    <TableCell className="text-sm">{room.roomTypeName}</TableCell>

                    {/* 楼层 */}
                    <TableCell className="text-sm">{room.floor}F</TableCell>

                    {/* 状态 */}
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          statusColors[room.status]
                        }`}
                      >
                        {statusLabels[room.status]}
                      </span>
                    </TableCell>

                    {/* 客人信息 */}
                    <TableCell className="text-sm">
                      {room.currentGuestName || '-'}
                    </TableCell>

                    {/* 入住/退房 */}
                    <TableCell className="text-sm">
                      {room.checkInDate && room.checkOutDate ? (
                        <div>
                          <div className="text-green-600">入: {room.checkInDate}</div>
                          <div className="text-orange-600">离: {room.checkOutDate}</div>
                        </div>
                      ) : room.checkInDate ? (
                        <div className="text-purple-600">预订: {room.checkInDate}</div>
                      ) : (
                        '-'
                      )}
                    </TableCell>

                    {/* 最后清洁 */}
                    <TableCell className="text-xs text-slate-500">
                      {room.lastCleanedAt || '-'}
                    </TableCell>

                    {/* 操作 */}
                    <TableCell>
                      <div className="flex gap-2">
                        {room.status === RoomStatus.AVAILABLE && (
                          <Button variant="outline" size="sm">
                            预订
                          </Button>
                        )}
                        {room.status === RoomStatus.OCCUPIED && (
                          <Button variant="outline" size="sm">
                            退房
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          详情
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
