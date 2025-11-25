/**
 * 平台后台 - 客房管理页面
 */

import { useState } from 'react'
import type { Room, RoomType, RoomFacility } from './types/hotel.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '~/components/ui/dialog'
import { Checkbox } from '~/components/ui/checkbox'
import { Search, Plus, Edit, Wrench, Power, PowerOff, Trash2, Wifi, AirVent, Tv, Refrigerator, Bath, Maximize2, ShieldCheck, Wine } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface RoomsPageProps {
  rooms: Room[]
  roomTypes: RoomType[]
  floors: number[]
}

// 设施图标映射
const facilityIcons: Record<RoomFacility, typeof Wifi> = {
  wifi: Wifi,
  air_conditioning: AirVent,
  tv: Tv,
  refrigerator: Refrigerator,
  bathtub: Bath,
  balcony: Maximize2,
  safe_box: ShieldCheck,
  mini_bar: Wine,
}

// 设施名称映射
const facilityNames: Record<RoomFacility, string> = {
  wifi: 'WiFi',
  air_conditioning: '空调',
  tv: '电视',
  refrigerator: '冰箱',
  bathtub: '浴缸',
  balcony: '阳台',
  safe_box: '保险箱',
  mini_bar: '迷你吧',
}

// 所有可用设施
const allFacilities: RoomFacility[] = [
  'wifi',
  'air_conditioning',
  'tv',
  'refrigerator',
  'bathtub',
  'balcony',
  'safe_box',
  'mini_bar',
]

