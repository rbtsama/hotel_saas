import { useState } from 'react'
import type { RoomType } from './types/hotel-backend.types'
import MainLayout from '../PointsSystem/components/MainLayout'
import { Card, CardContent } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

interface RoomTypeListPageProps {
  roomTypes: RoomType[]
}

export default function RoomTypeListPage({ roomTypes }: RoomTypeListPageProps) {
  const [searchName, setSearchName] = useState('')

  const filteredRoomTypes = roomTypes.filter((rt) =>
    searchName === '' || rt.name.includes(searchName)
  )

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">房型列表</h1>

          {/* 顶部操作栏 */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3 items-center">
                <select className="px-3 py-2 border rounded text-sm">
                  <option>请选择类型</option>
                  <option>普通</option>
                  <option>豪华</option>
                </select>
                <Input
                  placeholder="请输入房型名称"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-64"
                />
                <Button variant="default">搜索</Button>
                <Button variant="outline">重置</Button>
                <div className="flex-1" />
                <Button>新增</Button>
                <Button variant="outline">新增假房</Button>
                <Button variant="outline">小程序房型展示排序</Button>
              </div>
            </CardContent>
          </Card>

          {/* 房型列表 */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-red-500 mb-4">
                如果门店有了房源系统,请务必将有真实房源的房型,如需完全在小程序列表展现,请联系对接PM或DM。
                选择对接PM或DM后,请务必门店不会在小程序列表展现。
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>编号</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>房型名称</TableHead>
                    <TableHead>卧室数</TableHead>
                    <TableHead>房间数</TableHead>
                    <TableHead>面积</TableHead>
                    <TableHead>限住成人数</TableHead>
                    <TableHead>上架状态</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoomTypes.map((rt) => (
                    <TableRow key={rt.id}>
                      <TableCell>{rt.sortOrder}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {rt.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        {rt.name} 【{rt.院}】
                      </TableCell>
                      <TableCell>{rt.bedrooms}</TableCell>
                      <TableCell>{rt.roomCount}</TableCell>
                      <TableCell>{rt.area}</TableCell>
                      <TableCell>{rt.maxAdults}</TableCell>
                      <TableCell>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rt.isOnline}
                            className="sr-only peer"
                            readOnly
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <button className="text-blue-600 text-sm hover:underline">编辑</button>
                          <button className="text-blue-600 text-sm hover:underline">删除</button>
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
