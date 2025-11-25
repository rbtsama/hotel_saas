/**
 * 平台后台 - 入住管理页面
 */

import { useState } from 'react'
import { useSubmit, useNavigation } from '@remix-run/react'
import type { CheckInRecord, AvailableRoom, CheckOutBill } from './types/hotel.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '~/components/ui/dialog'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Badge } from '~/components/ui/badge'
import { Search, DoorOpen, DoorClosed, Clock } from 'lucide-react'

interface CheckInPageProps {
  waitingCheckIns: CheckInRecord[]
  checkedInGuests: CheckInRecord[]
  availableRooms: AvailableRoom[]
}

export default function CheckInPage({ waitingCheckIns, checkedInGuests, availableRooms }: CheckInPageProps) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [activeTab, setActiveTab] = useState('waiting')

  // 办理入住弹窗
  const [checkInDialogOpen, setCheckInDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<CheckInRecord | null>(null)
  const [checkInForm, setCheckInForm] = useState({
    guestName: '',
    guestPhone: '',
    guestIdCard: '',
    roomNumber: '',
    depositAmount: 500,
  })

  // 办理退房弹窗
  const [checkOutDialogOpen, setCheckOutDialogOpen] = useState(false)
  const [checkOutBill, setCheckOutBill] = useState<CheckOutBill | null>(null)

  // 续住弹窗
  const [extendDialogOpen, setExtendDialogOpen] = useState(false)
  const [newCheckOutDate, setNewCheckOutDate] = useState('')

  const submit = useSubmit()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  // 打开办理入住弹窗
  const handleOpenCheckInDialog = (record: CheckInRecord) => {
    setSelectedRecord(record)
    setCheckInForm({
      guestName: record.guestName,
      guestPhone: record.guestPhone,
      guestIdCard: record.guestIdCard,
      roomNumber: '',
      depositAmount: record.depositAmount,
    })
    setCheckInDialogOpen(true)
  }

  // 提交办理入住
  const handleCheckIn = () => {
    if (!selectedRecord) return

    const formData = new FormData()
    formData.append('action', 'check-in')
    formData.append('recordId', selectedRecord.id)
    formData.append('guestName', checkInForm.guestName)
    formData.append('guestPhone', checkInForm.guestPhone)
    formData.append('guestIdCard', checkInForm.guestIdCard)
    formData.append('roomNumber', checkInForm.roomNumber)
    formData.append('depositAmount', checkInForm.depositAmount.toString())

    submit(formData, { method: 'post' })
    setCheckInDialogOpen(false)
  }

  // 打开办理退房弹窗
  const handleOpenCheckOutDialog = (record: CheckInRecord) => {
    setSelectedRecord(record)

    // 计算账单（模拟）
    const nights = 2 // 简化计算
    const roomCharge = 688 * nights
    const bill: CheckOutBill = {
      roomCharge,
      deposit: record.depositAmount,
      otherFees: 0,
      total: roomCharge,
      refundAmount: record.depositAmount,
    }
    setCheckOutBill(bill)
    setCheckOutDialogOpen(true)
  }

  // 提交办理退房
  const handleCheckOut = () => {
    if (!selectedRecord) return

    const formData = new FormData()
    formData.append('action', 'check-out')
    formData.append('recordId', selectedRecord.id)

    submit(formData, { method: 'post' })
    setCheckOutDialogOpen(false)
  }

  // 打开续住弹窗
  const handleOpenExtendDialog = (record: CheckInRecord) => {
    setSelectedRecord(record)
    setNewCheckOutDate(record.checkOutDate)
    setExtendDialogOpen(true)
  }

  // 提交续住
  const handleExtendStay = () => {
    if (!selectedRecord) return

    const formData = new FormData()
    formData.append('action', 'extend-stay')
    formData.append('recordId', selectedRecord.id)
    formData.append('newCheckOutDate', newCheckOutDate)

    submit(formData, { method: 'post' })
    setExtendDialogOpen(false)
  }

  // 搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('keyword', searchKeyword)
    formData.append('tab', activeTab)
    submit(formData, { method: 'get' })
  }

  // 获取可用房间（根据房型筛选）
  const getAvailableRoomsByType = (roomTypeId: string) => {
    return availableRooms.filter(room => room.roomTypeId === roomTypeId)
  }

  return (
    <div className="p-6 space-y-6">
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">入住管理</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="搜索订单号/客人姓名/手机号/房间号..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="pl-9 h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </form>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="waiting" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                待入住 ({waitingCheckIns.length})
              </TabsTrigger>
              <TabsTrigger value="checked-in" className="flex items-center gap-2">
                <DoorOpen className="w-4 h-4" />
                在住客人 ({checkedInGuests.length})
              </TabsTrigger>
            </TabsList>

            {/* 待入住列表 */}
            <TabsContent value="waiting">
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 bg-slate-50">
                      <TableHead className="text-slate-600 font-semibold">订单号</TableHead>
                      <TableHead className="text-slate-600 font-semibold">客人姓名</TableHead>
                      <TableHead className="text-slate-600 font-semibold">手机号</TableHead>
                      <TableHead className="text-slate-600 font-semibold">房型</TableHead>
                      <TableHead className="text-slate-600 font-semibold">房间号</TableHead>
                      <TableHead className="text-slate-600 font-semibold">入住日期</TableHead>
                      <TableHead className="text-slate-600 font-semibold">退房日期</TableHead>
                      <TableHead className="text-slate-600 font-semibold">押金状态</TableHead>
                      <TableHead className="text-slate-600 font-semibold text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waitingCheckIns.map((record) => (
                      <TableRow key={record.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="text-slate-900 font-medium">{record.orderNo}</TableCell>
                        <TableCell className="text-slate-900">{record.guestName}</TableCell>
                        <TableCell className="text-slate-700">{record.guestPhone}</TableCell>
                        <TableCell className="text-slate-700">{record.roomTypeName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-slate-300 text-slate-500">
                            未分配
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-700">{record.checkInDate}</TableCell>
                        <TableCell className="text-slate-700">{record.checkOutDate}</TableCell>
                        <TableCell>
                          <Badge className="border-orange-300 text-orange-700 bg-orange-50">
                            待收 ¥{record.depositAmount}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => handleOpenCheckInDialog(record)}
                            className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <DoorOpen className="w-3.5 h-3.5 mr-1" />
                            办理入住
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {waitingCheckIns.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center text-slate-400 py-8">
                          暂无待入住记录
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* 在住客人列表 */}
            <TabsContent value="checked-in">
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 bg-slate-50">
                      <TableHead className="text-slate-600 font-semibold">订单号</TableHead>
                      <TableHead className="text-slate-600 font-semibold">客人姓名</TableHead>
                      <TableHead className="text-slate-600 font-semibold">手机号</TableHead>
                      <TableHead className="text-slate-600 font-semibold">房型</TableHead>
                      <TableHead className="text-slate-600 font-semibold">房间号</TableHead>
                      <TableHead className="text-slate-600 font-semibold">入住日期</TableHead>
                      <TableHead className="text-slate-600 font-semibold">退房日期</TableHead>
                      <TableHead className="text-slate-600 font-semibold">押金</TableHead>
                      <TableHead className="text-slate-600 font-semibold text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checkedInGuests.map((record) => (
                      <TableRow key={record.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="text-slate-900 font-medium">{record.orderNo}</TableCell>
                        <TableCell className="text-slate-900">{record.guestName}</TableCell>
                        <TableCell className="text-slate-700">{record.guestPhone}</TableCell>
                        <TableCell className="text-slate-700">{record.roomTypeName}</TableCell>
                        <TableCell>
                          <Badge className="border-blue-300 text-blue-700 bg-blue-50">
                            {record.roomNumber}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-700">{record.checkInDate}</TableCell>
                        <TableCell className="text-slate-700">{record.checkOutDate}</TableCell>
                        <TableCell>
                          <Badge className="border-green-300 text-green-700 bg-green-50">
                            已收 ¥{record.depositAmount}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenExtendDialog(record)}
                            className="h-8 border-slate-300 hover:border-slate-400"
                          >
                            续住
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleOpenCheckOutDialog(record)}
                            className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <DoorClosed className="w-3.5 h-3.5 mr-1" />
                            办理退房
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {checkedInGuests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center text-slate-400 py-8">
                          暂无在住客人
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 办理入住弹窗 */}
      <Dialog open={checkInDialogOpen} onOpenChange={setCheckInDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>办理入住</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="guestName">客人姓名</Label>
              <Input
                id="guestName"
                value={checkInForm.guestName}
                onChange={(e) => setCheckInForm({ ...checkInForm, guestName: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guestPhone">手机号</Label>
              <Input
                id="guestPhone"
                value={checkInForm.guestPhone}
                onChange={(e) => setCheckInForm({ ...checkInForm, guestPhone: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guestIdCard">身份证号</Label>
              <Input
                id="guestIdCard"
                value={checkInForm.guestIdCard}
                onChange={(e) => setCheckInForm({ ...checkInForm, guestIdCard: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber">分配房间</Label>
              <Select
                value={checkInForm.roomNumber}
                onValueChange={(value) => setCheckInForm({ ...checkInForm, roomNumber: value })}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="选择可用房间" />
                </SelectTrigger>
                <SelectContent>
                  {selectedRecord && getAvailableRoomsByType(selectedRecord.roomTypeId).map((room) => (
                    <SelectItem key={room.roomNumber} value={room.roomNumber}>
                      {room.roomNumber} - {room.roomTypeName} (第{room.floor}层)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositAmount">押金金额</Label>
              <Input
                id="depositAmount"
                type="number"
                value={checkInForm.depositAmount}
                onChange={(e) => setCheckInForm({ ...checkInForm, depositAmount: Number(e.target.value) })}
                className="h-9"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckInDialogOpen(false)} className="h-9">
              取消
            </Button>
            <Button
              onClick={handleCheckIn}
              disabled={isSubmitting || !checkInForm.roomNumber}
              className="h-9 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? '处理中...' : '确认入住'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 办理退房弹窗 */}
      <Dialog open={checkOutDialogOpen} onOpenChange={setCheckOutDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>办理退房</DialogTitle>
          </DialogHeader>
          {checkOutBill && (
            <div className="space-y-4 py-4">
              <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-slate-900">账单明细</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-700">
                    <span>房费</span>
                    <span>¥{checkOutBill.roomCharge}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>押金</span>
                    <span>¥{checkOutBill.deposit}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>其他费用</span>
                    <span>¥{checkOutBill.otherFees}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold text-slate-900">
                    <span>总计</span>
                    <span className="text-lg">¥{checkOutBill.total}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>退还押金</span>
                    <span>¥{checkOutBill.refundAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckOutDialogOpen(false)} className="h-9">
              取消
            </Button>
            <Button
              onClick={handleCheckOut}
              disabled={isSubmitting}
              className="h-9 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? '处理中...' : '确认退房'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 续住弹窗 */}
      <Dialog open={extendDialogOpen} onOpenChange={setExtendDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>续住</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newCheckOutDate">新退房日期</Label>
              <Input
                id="newCheckOutDate"
                type="date"
                value={newCheckOutDate}
                onChange={(e) => setNewCheckOutDate(e.target.value)}
                className="h-9"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExtendDialogOpen(false)} className="h-9">
              取消
            </Button>
            <Button
              onClick={handleExtendStay}
              disabled={isSubmitting}
              className="h-9 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? '处理中...' : '确认续住'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
