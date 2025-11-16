/**
 * 广告位设置组件
 */

import { Form, useNavigation } from '@remix-run/react'
import type { AdPosition } from '../types/ads.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

interface AdPositionSettingsProps {
  position: AdPosition
  positionId: string
}

export default function AdPositionSettings({
  position,
  positionId,
}: AdPositionSettingsProps) {
  const navigation = useNavigation()
  const isUpdating =
    navigation.state === 'submitting' &&
    navigation.formData?.get('_action') === 'updatePosition'

  return (
    <Card>
      <CardHeader>
        <CardTitle>广告位全局设置</CardTitle>
      </CardHeader>
      <CardContent>
        <Form method="post" className="space-y-4">
          <input type="hidden" name="_action" value="updatePosition" />
          <input type="hidden" name="positionId" value={positionId} />

          <div className="grid grid-cols-2 gap-4">
            {/* 启用状态 */}
            <div className="space-y-2">
              <Label htmlFor="enabled">启用状态</Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="enabled"
                    value="true"
                    defaultChecked={position.enabled}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">启用</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="enabled"
                    value="false"
                    defaultChecked={!position.enabled}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">禁用</span>
                </label>
              </div>
              <p className="text-xs text-slate-500">
                禁用后,该广告位的所有广告将不会展示
              </p>
            </div>

            {/* 轮播时间 */}
            <div className="space-y-2">
              <Label htmlFor="carouselInterval">轮播时间(秒)</Label>
              <Input
                id="carouselInterval"
                name="carouselInterval"
                type="number"
                min="1"
                max="60"
                defaultValue={position.carouselInterval}
                required
              />
              <p className="text-xs text-slate-500">
                设置广告轮播的时间间隔(1-60秒)
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? '保存中...' : '保存设置'}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}