export default function RoomsPage({ rooms, roomTypes, floors }: RoomsPageProps) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedRoomType, setSelectedRoomType] = useState<string>('all')
  const [selectedFloor, setSelectedFloor] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)

  // Form states
  const [formRoomNumber, setFormRoomNumber] = useState('')
  const [formRoomType, setFormRoomType] = useState('')
  const [formFloor, setFormFloor] = useState('')
  const [formFacilities, setFormFacilities] = useState<RoomFacility[]>([])

  // 获取状态徽章
  const getStatusBadge = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return <Badge className="border-green-300 text-green-700 bg-green-50">可用</Badge>
      case 'maintenance':
        return <Badge className="border-orange-300 text-orange-700 bg-orange-50">维修中</Badge>
      case 'out_of_service':
        return <Badge className="border-slate-300 text-slate-600 bg-slate-50">已停售</Badge>
      default:
        return <Badge className="border-slate-300 text-slate-600 bg-slate-50">{status}</Badge>
    }
  }

  // 打开编辑弹窗
  const handleOpenEditDialog = (room: Room) => {
    setEditingRoom(room)
    setFormRoomNumber(room.roomNumber)
    setFormRoomType(room.roomTypeId)
    setFormFloor(String(room.floor))
    setFormFacilities(room.facilities)
    setIsEditDialogOpen(true)
  }

  // 重置表单
  const resetForm = () => {
    setFormRoomNumber('')
    setFormRoomType('')
    setFormFloor('')
    setFormFacilities([])
  }

  // 处理设施选择
  const toggleFacility = (facility: RoomFacility) => {
    setFormFacilities(prev =>
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    )
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* 页面标题 */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">客房管理</h1>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  新增房间
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>新增房间</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="roomNumber">房间号 *</Label>
                    <Input
                      id="roomNumber"
                      value={formRoomNumber}
                      onChange={(e) => setFormRoomNumber(e.target.value)}
                      placeholder="例如: 201"
                      className="h-9 border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roomType">房型 *</Label>
                    <Select value={formRoomType} onValueChange={setFormRoomType}>
                      <SelectTrigger className="h-9 border-slate-300">
                        <SelectValue placeholder="请选择房型" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="floor">楼层 *</Label>
                    <Input
                      id="floor"
                      type="number"
                      value={formFloor}
                      onChange={(e) => setFormFloor(e.target.value)}
                      placeholder="例如: 2"
                      className="h-9 border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>设施</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {allFacilities.map((facility) => {
                        const Icon = facilityIcons[facility]
                        return (
                          <div key={facility} className="flex items-center space-x-2">
                            <Checkbox
                              id={`create-${facility}`}
                              checked={formFacilities.includes(facility)}
                              onCheckedChange={() => toggleFacility(facility)}
                            />
                            <label
                              htmlFor={`create-${facility}`}
                              className="text-sm text-slate-700 flex items-center gap-1 cursor-pointer"
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {facilityNames[facility]}
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => { setIsCreateDialogOpen(false); resetForm(); }} className="h-9">
                    取消
                  </Button>
                  <Button onClick={() => { /* TODO: Handle create */ }} className="h-9 bg-blue-600 hover:bg-blue-700">
                    保存
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* 筛选器 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">搜索筛选</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {/* 房型筛选 */}
                <div>
                  <Label className="text-sm font-medium text-slate-700">房型</Label>
                  <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                    <SelectTrigger className="h-9 mt-1.5 border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部房型</SelectItem>
                      {roomTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 楼层筛选 */}
                <div>
                  <Label className="text-sm font-medium text-slate-700">楼层</Label>
                  <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                    <SelectTrigger className="h-9 mt-1.5 border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部楼层</SelectItem>
                      {floors.map((floor) => (
                        <SelectItem key={floor} value={String(floor)}>
                          {floor}层
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 状态筛选 */}
                <div>
                  <Label className="text-sm font-medium text-slate-700">状态</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="h-9 mt-1.5 border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      <SelectItem value="available">可用</SelectItem>
                      <SelectItem value="maintenance">维修中</SelectItem>
                      <SelectItem value="out_of_service">已停售</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 搜索框 */}
                <div>
                  <Label className="text-sm font-medium text-slate-700">搜索房间号</Label>
                  <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="输入房间号"
                    className="h-9 mt-1.5 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 房间列表 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-200">
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-slate-900">
                  房间列表
                  <span className="ml-2 text-sm font-normal text-slate-600">
                    共 {rooms.length} 间房
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 bg-slate-50">
                      <TableHead className="text-slate-900 font-semibold">房间号</TableHead>
                      <TableHead className="text-slate-900 font-semibold">房型</TableHead>
                      <TableHead className="text-slate-900 font-semibold">楼层</TableHead>
                      <TableHead className="text-slate-900 font-semibold">状态</TableHead>
                      <TableHead className="text-slate-900 font-semibold">最后清洁时间</TableHead>
                      <TableHead className="text-slate-900 font-semibold">设施</TableHead>
                      <TableHead className="text-slate-900 font-semibold text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                        <TableCell className="font-medium text-slate-900">
                          {room.roomNumber}
                        </TableCell>
                        <TableCell className="text-slate-900">
                          {room.roomTypeName}
                        </TableCell>
                        <TableCell className="text-slate-900">
                          {room.floor}层
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(room.status)}
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {room.lastCleanedAt}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {room.facilities.slice(0, 4).map((facility) => {
                              const Icon = facilityIcons[facility]
                              return (
                                <div key={facility} title={facilityNames[facility]}>
                                  <Icon className="w-4 h-4 text-blue-600" />
                                </div>
                              )
                            })}
                            {room.facilities.length > 4 && (
                              <span className="text-xs text-slate-500">+{room.facilities.length - 4}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenEditDialog(room)}
                              className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="w-3.5 h-3.5 mr-1" />
                              编辑
                            </Button>
                            {room.status === 'available' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                              >
                                <Wrench className="w-3.5 h-3.5 mr-1" />
                                维修
                              </Button>
                            )}
                            {room.status === 'maintenance' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <Power className="w-3.5 h-3.5 mr-1" />
                                启用
                              </Button>
                            )}
                            {room.status === 'available' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-slate-600 hover:text-slate-700 hover:bg-slate-50"
                              >
                                <PowerOff className="w-3.5 h-3.5 mr-1" />
                                停售
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {rooms.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  暂无房间数据
                </div>
              )}
            </CardContent>
          </Card>

          {/* 编辑弹窗 */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>编辑房间</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-roomNumber">房间号 *</Label>
                  <Input
                    id="edit-roomNumber"
                    value={formRoomNumber}
                    onChange={(e) => setFormRoomNumber(e.target.value)}
                    className="h-9 border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-roomType">房型 *</Label>
                  <Select value={formRoomType} onValueChange={setFormRoomType}>
                    <SelectTrigger className="h-9 border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-floor">楼层 *</Label>
                  <Input
                    id="edit-floor"
                    type="number"
                    value={formFloor}
                    onChange={(e) => setFormFloor(e.target.value)}
                    className="h-9 border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>设施</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {allFacilities.map((facility) => {
                      const Icon = facilityIcons[facility]
                      return (
                        <div key={facility} className="flex items-center space-x-2">
                          <Checkbox
                            id={`edit-${facility}`}
                            checked={formFacilities.includes(facility)}
                            onCheckedChange={() => toggleFacility(facility)}
                          />
                          <label
                            htmlFor={`edit-${facility}`}
                            className="text-sm text-slate-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {facilityNames[facility]}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); resetForm(); }} className="h-9">
                  取消
                </Button>
                <Button onClick={() => { /* TODO: Handle update */ }} className="h-9 bg-blue-600 hover:bg-blue-700">
                  保存
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </MainLayout>
  )
}
