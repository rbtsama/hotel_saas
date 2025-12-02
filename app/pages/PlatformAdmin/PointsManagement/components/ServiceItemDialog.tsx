/**
 * 平台后台 - 积分服务项弹窗（奖励/换购）
 */

import { Form } from '@remix-run/react'
import type { PointsRewardItem, PointsExchangeItem } from '../types/valueAddedService.types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

interface ServiceItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  type: 'reward' | 'exchange' // 奖励或换购
  item?: PointsRewardItem | PointsExchangeItem | null
}

export default function ServiceItemDialog({
  open,
  onOpenChange,
  mode,
  type,
  item,
}: ServiceItemDialogProps) {
  const isReward = type === 'reward'
  const title = mode === 'create'
    ? `新增${isReward ? '积分奖励' : '积分换购'}服务`
    : `编辑${isReward ? '积分奖励' : '积分换购'}服务`

  // 确定action路径
  const actionPath = mode === 'create'
    ? `/platform-admin/points-management/services`
    : `/platform-admin/points-management/services`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900">{title}</DialogTitle>
        </DialogHeader>

        <Form method="post" action={actionPath} className="space-y-4 mt-4">
          {/* Hidden fields */}
          <input type="hidden" name="action" value={mode === 'create' ? `create-${type}` : `update-${type}`} />
          {mode === 'edit' && item && <input type="hidden" name="id" value={item.id} />}

          {/* 服务内容 */}
          <div className="space-y-2">
            <Label htmlFor="serviceName" className="text-sm font-medium text-slate-700">
              服务内容 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="serviceName"
              name="serviceName"
              defaultValue={item?.serviceName || ''}
              placeholder="请输入服务内容（最多50字符）"
              maxLength={50}
              required
              className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* 服务说明 */}
          <div className="space-y-2">
            <Label htmlFor="serviceDescription" className="text-sm font-medium text-slate-700">
              服务说明
            </Label>
            <textarea
              id="serviceDescription"
              name="serviceDescription"
              defaultValue={item?.serviceDescription || ''}
              placeholder="请输入服务说明（选填，最多200字符）"
              maxLength={200}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none text-sm"
            />
          </div>

          {/* 积分数量 */}
          <div className="space-y-2">
            <Label htmlFor="pointsAmount" className="text-sm font-medium text-slate-700">
              {isReward ? '奖励积分' : '消耗积分'} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="pointsAmount"
              name="pointsAmount"
              type="number"
              min="1"
              defaultValue={
                item
                  ? isReward
                    ? (item as PointsRewardItem).pointsReward
                    : (item as PointsExchangeItem).pointsCost
                  : ''
              }
              placeholder="请输入积分数量（正整数）"
              required
              className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* 按钮组 */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-9 px-4 border-slate-300"
            >
              取消
            </Button>
            <Button
              type="submit"
              className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                // 提交后关闭弹窗
                setTimeout(() => onOpenChange(false), 100)
              }}
            >
              {mode === 'create' ? '创建' : '保存'}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
