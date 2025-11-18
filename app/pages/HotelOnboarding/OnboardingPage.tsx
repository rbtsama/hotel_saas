import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { HotelOnboardingTask, OnboardingStatistics } from './types/onboarding.types'
import { OnboardingStatus } from './types/onboarding.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Progress } from '~/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import OnboardingDetailDialog from './components/OnboardingDetailDialog'
import {
  Users,
  Settings,
  CheckCircle2,
  Clock,
  Eye,
  UserPlus,
  Rocket,
} from 'lucide-react'

interface OnboardingPageProps {
  tasks: HotelOnboardingTask[]
  statistics: OnboardingStatistics
  error: string | null
  onGenerateAccount?: (taskId: string) => Promise<void>
  onMarkAsOnline?: (taskId: string) => Promise<void>
}

export default function OnboardingPage({
  tasks,
  statistics,
  error,
  onGenerateAccount,
  onMarkAsOnline,
}: OnboardingPageProps) {
  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedTask, setSelectedTask] = useState<HotelOnboardingTask | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  const getStatusBadge = (status: OnboardingStatus) => {
    const statusConfig = {
      [OnboardingStatus.NOT_STARTED]: { label: '未开通', variant: 'secondary' as const, color: 'bg-gray-600' },
      [OnboardingStatus.CONFIGURING]: { label: '配置中', variant: 'default' as const, color: 'bg-blue-600' },
      [OnboardingStatus.COMPLETED]: { label: '已上线', variant: 'default' as const, color: 'bg-green-600' },
      [OnboardingStatus.ON_HOLD]: { label: '暂停', variant: 'secondary' as const, color: 'bg-yellow-600' },
    }
    const config = statusConfig[status]
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const handleViewDetails = (task: HotelOnboardingTask) => {
    setSelectedTask(task)
    setDetailDialogOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold">酒店开通流程管理</h1>
        <p className="text-muted-foreground mt-1">管理新签约酒店的开通配置流程</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总计</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.total}</div>
            <p className="text-xs text-muted-foreground">签约酒店总数</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">未开通</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.notStarted}</div>
            <p className="text-xs text-muted-foreground">等待配置</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">配置中</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.configuring}</div>
            <p className="text-xs text-muted-foreground">正在配置</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已上线</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.completed}</div>
            <p className="text-xs text-muted-foreground">配置完成</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均开通天数</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.avgOnboardingDays}</div>
            <p className="text-xs text-muted-foreground">从签约到上线</p>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <Card>
        <CardHeader>
          <CardTitle>开通任务列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="get" className="mb-4 flex gap-2">
            <Input
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="搜索酒店名称..."
              className="max-w-xs"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="筛选状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value={OnboardingStatus.NOT_STARTED}>未开通</SelectItem>
                <SelectItem value={OnboardingStatus.CONFIGURING}>配置中</SelectItem>
                <SelectItem value={OnboardingStatus.COMPLETED}>已上线</SelectItem>
                <SelectItem value={OnboardingStatus.ON_HOLD}>暂停</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '搜索中...' : '搜索'}
            </Button>
          </Form>

          {/* 任务列表表格 */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>酒店名称</TableHead>
                  <TableHead>签约日期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>账号</TableHead>
                  <TableHead>配置进度</TableHead>
                  <TableHead>负责BD</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      暂无数据
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.hotelName}</TableCell>
                      <TableCell>{task.signedDate}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>
                        {task.accountCreated ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            已生成
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-600">
                            未生成
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-[200px]">
                          <Progress value={task.completionRate} className="flex-1" />
                          <span className="text-sm font-medium w-12 text-right">
                            {task.completionRate}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{task.bdOwner}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!task.accountCreated && onGenerateAccount && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onGenerateAccount(task.id)}
                            >
                              <UserPlus className="h-4 w-4 mr-1" />
                              生成账号
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewDetails(task)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            查看详情
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 详情对话框 */}
      <OnboardingDetailDialog
        task={selectedTask}
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        onMarkAsOnline={onMarkAsOnline}
      />
    </div>
  )
}
