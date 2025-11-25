import { useState } from 'react'
import dayjs from 'dayjs'
import { Calendar } from 'lucide-react'
import type { RoomType, RoomStatusData } from './types/hotel.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

interface RoomStatusPageProps {
  roomTypes: RoomType[]
  roomStatusData: RoomStatusData[]
  startDate: string
  error: string | null
}

/**
 * 根据房态数据返回对应的颜色类名
 */
function getStatusColor(status: string, count: number): string {
  if (count === 0) return ''

  const colorMap: Record<string, string> = {
    available: 'bg-green-50 text-green-700 border-green-200',
    booked: 'bg-blue-50 text-blue-700 border-blue-200',
    occupied: 'bg-slate-100 text-slate-700 border-slate-300',
    dirty: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    maintenance: 'bg-red-50 text-red-700 border-red-200',
  }

  return colorMap[status] || ''
}

/**
 * 获取房态的主要状态（数量最多的状态）
 */
function getPrimaryStatus(data: RoomStatusData): {
  status: string
  count: number
  color: string
} {
  const statuses = [
    { key: 'occupied', label: '已住', count: data.occupied },
    { key: 'booked', label: '已订', count: data.booked },
    { key: 'dirty', label: '脏房', count: data.dirty },
    { key: 'maintenance', label: '维修', count: data.maintenance },
    { key: 'available', label: '可用', count: data.available },
  ]

  const primary = statuses.reduce((max, curr) => curr.count > max.count ? curr : max)

  const colorMap: Record<string, string> = {
    available: 'bg-green-500',
    booked: 'bg-blue-500',
    occupied: 'bg-slate-500',
    dirty: 'bg-yellow-500',
    maintenance: 'bg-red-500',
  }

  return {
    status: primary.label,
    count: primary.count,
    color: colorMap[primary.key] || 'bg-gray-500',
  }
}

export default function RoomStatusPage({ roomTypes, roomStatusData, startDate, error }: RoomStatusPageProps) {
  const [currentStartDate, setCurrentStartDate] = useState(startDate)

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
          错误: {error}
        </div>
      </div>
    )
  }

  // 生成日期列表（7天）
  const dates = Array.from({ length: 7 }, (_, i) => dayjs(currentStartDate).add(i, 'day'))

  // 获取指定日期和房型的房态数据
  const getStatusData = (date: string, roomTypeId: string): RoomStatusData | undefined => {
    return roomStatusData.find(
      data => data.date === date && data.roomTypeId === roomTypeId
    )
  }

  // 处理日期切换
  const handlePrevWeek = () => {
    setCurrentStartDate(dayjs(currentStartDate).subtract(7, 'day').format('YYYY-MM-DD'))
  }

  const handleNextWeek = () => {
    setCurrentStartDate(dayjs(currentStartDate).add(7, 'day').format('YYYY-MM-DD'))
  }

  const handleToday = () => {
    setCurrentStartDate(dayjs().format('YYYY-MM-DD'))
  }

  return (
    <div className="p-6 space-y-6">
      {/* 顶部工具栏 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              房态总览
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handlePrevWeek}
                className="h-9 border-slate-300 hover:border-slate-400"
              >
                上一周
              </Button>
              <Button
                onClick={handleToday}
                className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                今天
              </Button>
              <Button
                variant="outline"
                onClick={handleNextWeek}
                className="h-9 border-slate-300 hover:border-slate-400"
              >
                下一周
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 房态表格 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="text-slate-600 font-semibold w-40 sticky left-0 bg-slate-50 z-10">
                    房型
                  </TableHead>
                  {dates.map(date => (
                    <TableHead
                      key={date.format('YYYY-MM-DD')}
                      className="text-slate-600 font-semibold text-center min-w-[140px]"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-sm">{date.format('MM/DD')}</span>
                        <span className="text-xs text-slate-500">
                          {date.format('ddd') === 'Sun' ? '周日' :
                           date.format('ddd') === 'Mon' ? '周一' :
                           date.format('ddd') === 'Tue' ? '周二' :
                           date.format('ddd') === 'Wed' ? '周三' :
                           date.format('ddd') === 'Thu' ? '周四' :
                           date.format('ddd') === 'Fri' ? '周五' : '周六'}
                        </span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {roomTypes.map(roomType => (
                  <TableRow key={roomType.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                    <TableCell className="font-medium text-slate-900 sticky left-0 bg-white group-hover:bg-slate-50 z-10">
                      <div className="flex flex-col">
                        <span className="text-sm">{roomType.name}</span>
                        <span className="text-xs text-slate-500">
                          共{roomType.totalRooms}间
                        </span>
                      </div>
                    </TableCell>
                    {dates.map(date => {
                      const dateStr = date.format('YYYY-MM-DD')
                      const statusData = getStatusData(dateStr, roomType.id)

                      if (!statusData) {
                        return (
                          <TableCell key={dateStr} className="text-center">
                            <div className="text-xs text-slate-400">无数据</div>
                          </TableCell>
                        )
                      }

                      const primary = getPrimaryStatus(statusData)
                      const totalOccupied = statusData.booked + statusData.occupied + statusData.dirty + statusData.maintenance

                      return (
                        <TableCell key={dateStr} className="text-center p-2">
                          <div className="flex flex-col gap-1.5">
                            {/* 主要状态显示 */}
                            <div className={`${primary.color} text-white rounded px-2 py-1 text-xs font-medium`}>
                              {statusData.available}/{roomType.totalRooms}
                            </div>

                            {/* 详细状态 */}
                            <div className="grid grid-cols-2 gap-1 text-[10px]">
                              {statusData.occupied > 0 && (
                                <div className="bg-slate-100 text-slate-700 rounded px-1 py-0.5">
                                  住:{statusData.occupied}
                                </div>
                              )}
                              {statusData.booked > 0 && (
                                <div className="bg-blue-100 text-blue-700 rounded px-1 py-0.5">
                                  订:{statusData.booked}
                                </div>
                              )}
                              {statusData.dirty > 0 && (
                                <div className="bg-yellow-100 text-yellow-700 rounded px-1 py-0.5">
                                  脏:{statusData.dirty}
                                </div>
                              )}
                              {statusData.maintenance > 0 && (
                                <div className="bg-red-100 text-red-700 rounded px-1 py-0.5">
                                  修:{statusData.maintenance}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 图例说明 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-slate-900">图例说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-slate-700">可用 (Available)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-slate-700">已订 (Booked)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-500 rounded"></div>
              <span className="text-slate-700">已住 (Occupied)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-slate-700">脏房 (Dirty)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-slate-700">维修 (Maintenance)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
