/**
 * 平台后台 - 用户会员等级管理页面
 */

import { useState } from 'react'
import { Link } from '@remix-run/react'
import type { UserMemberInfo } from './types/member.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Badge } from '~/components/ui/badge'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LearningModal from '~/pages/Architecture/ScenarioDesign/components/LearningModal'
import { useViewMode } from '~/contexts/ViewModeContext'
import { Search, Eye } from 'lucide-react'

interface UserMemberManagementPageProps {
  users: UserMemberInfo[]
  total: number
}

export default function UserMemberManagementPage({
  users,
  total,
}: UserMemberManagementPageProps) {
  const { isLearningMode } = useViewMode()
  const [searchPhone, setSearchPhone] = useState('')
  const [filterLevel, setFilterLevel] = useState<string>('all')

  // VIP等级徽章颜色
  const getLevelBadgeClass = (level: number) => {
    if (level === 0) return 'bg-slate-100 text-slate-600'
    if (level <= 2) return 'bg-blue-100 text-blue-700'
    if (level <= 5) return 'bg-purple-100 text-purple-700'
    return 'bg-amber-100 text-amber-700'
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">用户会员等级管理</h1>
            <p className="text-slate-600 mt-1">
              查询、手动调整特定用户的会员等级和积分余额
            </p>
          </div>
          <LearningModal title="用户会员等级管理 - 学习内容" isLearningMode={isLearningMode}>
            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold mb-2">功能说明</h3>
                <p className="text-slate-600">
                  本页面用于查询用户的会员信息，包括当前等级、累计间夜、保级进度等。
                  平台管理员可手动调整用户等级和积分（需填写原因）。
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">数据字段说明</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li><strong>累计间夜：</strong>用户历史总间夜数，用于判断升级条件</li>
                  <li><strong>保级进度：</strong>当前有效期内的间夜数 / 保级所需间夜数</li>
                  <li><strong>有效期至：</strong>会员等级的到期日期</li>
                  <li><strong>积分余额：</strong>用户当前可用积分</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">手动调整规则</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>所有手动调整操作需记录操作日志</li>
                  <li>调整原因为必填项</li>
                  <li>调整等级不影响累计间夜数</li>
                  <li>调整积分立即生效</li>
                  <li>常见场景：客诉补偿、VIP礼遇、异常数据修复</li>
                </ul>
              </section>
            </div>
          </LearningModal>
        </div>

        {/* 搜索筛选 */}
        <Card className="mb-6 rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-slate-900">搜索筛选</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="searchPhone">手机号</Label>
                <Input
                  id="searchPhone"
                  placeholder="输入手机号搜索"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="w-48 space-y-2">
                <Label>会员等级</Label>
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="0">VIP0</SelectItem>
                    <SelectItem value="1">VIP1</SelectItem>
                    <SelectItem value="2">VIP2</SelectItem>
                    <SelectItem value="3">VIP3</SelectItem>
                    <SelectItem value="4">VIP4</SelectItem>
                    <SelectItem value="5">VIP5</SelectItem>
                    <SelectItem value="6">VIP6</SelectItem>
                    <SelectItem value="7">VIP7</SelectItem>
                    <SelectItem value="8">VIP8</SelectItem>
                    <SelectItem value="9">VIP9</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="h-9 gap-2 bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4" />
                搜索
              </Button>
              <Button variant="outline" className="h-9">重置</Button>
            </div>
          </CardContent>
        </Card>

        {/* 用户列表 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-900">用户列表</CardTitle>
                <CardDescription className="text-slate-600">共 {total} 位用户</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-slate-600 font-semibold">手机号</TableHead>
                  <TableHead className="text-slate-600 font-semibold">姓名</TableHead>
                  <TableHead className="text-slate-600 font-semibold">会员等级</TableHead>
                  <TableHead className="text-slate-600 font-semibold">累计间夜</TableHead>
                  <TableHead className="text-slate-600 font-semibold">保级进度</TableHead>
                  <TableHead className="text-slate-600 font-semibold">有效期至</TableHead>
                  <TableHead className="text-slate-600 font-semibold">积分</TableHead>
                  <TableHead className="text-right text-slate-600 font-semibold">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userId} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium text-slate-900">{user.phone}</TableCell>
                    <TableCell className="text-slate-700">{user.userName}</TableCell>
                    <TableCell>
                      <Badge className={`${getLevelBadgeClass(user.currentLevel)} border-0`}>
                        {user.currentLevelName}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-blue-600">{user.totalNights}</span>
                      <span className="text-slate-500 text-sm ml-1">晚</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-700">
                        {user.maintainNights} 晚
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {user.validityDate}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-blue-600">{user.pointsBalance}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/platform-admin/member-management/user/${user.userId}`}>
                        <Button variant="ghost" size="sm" className="gap-1 hover:bg-slate-100">
                          <Eye className="w-4 h-4" />
                          详情
                        </Button>
                      </Link>
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
