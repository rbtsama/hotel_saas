/**
 * 酒店会员管理页面
 */

import type { HotelMember } from './types/hotel-backend.types'
import { HotelMemberLevel } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import MainLayout from '../PointsSystem/components/MainLayout'

interface MembersPageProps {
  members: HotelMember[]
}

const levelColors = {
  [HotelMemberLevel.SVIP]: 'bg-purple-100 text-purple-700 border-purple-300',
  [HotelMemberLevel.VIP]: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  [HotelMemberLevel.NORMAL]: 'bg-slate-100 text-slate-700 border-slate-300',
}

export default function MembersPage({ members }: MembersPageProps) {
  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">会员管理</h1>
            <p className="text-sm text-slate-500 mt-1">
              管理酒店自有会员体系
            </p>
          </div>
          <Button>添加会员</Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {members.filter((m) => m.level === HotelMemberLevel.SVIP).length}
              </div>
              <div className="text-sm text-slate-600 mt-2">超级VIP</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {members.filter((m) => m.level === HotelMemberLevel.VIP).length}
              </div>
              <div className="text-sm text-slate-600 mt-2">VIP</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-slate-600">
                {members.filter((m) => m.level === HotelMemberLevel.NORMAL).length}
              </div>
              <div className="text-sm text-slate-600 mt-2">普通会员</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>会员列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>会员信息</TableHead>
                  <TableHead>等级</TableHead>
                  <TableHead>积分</TableHead>
                  <TableHead>入住次数</TableHead>
                  <TableHead>消费金额</TableHead>
                  <TableHead>折扣</TableHead>
                  <TableHead>最后入住</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-slate-500">{member.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-3 py-1 text-xs rounded-full border ${
                          levelColors[member.level]
                        }`}
                      >
                        {member.levelName}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-blue-600">
                      {member.points.toLocaleString()}
                    </TableCell>
                    <TableCell>{member.totalStays} 次</TableCell>
                    <TableCell className="font-semibold">
                      ¥{member.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className="text-green-600 font-medium">
                        {member.discount * 10}折
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {member.lastVisitAt || '-'}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        查看详情
                      </Button>
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
