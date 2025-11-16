import { useState } from 'react'
import { Form, Link, useNavigate } from '@remix-run/react'
import type { MemberListResponse } from './types/members.types'
import { MEMBER_LEVEL_LABELS } from './types/members.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Search, UserCheck, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '~/lib/utils'
import { useViewMode } from '~/contexts/ViewModeContext'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface MembersPageProps {
  result: MemberListResponse | null
  error: string | null
}

export default function MembersPage({ result, error }: MembersPageProps) {
  const navigate = useNavigate()
  const { isLearningMode } = useViewMode()
  const [phone, setPhone] = useState('')
  const [level, setLevel] = useState('')
  const [isPointsMember, setIsPointsMember] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const members = result?.members || []
  const currentPage = result?.page || 1
  const totalPages = result?.totalPages || 1
  const total = result?.total || 0

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', String(page))
    navigate(`?${params.toString()}`)
  }

  // LogicPanel 配置
  const logicSections = [
    {
      title: '业务场景',
      content: (
        <div className="space-y-4">
          <p>会员管理是酒店精细化运营的基础，通过数据分析实现精准营销：</p>
          <LogicList items={[
            <><strong>用户画像：</strong>了解会员的消费习惯、偏好房型、入住频次等</>,
            <><strong>精准营销：</strong>针对不同会员群体推送个性化的优惠和活动</>,
            <><strong>流失预警：</strong>识别长期未消费的会员，进行召回营销</>,
            <><strong>价值分类：</strong>区分高价值客户和普通客户，差异化服务</>
          ]} />
        </div>
      )
    },
    {
      title: '会员数据分析',
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">关键指标说明</h4>
          <LogicList items={[
            <><strong>订单数：</strong>会员累计预订的订单次数，反映消费频次</>,
            <><strong>间夜数：</strong>会员累计入住的总间夜数，反映消费深度</>,
            <><strong>消费金额：</strong>会员累计消费总额，衡量会员价值</>,
            <><strong>活跃度：</strong>最近一次消费时间，识别活跃/沉睡会员</>,
            <><strong>复购周期：</strong>两次消费之间的平均时间间隔</>
          ]} />
          <LogicHighlight type="success">
            <strong>RFM模型：</strong>通过最近消费时间(Recency)、消费频率(Frequency)、消费金额(Monetary)三个维度，对会员进行价值分层。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '操作说明',
      content: (
        <div className="space-y-4">
          <LogicList items={[
            <><strong>导入会员：</strong>批量导入会员数据，快速建立会员体系</>,
            <><strong>清除会员：</strong>清理无效或测试账号，保持数据准确性</>,
            <><strong>查看详情：</strong>点击"查"按钮查看会员的完整信息和消费记录</>,
            <><strong>拉黑用户：</strong>对恶意用户进行拉黑处理，限制其使用权限</>,
            <><strong>等级调整：</strong>根据实际情况手动调整会员等级</>
          ]} />
          <LogicHighlight type="warning">
            <strong>注意：</strong>拉黑操作要慎重，建议先核实情况再执行。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '字段说明',
      content: (
        <LogicTable
          headers={['字段', '说明', '示例']}
          rows={[
            ['注册时间', '会员注册的时间', '01/15/25 10:30:00'],
            ['昵称', '会员设置的昵称', '旅行达人'],
            ['姓名', '会员真实姓名', '张三'],
            ['电话', '会员联系电话', '138****5678'],
            ['等级', '会员当前等级', 'VIP2'],
            ['订单数', '累计预订订单次数', '12'],
            ['间夜数', '累计入住间夜数', '24'],
            ['消费金额', '累计消费总额（元）', '15680'],
            ['是否积分会员', '是否开通积分功能', '是/否']
          ]}
        />
      )
    }
  ]

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar menuItems={menuConfig} />
        <div className="flex-1 p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </div>
    )
  }

  const mainContent = (
    <div className="p-6 space-y-6">
      {/* 筛选表单 */}
      <Card>
        <CardContent className="pt-6">
          <Form method="get" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {/* 注册日期 */}
              <div className="space-y-2 col-span-2">
                <label className="text-sm text-muted-foreground">注册日期</label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="开始日期"
                  />
                  <span>-</span>
                  <Input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="结束日期"
                  />
                </div>
              </div>

              {/* 电话 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">电话</label>
                <Input
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入电话"
                />
              </div>

              {/* 等级 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">等级</label>
                <Select name="level" value={level} onValueChange={setLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择等级" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">全部</SelectItem>
                    <SelectItem value="注册会员">注册会员</SelectItem>
                    <SelectItem value="VIP1">VIP1</SelectItem>
                    <SelectItem value="VIP2">VIP2</SelectItem>
                    <SelectItem value="VIP3">VIP3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 是否积分会员 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">是否积分会员</label>
                <Select name="isPointsMember" value={isPointsMember} onValueChange={setIsPointsMember}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择是否积分会员" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">全部</SelectItem>
                    <SelectItem value="true">是</SelectItem>
                    <SelectItem value="false">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                搜索
              </Button>
              <Button type="button" variant="outline" onClick={() => window.location.href = '/member-management/members'}>
                重置
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* 导入会员按钮 */}
      <div className="flex gap-2">
        <Button variant="destructive">
          <UserCheck className="h-4 w-4 mr-2" />
          导入会员
        </Button>
        <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
          <Users className="h-4 w-4 mr-2" />
          清除会员
        </Button>
      </div>

      {/* 会员列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>注册时间</TableHead>
                <TableHead>昵称</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>电话</TableHead>
                <TableHead>等级</TableHead>
                <TableHead className="text-center">订单数</TableHead>
                <TableHead className="text-center">间夜数</TableHead>
                <TableHead className="text-center">消费金额</TableHead>
                <TableHead className="text-center">是否积分会员</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="text-sm">{member.registrationTime}</TableCell>
                  <TableCell>{member.nickname || '-'}</TableCell>
                  <TableCell>{member.name || '-'}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        MEMBER_LEVEL_LABELS[member.level].color
                      )}
                    >
                      {MEMBER_LEVEL_LABELS[member.level].label}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{member.orderCount}</TableCell>
                  <TableCell className="text-center">{member.nightCount}</TableCell>
                  <TableCell className="text-center">{member.consumptionAmount}</TableCell>
                  <TableCell className="text-center">
                    {member.isPointsMember ? '是' : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/member-management/members/${member.id}`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          查
                        </Button>
                      </Link>
                      <Link to={`/member-management/members/${member.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          拉黑
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {members.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              暂无会员数据
            </div>
          )}

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                共 {total} 条，10条/页
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  )
                })}
                {totalPages > 6 && <span className="text-muted-foreground">...</span>}
                {totalPages > 6 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-sm text-muted-foreground">前往</span>
                  <Input
                    type="number"
                    min={1}
                    max={totalPages}
                    defaultValue={currentPage}
                    className="w-16 h-8 text-center"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const value = parseInt(e.currentTarget.value)
                        if (value >= 1 && value <= totalPages) {
                          handlePageChange(value)
                        }
                      }
                    }}
                  />
                  <span className="text-sm text-muted-foreground">页</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className={`flex-1 overflow-y-auto ${isLearningMode ? '' : ''}`}>
        {mainContent}
      </div>
      {isLearningMode && (
        <div className="w-[480px] border-l border-border overflow-hidden">
          <LogicPanel title="会员管理" sections={logicSections} />
        </div>
      )}
    </div>
  )
}
