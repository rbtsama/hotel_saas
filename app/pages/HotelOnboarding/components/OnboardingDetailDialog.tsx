import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Progress } from '~/components/ui/progress'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { Card } from '~/components/ui/card'
import type { HotelOnboardingTask } from '../types/onboarding.types'
import { OnboardingStatus } from '../types/onboarding.types'
import { Copy, CheckCircle2, Circle } from 'lucide-react'

interface OnboardingDetailDialogProps {
  task: HotelOnboardingTask | null
  open: boolean
  onClose: () => void
  onUpdateProgress?: (taskId: string, progress: any) => void
  onMarkAsOnline?: (taskId: string) => void
}

export default function OnboardingDetailDialog({
  task,
  open,
  onClose,
  onUpdateProgress,
  onMarkAsOnline,
}: OnboardingDetailDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  if (!task) return null

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const getStatusBadge = (status: OnboardingStatus) => {
    const statusConfig = {
      [OnboardingStatus.NOT_STARTED]: { label: '未开通', variant: 'secondary' as const },
      [OnboardingStatus.CONFIGURING]: { label: '配置中', variant: 'default' as const },
      [OnboardingStatus.COMPLETED]: { label: '已上线', variant: 'default' as const },
      [OnboardingStatus.ON_HOLD]: { label: '暂停', variant: 'secondary' as const },
    }
    const config = statusConfig[status]
    return (
      <Badge variant={config.variant} className={
        status === OnboardingStatus.COMPLETED ? 'bg-green-600' :
        status === OnboardingStatus.CONFIGURING ? 'bg-blue-600' :
        status === OnboardingStatus.ON_HOLD ? 'bg-yellow-600' :
        'bg-gray-600'
      }>
        {config.label}
      </Badge>
    )
  }

  const configSteps = [
    { key: 'basicInfo', label: '门店基本信息' },
    { key: 'images', label: '门店图片' },
    { key: 'facilities', label: '门店设施' },
    { key: 'policy', label: '门店政策' },
    { key: 'roomTypes', label: '房型配置' },
    { key: 'pricing', label: '价格配置' },
    { key: 'inventory', label: '库存配置' },
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {task.hotelName}
            {getStatusBadge(task.status)}
          </DialogTitle>
          <DialogDescription>
            开通流程详情
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基本信息 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">基本信息</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">酒店ID:</span>
                <span className="ml-2">{task.hotelId}</span>
              </div>
              <div>
                <span className="text-muted-foreground">签约日期:</span>
                <span className="ml-2">{task.signedDate}</span>
              </div>
              <div>
                <span className="text-muted-foreground">负责BD:</span>
                <span className="ml-2">{task.bdOwner}</span>
              </div>
              <div>
                <span className="text-muted-foreground">创建时间:</span>
                <span className="ml-2">{task.createdAt}</span>
              </div>
              {task.onlineDate && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">上线时间:</span>
                  <span className="ml-2">{task.onlineDate}</span>
                </div>
              )}
            </div>
          </Card>

          {/* 账号信息 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">账号信息</h3>
            {task.accountCreated && task.accountCredentials ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">用户名</div>
                    <div className="font-mono font-semibold">{task.accountCredentials.username}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(task.accountCredentials!.username, 'username')}
                  >
                    {copiedField === 'username' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">密码</div>
                    <div className="font-mono font-semibold">{task.accountCredentials.password}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(task.accountCredentials!.password, 'password')}
                  >
                    {copiedField === 'password' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {task.accountCredentials.sentAt && (
                  <div className="text-sm text-muted-foreground">
                    发送时间: {task.accountCredentials.sentAt}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">账号未生成</div>
            )}
          </Card>

          {/* 配置进度 */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">配置进度</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{task.completionRate}%</span>
              </div>
            </div>
            <Progress value={task.completionRate} className="mb-4" />

            <div className="space-y-2">
              {configSteps.map((step) => {
                const isCompleted = task.configProgress[step.key as keyof typeof task.configProgress]
                return (
                  <div
                    key={step.key}
                    className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className={isCompleted ? 'font-medium' : 'text-muted-foreground'}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* 备注 */}
          {task.notes && (
            <Card className="p-4">
              <h3 className="font-semibold mb-2">备注</h3>
              <p className="text-sm text-muted-foreground">{task.notes}</p>
            </Card>
          )}

          {/* 操作按钮 */}
          {task.status !== OnboardingStatus.COMPLETED && (
            <div className="flex justify-end gap-2 pt-4 border-t">
              {task.completionRate === 100 && onMarkAsOnline && (
                <Button
                  onClick={() => {
                    onMarkAsOnline(task.id)
                    onClose()
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  标记为已上线
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
