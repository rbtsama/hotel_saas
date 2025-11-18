import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Progress } from '~/components/ui/progress'
import { CheckCircle2, Circle, ChevronRight, Sparkles } from 'lucide-react'
import { useNavigate } from '@remix-run/react'

interface ConfigStep {
  id: string
  title: string
  description: string
  completed: boolean
  route: string
}

interface WelcomeGuideProps {
  open: boolean
  onClose: () => void
  configProgress?: {
    basicInfo: boolean
    images: boolean
    facilities: boolean
    policy: boolean
    roomTypes: boolean
    pricing: boolean
    inventory: boolean
  }
}

export default function WelcomeGuide({
  open,
  onClose,
  configProgress = {
    basicInfo: false,
    images: false,
    facilities: false,
    policy: false,
    roomTypes: false,
    pricing: false,
    inventory: false,
  },
}: WelcomeGuideProps) {
  const navigate = useNavigate()

  const steps: ConfigStep[] = [
    {
      id: 'basicInfo',
      title: '完善门店基本信息',
      description: '填写门店名称、地址、联系方式等基础信息',
      completed: configProgress.basicInfo,
      route: '/hotel-backend/store/basic-info',
    },
    {
      id: 'images',
      title: '上传门店图片',
      description: '上传门店Logo、封面图、环境图片等',
      completed: configProgress.images,
      route: '/hotel-backend/store/images',
    },
    {
      id: 'facilities',
      title: '配置门店设施',
      description: '选择门店提供的设施和服务',
      completed: configProgress.facilities,
      route: '/hotel-backend/store/facilities',
    },
    {
      id: 'policy',
      title: '设置入住政策',
      description: '配置入住退房时间、取消政策等',
      completed: configProgress.policy,
      route: '/hotel-backend/store/policy',
    },
    {
      id: 'roomTypes',
      title: '添加房型信息',
      description: '创建房型、配置房间设施和价格',
      completed: configProgress.roomTypes,
      route: '/hotel-backend/room-type-list',
    },
    {
      id: 'pricing',
      title: '设置房价和库存',
      description: '配置房型价格和可售库存',
      completed: configProgress.pricing,
      route: '/hotel-backend/room-price-calendar',
    },
    {
      id: 'inventory',
      title: '上线门店',
      description: '完成所有配置后,发布门店上线',
      completed: configProgress.inventory,
      route: '/hotel-backend/store/basic-info',
    },
  ]

  const completedCount = steps.filter((step) => step.completed).length
  const totalCount = steps.length
  const completionRate = Math.round((completedCount / totalCount) * 100)

  const handleStepClick = (route: string) => {
    onClose()
    navigate(route)
  }

  const handleSkip = () => {
    localStorage.setItem('hotel_welcome_guide_skipped', 'true')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <DialogTitle className="text-2xl">欢迎加入小而美HOMESTAY</DialogTitle>
          </div>
          <DialogDescription className="text-base mt-2">
            让我们一起完成门店配置,快速上线您的民宿
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 进度总览 */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">配置进度</h3>
              <Badge variant="secondary" className="text-base px-3 py-1">
                {completedCount} / {totalCount}
              </Badge>
            </div>
            <Progress value={completionRate} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">
              已完成 {completionRate}% 的配置
            </p>
          </Card>

          {/* 配置步骤列表 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg mb-3">配置步骤</h3>
            {steps.map((step, index) => (
              <Card
                key={step.id}
                className={`p-4 transition-all cursor-pointer hover:shadow-md ${
                  step.completed
                    ? 'bg-green-50 border-green-200'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => handleStepClick(step.route)}
              >
                <div className="flex items-start gap-4">
                  {/* 步骤图标 */}
                  <div className="flex-shrink-0 mt-1">
                    {step.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 步骤内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">
                        {step.title}
                      </h4>
                      {step.completed && (
                        <Badge
                          variant="secondary"
                          className="bg-green-600 text-white text-xs"
                        >
                          已完成
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* 前往按钮 */}
                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                </div>
              </Card>
            ))}
          </div>

          {/* 提示信息 */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Circle className="h-5 w-5 text-blue-600 fill-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">温馨提示</h4>
                <p className="text-sm text-blue-800">
                  您可以随时从右上角"查看指引"按钮重新打开本指引。
                  建议按照步骤顺序完成配置,确保门店信息完整。
                </p>
              </div>
            </div>
          </Card>

          {/* 操作按钮 */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="ghost" onClick={handleSkip}>
              跳过指引
            </Button>
            <Button onClick={onClose}>
              我知道了
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
